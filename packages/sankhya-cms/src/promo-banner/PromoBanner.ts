import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { buttonResetStyles, controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';
import { ctaLinkStyles, sectionSubtitleStyles, sectionTitleStyles } from '../shared/section-styles';
import type { HeroActionEventDetail } from '../hero/HeroEvents';

/**
 * Rounded call-to-action banner (title, subtitle, one or two outlined buttons) on a dark panel or a
 * background image. The buttons fire an `action` event
 * (detail `{ href }`, empty unless set; the secondary button adds `kind: 'secondary'`).
 * `onAction`. `variant="accent"` fills the banner with the brand colour.
 *
 * @fires action - Detail `{ href, kind? }`. `kind` is `secondary` for the second button only.
 * @cssprop --st-promo-banner-margin - Overrides the banner's margin.
 * @cssprop --st-promo-banner-padding - Overrides the banner's padding.
 * @csspart action - The primary button.
 * @csspart secondary-action - The second button.
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
      /* !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         margin/padding; override with --st-promo-banner-margin/-padding instead. */
      margin: var(--st-promo-banner-margin, var(--st-space-40) auto) !important;
      padding: var(--st-promo-banner-padding, 100px var(--st-space-24)) !important;
      border-radius: var(--st-space-24);
      background-color: var(--st-color-text-strong);
      background-size: cover;
      background-position: center;
      color: var(--st-color-on-solid);
      text-align: center;
      ${rootFontFamilyStyles}
    }

    :host([variant='accent']) {
      background-color: var(--st-color-accent);
      color: var(--st-cms-on-dark);
    }

    :host([variant='accent']) .cta:not(.secondary) {
      background: var(--st-cms-on-dark);
      border-color: transparent;
      color: var(--st-cms-navy);
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
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--st-space-12);
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

    .cta:focus-visible {
      outline: var(--st-focus-ring);
      outline-offset: 2px;
    }

    @media (max-width: 768px) {
      :host {
        width: auto;
        margin: var(--st-promo-banner-margin, var(--st-space-24)) !important;
        padding: var(--st-promo-banner-padding, 60px var(--st-space-24)) !important;
        border-radius: var(--st-radius-lg);
      }
      .actions {
        flex-direction: column;
        align-items: stretch;
      }
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

  /** Label of a second, outlined button next to the first. */
  @property({ type: String, attribute: 'secondary-action-label' })
  secondaryActionLabel = '';

  /** Target of the second button, sent in the `action` event detail. */
  @property({ type: String, attribute: 'secondary-href' })
  secondaryHref = '';

  /** `default` is the dark panel; `accent` fills the banner with the brand colour and makes the first button white. */
  @property({ type: String, reflect: true })
  variant: 'default' | 'accent' = 'default';

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

  private onSecondaryAction = (): void => {
    this.dispatchEvent(
      new CustomEvent<HeroActionEventDetail>('action', {
        detail: { href: this.secondaryHref, kind: 'secondary' },
        bubbles: true,
        composed: true
      })
    );
  };

  render() {
    return html`
      <div class="container" part="container">
        <h2 class="title" part="title">${this.title}</h2>
        ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
        <slot></slot>
        ${this.actionLabel || this.secondaryActionLabel
          ? html`<div class="actions" part="actions">
              ${this.actionLabel
                ? html`<button class="cta" part="action" type="button" @click=${this.onAction}>${this.actionLabel}</button>`
                : nothing}
              ${this.secondaryActionLabel
                ? html`<button class="cta secondary" part="secondary-action" type="button" @click=${this.onSecondaryAction}>${this.secondaryActionLabel}</button>`
                : nothing}
            </div>`
          : nothing}
      </div>
    `;
  }
}
