import React from 'react';
import { IDynamicRendererProps } from './DynamicRenderer.interfaces';
import { getComponent, hasComponent } from './DynamicRenderer.constants';

// Helper function to validate component type
function isValidComponentType(type: any): type is string {
  return typeof type === 'string' && type.trim().length > 0;
}

export const DynamicRenderer: React.FC<IDynamicRendererProps> = ({
  config,
  className,
  handlers,
  onError
}) => {
  // Handle array of configs
  if (Array.isArray(config)) {
    return (
      <>
        {config.map((item, index) => (
          <DynamicRenderer
            key={item.id || `item-${index}`}
            config={item}
            className={className}
            handlers={handlers}
            onError={onError}
          />
        ))}
      </>
    );
  }

  // Handle null/undefined
  if (!config || typeof config !== 'object') {
    // console.warn('Invalid config passed to DynamicRenderer:', config);
    return null;
  }

  const { type, data, children, id, ...rest } = config;
  const componentKey = id || data?.id || type;

  // Validate component type
  if (!isValidComponentType(type)) {
    const error = new Error(`Invalid component type: "${type}"`);
    onError?.(error, config);
    console.error(`Invalid component type: "${type}"`);
    return null;
  }

  // Check if component is registered
  if (!hasComponent(type)) {
    const error = new Error(`Component "${type}" is not registered`);
    onError?.(error, config);
    console.error(`Component "${type}" is not registered`);
    return null;
  }

  // Get component from registry
  const Component = getComponent(type);
  if (!Component) {
    const error = new Error(`Failed to load component: "${type}"`);
    onError?.(error, config);
    console.error(`Failed to load component: "${type}"`);
    return null;
  }

  // Process props for action handlers
  const processHandlers = (props: any): any => {
    if (!props || typeof props !== 'object') return props;
    if (React.isValidElement(props)) return props; // Skip React elements

    if (Array.isArray(props)) {
      return props.map(item => processHandlers(item));
    }

    const newProps: any = { ...props };
    Object.keys(newProps).forEach(key => {
      const value = newProps[key];
      if (typeof value === 'string' && value.startsWith('@action:')) {
        const actionName = value.replace('@action:', '');
        if (handlers && handlers[actionName]) {
          newProps[key] = handlers[actionName];
        }
      } else if (typeof value === 'object' && value !== null) {
        newProps[key] = processHandlers(value);
      }
    });
    return newProps;
  };

  const processedData = processHandlers(data);

  // Prepare component props
  const componentProps: Record<string, any> = {
    ...processedData,
    ...rest,
    id: id || data?.id
  };

  // Add className if provided
  if (className) {
    componentProps.className = data?.className
      ? `${data.className} ${className}`
      : className;
  }

  // Special handling for components that expect children in different ways
  const handleChildren = (childrenConfig: any): React.ReactNode => {
    if (!childrenConfig) return undefined;

    if (Array.isArray(childrenConfig)) {
      return childrenConfig.map((child, index) => {
        if (child && typeof child === 'object' && child.type) {
          return (
            <DynamicRenderer
              key={child.id || `child-${index}`}
              config={child}
              handlers={handlers}
              onError={onError}
            />
          );
        }
        return child; // Already a React node
      });
    }

    if (childrenConfig && typeof childrenConfig === 'object' && childrenConfig.type) {
      const childKey = childrenConfig.id || childrenConfig.data?.id || childrenConfig.type;
      return <DynamicRenderer key={childKey} config={childrenConfig} handlers={handlers} onError={onError} />;
    }

    return childrenConfig; // Already a React node
  };

  // Handle children based on component type
  if (children !== undefined) {
    // For Header component - children become menuBar.children
    if (type === 'Header') {
      const renderedChildren = handleChildren(children);
      if (renderedChildren && Array.isArray(renderedChildren)) {
        const menuItems = renderedChildren.filter(child => {
          const config = child?.props?.config;
          const position = config?.['data-position'] || config?.data?.['data-position'];
          return position !== 'far-item';
        });
        const utilityButtons = renderedChildren.filter(child => {
          const config = child?.props?.config;
          const position = config?.['data-position'] || config?.data?.['data-position'];
          return position === 'far-item';
        });

        componentProps.menuBar = menuItems;
        componentProps.utilityButtons = utilityButtons;
      }
    }
    // For MenuGrid - children become items
    else if (type === 'MenuGrid') {
      const renderedChildren = handleChildren(children);
      if (renderedChildren) {
        componentProps.children = renderedChildren;
      }
    }
    // For Dropdown - children can be embeddedView or items
    else if (type === 'Dropdown') {
      const renderedChildren = handleChildren(children);
      componentProps.children = renderedChildren;
    }
    // For HamburgerMenu - children become children prop
    else if (type === 'HamburgerMenu') {
      componentProps.children = handleChildren(children);
    }
    // For other components - pass as regular children prop
    else {
      componentProps.children = handleChildren(children);
    }
  }

  // Handle items in data for backward compatibility
  if (data?.items && Array.isArray(data.items)) {
    componentProps.items = data.items.map((item: any, index: number) => {
      if (item && typeof item === 'object' && item.type) {
        return (
          <DynamicRenderer
            key={item.id || `item-${index}`}
            config={item}
            handlers={handlers}
            onError={onError}
          />
        );
      }
      return item;
    });
  }

  // Handle embeddedView for backward compatibility
  if (data?.embeddedView && typeof data.embeddedView === 'object' && data.embeddedView.type) {
    const embeddedKey = data.embeddedView.id || data.embeddedView.data?.id || data.embeddedView.type;
    componentProps.embeddedView = (
      <DynamicRenderer
        key={embeddedKey}
        config={data.embeddedView}
        handlers={handlers}
        onError={onError}
      />
    );
  }

  // Render with error boundary
  try {
    return <Component key={componentKey} {...componentProps} />;
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown rendering error');
    onError?.(err, config);
    console.error(`Error rendering component "${type}":`, error);

    return (
      <div key={componentKey} className="error-boundary" style={{
        border: '1px solid red',
        padding: '1rem',
        color: 'red',
        background: '#fee'
      }}>
        Error rendering {type}: {err.message}
      </div>
    );
  }
};