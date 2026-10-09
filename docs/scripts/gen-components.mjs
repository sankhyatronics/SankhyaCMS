// Generates docs/components/*.md from the Lit package's custom-elements.json (itself generated from
// the source's JSDoc by `cem analyze`) and the schema's componentTags. Run by `pnpm build|start`.
import fs from 'node:fs';
import path from 'node:path';
import { componentTags } from '@sankhyatronics/sankhya-cms/schema';

const manifestPath = path.resolve(import.meta.dirname, '../../packages/sankhya-cms/custom-elements.json');
const outDir = path.resolve(import.meta.dirname, '../docs/components');

if (!fs.existsSync(manifestPath)) {
  console.error('custom-elements.json not found — build @sankhyatronics/sankhya-cms first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const jsonTypeByTag = Object.fromEntries(Object.entries(componentTags).map(([type, tag]) => [tag, type]));

/** Escapes text for a markdown table cell / MDX (no raw HTML or braces). */
const cell = text =>
  String(text ?? '')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\|/g, '\\|')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .trim();

/** MDX-safe prose (descriptions come from JSDoc, which may contain `<tag>` and `{}`; keep code spans intact). */
const prose = text =>
  String(text ?? '')
    .split(/(`[^`]*`)/g)
    .map((part, i) => (i % 2 ? part : part.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')))
    .join('')
    .trim();

const code = text => (text ? `\`${String(text).replace(/\s*\n\s*/g, ' ').replace(/\|/g, '\\|')}\`` : '');

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, '_category_.json'), JSON.stringify({ label: 'Components', position: 5 }, null, 2));

const elements = manifest.modules
  .flatMap(module => (module.declarations ?? []).map(declaration => ({ declaration, module })))
  .filter(({ declaration }) => declaration.customElement && declaration.tagName)
  .sort((a, b) => a.declaration.tagName.localeCompare(b.declaration.tagName));

const rows = [];

for (const { declaration: d } of elements) {
  const tag = d.tagName;
  const jsonType = jsonTypeByTag[tag];
  const slug = tag.replace(/^st-/, '');
  const props = (d.members ?? []).filter(
    (m, i, all) =>
      m.kind === 'field' &&
      !m.static &&
      !['private', 'protected'].includes(m.privacy ?? '') &&
      !m.name.startsWith('_') &&
      all.findIndex(o => o.kind === 'field' && o.name === m.name) === i
  );

  const lines = [];
  lines.push('---', `title: ${tag}`, `sidebar_label: ${d.name}`, '---', '');
  lines.push(`# \`<${tag}>\``, '');
  if (jsonType) lines.push(`JSON \`type\`: \`${jsonType}\``, '');
  if (d.description) lines.push(prose(d.description), '');

  lines.push('## Usage', '', '```ts', `import '@sankhyatronics/sankhya-cms/${slug}'; // registers <${tag}>`, '```', '');

  if (props.length) {
    lines.push('## Properties', '', '| Property | Attribute | Type | Default | Description |', '| --- | --- | --- | --- | --- |');
    for (const p of props) {
      lines.push(`| \`${p.name}\` | ${p.attribute ? code(p.attribute) : '—'} | ${code(p.type?.text)} | ${code(p.default)} | ${cell(p.description)} |`);
    }
    lines.push('');
  }

  if (d.slots?.length) {
    lines.push('## Slots', '', '| Slot | Description |', '| --- | --- |');
    for (const s of d.slots) lines.push(`| ${s.name ? `\`${s.name}\`` : '(default)'} | ${cell(s.description)} |`);
    lines.push('');
  }

  if (d.events?.length) {
    lines.push('## Events', '', '| Event | Detail | Description |', '| --- | --- | --- |');
    for (const e of d.events) lines.push(`| \`${e.name}\` | ${code(e.type?.text)} | ${cell(e.description)} |`);
    lines.push('');
  }

  lines.push('See the live examples in [Storybook](https://sankhyaui-stories.sankhyatronics.com).', '');
  fs.writeFileSync(path.join(outDir, `${slug}.md`), lines.join('\n'));
  rows.push({ tag, slug, jsonType, summary: (d.description ?? '').split(/\n\s*\n/)[0] });
}

const index = [
  '---',
  'title: Components',
  'sidebar_position: 0',
  '---',
  '',
  '# Components',
  '',
  'Every component is a Lit custom element. The JSON `type` is what page JSON uses; the React binding exports a component of the same name.',
  '',
  '| Element | JSON `type` | Summary |',
  '| --- | --- | --- |',
  ...rows.map(r => `| [\`<${r.tag}>\`](./${r.slug}.md) | ${r.jsonType ? `\`${r.jsonType}\`` : '—'} | ${cell(r.summary)} |`),
  ''
];
fs.writeFileSync(path.join(outDir, 'index.md'), index.join('\n'));
console.warn(`Generated ${rows.length} component pages.`);
