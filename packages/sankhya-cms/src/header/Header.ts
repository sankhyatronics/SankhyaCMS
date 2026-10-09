import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { chevronIcon, closeIcon, menuIcon } from '../shared/icons';
import { BREAKPOINT_TABLET, buttonResetStyles, controlBaseStyles, dropdownPanelStyles, rootFontFamilyStyles } from '../shared/styles';
import type { LanguageChangedEventDetail } from './HeaderEvents';

/**
 * The app-shell header bar — brand (image + title, or title alone) on the left, a `slot="menu"`
 * for primary nav (e.g. `st-dropdown`/`st-menu-grid` mega-menus, or plain links) taking the
 * middle, and a `slot="utility"` for account/app-switcher/theme controls on the right. Ported
 * from `SankhyaUI`'s React `Header` (a separate, unrelated marketing-site project) to this
 * package's Lit conventions and this workspace's actual needs — that source component takes an
 * `imageSrc` logo with no text fallback, but none of this suite's apps has a logo image today, so
 * `title` is the primary brand prop here and `brand-image-url` is optional, mirroring
 * `st-app-header`'s own brand/title split (this component's slotted-menu/utility shape is a
 * deliberately different, more generic surface than `st-app-header`'s fixed nav-links/user-menu
 * props — pick whichever fits a given app's header).
 *
 * Layout follows the source's `Header.css`: the menu starts 4rem after the brand, the utility
 * controls sit after a vertical divider, and below `BREAKPOINT_TABLET` (900px here; 768px in the
 * source) `menu`/`utility` collapse behind a hamburger toggle into a full-screen layer under the
 * toggle (closes on Escape or a click inside it), where the menu's `st-dropdown`s are switched to
 * `inline` so they open in the flow — the same two slotted elements just get repositioned by CSS
 * (`.mobile-panel`'s `display: contents` at desktop width vs. a real fixed-position box below
 * `BREAKPOINT_TABLET`), rather than the slots being duplicated in the template, since a shadow
 * root can only ever assign a given light-DOM child to the *first* slot of a given name.
 *
 * Also carries an optional built-in language switcher (`languages`/`currentLanguageCode`, fires
 * `language-change`) — ported from `st-app-header`'s own implementation verbatim rather than
 * rebuilt, since the source `Header`'s reference story shows an equivalent flag/language `Select`
 * as a first-class header utility. Hidden entirely when `languages` has fewer than two entries.
 * This component has no translation logic itself; the consuming app owns what a language `code`
 * means and which content it re-renders in response.
 */
