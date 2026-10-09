---
title: Theming
sidebar_position: 5
---

# Theming

Load the base tokens once, then the theme classes and the CMS display sizes:

```ts
import '@sankhyatronics/sankhya-cms/theme.css';
import '@sankhyatronics/sankhya-cms/themes.css';
import '@sankhyatronics/sankhya-cms/cms-theme.css';
```

Every component styles itself with `var(--st-…)` custom properties, which inherit through shadow DOM. Override them at `:root` (or any ancestor) to re-skin or re-scale the whole tree.

| Layer | Tokens | Override for |
| --- | --- | --- |
| Primaries | `--st-primary-color`, `--st-primary-background`, `--st-brand-color`, `--st-font-family` | A full rebrand |
| Neutral ramp | `--st-neutral-50` … `--st-neutral-950` | A different grey scale |
| Semantic | `--st-color-text`, `--st-color-surface`, `--st-radius-md`, `--st-text-sm`, … | A single exception |
| CMS display sizes | `--st-cms-text-display`, `--st-cms-section-padding`, `--st-cms-container-max` | Rescaling marketing sections |

## Theme classes

`themes.css` defines `dark`, `red`, `amber`, `lime`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `fuchsia` and `pink`. Put one on `<html>`:

```html
<html class="dark">
```

## A custom theme

Setting the primaries is enough:

```css
:root {
  --st-primary-color: oklch(13.9% 0.04 261);
  --st-primary-background: oklch(98.4% 0.003 248);
}

:root.dark {
  --st-primary-color: oklch(98.4% 0.003 248);
  --st-primary-background: oklch(13.9% 0.04 261);
}
```

## Applying a theme at runtime

`@sankhyatronics/sankhya-cms/theming` exports the theme list and a helper that swaps the class on `<html>` and sets `color-scheme`. It does not store anything — remember the choice wherever suits your app.

```ts
import { THEMES, applyTheme, watchSystemTheme } from '@sankhyatronics/sankhya-cms/theming';

applyTheme('dark');                 // returns the theme actually applied
applyTheme(null);                   // nobody chose: follow the OS light/dark setting
const stop = watchSystemTheme(applyTheme);
```

## Fonts

Some themes set a font family (Open Sans, Arimo, Quicksand, Nunito, …). The package does not bundle fonts; load the ones you use, for example from Google Fonts, in your page `<head>`.
