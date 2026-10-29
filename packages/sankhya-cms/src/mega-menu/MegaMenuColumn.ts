import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { arrowUpRightIcon } from '../shared/icons';
import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import type { MegaMenuSelectEventDetail } from './MegaMenuEvents';

/**
 * One column (or one group within a column) of an `st-mega-menu`: a heading, an optional line of
 * description, then its links stacked — usually `st-menu-item`s with `variant="link"`. Nest
 * columns to stack several headed groups in one column, as okta.com does.
 *
 * `variant="card"` puts the column on a tinted rounded tile and `variant="accent"` on a solid
 * accent tile with light text; both suit a row of equal columns without intro or featured area.
 * `cta-label` + `cta-href` add a pill button at the bottom of the column.
 *
 * The heading (when `href` is set) and the button fire a *cancelable* `mega-menu-select` event
 * (detail: `{ href }`) before navigating; a host doing client-side routing calls
 * `event.preventDefault()` on it.
 *
 * @slot - The column's links, or nested `st-mega-menu-column` groups.
 * @fires mega-menu-select - The heading link or the button was clicked (cancelable; detail `{ href }`).
 * @csspart heading - The heading text or link.
 * @csspart description - The line under the heading.
 * @csspart items - The box holding the links.
 * @csspart cta - The pill button.
 * @cssprop --st-mega-menu-column-padding - Overrides the padding of a `card`/`accent` column.
 */
@customElement('st-mega-menu-column')
export class MegaMenuColumn extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: flex;
      flex-direction: column;
      min-width: 0;
      box-sizing: border-box;
      ${fontFamilyStyles}
    }

    :host([variant='card']),
    :host([variant='accent']) {
      /* !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         padding; override with --st-mega-menu-column-padding instead. */
      padding: var(--st-mega-menu-column-padding, 2rem 1.75rem 1.75rem) !important;
      border-radius: 20px;
      background: color-mix(in oklch, var(--st-color-text-strong) 5%, var(--st-color-surface));
    }

    :host([variant='accent']) {
      background: var(--st-color-accent);
      color: var(--st-color-on-solid);
      /* Read by the st-menu-item links inside. */
      --st-nav-color: var(--st-color-on-solid);
      --st-nav-hover-bg: transparent;
    }

    .heading {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin: 0 0 0.75rem;
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1.35;
      color: var(--st-color-text-strong);
      text-decoration: none;
    }

    :host([variant='card']) .heading,
    :host([variant='accent']) .heading {
      font-size: 1.375rem;
    }

    :host([variant='accent']) .heading {
      color: inherit;
    }

    a.heading:hover,
    a.heading:focus-visible {
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .description {
      margin: -0.25rem 0 0.75rem;
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--st-color-text-muted);
    }

    :host([variant='accent']) .description {
      color: inherit;
      opacity: 0.85;
    }

    .items {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* Nested groups stack with room between them (!important for the same page-reset reason). */
    ::slotted(st-mega-menu-column:not(:first-child)) {
      margin-top: 2rem !important;
    }

    .cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 0.875rem 1.5rem;
      border-radius: 9999px;
      background: var(--st-color-surface);
      color: var(--st-color-text-strong);
      font-size: 1rem;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      transition: box-shadow 0.2s ease;
    }

    .cta-spacer {
      flex: 1;
      min-height: 1.75rem;
    }

    .cta:hover,
    .cta:focus-visible {
      box-shadow: 0 0 0 2px currentColor;
    }

    @media (prefers-reduced-motion: reduce) {
      .cta {
        transition: none;
      }
    }
  `;

  @property({ type: String })
  heading = '';

  /** Makes the heading a link (e.g. to the section's overview page). */
  @property({ type: String })
  href = '';

  @property({ type: String })
  description = '';

  /** `plain` (default), `card` (tinted tile) or `accent` (solid accent tile, light text). */
  @property({ type: String, reflect: true })
  variant: 'plain' | 'card' | 'accent' = 'plain';

  /** Text of a pill button at the bottom of the column; needs `cta-href`. */
  @property({ type: String, attribute: 'cta-label' })
  ctaLabel = '';

  @property({ type: String, attribute: 'cta-href' })
  ctaHref = '';

  private select(event: MouseEvent, href: string): void {
    if (href.startsWith('http')) return;
    const selectEvent = new CustomEvent<MegaMenuSelectEventDetail>('mega-menu-select', {
      detail: { href },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(selectEvent);
    if (selectEvent.defaultPrevented) event.preventDefault();
  }

  private renderHeading() {
    if (!this.heading) return nothing;
    return this.href
      ? html`<a part="heading" class="heading" href=${this.href} @click=${(event: MouseEvent) => this.select(event, this.href)}
          >${this.heading}</a
        >`
      : html`<p part="heading" class="heading">${this.heading}</p>`;
  }

  private renderCta() {
    if (!this.ctaLabel || !this.ctaHref) return nothing;
    const external = this.ctaHref.startsWith('http');
    return html`
      <span class="cta-spacer"></span>
      <a
        part="cta"
        class="cta"
        href=${this.ctaHref}
        target=${external ? '_blank' : '_self'}
        rel=${external ? 'noopener noreferrer' : nothing}
        @click=${(event: MouseEvent) => this.select(event, this.ctaHref)}
        >${this.ctaLabel} ${external ? arrowUpRightIcon(14) : nothing}</a
      >
    `;
  }

  render() {
    return html`
      ${this.renderHeading()}
      ${this.description ? html`<p part="description" class="description">${this.description}</p>` : nothing}
      <div part="items" class="items" role="group" aria-label=${this.heading || nothing}><slot></slot></div>
      ${this.renderCta()}
    `;
  }
}
