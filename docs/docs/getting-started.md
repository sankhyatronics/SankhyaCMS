---
title: Getting started
sidebar_position: 2
---

# Getting started

Developing this repo needs Node 26. The published packages are plain ES modules and run in any modern browser.

## Plain HTML / Lit

```sh
npm install @sankhyatronics/sankhya-cms
```

Load the theme once, then import the elements you use. Each import registers its tag.

```ts
import '@sankhyatronics/sankhya-cms/theme.css';
import '@sankhyatronics/sankhya-cms/themes.css';
import '@sankhyatronics/sankhya-cms/cms-theme.css';

import '@sankhyatronics/sankhya-cms/hero';
import '@sankhyatronics/sankhya-cms/footer';
```

```html
<st-hero title="Hello" subtitle="From a custom element" action-label="Start" href="/start"></st-hero>
```

Properties that take arrays or objects (such as `items`) are set as JavaScript properties, not attributes:

```ts
document.querySelector('st-stats').items = [{ value: '99.9%', label: 'Uptime' }];
```

Import `@sankhyatronics/sankhya-cms` to register everything at once.

## React

```sh
npm install @sankhyatronics/sankhya-cms @sankhyatronics/sankhya-cms-react
```

```tsx
import '@sankhyatronics/sankhya-cms/theme.css';
import '@sankhyatronics/sankhya-cms/themes.css';
import '@sankhyatronics/sankhya-cms/cms-theme.css';
import { Hero, DynamicRenderer } from '@sankhyatronics/sankhya-cms-react';

<Hero title="Hello" actionLabel="Start" href="/start" />

<DynamicRenderer config={[{ type: 'Hero', title: 'Hello' }]} />
```

See [React binding](./react.md).
