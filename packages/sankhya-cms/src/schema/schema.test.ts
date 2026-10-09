import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { validateNode, validatePage } from './validate';

const fixtures = path.join(import.meta.dirname, '../../test/fixtures');

function jsonFiles(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return jsonFiles(full);
        return entry.name.endsWith('.json') ? [full] : [];
    });
}

const files = jsonFiles(fixtures);

describe('page JSON follows the flat node schema', () => {
    it('finds fixtures', () => expect(files.length).toBeGreaterThan(10));

    it.each(files.map(f => [path.relative(fixtures, f), f]))('%s', (_name, file) => {
        expect(validatePage(JSON.parse(fs.readFileSync(file, 'utf8')))).toEqual([]);
    });
});

describe('validator', () => {
    it('rejects unknown types', () => expect(validateNode({ type: 'Nope' })).toHaveLength(1));
    it('rejects legacy keys', () => expect(validateNode({ type: 'Hero', data: {} })).toEqual(['node: legacy key "data"']));
    it('rejects components nested in items', () =>
        expect(validateNode({ type: 'Stats', items: [{ type: 'Hero' }] })).toHaveLength(1));
    it('walks children', () =>
        expect(validateNode({ type: 'Header', children: [{ type: 'Nope' }] })).toEqual(['node.children[0]: unknown type "Nope"']));
    it('accepts custom types through a predicate', () => expect(validateNode({ type: 'Mine' }, 'node', t => t === 'Mine')).toEqual([]));
});
