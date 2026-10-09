import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

/** Responsive grid of headline numbers with a label and optional description. Port of React `Stats`. */
@customElement('st-stats')
export class Stats extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      box-sizing: border-box;
      padding: var(--st-space-48) var(--st-space-24);
      background-color: var(--st-color-surface);
      border-top: 1px solid var(--st-color-divider);
      border-bottom: 1px solid var(--st-color-divider);
      ${rootFontFamilyStyles}
    }

    :host([inverted]) {
      background-color: var(--st-color-text-strong);
      border-color: transparent;
    }

    .grid {
      max-width: var(--st-cms-container-max);
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--st-space-40);
    }

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: var(--st-space-8);
    }

    .value {
      font-size: var(--st-cms-text-3xl);
      font-weight: var(--st-font-weight-bold);
      color: var(--st-color-text-strong);
      line-height: 1;
      letter-spacing: -0.02em;
    }

    .label {
      font-size: var(--st-text-xl);
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-muted);
      text-transform: uppercase;
      letter-spacing: var(--st-tracking-wide);
    }

    .description {
      font-size: var(--st-text-sm);
      color: var(--st-color-text-faint);
      max-width: 200px;
    }

    :host([inverted]) .value {
      color: var(--st-color-on-solid);
    }

    :host([inverted]) .label,
    :host([inverted]) .description {
      color: var(--st-color-border);
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--st-space-40) var(--st-space-24);
      }
      .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--st-space-24);
      }
      .value {
        font-size: var(--st-cms-text-xl);
      }
    }
  `;

  @property({ attribute: false })
  items: StatItem[] = [];

  @property({ type: Boolean, reflect: true })
  inverted = false;

  render() {
    return html`
      <div class="grid" part="grid">
        ${this.items.map(
          (stat) => html`
            <div class="item" part="item">
              <span class="value" part="value">${stat.value}</span>
              <span class="label" part="label">${stat.label}</span>
              ${stat.description ? html`<span class="description" part="description">${stat.description}</span>` : nothing}
            </div>
          `
        )}
      </div>
    `;
  }
}
