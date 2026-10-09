import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { buttonResetStyles, controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';
import { ctaLinkStyles, sectionSubtitleStyles, sectionTitleStyles } from '../shared/section-styles';
import type { HeroActionEventDetail } from '../hero/HeroEvents';

/**
 * Rounded call-to-action banner (title, subtitle, one outlined button) on a dark panel or a
 * background image. Port of `SankhyaUI`'s React `PromoBanner`; the button fires an `action` event
 * (detail `{ href }`, empty unless set) in place of `onAction`.
 */
@customElement('st-promo-banner')
export class PromoBanner extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      box-sizing: border-box;
      width: calc(100% - 48px);
      max-width: var(--st-cms-container-max);
      margin: var(--st-space-40) auto;
      padding: 100px var(--st-space-24);
      border-radius: var(--st-space-24);
      background-color: var(--st-color-text-strong);
      background-size: cover;
      background-position: center;
      color: var(--st-color-on-solid);
      text-align: center;
      ${rootFontFamilyStyles}
    }

    :host([inverted]) {
      background-color: var(--st-color-subtle);
      color: var(--st-color-text-strong);
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--st-space-32);
    }

    .title {
      ${sectionTitleStyles}
      color: inherit;
      margin: 0;
      letter-spacing: -0.02em;
    }

    .subtitle {
      ${sectionSubtitleStyles}
      color: inherit;
      opacity: 0.8;
      margin: 0;
    }

    .actions {
      margin-top: var(--st-space-16);
    }

    .cta {
      ${buttonResetStyles}
      ${ctaLinkStyles}
      border: 1px solid currentColor;
      color: inherit;
    }

    .cta:hover {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      :host {
        width: auto;
        margin: var(--st-space-24);
        padding: 60px var(--st-space-24);
        border-radius: var(--st-radius-lg);
      }
      .actions,
      .cta {
        width: 100%;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .cta {
        transition: none;
      }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String, attribute: 'action-label' })
  actionLabel = '';

  @property({ type: String })
  href = '';

  @property({ type: String, attribute: 'image-src' })
  imageSrc = '';

  @property({ type: Boolean, reflect: true })
  inverted = false;

  protected willUpdate(): void {
    this.style.backgroundImage = this.imageSrc ? `url(${JSON.stringify(this.imageSrc)})` : '';
  }

  private onAction = (): void => {
    this.dispatchEvent(
      new CustomEvent<HeroActionEventDetail>('action', { detail: { href: this.href }, bubbles: true, composed: true })
    );
  };

  render() {
    return html`
      <div class="container" part="container">
        <h2 class="title" part="title">${this.title}</h2>
        ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
        <slot></slot>
        ${this.actionLabel
          ? html`<div class="actions" part="actions">
              <button class="cta" part="action" type="button" @click=${this.onAction}>${this.actionLabel}</button>
            </div>`
          : nothing}
      </div>
    `;
  }
}
