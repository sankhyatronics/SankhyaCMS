import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';
import { ctaLinkStyles, paddingScaleStyles } from '../shared/section-styles';
import type { HeroActionEventDetail } from './HeroEvents';

/**
 * Full-width hero banner: background image with a darkening overlay, title, optional subtitle and
 * a call-to-action link. Port of `SankhyaUI`'s React `Hero`; the framer-motion entrance is redone
 * as CSS keyframes (skipped under `prefers-reduced-motion`). The CTA fires a cancelable `action`
 * event (detail `{ href }`) before navigating.
 */
@customElement('st-hero')
export class Hero extends LitElement {
  static styles = css`
    ${controlBaseStyles}
    ${paddingScaleStyles}

    @keyframes st-hero-zoom {
      from { opacity: 0; transform: scale(1.1); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes st-hero-rise {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: none; }
    }
    @keyframes st-hero-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      width: 100%;
      box-sizing: border-box;
      background-color: var(--st-color-text-strong);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: var(--st-hero-position, center center);
      color: var(--st-color-on-solid);
      ${rootFontFamilyStyles}
      animation: st-hero-zoom 1.5s ease-out;
    }

    :host([inverted]) {
      background-color: var(--st-color-surface);
      color: var(--st-color-text-strong);
    }

    .overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(
        to bottom,
        color-mix(in oklch, var(--st-color-text-strong) 40%, transparent),
        color-mix(in oklch, var(--st-color-text-strong) 20%, transparent),
        color-mix(in oklch, var(--st-color-text-strong) 40%, transparent)
      );
    }

    :host([inverted]) .overlay {
      display: none;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-20);
      position: relative;
      z-index: 2;
      width: 80%;
      margin: 0 auto;
      text-align: center;
      align-items: center;
      /* Set here, not only on :host: text sits on the image/overlay, so a colour class the page puts
         on the host (e.g. a theme text colour) must not turn it dark. */
      color: var(--st-hero-text-color, var(--st-color-on-solid));
    }

    :host([inverted]) .content {
      color: var(--st-hero-text-color, var(--st-color-text-strong));
    }

    :host([text-alignment='left']) .content { text-align: left; align-items: flex-start; }
    :host([text-alignment='right']) .content { text-align: right; align-items: flex-end; }
    :host([text-alignment='justify']) .content { text-align: justify; align-items: stretch; }

    .title {
      font-size: var(--st-cms-text-display);
      font-weight: var(--st-font-weight-bold);
      line-height: 1.1;
      color: inherit;
      margin: 0;
      animation: st-hero-rise 0.8s 0.3s ease-out backwards;
    }

    .subtitle {
      font-size: var(--st-cms-text-xl);
      line-height: 1.5;
      color: inherit;
      margin: 0;
      animation: st-hero-fade 0.8s 0.5s ease-out backwards;
    }

    .actions {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .cta {
      ${ctaLinkStyles}
      background: var(--st-button-primary-bg);
      color: var(--st-button-primary-color);
      font-weight: var(--st-button-font-weight);
      font-size: var(--st-text-md);
      animation: st-hero-rise 0.6s 0.7s ease-out backwards;
    }

    .cta:hover {
      transform: scale(1.05);
    }

    .cta:active {
      transform: scale(0.98);
    }

    @media (min-width: 768px) {
      .content { padding: var(--st-space-32); }
    }
    @media (min-width: 1024px) {
      .content { padding: var(--st-space-48); }
    }

    @media (prefers-reduced-motion: reduce) {
      :host, .title, .subtitle, .cta { animation: none; }
      .cta { transition: none; }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String, attribute: 'image-src' })
  imageSrc = '';

  @property({ type: String, attribute: 'action-label' })
  actionLabel = '';

  @property({ type: String })
  href = '';

  @property({ type: String, reflect: true, attribute: 'text-alignment' })
  textAlignment: 'left' | 'center' | 'right' | 'justify' = 'left';

  @property({ type: String, reflect: true })
  padding: 'none' | 'small' | 'medium' | 'large' = 'none';

  @property({ type: Boolean, reflect: true })
  inverted = false;

  @property({ type: String, attribute: 'focal-point' })
  focalPoint: 'top' | 'left' | 'right' | 'bottom' | 'center' = 'center';

  private static positions = {
    top: 'center top',
    left: 'left center',
    right: 'right center',
    bottom: 'center bottom',
    center: 'center center'
  } as const;

  protected willUpdate(): void {
    this.style.backgroundImage = this.imageSrc ? `url(${JSON.stringify(this.imageSrc)})` : '';
    this.style.setProperty('--st-hero-position', Hero.positions[this.focalPoint] ?? Hero.positions.center);
  }

  private onClick = (event: MouseEvent): void => {
    const action = new CustomEvent<HeroActionEventDetail>('action', {
      detail: { href: this.href },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(action);
    if (action.defaultPrevented) event.preventDefault();
  };

  render() {
    return html`
      <div class="overlay" part="overlay"></div>
      <div class="content" part="content">
        <h1 class="title" part="title">${this.title}</h1>
        ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
        ${this.actionLabel
          ? html`<div class="actions" part="actions">
              <a class="cta" part="action" href=${this.href || nothing} @click=${this.onClick}>${this.actionLabel}</a>
            </div>`
          : nothing}
        <slot></slot>
      </div>
    `;
  }
}
