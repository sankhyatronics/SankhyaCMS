import 'iconify-icon';
import { LitElement, css, html, nothing, svg } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { arrowUpRightIcon } from '../shared/icons';
import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { isCurrentPath } from '../shared/nav-path';
import type { MegaMenuSelectEventDetail } from './MegaMenuEvents';

/** The line art of a `product` card's `decoration`, drawn in `currentColor`. */
const DECORATIONS: Record<'flow' | 'orbit' | 'waves' | 'ribbon', TemplateResult> = {
  flow: svg`
    <path d="M240 8 C 190 20, 150 70, 70 150" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
    <path d="M240 28 C 196 40, 162 84, 100 156" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.25"/>
    <path d="M240 48 C 204 60, 176 98, 130 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
    <path d="M226 0 C 180 10, 130 52, 40 132" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.25"/>
    <path d="M206 0 C 166 8, 112 36, 12 108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
  `,
  orbit: svg`
    <circle cx="240" cy="0" r="36" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
    <circle cx="240" cy="0" r="62" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.25"/>
    <circle cx="240" cy="0" r="90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
    <circle cx="240" cy="0" r="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1" stroke-dasharray="2 6"/>
    <circle cx="204" cy="34" r="3" fill="currentColor" stroke="none"/>
  `,
  waves: svg`
    <path d="M0 30 C 40 6, 80 54, 120 30 S 200 6, 240 30" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
    <path d="M0 48 C 40 24, 80 72, 120 48 S 200 24, 240 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.25"/>
    <path d="M0 66 C 40 42, 80 90, 120 66 S 200 42, 240 66" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
    <path d="M0 84 C 40 60, 80 108, 120 84 S 200 60, 240 84" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
  `,
  ribbon: svg`
    <path d="M250 20 C 170 -10, 120 90, 180 110 S 250 40, 150 20 S 40 70, -10 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
    <path d="M250 50 C 180 20, 140 110, 196 128 S 256 70, 160 52 S 60 100, -10 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
  `
};

/**
 * One column (or one group within a column) of an `st-mega-menu`: a heading, an optional line of
 * description, then its links stacked — usually `st-menu-item`s with `variant="link"`. Nest
 * columns to stack several headed groups in one column, as okta.com does.
 *
 * `variant="card"` puts the column on a tinted rounded tile and `variant="accent"` on a solid
 * accent tile with light text; both suit a row of equal columns without intro or featured area.
 *
 * `variant="product"` makes a product card for a row of products: an icon tile and a `tag` pill on a
 * top row, the heading and description, the links as rows
 * with a `→` arrow (a new-tab link keeps its `↗` icon), and a full-width `cta-label` + `cta-href`
 * button pinned to the bottom. The icon tile shows `icon` (an iconify name), or, when `icon-src` is set,
 * that image at 28px on the same tinted tile (`icon-src-dark`, if set, replaces it on the dark theme). The
 * card lifts and gets an accent border on hover or focus. Set
 * `accent` (any CSS colour) to tint it; it defaults to the theme accent. A card whose link is the
 * page being shown (see `st-header`'s `current-path`) becomes the "You are here" card: a 2px accent
 * border, a faint accent wash, a `currentLabel` pill and a solid button. Inside an `inline`
 * (hamburger) header panel the card does not lift.
 *
 * `decoration` (`none` default, `flow`, `orbit`, `waves` or `ribbon`) draws faint curvy line art in
 * the card's accent behind its top-right corner. It is `product`-only and sits under the content;
 * it drifts on hover or focus, but not in the `inline` panel or with reduced motion.
 *
 * `cta-label` + `cta-href` add a pill button at the bottom of any variant's column.
 *
 * The heading (when `href` is set) and the button fire a *cancelable* `mega-menu-select` event
 * (detail: `{ href }`) before navigating; a host doing client-side routing calls
 * `event.preventDefault()` on it. A link whose `href` is the page being shown (see `st-header`'s
 * `current-path`) gets `aria-current="page"`.
 *
 * @slot - The column's links, or nested `st-mega-menu-column` groups.
 * @fires mega-menu-select - The heading link or the button was clicked (cancelable; detail `{ href }`).
 * @csspart top - The product card's top row (icon tile and pills).
 * @csspart icon - The product card's icon tile. With `icon-src` it holds the image (one, or two with `icon-src-dark`) at 28px, on the same tinted tile.
 * @csspart tag - The product card's tag pill.
 * @csspart current - The product card's "You are here" pill.
 * @csspart heading - The heading text or link.
 * @csspart description - The line under the heading.
 * @csspart items - The box holding the links.
 * @csspart cta - The pill button.
 * @csspart decoration - The decorative line art of a `product` card (`decoration` other than `none`).
 * @cssprop --st-mega-menu-column-padding - Overrides the padding of a `card`/`accent` column.
 * @cssprop --st-mega-menu-column-accent - The accent of a `product` card (default `--st-color-accent`); `accent` sets it.
 * @cssprop --st-mega-menu-column-lift - The hover/focus lift of a `product` card (default `-3px`); `st-dropdown` sets it to `0px` while `inline`.
 * @cssprop --st-mega-menu-column-deco-opacity - The resting opacity of the `decoration` line art (default `0.28`); raise or lower it per theme, e.g. on dark surfaces.
 * @cssprop --st-mega-menu-column-deco-transform - The hover/focus shift of the `decoration` line art (default `translate(-6px, 4px)`); `st-dropdown` sets it to `none` while `inline`.
 */
