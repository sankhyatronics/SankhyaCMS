---
title: React binding
sidebar_position: 4
---

# React binding

`@sankhyatronics/sankhya-cms-react` contains no UI of its own. Each export wraps a Lit element with `@lit/react`, so properties are set as properties and events are `onXxx` props. A few adapters translate React-style props into the element's slots (`icon` strings, `isActive`, `ariaLabel`, `menuBar` / `utilityButtons`).

## Components

Every [component](./components/index.md) is exported under its JSON type name: `Hero`, `Header`, `Footer`, `Stats`, …

```tsx
import { Hero, Stats } from '@sankhyatronics/sankhya-cms-react';

<Hero title="Hello" actionLabel="Start" href="/start" />
<Stats items={[{ value: '120+', label: 'Customers' }]} />
```

## DynamicRenderer

Renders [page JSON](./json-schema.md):

```tsx
import { DynamicRenderer } from '@sankhyatronics/sankhya-cms-react';

<DynamicRenderer config={page} handlers={{ toggleTheme }} onError={(error, node) => report(error, node)} />
```

A node that fails to render is contained by its own error boundary; the rest of the page still renders. Register your own components with `registerComponent('MyType', MyComponent)`.

## Routing

Inside a react-router `<Router>`, clicks on internal links (hrefs with no scheme) are routed with `navigate()` instead of reloading the page. Outside a router they behave as normal links. Calling `event.preventDefault()` in your own handler opts out.

## Helpers

| Export | Purpose |
| --- | --- |
| `patchNodeById(nodes, id, props)` | Returns a copy of the page with props merged into one node — inject runtime state (such as the selected language) without mutating fetched JSON. |
| `validatePage`, `validateNode`, `componentTags` | Re-exported from `@sankhyatronics/sankhya-cms/schema`. |
| `fetchLocalContent`, `fetchGithubContent` | Fetch page JSON from your own site or a GitHub repo. |
| `UserProvider`, `useUser` | Language and theme state with local storage persistence. |
| `ScrollToTop` | Scrolls to the top on route changes. |
