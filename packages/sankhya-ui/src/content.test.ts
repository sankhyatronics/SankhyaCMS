import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { hasComponent } from './components/Common/DynamicRenderer.constants';
import type { ComponentNode } from './components/Common/node';


function jsonFiles(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return jsonFiles(full);
        return entry.name.endsWith('.json') ? [full] : [];
    });
}

/** Returns a list of schema violations for a node and its descendants. */
function violations(node: unknown, where: string): string[] {
    if (typeof node !== 'object' || node === null || Array.isArray(node)) return [`${where}: node must be an object`];
    const n = node as ComponentNode;
    const found: string[] = [];
    if (typeof n.type !== 'string' || !hasComponent(n.type)) found.push(`${where}: unknown type "${String(n.type)}"`);
    for (const legacy of ['data', 'embeddedView', 'data-position', 'image', 'contentUrl']) {
        if (legacy in n) found.push(`${where}: legacy key "${legacy}"`);
    }
    if (Array.isArray(n.items) && n.items.some(item => typeof item === 'object' && item !== null && 'type' in item)) {
        found.push(`${where}: "items" must hold plain data; nest components under "children"`);
    }
    if (n.children !== undefined) {
        if (!Array.isArray(n.children)) found.push(`${where}: children must be an array`);
        else n.children.forEach((child, i) => found.push(...violations(child, `${where}.children[${i}]`)));
    }
    return found;
}

const roots = [path.join(import.meta.dirname, '../test/fixtures')];
const files = roots.filter(fs.existsSync).flatMap(jsonFiles);

describe('content JSON follows the flat node schema', () => {
    it('finds content files', () => expect(files.length).toBeGreaterThan(10));

    it.each(files.map(f => [path.relative(path.join(import.meta.dirname, '..'), f), f]))('%s', (_name, file) => {
        const json = JSON.parse(fs.readFileSync(file, 'utf8'));
        const nodes = Array.isArray(json) ? json : [json];
        const problems = nodes.flatMap((node, i) => violations(node, `[${i}]`));
        expect(problems).toEqual([]);
    });
});
