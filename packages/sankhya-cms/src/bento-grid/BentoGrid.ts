import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'iconify-icon';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import {
  cardTitleStyles,
  iconTileStyles,
  reducedMotionStyles,
  sectionHeaderStyles,
  sectionSubtitleStyles,
  sectionTitleStyles, invertedSectionTextStyles } from '../shared/section-styles';

export interface BentoGridItem {
  title: string;
  description?: string;
  /** Iconify icon name, e.g. `mdi:home`. */
  icon?: string;
  imageSrc?: string;
  imageAlt?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  /** Turns the card into a link. */
  href?: string;
}

/** A responsive 4-column bento grid of icon/image cards. Items are set via the `items` property. */
@customElement('st-bento-grid')
export class BentoGrid extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      padding: var(--st-cms-section-padding) var(--st-space-24);
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
      border: 1px solid var(--st-color-border);
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

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ attribute: false })
  items: BentoGridItem[] = [];

  private renderCard(item: BentoGridItem) {
    const classes = `card col-${item.colSpan ?? 1} row-${item.rowSpan ?? 1} ${item.imageSrc ? 'has-image' : ''}`;
    const body = html`
      ${item.imageSrc
        ? html`<div class="image-wrapper" part="image-wrapper">
            <img class="image" part="image" src=${item.imageSrc} alt=${item.imageAlt ?? item.title} />
          </div>`
        : nothing}
      <div class="content" part="content">
        ${item.icon ? html`<div class="icon" part="icon"><iconify-icon icon=${item.icon}></iconify-icon></div>` : nothing}
        <div class="text">
          <h3 class="card-title" part="card-title">${item.title}</h3>
          ${item.description ? html`<p class="card-description" part="card-description">${item.description}</p>` : nothing}
        </div>
      </div>
    `;
    return item.href
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
