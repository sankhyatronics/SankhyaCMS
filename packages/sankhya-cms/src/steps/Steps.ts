import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { renderMarkdown } from '../shared/markdown';
import { sectionEyebrowStyles, sectionHeaderStyles, sectionSubtitleStyles, sectionTitleStyles } from '../shared/section-styles';

export interface StepItem {
  title: string;
  /** Plain text, or Markdown when the block has `markdown` set (for inline `code`). */
  description?: string;
  /** Small pill beside the title (e.g. "Included"). On the highlighted last card it turns cyan. */
  badge?: string;
}

/**
 * A numbered process: a responsive grid of cards, each with an automatic "01", "02", ... number, a
 * title and a description. `highlightLast` makes the final card a dark navy call-out, the way
 * enterprise pages close a how-it-works sequence. `inverted` puts the whole block on the dark band.
 * `variant="band"` sets the block on a white full-width band with hairline top and bottom borders;
 * the cards sit on a light blue surface and the numbers are large azure.
 *
 * @cssprop --st-steps-padding - Overrides the block's padding.
 * @csspart header - The eyebrow/title/subtitle block.
 * @csspart card - Each step card (an `li`).
 * @csspart number - The step number.
 * @csspart badge - The pill beside a step's title.
 */
@customElement('st-steps')
export class Steps extends LitElement {
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
      ${sectionEyebrowStyles}
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

    /* variant="band": a white full-width band with hairline borders; light blue cards, azure numbers.
       The heading block is left-aligned in a 720px column (label, 36px title, 18px lead). */
    :host([variant='band']) {
      padding: 0 !important;
      background: var(--st-color-surface, #ffffff);
      border-top: 1px solid var(--st-cms-primary-100);
      border-bottom: 1px solid var(--st-cms-primary-100);
    }

    /* The band's section rhythm and gutters sit on the container (inside the shadow root, so a page
       reset cannot zero them), which is a 1200px box centred on the page. */
    :host([variant='band']) .container {
      box-sizing: border-box;
      /* The side gutter sits inside the box, so the content itself still gets the full container width. */
      max-width: calc(var(--st-cms-container-max) + 2 * var(--st-space-24));
      padding: var(--st-cms-section-padding, 5rem) var(--st-space-24);
    }

    .description p {
      margin: 0;
    }

    .description code {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 13px;
    }

    :host([variant='band']) .header {
      max-width: 720px;
      margin-bottom: var(--st-space-48);
      text-align: left;
    }

    :host([variant='band']) .eyebrow {
      margin-bottom: var(--st-space-12);
      font-size: 12px;
      font-weight: var(--st-font-weight-semibold);
      letter-spacing: 0.05em;
      color: var(--st-cms-eyebrow, #0c64c5);
    }

    :host([variant='band']) .title {
      font-size: 36px;
      line-height: 1.2;
      font-weight: var(--st-font-weight-bold);
    }

    :host([variant='band']) .subtitle {
      max-width: none;
      margin: 0;
      font-size: 18px;
      line-height: 1.6;
      color: var(--st-cms-text, var(--st-cms-navy-2, #03346b));
    }

    :host([variant='band']) .card {
      gap: var(--st-space-12);
      padding: var(--st-space-24);
      border: 1px solid var(--st-cms-primary-100);
      border-radius: 12px;
      background: var(--st-cms-surface-soft);
      color: var(--st-cms-text, var(--st-cms-navy-2, #03346b));
    }

    :host([variant='band']) .number {
      font-size: 32px;
      font-weight: var(--st-font-weight-bold);
      color: var(--st-cms-brand-azure);
    }

    :host([variant='band']) .card-title {
      margin: 0;
      font-size: 20px;
      font-weight: var(--st-font-weight-semibold);
      line-height: 1.3;
    }

    :host([variant='band']) .description {
      font-size: 14px;
      line-height: 1.5;
      color: var(--st-cms-text, var(--st-cms-navy-2, #03346b));
    }

    .title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--st-space-8) var(--st-space-12);
      margin-top: var(--st-space-8);
    }

    .title-row .card-title {
      margin: 0;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: var(--st-radius-full);
      background: var(--st-cms-primary-100);
      color: var(--st-cms-navy);
      font-size: var(--st-text-xs);
      font-weight: var(--st-font-weight-bold);
      line-height: 1.4;
      white-space: nowrap;
    }

    .card.highlight .badge {
      background: var(--st-cms-highlight);
      color: var(--st-cms-navy);
    }

    /* band: the highlighted card stays a dark call-out (the band's light card rules would hide its
       white title). Declared last, with the .card.highlight selector, so it wins over the band rules. */
    :host([variant='band']) .card.highlight {
      background: var(--st-cms-navy);
      border-color: var(--st-cms-primary-200);
      color: var(--st-cms-primary-100);
    }

    :host([variant='band']) .card.highlight .number {
      color: var(--st-cms-highlight);
    }

    :host([variant='band']) .card.highlight .card-title {
      color: var(--st-cms-on-dark);
    }

    :host([variant='band']) .card.highlight .description {
      color: var(--st-cms-primary-100);
    }

    :host([variant='band']) .badge {
      padding: 2px 8px;
      font-size: 12px;
      font-weight: var(--st-font-weight-semibold);
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

  /** `default` is the bordered card grid; `band` is a white full-width band with light blue cards. */
  @property({ type: String, reflect: true })
  variant: 'default' | 'band' = 'default';

  /** Renders each step's description as Markdown (inline `code`, links). Off by default: descriptions are plain text. */
  @property({ type: Boolean, reflect: true })
  markdown = false;

  private renderDescription(step: StepItem) {
    if (!step.description) return nothing;
    return this.markdown
      ? html`<div class="description" part="description">${unsafeHTML(renderMarkdown(step.description))}</div>`
      : html`<p class="description" part="description">${step.description}</p>`;
  }

  private renderTitle(step: StepItem) {
    const title = html`<h3 class="card-title" part="card-title">${step.title}</h3>`;
    if (!step.badge) return title;
    return html`<div class="title-row">
      ${title}
      <span class="badge" part="badge">${step.badge}</span>
    </div>`;
  }

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
                ${this.renderTitle(step)}
                ${this.renderDescription(step)}
              </li>
            `
          )}
        </ol>
      </div>
    `;
  }
}
