import { css } from 'lit';

/**
 * Reusable `css` fragments shared across component `static styles` blocks.
 *
 * Lit's `css` tag allows interpolating another `CSSResult` anywhere inside a
 * template, including mid-rule — `${fragment}` below expands to raw CSS
 * text, so these compose into a component's own selectors without forcing a
 * shared class name or touching `render()`. Each component keeps its own
 * selectors; only the duplicated property lists move here. Layout details
 * that genuinely vary per component (padding, gap, font-size, ...) stay
 * local, declared after a fragment so the cascade lets them override it.
 *
 * Add a fragment here only once a pattern is byte-identical (or near enough
 * that the deltas are better expressed as local overrides) across 3+
 * components — see `packages/suite-components/README.md#shared-style-fragments`.
 */

/** Truncates overflowing text to a single line with an ellipsis. */
export const truncateStyles = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * Base for an unstyled, click-through interactive element (icon buttons,
 * menu triggers, link-like buttons) before component-specific padding,
 * font-size, and color are layered on.
 */
export const buttonResetStyles = css`
  border: 0;
  background: transparent;
  font: inherit;
  cursor: pointer;
`;

/**
 * The pill CTA shape (`buttonStyle="pill"`): fully rounded, centred label, `min-height` 52px for a
 * main CTA (hero, banner). A component can set `--st-cta-pill-min-height: 44px` for smaller CTAs.
 * Fill, colour, border and padding stay local (they differ between primary and secondary).
 */
export const ctaPillStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--st-space-8);
  box-sizing: border-box;
  min-height: var(--st-cta-pill-min-height, 52px);
  padding: 0 var(--st-space-28);
  border-radius: 9999px;
  font-weight: var(--st-font-weight-semibold);
  text-decoration: none;
`;

/**
 * The dark-filled primary-action button look (wizard Next/Generate/Run/Save,
 * active toggle buttons, ...). Pair with `ctaButtonDisabledStyles` on the
 * same selector's `:disabled` state.
 */
export const ctaButtonStyles = css`
  border: 0;
  border-radius: var(--st-button-radius);
  background: var(--st-button-primary-bg);
  color: var(--st-button-primary-color);
  font-weight: var(--st-button-font-weight);
  cursor: pointer;
`;

export const ctaButtonDisabledStyles = css`
  background: var(--st-color-subtle);
  cursor: not-allowed;
`;

/**
 * Just the fill (background + color) from `ctaButtonStyles`, for selectors
 * that only need to swap an already-bordered/sized button into the CTA look
 * on an active/pressed/selected state (`[aria-pressed='true']`, `.active`,
 * ...) rather than defining the button from scratch.
 */
export const ctaButtonFillStyles = css`
  background: var(--st-button-primary-bg);
  color: var(--st-button-primary-color);
`;

/**
 * A floating panel is its own surface: it puts back the theme.css surface tokens, so an ancestor
 * that re-scoped them (st-header[tinted]'s light-on-dark bar) doesn't reach the panel or the
 * content slotted into it. The values are the theme.css definitions, read from the primary and
 * shade layers, which no host re-scopes, so outside such an ancestor nothing changes.
 */
export const surfaceTokenStyles = css`
  --st-color-surface: var(--st-primary-canvas);
  --st-color-text: var(--st-neutral-950);
  --st-color-text-strong: var(--st-neutral-950);
  --st-color-text-secondary: var(--st-primary-text-secondary);
  --st-color-text-muted: var(--st-primary-text-muted);
  --st-color-hover: var(--st-hover-subtle);
  --st-color-border: var(--st-primary-line);
  --st-color-divider: var(--st-primary-divider);
  --st-color-accent: var(--st-primary-accent);
  --st-color-accent-text: var(--st-accent-text);
  --st-color-accent-subtle: var(--st-accent-subtle);
  --st-color-accent-border: var(--st-accent-border);
  /* Items in a panel never take a bar's nav colours. */
  --st-nav-color: initial;
  --st-nav-hover-bg: initial;
  --st-nav-active-line: initial;
  --st-nav-item-radius: initial;
