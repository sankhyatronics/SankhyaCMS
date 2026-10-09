import { html } from 'lit';
import type { TemplateResult } from 'lit';

/**
 * Every inline SVG icon used across components, centralized so a glyph's
 * path data lives in exactly one place instead of being copy-pasted at each
 * call site. Each icon is a small function returning a Lit `TemplateResult`
 * (not a `css`-style fragment) so callers can size — and, where noted, class
 * — the icon per context while sharing the same markup.
 */

const FOLDER_ICON_COLOR = 'oklch(0.72 0.09 75)';

/** Filled folder glyph (browse rows/tiles). Fixed 20x16 — folders don't resize per usage. */
export function folderIcon(): TemplateResult {
  return html`
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
      <path d="M0 2a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V2z" fill=${FOLDER_ICON_COLOR} />
    </svg>
  `;
}

/** Outlined folder glyph (breadcrumb crumb icon). `className` lets the caller hook its own layout class. */
export function folderOutlineIcon(size = 11, className = ''): TemplateResult {
  return html`
    <svg class=${className} width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4h5l2 2h9v12H4V4z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `;
}

/** External-link/"open" glyph (open site/library actions in the Templates/Data/Save-location pickers). */
export function externalLinkIcon(size = 15): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5M15 4h5v5M20 4l-9 9"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `;
}

/** Refresh/reload glyph (Templates/Data picker refresh buttons). */
export function refreshIcon(size = 15): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17.65 6.35A7.958 7.958 0 0 0 12 4a8 8 0 1 0 8 8h-2a6 6 0 1 1-6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
        fill="currentColor"
      />
    </svg>
  `;
}

/** Clock glyph (the wizard's "Recent activity" history trigger button, Steps 1-3). */
export function historyIcon(size = 15): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

/** Trash/delete glyph (clear-all button in the selected-chips summary badge). */
export function trashIcon(size = 15): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4h2l1.2 12.4A2 2 0 0 0 9.2 18.2h8.1a2 2 0 0 0 1.98-1.7L20.5 8H6.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="10" cy="21" r="1.4" fill="currentColor" />
      <circle cx="17" cy="21" r="1.4" fill="currentColor" />
    </svg>
  `;
}

/** Chevron glyph (pager prev/next buttons, the select trigger's caret). */
export function chevronIcon(direction: 'left' | 'right' | 'down', size = 14): TemplateResult {
  const d = { left: 'M15 18l-6-6 6-6', right: 'M9 6l6 6-6 6', down: 'M6 9l6 6 6-6' }[direction];

  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d=${d} stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

/** Plus glyph ("New folder" action button). */
export function plusIcon(size = 13): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
    </svg>
  `;
}

/** Cards-view glyph (2x2 grid — view-toggle button). */
export function cardsViewIcon(size = 15): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  `;
}

/** Checkmark glyph (completed-step marker in the step indicator). */
export function checkIcon(size = 14): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12l5 5L20 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

/** SharePoint site glyph (globe — root "All sites" browser rows). */
export function siteIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" stroke-width="1.6" />
    </svg>
  `;
}

/** 3x3 dot-grid glyph (bento-menu app-switcher trigger). */
export function bentoGridIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6 4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6 4h4v-4h-4M4 8h4V4H4z"
      />
    </svg>
  `;
}

/** List-view glyph (stacked rows — view-toggle button). */
export function listViewIcon(size = 15): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="2" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="6" y="2.5" width="9" height="2" rx="1" fill="currentColor" />
      <rect x="1" y="6.5" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="6" y="7" width="9" height="2" rx="1" fill="currentColor" />
      <rect x="1" y="11" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="6" y="11.5" width="9" height="2" rx="1" fill="currentColor" />
    </svg>
  `;
}

/**
 * A small set of generic domain icons for `st-menu-grid-item`'s icon slot (nav "mega menu"
 * entries — sales/purchase/accounting/settings items) — deliberately simple line glyphs rather
 * than pixel-perfect illustrations, same fidelity level as the icons above.
 */

/** Shopping-cart glyph (sales/orders). */
export function cartIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 4h2l2.4 12.4A2 2 0 0 0 9.36 18h8.2a2 2 0 0 0 1.96-1.6L21 8H6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="10" cy="21" r="1.4" fill="currentColor" />
      <circle cx="17" cy="21" r="1.4" fill="currentColor" />
    </svg>
  `;
}

