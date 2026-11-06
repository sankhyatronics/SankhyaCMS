import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';

export interface ProductNavLink {
  label: string;
  /** An in-page anchor, e.g. `#features`. */
  href: string;
}

/**
 * A product sub-navigation bar for a product page, shown under the site header: a lockup (the product
 * icon, a prefix and a name, with a tagline under it), in-page section links, an optional site-menu
 * button and an optional external button.
 *
 * The lockup is one link (icon, wordmark, rule and tagline) to `brand-href`.
 *
 * The link whose section is in view gets `aria-current="true"`, found with an IntersectionObserver
 * on the sections the `#anchor` links point at. On phones the links move to their own row and scroll
 * sideways inside the bar. `sticky` pins the bar to the top of the viewport; set
 * `--st-product-nav-top` to the height of a fixed site header above it.
 *
 * `embedded` drops the bar's own background, rule, shadow and sticky positioning, so it fills the
 * row of a host, e.g. the `slot="context"` of `st-header` (its context mode). Desktop: lockup, links
 * centred, site-menu button and action pill at the right, vertically centred. Phones: lockup (wordmark
 * 18px, icon 32px, then 28px under 480px; tagline 9px under 480px and still shown), then a
 * sideways-scrolling links row, then a compact action pill.
 *
 * `site-menu-label` adds a 44px hamburger button before the action pill. Clicking it dispatches
 * `product-nav-site-menu`, which the host `st-header` answers by opening its site menu. While that menu
 * is open the host sets `site-menu-open`, which is reflected to the button's `aria-expanded`.
 *
 * `scroll-spy` marks the link for the section currently in view with `aria-current="location"` and
 * an active style (accent colour and a 2px underline). The section is the one whose top is nearest
 * the top of the viewport at or above a 64px line; none is marked while the page is above the first
 * section.
 *
 * @fires product-nav-site-menu - The site-menu button was clicked. Detail: `{ trigger }`, the button itself, so the host can return focus to it. Bubbles, composed.
 * @attr icon - Product icon image URL, shown in the brand link before the wordmark (40px; 32px, then 28px under 480px, when `embedded`).
 * @attr icon-dark - Dark-theme icon image URL, shown on `:root.dark` in place of `icon`. Needs `icon`.
 * @attr label - Accessible name of the `<nav>` (e.g. `T-pilot`). Default: the brand prefix and name (e.g. `T-pilot`).
 * @attr brand-href - Target of the brand link (icon and wordmark). Default `#top`.
 * @attr site-menu-label - Accessible name of the site-menu button (a hamburger before the action pill). Empty (default): no button.
 * @attr site-menu-open - Reflected. True while the host header's site menu is open, which sets the button's `aria-expanded`. Set by the host header, never from outside.
 * @attr embedded - Fills the host row: no sticky positioning, background, rule or shadow of its own.
 * @attr scroll-spy - Marks the link for the section in view (`aria-current="location"`).
 * @cssprop --st-product-nav-top - The `top` offset of a sticky bar (default `0px`).
 * @cssprop --st-product-nav-z - The `z-index` of a sticky bar (default `90`, under st-header's 100 so its open mega panel paints above).
 * @cssprop --st-product-nav-border - Colour of the bottom rule (default `--st-cms-primary-100`).
 * @csspart nav - The `<nav>` landmark.
 * @csspart lockup - The wrapper of the brand link.
 * @csspart brand - The brand link (icon, wordmark, rule and tagline).
 * @csspart icon - The product icon image (one, or two when `icon-dark` is set).
 * @csspart links - The list of section links.
 * @csspart link - One section link.
 * @csspart site-menu - The site-menu button.
 * @csspart action - The external button.
 */
