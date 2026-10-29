import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import type { MegaMenuSelectEventDetail } from './MegaMenuEvents';

/**
 * A promo card for the featured column of an `st-mega-menu` (`slot="featured"`). The whole card
 * is one link. Two looks, after okta.com:
 *
 * - `story` (default): a rounded image on top, then the description and an underlined
 *   call-to-action line — a customer story or announcement.
 * - `overlay`: a tile with light text over `image-url` (darkened), or over an accent gradient when
 *   there is no image — an optional `logo-url` top left, the title and description at the bottom.
 *
 * An `http(s)` `href` opens in a new tab unless `target` says otherwise. Any other `href` fires a
 * *cancelable* `mega-menu-select` event (detail: `{ href }`) first; a host doing client-side
 * routing calls `event.preventDefault()` on it.
 *
 * @fires mega-menu-select - The card was clicked (cancelable; detail `{ href }`).
 * @csspart card - The card link.
 * @csspart image - The image (`story`).
 * @csspart logo - The logo (`overlay`).
 * @csspart eyebrow - The small label above the title.
 * @csspart title - The title.
 * @csspart description - The description.
 * @csspart cta - The call-to-action line.
 * @cssprop --st-mega-menu-feature-from - Start colour of the `overlay` gradient (default: the accent colour).
 * @cssprop --st-mega-menu-feature-to - End colour of the `overlay` gradient.
 */
@customElement('st-mega-menu-feature')
export class MegaMenuFeature extends LitElement {
  /** `focus()` on the element focuses its link, so `st-dropdown` can arrow-key to it. */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      ${fontFamilyStyles}
    }

    .card {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      box-sizing: border-box;
      color: var(--st-color-text-strong);
      text-decoration: none;
    }

    .image {
      display: block;
      width: 100%;
      aspect-ratio: 9 / 8;
      object-fit: cover;
      border-radius: 20px;
      transition: transform 0.3s ease;
    }

    .card:hover .image {
      transform: scale(1.015);
    }

    .eyebrow {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--st-color-accent-text);
    }

    .title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1.3;
    }

    .description {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.5;
    }

    .cta {
      align-self: flex-start;
      margin-top: 0.75rem;
      font-size: 0.9375rem;
      font-weight: 500;
      text-decoration: underline;
      text-underline-offset: 5px;
      text-decoration-thickness: 1px;
    }

    .card:hover .cta,
    .card:focus-visible .cta {
      text-decoration-thickness: 2px;
    }

    /* overlay */
    :host([variant='overlay']) .card {
      justify-content: flex-end;
      gap: 0.5rem;
      min-height: 15rem;
      padding: 1.75rem;
      border-radius: 20px;
      color: #fff;
      background-color: var(--st-color-accent);
      background-image:
        linear-gradient(to top, rgb(0 0 0 / 0.55), rgb(0 0 0 / 0.05)),
        var(--st-mega-menu-feature-image, linear-gradient(160deg, var(--st-mega-menu-feature-from, var(--st-color-accent)), var(--st-mega-menu-feature-to, oklch(0.25 0.12 280))));
      background-size: cover;
      background-position: center;
      transition: transform 0.2s ease;
    }

    :host([variant='overlay']) .card:hover {
      transform: translateY(-2px);
    }

    :host([variant='overlay']) .logo {
      height: 2.25rem;
      width: auto;
      max-width: 70%;
      margin-bottom: auto;
      align-self: flex-start;
      object-fit: contain;
    }

    :host([variant='overlay']) .title {
      font-size: 1.75rem;
      font-weight: 400;
    }

    :host([variant='overlay']) .eyebrow,
    :host([variant='overlay']) .cta {
      color: inherit;
    }

    @media (prefers-reduced-motion: reduce) {
      .image,
      :host([variant='overlay']) .card {
        transition: none;
      }
    }
  `;

  /** `story` (default) or `overlay` — see the element description. */
  @property({ type: String, reflect: true })
  variant: 'story' | 'overlay' = 'story';

  @property({ type: String })
  title = '';

  @property({ type: String })
  description = '';

  /** Small label above the title, e.g. "New" or "Report". */
  @property({ type: String })
  eyebrow = '';

  @property({ type: String })
  href = '';

  /** `target` for the link. Defaults to `_blank` for an `http(s)` `href`, `_self` otherwise. */
  @property({ type: String })
  target = '';

  /** Image on top (`story`) or behind the text (`overlay`). */
  @property({ type: String, attribute: 'image-url' })
  imageUrl = '';

  @property({ type: String, attribute: 'image-alt' })
  imageAlt = '';

  /** Logo at the top of an `overlay` card. */
  @property({ type: String, attribute: 'logo-url' })
  logoUrl = '';

  @property({ type: String, attribute: 'logo-alt' })
  logoAlt = '';

  /** Call-to-action text at the bottom of the card; empty hides it. */
  @property({ type: String, attribute: 'cta-label' })
  ctaLabel = '';

  private get isExternal(): boolean {
    return this.href.startsWith('http');
  }

  private onClick = (event: MouseEvent): void => {
    if (this.isExternal) return;
    const selectEvent = new CustomEvent<MegaMenuSelectEventDetail>('mega-menu-select', {
      detail: { href: this.href },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(selectEvent);
    if (selectEvent.defaultPrevented) event.preventDefault();
  };

  render() {
    const target = this.target || (this.isExternal ? '_blank' : '_self');
    const overlay = this.variant === 'overlay';
    const style = overlay && this.imageUrl ? `--st-mega-menu-feature-image:url(${JSON.stringify(this.imageUrl)})` : '';
    return html`
      <a
        part="card"
        class="card"
        style=${style}
        href=${this.href || nothing}
        target=${target}
        rel=${target === '_blank' ? 'noopener noreferrer' : nothing}
        @click=${this.onClick}
      >
        ${overlay && this.logoUrl ? html`<img part="logo" class="logo" src=${this.logoUrl} alt=${this.logoAlt} />` : nothing}
        ${!overlay && this.imageUrl
          ? html`<img part="image" class="image" src=${this.imageUrl} alt=${this.imageAlt} loading="lazy" />`
          : nothing}
        ${this.eyebrow ? html`<span part="eyebrow" class="eyebrow">${this.eyebrow}</span>` : nothing}
        ${this.title ? html`<p part="title" class="title">${this.title}</p>` : nothing}
        ${this.description ? html`<p part="description" class="description">${this.description}</p>` : nothing}
        ${this.ctaLabel ? html`<span part="cta" class="cta">${this.ctaLabel}</span>` : nothing}
      </a>
    `;
  }
}
