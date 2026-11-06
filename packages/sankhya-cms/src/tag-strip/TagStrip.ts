import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';

/**
 * A single bordered band: a small uppercase label on the left and a run of bold items beside it
 * (e.g. "Supported platforms: AWS · Azure · GCP"). Items wrap onto new lines on narrow screens.
 * `inverted` puts the band on the dark band (`--st-cms-band-dark-bg`).
 *
 * @cssprop --st-tag-strip-padding - Overrides the block's padding.
 * @csspart strip - The bordered band.
 * @csspart label - The uppercase label.
 * @csspart items - The list of items.
 * @csspart item - Each item (an `li`).
 */
@customElement('st-tag-strip')
export class TagStrip extends LitElement {
  static styles = css`
    ${controlBaseStyles}
    ${fontFamilyStyles}

    :host {
      display: block;
      box-sizing: border-box;
      /* !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         padding; override with --st-tag-strip-padding instead. */
      padding: var(--st-tag-strip-padding, var(--st-space-24)) var(--st-space-24) !important;
      background: var(--st-color-page);
    }

    :host([inverted]) {
      background: var(--st-cms-band-dark-bg);
    }

    .strip {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--st-space-16) var(--st-space-32);
      box-sizing: border-box;
      max-width: var(--st-cms-container-max);
      margin: 0 auto;
      padding: var(--st-space-20) var(--st-space-28, 28px);
      border: 1px solid var(--st-color-border);
      border-radius: var(--st-radius-lg);
      background: var(--st-color-surface);
    }

    :host([inverted]) .strip {
      background: transparent;
      border-color: color-mix(in oklch, var(--st-cms-band-dark-color) 22%, transparent);
    }

    .label {
      margin: 0;
      flex-shrink: 0;
      font-size: var(--st-text-sm);
      font-weight: var(--st-font-weight-bold);
      letter-spacing: var(--st-tracking-wider);
      text-transform: uppercase;
      color: var(--st-color-text-muted);
    }

    :host([inverted]) .label {
      color: color-mix(in oklch, var(--st-cms-band-dark-color) 75%, transparent);
    }

    .items {
      display: flex;
      flex-wrap: wrap;
      flex: 1 1 auto;
      gap: var(--st-space-12) var(--st-space-28, 28px);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .item {
      margin: 0;
      font-size: var(--st-text-lg);
      font-weight: var(--st-font-weight-bold);
      color: var(--st-color-text-strong);
    }

    :host([inverted]) .item {
      color: var(--st-cms-band-dark-color);
    }

    @media (max-width: 600px) {
      .strip {
        flex-direction: column;
        align-items: flex-start;
        padding: var(--st-space-16) var(--st-space-20);
      }
    }
  `;

  /** Small uppercase label at the start of the band. Omit it for items alone. */
  @property({ type: String })
  label = '';

  /** The items, shown in order. */
  @property({ attribute: false })
  items: string[] = [];

  /** Puts the band on the dark band (`--st-cms-band-dark-bg`), which stays dark in the dark theme. */
  @property({ type: Boolean, reflect: true })
  inverted = false;

  render() {
    return html`
      <div class="strip" part="strip">
        ${this.label ? html`<p class="label" part="label">${this.label}</p>` : nothing}
        <ul class="items" part="items">
          ${this.items.map(item => html`<li class="item" part="item">${item}</li>`)}
        </ul>
      </div>
    `;
  }
}
