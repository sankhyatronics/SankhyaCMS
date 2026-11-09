import { LitElement, css, html, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'iconify-icon';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { sectionEyebrowStyles, sectionSubtitleStyles, sectionTitleStyles } from '../shared/section-styles';
import '../markdown';
import { QUOTE_OPEN_EVENT, type QuoteOpenEventDetail } from '../quote-dialog/QuoteDialogEvents';

const CHECK_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12l5 5L20 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

/** Placeholder in `footnote` where the `footnote-action-label` button is placed inline. */
const FOOTNOTE_ACTION_TOKEN = '{action}';

export interface PlanCardItem {
  id: string;
  /** Iconify icon name, e.g. `mdi:rocket-launch`. */
  icon?: string;
  title: string;
  /** Small pill beside the title, e.g. "Most popular". */
  badge?: string;
  /** `highlight` (cyan, navy text) or `primary` (navy, white text). Default `primary`. */
  badgeTone?: 'highlight' | 'primary';
  description?: string;
  bullets?: string[];
  /** Label of the card's button. */
  actionLabel: string;
  /** Target of the button when the cards have no `quoteDialog`. */
  href?: string;
  /** The highlighted card: white with a 2px navy border and a navy button. */
  featured?: boolean;
}

/**
 * A row of plan or offer cards with a header above them. Each card has an icon, a title with an
 * optional badge, a description, check-marked bullets and a button at the foot of the card.
 *
 * A button opens a `st-quote-dialog` when `quote-dialog` names its `id`: it fires a window
 * `st-quote-open` event with `{ dialog, option: item.id, trigger }` and does not navigate. Without
 * `quote-dialog`, the button is a link to `href`. The footnote's action (`footnote-action-label`)
 * opens the same dialog with the option `unsure`. Put `{action}` in `footnote` to place that button
 * inside the sentence (the text around it is then plain text, not Markdown); without the token the
 * button follows the footnote.
 *
 * @cssprop --st-plan-cards-padding - Overrides the block's padding.
 * @cssprop --st-plan-cards-lead-color - Colour of the line under the title (default `--st-cms-text`).
 * @csspart header - The eyebrow, title and lead block.
 * @csspart grid - The grid of cards.
 * @csspart card - One plan card.
 * @csspart icon - The icon tile.
 * @csspart badge - The pill beside a card title.
 * @csspart action - The card button (a `<button>` with `quote-dialog`, otherwise a link with `href`).
 * @csspart footnote - The footnote under the cards.
 * @csspart footnote-action - The text button in the footnote.
 */
@customElement('st-plan-cards')
export class PlanCards extends LitElement {
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
         padding and borders; override with --st-plan-cards-padding instead. */
      padding: var(--st-plan-cards-padding, 80px 24px) !important;
      border-top: 1px solid var(--st-cms-primary-100, #e4ebff) !important;
      border-bottom: 1px solid var(--st-cms-primary-100, #e4ebff) !important;
      background: var(--st-color-surface, #ffffff);
    }

    .container {
      max-width: var(--st-cms-container-max);
      margin: 0 auto;
    }

    .header {
      max-width: 720px;
      margin-bottom: var(--st-space-48);
    }

    .eyebrow {
      ${sectionEyebrowStyles}
      font-size: 12px;
      color: var(--st-cms-eyebrow, var(--st-cms-navy-2-border));
    }

    .title {
      ${sectionTitleStyles}
      font-weight: var(--st-font-weight-bold);
      letter-spacing: -0.02em;
    }

    .lead {
      ${sectionSubtitleStyles}
      margin: 0;
      color: var(--st-plan-cards-lead-color, var(--st-cms-text, var(--st-cms-navy-2)));
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--st-space-24);
      align-items: stretch;
    }

    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-sizing: border-box;
      padding: var(--st-space-32);
      border: 1px solid var(--st-cms-primary-200);
      border-radius: 24px;
      background: var(--st-cms-surface-soft);
      color: var(--st-color-text);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 32px -16px var(--st-shadow-color-lg);
    }

    .card.featured {
      border: 2px solid var(--st-cms-brand-navy);
      background: var(--st-color-surface);
      box-shadow: 0 20px 25px -5px #0000001a, 0 10px 10px -5px #0000000a;
    }

    .card.featured:hover {
      box-shadow: 0 28px 40px -12px #00000029, 0 14px 20px -8px #0000000f;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: var(--st-cms-primary-100);
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
      font-size: 26px;
    }

    .card:not(.featured) .icon {
      background: var(--st-color-surface);
    }

    .title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
    }

    .card-title {
      margin: 0;
      font-size: 24px;
      font-weight: var(--st-font-weight-bold);
      line-height: 1.25;
      color: var(--st-color-text-strong);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 3px 10px;
      border-radius: var(--st-radius-full);
      background: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
      font-size: 12px;
      font-weight: var(--st-font-weight-semibold);
      line-height: 1.4;
      white-space: nowrap;
    }

    .badge.highlight {
      background: var(--st-cms-highlight);
      color: var(--st-cms-navy);
    }

    .description {
      margin: 0;
      font-size: 16px;
      line-height: 1.6;
      color: var(--st-cms-text, var(--st-cms-navy-2));
    }

    .bullets {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .bullets li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 15px;
      line-height: 1.5;
      color: var(--st-cms-text, var(--st-cms-navy-2));
    }

    .bullets svg {
      flex: none;
      width: 20px;
      height: 20px;
      margin-top: 3px;
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
    }

    .action {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 48px;
      margin-top: auto;
      padding: 0 var(--st-space-24);
      border: 1px solid var(--st-cms-brand-navy);
      border-radius: var(--st-radius-full);
      background: var(--st-color-surface);
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
      font: inherit;
      font-size: 16px;
      font-weight: var(--st-font-weight-semibold);
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .action.featured {
      background: var(--st-cms-brand-navy);
      border-color: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
    }

    .action:hover {
      transform: scale(1.02);
    }

    .action:focus-visible,
    .link-action:focus-visible {
      outline: var(--st-focus-ring);
      outline-offset: 2px;
    }

    .footnote {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--st-space-8);
      margin-top: var(--st-space-48);
      text-align: center;
      color: var(--st-cms-text, var(--st-cms-navy-2));
    }

    .footnote-text {
      margin: 0;
      font-size: 15px;
      line-height: 1.6;
    }

    .footnote st-markdown {
      text-align: center;
      font-size: 15px;
      color: var(--st-cms-text, var(--st-cms-navy-2));
    }

    /* Inline with the sentence: the text size, line height and baseline come from the paragraph. The
       44px tap target comes from padding, cancelled by a negative margin, so the line does not grow. */
    .link-action {
      display: inline-block;
      vertical-align: baseline;
      padding: 12px 2px;
      margin: -12px -2px;
      border: 0;
      background: transparent;
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
      font: inherit;
      font-size: inherit;
      line-height: inherit;
      font-weight: var(--st-font-weight-semibold);
      text-decoration: underline;
      text-underline-offset: 4px;
      cursor: pointer;
    }

    @media (max-width: 600px) {
      :host {
        padding: var(--st-plan-cards-padding, 48px 24px) !important;
      }

      .card {
        padding: var(--st-space-24);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .card,
      .action {
        transition: none;
      }
    }
  `;

  /** Small uppercase label above the title. */
  @property({ type: String })
  eyebrow = '';

  @property({ type: String })
  title = '';

  /** The line under the title. */
  @property({ type: String })
  subtitle = '';

  /** The cards, in order. */
  @property({ attribute: false })
  items: PlanCardItem[] = [];

  /** Markdown under the cards, centred. Put `{action}` where the footnote's text button goes. */
  @property({ type: String })
  footnote = '';

  /** Label of a text button after the footnote. Opens the quote dialog with the option `unsure`. */
  @property({ type: String, attribute: 'footnote-action-label' })
  footnoteActionLabel = '';

  /** `id` of a `st-quote-dialog`. Set, the card buttons open that dialog instead of linking. */
  @property({ type: String, attribute: 'quote-dialog' })
  quoteDialog = '';

  /** Fires the window `st-quote-open` event for the dialog. The page does not navigate. */
  private openQuote(event: Event, option: string): void {
    if (!this.quoteDialog) return;
    const detail: QuoteOpenEventDetail = {
      dialog: this.quoteDialog,
      option,
      trigger: event.currentTarget as HTMLElement
    };
    window.dispatchEvent(new CustomEvent<QuoteOpenEventDetail>(QUOTE_OPEN_EVENT, { detail }));
  }

  private renderFootnoteAction() {
    return html`<button class="link-action" part="footnote-action" type="button" @click=${(event: Event) => this.openQuote(event, 'unsure')}>
      ${this.footnoteActionLabel}
    </button>`;
  }

  private renderAction(item: PlanCardItem) {
    const className = `action${item.featured ? ' featured' : ''}`;
    if (this.quoteDialog) {
      return html`<button class=${className} part="action" type="button" @click=${(event: Event) => this.openQuote(event, item.id)}>
        ${item.actionLabel}
      </button>`;
    }
    return html`<a class=${className} part="action" href=${item.href || '#'}>${item.actionLabel}</a>`;
  }

  private renderCard(item: PlanCardItem) {
    const tone = item.badgeTone ?? 'primary';
    return html`<article class="card ${item.featured ? 'featured' : ''}" part="card">
      ${item.icon ? html`<div class="icon" part="icon" aria-hidden="true"><iconify-icon icon=${item.icon}></iconify-icon></div>` : nothing}
      <div class="title-row">
        <h3 class="card-title">${item.title}</h3>
        ${item.badge ? html`<span class="badge ${tone}" part="badge">${item.badge}</span>` : nothing}
      </div>
      ${item.description ? html`<p class="description">${item.description}</p>` : nothing}
      ${item.bullets?.length
        ? html`<ul class="bullets">
            ${item.bullets.map(bullet => html`<li>${CHECK_ICON}<span>${bullet}</span></li>`)}
          </ul>`
        : nothing}
      ${this.renderAction(item)}
    </article>`;
  }

  /** `{action}` in the footnote becomes the inline text button; otherwise Markdown, then the button. */
  private renderFootnote() {
    const hasAction = !!this.footnoteActionLabel && !!this.quoteDialog;
    if (this.footnote.includes(FOOTNOTE_ACTION_TOKEN)) {
      const [before, ...after] = this.footnote.split(FOOTNOTE_ACTION_TOKEN);
      return html`<p class="footnote-text">${before}${hasAction ? this.renderFootnoteAction() : nothing}${after.join(FOOTNOTE_ACTION_TOKEN)}</p>`;
    }
    return html`${this.footnote ? html`<st-markdown .content=${this.footnote}></st-markdown>` : nothing}
      ${hasAction ? this.renderFootnoteAction() : nothing}`;
  }

  render() {
    return html`
      <div class="container" part="container">
        ${this.eyebrow || this.title || this.subtitle
          ? html`<div class="header" part="header">
              ${this.eyebrow ? html`<p class="eyebrow">${this.eyebrow}</p>` : nothing}
              ${this.title ? html`<h2 class="title">${this.title}</h2>` : nothing}
              ${this.subtitle ? html`<p class="lead">${this.subtitle}</p>` : nothing}
            </div>`
          : nothing}
        <div class="grid" part="grid">${this.items.map(item => this.renderCard(item))}</div>
        ${this.footnote || (this.footnoteActionLabel && this.quoteDialog)
          ? html`<div class="footnote" part="footnote">${this.renderFootnote()}</div>`
          : nothing}
      </div>
    `;
  }
}
