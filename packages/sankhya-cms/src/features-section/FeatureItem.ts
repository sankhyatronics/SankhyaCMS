import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'iconify-icon';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { cardDescriptionStyles, cardTitleStyles } from '../shared/section-styles';
import '../card';
import '../markdown';

/**
 * One feature tile for `st-features-section`: optional icon, title (`<h3>`), Markdown description
 * and an optional "Learn more" link, rendered on an `st-card`. `icon` is an Iconify name (e.g.
 * `mdi:rocket`). The link is a plain `<a href>`, so it works without JavaScript; the click is
 * composed, so an SPA router can intercept it (e.g. via `event.composedPath()`) and navigate
 * client-side. `http(s)` links open in a new tab.
 *
 * @csspart card - The `st-card` around the tile.
 * @csspart icon - The icon tile.
 * @csspart title - The tile heading (`<h3>`).
 * `variant="panel"` drops the icon tile for a compact card (20px padding, 12px radius, 16px title).
 * Inverted panels sit on the lighter navy panel colour (`--st-cms-navy-2`) with a hairline border.
 *
 * @csspart card - The `st-card` around the tile (the panel `div` with `variant="panel"`).
 * @csspart description - The Markdown description.
 * @csspart link - The "Learn more" link.
 * @cssprop --st-feature-item-panel-bg - Panel background (default `--st-color-surface`).
 * @cssprop --st-feature-item-panel-border - Panel border colour (default `--st-color-border`).
 * @cssprop --st-feature-item-panel-radius - Panel corner radius (default 12px).
 * @cssprop --st-feature-item-panel-padding - Panel padding (default 20px).
 * @cssprop --st-feature-item-panel-gap - Gap between panel title and description (default `--st-space-8`).
 * @cssprop --st-feature-item-panel-title-size - Panel title size (default 16px).
 * @cssprop --st-feature-item-panel-title-weight - Panel title weight (default bold).
 * @cssprop --st-feature-item-panel-title-color - Panel title colour (default `--st-color-text-strong`).
 * @cssprop --st-feature-item-panel-desc-color - Panel description colour (default `--st-color-text-muted`).
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

    /* Inverted tiles sit on the dark band: explicit light text, 17:1 on the default navy, instead of
       whatever the card's colour happens to be. */
    :host([inverted]) .title,
    :host([inverted]) .description {
      color: var(--st-color-on-solid);
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

    /* variant="panel": a compact card without the icon tile. */
    .panel {
      box-sizing: border-box;
      height: 100%;
      padding: var(--st-feature-item-panel-padding, 20px);
      border: 1px solid var(--st-feature-item-panel-border, var(--st-color-border));
      border-radius: var(--st-feature-item-panel-radius, 12px);
      background: var(--st-feature-item-panel-bg, var(--st-color-surface));
    }

    :host([variant='panel']) .panel .content {
      gap: var(--st-feature-item-panel-gap, var(--st-space-8));
    }

    :host([variant='panel']) .title {
      font-size: var(--st-feature-item-panel-title-size, 16px);
      font-weight: var(--st-feature-item-panel-title-weight, var(--st-font-weight-bold));
      line-height: 1.35;
      color: var(--st-feature-item-panel-title-color, var(--st-color-text-strong));
    }

    :host([variant='panel']) .description {
      font-size: 14px;
      color: var(--st-feature-item-panel-desc-color, var(--st-color-text-muted));
    }

    /* Panels on the dark band: a lighter navy surface, a hairline border, light text (AA on navy-2). */
    :host([variant='panel'][inverted]) .panel {
      background: var(--st-cms-navy-2);
      border-color: var(--st-cms-navy-2-border);
    }

    :host([variant='panel'][inverted]) .title {
      color: var(--st-cms-on-dark);
    }

    :host([variant='panel'][inverted]) .description {
      color: var(--st-cms-on-navy-muted);
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

  /** `default` is the icon card; `panel` is the compact card without an icon tile. */
  @property({ type: String, reflect: true })
  variant: 'default' | 'panel' = 'default';

  private renderBody() {
    const external = this.href.startsWith('http');
    const panel = this.variant === 'panel';
    return html`
      <div class="content" part="content">
        ${this.icon && !panel
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
    `;
  }

  render() {
    if (this.variant === 'panel') {
      return html`<div class="panel" part="card">${this.renderBody()}</div>`;
    }
    return html`<st-card hoverable elevation="sm" ?inverted=${this.inverted} part="card">${this.renderBody()}</st-card>`;
  }
}
