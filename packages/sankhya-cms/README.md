# @sankhyatronics/sankhya-cms

Lit web components (`st-*`) for building JSON-driven portals: hero, header, footer, feature sections, bento grid, carousel, accordion, cookie consent and more. Framework-free — use them from plain HTML, Lit, or any framework. For React, use [`@sankhyatronics/sankhya-cms-react`](https://www.npmjs.com/package/@sankhyatronics/sankhya-cms-react).

```sh
npm install @sankhyatronics/sankhya-cms
```

```ts
import '@sankhyatronics/sankhya-cms/theme.css';
import '@sankhyatronics/sankhya-cms/themes.css';
import '@sankhyatronics/sankhya-cms/cms-theme.css';
import '@sankhyatronics/sankhya-cms/hero'; // registers <st-hero>
```

```html
<st-hero title="Hello" subtitle="From a custom element" action-label="Start" href="/start"></st-hero>
```

Every component has its own entry point (`@sankhyatronics/sankhya-cms/<name>`); `@sankhyatronics/sankhya-cms` registers all of them.

## Page JSON

`@sankhyatronics/sankhya-cms/schema` defines the flat JSON contract used by renderers: `ComponentNode`, `componentTags` (JSON `type` → element), `validatePage`, `patchNodeById`.

```json
{ "type": "Hero", "title": "Hello", "children": [] }
```

## Theming

Colours, spacing and type come from CSS custom properties (`--st-*`) set at `:root`; `themes.css` adds `:root.dark` and accent themes. `custom-elements.json` ships with the package for editor and docs tooling.

MIT licensed.