@customElement('st-mega-menu-column')
export class MegaMenuColumn extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: flex;
      flex-direction: column;
      min-width: 0;
      box-sizing: border-box;
      --st-mega-menu-column-accent: var(--st-color-accent);
      /* Accent for text and icons: blended with the theme's strong text colour, so a dark accent
         (e.g. navy) still reads on the dark theme's surface and stays crisp on the light one. */
      --st-mega-menu-column-accent-text: color-mix(in oklch, var(--st-mega-menu-column-accent) 60%, var(--st-color-text-strong));
      ${fontFamilyStyles}
    }

    :host([variant='card']),
    :host([variant='accent']) {
      /* !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         padding; override with --st-mega-menu-column-padding instead. */
      padding: var(--st-mega-menu-column-padding, 2rem 1.75rem 1.75rem) !important;
      border-radius: 20px;
      background: color-mix(in oklch, var(--st-color-text-strong) 5%, var(--st-color-surface));
    }

    /* The accent look, from variant="accent" or from current-variant="accent" while the page it links to is shown. */
    :host([variant='accent']),
    :host([current][current-variant='accent']) {
      background: var(--st-color-accent);
      color: var(--st-color-on-solid);
      /* Read by the st-menu-item links inside. */
      --st-nav-color: var(--st-color-on-solid);
      --st-nav-hover-bg: transparent;
    }

    .heading {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin: 0 0 0.75rem;
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1.35;
      color: var(--st-color-text-strong);
      text-decoration: none;
    }

    :host([variant='card']) .heading,
    :host([variant='accent']) .heading {
      font-size: 1.375rem;
    }

    :host([variant='accent']) .heading,
    :host([current][current-variant='accent']) .heading {
      color: inherit;
    }

    a.heading:hover,
    a.heading:focus-visible {
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .description {
      margin: -0.25rem 0 0.75rem;
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--st-color-text-muted);
    }

    :host([variant='accent']) .description,
    :host([current][current-variant='accent']) .description {
      color: inherit;
      opacity: 0.85;
    }

    .items {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* Nested groups stack with room between them (!important for the same page-reset reason). */
    ::slotted(st-mega-menu-column:not(:first-child)) {
      margin-top: 2rem !important;
    }

    .cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 0.875rem 1.5rem;
      border-radius: 9999px;
      background: var(--st-color-surface);
      color: var(--st-color-text-strong);
      font-size: 1rem;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      transition: box-shadow 0.2s ease;
    }

    .cta-spacer {
      flex: 1;
      min-height: 1.75rem;
    }

    .cta:hover,
    .cta:focus-visible {
      box-shadow: 0 0 0 2px currentColor;
    }

    .cta-arrow {
      display: inline-block;
    }

    @media (prefers-reduced-motion: reduce) {
      .cta {
        transition: none;
      }
    }

    /* ---- variant="product": a product card ---- */

    .edge,
    .top,
    .tile,
    .pill {
      display: none;
    }

    :host([variant='product']) {
      position: relative;
      overflow: hidden;
      gap: 14px;
      /* !important for the same page-reset reason as card/accent. The border is 1px; the current card's
         2px border takes its padding from the 1px it gives up, so nothing moves. */
      padding: 24px !important;
      border: 1px solid var(--st-color-border);
      border-radius: 20px;
      background: var(--st-color-surface);
      box-shadow: 0 1px 2px var(--st-shadow-color-sm);
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease,
        background-color 0.2s ease;
    }

    :host([variant='product']) .edge {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--st-mega-menu-column-accent), transparent);
      pointer-events: none;
    }

    /* The decorative line art: behind the card's content (z-index 0), faded toward the bottom-left. */
    :host([variant='product']) .deco {
      position: absolute;
      top: 0;
      right: 0;
      width: 240px;
      height: 160px;
      z-index: 0;
      pointer-events: none;
      color: var(--st-mega-menu-column-accent);
      opacity: var(--st-mega-menu-column-deco-opacity, 0.28);
      -webkit-mask-image: radial-gradient(120% 120% at 100% 0%, #000 35%, transparent 75%);
      mask-image: radial-gradient(120% 120% at 100% 0%, #000 35%, transparent 75%);
      transition:
        transform 0.4s ease,
        opacity 0.4s ease;
    }

    /* Everything else in the card paints above the line art (.edge keeps its absolute position). */
    :host([variant='product']) .edge {
      z-index: 1;
    }

    :host([variant='product']) .top,
    :host([variant='product']) .heading,
    :host([variant='product']) .description,
    :host([variant='product']) .items,
    :host([variant='product']) .cta-spacer,
    :host([variant='product']) .cta {
      position: relative;
      z-index: 1;
    }

    :host([variant='product']:hover) .deco,
    :host([variant='product']:focus-within) .deco {
      opacity: 0.5;
      transform: var(--st-mega-menu-column-deco-transform, translate(-6px, 4px));
    }

    :host([variant='product'][current]) .deco {
      opacity: 0.42;
    }

    :host([variant='product']) .top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }

    :host([variant='product']) .tile {
      display: inline-flex;
      flex: none;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: color-mix(in oklch, var(--st-mega-menu-column-accent) 14%, transparent);
      color: var(--st-mega-menu-column-accent-text);
    }

    :host([variant='product']) .tile iconify-icon {
      display: block;
      width: 24px;
      height: 24px;
      font-size: 24px;
    }

    /* The image is 28px inside the 44px tile, which keeps the same tinted background as an iconify tile. No display here: the theme classes below set it. */
    :host([variant='product']) .tile img {
      flex: none;
      width: 28px;
      height: 28px;
      object-fit: contain;
    }

    /* Light and dark icon per the site's theme: the dark one shows on :root.dark (see --st-theme-*-display). */
    .theme-light {
      display: var(--st-theme-light-display, inline-block);
    }

    .theme-dark {
      display: var(--st-theme-dark-display, none);
    }

    :host([variant='product']) .pills {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 6px;
      margin-left: auto;
    }

    :host([variant='product']) .pill {
      display: inline-flex;
      align-items: center;
      height: 22px;
      padding: 0 8px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    :host([variant='product']) .pill.tag {
      display: inline-flex;
      background: color-mix(in oklch, var(--st-mega-menu-column-accent) 12%, transparent);
      color: var(--st-mega-menu-column-accent-text);
    }

    :host([variant='product']) .heading {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
    }

    :host([variant='product']) .description {
      margin: 0;
    }

    :host([variant='product']) .items.has-links {
      gap: 4px;
      padding-top: 12px;
      border-top: 1px solid var(--st-color-border);
    }

    /* Each link is a row: the arrow (set on the links here, drawn by st-menu-item) slides on hover in the accent. */
    :host([variant='product']) ::slotted(st-menu-item) {
      --st-menu-item-arrow: '→';
    }

    :host([variant='product']) ::slotted(st-menu-item:hover) {
      --st-nav-color: var(--st-mega-menu-column-accent-text);
    }

    :host([variant='product']) .cta {
      display: flex;
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      padding: 0 1rem;
      white-space: nowrap;
      background: color-mix(in oklch, var(--st-mega-menu-column-accent) 10%, transparent);
      color: var(--st-mega-menu-column-accent-text);
      font-size: 0.875rem;
      font-weight: 600;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }

    :host([variant='product']) .cta:hover,
    :host([variant='product']) .cta:focus-visible {
      box-shadow: none;
      background: var(--st-mega-menu-column-accent);
      color: #fff;
    }

    :host([variant='product']) .cta:hover .cta-arrow,
    :host([variant='product']) .cta:focus-visible .cta-arrow {
      transform: translateX(2px);
    }

    :host([variant='product']:hover),
    :host([variant='product']:focus-within) {
      transform: translateY(var(--st-mega-menu-column-lift, -3px));
      box-shadow: 0 16px 32px -12px var(--st-shadow-color-md);
      border-color: color-mix(in oklch, var(--st-mega-menu-column-accent) 45%, var(--st-color-border));
    }

    /* The page being shown: no solid block, an accent border and wash, and a solid button. Declared after
       the hover rules so it keeps its border while hovered. */
    :host([variant='product'][current]) {
      padding: 23px !important;
      border: 2px solid var(--st-mega-menu-column-accent);
      background: color-mix(in oklch, var(--st-mega-menu-column-accent) 6%, var(--st-color-surface));
    }

    :host([variant='product'][current]) .pill.current {
      display: inline-flex;
      background: var(--st-mega-menu-column-accent);
      color: #fff;
    }

    :host([variant='product'][current]) .cta {
      background: var(--st-mega-menu-column-accent);
      color: #fff;
    }

    :host([variant='product'][current]) .cta:hover,
    :host([variant='product'][current]) .cta:focus-visible {
      background: color-mix(in oklch, var(--st-mega-menu-column-accent) 85%, #000);
      color: #fff;
    }

    @media (prefers-reduced-motion: reduce) {
      :host([variant='product']),
      :host([variant='product']) .cta,
      :host([variant='product']) .cta-arrow {
        transition: none;
      }

      :host([variant='product']:hover),
      :host([variant='product']:focus-within) {
        transform: none;
      }

      :host([variant='product']) .deco {
        transition: none;
      }

      :host([variant='product']:hover) .deco,
      :host([variant='product']:focus-within) .deco {
        transform: none;
      }

      :host([variant='product']) .cta:hover .cta-arrow,
      :host([variant='product']) .cta:focus-visible .cta-arrow {
        transform: none;
      }
    }
  `;

  @property({ type: String })
  heading = '';

  /** Makes the heading a link (e.g. to the section's overview page). */
  @property({ type: String })
  href = '';

  @property({ type: String })
  description = '';

  /** `plain` (default), `card` (tinted tile), `accent` (solid accent tile, light text) or `product` (a product card). */
  @property({ type: String, reflect: true })
  variant: 'plain' | 'card' | 'accent' | 'product' = 'plain';

  /** Text of a pill button at the bottom of the column; needs `cta-href`. */
  @property({ type: String, attribute: 'cta-label' })
  ctaLabel = '';

  @property({ type: String, attribute: 'cta-href' })
  ctaHref = '';

  /**
   * Variant the column takes while its heading or button links to the page being shown, e.g. a card
   * that turns accent on its own product page. Empty (default) keeps `variant` at all times.
   */
  @property({ type: String, attribute: 'current-variant', reflect: true })
  currentVariant: '' | 'plain' | 'card' | 'accent' = '';

  /** Small icon tile on a `product` card: an iconify icon name, e.g. `heroicons:book-open`. */
  @property({ type: String })
  icon = '';

  /** Image icon of a `product` card (28px inside the 44px tile), e.g. a product logo. Replaces the iconify `icon` when set. */
  @property({ type: String, attribute: 'icon-src' })
  iconSrc = '';

  /** Dark-theme variant of `icon-src`, shown on the site's dark theme (`:root.dark`) in place of it. Needs `icon-src`. */
  @property({ type: String, attribute: 'icon-src-dark' })
  iconSrcDark = '';

  /** Short label pill on the top row of a `product` card, e.g. `Open source`. */
  @property({ type: String })
  tag = '';

  /** Accent of a `product` card, any CSS colour (sets `--st-mega-menu-column-accent`). */
  @property({ type: String })
  accent = '';

  /**
   * Decorative curvy line art behind a `product` card's top-right corner: `flow` (lines fanning down-left),
   * `orbit` (concentric arcs), `waves` (parallel waves across the top) or `ribbon` (crossing loops).
   * `none` (default) draws nothing. Other variants ignore it.
   */
  @property({ type: String, reflect: true })
  decoration: 'none' | 'flow' | 'orbit' | 'waves' | 'ribbon' = 'none';

  /** "You are here" marker on the `product` card of the page being shown. */
  @property({ type: String, attribute: 'current-label' })
  currentLabel = 'Current';

  /** Page path the header is showing; set by `st-header`. A link whose href matches gets `aria-current="page"`. */
  @property({ attribute: false })
  currentPath = '';

  /**
   * True while the column is the page being shown: while `current-variant` applies, or always for a
   * `product` card. Set by the column, never from outside.
   */
  @property({ type: Boolean, reflect: true })
  current = false;

  /** Whether the links slot has any links, so a `product` card draws its divider only above them. */
  @state() private hasLinks = false;

  private onLinksSlotChange = (event: Event): void => {
    this.hasLinks = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
  };

  protected willUpdate(changed: Map<string, unknown>): void {
    if (
      changed.has('currentVariant') ||
      changed.has('variant') ||
      changed.has('currentPath') ||
      changed.has('href') ||
      changed.has('ctaHref')
    ) {
      this.current =
        (!!this.currentVariant || this.variant === 'product') &&
        (isCurrentPath(this.href, this.currentPath) || isCurrentPath(this.ctaHref, this.currentPath));
    }
    if (changed.has('accent')) {
      if (this.accent) this.style.setProperty('--st-mega-menu-column-accent', this.accent);
      else this.style.removeProperty('--st-mega-menu-column-accent');
    }
  }

  private select(event: MouseEvent, href: string): void {
    if (href.startsWith('http')) return;
    const selectEvent = new CustomEvent<MegaMenuSelectEventDetail>('mega-menu-select', {
      detail: { href },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(selectEvent);
    if (selectEvent.defaultPrevented) event.preventDefault();
  }

  private renderHeading() {
    if (!this.heading) return nothing;
    return this.href
      ? html`<a
          part="heading"
          class="heading"
          href=${this.href}
          aria-current=${isCurrentPath(this.href, this.currentPath) ? 'page' : nothing}
          @click=${(event: MouseEvent) => this.select(event, this.href)}
          >${this.heading}</a
        >`
      : html`<p part="heading" class="heading">${this.heading}</p>`;
  }

  private renderDecoration() {
    if (this.variant !== 'product' || this.decoration === 'none') return nothing;
    return html`<svg
      class="deco"
      part="decoration"
      viewBox="0 0 240 160"
      preserveAspectRatio="xMaxYMin meet"
      aria-hidden="true"
      focusable="false"
      >${DECORATIONS[this.decoration]}</svg
    >`;
  }

  /** The tile's content: the `icon-src` image (light, plus the dark one when `icon-src-dark` is set), else the iconify `icon`. */
  private renderTileIcon() {
    if (this.iconSrc) {
      const light = html`<img class="${this.iconSrcDark ? 'theme-light' : ''}" src=${this.iconSrc} alt="" width="28" height="28" />`;
      if (!this.iconSrcDark) return light;
      return html`${light}<img class="theme-dark" src=${this.iconSrcDark} alt="" width="28" height="28" />`;
    }
    return html`<iconify-icon icon=${this.icon} aria-hidden="true"></iconify-icon>`;
  }

  private renderTop() {
    if (this.variant !== 'product') return nothing;
    return html`<div part="top" class="top">
      ${this.iconSrc || this.icon
        ? html`<span part="icon" class="tile ${this.iconSrc ? 'image' : ''}">${this.renderTileIcon()}</span>`
        : nothing}
      <span class="pills">
        ${this.current
          ? html`<span part="current" class="pill current">${this.currentLabel}</span>`
          : this.tag
            ? html`<span part="tag" class="pill tag">${this.tag}</span>`
            : nothing}
      </span>
    </div>`;
  }

  private renderCta() {
    if (!this.ctaLabel || !this.ctaHref) return nothing;
    const external = this.ctaHref.startsWith('http');
    let trailing: unknown = nothing;
    if (external) trailing = arrowUpRightIcon(14);
    else if (this.variant === 'product') trailing = html`<span class="cta-arrow" aria-hidden="true">→</span>`;
    return html`
      <span class="cta-spacer"></span>
      <a
        part="cta"
        class="cta"
        href=${this.ctaHref}
        target=${external ? '_blank' : '_self'}
        rel=${external ? 'noopener noreferrer' : nothing}
        aria-current=${isCurrentPath(this.ctaHref, this.currentPath) ? 'page' : nothing}
        @click=${(event: MouseEvent) => this.select(event, this.ctaHref)}
        >${this.ctaLabel} ${trailing}</a
      >
    `;
  }

  render() {
    return html`
      ${this.renderDecoration()}
      ${this.variant === 'product' ? html`<span class="edge" part="edge" aria-hidden="true"></span>` : nothing}
      ${this.renderTop()}
      ${this.renderHeading()}
      ${this.description ? html`<p part="description" class="description">${this.description}</p>` : nothing}
      <div part="items" class=${this.hasLinks ? 'items has-links' : 'items'} role="group" aria-label=${this.heading || nothing}><slot @slotchange=${this.onLinksSlotChange}></slot></div>
      ${this.renderCta()}
    `;
  }
}