`;

/** Floating menu/dropdown panel chrome (user menu, language menu, ...). */
export const dropdownPanelStyles = css`
  ${surfaceTokenStyles}
  position: absolute;
  top: 38px;
  right: 0;
  background: var(--st-color-surface);
  color: var(--st-color-text);
  border: 1px solid var(--st-color-border);
  border-radius: var(--st-dropdown-panel-radius);
  box-shadow: var(--st-dropdown-panel-shadow);
  z-index: 30;
  overflow: hidden;
`;

/** "No results" / "Nothing here." empty-state text. Padding stays local. */
export const emptyStateStyles = css`
  text-align: center;
  color: var(--st-color-text-muted);
  font-size: var(--st-text-base);
`;

/** Bordered, rounded shell wrapping a data table (browse/list views). */
export const tableShellStyles = css`
  background: var(--st-color-surface);
  border: 1px solid var(--st-color-border);
  border-radius: var(--st-radius-md);
  overflow: hidden;
`;

/** A single bordered result row with a name (truncated) + trailing link. */
export const resultRowStyles = css`
  display: flex;
  align-items: center;
  gap: var(--st-space-12);
  padding: var(--st-space-12) var(--st-space-14);
  border: 1px solid var(--st-color-border);
  border-radius: var(--st-radius-sm);
`;

export const resultNameStyles = css`
  flex: 1;
  min-width: 120px;
  font-size: var(--st-text-base);
  font-weight: var(--st-font-weight-medium);
  ${truncateStyles}
`;

export const resultLinkStyles = css`
  font-size: var(--st-text-sm);
  font-weight: var(--st-font-weight-semibold);
  color: var(--st-color-accent-text);
`;

/**
 * Uppercase, letter-spaced section/field "eyebrow" label (card headings,
 * table headers, field labels, ...). Font-size stays local since it varies
 * (11–12px) by context.
 */
export const eyebrowLabelStyles = css`
  font-weight: var(--st-font-weight-bold);
  color: var(--st-color-text-muted);
  text-transform: uppercase;
  letter-spacing: var(--st-tracking-wide);
`;

/** Top border separating stacked rows in a list/table (folder rows, data rows, table rows, ...). */
export const rowDividerStyles = css`
  border-top: 1px solid var(--st-color-divider);
`;

/**
 * Bordered, rounded surface shell for a card/tile/panel (as opposed to
 * `tableShellStyles`, which additionally clips overflow for tabular content).
 * Padding, gap, and cursor stay local since they vary by component.
 */
export const cardShellStyles = css`
  background: var(--st-color-surface);
  border: 1px solid var(--st-color-border);
  border-radius: var(--st-radius-md);
`;

/** A card/tile/row's bold primary name line (folder tiles/rows, template cards, ...). */
export const itemNameStyles = css`
  font-size: var(--st-text-base);
  font-weight: var(--st-font-weight-semibold);
  color: var(--st-color-text-strong);
`;

/** A card/tile/row's muted secondary caption line, paired with `itemNameStyles`. */
export const itemCaptionStyles = css`
  font-size: var(--st-text-xs);
  color: var(--st-color-text-muted);
`;

/**
 * Whole rules (not a property list) every component's stylesheet starts
 * with: routes keyboard focus rings and native checkbox/radio tint through
 * `--st-focus-ring` / `--st-checkbox-color`, whose defaults (`auto`) keep
 * the browser's own look until a host app themes them.
 */
export const controlBaseStyles = css`
  :is(button, a, input, select, textarea, [tabindex]):focus-visible {
    outline: var(--st-focus-ring);
    outline-offset: var(--st-focus-ring-offset);
  }

  input[type='checkbox'],
  input[type='radio'] {
    accent-color: var(--st-checkbox-color);
  }
`;

/** Default font stack, used by nearly every component. */
export const fontFamilyStyles = css`
  font-family: var(--st-font-family);
`;

/**
 * Font stack for page-root/chrome components (`st-template-hub`, the admin
 * and configuration pages, `st-app-header`, ...). Identical to
 * `fontFamilyStyles` now that `--st-font-family` always resolves via
 * `theme.css` (no per-usage fallback) — kept as a separate export so those
 * call sites stay semantically distinct if the two ever need to diverge
 * again.
 */
export const rootFontFamilyStyles = css`
  font-family: var(--st-font-family);
`;

/** Canonical responsive breakpoints (px). Interpolate as `${BREAKPOINT_TABLET}px`. */
export const BREAKPOINT_TABLET = 900;
export const BREAKPOINT_MOBILE = 500;
