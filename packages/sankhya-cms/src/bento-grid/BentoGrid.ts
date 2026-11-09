import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import 'iconify-icon';

import { DECORATIONS } from '../shared/decorations';
import type { DecorationName } from '../shared/decorations';
import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { renderMarkdown } from '../shared/markdown';
import {
  cardTitleStyles,
  ctaLinkStyles,
  iconTileStyles,
  reducedMotionStyles,
  sectionHeaderStyles,
  sectionSubtitleStyles,
  sectionTitleStyles, invertedSectionTextStyles } from '../shared/section-styles';

export interface BentoGridItem {
  title: string;
  /** Markdown. */
  description?: string;
  /** Iconify icon name, e.g. `mdi:home`. */
  icon?: string;
  imageSrc?: string;
  imageAlt?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  /** Without `actionLabel`, turns the whole card into a link. */
  href?: string;
  /** `default` (surface), `primary` (brand fill, white text) or `dark` (navy fill, light text). */
  variant?: 'default' | 'primary' | 'dark';
  /** With `href`, renders a button-style link inside the card instead of linking the whole card. */
  actionLabel?: string;
  /** Accessible name of the action when its visible label repeats across cards (e.g. "See how: Controlled Outsourcing"). */
  actionAriaLabel?: string;
  /**
   * Small rounded labels. On a full-width card (`colSpan: 4`) they sit in a 3-column grid to the
   * right of the text; otherwise below it.
   */
  chips?: BentoGridChip[];
  /** `stack` (default) puts the action under the text; `row` puts the text left and the action right. */
  layout?: 'stack' | 'row';
  /** Faint line art in the card's top-right corner; overrides the grid's `decoration`. `none` turns it off for this card. */
  decoration?: DecorationName | 'none';
}

export interface BentoGridChip {
  label: string;
  /** `solid` navy with white text, `soft` light blue, `plain` the surface tint. Default `plain`. */
  tone?: 'solid' | 'soft' | 'plain';
}

/**
 * A responsive 4-column bento grid of icon/image cards. Items are set via the `items` property.
 * Descriptions are Markdown. A card links as a whole when it has `href` alone; with `actionLabel`
 * the link becomes a button inside the card.
 *
 * A card that uses `chips` or `layout` takes the design-system look: a 32px padding, a 40px icon
 * tile on a light blue (cyan on `primary` and `dark` cards), and on a `primary` card the action is a
 * white navy-text pill. Cards without those options keep the original look.
 *
 * @cssprop --st-bento-grid-padding - Overrides the block's padding.
 * @cssprop --st-bento-card-border - Overrides the colour of the cards' hairline border (default `--st-color-border`).
 * @cssprop --st-bento-description-color - Colour of a design-system card's description (default `--st-cms-text`).
 * @cssprop --st-bento-chip-soft-bg - Background of `soft` chips (default `--st-cms-primary-100`).
 * @cssprop --st-bento-chip-plain-bg - Background of `plain` chips (default `--st-cms-surface-soft`).
 * @cssprop --st-bento-chip-text - Text colour of non-solid chips (default `--st-cms-text-strong`).
 * @csspart chips - The list of chips.
 * @csspart chip - One chip.
 */
