import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';

/**
 * A minimal app-shell footer — a copyright line plus an optional "powered by" link, nothing more.
 * Ported from `SankhyaUI`'s React `Footer` (a separate, unrelated marketing-site project), which
 * is a full multi-column link/social-icon layout — deliberately not carried over here, since none
 * of this suite's internal admin apps has that content (public docs pages, social accounts, ...)
 * to populate it with; every app here is authenticated tooling, not a marketing site.
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

  private get resolvedCopyright(): string {
    if (this.copyright) return this.copyright;
    if (this.companyName) return `© ${new Date().getFullYear()} ${this.companyName}`;
    return `© ${new Date().getFullYear()}`;
  }

  render() {
    return html`
      <span part="copyright">${this.resolvedCopyright}</span>
      ${this.version ? html`<span part="version">v${this.version}</span>` : nothing}
      ${this.poweredBy
        ? html`
            <a part="powered-by" class="powered-by" href=${this.poweredByLink || '#'} target="_blank" rel="noopener noreferrer">
              ${this.poweredBy}
            </a>
          `
        : nothing}
    `;
  }
}
