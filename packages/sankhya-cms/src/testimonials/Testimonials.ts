import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import 'iconify-icon';

import { chevronIcon } from '../shared/icons';
import { buttonResetStyles, cardShellStyles, controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';
import { sectionSubtitleStyles, sectionTitleStyles, invertedSectionTextStyles, sectionHeaderStyles, reducedMotionStyles } from '../shared/section-styles';
import type { TestimonialsLinkEventDetail } from './TestimonialsEvents';

export interface TestimonialMetric {
  /** The figure, e.g. `100M` or `85%`. */
  value: string;
  label: string;
}

export interface TestimonialItem {
  id?: string;
  name?: string;
  role?: string;
  company?: string;
  /** Author photo. */
  imageSrc?: string;
  quote?: string;
  /** Number of stars. Default: 5 for a plain quote card; no stars on a story card (one with a `headline` or `logoSrc`). `0` hides them. */
  rating?: number;
  /** Customer logo, shown at the top of the card body. */
  logoSrc?: string;
  /** Wide image across the top of the card. */
  mediaSrc?: string;
  /** Story headline, e.g. "Acme gives 100 million users a seamless sign-in". */
  headline?: string;
  /** Key results, shown as large figures. */
  metrics?: TestimonialMetric[];
  /** Link to the full story. */
  href?: string;
  /** Text of the story link; defaults to the section's `link-label`. */
  linkLabel?: string;
}

/**
 * Section heading plus customer quotes or stories. Port of React `Testimonials`.
 *
 * Each card shows whatever its item has: a cover image, the customer logo, a story headline, a
 * quote with star rating, result metrics, the author and a "See full story" link. `layout="grid"`
 * (default) lays the cards out in a grid; `layout="carousel"` puts them on one horizontally
 * scrolling, snapping row with previous/next buttons next to the heading — the customer-story
 * carousel of enterprise marketing pages. `action-label`/`action-href` add a section-level link
 * (e.g. "Explore customer stories").
 *
 * @fires testimonials-link - Cancelable, before following a story or section link. Detail `{ href }`.
 * @cssprop --st-testimonials-padding - Overrides the section's padding.
 */
@customElement('st-testimonials')
export class Testimonials extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      box-sizing: border-box;
      /* !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         padding; override with --st-testimonials-padding instead. */
      padding: var(--st-testimonials-padding, var(--st-space-48) var(--st-space-24)) !important;
      background-color: var(--st-color-subtle);
      ${rootFontFamilyStyles}
    }

    :host([inverted]) {
      background-color: var(--st-color-text-strong);
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
      margin-bottom: var(--st-space-16);
      letter-spacing: -0.02em;
    }

    .subtitle {
      ${sectionSubtitleStyles}
      margin: 0 auto;
    }

    ${invertedSectionTextStyles}

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--st-space-32);
    }

    .card {
      ${cardShellStyles}
      display: flex;
      flex-direction: column;
      margin: 0;
      overflow: hidden;
      box-shadow: 0 1px 3px var(--st-shadow-color-sm);
    }

    .media {
      aspect-ratio: 16 / 9;
      background: var(--st-color-divider);
    }

    .media img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .card:hover .media img {
      transform: scale(1.03);
    }

    .body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--st-space-24);
      padding: var(--st-space-24);
    }

    .logo {
      display: block;
      height: 32px;
      width: auto;
      max-width: 60%;
      object-fit: contain;
      object-position: left center;
    }

    .headline {
      margin: 0;
      font-size: var(--st-text-xl);
      font-weight: var(--st-font-weight-semibold);
      line-height: 1.35;
      color: var(--st-color-text-strong);
    }

    .stars {
      display: flex;
      gap: var(--st-space-4);
      color: var(--st-favorite-accent);
      font-size: var(--st-size-20);
    }

    .quote {
      font-size: var(--st-text-md);
      line-height: 1.6;
      color: var(--st-color-text);
      font-style: italic;
      margin: 0;
    }

    .metrics {
      display: flex;
      flex-wrap: wrap;
      gap: var(--st-space-16) var(--st-space-32);
      margin: 0;
      padding-top: var(--st-space-16);
      border-top: 1px solid var(--st-color-border);
    }

    .metric {
      display: flex;
      flex-direction: column-reverse;
      min-width: 6rem;
    }

    .metric dt {
      font-size: var(--st-text-sm);
      color: var(--st-color-text-muted);
      line-height: 1.4;
    }

    .metric dd {
      margin: 0;
      font-size: var(--st-cms-text-4xl);
      font-weight: var(--st-font-weight-bold);
      letter-spacing: -0.02em;
      line-height: 1.1;
      color: var(--st-color-text-strong);
    }

    .author {
      display: flex;
      align-items: center;
      gap: var(--st-space-12);
      margin-top: auto;
    }

    .avatar {
      width: var(--st-space-48);
      height: var(--st-space-48);
      border-radius: var(--st-radius-circle);
      object-fit: cover;
      background-color: var(--st-color-divider);
      flex-shrink: 0;
    }

    .avatar-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--st-color-text-muted);
      font-weight: var(--st-font-weight-semibold);
      font-size: var(--st-text-xl);
    }

    .author-info {
      display: flex;
      flex-direction: column;
    }

    .name {
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
      font-size: var(--st-text-xl);
    }

    .role {
      font-size: var(--st-text-sm);
      color: var(--st-color-text-faint);
    }

    .link {
      display: inline-flex;
      align-items: center;
      gap: var(--st-space-8);
      margin-top: auto;
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
      text-decoration: none;
    }

    .author + .link {
      margin-top: 0;
    }

    .link:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .link svg {
      transition: transform 0.2s ease;
    }

    .link:hover svg {
      transform: translateX(3px);
    }

    /* ---- layout="carousel" ---- */

    :host([layout='carousel']) .header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--st-space-24);
      text-align: left;
      margin-bottom: var(--st-space-32);
    }

    :host([layout='carousel']) .subtitle {
      margin: 0;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: var(--st-space-12);
      flex: none;
    }

    .section-link {
      margin-right: var(--st-space-12);
    }

    :host([inverted]) .section-link {
      color: var(--st-color-on-solid);
    }

    .arrow {
      ${buttonResetStyles}
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--st-size-40);
      height: var(--st-size-40);
      border-radius: var(--st-radius-circle);
      border: 1px solid var(--st-color-border-strong);
      color: var(--st-color-text-strong);
      background: var(--st-color-surface);
      transition:
        background 0.2s ease,
        opacity 0.2s ease;
    }

    .arrow:hover:not(:disabled) {
      background: var(--st-color-hover);
    }

    .arrow:disabled {
      opacity: 0.4;
      cursor: default;
    }

    .track {
      display: flex;
      gap: var(--st-space-24);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      scrollbar-width: none;
      /* Room for the cards' shadow and focus rings. */
      padding: var(--st-space-4) var(--st-space-4) var(--st-space-12);
      margin: calc(-1 * var(--st-space-4));
    }

    .track::-webkit-scrollbar {
      display: none;
    }

    .track > .card {
      flex: 0 0 min(380px, 85%);
      scroll-snap-align: start;
    }

    /* The section link sits under the grid; in the carousel it is next to the arrows instead, and
       only drops below the row on a narrow screen. */
    .section-footer {
      margin-top: var(--st-space-32);
      text-align: center;
    }

    :host([inverted]) .section-footer .link {
      color: var(--st-color-on-solid);
    }

    :host([layout='carousel']) .section-footer {
      margin-top: 0;
      text-align: left;
    }

    .footer-link {
      display: none;
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--st-testimonials-padding, var(--st-space-40) var(--st-space-20)) !important;
      }
      .grid {
        grid-template-columns: 1fr;
      }
      :host([layout='carousel']) .header {
        flex-direction: column;
        align-items: flex-start;
      }
      .section-link {
        display: none;
      }
      .footer-link {
        display: inline-flex;
        margin-top: var(--st-space-24);
      }
    }

    ${reducedMotionStyles}
    @media (prefers-reduced-motion: reduce) {
      .track {
        scroll-behavior: auto;
      }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ attribute: false })
  items: TestimonialItem[] = [];

  @property({ type: Boolean, reflect: true })
  inverted = false;

  /** `grid` (default) or `carousel`: one scrolling row with previous/next buttons. */
  @property({ type: String, reflect: true })
  layout: 'grid' | 'carousel' = 'grid';

  /** Default text of each card's story link. */
  @property({ type: String, attribute: 'link-label' })
  linkLabel = 'See full story';

  /** Section-level link text, e.g. "Explore customer stories". */
  @property({ type: String, attribute: 'action-label' })
  actionLabel = '';

  @property({ type: String, attribute: 'action-href' })
  actionHref = '';

  @state() private atStart = true;
  @state() private atEnd = false;

  private get track(): HTMLElement | null {
    return this.renderRoot.querySelector('.track');
  }

  private resizeObserver?: ResizeObserver;

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has('layout') || changed.has('items')) {
      this.resizeObserver?.disconnect();
      const track = this.track;
      if (track) {
        this.resizeObserver = new ResizeObserver(this.syncArrows);
        this.resizeObserver.observe(track);
      }
      this.syncArrows();
    }
  }

  disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  private syncArrows = (): void => {
    const track = this.track;
    if (!track) return;
    this.atStart = track.scrollLeft <= 1;
    this.atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  };

  private scrollByCard(direction: 1 | -1): void {
    const track = this.track;
    const card = track?.querySelector<HTMLElement>('.card');
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap) });
  }

  private onLinkClick(event: MouseEvent, href: string): void {
    const link = new CustomEvent<TestimonialsLinkEventDetail>('testimonials-link', {
      detail: { href },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(link);
    if (link.defaultPrevented) event.preventDefault();
  }

  private renderLink(label: string, href: string, className: string, part: string) {
    return html`<a class="link ${className}" part=${part} href=${href} @click=${(event: MouseEvent) => this.onLinkClick(event, href)}>
      ${label} ${chevronIcon('right', 14)}
    </a>`;
  }

  private renderItem(item: TestimonialItem) {
    const story = !!(item.headline || item.logoSrc);
    const rating = item.rating ?? (item.quote && !story ? 5 : 0);
    const metrics = item.metrics ?? [];
    return html`
      <article class="card" part="card">
        ${item.mediaSrc ? html`<div class="media" part="media"><img src=${item.mediaSrc} alt="" loading="lazy" /></div>` : nothing}
        <div class="body" part="body">
          ${item.logoSrc ? html`<img class="logo" part="logo" src=${item.logoSrc} alt=${item.company || item.name || ''} />` : nothing}
          ${item.headline ? html`<h3 class="headline" part="headline">${item.headline}</h3>` : nothing}
          ${rating > 0
            ? html`<div class="stars" part="stars" role="img" aria-label="${rating} / 5">
                ${Array.from({ length: rating }, () => html`<iconify-icon icon="mdi:star"></iconify-icon>`)}
              </div>`
            : nothing}
          ${item.quote ? html`<blockquote class="quote" part="quote">"${item.quote}"</blockquote>` : nothing}
          ${metrics.length
            ? html`<dl class="metrics" part="metrics">
                ${metrics.map(metric => html`<div class="metric"><dt>${metric.label}</dt><dd>${metric.value}</dd></div>`)}
              </dl>`
            : nothing}
          ${item.name
            ? html`<div class="author" part="author">
                ${item.imageSrc
                  ? html`<img class="avatar" part="avatar" src=${item.imageSrc} alt=${item.name} />`
                  : html`<div class="avatar avatar-placeholder" part="avatar">${item.name.charAt(0)}</div>`}
                <span class="author-info">
                  <span class="name" part="name">${item.name}</span>
                  ${item.role || item.company
                    ? html`<span class="role" part="role">${[item.role, item.company].filter(Boolean).join(' at ')}</span>`
                    : nothing}
                </span>
              </div>`
            : nothing}
          ${item.href ? this.renderLink(item.linkLabel || this.linkLabel, item.href, '', 'link') : nothing}
        </div>
      </article>
    `;
  }

  render() {
    const carousel = this.layout === 'carousel';
    const sectionLink = this.actionLabel && this.actionHref;
    return html`
      <div class="container" part="container">
        <div class="header" part="header">
          <div>
            <h2 class="title" part="title">${this.title}</h2>
            ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
          </div>
          ${carousel
            ? html`<div class="controls" part="controls">
                ${sectionLink ? this.renderLink(this.actionLabel, this.actionHref, 'section-link', 'action') : nothing}
                <button class="arrow" part="arrow prev" type="button" aria-label="Previous" ?disabled=${this.atStart} @click=${() => this.scrollByCard(-1)}>
                  ${chevronIcon('left', 16)}
                </button>
                <button class="arrow" part="arrow next" type="button" aria-label="Next" ?disabled=${this.atEnd} @click=${() => this.scrollByCard(1)}>
                  ${chevronIcon('right', 16)}
                </button>
              </div>`
            : nothing}
        </div>
        ${carousel
          ? html`<div class="track" part="track" role="region" aria-label=${this.title || 'Stories'} tabindex="0" @scroll=${this.syncArrows}>
              ${this.items.map(item => this.renderItem(item))}
            </div>`
          : html`<div class="grid" part="grid">${this.items.map(item => this.renderItem(item))}</div>`}
        ${sectionLink
          ? html`<div class="section-footer">${this.renderLink(this.actionLabel, this.actionHref, carousel ? 'footer-link' : '', 'action')}</div>`
          : nothing}
      </div>
    `;
  }
}