@customElement('st-product-nav')
export class ProductNav extends LitElement {
  static styles = css`
    ${controlBaseStyles}
    /* fontFamilyStyles is a bare declaration: it must sit inside a rule, or it swallows the next one. */
    :host {
      ${fontFamilyStyles}
    }

    /* The bar is exactly 64px tall on desktop (the bottom rule is an inset shadow, so it adds no height). */
    :host {
      display: block;
      box-sizing: border-box;
      background: var(--st-color-surface);
      box-shadow: inset 0 -1px 0 var(--st-product-nav-border, var(--st-cms-primary-100));
    }

    /* Below st-header (z-index 100) and its open mega panel, which both sit in the header's stacking context. */
    :host([sticky]:not([embedded])) {
      position: sticky;
      top: var(--st-product-nav-top, 0px);
      z-index: var(--st-product-nav-z, 90);
    }

    .bar {
      display: flex;
      align-items: center;
      gap: var(--st-space-24);
      box-sizing: border-box;
      max-width: var(--st-cms-container-max);
      height: 64px;
      margin: 0 auto;
      padding: 0 var(--st-space-24);
    }

    .brand {
      display: inline-flex;
      flex: none;
      align-items: center;
      gap: var(--pn-brand-gap, 12px);
      min-height: 44px;
      color: inherit;
      text-decoration: none;
    }

    /* The product icon before the lockup. A fixed square that never shrinks; the default image-rendering keeps an SVG crisp. */
    .icon {
      flex: none;
      width: var(--pn-icon-size, 40px);
      height: var(--pn-icon-size, 40px);
      object-fit: contain;
    }

    /* Light and dark icon per the site's theme: the dark one shows on :root.dark (see --st-theme-*-display). */
    .theme-light {
      display: var(--st-theme-light-display, inline-block);
    }

    .theme-dark {
      display: var(--st-theme-dark-display, none);
    }

    /* The lockup wrapper around the brand link. The icon size and the gap after the icon are variables,
       which the embedded phone layout overrides. */
    .lockup {
      display: inline-flex;
      align-items: center;
      --pn-icon-size: 40px;
      --pn-brand-gap: 12px;
    }

    /* The text column: the wordmark, the rule and the tagline. */
    .brand-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .wordmark {
      display: inline-block;
      font-size: 24px;
      font-weight: var(--st-font-weight-bold);
      line-height: 1;
      letter-spacing: -0.01em;
    }

    .prefix {
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
    }

    .name {
      color: var(--st-cms-brand-azure);
    }

    /* The 3px azure bar under the wordmark, as wide as the lockup's tagline. */
    .rule {
      display: block;
      height: 3px;
      margin: 4px 0;
      border-radius: 2px;
      background: var(--st-cms-brand-azure);
    }

    .tagline {
      font-size: 10px;
      font-weight: var(--st-font-weight-semibold);
      letter-spacing: 0.04em;
      line-height: 1;
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
    }

    .brand:focus-visible,
    .links a:focus-visible,
    .action:focus-visible,
    .site-menu:focus-visible {
      outline: var(--st-focus-ring);
      outline-offset: 2px;
    }

    .links {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      gap: var(--st-space-4);
      min-width: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      overflow-x: auto;
      scrollbar-width: thin;
    }

    .links a {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      min-height: 44px;
      padding: 10px 12px;
      border-radius: var(--st-radius-xs);
      color: var(--st-cms-text-strong, var(--st-cms-navy));
      font-size: 15px;
      font-weight: 500;
      line-height: 1.2;
      text-decoration: none;
      white-space: nowrap;
      transition: background-color 0.2s ease;
    }

    .links a:hover {
      background: var(--st-cms-primary-100);
    }

    /* The section in view: brand-navy text with an azure underline. */
    .links a[aria-current='true'] {
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
      font-weight: var(--st-font-weight-semibold);
      box-shadow: inset 0 -3px 0 var(--st-cms-brand-azure);
    }

    /* The section the scroll spy marks: accent text with a 2px underline. */
    .links a[aria-current='location'] {
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
      font-weight: var(--st-font-weight-semibold);
      box-shadow: inset 0 -2px 0 var(--st-cms-brand-azure);
    }

    /* embedded: the row of a host header, not a bar of its own. The host stretches to the free width
       of the header's row; the inner row has no container width, margin or padding of its own, so it
       lines up with the header's padding. */
    /* A flex box, so the inner row is vertically centred in the header's row (a percentage height on
       the row alone does not resolve here). */
    :host([embedded]) {
      display: flex;
      align-items: center;
      flex: 1 1 auto;
      min-width: 0;
      height: 100%;
      background: transparent;
      box-shadow: none;
    }

    /* The <nav> (and the row inside it) fill the flex host, so the links take the free space and the
       pill sits at the end. */
    :host([embedded]) nav {
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
    }

    :host([embedded]) .bar {
      box-sizing: border-box;
      flex: 1 1 auto;
      min-width: 0;
      align-items: center;
      gap: 24px;
      width: 100%;
      max-width: none;
      height: auto;
      margin: 0;
      padding: 0;
    }

    /* Links take the space between the lockup and the pill; they scroll inside it if they do not fit. */
    :host([embedded]) .links {
      flex: 1 1 auto;
      justify-content: center;
      min-width: 0;
    }

    :host([embedded]) .links > li {
      flex: none;
    }

    :host([embedded]) .links a {
      min-height: 44px;
    }

    :host([embedded]) .action {
      flex: none;
      margin-left: 0;
    }

    /* The short label of the action pill, shown on phones when the action-short-label attribute is set. */
    .action-short {
      display: none;
    }

    .action {
      display: inline-flex;
      flex: none;
      align-items: center;
      gap: var(--st-space-8);
      box-sizing: border-box;
      min-height: 44px;
      margin-left: auto;
      padding: 0 var(--st-space-20);
      border-radius: var(--st-radius-full);
      background: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
      font-size: 15px;
      font-weight: var(--st-font-weight-semibold);
      text-decoration: none;
      white-space: nowrap;
    }

    .action svg {
      flex: none;
      width: 16px;
      height: 16px;
    }

    /* The site-menu button: a 44px round, outlined hamburger before the action pill. Shown at every width. */
    .site-menu {
      display: inline-flex;
      flex: none;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 44px;
      height: 44px;
      margin: 0;
      padding: 0;
      border: 1px solid var(--st-color-border);
      border-radius: 9999px;
      background: transparent;
      color: var(--st-cms-text-strong, currentColor);
      cursor: pointer;
    }

    .site-menu:hover {
      background: var(--st-color-hover);
    }

    .site-menu svg {
      flex: none;
      width: 20px;
      height: 20px;
    }

    @media (max-width: 768px) {
      .bar {
        flex-wrap: wrap;
        height: auto;
        gap: var(--st-space-12) var(--st-space-16);
        padding-top: var(--st-space-8);
        padding-bottom: var(--st-space-8);
      }

      .links {
        order: 3;
        flex: 1 0 100%;
        width: 100%;
        /* One row that scrolls sideways inside the bar; the page itself never scrolls sideways. */
        flex-wrap: nowrap;
      }

      /* embedded on a phone: lockup | sideways links | compact pill, all in one 64px row. */
      :host([embedded]) .bar {
        flex-wrap: nowrap;
        gap: var(--st-space-12) var(--st-space-12);
        padding: 0;
      }

      :host([embedded]) .wordmark {
        font-size: 18px;
      }

      :host([embedded]) .brand {
        min-height: 36px;
      }

      :host([embedded]) .lockup {
        --pn-icon-size: 32px;
        --pn-brand-gap: 8px;
      }

      :host([embedded]) .links {
        order: 0;
        flex: 1 1 0;
        width: auto;
        min-width: 0;
        justify-content: flex-start;
        scrollbar-width: none;
        -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 24px), transparent);
        mask-image: linear-gradient(to right, #000 calc(100% - 24px), transparent);
      }

      :host([embedded]) .links::-webkit-scrollbar {
        display: none;
      }

      :host([embedded]) .action {
        min-height: 36px;
        margin-left: 0;
        padding: 0 var(--st-space-12);
        font-size: 13px;
      }
    }

    @media (max-width: 480px) {
      :host([embedded]) .lockup {
        --pn-icon-size: 28px;
      }

      /* The tagline stays on phones: it is the way home. One size smaller. */
      :host([embedded]) .tagline {
        font-size: 9px;
      }

      /* Only swap labels when a short one is given; otherwise the full label stays. */
      :host([embedded]) .action.has-short .action-full {
        display: none;
      }

      :host([embedded]) .action.has-short .action-short {
        display: inline;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .links a {
        transition: none;
      }
    }
  `;

