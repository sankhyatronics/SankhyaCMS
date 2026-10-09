import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { sectionSubtitleStyles, sectionTitleStyles, sectionHeaderStyles } from '../shared/section-styles';
import './FeatureItem';

/** Data for one tile when using the `items` property (mirrors `st-feature-item`'s properties). */
export interface FeatureItemData {
  icon?: string;
  title: string;
  description: string;
  href?: string;
}

/**
 * A titled grid of feature tiles. Ports `SankhyaUI`'s React `FeaturesSection`: tiles come from the
 * `items` property, from slotted `st-feature-item` elements (the source's `children`), or both
 * (slotted first). `columns` sets the grid width (default 2; one column below 768px). `inverted`
 * is passed on to the `items` tiles; slotted tiles need their own `inverted` attribute.
 */
@customElement('st-features-section')
export class FeaturesSection extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      ${fontFamilyStyles}
      padding: var(--st-cms-section-padding) var(--st-space-24);
      background: var(--st-color-surface);
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
      margin: 0;
    }

    .subtitle {
      ${sectionSubtitleStyles}
      margin: 0 auto;
    }

    :host([inverted]) .title,
    :host([inverted]) .subtitle {
      color: var(--st-color-on-solid);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(var(--features-columns, 2), 1fr);
      gap: var(--st-space-32);
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--st-space-48) var(--st-space-16);
      }

      .grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  /** Applied to every tile built from `items`. */
  @property({ type: String, attribute: 'action-label' })
  actionLabel = 'Learn more';

  @property({ type: Number })
  columns = 0;

  @property({ type: Boolean, reflect: true })
  inverted = false;

  /** Tiles to render (property only). */
  @property({ attribute: false })
  items: FeatureItemData[] = [];

  render() {
    const gridStyle = this.columns ? `--features-columns: ${this.columns}` : nothing;
    return html`
      <section class="container" part="container">
        <div class="header" part="header">
          <div class="title" part="title">${this.title}</div>
          ${this.subtitle ? html`<div class="subtitle" part="subtitle">${this.subtitle}</div>` : nothing}
        </div>
        <div class="grid" part="grid" style=${gridStyle}>
          <slot></slot>
          ${this.items.map(
            (item) => html`
              <st-feature-item
                .icon=${item.icon ?? ''}
                .title=${item.title}
                .description=${item.description}
                .href=${item.href ?? ''}
                .actionLabel=${this.actionLabel}
                ?inverted=${this.inverted}
              ></st-feature-item>
            `
          )}
        </div>
      </section>
    `;
  }
}