@customElement('st-bento-grid')
export class BentoGrid extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      /* !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         padding; override with --st-bento-grid-padding instead. */
      padding: var(--st-bento-grid-padding, var(--st-cms-section-padding) var(--st-space-24)) !important;
      background: var(--st-color-page);
      ${fontFamilyStyles}
    }

    :host([inverted]) {
      background: var(--st-color-text-strong);
    }

    .container {
      max-width: var(--st-cms-container-max);
      margin: 0 auto;
    }

    .header {
      ${sectionHeaderStyles}
    }

    .title {
      ${sectionTitleStyles}
    }

    .subtitle {
      ${sectionSubtitleStyles}
      margin-bottom: 0;
    }

    ${invertedSectionTextStyles}

    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: minmax(240px, auto);
      gap: var(--st-space-24);
    }

    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid var(--st-bento-card-border, var(--st-color-border));
      border-radius: var(--st-space-24);
      background: var(--st-color-surface);
      color: inherit;
      text-decoration: none;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    }

    :host([inverted]) .card {
      background: var(--st-color-text-strong);
      border-color: var(--st-color-text);
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px -10px var(--st-shadow-color-lg);
      z-index: 1;
    }

    /* Decorative line art, as on the mega menu's product cards: behind the content, faded toward the bottom-left. */
    .deco {
      position: absolute;
      top: 0;
      right: 0;
      width: 240px;
      height: 160px;
      z-index: 0;
      pointer-events: none;
      color: var(--st-bento-deco-color, var(--st-color-accent));
      opacity: var(--st-bento-deco-opacity, 0.28);
      -webkit-mask-image: radial-gradient(120% 120% at 100% 0%, #000 35%, transparent 75%);
      mask-image: radial-gradient(120% 120% at 100% 0%, #000 35%, transparent 75%);
      transition:
        transform 0.4s ease,
        opacity 0.4s ease;
    }

    .card:hover .deco {
      opacity: calc(var(--st-bento-deco-opacity, 0.28) + 0.2);
      transform: translate(-6px, 4px);
    }

    :host .card.primary .deco,
    :host .card.dark .deco,
    :host([inverted]) .deco {
      color: var(--st-cms-highlight, var(--st-color-on-solid));
    }

    .image-wrapper {
      position: absolute;
      inset: 0;
    }

    .image-wrapper::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 0%, var(--st-shadow-color-xl) 100%);
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .card:hover .image {
      transform: scale(1.05);
    }

    .content {
      position: relative;
      z-index: 1;
      margin-top: auto;
      padding: var(--st-space-24);
      display: flex;
      flex-direction: column;
      gap: var(--st-space-16);
    }

    .icon {
      ${iconTileStyles}
      width: var(--st-size-40);
      height: var(--st-size-40);
      font-size: 24px;
      background: var(--st-bento-icon-bg, var(--st-color-subtle));
      color: var(--st-bento-icon-color, var(--st-color-text-muted));
    }

    .text {
      padding: var(--st-space-16);
      border-radius: var(--st-radius-md);
    }

    .card-title {
      ${cardTitleStyles}
      font-size: var(--st-text-lg);
    }

    .card-description {
      margin: 0;
      font-size: var(--st-text-md);
      color: var(--st-color-text-muted);
    }

    :host([inverted]) .card-title {
      color: var(--st-color-on-solid);
    }

    :host([inverted]) .card-description {
      color: var(--st-color-border);
    }

    .card.has-image .card-title,
    .card.has-image .card-description {
      color: var(--st-color-on-solid);
    }

    .card.has-image .icon {
      background: var(--st-shadow-color-lg);
      color: var(--st-color-on-solid);
      backdrop-filter: blur(4px);
    }

    /* variant: prefixed with :host so it outranks the :host([inverted]) card rules above. */
    :host .card.primary {
      background: var(--st-color-accent);
      border-color: var(--st-color-accent);
      color: var(--st-color-on-solid);
    }

    :host .card.dark {
      background: var(--st-cms-navy);
      border-color: var(--st-cms-navy);
      color: var(--st-cms-on-dark);
    }

    :host .card.primary .card-title {
      color: var(--st-color-on-solid);
    }

    :host .card.dark .card-title {
      color: var(--st-cms-on-dark);
    }

    :host .card.primary .card-description {
      color: color-mix(in oklch, var(--st-color-on-solid) 85%, transparent);
    }

    :host .card.dark .card-description {
      color: color-mix(in oklch, var(--st-cms-on-dark) 80%, transparent);
    }

    :host .card.primary .icon {
      background: color-mix(in oklch, var(--st-color-on-solid) 18%, transparent);
      color: var(--st-color-on-solid);
    }

    :host .card.dark .icon {
      background: color-mix(in oklch, var(--st-cms-on-dark) 12%, transparent);
      color: var(--st-cms-on-dark);
    }

    .card-description > :first-child {
      margin-top: 0;
    }

    .card-description > :last-child {
      margin-bottom: 0;
    }

    .card-description p {
      margin: 0 0 var(--st-space-8);
    }

    .card-description a {
      position: relative;
      color: inherit;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    /* Touch target: the link keeps its text size; a 44px hit area (WCAG 2.5.5) sits over it. */
    .card-description a::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: max(100%, 44px);
      height: 44px;
      transform: translate(-50%, -50%);
    }

    .action {
      ${ctaLinkStyles}
      align-self: flex-start;
      min-height: 44px;
      margin-top: var(--st-space-8);
      background: var(--st-button-primary-bg);
      color: var(--st-button-primary-color);
      font-weight: var(--st-button-font-weight);
      position: relative;
      z-index: 1;
    }

    .action:hover {
      transform: scale(1.03);
    }

    .action:focus-visible {
      outline: var(--st-focus-ring);
      outline-offset: 2px;
    }

    .card.primary .action {
      background: var(--st-cms-on-dark);
      color: var(--st-color-accent);
    }

    .card.dark .action {
      background: var(--st-cms-highlight);
      color: var(--st-cms-navy);
    }

    /* Design-system look, only on cards that use chips or layout (.v2). */
    .card.v2 .content {
      padding: var(--st-space-32);
    }

    .card.v2 .icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: var(--st-cms-primary-100);
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
    }

    :host .card.v2.primary .icon,
    :host .card.v2.dark .icon {
      background: var(--st-cms-highlight);
      color: var(--st-cms-navy);
    }

    :host .card.v2.primary .icon {
      background: var(--st-cms-highlight);
    }

    .card.row .content {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }

    .card.row .text {
      flex: 1 1 360px;
      padding: 0;
    }

    .card.row .action {
      margin-top: 0;
      align-self: center;
    }

    .split {
      width: 100%;
    }

    .card.v2 .text {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-12);
    }

    .card.v2 .card-title {
      margin: 0;
      font-size: 20px;
      font-weight: var(--st-font-weight-semibold);
    }

    .card.v2 .card-description {
      font-size: 14px;
      line-height: 1.5;
      color: var(--st-bento-description-color, var(--st-cms-text, var(--st-cms-navy-2, #03346b)));
    }

    .card.v2 .chip {
      padding: 12px 6px;
      border-radius: 8px;
      font-size: 13px;
    }

    /* The suite card: navy fill, light description, cyan icon tile (set above), white pill. */
    :host .card.v2.primary {
      background: var(--st-cms-brand-navy, #2144aa);
      border-color: var(--st-cms-brand-navy, #2144aa);
    }

    :host .card.v2.primary .card-description {
      color: var(--st-cms-primary-100, #e4ebff);
    }

    :host .card.v2.primary.row .action {
      min-height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      font-size: 15px;
      border-radius: var(--st-radius-full);
      background: var(--st-cms-on-dark);
      color: var(--st-cms-navy);
    }

    .split {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 340px);
      gap: var(--st-space-24);
      align-items: center;
    }

    .split .text {
      padding: 0;
    }

    .chips {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--st-space-8);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .chip {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
      padding: var(--st-space-8) var(--st-space-12);
      border-radius: var(--st-radius-sm);
      background: var(--st-bento-chip-plain-bg, var(--st-cms-surface-soft));
      color: var(--st-bento-chip-text, var(--st-cms-text-strong, var(--st-cms-navy)));
      font-size: var(--st-text-sm);
      font-weight: var(--st-font-weight-semibold);
      line-height: 1.3;
      text-align: center;
    }

    .chip.solid {
      background: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
    }

    .chip.soft {
      background: var(--st-bento-chip-soft-bg, var(--st-cms-primary-100));
      color: var(--st-bento-chip-text, var(--st-cms-text-strong, var(--st-cms-navy)));
    }

    :host .card.dark .chip.plain {
      background: var(--st-cms-navy-2);
      color: var(--st-cms-on-dark);
    }

    @media (max-width: 1024px) {
      .split {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .card:hover .deco {
        transform: none;
      }
    }

    @media (max-width: 640px) {
      .chips {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    .col-1 { grid-column: span 1; }
    .col-2 { grid-column: span 2; }
    .col-3 { grid-column: span 3; }
    .col-4 { grid-column: span 4; }
    .row-1 { grid-row: span 1; }
    .row-2 { grid-row: span 2; }

    @media (max-width: 1024px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .col-3,
      .col-4 {
        grid-column: span 2;
      }
    }

    @media (max-width: 640px) {
      .grid {
        grid-template-columns: 1fr;
      }
      .col-1,
      .col-2,
      .col-3,
      .col-4 {
        grid-column: span 1;
      }
    }

    ${reducedMotionStyles}
  `;

  @property({ type: Boolean, reflect: true })
  inverted = false;

  /** Line art on every card (`flow`, `orbit`, `waves` or `ribbon`); a card's own `decoration` wins. Default none. */
  @property({ type: String })
  decoration: DecorationName | 'none' = 'none';

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ attribute: false })
  items: BentoGridItem[] = [];

  private renderCard(item: BentoGridItem) {
    const variant = item.variant ?? 'default';
    const colSpan = item.colSpan ?? 1;
    const hasChips = !!item.chips?.length;
    const styled = hasChips || !!item.layout;
    const classes = [
      'card',
      `col-${colSpan}`,
      `row-${item.rowSpan ?? 1}`,
      item.imageSrc ? 'has-image' : '',
      variant === 'default' ? '' : variant,
      styled ? 'v2' : '',
      item.layout === 'row' ? 'row' : ''
    ]
      .filter(Boolean)
      .join(' ');
    // A full-width card with chips puts them beside the text; elsewhere they follow the text.
    const beside = hasChips && colSpan === 4;
    // Row and beside layouts put the icon inside the text column, above the title; other cards keep it on top.
    const iconInText = beside || item.layout === 'row';
    const icon = item.icon
      ? html`<div class="icon" part="icon"><iconify-icon icon=${item.icon}></iconify-icon></div>`
      : nothing;
    const text = html`<div class="text" part="text">
      ${iconInText ? icon : nothing}
      <h3 class="card-title" part="card-title">${item.title}</h3>
      ${item.description
        ? html`<div class="card-description" part="card-description">${unsafeHTML(renderMarkdown(item.description))}</div>`
        : nothing}
    </div>`;
    const chips = hasChips
      ? html`<ul class="chips" part="chips">
          ${item.chips?.map(
            chip => html`<li class="chip ${chip.tone ?? 'plain'}" part="chip">${chip.label}</li>`
          )}
        </ul>`
      : nothing;
    const decoration = item.imageSrc ? 'none' : (item.decoration ?? this.decoration);
    const body = html`
      ${decoration !== 'none' && DECORATIONS[decoration]
        ? html`<svg class="deco" part="decoration" viewBox="0 0 240 160" preserveAspectRatio="xMaxYMin meet" aria-hidden="true" focusable="false">${DECORATIONS[decoration]}</svg>`
        : nothing}
      ${item.imageSrc
        ? html`<div class="image-wrapper" part="image-wrapper">
            <img class="image" part="image" src=${item.imageSrc} alt=${item.imageAlt ?? item.title} />
          </div>`
        : nothing}
      <div class="content" part="content">
        ${iconInText ? nothing : icon}
        ${beside
          ? html`<div class="split">${text}${chips}</div>`
          : html`${text}${chips}`}
        ${item.href && item.actionLabel
          ? html`<a class="action" part="action" href=${item.href} aria-label=${item.actionAriaLabel || nothing}>${item.actionLabel}</a>`
          : nothing}
      </div>
    `;
    return item.href && !item.actionLabel
      ? html`<a part="card" class=${classes} href=${item.href}>${body}</a>`
      : html`<div part="card" class=${classes}>${body}</div>`;
  }

  render() {
    return html`
      <div class="container" part="container">
        ${this.title || this.subtitle
          ? html`<div class="header" part="header">
              ${this.title ? html`<h2 class="title" part="title">${this.title}</h2>` : nothing}
              ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
            </div>`
          : nothing}
        <div class="grid" part="grid">${this.items.map((item) => this.renderCard(item))}</div>
      </div>
    `;
  }
}
