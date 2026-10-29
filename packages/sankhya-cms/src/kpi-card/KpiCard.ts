import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { cardShellStyles, fontFamilyStyles } from '../shared/styles';

/**
 * A key-figure card for dashboards: a label, one large value with an optional unit (for example
 * "lakh" or "crore"), a secondary line, and a row of chips. The `icon` slot sits beside the label.
 * `hero` gives the blue gradient card used for the headline figure. The value is shown exactly as
 * passed in: format numbers (Indian grouping, currency symbols) before setting it.
 *
 * Slots: `icon` (optional glyph), `chips` (a row of `st-chip`), `footer` (anything below the chips).
 */
@customElement('st-kpi-card')
export class KpiCard extends LitElement {
  static styles = css`
    ${fontFamilyStyles}

    :host {
      display: flex;
      flex-direction: column;
      min-width: 0;
      box-sizing: border-box;
      padding: var(--st-space-20);
      ${cardShellStyles}
      color: var(--st-color-text);
    }

    :host([hero]) {
      position: relative;
      overflow: hidden;
      border: 0;
      background: linear-gradient(135deg, var(--st-color-accent) 0%, color-mix(in oklch, var(--st-color-accent) 70%, #3aa8e8) 100%);
      color: var(--st-color-on-solid);
    }

    :host([hero])::after {
      content: '';
      position: absolute;
      top: -40%;
      right: -20%;
      width: 60%;
      padding-bottom: 60%;
      border-radius: var(--st-radius-circle);
      background: color-mix(in oklch, var(--st-color-on-solid) 10%, transparent);
      pointer-events: none;
    }

    .head {
      display: flex;
      align-items: center;
      gap: var(--st-space-10);
      min-height: 32px;
      font-size: var(--st-text-md);
      font-weight: var(--st-font-weight-medium);
      color: var(--st-color-text-secondary);
    }

    :host([hero]) .head {
      color: var(--st-color-on-solid);
      opacity: 0.85;
    }

    .icon {
      display: inline-grid;
      place-items: center;
      width: 32px;
      height: 32px;
      border-radius: var(--st-radius-sm);
      background: var(--st-color-accent-subtle);
      flex: none;
    }

    :host(:not([has-icon])) .icon {
      display: none;
    }

    .value {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: var(--st-space-6);
      margin-top: var(--st-space-14);
      font-size: var(--st-text-kpi);
      font-weight: var(--st-font-weight-bold);
      line-height: 1.1;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--st-color-text-strong);
    }

    :host([hero]) .value {
      color: var(--st-color-on-solid);
      font-size: var(--st-text-hero);
    }

    .unit {
      font-size: var(--st-text-lg);
      font-weight: var(--st-font-weight-medium);
      color: var(--st-color-text-secondary);
    }

    :host([hero]) .unit {
      color: var(--st-color-on-solid);
      opacity: 0.85;
    }

    .sub {
      margin-top: var(--st-space-6);
      font-size: var(--st-text-base);
      color: var(--st-color-text-muted);
    }

    :host([hero]) .sub {
      color: var(--st-color-on-solid);
      opacity: 0.85;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--st-space-8);
      margin-top: var(--st-space-14);
    }

    .chips:empty {
      display: none;
    }

    .footer:empty {
      display: none;
    }
  `;

  /** Label above the figure. */
  @property({ type: String })
  label = '';

  /** The figure, already formatted (for example "25.88"). */
  @property({ type: String })
  value = '';

  /** Unit shown beside the figure (for example "lakh"). */
  @property({ type: String })
  unit = '';

  /** Secondary line below the figure (for example the exact amount and the period). */
  @property({ type: String })
  sub = '';

  /** The blue gradient headline card. */
  @property({ type: Boolean, reflect: true })
  hero = false;

  /** Set when an element is slotted into `icon`, so the icon tile only shows when there is an icon. */
  @property({ type: Boolean, reflect: true, attribute: 'has-icon' })
  hasIcon = false;

  connectedCallback() {
    super.connectedCallback();
    this.hasIcon = this.querySelector('[slot="icon"]') !== null;
  }

  render() {
    return html`
      <div class="head" part="head">
        <span class="icon" part="icon"><slot name="icon"></slot></span>
        <span part="label">${this.label}</span>
      </div>
      <div class="value" part="value">
        <span>${this.value}</span>
        ${this.unit ? html`<span class="unit" part="unit">${this.unit}</span>` : ''}
      </div>
      ${this.sub ? html`<div class="sub" part="sub">${this.sub}</div>` : ''}
      <div class="chips" part="chips"><slot name="chips"></slot></div>
      <div class="footer" part="footer"><slot name="footer"></slot></div>
    `;
  }
}
