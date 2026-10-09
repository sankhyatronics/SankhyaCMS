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

/** Floating menu/dropdown panel chrome (user menu, language menu, ...). */
export const dropdownPanelStyles = css`
  position: absolute;
  top: 38px;
  right: 0;
  background: var(--st-color-surface);
  border: 1px solid var(--st-color-border);
  border-radius: var(--st-radius-sm);
  box-shadow: 0 4px 16px var(--st-shadow-color-sm);
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
