#!/usr/bin/env node
/**
 * Migrates SankhyaUI JSON from the legacy shape to the flat node schema (see CLAUDE.md).
 * Idempotent: already-migrated nodes pass through unchanged.
 *
 *   node scripts/migrate-json.mjs <file|dir> [...]   rewrite *.json, and ```json blocks in *.md / *.mdx
 *   node scripts/migrate-json.mjs --check <...>      report files that would change, exit 1 if any
 */
import fs from 'node:fs';
import path from 'node:path';

const DEAD_PROPS = {
    Hero: ['textPosition'],
    Carousel: ['effect'],
    Select: ['title', 'placeholder'],
    Header: ['mobileBreakpoint'],
};

const isObj = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const isNode = v => isObj(v) && typeof v.type === 'string';

/** `image: {imageSrc, alt, caption}` -> `imageSrc`, `imageAlt`, `imageCaption` (also inside plain item objects). */
function flattenImage(obj) {
    if (!isObj(obj.image)) return obj;
    const { image, ...rest } = obj;
    const out = { ...rest };
    if (image.imageSrc !== undefined) out.imageSrc = image.imageSrc;
    if (image.alt !== undefined) out.imageAlt = image.alt;
    if (image.caption !== undefined) out.imageCaption = image.caption;
    return out;
}

function migratePlainItems(items) {
    return items.map(item => (isObj(item) ? flattenImage(item) : item));
}

export function migrateNode(old) {
    if (!isNode(old)) return old;
    const { type, data, children: topChildren, ...top } = old;
    const props = { ...(isObj(data) ? data : {}), ...top };
    const dataChildren = isObj(data) ? data.children : undefined;
    delete props.children;
    delete props.type;

    let children = [];
    for (const list of [dataChildren, topChildren]) {
        if (Array.isArray(list)) children.push(...list);
        else if (list !== undefined) children.push(list);
    }
    if (isNode(props.embeddedView)) {
        children.push(props.embeddedView);
    }
    delete props.embeddedView;

    if (Array.isArray(props.items) && props.items.length && props.items.every(isNode)) {
        children.push(...props.items);
        delete props.items;
    } else if (Array.isArray(props.items)) {
        props.items = migratePlainItems(props.items);
    }

    let slot = props.slot;
    if (props['data-position'] !== undefined) {
        if (props['data-position'] === 'far-item') slot = 'utility';
        delete props['data-position'];
    }
    delete props.slot;

    let out = flattenImage(props);
    if (out.contentUrl !== undefined) {
        out = { ...out, contentSrc: out.contentUrl };
        delete out.contentUrl;
    }
    for (const key of DEAD_PROPS[type] ?? []) delete out[key];

    const { id, label, ...rest } = out;
    const result = { type };
    if (id !== undefined) result.id = id;
    if (label !== undefined) result.label = label;
    if (slot !== undefined) result.slot = slot;
    Object.assign(result, rest);
    if (children.length) result.children = children.map(migrateNode);
    return result;
}

/** Page / story-file entries: `{title, data: {type,...}}` or a bare node whose `title` names the story. */
export function migrateEntry(entry) {
    if (Array.isArray(entry)) return entry.flatMap(migrateEntry);
    if (!isObj(entry)) return [entry];
    if (!isNode(entry) && (isNode(entry.data) || Array.isArray(entry.data))) {
        const inner = Array.isArray(entry.data) ? entry.data : [entry.data];
        return inner.map((node, i) => {
            const migrated = migrateNode(node);
            if (entry.title !== undefined && i === 0 && migrated.label === undefined) {
                return { type: migrated.type, ...(migrated.id !== undefined ? { id: migrated.id } : {}), label: entry.title, ...omit(migrated, ['type', 'id']) };
            }
            return migrated;
        });
    }
    if (isNode(entry)) return [migrateNode(entry)];
    return [entry];
}

function omit(obj, keys) {
    return Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
}

/** Top-level bare story nodes (Select.json) use `title` as the story name; capture it before dropping. */
function migrateStoryFile(json) {
    return json.flatMap(entry => {
        if (isNode(entry) && entry.title !== undefined && entry.label === undefined && !isObj(entry.data?.children)) {
            const { title, ...rest } = entry;
            const [node] = migrateEntry(rest);
            return [{ type: node.type, ...(node.id !== undefined ? { id: node.id } : {}), label: title, ...omit(node, ['type', 'id']) }];
        }
        return migrateEntry(entry);
    });
}

export function migrateJson(json, { storyFile = false } = {}) {
    if (Array.isArray(json)) return storyFile ? migrateStoryFile(json) : json.flatMap(migrateEntry);
    if (isNode(json)) return migrateNode(json);
    const [only] = migrateEntry(json);
    return only;
}

function looksLegacy(value) {
    if (Array.isArray(value)) return value.some(looksLegacy);
    if (!isObj(value)) return false;
    if (isObj(value.data) && (isNode(value) || isNode(value.data))) return true;
    return Object.values(value).some(looksLegacy);
}

function format(json, original) {
    const indent = /\n( +)\S/.exec(original)?.[1].length ?? 2;
    const eol = original.includes('\r\n') ? '\r\n' : '\n';
    return JSON.stringify(json, null, indent).replace(/\n/g, eol) + (/\n$/.test(original) ? eol : '');
}

function migrateMarkdown(text) {
    return text.replace(/(```json[^\n]*\r?\n)([\s\S]*?)(\r?\n\s*```)/g, (match, open, body, close) => {
        let parsed;
        try {
            parsed = JSON.parse(body);
        } catch {
            return match;
        }
        if (!looksLegacy(parsed)) return match;
        const migrated = migrateJson(parsed);
        const indent = /\n( +)\S/.exec(body)?.[1].length ?? 2;
        return open + JSON.stringify(migrated, null, indent) + close;
    });
}

function* walk(target) {
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
        for (const name of fs.readdirSync(target)) {
            if (name === 'node_modules' || name === 'dist' || name === 'build') continue;
            yield* walk(path.join(target, name));
        }
    } else yield target;
}

function main(argv) {
    const check = argv.includes('--check');
    const targets = argv.filter(a => !a.startsWith('--'));
    let changed = 0;
    for (const target of targets) {
        for (const file of walk(target)) {
            const ext = path.extname(file);
            if (!['.json', '.md', '.mdx'].includes(ext) || path.basename(file) === 'package.json') continue;
            const original = fs.readFileSync(file, 'utf8');
            let next;
            if (ext === '.json') {
                let json;
                try {
                    json = JSON.parse(original);
                } catch {
                    continue;
                }
                const storyFile = file.replace(/\\/g, '/').split('/').includes('Stories');
                if (!looksLegacy(json) && !(storyFile && Array.isArray(json) && json.some(e => isNode(e) && e.title !== undefined))) continue;
                next = format(migrateJson(json, { storyFile }), original);
            } else {
                next = migrateMarkdown(original);
            }
            if (next !== original) {
                changed++;
                console.log(`${check ? 'would migrate' : 'migrated'} ${file}`);
                if (!check) fs.writeFileSync(file, next);
            }
        }
    }
    if (check && changed) process.exit(1);
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('migrate-json.mjs')) {
    main(process.argv.slice(2));
}
