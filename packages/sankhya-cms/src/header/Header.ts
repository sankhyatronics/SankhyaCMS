import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { chevronIcon, closeIcon, menuIcon } from '../shared/icons';
import { setModalOpen } from '../shared/modal-state';
import { BREAKPOINT_TABLET, buttonResetStyles, controlBaseStyles, dropdownPanelStyles, rootFontFamilyStyles } from '../shared/styles';
import type { LanguageChangedEventDetail } from './HeaderEvents';

/** The nav elements that take the header's `currentPath`: their own link is current, or (dropdowns) one inside is. */
const NAV_SELECTOR = 'st-menu-item, st-mega-menu-column, st-mega-menu-feature, st-dropdown';

/** Height of the bar in context mode. The context trigger counts as passed once its bottom is above this line. */
const CONTEXT_BAR_HEIGHT = 64;

/** What a keyboard user can tab to. */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Whether an element is laid out and not hidden by `visibility` (on itself or an ancestor). */
function isRendered(el: Element): boolean {
  if (el.getClientRects().length === 0) return false;
  const check = (el as Element & { checkVisibility?: (options?: { visibilityProperty?: boolean }) => boolean }).checkVisibility;
  return check ? check.call(el, { visibilityProperty: true }) : true;
}

/**
 * The focusable elements at and below `roots` that are rendered, in document order. Looks into open
 * shadow roots and follows each `<slot>` to the elements it shows, so slotted content counts where it lands.
 */
function renderedFocusables(roots: Element[]): HTMLElement[] {
  const found = new Set<HTMLElement>();
  const visit = (el: Element): void => {
    if (el instanceof HTMLSlotElement) {
      for (const assigned of el.assignedElements({ flatten: true })) visit(assigned);
      return;
    }
    if (el.matches(FOCUSABLE_SELECTOR) && isRendered(el)) found.add(el as HTMLElement);
    const children = el.shadowRoot ? el.shadowRoot.children : el.children;
    for (const child of Array.from(children)) visit(child);
  };
  roots.forEach(visit);
  return [...found];
}

