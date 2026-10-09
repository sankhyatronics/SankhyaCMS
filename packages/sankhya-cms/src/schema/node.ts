/** Dependency-free node types, safe to import from the content API layer. */

/** Action reference in JSON, resolved against the `handlers` prop of `DynamicRenderer`. */
export type ActionRef = `@action:${string}`;

/** Keys the renderer owns; everything else on a node is passed to the component as a prop. */
export interface NodeEnvelope<TNode> {
    id?: string;
    /** Named slot in the parent (e.g. Header: "utility"). Omit for the default slot. */
    slot?: string;
    /** Editor-only label, never passed to the component. */
    label?: string;
    children?: TNode[];
}

/**
 * A node as it appears in JSON: flat, no `data` wrapper.
 * `{ "type": "Hero", "id": "home-hero", "title": "...", "children": [...] }`
 */
export interface ComponentNode extends NodeEnvelope<ComponentNode> {
    type: string;
    [prop: string]: unknown;
}

/** A page is a list of nodes. */
export type PageContent = ComponentNode[];

export function isComponentNode(value: unknown): value is ComponentNode {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        typeof (value as { type?: unknown }).type === 'string' &&
        (value as { type: string }).type.trim().length > 0
    );
}
