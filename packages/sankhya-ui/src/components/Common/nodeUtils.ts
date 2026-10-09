import type { ComponentNode } from './node';

/**
 * Returns a copy of `nodes` where the node with the given `id` has `props` merged in.
 * Use it to inject runtime state (e.g. the selected language) into fetched JSON without mutating it.
 */
export function patchNodeById(nodes: ComponentNode[], id: string, props: Record<string, unknown>): ComponentNode[] {
    return nodes.map(node => {
        const patched = node.id === id ? { ...node, ...props } : node;
        return patched.children
            ? { ...patched, children: patchNodeById(patched.children, id, props) }
            : patched;
    });
}
