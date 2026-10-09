import type { ComponentProps } from 'react';
import type { baseComponents } from './DynamicRenderer.constants';
import type { ActionRef, ComponentNode, NodeEnvelope } from './node';

export { isComponentNode } from './node';
export type { ActionRef, ComponentNode, PageContent } from './node';

/** Every `type` the renderer knows out of the box. Derived from the registry so it can't drift. */
export type ComponentList = keyof typeof baseComponents;

type JsonProps<P> = { [K in keyof P]?: P[K] | ActionRef };

/** Strict, per-`type` authoring type (autocomplete for props). Optional; runtime accepts `ComponentNode`. */
export type TypedComponentNode = {
    [K in ComponentList]: { type: K } & NodeEnvelope<ComponentNode> &
        JsonProps<Omit<ComponentProps<(typeof baseComponents)[K]>, 'children' | 'id'>>;
}[ComponentList];
