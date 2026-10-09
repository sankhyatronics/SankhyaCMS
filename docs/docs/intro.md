---
slug: /
title: Introduction
sidebar_position: 1
---

# Sankhya CMS

Lit web components (`st-*`) for building JSON-driven portals, with thin React bindings.

| Package | What it is |
| --- | --- |
| [`@sankhyatronics/sankhya-cms`](https://www.npmjs.com/package/@sankhyatronics/sankhya-cms) | The components. Every base component is implemented once, here, as a Lit element. Also ships the theme CSS and the JSON schema. |
| [`@sankhyatronics/sankhya-cms-react`](https://www.npmjs.com/package/@sankhyatronics/sankhya-cms-react) | React wrappers over the elements, plus `DynamicRenderer`, which renders page JSON. |

## How it fits together

1. **Content** is plain JSON: a list of nodes such as `{ "type": "Hero", "title": "…" }`. See [Page JSON](./json-schema.md).
2. **Components** are custom elements, so they work in any framework or none. See [Components](./components/index.md).
3. **A renderer** turns JSON into elements. The React package ships one; another binding only has to map each JSON `type` to its element (the map is exported as `componentTags`).
4. **Theming** is CSS custom properties. See [Theming](./theming.md).

Start with [Getting started](./getting-started.md).