  /** Brand prefix, e.g. `T-`. Shown in the brand navy. */
  @property({ type: String, attribute: 'brand-prefix' })
  brandPrefix = '';

  /** Product name, e.g. `pilot`. Shown in the brand azure with an underline. */
  @property({ type: String, attribute: 'brand-name' })
  brandName = '';

  /** Small line under the name, e.g. `by Sankhyatronics`. Plain text inside the brand link. */
  @property({ type: String, attribute: 'brand-tagline' })
  brandTagline = '';

  /** Target of the brand link (the icon, wordmark, rule and tagline). */
  @property({ type: String, attribute: 'brand-href' })
  brandHref = '#top';

  /** Product icon image URL, shown inside the brand link before the wordmark (40px; 32px and 28px on phones when `embedded`). Omitted when empty. */
  @property({ type: String })
  icon = '';

  /** Dark-theme variant of `icon`, shown on the site's dark theme (`:root.dark`) in place of it. Needs `icon`; without it `icon` shows on every theme. */
  @property({ type: String, attribute: 'icon-dark' })
  iconDark = '';

  /** In-page section links. */
  @property({ attribute: false })
  links: ProductNavLink[] = [];

  /** Label of the external button at the end of the bar. Shown only together with `href`. */
  @property({ type: String, attribute: 'action-label' })
  actionLabel = '';

