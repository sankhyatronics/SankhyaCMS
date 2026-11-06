import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { sectionHeaderStyles, sectionSubtitleStyles, sectionTitleStyles } from '../shared/section-styles';

export interface StepItem {
  title: string;
  description?: string;
}

/**
 * A numbered process: a responsive grid of cards, each with an automatic "01", "02", ... number, a
 * title and a description. `highlightLast` makes the final card a dark navy call-out, the way
 * enterprise pages close a how-it-works sequence. `inverted` puts the whole block on the dark band.
 *
 * @cssprop --st-steps-padding - Overrides the block's padding.
 * @csspart header - The eyebrow/title/subtitle block.
 * @csspart card - Each step card (an `li`).
 * @csspart number - The step number.
 */
@customElement('st-steps')
export class Steps extends LitElement {
  static styles = css`
    ${controlBaseStyles}
    ${fontFamilyStyles}

    :host {
      display: block;
      box-sizing: border-box;
      /* !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         padding; override with --st-steps-padding instead. */
      padding: var(--st-steps-padding, var(--st-cms-section-padding) var(--st-space-24)) !important;
      background: var(--st-color-page);
    }

    :host([inverted]) {
      background: var(--st-cms-band-dark-bg);
    }

    .container {
      max-width: var(--st-cms-container-max);
      margin: 0 auto;
    }

    .header {
      ${sectionHeaderStyles}
    }

    .eyebrow {
      margin: 0 0 var(--st-space-12);
      font-size: var(--st-text-sm);
      font-weight: var(--st-font-weight-bold);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--st-color-text-muted);
    }

    .title {
      ${sectionTitleStyles}
      color: inherit;
      letter-spacing: -0.02em;
    }

    .subtitle {
      ${sectionSubtitleStyles}
      max-width: 60ch;
      margin: 0 auto;
    }

    .grid {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
      gap: var(--st-space-24);
    }

    .card {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-12);
      box-sizing: border-box;
      margin: 0;
      padding: var(--st-space-32);
      border: 1px solid var(--st-color-border);
      border-radius: var(--st-radius-lg);
      background: var(--st-color-surface);
      color: var(--st-color-text);
    }

    .number {
      font-size: var(--st-cms-text-3xl);
      font-weight: var(--st-font-weight-bold);
      line-height: 1;
      letter-spacing: -0.02em;
      color: var(--st-color-accent);
      font-variant-numeric: tabular-nums;
    }

    .card-title {
      margin: var(--st-space-8) 0 0;
      font-size: var(--st-text-xl);
      font-weight: var(--st-font-weight-semibold);
      line-height: 1.3;
      color: var(--st-color-text-strong);
    }

    .description {
      margin: 0;
      font-size: var(--st-text-md);
      line-height: 1.6;
      color: var(--st-color-text-muted);
    }

    /* inverted: a dark band with light cards; the number moves to the cyan highlight so it reads on navy. */
    :host([inverted]) .card {
      background: color-mix(in oklch, var(--st-cms-band-dark-color) 6%, transparent);
      border-color: color-mix(in oklch, var(--st-cms-band-dark-color) 16%, transparent);
    }

    :host([inverted]) .number {
      color: var(--st-cms-highlight);
    }

    :host([inverted]) .title,
    :host([inverted]) .card-title {
      color: var(--st-cms-band-dark-color);
    }

    :host([inverted]) .eyebrow,
    :host([inverted]) .subtitle,
    :host([inverted]) .description {
      color: color-mix(in oklch, var(--st-cms-band-dark-color) 75%, transparent);
    }

    /* highlightLast: the final card is the dark call-out. Declared after the inverted rules so it wins. */
    .card.highlight {
      background: var(--st-cms-navy);
      border-color: var(--st-cms-navy);
      color: var(--st-cms-on-dark);
    }

    .card.highlight .number {
      color: var(--st-cms-highlight);
    }

    .card.highlight .card-title {
      color: var(--st-cms-on-dark);
    }

    .card.highlight .description {
      color: color-mix(in oklch, var(--st-cms-on-dark) 80%, transparent);
    }

    @media (max-width: 600px) {
      :host {
        padding: var(--st-steps-padding, var(--st-space-40) var(--st-space-20)) !important;
      }
      .card {
        padding: var(--st-space-24);
      }
    }
  `;

  /** Small uppercase label above the title. */
  @property({ type: String })
  eyebrow = '';

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  /** The steps, in order. */
  @property({ attribute: false })
  items: StepItem[] = [];

  /** Renders the last step as a dark navy call-out card. */
  @property({ type: Boolean, reflect: true, attribute: 'highlight-last' })
  highlightLast = false;

  /** Puts the block on the dark band (`--st-cms-band-dark-bg`), which stays dark in the dark theme. */
  @property({ type: Boolean, reflect: true })
  inverted = false;

  render() {
    const heading = this.eyebrow || this.title || this.subtitle;
    const last = this.items.length - 1;
    return html`
      <div class="container" part="container">
        ${heading
          ? html`<div class="header" part="header">
              ${this.eyebrow ? html`<p class="eyebrow" part="eyebrow">${this.eyebrow}</p>` : nothing}
              ${this.title ? html`<h2 class="title" part="title">${this.title}</h2>` : nothing}
              ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
            </div>`
          : nothing}
        <ol class="grid" part="grid" aria-label=${this.title || nothing}>
          ${this.items.map(
            (step, index) => html`
              <li class="card ${this.highlightLast && index === last ? 'highlight' : ''}" part="card">
                <span class="number" part="number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
                <h3 class="card-title" part="card-title">${step.title}</h3>
                ${step.description ? html`<p class="description" part="description">${step.description}</p>` : nothing}
              </li>
            `
          )}
        </ol>
      </div>
    `;
  }
}
