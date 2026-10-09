import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'iconify-icon';

import { cardShellStyles, controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';
import { sectionSubtitleStyles, sectionTitleStyles, invertedSectionTextStyles, sectionHeaderStyles } from '../shared/section-styles';

export interface TestimonialItem {
  id?: string;
  name: string;
  role: string;
  company?: string;
  imageSrc?: string;
  quote: string;
  /** Number of stars, default 5. */
  rating?: number;
}

/** Section heading plus a grid of quote cards with star rating and author. Port of React `Testimonials`. */
@customElement('st-testimonials')
export class Testimonials extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      box-sizing: border-box;
      padding: var(--st-space-48) var(--st-space-24);
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
      gap: var(--st-space-24);
      margin: 0;
      padding: var(--st-space-24);
      box-shadow: 0 1px 3px var(--st-shadow-color-sm);
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

    @media (max-width: 768px) {
      :host {
        padding: var(--st-space-40) var(--st-space-20);
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

  @property({ attribute: false })
  items: TestimonialItem[] = [];

  @property({ type: Boolean, reflect: true })
  inverted = false;

  private renderItem(item: TestimonialItem) {
    const rating = item.rating || 5;
    return html`
      <figure class="card" part="card">
        <div class="stars" part="stars" role="img" aria-label="${rating} / 5">
          ${Array.from({ length: rating }, () => html`<iconify-icon icon="mdi:star"></iconify-icon>`)}
        </div>
        <blockquote class="quote" part="quote">"${item.quote}"</blockquote>
        <figcaption class="author" part="author">
          ${item.imageSrc
            ? html`<img class="avatar" part="avatar" src=${item.imageSrc} alt=${item.name} />`
            : html`<div class="avatar avatar-placeholder" part="avatar">${item.name.charAt(0)}</div>`}
          <span class="author-info">
            <span class="name" part="name">${item.name}</span>
            <span class="role" part="role">${item.role}${item.company ? ` at ${item.company}` : ''}</span>
          </span>
        </figcaption>
      </figure>
    `;
  }

  render() {
    return html`
      <div class="container" part="container">
        <div class="header" part="header">
          <h2 class="title" part="title">${this.title}</h2>
          ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
        </div>
        <div class="grid" part="grid">${this.items.map((item) => this.renderItem(item))}</div>
      </div>
    `;
  }
}
