import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';
import { ctaLinkStyles, paddingScaleStyles } from '../shared/section-styles';
import type { HeroActionEventDetail } from './HeroEvents';

/**
 * Full-width hero banner: background image with a darkening overlay, optional eyebrow, title,
 * optional subtitle and up to two call-to-action links. Port of `SankhyaUI`'s React `Hero`; the
 * framer-motion entrance is redone as CSS keyframes (skipped under `prefers-reduced-motion`).
 *
 * `size`, `content-position` and `overlay="gradient"` give the large editorial layout (copy on the
 * lower left over a gradient that darkens towards it) used by enterprise marketing heroes; the
 * defaults keep the original centered banner. Put several heroes in an `st-carousel` with
 * `indicator-style="tabs"` for a tabbed hero carousel.
 *
 * @fires action - Cancelable, before navigating. Detail `{ href, kind }`, `kind` being `primary` or `secondary`.
 * @cssprop --st-hero-text-color - Text colour over the image.
 * @cssprop --st-hero-min-height - Minimum height when `size` is `large` (default `640px`).
 * @csspart eyebrow - The small label above the title.
 * @csspart secondary-action - The outlined second button.
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

    .eyebrow {
      margin: 0;
      font-size: var(--st-text-sm);
      font-weight: var(--st-font-weight-bold);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: inherit;
      opacity: 0.85;
      animation: st-hero-fade 0.8s 0.2s ease-out backwards;
    }

    .actions {
      flex-wrap: wrap;
      gap: var(--st-space-12);
    }

    .cta.secondary {
      background: transparent;
      color: inherit;
      box-shadow: inset 0 0 0 1.5px currentColor;
    }

    .cta.secondary:hover {
      background: color-mix(in oklch, currentColor 12%, transparent);
    }

    /* size="large" / "full": a tall editorial hero. */
    :host([size='large']) {
      min-height: var(--st-hero-min-height, 640px);
    }

    :host([size='full']) {
      min-height: 100svh;
    }

    :host([size='large']) .title,
    :host([size='full']) .title {
      font-size: clamp(2.5rem, 6vw, 5rem);
      letter-spacing: -0.02em;
      line-height: 1.05;
    }

    /* content-position="bottom": copy sits in the lower part of the hero, on the container grid. */
    :host([content-position='bottom']) {
      align-items: flex-end;
    }

    :host([content-position='bottom']) .content {
      width: 100%;
      max-width: var(--st-cms-container-max);
      box-sizing: border-box;
      padding: var(--st-space-48) var(--st-space-24);
    }

    :host([content-position='bottom']) .title,
    :host([content-position='bottom']) .subtitle {
      max-width: 18ch;
    }

    :host([content-position='bottom']) .subtitle {
      max-width: 48ch;
    }

    :host([content-position='bottom']:not([text-alignment='center']):not([text-alignment='right'])) .actions {
      justify-content: flex-start;
    }

    :host([content-position='bottom'][text-alignment='center']) .title,
    :host([content-position='bottom'][text-alignment='center']) .subtitle {
      margin-inline: auto;
    }

    /* overlay="gradient": darkest behind the copy, clearing towards the far side of the image. */
    :host([overlay='gradient']) .overlay {
      background:
        linear-gradient(to top, color-mix(in oklch, var(--st-color-text-strong) 85%, transparent), transparent 70%),
        linear-gradient(to right, color-mix(in oklch, var(--st-color-text-strong) 70%, transparent), transparent 75%);
    }

    :host([overlay='gradient'][text-alignment='right']) .overlay {
      background:
        linear-gradient(to top, color-mix(in oklch, var(--st-color-text-strong) 85%, transparent), transparent 70%),
        linear-gradient(to left, color-mix(in oklch, var(--st-color-text-strong) 70%, transparent), transparent 75%);
    }

    :host([overlay='none']) .overlay {
      display: none;
    }

    @media (min-width: 768px) {
      .content { padding: var(--st-space-32); }
    }
    @media (min-width: 1024px) {
      .content { padding: var(--st-space-48); }
      :host([content-position='bottom']) .content { padding: var(--st-space-48) var(--st-space-32) 6rem; }
    }

    @media (prefers-reduced-motion: reduce) {
      :host, .eyebrow, .title, .subtitle, .cta { animation: none; }
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

  /** Small uppercase label above the title (e.g. an event or product name). */
  @property({ type: String })
  eyebrow = '';

  /** Label of an outlined second button next to the primary one. */
  @property({ type: String, attribute: 'secondary-action-label' })
  secondaryActionLabel = '';

  @property({ type: String, attribute: 'secondary-href' })
  secondaryHref = '';

  /** `auto` sizes to the content; `large` is a tall editorial hero (`--st-hero-min-height`); `full` fills the viewport. */
  @property({ type: String, reflect: true })
  size: 'auto' | 'large' | 'full' = 'auto';

  /** `center` keeps the copy in the middle; `bottom` puts it in the lower part of the hero, on the page container. */
  @property({ type: String, reflect: true, attribute: 'content-position' })
  contentPosition: 'center' | 'bottom' = 'center';

  /** `even` darkens the whole image; `gradient` darkens behind the copy only; `none` shows the image as is. */
  @property({ type: String, reflect: true })
  overlay: 'even' | 'gradient' | 'none' = 'even';

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

  private emitAction(event: MouseEvent, href: string, kind: 'primary' | 'secondary'): void {
    const action = new CustomEvent<HeroActionEventDetail>('action', {
      detail: { href, kind },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(action);
    if (action.defaultPrevented) event.preventDefault();
  }

  private onClick = (event: MouseEvent): void => this.emitAction(event, this.href, 'primary');

  private onSecondaryClick = (event: MouseEvent): void => this.emitAction(event, this.secondaryHref, 'secondary');

  render() {
    return html`
      <div class="overlay" part="overlay"></div>
      <div class="content" part="content">
        ${this.eyebrow ? html`<p class="eyebrow" part="eyebrow">${this.eyebrow}</p>` : nothing}
        <h1 class="title" part="title">${this.title}</h1>
        ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
        ${this.actionLabel || this.secondaryActionLabel
          ? html`<div class="actions" part="actions">
              ${this.actionLabel
                ? html`<a class="cta" part="action" href=${this.href || nothing} @click=${this.onClick}>${this.actionLabel}</a>`
                : nothing}
              ${this.secondaryActionLabel
                ? html`<a class="cta secondary" part="secondary-action" href=${this.secondaryHref || nothing} @click=${this.onSecondaryClick}
                    >${this.secondaryActionLabel}</a
                  >`
                : nothing}
            </div>`
          : nothing}
        <slot></slot>
      </div>
    `;
  }
}
