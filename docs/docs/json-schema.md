---
title: Page JSON
sidebar_position: 3
---

# Page JSON

A page is a list of **nodes**. A node is a flat object: its `type` picks the component, and every other key is a property of that component.

```json
[
  {
    "type": "Hero",
    "id": "home-hero",
    "title": "Build portals from JSON",
    "actionLabel": "Get started",
    "href": "/start"
  },
  {
    "type": "Header",
    "title": "Acme",
    "children": [
      { "type": "MenuItem", "title": "Home", "href": "/" },
      { "type": "IconButton", "slot": "utility", "icon": "mdi:theme-light-dark", "onClick": "@action:toggleTheme" }
    ]
  }
]
```

## Reserved keys

| Key | Meaning |
| --- | --- |
| `type` | Required. One of the [component](./components/index.md) JSON types. |
| `id` | Optional. Used to find a node (for example with `patchNodeById`) and as its element id. |
| `children` | Optional list of nodes rendered inside the component. |
| `slot` | Optional. Which named slot of the parent this child goes into; omit for the default slot. A `Header` takes `utility` for its right-hand controls. |
| `label` | Optional editor-only label. Never passed to the component. |

Everything else is passed to the component as a property.

## Actions

A string value of the form `"@action:name"` is replaced, anywhere in a node's properties, by `handlers.name` from the renderer:

```tsx
<DynamicRenderer config={page} handlers={{ toggleTheme: () => { /* … */ } }} />
```

## Rules the validator enforces

- every `type` is a known component (or a custom one you register);
- `items` holds plain data — nest components under `children`, never inside `items`;
- `children` is an array;
- no legacy keys: `data`, `embeddedView`, `data-position`, `image`, `contentUrl` (the flat schema uses `imageSrc`, `imageAlt`, `imageCaption` and `contentSrc`).

```ts
import { validatePage } from '@sankhyatronics/sankhya-cms/schema';

const problems = validatePage(json); // [] when valid
```

`scripts/migrate-json.mjs` in the repo upgrades content written in the old shape (`--check` reports without writing).