@customElement('st-header')
export class Header extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: flex;
      align-items: center;
      /* Spacing between brand, menu and utility controls is the rows' own margins (SankhyaUI's
         layout), not a flex gap. */
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

    :host([inverted]) {
      background: var(--st-color-text-strong);
      color: var(--st-color-on-solid);
      border-bottom-color: transparent;
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

    /* Desktop: a transparent pass-through so .menu-row/.utility-row lay out directly as :host's
       own flex children. Mobile (see below) turns this into the actual overlay box. */
    .mobile-panel {
      display: contents;
    }

    /* Desktop layout from SankhyaUI's Header: the menu starts 4rem after the brand and takes the
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

    @keyframes st-header-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .toggle {
      display: none;
      align-items: center;
      justify-content: center;
      flex: none;
      position: relative;
      z-index: 1002;
      width: var(--st-size-32);
      height: var(--st-size-32);
      margin-left: auto;
      padding: 0.5rem;
      border: 0;
      border-radius: var(--st-radius-sm);
      background: transparent;
      color: var(--st-color-text-strong);
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

    /* Hamburger layout from SankhyaUI's Header: a full-screen layer under the toggle, menu above
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
        padding: 5rem 1.5rem 2rem;
        overflow-y: auto;
        z-index: 1001;
        animation: st-header-fade-in 0.3s ease;
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
       desktop width (see evaluateFit) — without it the menu spills over the utility controls. */
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
      padding: 5rem 1.5rem 2rem;
      overflow-y: auto;
      z-index: 1001;
      animation: st-header-fade-in 0.3s ease;
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

    @media (prefers-reduced-motion: reduce) {
      .mobile-panel {
        animation: none !important;
      }
    }
  `;

  @property({ type: String })
  title = '';

  /** Optional logo image URL, shown before `title`. Omitted entirely when empty — none of this suite's apps has one today. Matches the source component's `imageSrc` (renamed here to pair with `title`/`logoHref`, since this component's only image use is the brand mark). */
  @property({ type: String, attribute: 'brand-image-url' })
  brandImageUrl = '';

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

  @state() private languageMenuOpen = false;

  /** Whether `slot="utility"` has content — an empty utility row (and its divider) is hidden. */
  @state() private hasUtility = false;

  private resizeObserver?: ResizeObserver;

  /** Matches below BREAKPOINT_TABLET, where the hamburger layout is always on. */
  private narrowQuery?: MediaQueryList;

  /** The dropdowns this header switched to `inline` — only these are switched back, so a caller's
   * own `inline` setting is left alone. */
  private inlinedDropdowns = new Set<HTMLElement & { inline: boolean }>();

  /** While the hamburger layout is on, the dropdowns in the header open in the flow of the
   * full-screen panel instead of floating over it (SankhyaUI's touch-device layout). */
  private syncInlineDropdowns = (): void => {
    const collapsed = this.compact || !!this.narrowQuery?.matches;
    const dropdowns = Array.from(this.querySelectorAll('st-dropdown')) as (HTMLElement & { inline: boolean })[];
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

  private onUtilitySlotChange = (event: Event): void => {
    this.hasUtility = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
    this.evaluateFit();
  };

  private onMenuSlotChange = (): void => {
    this.evaluateFit();
    this.syncInlineDropdowns();
  };

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has('compact')) this.syncInlineDropdowns();
  }

  /** The bar width at which the menu last overflowed — the bar only expands again once it is
   * clearly wider than this, so it can't flip back and forth right at the threshold. */
  private collapsedAtWidth = 0;

  /** Collapses to the hamburger layout when the slotted menu overflows its row, and expands again
   * once there is room. The collapsed layout hides the menu, so the room it needs can't be
   * measured then; the width remembered when it collapsed stands in for it. */
  private evaluateFit = (): void => {
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
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('keydown', this.closeOnEscape);
    window.addEventListener('click', this.closeLanguageMenuOnOutsideClick);
    this.narrowQuery = window.matchMedia(`(max-width: ${BREAKPOINT_TABLET}px)`);
    this.narrowQuery.addEventListener('change', this.syncInlineDropdowns);
    // Menus often render their dropdowns after the header (e.g. once the user's role loads),
    // deeper than a slotchange reports.
    this.lightDomObserver = new MutationObserver(this.syncInlineDropdowns);
    this.lightDomObserver.observe(this, { childList: true, subtree: true });
  }

  private lightDomObserver?: MutationObserver;

  disconnectedCallback(): void {
    this.lightDomObserver?.disconnect();
    this.narrowQuery?.removeEventListener('change', this.syncInlineDropdowns);
    this.resizeObserver?.disconnect();
    window.removeEventListener('keydown', this.closeOnEscape);
    window.removeEventListener('click', this.closeLanguageMenuOnOutsideClick);
    super.disconnectedCallback();
  }

  private closeOnEscape = (event: KeyboardEvent): void => {
    if (this.mobileOpen && event.key === 'Escape') this.mobileOpen = false;
    if (this.languageMenuOpen && event.key === 'Escape') this.languageMenuOpen = false;
  };

  private closeLanguageMenuOnOutsideClick = (event: Event): void => {
    if (this.languageMenuOpen && !event.composedPath().includes(this)) this.languageMenuOpen = false;
  };

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

  private renderBrand() {
    const content = html`
      ${this.brandImageUrl ? html`<img part="brand-mark" class="brand-mark" src=${this.brandImageUrl} alt=${this.altText} /> ` : nothing}
      <span part="brand-title" class="brand-title">${this.title}</span>
    `;
    return this.logoHref
      ? html`<a part="brand" class="brand ${this.logoClassName}" href=${this.logoHref} target=${this.logoTarget}>${content}</a>`
      : html`<div part="brand" class="brand ${this.logoClassName}">${content}</div>`;
  }

  render() {
    return html`
      ${this.renderBrand()}

      <div class="mobile-panel" part="mobile-panel" @click=${() => (this.mobileOpen = false)}>
        <div class="menu-row" part="menu-row"><slot name="menu" @slotchange=${this.onMenuSlotChange}></slot></div>
        <div class="utility-row ${this.hasUtility || this.languages.length >= 2 ? '' : 'empty'}" part="utility-row">
          ${this.renderLanguageMenu()}<slot name="utility" @slotchange=${this.onUtilitySlotChange}></slot>
        </div>
      </div>

      <button
        part="toggle"
        type="button"
        class="toggle"
        aria-label=${this.mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded=${this.mobileOpen}
        @click=${() => (this.mobileOpen = !this.mobileOpen)}
      >
        ${this.mobileOpen ? closeIcon() : menuIcon()}
      </button>
    `;
  }
}
