import { LitElement, PropertyValues, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'iconify-icon';

import { controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  /** Iconify icon name, e.g. `mdi:github`. */
  icon: string;
  href: string;
}

/** Fired when an internal footer link is activated — cancelable, so an SPA can `preventDefault()` and route instead. */
export interface FooterLinkEventDetail {
  href: string;
}

/**
 * The footer, in two layouts:
 *
 * - **Bar** (default): a copyright line plus an optional "powered by" link — what the suite's
 *   authenticated apps use.
 * - **Site**: when `columns`, `socialLinks`, `description` or `imageSrc` is set, the footer becomes a
 *   marketing-site footer — brand (logo/company name, description, social icons), link columns and a
 *   bottom bar with the copyright and "powered by".
 *
 * Fires a cancelable `footer-link` event (detail `{ href }`) when an internal link is clicked.
 */
@customElement('st-footer')
export class Footer extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--st-space-16);
      flex-wrap: wrap;
      /* !important on padding/border-top only: a shadow host's own :host rule always loses to ANY
       * rule the consuming page has for the same property on that element, regardless of
       * specificity — so a page that resets margin/padding/border on every element (e.g. Tailwind
       * Preflight, which every app but Template Hub loads) silently zeroes this footer's padding
       * and top border unless these two win the conflict outright via !important. */
      padding: var(--st-space-16) var(--st-space-28) !important;
      border-top: 1px solid var(--st-color-border) !important;
      color: var(--st-color-text-muted);
      font-size: var(--st-text-xs);
      ${rootFontFamilyStyles}
    }

    .powered-by {
      color: inherit;
      text-decoration: none;
      font-weight: var(--st-font-weight-semibold);
    }

    .powered-by:hover {
      color: var(--st-color-text-strong);
    }

    :host([inverted]) {
      background: var(--st-color-text-strong);
      color: var(--st-color-on-solid);
      border-top-color: transparent !important;
    }

    /* Site layout */
    :host([site]) {
      display: block;
      padding: 64px var(--st-space-28) 32px !important;
      font-size: var(--st-text-sm);
    }

    .site {
      max-width: 1200px;
      margin: 0 auto;
    }

    .grid {
      display: grid;
      grid-template-columns: 2fr repeat(3, 1fr);
      gap: 64px;
      margin-bottom: 64px;
    }

    .brand {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--st-color-text-strong);
    }

    .logo-img {
      height: 32px;
      width: auto;
    }

    .description {
      margin: 0;
      max-width: 300px;
      line-height: 1.6;
    }

    .social {
      display: flex;
      gap: 16px;
      margin-top: 16px;
    }

    .social-link,
    .link {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .social-link:hover,
    .link:hover {
      color: var(--st-color-text-strong);
    }

    .column-title {
      margin: 0 0 24px;
      font-size: var(--st-text-xs);
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .bottom {
      padding-top: 32px;
      border-top: 1px solid var(--st-color-border);
      font-size: var(--st-text-xs);
    }

    .bottom-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bottom-text .powered-by {
      font-size: 0.85em;
      font-weight: inherit;
      opacity: 0.8;
    }

    @media (max-width: 1024px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 48px;
      }
    }

    @media (max-width: 768px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      .bottom {
        text-align: center;
      }
    }

    :host([site][inverted]) .logo,
    :host([site][inverted]) .column-title,
    :host([site][inverted]) .social-link:hover,
    :host([site][inverted]) .link:hover {
      color: var(--st-color-on-solid);
    }

    :host([site][inverted]) .bottom {
      border-top-color: color-mix(in oklch, var(--st-color-on-solid) 20%, var(--st-color-text-strong));
    }
  `;

  /** Inverts the footer's color roles (light-on-dark instead of dark-on-light) — matches the
   * source component's `inverted` (from its shared `BaseProps`), same as `st-header`'s. */
  @property({ type: Boolean, reflect: true })
  inverted = false;

  /** Used to build the default `copyright` line (`© {year} {companyName}`) when `copyright` isn't set explicitly. */
  @property({ type: String, attribute: 'company-name' })
  companyName = '';

  /** Overrides the default computed copyright line entirely. */
  @property({ type: String })
  copyright = '';

  @property({ type: String, attribute: 'powered-by' })
  poweredBy = '';

  @property({ type: String, attribute: 'powered-by-link' })
  poweredByLink = '';

  /** App version, rendered as `v{version}` after the copyright line — for apps that show their own
   * version in the footer rather than the header title. */
  @property({ type: String })
  version = '';

  /** Logo shown in the brand block (site layout). */
  @property({ type: String, attribute: 'image-src' })
  imageSrc = '';

  /** Short blurb under the logo (site layout). */
  @property({ type: String })
  description = '';

  /** Link columns (site layout). */
  @property({ attribute: false })
  columns: FooterColumn[] = [];

  /** Social icon links under the description (site layout). */
  @property({ attribute: false })
  socialLinks: FooterSocialLink[] = [];

  private get isSite(): boolean {
    return !!(this.columns.length || this.socialLinks.length || this.description || this.imageSrc);
  }

  private get resolvedCopyright(): string {
    if (this.copyright) return this.copyright;
    if (this.companyName) return `© ${new Date().getFullYear()} ${this.companyName}`;
    return `© ${new Date().getFullYear()}`;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.size) this.toggleAttribute('site', this.isSite);
  }

  private onLinkClick(event: MouseEvent, href: string): void {
    const select = new CustomEvent<FooterLinkEventDetail>('footer-link', {
      detail: { href },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(select);
    if (select.defaultPrevented) event.preventDefault();
  }

  private renderLink(link: FooterLink) {
    return /^https?:/i.test(link.href)
      ? html`<a part="link" class="link" href=${link.href} target="_blank" rel="noopener noreferrer">${link.label}</a>`
      : html`<a part="link" class="link" href=${link.href} @click=${(event: MouseEvent) => this.onLinkClick(event, link.href)}>${link.label}</a>`;
  }

  private renderPoweredBy() {
    return this.poweredBy
      ? html`
          <a part="powered-by" class="powered-by" href=${this.poweredByLink || '#'} target="_blank" rel="noopener noreferrer">
            ${this.poweredBy}
          </a>
        `
      : nothing;
  }

  private renderSite() {
    return html`
      <div class="site" part="site">
        <div class="grid">
          <div class="brand" part="brand">
            ${this.imageSrc || this.companyName
              ? html`<div class="logo">
                  ${this.imageSrc ? html`<img class="logo-img" src=${this.imageSrc} alt=${this.companyName || 'Logo'} />` : nothing}
                  ${this.companyName ? html`<span>${this.companyName}</span>` : nothing}
                </div>`
              : nothing}
            ${this.description ? html`<p class="description">${this.description}</p>` : nothing}
            ${this.socialLinks.length
              ? html`<div class="social">
                  ${this.socialLinks.map(
                    social => html`<a part="social" class="social-link" href=${social.href} target="_blank" rel="noopener noreferrer" aria-label=${social.icon}>
                      <iconify-icon icon=${social.icon} width="24" height="24"></iconify-icon>
                    </a>`
                  )}
                </div>`
              : nothing}
          </div>
          ${this.columns.map(
            column => html`<div class="column" part="column">
              <h4 class="column-title">${column.title}</h4>
              <div class="links">${column.links.map(link => this.renderLink(link))}</div>
            </div>`
          )}
        </div>
        <div class="bottom" part="bottom">
          <div class="bottom-text">
            <span part="copyright">${this.resolvedCopyright}</span>
            ${this.version ? html`<span part="version">v${this.version}</span>` : nothing} ${this.renderPoweredBy()}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (this.isSite) return this.renderSite();
    return html`
      <span part="copyright">${this.resolvedCopyright}</span>
      ${this.version ? html`<span part="version">v${this.version}</span>` : nothing} ${this.renderPoweredBy()}
    `;
  }
}
