import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DynamicRenderer } from './DynamicRenderer';
import { registerComponent } from './DynamicRenderer.constants';
import type { ComponentNode } from './node';

const Box: React.FC<{ id?: string; className?: string; children?: React.ReactNode }> = ({ id, className, children }) => (
    <div id={id} className={className}>{children}</div>
);
const Bar: React.FC<{ menuBar?: React.ReactNode[]; utilityButtons?: React.ReactNode[] }> = ({ menuBar, utilityButtons }) => (
    <nav><ul data-slot="menu">{menuBar}</ul><ul data-slot="utility">{utilityButtons}</ul></nav>
);

const render = (config: ComponentNode | ComponentNode[] | null | undefined, extra: Partial<React.ComponentProps<typeof DynamicRenderer>> = {}) =>
    renderToStaticMarkup(<DynamicRenderer config={config} {...extra} />);

describe('DynamicRenderer', () => {
    beforeEach(() => {
        registerComponent('TestBox', Box);
        registerComponent('TestBar', Bar, { default: 'menuBar', utility: 'utilityButtons' });
        vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.spyOn(console, 'warn').mockImplementation(() => {});
    });
    afterEach(() => vi.restoreAllMocks());

    it('renders nothing for null/undefined', () => {
        expect(render(null)).toBe('');
        expect(render(undefined)).toBe('');
    });

    it('renders flat nodes: props, id and nested children', () => {
        const html = render({ type: 'TestBox', id: 'outer', className: 'a', children: [{ type: 'TestBox', id: 'inner' }] });
        expect(html).toBe('<div id="outer" class="a"><div id="inner"></div></div>');
    });

    it('renders arrays of nodes', () => {
        expect(render([{ type: 'TestBox', id: 'a' }, { type: 'TestBox', id: 'b' }])).toBe('<div id="a"></div><div id="b"></div>');
    });

    it('does not pass slot or label to the component', () => {
        const Probe: React.FC<Record<string, unknown>> = props => <i>{Object.keys(props).sort().join(',')}</i>;
        registerComponent('TestProbeKeys', Probe);
        expect(render({ type: 'TestProbeKeys', id: 'x', label: 'editor note', slot: 'utility', title: 't' })).toBe('<i>id,title</i>');
    });

    it('merges the className prop of the renderer with the node className', () => {
        expect(render({ type: 'TestBox', className: 'a' }, { className: 'b' })).toBe('<div class="a b"></div>');
    });

    it('reports invalid and unregistered nodes without throwing', () => {
        const onError = vi.fn();
        expect(render({ type: '' }, { onError })).toBe('');
        expect(render({ type: 'Nope' }, { onError })).toBe('');
        expect(onError).toHaveBeenCalledTimes(2);
        expect(onError.mock.calls[1][0].message).toMatch(/"Nope" is not registered/);
    });

    it('splits children into named props by slot', () => {
        const html = render({
            type: 'TestBar',
            children: [
                { type: 'TestBox', id: 'm1' },
                { type: 'TestBox', id: 'u1', slot: 'utility' },
                { type: 'TestBox', id: 'm2', slot: 'unknown-slot' }
            ]
        });
        expect(html).toBe(
            '<nav><ul data-slot="menu"><div id="m1"></div><div id="m2"></div></ul>' +
            '<ul data-slot="utility"><div id="u1"></div></ul></nav>'
        );
    });

    it('resolves @action: strings anywhere in props and warns for unknown actions', () => {
        const onClick = () => {};
        const seen = vi.fn();
        const Probe: React.FC<{ options: { onClick: unknown }[] }> = ({ options }) => {
            seen(options[0].onClick, options[1].onClick);
            return null;
        };
        registerComponent('TestProbe', Probe);
        render(
            { type: 'TestProbe', options: [{ onClick: '@action:go' }, { onClick: '@action:missing' }] },
            { handlers: { go: onClick } }
        );
        expect(seen).toHaveBeenCalledWith(onClick, '@action:missing');
        expect(console.warn).toHaveBeenCalled();
    });

    it('passes children as an array even when there is a single child', () => {
        const Probe: React.FC<{ children?: React.ReactNode }> = ({ children }) => <i>{Array.isArray(children) ? 'array' : 'single'}</i>;
        registerComponent('TestSingle', Probe);
        expect(render({ type: 'TestSingle', children: [{ type: 'TestBox' }] })).toBe('<i>array</i>');
    });
});
