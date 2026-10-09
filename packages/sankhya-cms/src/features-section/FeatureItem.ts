import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'iconify-icon';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { cardDescriptionStyles, cardTitleStyles } from '../shared/section-styles';
import '../card';
import '../markdown';

/**
 * One feature tile for `st-features-section`: optional icon, title, Markdown description and an
 * optional "Learn more" link, rendered on an `st-card`. `icon` is an Iconify name (e.g.
 * `mdi:rocket`). The link is a plain `<a>` (the source used react-router's `Link` for non-http
 * hrefs; there is no Lit equivalent). The click is composed, so an SPA router can intercept it
 * (e.g. via `event.composedPath()`) and navigate client-side; `http(s)` links open in a new tab.
 */
@customElement('st-feature-item')
export class FeatureItem extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      ${fontFamilyStyles}
    }

    st-card {
      height: 100%;
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--st-space-16);
      height: 100%;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--st-radius-lg);
      background: var(--st-color-subtle);
      color: var(--st-color-text-strong);
      margin-bottom: var(--st-space-8);
      font-size: 24px;
    }

    :host([inverted]) .icon {
      background: var(--st-color-text-muted);
      color: var(--st-color-on-solid);
    }

    .title {
      ${cardTitleStyles}
      margin: 0;
    }

    .description {
      ${cardDescriptionStyles}
      margin: 0;
    }

    :host([inverted]) .title,
    :host([inverted]) .description {
      color: inherit;
    }

    .link {
      display: flex;
      align-items: center;
      gap: var(--st-space-4);
      margin-top: auto;
      color: var(--st-color-text-muted);
      font-weight: var(--st-font-weight-medium);
      font-size: var(--st-text-md);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .link:hover {
      color: var(--st-color-text-strong);
      text-decoration: underline;
    }

    :host([inverted]) .link,
    :host([inverted]) .link:hover {
      color: inherit;
    }

    @media (prefers-reduced-motion: reduce) {
      .link {
        transition: none;
      }
    }
  `;

  /** Iconify icon name, e.g. `mdi:rocket`. */
  @property({ type: String })
  icon = '';

  @property({ type: String })
  title = '';

  /** Markdown. */
  @property({ type: String })
  description = '';

  @property({ type: String })
  href = '';

  @property({ type: String, attribute: 'action-label' })
  actionLabel = 'Learn more';

  @property({ type: Boolean, reflect: true })
  inverted = false;

  render() {
    const external = this.href.startsWith('http');
    return html`
      <st-card hoverable elevation="sm" ?inverted=${this.inverted} part="card">
        <div class="content" part="content">
          ${this.icon
            ? html`<div class="icon" part="icon"><iconify-icon icon=${this.icon}></iconify-icon></div>`
            : nothing}
          <h3 class="title" part="title">${this.title}</h3>
          <st-markdown class="description" part="description" .content=${this.description}></st-markdown>
          ${this.href
            ? html`
                <a
                  class="link"
                  part="link"
                  href=${this.href}
                  target=${external ? '_blank' : '_self'}
                  rel=${external ? 'noopener noreferrer' : nothing}
                >
                  ${this.actionLabel} <span>&rarr;</span>
                </a>
              `
            : nothing}
        </div>
      </st-card>
    `;
  }
}