/** Delivery-truck glyph (purchase orders / receiving). */
export function truckIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 6h11v10H2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M13 10h4l4 3.5V16h-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <circle cx="6.5" cy="18" r="1.8" stroke="currentColor" stroke-width="2" />
      <circle cx="16.5" cy="18" r="1.8" stroke="currentColor" stroke-width="2" />
    </svg>
  `;
}

/** Package/box glyph (products, inventory). */
export function boxIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2L12 3z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path d="M4.2 7.2L12 11l7.8-3.8M12 11v10" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>
  `;
}

/** Map-pin glyph (stock locations). */
export function mapPinIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" stroke-width="2" />
    </svg>
  `;
}

/** Two-person glyph (partners — customers/vendors/employees). */
export function usersIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" stroke-width="2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path
        d="M16 5.3a3.2 3.2 0 0 1 0 6.2M19 20c0-2.8-2-5.1-4.6-5.8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  `;
}

/** Open-book glyph (journals). */
export function bookIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5.5c-1.6-1-4-1.5-6-1.5-1 0-2 .1-3 .4v13.6c1-.3 2-.4 3-.4 2 0 4.4.5 6 1.5m0-13.6c1.6-1 4-1.5 6-1.5 1 0 2 .1 3 .4v13.6c-1-.3-2-.4-3-.4-2 0-4.4.5-6 1.5m0-13.6v13.6"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `;
}

/** Document/invoice glyph. */
export function documentIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 2h9l5 5v15H6V2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M15 2v5h5" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M9 12h6M9 16h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `;
}

/** Receipt glyph, zig-zag bottom edge (credit/debit notes). */
export function receiptIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 2h14v19l-2.5-1.6L14 21l-2.5-1.6L9 21l-2.5-1.6L5 21V2z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path d="M8 8h8M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `;
}

/** Percent glyph (taxes). */
export function percentIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 5L5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" stroke-width="2" />
      <circle cx="17" cy="17" r="2.5" stroke="currentColor" stroke-width="2" />
    </svg>
  `;
}

/** Stacked-coins glyph (payment terms). */
export function coinsIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="8" cy="7" rx="5.5" ry="3" stroke="currentColor" stroke-width="2" />
      <path d="M2.5 7v10c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3V7" stroke="currentColor" stroke-width="2" />
      <path d="M2.5 12c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3" stroke="currentColor" stroke-width="2" />
      <ellipse cx="16.5" cy="12" rx="5" ry="2.7" stroke="currentColor" stroke-width="2" />
      <path d="M11.5 12v5c0 1.5 2.2 2.7 5 2.7s5-1.2 5-2.7v-5" stroke="currentColor" stroke-width="2" />
    </svg>
  `;
}

