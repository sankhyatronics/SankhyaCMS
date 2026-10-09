import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'iconify-icon';

import { controlBaseStyles, ctaButtonStyles, fontFamilyStyles } from '../shared/styles';
import '../markdown';
import {
  cardTitleStyles,
  iconTileStyles,
  reducedMotionStyles,
  sectionTitleStyles,
} from '../shared/section-styles';
import type { FeatureSplitActionEventDetail } from './FeatureSplitEvents';

export interface FeatureSplitItem {
  /** Iconify icon name, e.g. `mdi:check`. */
  icon?: string;
  title: string;
  /** Markdown. */
  description: string;
}

export type FeatureSplitImagePosition = 'left' | 'right' | 'top';

/** A title/markdown-subtitle/feature-list block beside (or under) an image. */
@customElement('st-feature-split')
export class FeatureSplit extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      padding: var(--st-space-24);
      background: var(--st-color-page);
      ${fontFamilyStyles}
    }

    :host([inverted]) {
      background: var(--st-color-text-strong);
    }

    .container {
      max-width: var(--st-cms-container-max);
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--st-space-48);
      align-items: center;
    }

    :host([image-position='left']) .container {
      direction: rtl;
    }

    :host([image-position='left']) .content {
      direction: ltr;
    }

    :host([image-position='top']) .container {
      grid-template-columns: 1fr;
      text-align: center;
    }

    :host([image-position='top']) .content {
      align-items: center;
    }

    :host([image-position='top']) .image-wrapper {
      order: -1;
      max-width: 800px;
      margin: 0 auto;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-32);
    }

    .title {
      ${sectionTitleStyles}
      margin: 0;
    }

    .subtitle {
      color: var(--st-color-text-muted);
      font-size: var(--st-text-base);
      line-height: 1.6;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-24);
      margin-top: var(--st-space-16);
    }

    .item {
      display: flex;
      gap: var(--st-space-16);
      align-items: flex-start;
      text-align: left;
    }

    .icon {
      ${iconTileStyles}
      width: var(--st-space-48);
      height: var(--st-space-48);
      font-size: 24px;
    }

    .item-title {
      ${cardTitleStyles}
    }

    .item-description {
      color: var(--st-color-text-muted);
      font-size: var(--st-text-sm);
      line-height: 1.5;
    }

    .action {
      ${ctaButtonStyles}
      justify-self: start;
      padding: var(--st-space-16);
      border-radius: var(--st-radius-lg);
    }

    .image-wrapper {
      width: 100%;
      height: 100%;
      min-height: 400px;
      border-radius: var(--st-space-24);
      overflow: hidden;
      box-shadow: 0 20px 40px -12px var(--st-shadow-color-md);
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .image:hover {
      transform: scale(1.02);
    }

    :host([inverted]) .title,
    :host([inverted]) .item-title {
      color: var(--st-color-on-solid);
    }

    :host([inverted]) .subtitle,
    :host([inverted]) .item-description {
      color: var(--st-color-border);
    }

    :host([inverted]) .icon {
      background: var(--st-color-text);
      color: var(--st-color-border);
    }

    @media (max-width: 1024px) {
      .container {
        gap: var(--st-space-40);
      }
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--st-space-48) var(--st-space-24);
      }

      .container {
        grid-template-columns: 1fr;
        direction: ltr !important;
      }

      .image-wrapper {
        min-height: 300px;
        order: -1;
      }
    }

    ${reducedMotionStyles}
  `;

  @property({ type: Boolean, reflect: true })
  inverted = false;

  @property({ type: String })
  title = '';

  /** Markdown. */
  @property({ type: String })
  subtitle = '';

  @property({ attribute: false })
  items: FeatureSplitItem[] = [];

  @property({ type: String, attribute: 'image-src' })
  imageSrc = '';

  @property({ type: String, attribute: 'image-alt' })
  imageAlt = '';

  @property({ type: String, attribute: 'image-position', reflect: true })
  imagePosition: FeatureSplitImagePosition = 'right';

  @property({ type: String, attribute: 'action-label' })
  actionLabel = '';

  @property({ type: String })
  href = '';

  private onAction() {
    const event = new CustomEvent<FeatureSplitActionEventDetail>('feature-split-action', {
      detail: { href: this.href },
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    if (this.dispatchEvent(event)) window.location.href = this.href;
  }

  render() {
    return html`
      <div class="container" part="container">
        <div class="content" part="content">
          <h2 class="title" part="title">${this.title}</h2>
          ${this.subtitle
            ? html`<div class="subtitle" part="subtitle"><st-markdown .content=${this.subtitle}></st-markdown></div>`
            : nothing}
          ${this.items.length > 0
            ? html`<div class="list" part="list">
                ${this.items.map(
                  (item) => html`
                    <div class="item" part="item">
                      ${item.icon
                        ? html`<div class="icon" part="icon"><iconify-icon icon=${item.icon}></iconify-icon></div>`
                        : nothing}
                      <div>
                        <h3 class="item-title" part="item-title">${item.title}</h3>
                        <div class="item-description" part="item-description">
                          <st-markdown .content=${item.description}></st-markdown>
                        </div>
                      </div>
                    </div>
                  `,
                )}
              </div>`
            : nothing}
          ${this.actionLabel && this.href
            ? html`<button class="action" part="action" type="button" @click=${this.onAction}>${this.actionLabel}</button>`
            : nothing}
        </div>
        <div class="image-wrapper" part="image-wrapper">
          <img class="image" part="image" src=${this.imageSrc} alt=${this.imageAlt || this.title} />
        </div>
      </div>
    `;
  }
}