  /** Shorter button label for phones in `embedded` mode (e.g. `Open ↗`), so the links row keeps its room. Optional; the full `action-label` is used otherwise. */
  @property({ type: String, attribute: 'action-short-label' })
  actionShortLabel = '';

  /** Target of the external button. It opens in the same tab. */
  @property({ type: String })
  href = '';

  /** Accessible name of the site-menu button, e.g. `Sankhyatronics menu`. Empty (default): no button. Clicking it dispatches `product-nav-site-menu`. */
  @property({ type: String, attribute: 'site-menu-label' })
  siteMenuLabel = '';

  /** True while the host header's site menu is open. Set by the header, never from outside: it drives the button's `aria-expanded`. */
  @property({ type: Boolean, reflect: true, attribute: 'site-menu-open' })
  siteMenuOpen = false;

  /** Pins the bar to the top of the viewport (`position: sticky`). Ignored when `embedded`. */
  @property({ type: Boolean, reflect: true })
  sticky = false;

  /** Accessible name of the `<nav>` landmark, e.g. `T-pilot`. Falls back to the brand prefix and name. */
  @property({ type: String })
  label = '';

  /** Fills the row of a host header (see the class docs): no bar background, rule, shadow or sticky positioning. */
  @property({ type: Boolean, reflect: true })
  embedded = false;

  /** Marks the link for the section in view with `aria-current="location"` and an active style. */
  @property({ type: Boolean, attribute: 'scroll-spy' })
  scrollSpy = false;

  /** The id of the section in view, from the IntersectionObserver. */
  @state() private activeId = '';

  private observer?: IntersectionObserver;

  /** The sections the scroll spy measures (set while `scrollSpy` is on). */
  private spyTargets: HTMLElement[] = [];

  private spyFrame = 0;

  /** Distance from the top of the viewport that counts as "passed", matching the 64px header row. */
  private static readonly SPY_OFFSET = 64;

  /** Extra pixels past the offset line, so a section an anchor jump lands just under it (sub-pixel) still counts. */
  private static readonly SPY_TOLERANCE = 8;

  connectedCallback(): void {
    super.connectedCallback();
    this.observe();
  }

