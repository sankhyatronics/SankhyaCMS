import type { ComponentNode } from './schema';

export type { ComponentList, ComponentNode, TypedComponentNode, PageContent, ActionRef } from './schema';

export type ActionHandlers = Record<string, (...args: any[]) => void>;

export interface IDynamicRendererProps {
    config: ComponentNode | ComponentNode[] | null | undefined;
    className?: string;
    handlers?: ActionHandlers;
    onError?: (error: Error, node: ComponentNode) => void;
}
