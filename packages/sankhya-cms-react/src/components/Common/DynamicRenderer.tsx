import React from 'react';
import { ActionHandlers, IDynamicRendererProps } from './DynamicRenderer.interfaces';
import { ComponentNode, isComponentNode } from './node';
import { getComponent, getSlots } from './DynamicRenderer.constants';

const ACTION_PREFIX = '@action:';

/** Replace `"@action:name"` strings anywhere in a props tree with the matching handler. */
function resolveActions(value: unknown, handlers?: ActionHandlers): unknown {
    if (typeof value === 'string') {
        if (!value.startsWith(ACTION_PREFIX)) return value;
        const handler = handlers?.[value.slice(ACTION_PREFIX.length)];
        if (!handler) console.warn(`DynamicRenderer: no handler registered for "${value}"`);
        return handler ?? value;
    }
    if (Array.isArray(value)) return value.map(item => resolveActions(item, handlers));
    if (value && typeof value === 'object' && !React.isValidElement(value)) {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, resolveActions(item, handlers)])
        );
    }
    return value;
}

interface BoundaryProps {
    node: ComponentNode;
    onError?: IDynamicRendererProps['onError'];
    children: React.ReactNode;
}

/** Contains a render failure to the one node that caused it. */
class NodeErrorBoundary extends React.Component<BoundaryProps, { error: Error | null }> {
    state = { error: null as Error | null };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    componentDidCatch(error: Error) {
        this.props.onError?.(error, this.props.node);
        console.error(`Error rendering component "${this.props.node.type}":`, error);
    }

    render() {
        if (!this.state.error) return this.props.children;
        return (
            <div className="error-boundary" style={{ border: '1px solid red', padding: '1rem', color: 'red', background: '#fee' }}>
                Error rendering {this.props.node.type}: {this.state.error.message}
            </div>
        );
    }
}

function nodeKey(node: ComponentNode, index: number): string {
    return node.id ?? `${node.type}-${index}`;
}

function reportInvalid(error: Error, node: unknown, onError: IDynamicRendererProps['onError']) {
    onError?.(error, node as ComponentNode);
    console.error(error.message);
}

export const DynamicRenderer: React.FC<IDynamicRendererProps> = ({ config, className, handlers, onError }) => {
    if (Array.isArray(config)) {
        return (
            <>
                {config.map((node, index) => (
                    <DynamicRenderer
                        key={isComponentNode(node) ? nodeKey(node, index) : index}
                        config={node}
                        className={className}
                        handlers={handlers}
                        onError={onError}
                    />
                ))}
            </>
        );
    }

    if (config === null || config === undefined) return null;

    if (!isComponentNode(config)) {
        reportInvalid(new Error(`Invalid component node: ${JSON.stringify(config)}`), config, onError);
        return null;
    }

    const { type, id, slot: _slot, label: _label, children, ...props } = config;
    const Component = getComponent(type);
    if (!Component) {
        reportInvalid(new Error(`Component "${type}" is not registered`), config, onError);
        return null;
    }

    const componentProps = resolveActions(props, handlers) as Record<string, unknown>;
    if (id !== undefined) componentProps.id = id;
    if (className) {
        componentProps.className = [componentProps.className, className].filter(Boolean).join(' ');
    }

    if (children !== undefined) {
        const childNodes = Array.isArray(children) ? children : [children];
        const slots = getSlots(type);
        const renderChild = (child: ComponentNode, index: number) =>
            isComponentNode(child) ? (
                <DynamicRenderer key={nodeKey(child, index)} config={child} handlers={handlers} onError={onError} />
            ) : null;

        if (slots) {
            const grouped: Record<string, React.ReactNode[]> = {};
            childNodes.forEach((child, index) => {
                const slotName = isComponentNode(child) && child.slot && slots[child.slot] ? child.slot : 'default';
                (grouped[slots[slotName]] ??= []).push(renderChild(child, index));
            });
            Object.assign(componentProps, grouped);
        } else {
            componentProps.children = childNodes.map(renderChild);
        }
    }

    return (
        <NodeErrorBoundary node={config} onError={onError}>
            {React.createElement(Component, componentProps)}
        </NodeErrorBoundary>
    );
};