/** Padlock glyph (fiscal year closing / lock dates). */
export function lockIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" stroke-width="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <circle cx="12" cy="16" r="1.6" fill="currentColor" />
    </svg>
  `;
}

/**
 * Office file-type glyphs, ported from `PennyIcons` in `@sankhyatronics/sankhya-icons`
 * (FileWordIcon/FileExcelIcon/FilePowerPointIcon) — this package is Lit, so it can't import
 * the React components and carries the same path data instead. Filled, `currentColor`.
 */
const FILE_TYPE_ICON_PATHS = {
  word: 'm19.95 5.54-3.48-3.49A6.96 6.96 0 0 0 11.52 0H7C4.24 0 2 2.24 2 5v14c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5v-8.51c0-1.87-.73-3.63-2.05-4.95Zm-1.41 1.41c.32.32.59.67.81 1.05h-4.34c-.55 0-1-.45-1-1V2.66c.38.22.73.49 1.05.81l3.48 3.49ZM20 19c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V5c0-1.65 1.35-3 3-3h4.51c.16 0 .33 0 .49.02V7c0 1.65 1.35 3 3 3h4.98c.02.16.02.32.02.49V19Zm-3.28-5.76L15.3 18.9c-.15.61-.68 1.05-1.31 1.09-.63.04-1.21-.32-1.44-.91L12 17.7l-.55 1.38c-.22.56-.75.91-1.34.91h-.1c-.63-.04-1.15-.48-1.31-1.1l-1.41-5.66a1 1 0 0 1 1.94-.48l1 4 .85-2.13a1 1 0 0 1 1.86 0l.84 2.13 1.01-4a1 1 0 0 1 1.94.48Z',
  excel:
    'M15.27 13.64 13.3 16l1.97 2.36a1.001 1.001 0 1 1-1.54 1.28L12 17.56l-1.73 2.08a.99.99 0 0 1-.77.36c-.23 0-.45-.08-.64-.23-.42-.35-.48-.98-.13-1.41L10.7 16l-1.97-2.36a1.001 1.001 0 1 1 1.54-1.28L12 14.44l1.73-2.08c.35-.42.98-.48 1.41-.13.42.35.48.98.13 1.41ZM22 10.49V19c0 2.76-2.24 5-5 5H7c-2.76 0-5-2.24-5-5V5c0-2.76 2.24-5 5-5h4.51c1.87 0 3.63.73 4.95 2.05l3.48 3.49a6.96 6.96 0 0 1 2.05 4.95Zm-6.95-7.03c-.32-.32-.67-.59-1.05-.81V7c0 .55.45 1 1 1h4.34c-.22-.38-.49-.73-.81-1.05l-3.48-3.49ZM20 10.48c0-.16 0-.33-.02-.49H15c-1.65 0-3-1.35-3-3V2.02C11.84 2 11.68 2 11.51 2H7C5.35 2 4 3.35 4 5v14c0 1.65 1.35 3 3 3h10c1.65 0 3-1.35 3-3v-8.51Z',
  powerpoint:
    'm19.95 5.54-3.49-3.49A6.96 6.96 0 0 0 11.51 0H7C4.24 0 2 2.24 2 5v14c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5v-8.51c0-1.87-.73-3.63-2.05-4.95Zm-1.41 1.41c.32.32.59.67.81 1.05h-4.34c-.55 0-1-.45-1-1V2.66c.38.22.73.49 1.05.81l3.49 3.49ZM20 19c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V5c0-1.65 1.35-3 3-3h4.51c.16 0 .33 0 .49.02V7c0 1.65 1.35 3 3 3h4.98c.02.16.02.32.02.49V19Zm-10 1c-.55 0-1-.45-1-1v-5c0-1.1.9-2 2-2h1c1.65 0 3 1.35 3 3s-1.35 3-3 3h-1v1c0 .55-.45 1-1 1Zm1-4h1c.55 0 1-.45 1-1s-.45-1-1-1h-1v2Z'
} as const;

/** Word/Excel/PowerPoint file glyph (the document icon in front of template/file rows). */
export function fileTypeIcon(type: keyof typeof FILE_TYPE_ICON_PATHS, size = 24): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d=${FILE_TYPE_ICON_PATHS[type]} />
    </svg>
  `;
}

/** Hamburger glyph (`st-header`'s mobile nav toggle, closed state). */
export function menuIcon(size = 20): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `;
}

/** X/close glyph (`st-header`'s mobile nav toggle, open state). */
export function closeIcon(size = 20): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `;
}

/** Gear/cog glyph (company settings). */
export function gearIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
      <path
        d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18 6l-1.6 1.6M7.6 16.4L6 18M18 18l-1.6-1.6M7.6 7.6L6 6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  `;
}

/** Paint-palette glyph (theme/color-scheme switcher). */
export function paletteIcon(size = 18): TemplateResult {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1.1.9-2 2-2h2a4 4 0 0 0 4-4c0-4.4-4-7.5-9-7.5z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" />
      <circle cx="11" cy="7" r="1.2" fill="currentColor" />
      <circle cx="15.5" cy="7.5" r="1.2" fill="currentColor" />
      <circle cx="17.5" cy="11.5" r="1.2" fill="currentColor" />
    </svg>
  `;
}
