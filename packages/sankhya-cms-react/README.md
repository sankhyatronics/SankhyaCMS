# @sankhyatronics/sankhya-cms-react

React wrappers for the [`@sankhyatronics/sankhya-cms`](../sankhya-cms) Lit components, plus `DynamicRenderer`, which renders JSON page content (the flat `ComponentNode` schema, defined in `@sankhyatronics/sankhya-cms/schema`) with them.

Every component here is a thin wrapper — the UI is implemented once, in the Lit `st-*` elements. Load the theme once in the host app:

```ts
import '@sankhyatronics/sankhya-cms/theme.css';
import '@sankhyatronics/sankhya-cms/themes.css';
import '@sankhyatronics/sankhya-cms/cms-theme.css';
```

```tsx
import { DynamicRenderer } from '@sankhyatronics/sankhya-cms-react';

<DynamicRenderer config={pageJson} handlers={{ onThemeChangeClick }} />
```

Inside a react-router `<Router>`, internal link clicks are routed with `navigate()` instead of reloading the page.