/** The focused element, looking through open shadow roots (`document.activeElement` stops at the host). */
function deepActiveElement(): Element | null {
  let el: Element | null = document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

/** How long the header keeps looking for a `context-trigger` element the page has not rendered yet. */
const CONTEXT_TRIGGER_TIMEOUT_MS = 5000;

/** Set on `<html>` while the header's drawer (the mobile menu or a site-menu request) is open. The cookie banner steps aside for it. */
const DRAWER_OPEN_ATTRIBUTE = 'data-st-drawer-open';

/**
 * The app-shell header bar — brand (image + title, or title alone) on the left, a `slot="menu"`
 * for primary nav (e.g. `st-dropdown`/`st-menu-grid` mega-menus, or plain links) taking the
 * middle, and a `slot="utility"` for account/app-switcher/theme controls on the right. `title` is
 * the primary brand prop; `brand-image-url` is optional. For a fixed nav-links/user-menu header,
 * use `st-app-header` instead.
 *
 * The nav link for the page being shown is marked: `current-path` (e.g. `/t-pilot`) is compared
 * with each `st-menu-item`/`st-mega-menu-column`/`st-mega-menu-feature` `href` (and a mega column's
 * `cta-href`). A link is current when it equals the path, or, for a non-root href, when the path is
 * beneath it; `/` is current only on `/`. The current link gets `aria-current="page"`, and an
 * `st-dropdown` containing one is highlighted as active. Without `current-path` the header uses
 * `location.pathname`, re-checked on `popstate`; a single-page app should set `current-path`
 * on each navigation (the React `Header` does this from the router).
 *
 * Layout: the menu starts 4rem after the brand, the utility
 * controls sit after a vertical divider, and below `BREAKPOINT_TABLET` (900px) `menu`/`utility`
 * collapse behind a hamburger toggle into a full-screen layer under the
 * toggle (closes on Escape or a click inside it), where the menu's `st-dropdown`s are switched to
 * `inline` so they open in the flow — the same two slotted elements just get repositioned by CSS
 * (`.mobile-panel`'s `display: contents` at desktop width vs. a real fixed-position box below
 * `BREAKPOINT_TABLET`), rather than the slots being duplicated in the template, since a shadow
 * root can only ever assign a given light-DOM child to the *first* slot of a given name.
 *
 * An optional `slot="brand-extra"` sits right after the brand (e.g. an edition badge such as
 * "🇮🇳 India Edition"); unlike `menu`/`utility` it stays in the bar at every width.
 *
 * Also carries an optional built-in language switcher (`languages`/`currentLanguageCode`, fires
 * `language-change`). Hidden entirely when `languages` has fewer than two entries.
 * This component has no translation logic itself; the consuming app owns what a language `code`
 * means and which content it re-renders in response.
 *
 * Context mode (opt-in): set `context-trigger` to a CSS selector for a page element (typically the
 * hero) and give the header a `slot="context"` child (e.g. an `st-product-nav` with `embedded` and
 * `scroll-spy`). Once the trigger element has scrolled up past the bar, the bar swaps its menu for
 * the slotted context content. Scrolling back above the trigger restores the menu. Both rows share the
 * same 64px box, so the header never changes height, and the bar is solid while the context row shows,
 * even when `transparent`. With no `context-trigger`, or no `slot="context"` content, the header is
 * unchanged. An open mobile menu closes when the context row takes over. `context-active` reflects the
 * state; `header-context-change` fires on every switch (detail `{ active }`).
 *
 * In context mode, the slotted product nav's site-menu button (`product-nav-site-menu`) opens this
 * header's site menu over the bar, at every width. The bar keeps its state: the context row stays
 * visible underneath (made inert), and only the drawer, its close button and a backdrop (above 768px)
 * are shown on top. `st-cookie-consent` steps aside while the drawer is open (see `setModalOpen`). Esc,
 * the close button, a click outside the bar, or activating a link in the drawer closes it and returns
 * focus to that button.
 *
 * On a narrow screen the open drawer covers the whole viewport and locks page scroll. It sets
 * `data-st-drawer-open` on `<html>`, holds keyboard focus (Tab wraps, Esc closes, focus returns to the
 * toggle), and shows the brand and, with `cta-label` + `cta-href`, a primary call to action above the
 * menu, which sits before the theme toggle on desktop.
 *
 * @slot menu - Primary navigation.
 * @slot context - Product sub-nav shown in place of the menu in context mode (see above). Its children get `inert` while the context row is hidden or a site-menu drawer is open.
 * @slot utility - Account, app-switcher and theme controls, after the divider.
 * @slot brand-extra - Shown right after the brand at every width (e.g. an edition badge).
 * @slot menu-icon - Replaces the hamburger on the narrow-screen toggle (the built-in glyph when empty).
 * @slot close-icon - Replaces the close (X) on the toggle while the menu is open (the built-in glyph when empty).
 * @cssprop --st-header-toggle-icon-size - Width and height of a slotted toggle icon (default 20px, the built-in glyph's size).
 * @fires header-context-change - Fired when the bar switches to or from the context row. Detail: `{ active: boolean }`. Bubbles, composed.
 * @csspart mobile-panel - The menu and utility panel (the full-screen layer under the hamburger below 900px, and the site menu in context mode).
 */
@customElement('st-header')
export class Header extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: flex;
      align-items: center;
      /* The containing block of an st-dropdown[mega] panel, which spans the bar. */
      position: relative;
      /* Spacing between brand, menu and utility controls is the rows' own margins, not a
         flex gap. */
      gap: 0;
      /* !important on the box-model properties only: a shadow host's own :host rule always loses
       * to ANY rule the consuming page has for the same property on that element, regardless of
       * specificity (see st-footer's own padding/border-top for the same fix). Without
       * box-sizing: border-box pinned here, a page that also sets its own padding on this host
       * (e.g. a p-2 utility class) adds that padding on TOP of the fixed 64px height instead of
       * being absorbed inside it — which is exactly what happens in Template Hub, the one app that
       * doesn't load Tailwind Preflight (Preflight's own box-sizing: border-box reset is what
       * silently keeps every other app's header at the intended 64px). */
      box-sizing: border-box !important;
      padding: 0 2rem !important;
      height: 64px !important;
      background: var(--st-color-surface);
      border-bottom: 1px solid var(--st-color-border) !important;
      ${rootFontFamilyStyles}
      color: var(--st-color-text-strong);
    }

    :host([sticky]) {
      position: sticky;
      top: 0;
      z-index: 100;
    }

    /* Toggle icons: a host's slotted icon, else the built-in glyph; only the current state's shows. */
    .toggle slot {
      display: contents;
    }

    .toggle slot[hidden] {
      display: none;
    }

    .toggle ::slotted(*) {
      flex: none;
      width: var(--st-header-toggle-icon-size, 20px);
      height: var(--st-header-toggle-icon-size, 20px);
    }

    :host([inverted]) {
      background: var(--st-color-text-strong);
      color: var(--st-color-on-solid);
      border-bottom-color: transparent;
    }

    :host([sticky]),
    :host([transparent]),
    :host([hide-on-scroll]) {
      transition:
        background-color 0.3s ease,
        color 0.3s ease,
        box-shadow 0.3s ease,
        border-color 0.3s ease,
        transform 0.3s ease;
    }

    /* Once the page has scrolled, a sticky/fixed header lifts off the content. */
    :host([scrolled][sticky]),
    :host([scrolled][transparent]),
    :host([scrolled][hide-on-scroll]) {
      box-shadow: 0 4px 16px var(--st-shadow-color-md);
      border-bottom-color: transparent !important;
    }

    /* transparent: fixed over the top of the page (e.g. a dark hero), see-through until scrolled. */
    :host([transparent]) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }

    :host([transparent]:not([scrolled]):not([mobile-open])) {
      background: transparent;
      border-bottom-color: transparent !important;
      color: var(--st-header-transparent-color, var(--st-color-on-solid));
      /* Read by st-menu-item / st-dropdown triggers in the bar (their panels reset them). */
      --st-nav-color: var(--st-header-transparent-color, var(--st-color-on-solid));
      --st-nav-hover-bg: color-mix(in oklch, currentColor 14%, transparent);
      /* The current-page underline follows the bar's text colour here, since the accent may not read on a hero. */
      --st-nav-active-line: currentColor;
    }

    :host([transparent]:not([scrolled]):not([mobile-open])) .utility-row {
      border-left-color: color-mix(in oklch, currentColor 35%, transparent);
    }

    :host([transparent]:not([scrolled]):not([mobile-open])) .lang-trigger {
      color: inherit;
    }

    :host([transparent]:not([scrolled]):not([mobile-open])) .lang-trigger:hover,
    :host([transparent]:not([scrolled]):not([mobile-open])) .toggle:hover {
      background: color-mix(in oklch, currentColor 14%, transparent);
    }

    /* hide-on-scroll: slides away while scrolling down, back as soon as the user scrolls up. */
    :host([hide-on-scroll]:not([sticky]):not([transparent])) {
      position: sticky;
      top: 0;
      z-index: 100;
    }

    :host([scroll-hidden]:not([mobile-open])) {
      transform: translateY(-100%);
      box-shadow: none;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: var(--st-space-10);
      flex: none;
      text-decoration: none;
      color: inherit;
    }

    .brand-mark {
      width: var(--st-size-28);
      height: var(--st-size-28);
      border-radius: var(--st-radius-sm);
      flex: none;
      object-fit: contain;
    }

    .brand-title {
      font-size: var(--st-text-xl);
      font-weight: var(--st-font-weight-bold);
      letter-spacing: var(--st-tracking-tight);
      white-space: nowrap;
    }

    /* Optional slot="brand-extra" (e.g. an edition badge) right after the brand. Outside the
       mobile panel, so it stays beside the logo at every width; no box at all when empty. */
    .brand-extra {
      display: flex;
      align-items: center;
      gap: var(--st-space-8);
      flex: none;
      margin-left: var(--st-space-10);
      white-space: nowrap;
    }

    .brand-extra.empty {
      display: none;
    }

    /* Desktop: a transparent pass-through so .menu-row/.utility-row lay out directly as :host's
       own flex children. Mobile (see below) turns this into the actual overlay box. */
    .mobile-panel {
      display: contents;
    }

    /* Desktop layout: the menu starts 4rem after the brand and takes the
       free width; the utility controls sit after a vertical divider. Between 901px and 1200px the
       gaps tighten so the menu still fits down to the 900px hamburger breakpoint. */
    .menu-row {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      min-width: 0;
      margin-left: 4rem;
    }

    .utility-row {
      flex: none;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-left: 1.5rem;
      padding-left: 1.5rem;
      border-left: 1px solid var(--st-color-border);
    }

    :host([inverted]) .utility-row {
      border-left-color: currentColor;
    }

    .utility-row.empty {
      display: none;
    }

    @media (max-width: 1200px) {
      :host {
        padding: 0 1rem !important;
      }

      .menu-row {
        margin-left: 0.5rem;
      }

      .utility-row {
        margin-left: 0.5rem;
        padding-left: 0.5rem;
      }
    }

    .toggle {
      display: none;
      align-items: center;
      justify-content: center;
      flex: none;
      position: relative;
      z-index: 1002;
      /* A 44px touch target; the glyph inside keeps its 20px size. */
      width: 44px;
      height: 44px;
      margin-left: auto;
      padding: 0.5rem;
      border: 0;
      border-radius: var(--st-radius-sm);
      background: transparent;
      color: inherit;
      cursor: pointer;
    }

    .toggle:hover {
      background: var(--st-color-hover);
    }

    .lang-menu {
      position: relative;
      flex: none;
    }

    .lang-trigger {
      ${buttonResetStyles}
      display: flex;
      align-items: center;
      gap: var(--st-space-4);
      height: var(--st-size-32);
      padding: 0 var(--st-space-8);
      border-radius: var(--st-radius-sm);
      font-size: var(--st-text-base);
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-muted);
    }

    .lang-trigger:hover {
      background: var(--st-color-hover);
      color: var(--st-color-text-strong);
    }

    .lang-dropdown {
      ${dropdownPanelStyles}
      min-width: 140px;
    }

    .lang-option {
      ${buttonResetStyles}
      display: block;
      width: 100%;
      padding: var(--st-space-10) var(--st-space-14);
      font-size: var(--st-text-base);
      font-weight: var(--st-font-weight-semibold);
      text-align: left;
      color: inherit;
    }

    .lang-option:hover {
      background: var(--st-color-hover);
    }

    .lang-option.active {
      color: var(--st-color-accent-text);
    }

    /* Primary call to action in the utility row, before the theme toggle. Solid accent, so it reads on both themes. */
    .cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      box-sizing: border-box;
      min-height: 44px;
      padding: 0 1.25rem;
      border-radius: 9999px;
      background: var(--st-color-accent);
      color: var(--st-color-on-solid);
      font-size: var(--st-text-base);
      font-weight: var(--st-font-weight-semibold);
      text-decoration: none;
      white-space: nowrap;
    }

    .cta:hover {
      background: color-mix(in oklch, var(--st-color-accent) 88%, var(--st-color-text-strong));
    }

    /* Hamburger layout: a full-screen layer under the toggle, menu above
       the utility controls, the menu's dropdowns opening in the flow (see syncInlineDropdowns). */
    @media (max-width: ${BREAKPOINT_TABLET}px) {
      :host {
        padding: 0 1rem !important;
      }

      .mobile-panel {
        display: none;
      }

      .toggle {
        display: inline-flex;
      }

      :host([mobile-open]) .mobile-panel {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: fixed;
        inset: 0;
        background: var(--st-color-surface);
        padding: 0 1.5rem 2rem;
        overflow-y: auto;
        overscroll-behavior: contain;
        z-index: 1001;
      }

      :host([mobile-open]) .menu-row,
      :host([mobile-open]) .utility-row {
        flex-direction: column;
        align-items: stretch;
        gap: 1.5rem;
        margin-left: 0;
      }

      :host([mobile-open]) .utility-row {
        padding: 1.5rem 0 0;
        border-left: 0;
        border-top: 1px solid var(--st-color-border);
      }

      /* Apps usually slot one flex-row wrapper per slot; stack its items as the source does. */
      :host([mobile-open]) ::slotted([slot='menu']),
      :host([mobile-open]) ::slotted([slot='utility']) {
        flex-direction: column !important;
        align-items: stretch !important;
        margin: 0 !important;
      }
    }

    /* The same collapsed layout, switched on by script when the menu no longer fits the bar at
       desktop width (see evaluateFit) — without it the menu spills over the utility controls. A site-menu
       request (see openSiteMenu) switches it on the same way at every width. */
    :host([compact]) .mobile-panel {
      display: none;
    }

    :host([compact]) .toggle {
      display: inline-flex;
    }

    :host([compact][mobile-open]) .mobile-panel {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      position: fixed;
      inset: 0;
      background: var(--st-color-surface);
      padding: 0 1.5rem 2rem;
      overflow-y: auto;
      overscroll-behavior: contain;
      z-index: 1001;
    }

    :host([compact][mobile-open]) .menu-row,
    :host([compact][mobile-open]) .utility-row {
      flex-direction: column;
      align-items: stretch;
      gap: 1.5rem;
      margin-left: 0;
    }

    :host([compact][mobile-open]) .utility-row {
      padding: 1.5rem 0 0;
      border-left: 0;
      border-top: 1px solid var(--st-color-border);
    }

    :host([compact][mobile-open]) ::slotted([slot='menu']),
    :host([compact][mobile-open]) ::slotted([slot='utility']) {
      flex-direction: column !important;
      align-items: stretch !important;
      margin: 0 !important;
    }

    /* Context mode. Without context content both layers are transparent wrappers (display: contents),
       so the header lays out exactly as before. With it, layer A (the site header) and layer B (the
       context row) share one grid cell, and the inactive one fades out and is hidden. */
    .layers,
    .layers .layer {
      display: contents;
    }

    .layers .layer-b {
      display: none;
    }

    /* A context-trigger bar is sticky by itself (a transparent one keeps its own fixed positioning). */
    :host([context-trigger]:not([transparent])) {
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .layers.stacked {
      display: grid;
      flex: 1 1 auto;
      min-width: 0;
      height: 100%;
    }

    .layers.stacked .layer {
      grid-area: 1 / 1;
      display: flex;
      align-items: center;
      min-width: 0;
      height: 100%;
      opacity: 1;
      visibility: visible;
      /* Outgoing layer: fades out, and its visibility only drops once the fade has finished. */
      transition:
        opacity 180ms ease,
        visibility 0s linear 180ms;
    }

    /* Incoming layer: visible at once, then fades in. */
    .layers.stacked .layer.is-on {
      transition:
        opacity 180ms ease,
        visibility 0s linear 0s;
    }

    .layers.stacked .layer:not(.is-on) {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    /* Site-menu request (see openSiteMenu): layer A keeps only what the drawer needs. Its bar row is hidden
       by visibility, and its opacity is 1, since a faded ancestor would fade the drawer too. The drawer, the
       toggle (the close control) and the backdrop are shown again. Layer B stays visible underneath. */
    .layers.stacked .layer-a.drawer-only {
      opacity: 1;
      visibility: hidden;
      pointer-events: none;
      transition: none;
    }

    .layers.stacked .layer-a.drawer-only .mobile-panel,
    .layers.stacked .layer-a.drawer-only .toggle,
    .layers.stacked .layer-a.drawer-only .site-menu-backdrop {
      visibility: visible;
      pointer-events: auto;
    }

    .layers.stacked .layer-b {
      align-items: center;
    }

    .layers.stacked .layer-b slot {
      display: contents;
    }

    .layers.stacked .layer-b ::slotted(*) {
      flex: 1 1 auto;
      min-width: 0;
    }

    /* The context bar is solid, even when the header is transparent over a hero. */
    :host([context-active]) {
      background: var(--st-color-surface) !important;
      border-bottom-color: var(--st-color-border) !important;
      color: var(--st-color-text-strong) !important;
    }

    /* Site-menu request (see openSiteMenu). The drawer's top row carries the brand, aligned with the bar's
       64px row, so the toggle sits beside it. The drawer is a right-side panel over a backdrop above 768px;
       below that it stays the full-screen drawer. Only a request uses these rules, not normal mobile use. */
    .drawer-head {
      display: none;
    }

    /* The drawer's own top row: the brand, on the bar's row. Pulled back to the bar's 1rem edge, where the toggle sits. */
    :host([mobile-open]) .drawer-head {
      display: flex;
      align-items: center;
      flex: none;
      height: 64px;
      min-width: 0;
      margin: 0 -0.5rem;
    }

    :host([site-menu-request][compact][mobile-open]) .mobile-panel {
      padding: 0 1.5rem 2rem;
    }

    .site-menu-backdrop {
      display: none;
    }

    @media (min-width: 769px) {
      :host([site-menu-request][compact][mobile-open]) .mobile-panel {
        inset: 0 0 0 auto;
        width: min(400px, 100vw);
        height: 100%;
        box-shadow: -8px 0 24px var(--st-shadow-color-md);
        animation: st-header-slide-in 200ms ease;
      }

      :host([site-menu-request]) .site-menu-backdrop {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(1, 29, 65, 0.45);
      }
    }

    @keyframes st-header-slide-in {
      from {
        transform: translateX(100%);
      }
      to {
        transform: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .layers.stacked .layer {
        transition: none !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      :host,
      .mobile-panel {
        animation: none !important;
        transition: none !important;
      }
    }
  `;

  @property({ type: String })
  title = '';

  /** Optional logo image URL, shown before `title`. Omitted entirely when empty — none of this suite's apps has one today. Matches the source component's `imageSrc` (renamed here to pair with `title`/`logoHref`, since this component's only image use is the brand mark). */
  @property({ type: String, attribute: 'brand-image-url' })
  brandImageUrl = '';

  /** Path of the page being shown (e.g. `/t-pilot`). Marks the matching nav link as current; falls back to `location.pathname` when empty. */
  @property({ type: String, attribute: 'current-path' })
  currentPath = '';

  /** `alt` text for the brand image — matches the source component's `altText` (default `'Logo'`). */
  @property({ type: String, attribute: 'alt-text' })
  altText = 'Logo';

  /** Wraps the brand in an `<a>` when set (e.g. `/`); a plain non-link `<div>` otherwise. */
  @property({ type: String })
  logoHref = '';

  /** `target` for the brand `<a>` — matches the source component's `logoTarget` (default `_self`). No effect when `logoHref` isn't set. */
  @property({ type: String, attribute: 'logo-target' })
  logoTarget = '_self';

  /** Extra class(es) appended to the brand link/div — matches the source component's `logoClassName`. */
  @property({ type: String, attribute: 'logo-class-name' })
  logoClassName = '';

  /** Inverts the header's color roles (light-on-dark instead of dark-on-light) — matches the
   * source component's `inverted` (from its shared `BaseProps`). */
  @property({ type: Boolean, reflect: true })
  inverted = false;

  @property({ type: Boolean, reflect: true })
  sticky = false;

  /**
   * Fixes the header over the top of the page and makes it see-through, with light text
   * (`--st-header-transparent-color`), until the page scrolls past `scroll-threshold` — for a
   * header laid over a dark hero. It then takes its normal background and a shadow. The page
   * content starts under it, so the first section should leave room for the 64px bar.
   */
  @property({ type: Boolean, reflect: true })
  transparent = false;

  /** Slides the header out of view while the page scrolls down and back in when it scrolls up. */
  @property({ type: Boolean, reflect: true, attribute: 'hide-on-scroll' })
  hideOnScroll = false;

  /** Scroll distance in px after which the header counts as `scrolled`. */
  @property({ type: Number, attribute: 'scroll-threshold' })
  scrollThreshold = 8;

  /** True once the page has scrolled past `scroll-threshold`; reflected so pages can style `st-header[scrolled]`. Set by the header, never from outside. */
  @property({ type: Boolean, reflect: true })
  scrolled = false;

  /** True while `hide-on-scroll` has slid the header away. Set by the header, never from outside. */
  @property({ type: Boolean, reflect: true, attribute: 'scroll-hidden' })
  scrollHidden = false;

  private lastScrollY = 0;
  private scrollFrame = 0;

  /** The `<html>` overflow and padding to restore when the drawer closes; null while the page is not locked. */
  private drawerScrollLock: { overflow: string; paddingRight: string } | null = null;

  private onScroll = (): void => {
    if (this.scrollFrame) return;
    this.scrollFrame = requestAnimationFrame(() => {
      this.scrollFrame = 0;
      const y = Math.max(0, window.scrollY);
      this.scrolled = y > this.scrollThreshold;
      if (this.hideOnScroll) {
        const delta = y - this.lastScrollY;
        // Ignore tiny jitters; never hide while still at the top of the page or with the menu open.
        if (Math.abs(delta) > 4) this.scrollHidden = delta > 0 && y > this.offsetHeight && !this.mobileOpen;
      } else {
        this.scrollHidden = false;
      }
      this.lastScrollY = y;
    });
  };

  /**
   * Language switcher options, e.g. `[{ code: 'en', label: 'English' }, ...]` — hidden entirely
   * when empty or when only one language is offered (same convention as `st-app-header`'s
   * `languages`, which this reuses verbatim). This component has no translation logic itself —
   * selecting an option fires `language-change` (detail: `{ code }`), and the consuming app owns
   * what `code` actually means and which content it re-renders.
   */
  @property({ attribute: false })
  languages: { code: string; label: string }[] = [];

  @property({ type: String, attribute: 'current-language-code' })
  currentLanguageCode = '';

  @property({ type: String, attribute: 'language-menu-label' })
  languageMenuLabel = 'Language';

  /** Internal open/closed state for the mobile nav overlay, reflected to an attribute purely so
   * the `:host([mobile-open])` CSS selector above can react to it — not meant to be set from
   * outside. */
  @property({ type: Boolean, reflect: true, attribute: 'mobile-open' })
  mobileOpen = false;

  /** True while the menu doesn't fit the bar at the current width: the header then shows the same
   * hamburger layout it uses on a narrow screen. Set by `evaluateFit`, never from outside. */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /** Label of an optional primary call to action in the utility row, before the theme toggle. Hidden when empty (also needs `cta-href`). */
  @property({ type: String, attribute: 'cta-label' })
  ctaLabel = '';

  /** Target of the call to action. Hidden when empty (also needs `cta-label`). */
  @property({ type: String, attribute: 'cta-href' })
  ctaHref = '';

  @state() private languageMenuOpen = false;

  /** Whether `slot="utility"` has content — an empty utility row (and its divider) is hidden. */
  @state() private hasUtility = false;

  /** Whether `slot="brand-extra"` has content — an empty one takes no room beside the brand. */
  @state() private hasBrandExtra = false;

  /**
   * CSS selector of a page element (e.g. `#hero`). Once it has scrolled up past the bar, the bar
   * shows the context row instead of its menu. Empty (the default) turns context mode off. The
   * selector is re-queried for up to 5s if the element is not rendered yet, and again whenever it changes.
   */
  @property({ type: String, attribute: 'context-trigger' })
  contextTrigger = '';

  /** True while the page is past the trigger, so the context row shows. A site-menu drawer opened over it leaves it showing. Set by the header from the trigger's position, never from outside. */
  @property({ type: Boolean, reflect: true, attribute: 'context-active' })
  contextActive = false;

  /** Whether `slot="context"` has content. */
  @state() private hasContext = false;

  /** True while a site-menu request from the slotted product nav has its drawer open over the bar (see openSiteMenu). */
  @state() private siteMenuRequested = false;

  /** The product nav's site-menu button that asked for the menu; focus returns to it when the menu closes. */
  private siteMenuTrigger: HTMLElement | null = null;

  /** Whether the trigger element has scrolled up past the bar. */
  private pastTrigger = false;

  private triggerObserver?: IntersectionObserver;

  private triggerMutations?: MutationObserver;

  private triggerTimer = 0;

  private resizeObserver?: ResizeObserver;

  /** Matches below BREAKPOINT_TABLET, where the hamburger layout is always on. */
  private narrowQuery?: MediaQueryList;

  /** The dropdowns this header switched to `inline` — only these are switched back, so a caller's
   * own `inline` setting is left alone. */
  private inlinedDropdowns = new Set<HTMLElement & { inline: boolean; open: boolean }>();

  /** While the hamburger layout is on, the dropdowns in the header open in the flow of the
   * full-screen panel instead of floating over it (the touch-device layout). */
  private syncInlineDropdowns = (): void => {
    const collapsed = this.compact || !!this.narrowQuery?.matches;
    const dropdowns = Array.from(this.querySelectorAll('st-dropdown')) as (HTMLElement & { inline: boolean; open: boolean })[];
    if (collapsed) {
      for (const dropdown of dropdowns) {
        if (dropdown.inline) continue;
        dropdown.inline = true;
        this.inlinedDropdowns.add(dropdown);
      }
    } else {
      for (const dropdown of this.inlinedDropdowns) dropdown.inline = false;
      this.inlinedDropdowns.clear();
    }
  };

  private onBrandExtraSlotChange = (event: Event): void => {
    this.hasBrandExtra = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
    this.evaluateFit();
  };

  private onUtilitySlotChange = (event: Event): void => {
    this.hasUtility = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
    this.evaluateFit();
  };

  private onMenuSlotChange = (): void => {
    this.evaluateFit();
    this.syncInlineDropdowns();
    this.syncCurrentPath();
  };

  /** Hands the current page path to every nav element under the header, which marks its own link current. */
  private syncCurrentPath = (): void => {
    const path = this.currentPath || window.location.pathname;
    // requestUpdate: a dropdown's `current` also depends on links added to its panel later, which
    // the path alone would not re-check.
    for (const el of this.querySelectorAll<HTMLElement & { currentPath: string; requestUpdate(): void }>(NAV_SELECTOR)) {
      el.currentPath = path;
      el.requestUpdate();
    }
  };

  /** Runs when the light DOM changes: a late-rendered dropdown or nav item needs the same state as the rest. */
  private onLightDomChange = (): void => {
    this.syncInlineDropdowns();
    this.syncCurrentPath();
  };

  /** Re-watches the trigger when `context-trigger` changes (before render, so state changes don't re-render twice). */
  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('contextTrigger')) this.startContextTrigger();
  }

  protected updated(changed: Map<string, unknown>): void {
    // Scopes the site-menu drawer styles (right-side panel above 768px) to a site-menu request only.
    this.toggleAttribute('site-menu-request', this.siteMenuRequested);
    this.syncContextSlot();
    this.syncSiteMenuOpen();
    if (changed.has('currentPath')) this.syncCurrentPath();
    if (changed.has('compact')) this.syncInlineDropdowns();
    if (changed.has('mobileOpen')) this.syncDrawerOpen();
    if (changed.has('mobileOpen') && !this.mobileOpen) {
      // A mega dropdown's drill-down panel would otherwise still cover the menu next time it opens.
      for (const dropdown of this.inlinedDropdowns) dropdown.open = false;
      // Esc, the toggle, a click outside the bar or a link in the drawer all close it; a site-menu request ends here too.
      this.endSiteMenu(true);
    }
  }

  /**
   * Keeps the page in step with the drawer: `<html data-st-drawer-open>` (which the cookie banner reads) and
   * a scroll lock. The lock gives back the scrollbar's width, so the page does not shift sideways. Opening
   * moves focus to the first item in the drawer; a site-menu request focuses its close button instead.
   */
  private syncDrawerOpen(): void {
    const root = document.documentElement;
    root.toggleAttribute(DRAWER_OPEN_ATTRIBUTE, this.mobileOpen);
    if (!this.mobileOpen) {
      this.unlockScroll();
      return;
    }
    if (!this.drawerScrollLock) {
      const scrollbarWidth = window.innerWidth - root.clientWidth;
      this.drawerScrollLock = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
      root.style.overflow = 'hidden';
      if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`;
    }
    if (!this.siteMenuRequested) void this.updateComplete.then(() => this.drawerFocusables()[0]?.focus({ preventScroll: true }));
  }

  private unlockScroll(): void {
    if (!this.drawerScrollLock) return;
    const root = document.documentElement;
    root.style.overflow = this.drawerScrollLock.overflow;
    root.style.paddingRight = this.drawerScrollLock.paddingRight;
    this.drawerScrollLock = null;
  }

  /** What a keyboard user can reach in the open drawer, in order: its own items, then the toggle that closes it. */
  private drawerFocusables(): HTMLElement[] {
    const panel = this.renderRoot.querySelector<HTMLElement>('.mobile-panel');
    const toggle = this.renderRoot.querySelector<HTMLElement>('.toggle');
    return renderedFocusables([panel, toggle].filter((el): el is HTMLElement => el !== null));
  }

  /** Keeps Tab and Shift+Tab inside the open drawer, wrapping at either end (and pulling in focus that has left it). */
  private trapDrawerFocus(event: KeyboardEvent): void {
    const items = this.drawerFocusables();
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = deepActiveElement();
    const inside = active !== null && items.includes(active as HTMLElement);
    if (event.shiftKey) {
      if (!inside || active === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      }
    } else if (!inside || active === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  }

  /**
   * Closes the drawer and returns focus to its toggle. A site-menu request returns focus to the product
   * nav's button instead (see endSiteMenu).
   */
  private closeDrawer(): void {
    if (!this.mobileOpen) return;
    this.mobileOpen = false;
    if (!this.siteMenuRequested) this.renderRoot.querySelector<HTMLElement>('.toggle')?.focus({ preventScroll: true });
  }

  /** The bar width at which the menu last overflowed — the bar only expands again once it is
   * clearly wider than this, so it can't flip back and forth right at the threshold. */
  private collapsedAtWidth = 0;

  /** Collapses to the hamburger layout when the slotted menu overflows its row, and expands again
   * once there is room. The collapsed layout hides the menu, so the room it needs can't be
   * measured then; the width remembered when it collapsed stands in for it. */
  private evaluateFit = (): void => {
    // A site-menu request forces the collapsed layout until it ends (see openSiteMenu).
    if (this.siteMenuRequested) return;
    const width = this.clientWidth;
    if (this.compact) {
      if (width > this.collapsedAtWidth + 24) {
        this.compact = false;
        this.mobileOpen = false;
        void this.updateComplete.then(this.evaluateFit);
      }
      return;
    }
    if (this.menuOverflows()) {
      this.collapsedAtWidth = width;
      this.compact = true;
    }
  };

  /** Whether the visible menu items reach past the right edge of the menu row. Measured from the
   * items' own boxes (the slotted elements and their direct children), not the row's scrollWidth:
   * a closed dropdown's absolutely positioned panel also counts towards scrollWidth, which would
   * report overflow at any width. */
  private menuOverflows(): boolean {
    const row = this.renderRoot.querySelector<HTMLElement>('.menu-row');
    const slot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="menu"]');
    if (!row || !slot) return false;
    const limit = row.getBoundingClientRect().right + 1;
    let right = 0;
    for (const el of slot.assignedElements({ flatten: true })) {
      for (const box of [el, ...Array.from(el.children)]) {
        const rect = box.getBoundingClientRect();
        if (rect.width > 0) right = Math.max(right, rect.right);
      }
    }
    return right > limit;
  }

  protected firstUpdated(): void {
    this.resizeObserver = new ResizeObserver(this.evaluateFit);
    this.resizeObserver.observe(this);
    this.evaluateFit();
    this.syncInlineDropdowns();
    this.syncCurrentPath();
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('click', this.closeLanguageMenuOnOutsideClick);
    window.addEventListener('click', this.closeSiteMenuOnOutsideClick);
    this.addEventListener('product-nav-site-menu', this.onSiteMenuRequest);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('popstate', this.syncCurrentPath);
    this.onScroll();
    this.narrowQuery = window.matchMedia(`(max-width: ${BREAKPOINT_TABLET}px)`);
    this.narrowQuery.addEventListener('change', this.syncInlineDropdowns);
    // Menus often render their dropdowns after the header (e.g. once the user's role loads),
    // deeper than a slotchange reports.
    this.lightDomObserver = new MutationObserver(this.onLightDomChange);
    this.lightDomObserver.observe(this, { childList: true, subtree: true });
    this.startContextTrigger();
  }

  private lightDomObserver?: MutationObserver;

  disconnectedCallback(): void {
    this.lightDomObserver?.disconnect();
    this.stopContextTrigger();
    setModalOpen(this, false);
    document.documentElement.removeAttribute(DRAWER_OPEN_ATTRIBUTE);
    this.unlockScroll();
    this.narrowQuery?.removeEventListener('change', this.syncInlineDropdowns);
    this.resizeObserver?.disconnect();
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('click', this.closeLanguageMenuOnOutsideClick);
    window.removeEventListener('click', this.closeSiteMenuOnOutsideClick);
    this.removeEventListener('product-nav-site-menu', this.onSiteMenuRequest);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('popstate', this.syncCurrentPath);
    if (this.scrollFrame) cancelAnimationFrame(this.scrollFrame);
    this.scrollFrame = 0;
    super.disconnectedCallback();
  }

  /** Esc closes the open drawer; Tab is held inside it while it is open. */
  private onKeyDown = (event: KeyboardEvent): void => {
    if (this.mobileOpen) {
      if (event.key === 'Escape') this.closeDrawer();
      else if (event.key === 'Tab') this.trapDrawerFocus(event);
    }
    if (this.languageMenuOpen && event.key === 'Escape') this.languageMenuOpen = false;
  };

  private closeLanguageMenuOnOutsideClick = (event: Event): void => {
    if (this.languageMenuOpen && !event.composedPath().includes(this)) this.languageMenuOpen = false;
  };

  /** A click outside the bar closes a site menu opened from the product nav. */
  private closeSiteMenuOnOutsideClick = (event: Event): void => {
    if (this.siteMenuRequested && !event.composedPath().includes(this)) this.endSiteMenu(true);
  };

  /** The product nav's site-menu button asked for the site menu (context mode only). */
  private onSiteMenuRequest = (event: Event): void => {
    if (!this.stacked) return;
    const trigger = (event as CustomEvent<{ trigger?: HTMLElement }>).detail?.trigger ?? null;
    this.openSiteMenu(trigger);
  };

  /**
   * Opens the site menu as a drawer over the bar, which keeps its state underneath (see render). The
   * drawer is the collapsed layout, so `compact` is forced on at every width, the page's modal flag is
   * set, and focus moves to the drawer's close button.
   */
  private openSiteMenu(trigger: HTMLElement | null): void {
    this.siteMenuTrigger = trigger;
    this.siteMenuRequested = true;
    this.compact = true;
    this.mobileOpen = true;
    setModalOpen(this, true);
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>('.toggle')?.focus({ preventScroll: true }));
  }

  /**
   * Ends a site-menu request: the drawer closes, and the layout goes back to what the bar's own fit
   * gives. Focus returns to the product nav's button when asked and the context row is shown.
   */
  private endSiteMenu(restoreFocus: boolean): void {
    if (!this.siteMenuRequested) return;
    const trigger = this.siteMenuTrigger;
    this.siteMenuTrigger = null;
    this.siteMenuRequested = false;
    setModalOpen(this, false);
    this.mobileOpen = false;
    this.compact = false;
    void this.updateComplete.then(() => {
      this.evaluateFit();
      if (restoreFocus && this.contextActive && trigger?.isConnected) trigger.focus({ preventScroll: true });
    });
  }

  /** Keeps the slotted product nav's `site-menu-open` in step with the header's site menu. */
  private syncSiteMenuOpen(): void {
    // The product nav may sit inside a wrapper of the slot (e.g. a display: contents div), so look inside each slotted element.
    for (const el of this.contextSlotElements()) {
      const nav = el.localName === 'st-product-nav' ? el : el.querySelector('st-product-nav');
      if (nav) (nav as HTMLElement & { siteMenuOpen: boolean }).siteMenuOpen = this.siteMenuRequested;
    }
  }

  /** Whether the bar has a context row: a trigger is set and `slot="context"` has content. */
  private get stacked(): boolean {
    return !!this.contextTrigger && this.hasContext;
  }

  /** Layer B (the context row) is inert while it is hidden, and while a site-menu drawer is open over the bar. */
  private get layerBInert(): boolean {
    return !this.contextActive || this.siteMenuRequested;
  }

  /** Starts watching the trigger element, retrying for a few seconds while the page has not rendered it. */
  private startContextTrigger(): void {
    this.stopContextTrigger();
    this.pastTrigger = false;
    if (this.contextTrigger && typeof IntersectionObserver !== 'undefined' && !this.observeContextTrigger()) {
      this.triggerMutations = new MutationObserver(() => {
        if (this.observeContextTrigger()) this.stopTriggerRetry();
      });
      this.triggerMutations.observe(document.documentElement, { childList: true, subtree: true });
      this.triggerTimer = window.setTimeout(() => this.stopTriggerRetry(), CONTEXT_TRIGGER_TIMEOUT_MS);
    }
    this.updateContextActive();
  }

  /** Observes the trigger element if the page has it now. An invalid selector counts as not found. */
  private observeContextTrigger(): boolean {
    let element: Element | null = null;
    try {
      element = document.querySelector(this.contextTrigger);
    } catch {
      element = null;
    }
    if (!element) return false;
    this.triggerObserver?.disconnect();
    this.triggerObserver = new IntersectionObserver(this.onTriggerIntersect, {
      rootMargin: `-${CONTEXT_BAR_HEIGHT}px 0px 0px 0px`,
      threshold: 0,
    });
    this.triggerObserver.observe(element);
    return true;
  }

  private onTriggerIntersect = (entries: IntersectionObserverEntry[]): void => {
    const entry = entries[entries.length - 1];
    if (!entry) return;
    // The page replaced the trigger (e.g. a route change): look for the new element.
    if (!entry.target.isConnected) {
      this.startContextTrigger();
      return;
    }
    // Passed: no longer under the bar, and its bottom is above the bar's line.
    this.pastTrigger = !entry.isIntersecting && entry.boundingClientRect.bottom <= CONTEXT_BAR_HEIGHT;
    this.updateContextActive();
  };

  private stopTriggerRetry(): void {
    this.triggerMutations?.disconnect();
    this.triggerMutations = undefined;
    window.clearTimeout(this.triggerTimer);
    this.triggerTimer = 0;
  }

  private stopContextTrigger(): void {
    this.stopTriggerRetry();
    this.triggerObserver?.disconnect();
    this.triggerObserver = undefined;
  }

  private updateContextActive(): void {
    const next = this.stacked && this.pastTrigger;
    if (next !== this.contextActive) this.setContextActive(next);
  }

  private setContextActive(next: boolean): void {
    const focused = this.focusedLayer();
    // The mobile menu belongs to layer A, so it closes when the context row takes over (and so does a site-menu request).
    if (next) {
      this.mobileOpen = false;
      this.endSiteMenu(false);
    }
    this.contextActive = next;
    this.dispatchEvent(
      new CustomEvent<{ active: boolean }>('header-context-change', { detail: { active: next }, bubbles: true, composed: true })
    );
    // The layer being hidden is made inert in the coming render, which drops focus. Move it across.
    if (focused === (next ? 'a' : 'b')) {
      void this.updateComplete.then(() => this.focusLayer(next ? 'b' : 'a'));
    }
  }

  /** Which layer holds the focus right now, if any. */
  private focusedLayer(): 'a' | 'b' | null {
    const inner = (this.renderRoot as ShadowRoot).activeElement;
    if (inner) return this.renderRoot.querySelector('.layer-b')?.contains(inner) ? 'b' : 'a';
    const active = document.activeElement;
    if (!active || active === this || !this.contains(active)) return null;
    // Light-DOM focus is in layer B only when it is inside the context slot's content.
    return this.contextSlotElements().some(el => el.contains(active)) ? 'b' : 'a';
  }

  /** Focuses the first control of the layer that is shown: the brand link or toggle (layer A), or the first rendered control of the context content (layer B). */
  private focusLayer(layer: 'a' | 'b'): void {
    if (layer === 'a') {
      this.layerAFocusTarget()?.focus({ preventScroll: true });
      return;
    }
    this.layerBFocusTarget()?.focus({ preventScroll: true });
  }

  /** The first rendered control of the context row: the slotted product nav's brand link. */
  private layerBFocusTarget(): HTMLElement | null {
    return renderedFocusables(this.contextSlotElements())[0] ?? null;
  }

  private layerAFocusTarget(): HTMLElement | null {
    const candidates = [
      ...this.renderRoot.querySelectorAll<HTMLElement>('.layer-a a.brand, .layer-a .toggle'),
      ...this.querySelectorAll<HTMLElement>('a[href], button'),
    ];
    return candidates.find(el => !el.closest('[slot="context"]') && el.getClientRects().length > 0) ?? null;
  }

  private contextSlotElements(): Element[] {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="context"]');
    return slot ? slot.assignedElements({ flatten: true }) : [];
  }

  /** The slotted context content is inert while layer B is inert (see layerBInert). */
  private syncContextSlot(): void {
    for (const el of this.contextSlotElements()) el.toggleAttribute('inert', this.layerBInert);
  }

  private onContextSlotChange = (event: Event): void => {
    this.hasContext = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
    this.syncSiteMenuOpen();
    this.updateContextActive();
  };

  /** The primary call to action (`cta-label` + `cta-href`), before the theme toggle. */
  private renderCta() {
    if (!this.ctaLabel || !this.ctaHref) return nothing;
    return html`<a part="cta" class="cta" href=${this.ctaHref}>${this.ctaLabel}</a>`;
  }

  private renderLanguageMenu() {
    if (this.languages.length < 2) return nothing;
    const current = this.languages.find((lang) => lang.code === this.currentLanguageCode);
    return html`
      <div class="lang-menu" part="language-menu">
        <button
          part="language-menu-trigger"
          type="button"
          class="lang-trigger"
          aria-label=${this.languageMenuLabel}
          aria-expanded=${this.languageMenuOpen}
          @click=${(event: Event) => {
            event.stopPropagation();
            this.languageMenuOpen = !this.languageMenuOpen;
          }}
        >
          <span part="language-menu-current">${current?.label ?? this.languageMenuLabel}</span>
          ${chevronIcon('down', 10)}
        </button>
        ${this.languageMenuOpen
          ? html`
              <div part="language-dropdown" class="lang-dropdown">
                ${this.languages.map(
                  (lang) => html`
                    <button
                      part="language-option"
                      type="button"
                      class="lang-option ${lang.code === this.currentLanguageCode ? 'active' : ''}"
                      aria-current=${lang.code === this.currentLanguageCode}
                      @click=${() => this.onLanguageSelect(lang.code)}
                    >
                      ${lang.label}
                    </button>
                  `
                )}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private onLanguageSelect(code: string): void {
    this.languageMenuOpen = false;
    if (code === this.currentLanguageCode) return;
    this.dispatchEvent(new CustomEvent<LanguageChangedEventDetail>('language-change', { detail: { code }, bubbles: true, composed: true }));
  }

  /** The header's brand link. Inert while a site-menu request is open, when the drawer shows its own copy (`drawer-head`). */
  private renderBrand(inert = false) {
    const content = html`
      ${this.brandImageUrl ? html`<img part="brand-mark" class="brand-mark" src=${this.brandImageUrl} alt=${this.altText} /> ` : nothing}
      <span part="brand-title" class="brand-title">${this.title}</span>
    `;
    // A logo link needs an accessible name. With an image, that is `alt-text` (or "Home"); with only
    // text, the visible title already names it, so no aria-label (it would override the text).
    const label = this.brandImageUrl ? this.altText || 'Home' : this.title ? nothing : 'Home';
    return this.logoHref
      ? html`<a part="brand" class="brand ${this.logoClassName}" href=${this.logoHref} target=${this.logoTarget} aria-label=${label} ?inert=${inert}>${content}</a>`
      : html`<div part="brand" class="brand ${this.logoClassName}" ?inert=${inert}>${content}</div>`;
  }

  render() {
    const showContext = this.contextActive;
    // A site-menu drawer over the bar: layer A shows only the drawer (see .drawer-only), and layer B stays as it is.
    const drawerOnly = this.siteMenuRequested;
    return html`
      <div class="layers ${this.stacked ? 'stacked' : ''}">
        <div class="layer layer-a ${showContext ? '' : 'is-on'} ${drawerOnly ? 'drawer-only' : ''}" ?inert=${showContext && !drawerOnly}>
          ${this.renderBrand(this.mobileOpen)}
          <div class="brand-extra ${this.hasBrandExtra ? '' : 'empty'}" part="brand-extra"><slot name="brand-extra" @slotchange=${this.onBrandExtraSlotChange}></slot></div>

          <div
            id="drawer"
            class="mobile-panel"
            part="mobile-panel"
            role=${this.mobileOpen ? 'dialog' : nothing}
            aria-modal=${this.mobileOpen ? 'true' : nothing}
            aria-label=${this.mobileOpen ? 'Site menu' : nothing}
            @click=${() => this.closeDrawer()}
          >
            ${this.brandImageUrl || this.title ? html`<div class="drawer-head" part="drawer-head">${this.renderBrand()}</div>` : nothing}
            <nav class="menu-row" part="menu-row" aria-label="Main"><slot name="menu" @slotchange=${this.onMenuSlotChange}></slot></nav>
            <div class="utility-row ${this.hasUtility || this.languages.length >= 2 || this.ctaLabel ? '' : 'empty'}" part="utility-row">
              ${this.renderLanguageMenu()}${this.renderCta()}<slot name="utility" @slotchange=${this.onUtilitySlotChange}></slot>
            </div>
          </div>

          ${this.siteMenuRequested
            ? html`<div class="site-menu-backdrop" part="site-menu-backdrop" @click=${() => this.closeDrawer()}></div>`
            : nothing}

          <button
            part="toggle"
            type="button"
            class="toggle"
            aria-label=${this.mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded=${this.mobileOpen}
            aria-controls="drawer"
            @click=${() => (this.mobileOpen ? this.closeDrawer() : (this.mobileOpen = true))}
          >
            <slot name="menu-icon" ?hidden=${this.mobileOpen}>${menuIcon()}</slot>
            <slot name="close-icon" ?hidden=${!this.mobileOpen}>${closeIcon()}</slot>
          </button>
        </div>

        <div class="layer layer-b ${showContext ? 'is-on' : ''}" ?inert=${this.layerBInert}>
          <slot name="context" @slotchange=${this.onContextSlotChange}></slot>
        </div>
      </div>
    `;
  }
}
