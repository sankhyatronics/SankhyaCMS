import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';
import { sectionSubtitleStyles, sectionTitleStyles } from '../shared/section-styles';

/**
 * A page band that holds other content: sets the background, the spacing above and below, and
 * the content width, with an optional eyebrow/title/subtitle heading over its slotted children.
 * Use it to give a run of components one dark or tinted backdrop and a consistent vertical rhythm,
 * the way enterprise marketing pages stack full-width sections.
 *
 * @slot - The section's content.
 * @cssprop --st-section-bg - Overrides the background colour picked by `background`.
 * @cssprop --st-section-padding-inline - Overrides the left/right padding (not with `width="full"`).
 * @csspart inner - The width-limited content box.
 * @csspart header - The heading block.
 */
@customElement('st-section')
export class Section extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      --st-section-space-none: 0;
      --st-section-space-s: var(--st-space-24);
      --st-section-space-m: var(--st-space-48);
      --st-section-space-l: 4.5rem;
      --st-section-space-xl: 6rem;
      --st-section-space-xxl: 8rem;

      display: block;
      box-sizing: border-box;
      width: 100%;
      /* !important on every padding rule: a page-level reset (e.g. Tailwind Preflight) otherwise
         zeroes a shadow host's padding. Rescale it with the --st-section-space-* tokens. */
      padding: var(--st-section-space-m) var(--st-section-padding-inline, var(--st-space-24)) !important;
      background: var(--st-section-bg, var(--st-color-surface));
      color: var(--st-color-text-strong);
      ${rootFontFamilyStyles}
    }

    :host([background='subtle']) {
      background: var(--st-section-bg, var(--st-color-subtle));
    }

    :host([background='dark']) {
      background: var(--st-section-bg, var(--st-cms-band-dark-bg));
      color: var(--st-cms-band-dark-color);
    }

    :host([background='accent']) {
      background: var(--st-section-bg, var(--st-color-accent));
      color: var(--st-color-on-solid);
    }

    :host([background='transparent']) {
      background: var(--st-section-bg, transparent);
    }

    :host([spacing-above='none']) { padding-top: var(--st-section-space-none) !important; }
    :host([spacing-above='s']) { padding-top: var(--st-section-space-s) !important; }
    :host([spacing-above='l']) { padding-top: var(--st-section-space-l) !important; }
    :host([spacing-above='xl']) { padding-top: var(--st-section-space-xl) !important; }
    :host([spacing-above='xxl']) { padding-top: var(--st-section-space-xxl) !important; }

    :host([spacing-below='none']) { padding-bottom: var(--st-section-space-none) !important; }
    :host([spacing-below='s']) { padding-bottom: var(--st-section-space-s) !important; }
    :host([spacing-below='l']) { padding-bottom: var(--st-section-space-l) !important; }
    :host([spacing-below='xl']) { padding-bottom: var(--st-section-space-xl) !important; }
    :host([spacing-below='xxl']) { padding-bottom: var(--st-section-space-xxl) !important; }

    :host([width='full']) {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .inner {
      max-width: var(--st-cms-container-max);
      margin: 0 auto;
    }

    :host([width='narrow']) .inner {
      max-width: 800px;
    }

    :host([width='full']) .inner {
      max-width: none;
    }

    .header {
      margin-bottom: var(--st-space-48);
    }

    :host([text-alignment='center']) .header {
      text-align: center;
    }

    :host([text-alignment='center']) .subtitle {
      margin-inline: auto;
    }

    :host([width='full']) .header {
      max-width: var(--st-cms-container-max);
      margin-inline: auto;
      padding-inline: var(--st-space-24);
      box-sizing: border-box;
    }

    .eyebrow {
      margin: 0 0 var(--st-space-12);
      font-size: var(--st-text-sm);
      font-weight: var(--st-font-weight-bold);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--st-color-text-muted);
    }

    .title {
      ${sectionTitleStyles}
      color: inherit;
      letter-spacing: -0.02em;
      max-width: 24ch;
    }

    :host([text-alignment='center']) .title {
      margin-inline: auto;
    }

    .subtitle {
      ${sectionSubtitleStyles}
      max-width: 60ch;
      margin-bottom: 0;
    }

    :host([background='dark']) .eyebrow,
    :host([background='dark']) .subtitle {
      color: color-mix(in oklch, var(--st-cms-band-dark-color) 80%, transparent);
    }

    :host([background='accent']) .eyebrow,
    :host([background='accent']) .subtitle {
      color: color-mix(in oklch, var(--st-color-on-solid) 80%, transparent);
    }

    @media (max-width: 768px) {
      :host {
        --st-section-space-l: 3.5rem;
        --st-section-space-xl: 4.5rem;
        --st-section-space-xxl: 5.5rem;
        --st-section-padding-inline: var(--st-space-20);
      }
    }
  `;

  @property({ type: String })
  eyebrow = '';

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  /** `default` (page surface), `subtle`, `dark`, `accent` or `transparent`. */
  @property({ type: String, reflect: true })
  background: 'default' | 'subtle' | 'dark' | 'accent' | 'transparent' = 'default';

  /** Space above the content: `none`, `s`, `m` (default), `l`, `xl` or `xxl`. */
  @property({ type: String, reflect: true, attribute: 'spacing-above' })
  spacingAbove: 'none' | 's' | 'm' | 'l' | 'xl' | 'xxl' = 'm';

  /** Space below the content: `none`, `s`, `m` (default), `l`, `xl` or `xxl`. */
  @property({ type: String, reflect: true, attribute: 'spacing-below' })
  spacingBelow: 'none' | 's' | 'm' | 'l' | 'xl' | 'xxl' = 'm';

  /** `contained` (default, the page container width), `narrow` (reading width) or `full` (edge to edge). */
  @property({ type: String, reflect: true })
  width: 'contained' | 'narrow' | 'full' = 'contained';

  /** Alignment of the heading. */
  @property({ type: String, reflect: true, attribute: 'text-alignment' })
  textAlignment: 'left' | 'center' = 'left';

  render() {
    const heading = this.eyebrow || this.title || this.subtitle;
    return html`
      <div class="inner" part="inner">
        ${heading
          ? html`<div class="header" part="header">
              ${this.eyebrow ? html`<p class="eyebrow" part="eyebrow">${this.eyebrow}</p>` : nothing}
              ${this.title ? html`<h2 class="title" part="title">${this.title}</h2>` : nothing}
              ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
            </div>`
          : nothing}
        <slot></slot>
      </div>
    `;
  }
}
