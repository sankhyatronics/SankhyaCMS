import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { ctaLinkStyles, sectionEyebrowStyles, sectionSubtitleStyles, sectionTitleStyles } from '../shared/section-styles';
import { ctaAriaLabel, ctaLabelStyles, renderCtaLabel } from '../shared/cta-label';
import { externalLinkAttrs, externalLinkExtras, isExternalHref } from '../shared/external-link';
import '../markdown';

/**
 * A long-form article section: an optional eyebrow, a title, a subtitle, an optional featured image
 * with caption, then Markdown body text. The body comes from `content-src` (a Markdown URL) or an
 * inline `content` string (so the block works without a fetch); `content-src` wins when both are set.
 *
 * `list-style="check"` shows check marks instead of bullets on the body's lists. `action-label` with
 * an `href` adds a pill link under the body, styled by `action-variant`. `max-width="prose"` narrows
 * the body to a 720px reading column.
 *
 * The title is a real heading: `<h2>` by default, `<h3>` with `heading-level="3"` for a sub-section
 * inside a larger page (smaller, lighter type, so it never outweighs a section title). Eyebrow,
 * title, subtitle and body share one alignment: left by default, centred with `text-alignment="center"`.
 *
 * @cssprop --st-content-block-padding - Overrides the block's padding.
 * @csspart container - The width-limited content box.
 * @csspart header - The eyebrow, title and subtitle block.
 * @csspart eyebrow - The small uppercase label above the title.
 * @csspart title - The heading (`<h2>` or `<h3>`).
 * @csspart subtitle - The line under the title.
 * @csspart image - The featured image and its caption.
 * @csspart body - The Markdown body.
 * @csspart action - The pill link under the body (when `action-label` and `href` are set).
 */
@customElement('st-content-block')
export class ContentBlock extends LitElement {
  static styles = css`
    ${ctaLabelStyles}
    ${controlBaseStyles}

    :host {
      display: block;
      ${fontFamilyStyles}
      /* !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         padding; override with --st-content-block-padding instead. */
      padding: var(--st-content-block-padding, var(--st-space-24)) !important;
      /* Transparent: the block sits on whatever band or page surrounds it. A fill here made a box that
         did not match the section (lighter navy in the dark theme) and had no padding around its text. */
      background: transparent;
      color: var(--st-color-text-strong);
    }

    :host([inverted]) {
      background: var(--st-color-text-strong);
      color: var(--st-color-on-solid);
    }

    .container {
      max-width: var(--st-cms-container-max);
      padding: 0 var(--st-space-48);
      margin: 0 auto;
      text-align: left;
    }

    :host([text-alignment='center']) .container {
      text-align: center;
    }

    .header {
      margin-bottom: var(--st-space-48);
    }

    .eyebrow {
      ${sectionEyebrowStyles}
    }

    .title {
      ${sectionTitleStyles}
      line-height: 1.1;
    }

    /* heading-level="3": a sub-section title, a step below the section title's size and weight. */
    .title.title-3 {
      font-size: var(--st-cms-text-3xl);
      font-weight: var(--st-font-weight-semibold);
      line-height: 1.2;
    }

    .subtitle {
      ${sectionSubtitleStyles}
    }

    :host([text-alignment='center']) .subtitle {
      margin-inline: auto;
    }

    :host([inverted]) .eyebrow {
      color: var(--st-cms-highlight);
    }

    :host([inverted]) .title,
    :host([inverted]) .subtitle {
      color: inherit;
    }

    .featured-image {
      margin: 0 0 var(--st-space-48);
      border-radius: var(--st-radius-lg);
      overflow: hidden;
    }

    .featured-image img {
      width: 100%;
      height: auto;
      display: block;
    }

    figcaption {
      padding: var(--st-space-12);
      text-align: center;
      color: var(--st-color-text-muted);
      font-size: var(--st-text-xs);
    }

    st-markdown {
      color: var(--st-color-text);
      font-size: var(--st-text-xl);
    }

    :host([inverted]) st-markdown {
      color: inherit;
    }

    /* list-style="check": the check marks are navy on light pages and cyan on the dark band. */
    :host([inverted][list-style='check']) st-markdown {
      --st-markdown-list-check-color: var(--st-cms-highlight);
    }

    /* max-width="prose": a 720px reading column; the header follows the same width. */
    :host([max-width='prose']) .container {
      max-width: 720px;
    }

    .action {
      ${ctaLinkStyles}
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 52px;
      margin-top: var(--st-space-16);
      padding: 0 var(--st-space-28);
      border: 0;
      border-radius: var(--st-radius-full);
      font-size: var(--st-text-md);
      font-weight: var(--st-font-weight-semibold);
      text-decoration: none;
    }

    .action.primary {
      background: var(--st-cms-navy);
      color: var(--st-cms-on-dark);
    }

    .action.highlight {
      background: var(--st-cms-highlight);
      color: var(--st-cms-navy);
    }

    .action.light {
      background: var(--st-cms-on-dark);
      color: var(--st-cms-navy);
    }

    .action:hover {
      transform: scale(1.03);
    }

    .action:focus-visible {
      outline: var(--st-focus-ring);
      outline-offset: 2px;
    }

    :host([text-alignment='center']) .action {
      margin-inline: auto;
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--st-content-block-padding, var(--st-space-48) var(--st-space-24)) !important;
      }

      .container {
        padding: 0;
      }
    }
  `;

