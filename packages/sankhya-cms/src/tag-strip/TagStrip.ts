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
    /* fontFamilyStyles is a bare declaration: it must sit inside a rule, or it swallows the next one. */
    :host {
      ${fontFamilyStyles}
    }

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

    /* variant="spread": no band behind the card (it sits on the page), with the same 24px side gutter
       at every width. */
    :host([variant='spread']) {
      width: 100%;
      background: transparent;
      padding: var(--st-tag-strip-padding, var(--st-space-24)) var(--st-space-24) !important;
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

    /* variant="spread": a white card with the label on the left and the items pushed to the right,
       on the content width. */
    :host([variant='spread']) .strip {
      justify-content: space-between;
      padding: 20px 28px;
      border-radius: 12px;
      border-color: var(--st-cms-primary-100, #e4ebff);
      background: var(--st-color-surface);
    }

    :host([variant='spread']) .label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: var(--st-cms-text, var(--st-cms-navy-2, #03346b));
    }

    :host([variant='spread']) .items {
      flex: 1 1 auto;
      justify-content: flex-end;
      gap: 12px 28px;
    }

    :host([variant='spread']) .item {
      font-weight: 600;
      color: var(--st-cms-text-strong, var(--st-cms-navy, #011d41));
    }

    @media (max-width: 600px) {
      .strip {
        flex-direction: column;
        align-items: flex-start;
        padding: var(--st-space-16) var(--st-space-20);
      }

      :host([variant='spread']) .strip {
        padding: 16px 20px;
      }

      :host([variant='spread']) .items {
        justify-content: flex-start;
      }
    }
  `;

  /** Small uppercase label at the start of the band. Omit it for items alone. */
  @property({ type: String })
  label = '';

  /**
   * The same label as `label`, under a name the page JSON can use: the site renderer drops a node's
   * `label` key (it is the node's own name), so JSON sets `heading`. Shown when `label` is empty.
   */
  @property({ type: String })
  heading = '';

  /** The items, shown in order. */
  @property({ attribute: false })
  items: string[] = [];

  /** Puts the band on the dark band (`--st-cms-band-dark-bg`), which stays dark in the dark theme. */
  @property({ type: Boolean, reflect: true })
  inverted = false;

  /** `default` is the bordered band; `spread` is a white card with the label left and the items right (`label` shown). */
  @property({ type: String, reflect: true })
  variant: 'default' | 'spread' = 'default';

  render() {
    return html`
      <div class="strip" part="strip">
        ${this.label || this.heading ? html`<p class="label" part="label">${this.label || this.heading}</p>` : nothing}
        <ul class="items" part="items">
          ${this.items.map(item => html`<li class="item" part="item">${item}</li>`)}
        </ul>
      </div>
    `;
  }
}