  disconnectedCallback(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    this.stopSpyScroll();
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has('links') || changed.has('scrollSpy')) this.observe();
    if (changed.has('activeId') && this.activeId) this.revealActiveLink();
  }

  /** When the links row scrolls sideways (phones), keeps the current section's link in view. Only the
   * row scrolls, never the page. */
  private revealActiveLink(): void {
    const row = this.renderRoot.querySelector<HTMLElement>('.links');
    const link = row?.querySelector<HTMLElement>('a[aria-current]');
    if (!row || !link || row.scrollWidth <= row.clientWidth) return;
    const rowBox = row.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    const margin = 24;
    let delta = 0;
    if (linkBox.left < rowBox.left + margin) delta = linkBox.left - rowBox.left - margin;
    else if (linkBox.right > rowBox.right - margin) delta = linkBox.right - rowBox.right + margin;
    if (delta) {
      const smooth = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      row.scrollBy({ left: delta, behavior: smooth ? 'smooth' : 'auto' });
    }
  }

  /**
   * Scroll spy: the section in view is the LAST one, in document order, whose top is at or above
   * `SPY_OFFSET + SPY_TOLERANCE`. None above that line (above the first section) leaves no active id.
   * At the bottom of the page the last section is active, even if its top never reaches the line.
   */
  private updateScrollSpy(): void {
    const targets = this.spyTargets;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const line = ProductNav.SPY_OFFSET + ProductNav.SPY_TOLERANCE;
    let id = '';
    if (atBottom && targets.length) {
      id = targets[targets.length - 1].id;
    } else {
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= line) id = target.id;
      }
    }
    if (id !== this.activeId) this.activeId = id;
  }

  /** Scroll spy re-checks on every scroll frame: an IntersectionObserver alone misses a long section passing the line. */
  private onSpyScroll = (): void => {
    if (this.spyFrame) return;
    this.spyFrame = requestAnimationFrame(() => {
      this.spyFrame = 0;
      this.updateScrollSpy();
    });
  };

  private stopSpyScroll(): void {
    window.removeEventListener('scroll', this.onSpyScroll);
    if (this.spyFrame) cancelAnimationFrame(this.spyFrame);
    this.spyFrame = 0;
    this.spyTargets = [];
  }

  /** Watches the sections the `#anchor` links point at, so the link for the one in view is current. */
  private observe(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    this.stopSpyScroll();
    if (typeof IntersectionObserver === 'undefined' || typeof document === 'undefined') return;
    const targets = this.links
      .filter(link => link.href.startsWith('#') && link.href.length > 1)
      .map(link => document.getElementById(link.href.slice(1)))
      .filter((node): node is HTMLElement => node !== null);
    if (!targets.length) return;
    if (this.scrollSpy) {
      // Document order, so the scroll spy can take the last section above the line.
      this.spyTargets = [...targets].sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      );
      this.observer = new IntersectionObserver(() => this.updateScrollSpy(), {
        rootMargin: `-${ProductNav.SPY_OFFSET}px 0px 0px 0px`,
        threshold: 0,
      });
      targets.forEach(target => this.observer?.observe(target));
      window.addEventListener('scroll', this.onSpyScroll, { passive: true });
      this.updateScrollSpy();
      return;
    }
    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.activeId = entry.target.id;
          else if (this.activeId === entry.target.id) this.activeId = '';
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    targets.forEach(target => this.observer?.observe(target));
  }

  /** The product icon: the light image, plus the dark one (theme-switched) when `iconDark` is set. Alt is empty: the link text names the product. */
  private renderIcon() {
    if (!this.icon) return nothing;
    const light = html`<img part="icon" class="icon${this.iconDark ? ' theme-light' : ''}" src=${this.icon} alt="" width="40" height="40" />`;
    if (!this.iconDark) return light;
    return html`${light}<img part="icon" class="icon theme-dark" src=${this.iconDark} alt="" width="40" height="40" />`;
  }

  /** The site-menu button, before the action pill. Only with `site-menu-label`. */
  private renderSiteMenu() {
    if (!this.siteMenuLabel) return nothing;
    return html`<button
      part="site-menu"
      type="button"
      class="site-menu"
      aria-label=${this.siteMenuLabel}
      aria-haspopup="dialog"
      aria-expanded=${this.siteMenuOpen}
      @click=${(event: Event) => this.onSiteMenuClick(event)}
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5h14M3 10h14M3 15h14"></path></svg>
    </button>`;
  }

  /** Dispatches `product-nav-site-menu`, with the button as the detail's `trigger`, for the host header to open its site menu. */
  private onSiteMenuClick(event: Event): void {
    const trigger = event.currentTarget as HTMLElement;
    this.dispatchEvent(
      new CustomEvent<{ trigger: HTMLElement }>('product-nav-site-menu', { detail: { trigger }, bubbles: true, composed: true })
    );
  }

  render() {
    // Content renderers may keep `label` as the node's own name, so the brand is the fallback name.
    const label = this.label || `${this.brandPrefix}${this.brandName}`;
    return html`
      <nav part="nav" aria-label=${label}>
        <div class="bar">
          <div class="lockup" part="lockup">
            <a class="brand" part="brand" href=${this.brandHref || '#top'}>
              ${this.renderIcon()}
              <span class="brand-text">
                <span class="wordmark"><span class="prefix">${this.brandPrefix}</span><span class="name">${this.brandName}</span></span>
                <span class="rule" aria-hidden="true"></span>
                ${this.brandTagline ? html`<span class="tagline">${this.brandTagline}</span>` : nothing}
              </span>
            </a>
          </div>
          ${this.links.length
            ? html`<ul class="links" part="links">
                ${this.links.map(
                  link => html`<li>
                    <a
                      part="link"
                      href=${link.href}
                      aria-current=${this.activeId && link.href === `#${this.activeId}` ? (this.scrollSpy ? 'location' : 'true') : nothing}
                    >${link.label}</a>
                  </li>`
                )}
              </ul>`
            : nothing}
          ${this.renderSiteMenu()}
          ${this.actionLabel && this.href
            ? html`<a class="action ${this.actionShortLabel ? 'has-short' : ''}" part="action" href=${this.href} aria-label=${this.actionLabel}><span class="action-full">${this.actionLabel}</span>${this.actionShortLabel ? html`<span class="action-short">${this.actionShortLabel}</span>` : nothing}<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"></path><path d="M9 7h8v8"></path></svg></a>`
            : nothing}
        </div>
      </nav>
    `;
  }
}
