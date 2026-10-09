import { isBaseComponentType } from './components';
import type { ComponentNode } from './node';

/** Keys from the pre-flat schema; their presence means the JSON still needs `scripts/migrate-json.mjs`. */
const LEGACY_KEYS = ['data', 'embeddedView', 'data-position', 'image', 'contentUrl'] as const;

/**
 * Returns the schema violations for a node and its descendants (empty when valid).
 * `isKnownType` defaults to the base component set; pass a wider predicate when a renderer also
 * registers custom components.
 */
export function validateNode(node: unknown, where = 'node', isKnownType: (type: string) => boolean = isBaseComponentType): string[] {
    if (typeof node !== 'object' || node === null || Array.isArray(node)) return [`${where}: node must be an object`];
    const n = node as ComponentNode;
    const found: string[] = [];
    if (typeof n.type !== 'string' || !isKnownType(n.type)) found.push(`${where}: unknown type "${String(n.type)}"`);
    for (const legacy of LEGACY_KEYS) {
        if (legacy in n) found.push(`${where}: legacy key "${legacy}"`);
    }
    if (Array.isArray(n.items) && n.items.some(item => typeof item === 'object' && item !== null && 'type' in item)) {
        found.push(`${where}: "items" must hold plain data; nest components under "children"`);
    }
    if (n.children !== undefined) {
        if (!Array.isArray(n.children)) found.push(`${where}: children must be an array`);
        else n.children.forEach((child, i) => found.push(...validateNode(child, `${where}.children[${i}]`, isKnownType)));
    }
    return found;
}

/** Validates a page: a node or a list of nodes. */
export function validatePage(page: unknown, isKnownType?: (type: string) => boolean): string[] {
    const nodes = Array.isArray(page) ? page : [page];
    return nodes.flatMap((node, i) => validateNode(node, `[${i}]`, isKnownType));
}
