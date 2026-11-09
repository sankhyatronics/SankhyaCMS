import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { sectionEyebrowStyles, sectionSubtitleStyles, sectionTitleStyles, sectionHeaderStyles } from '../shared/section-styles';
import './FeatureItem';

/** Data for one tile when using the `items` property (mirrors `st-feature-item`'s properties). */
export interface FeatureItemData {
  /** Iconify name. Without it the tile has no icon tile. */
  icon?: string;
  title: string;
  description: string;
  href?: string;
  /** `full` makes the tile span every column of the grid (a wide call-out between rows). */
  span?: 'full';
}

/**
 * A titled grid of feature tiles. Tiles come from the `items` property, from slotted
 * `st-feature-item` elements, or both (slotted first). `columns` sets the grid width (default 2;
 * one column below 768px). `inverted` is passed on to the `items` tiles; slotted tiles need their
 * own `inverted` attribute.
 *
 * The header can carry an `eyebrow` (a small uppercase label above the title). The title is a
 * real `<h2>`; each tile's title is an `<h3>`. `align="center"` centres the last, incomplete row:
 * five tiles in three columns lay out as 3 + 2 centred, instead of 3 + 2 left-aligned.
 *
 * `variant="panel"` renders the `items` tiles as compact panels without icon tiles (see
 * `st-feature-item`). A tile from `items` with `span: "full"` spans every column. Slotted tiles
 * need their own `variant` attribute.
 *
 * @cssprop --st-features-section-padding - Overrides the section's padding.
 * @csspart header - The eyebrow, title and subtitle block.
 * @csspart eyebrow - The small uppercase label above the title.
 * @csspart title - The section heading (`<h2>`).
 * @csspart subtitle - The line under the title.
 * @csspart grid - The grid holding the tiles.
 */
@customElement('st-features-section')
export class FeaturesSection extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      ${fontFamilyStyles}
      /* !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         padding; override with --st-features-section-padding instead. */
      padding: var(--st-features-section-padding, var(--st-cms-section-padding) var(--st-space-24)) !important;
      background: var(--st-color-surface);
    }

    :host([inverted]) {
      background: var(--st-color-text-strong);
    }

    .container {
      max-width: var(--st-cms-container-max);
      margin: 0 auto;
    }

    .header {
      ${sectionHeaderStyles}
    }

    .eyebrow {
      ${sectionEyebrowStyles}
    }

    .title {
      ${sectionTitleStyles}
      margin: 0;
    }

    .subtitle {
      ${sectionSubtitleStyles}
      margin: 0 auto;
    }

    :host([inverted]) .eyebrow {
      color: var(--st-cms-highlight);
    }

    :host([inverted]) .title,
    :host([inverted]) .subtitle {
      color: var(--st-color-on-solid);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(var(--features-columns, 2), 1fr);
      gap: var(--st-space-32);
    }

    /* align="center": a wrapping row, so an incomplete last row is centred. Each tile takes an equal
       share of the width less the gaps. */
    .grid.center {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .grid.center > st-feature-item,
    .grid.center ::slotted(*) {
      flex: 0 0 calc((100% - (var(--features-columns, 2) - 1) * var(--st-space-32)) / var(--features-columns, 2));
      min-width: 0;
    }

    /* span: "full" on an items tile: the whole row (a flex row when align="center"). */
    .grid > st-feature-item.full {
      grid-column: 1 / -1;
    }

    .grid.center > st-feature-item.full {
      flex-basis: 100%;
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--st-features-section-padding, var(--st-space-48) var(--st-space-16)) !important;
      }

      .grid {
        grid-template-columns: 1fr;
      }

      .grid.center > st-feature-item,
      .grid.center ::slotted(*) {
        flex-basis: 100%;
      }
    }
  `;

  /** Small uppercase label above the title (e.g. "Why Sankhya"). */
  @property({ type: String })
  eyebrow = '';

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  /** Applied to every tile built from `items`. */
  @property({ type: String, attribute: 'action-label' })
  actionLabel = 'Learn more';

  @property({ type: Number })
  columns = 0;

  /** `start` (default) lays tiles out in a grid. `center` centres the last, incomplete row. */
  @property({ type: String, reflect: true })
  align: 'start' | 'center' = 'start';

  @property({ type: Boolean, reflect: true })
  inverted = false;

  /** `default` is the icon tile grid; `panel` gives the `items` tiles compact panels without icon tiles. */
  @property({ type: String, reflect: true })
  variant: 'default' | 'panel' = 'default';

  /** Tiles to render (property only). */
  @property({ attribute: false })
  items: FeatureItemData[] = [];

  render() {
    const gridStyle = this.columns ? `--features-columns: ${this.columns}` : nothing;
    return html`
      <section class="container" part="container">
        <div class="header" part="header">
          ${this.eyebrow ? html`<p class="eyebrow" part="eyebrow">${this.eyebrow}</p>` : nothing}
          ${this.title ? html`<h2 class="title" part="title">${this.title}</h2>` : nothing}
          ${this.subtitle ? html`<div class="subtitle" part="subtitle">${this.subtitle}</div>` : nothing}
        </div>
        <div class="grid ${this.align === 'center' ? 'center' : ''}" part="grid" style=${gridStyle}>
          <slot></slot>
          ${this.items.map(
            (item) => html`
              <st-feature-item
                class=${item.span === 'full' ? 'full' : ''}
                .icon=${item.icon ?? ''}
                .title=${item.title}
                .description=${item.description}
                .href=${item.href ?? ''}
                .actionLabel=${this.actionLabel}
                .variant=${this.variant}
                ?inverted=${this.inverted}
              ></st-feature-item>
            `
          )}
        </div>
      </section>
    `;
  }
}