  /** Small uppercase label above the title (e.g. "Our story"). */
  @property({ type: String })
  eyebrow = '';

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  /** `2` (default) renders the title as `<h2>`; `3` as a smaller `<h3>` for a sub-section. */
  @property({ type: Number, attribute: 'heading-level' })
  headingLevel: 2 | 3 = 2;

  /** Alignment of the eyebrow, title, subtitle and body. `left` (default) or `center`. */
  @property({ type: String, reflect: true, attribute: 'text-alignment' })
  textAlignment: 'left' | 'center' = 'left';

  /** URL of a Markdown file. */
  @property({ type: String, attribute: 'content-src' })
  contentSrc = '';

  /** Inline Markdown, used when `content-src` is not set. */
  @property({ type: String })
  content = '';

  @property({ type: String, attribute: 'image-src' })
  imageSrc = '';

  @property({ type: String, attribute: 'image-alt' })
  imageAlt = '';

  @property({ type: String, attribute: 'image-caption' })
  imageCaption = '';

  @property({ type: Boolean, reflect: true })
  inverted = false;

  /** `default` keeps bullets; `check` shows a check mark on each bullet of the body's lists. */
  @property({ type: String, reflect: true, attribute: 'list-style' })
  listStyle: 'default' | 'check' = 'default';

  /** Label of a pill link under the body. Shown only together with `href`. */
  @property({ type: String, attribute: 'action-label' })
  actionLabel = '';

  /** Shorter `action-label` for phones (< 480px); the full label stays the accessible name. */
  @property({ type: String, attribute: 'action-label-short' })
  actionLabelShort = '';

  /** Target of the pill link under the body. */
  @property({ type: String })
  href = '';

  /** Colour of the pill link: `primary` (navy), `highlight` (cyan) or `light` (white). */
  @property({ type: String, reflect: true, attribute: 'action-variant' })
  actionVariant: 'primary' | 'highlight' | 'light' = 'primary';

  /** `none` (default) uses the full container width; `prose` limits the block to a 720px column. */
  @property({ type: String, reflect: true, attribute: 'max-width' })
  maxWidth: 'none' | 'prose' = 'none';

  private renderAction() {
    if (!this.actionLabel || !this.href) return nothing;
    const { target, rel } = externalLinkAttrs(this.href);
    const ariaLabel = ctaAriaLabel(this.actionLabel, this.actionLabelShort, isExternalHref(this.href) ? ' (opens in new tab)' : '');
    return html`<a class="action ${this.actionVariant}" part="action" href=${this.href} target=${target} rel=${rel} aria-label=${ariaLabel}
      >${renderCtaLabel(this.actionLabel, this.actionLabelShort)}${externalLinkExtras(this.href)}</a
    >`;
  }

  private renderTitle() {
    if (!this.title) return nothing;
    return this.headingLevel === 3
      ? html`<h3 class="title title-3" part="title">${this.title}</h3>`
      : html`<h2 class="title" part="title">${this.title}</h2>`;
  }

  render() {
    const hasHeader = Boolean(this.eyebrow || this.title || this.subtitle);
    return html`
      <section class="container" part="container">
        ${hasHeader
          ? html`<div class="header" part="header">
              ${this.eyebrow ? html`<p class="eyebrow" part="eyebrow">${this.eyebrow}</p>` : nothing}
              ${this.renderTitle()}
              ${this.subtitle ? html`<div class="subtitle" part="subtitle">${this.subtitle}</div>` : nothing}
            </div>`
          : nothing}
        ${this.imageSrc
          ? html`
              <figure class="featured-image" part="image">
                <img src=${this.imageSrc} alt=${this.imageAlt || this.title} />
                ${this.imageCaption ? html`<figcaption>${this.imageCaption}</figcaption>` : nothing}
              </figure>
            `
          : nothing}
        <st-markdown part="body" .src=${this.contentSrc} .content=${this.content} .listStyle=${this.listStyle}></st-markdown>
        ${this.renderAction()}
      </section>
    `;
  }
}
