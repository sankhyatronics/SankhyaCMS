import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { sectionSubtitleStyles, sectionTitleStyles, sectionHeaderStyles } from '../shared/section-styles';
import '../markdown';

/**
 * A long-form article section: centered title/subtitle, an optional featured image with caption,
 * then Markdown body text. Ports `SankhyaUI`'s React `ContentBlock`. The body comes from
 * `content-src` (a Markdown URL, as in the source) or an inline `content` string (added so the
 * block works without a fetch); `content-src` wins when both are set.
 */
@customElement('st-content-block')
export class ContentBlock extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      ${fontFamilyStyles}
      padding: var(--st-space-24);
      background: var(--st-color-surface);
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
    }

    .header {
      ${sectionHeaderStyles}
    }

    .title {
      ${sectionTitleStyles}
      line-height: 1.1;
    }

    .subtitle {
      ${sectionSubtitleStyles}
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

    @media (max-width: 768px) {
      :host {
        padding: var(--st-space-48) var(--st-space-24);
      }

      .container {
        padding: 0;
      }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

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

  render() {
    return html`
      <section class="container" part="container">
        <div class="header" part="header">
          ${this.title ? html`<div class="title" part="title">${this.title}</div>` : nothing}
          ${this.subtitle ? html`<div class="subtitle" part="subtitle">${this.subtitle}</div>` : nothing}
        </div>
        ${this.imageSrc
          ? html`
              <figure class="featured-image" part="image">
                <img src=${this.imageSrc} alt=${this.imageAlt || this.title} />
                ${this.imageCaption ? html`<figcaption>${this.imageCaption}</figcaption>` : nothing}
              </figure>
            `
          : nothing}
        <st-markdown part="body" .src=${this.contentSrc} .content=${this.content}></st-markdown>
      </section>
    `;
  }
}
