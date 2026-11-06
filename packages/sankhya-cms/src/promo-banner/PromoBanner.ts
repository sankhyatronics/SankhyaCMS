import { LitElement, css, html, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'iconify-icon';

import { buttonResetStyles, controlBaseStyles, ctaPillStyles, rootFontFamilyStyles } from '../shared/styles';
import { ctaLinkStyles, sectionSubtitleStyles, sectionTitleStyles } from '../shared/section-styles';
import type { HeroActionEventDetail } from '../hero/HeroEvents';

/* Same small padlock as st-hero's cta-note, so the note never reads as a list tick. */
const CTA_NOTE_ICON = svg`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`;

/**
 * Rounded call-to-action banner (title, subtitle, one or two outlined buttons) on a dark panel or a
 * background image. A button with an `href` is a real link (`<a href>`): the browser follows it
 * unless the `action` event is cancelled, so external URLs, `#anchors` and `/path?x=y` work without
 * JavaScript. A button without an `href` is a `<button>`. `variant="accent"` fills the banner with
 * the brand colour.
 *
 * `cta-note` is a short line with a small padlock under the buttons (e.g. "No credit card needed"). In the
 * inline layout it sits under the buttons in the right-hand group, left-aligned with the first button.
 *
 * `layout="inline"` sets the copy on the left and the buttons on the right of one row (wrapping on
 * small screens), with 56px/48px padding (24px on phones). Its buttons are 52px pills; with
 * `variant="accent"` the first is a white pill with navy text and the second a transparent pill with
 * a light blue outline. `button-style="pill"` gives the buttons the same pill shape in the default
 * `stack` layout, which is otherwise unchanged.
 *
 * @fires action - Cancelable, before following the link. Detail `{ href, kind? }`. `kind` is `secondary` for the second button only.
 * @cssprop --st-promo-banner-margin - Overrides the banner's margin.
 * @cssprop --st-promo-banner-padding - Overrides the banner's padding.
 * @cssprop --st-promo-banner-cta-note-color - Colour of the `cta-note` line (default `currentColor` at 85%).
 * @csspart action - The primary button (`<a>` with an `href`, `<button>` without).
 * @csspart secondary-action - The second button.
 * @csspart cta-note - The small line with a padlock under the buttons (`cta-note`).
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

    /* Outlined second button on the brand fill: white text and border, 5.8:1 on the default accent
       (#3557E0), so both clear WCAG AA. */
    :host([variant='accent']) .cta.secondary {
      color: var(--st-cms-on-dark);
      border-color: var(--st-cms-on-dark);
    }

    :host([variant='accent']) .cta.secondary:hover {
      background: color-mix(in oklch, var(--st-cms-on-dark) 14%, transparent);
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

    /* The buttons and the cta-note share one column: the note sits under the buttons, centred in the
       stack layout and left-aligned with the first button in the inline layout. */
    .cta-group {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .cta-note {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin: 8px 0 0;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;
      color: var(--st-promo-banner-cta-note-color, color-mix(in oklch, currentColor 85%, transparent));
    }

    .cta-note svg,
    .cta-note iconify-icon {
      flex: none;
      width: 14px;
      height: 14px;
      font-size: 14px;
    }

    /* layout="inline": copy left, buttons right, one row that wraps. */
    :host([layout='inline']) {
      padding: var(--st-promo-banner-padding, 56px 48px) !important;
    }

    /* The inline band is the content width (container max, 1200px), not 48px narrower; below that
       width it keeps the 24px gutter on each side. */
    @media (min-width: 1248px) {
      :host([layout='inline']) {
        width: 100%;
      }
    }

    :host([layout='inline']) .container {
      max-width: none;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: var(--st-space-24) var(--st-space-32);
      text-align: left;
    }

    :host([layout='inline']) .copy {
      display: flex;
      flex: 1 1 420px;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--st-space-16);
      min-width: 0;
    }

    :host([layout='inline']) .title,
    :host([layout='inline']) .subtitle {
      margin: 0;
    }

    :host([layout='inline']) .cta-group {
      flex: 0 1 auto;
      align-items: flex-start;
    }

    :host([layout='inline']) .actions {
      flex: 0 1 auto;
      justify-content: flex-end;
      margin-top: 0;
    }

    /* The inline accent banner is the brand navy (the design's closing band). */
    :host([layout='inline'][variant='accent']) {
      background-color: var(--st-cms-brand-navy, var(--st-color-accent));
    }

    :host([layout='inline'][variant='accent']) .subtitle {
      color: var(--st-cms-primary-100, var(--st-cms-on-dark));
      opacity: 1;
    }

    /* Inline buttons (and buttonStyle="pill" on any layout) are 52px pills. */
    :host([layout='inline']) .cta,
    :host([button-style='pill']) .cta {
      ${ctaPillStyles}
    }

    :host([layout='inline']) .cta {
      font-size: 17px;
    }

    :host([layout='inline'][variant='accent']) .cta:not(.secondary) {
      background: var(--st-cms-on-dark);
      color: var(--st-cms-navy);
    }

    :host([layout='inline'][variant='accent']) .cta.secondary {
      padding: 0 24px;
      background: transparent;
      color: var(--st-cms-on-dark);
      border: 1px solid var(--st-cms-primary-400);
    }

    :host([button-style='pill'][variant='accent']) .cta:not(.secondary) {
      background: var(--st-cms-on-dark);
      color: var(--st-cms-navy);
    }

    :host([button-style='pill']) .cta.secondary {
      padding: 0 24px;
    }

    @media (max-width: 768px) {
      :host {
        width: auto;
        margin: var(--st-promo-banner-margin, var(--st-space-24)) !important;
        padding: var(--st-promo-banner-padding, 60px var(--st-space-24)) !important;
        border-radius: var(--st-radius-lg);
      }

      :host([layout='inline']) {
        padding: var(--st-promo-banner-padding, var(--st-space-24)) !important;
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
    }  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String, attribute: 'action-label' })
  actionLabel = '';

  /** Target of the first button. With a value the button is a link; the `action` event can cancel the navigation. */
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

  /** `stack` (default) centres the copy above the buttons; `inline` puts the buttons beside the copy. */
  @property({ type: String, reflect: true })
  layout: 'stack' | 'inline' = 'stack';

  /** `default` keeps the plain buttons; `pill` gives them the 52px pill shape (`inline` always uses pills). */
  @property({ type: String, reflect: true, attribute: 'button-style' })
  buttonStyle: 'default' | 'pill' = 'default';

  /** Short line with a small check under the buttons (e.g. "No credit card needed"). Empty hides it. */
  @property({ type: String, attribute: 'cta-note' })
  ctaNote = '';

  /** Iconify icon for the `cta-note` line (e.g. `mdi:open-source-initiative`). Empty keeps the padlock. */
  @property({ type: String, attribute: 'cta-note-icon' })
  ctaNoteIcon = '';

  protected willUpdate(): void {
    this.style.backgroundImage = this.imageSrc ? `url(${JSON.stringify(this.imageSrc)})` : '';
  }

  /** Fires the cancelable `action` event; a cancelled click keeps the page where it is. */
  private emitAction(event: MouseEvent, detail: HeroActionEventDetail): void {
    const action = new CustomEvent<HeroActionEventDetail>('action', { detail, bubbles: true, composed: true, cancelable: true });
    this.dispatchEvent(action);
    if (action.defaultPrevented) event.preventDefault();
  }

  private renderCta(label: string, href: string, secondary: boolean) {
    const className = secondary ? 'cta secondary' : 'cta';
    const part = secondary ? 'secondary-action' : 'action';
    const detail: HeroActionEventDetail = secondary ? { href, kind: 'secondary' } : { href };
    const onClick = (event: MouseEvent) => this.emitAction(event, detail);
    return href
      ? html`<a class=${className} part=${part} href=${href} @click=${onClick}>${label}</a>`
      : html`<button class=${className} part=${part} type="button" @click=${onClick}>${label}</button>`;
  }

  private renderCopy() {
    return html`
      <h2 class="title" part="title">${this.title}</h2>
      ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
      <slot></slot>
    `;
  }

  render() {
    return html`
      <div class="container" part="container">
        ${this.layout === 'inline'
          ? html`<div class="copy" part="copy">${this.renderCopy()}</div>`
          : this.renderCopy()}
        ${this.actionLabel || this.secondaryActionLabel || this.ctaNote
          ? html`<div class="cta-group">
              ${this.actionLabel || this.secondaryActionLabel
                ? html`<div class="actions" part="actions">
                    ${this.actionLabel ? this.renderCta(this.actionLabel, this.href, false) : nothing}
                    ${this.secondaryActionLabel ? this.renderCta(this.secondaryActionLabel, this.secondaryHref, true) : nothing}
                  </div>`
                : nothing}
              ${this.ctaNote
                ? html`<p class="cta-note" part="cta-note">${this.ctaNoteIcon
                    ? html`<iconify-icon icon=${this.ctaNoteIcon} aria-hidden="true"></iconify-icon>`
                    : CTA_NOTE_ICON}<span>${this.ctaNote}</span></p>`
                : nothing}
            </div>`
          : nothing}
      </div>
    `;
  }
}
