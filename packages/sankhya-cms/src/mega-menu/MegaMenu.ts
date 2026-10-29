import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';

/**
 * The rich layout of a mega-menu panel, after okta.com: an optional intro column on the left (a
 * large `heading`, a `description` and, under a divider, quick links in `slot="intro"`), then the
 * link columns side by side (`st-mega-menu-column`s in the default slot), then an optional
 * featured column on the right (`featured-heading` over the `st-mega-menu-feature` cards in
 * `slot="featured"`). Slot it into an `st-dropdown` with `mega` set.
 *
 * The layout follows the width it is given, not the viewport (a container query): side by side
 * when there is room; intro and featured column above/below two link columns on a medium panel;
 * everything stacked in the narrow drill-down panel `st-header` shows on a phone (where the intro
 * heading is left out — the drill-down already shows the section's name).
 *
 * @slot - The link columns (`st-mega-menu-column`s, or any blocks).
 * @slot intro - Quick links under the intro text, e.g. `st-menu-item`s with an icon.
 * @slot featured - Promo cards (`st-mega-menu-feature`s), stacked.
 * @csspart inner - The grid holding every area.
 * @csspart intro - The intro column.
 * @csspart columns - The grid holding the link columns.
 * @csspart featured - The featured column.
 */
@customElement('st-mega-menu')
export class MegaMenu extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      container-type: inline-size;
      ${fontFamilyStyles}
    }

    .inner {
      display: grid;
      gap: 3rem;
      padding: 3rem 3.5rem;
      box-sizing: border-box;
    }

    .columns {
      display: grid;
      grid-template-columns: repeat(var(--st-mega-menu-columns, 3), minmax(0, 1fr));
      gap: 3rem;
      align-items: stretch;
    }

    .intro,
    .featured {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .intro-heading {
      margin: 0 0 1rem;
      font-size: 2rem;
      font-weight: 400;
      line-height: 1.15;
      color: var(--st-color-text-strong);
    }

    .intro-description {
      margin: 0;
      font-size: 1rem;
      line-height: 1.55;
      color: var(--st-color-text);
    }

    .intro-links {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: 2.5rem;
      padding-top: 2rem;
      border-top: 1px solid var(--st-color-border);
    }

    .intro-links.no-text {
      margin-top: 0;
      padding-top: 0;
      border-top: 0;
    }

    .featured-heading {
      margin: 0 0 1rem;
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1.35;
      color: var(--st-color-text-strong);
    }

    .featured-items {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    [hidden] {
      display: none !important;
    }

    /* Medium panel: intro on top, two link columns, featured cards side by side underneath. */
    @container (max-width: 960px) {
      .inner {
        grid-template-columns: minmax(0, 1fr) !important;
        gap: 2rem;
        padding: 2rem;
      }

      .columns {
        grid-template-columns: repeat(var(--st-mega-menu-columns-md, 2), minmax(0, 1fr));
        gap: 2rem;
      }

      .intro-links {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
      }

      .featured-items {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      }
    }

    /* Narrow panel (the phone drill-down): everything stacked. */
    @container (max-width: 560px) {
      .inner {
        gap: 1.75rem;
        padding: 0.5rem 0 1.5rem;
      }

      .columns {
        grid-template-columns: minmax(0, 1fr);
        gap: 1.75rem;
      }

      .intro-heading {
        display: none;
      }
    }
  `;

  /** Large title of the intro column. */
  @property({ type: String })
  heading = '';

  /** Text under the intro title. */
  @property({ type: String })
  description = '';

  /** Heading over the featured cards. */
  @property({ type: String, attribute: 'featured-heading' })
  featuredHeading = '';

  /** Number of link columns side by side at full width. `0` (the default) uses one per slotted column. */
  @property({ type: Number })
  columns = 0;

  @state() private columnCount = 1;
  @state() private hasIntroLinks = false;
  @state() private hasFeatured = false;

  private onColumnsSlotChange = (event: Event): void => {
    this.columnCount = Math.max(1, (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length);
  };

  private onIntroSlotChange = (event: Event): void => {
    this.hasIntroLinks = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
  };

  private onFeaturedSlotChange = (event: Event): void => {
    this.hasFeatured = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
  };

  render() {
    const columns = Math.min(6, Math.max(1, Math.round(this.columns) || this.columnCount));
    const hasIntroText = !!(this.heading || this.description);
    const hasIntro = hasIntroText || this.hasIntroLinks;
    const hasFeatured = this.hasFeatured || !!this.featuredHeading;
    // Every column — intro, each link column, featured — gets the same share of the width.
    const tracks = [hasIntro ? 'minmax(0, 1fr)' : '', `minmax(0, ${columns}fr)`, hasFeatured ? 'minmax(0, 1fr)' : '']
      .filter(Boolean)
      .join(' ');
    return html`
      <div
        part="inner"
        class="inner"
        style="grid-template-columns:${tracks};--st-mega-menu-columns:${columns};--st-mega-menu-columns-md:${Math.min(2, columns)}"
      >
        <div part="intro" class="intro" ?hidden=${!hasIntro}>
          ${this.heading ? html`<p part="heading" class="intro-heading">${this.heading}</p>` : nothing}
          ${this.description ? html`<p part="description" class="intro-description">${this.description}</p>` : nothing}
          <div part="intro-links" class="intro-links ${hasIntroText ? '' : 'no-text'}" ?hidden=${!this.hasIntroLinks}>
            <slot name="intro" @slotchange=${this.onIntroSlotChange}></slot>
          </div>
        </div>
        <div part="columns" class="columns"><slot @slotchange=${this.onColumnsSlotChange}></slot></div>
        <div part="featured" class="featured" ?hidden=${!hasFeatured}>
          ${this.featuredHeading ? html`<p part="featured-heading" class="featured-heading">${this.featuredHeading}</p>` : nothing}
          <div class="featured-items"><slot name="featured" @slotchange=${this.onFeaturedSlotChange}></slot></div>
        </div>
      </div>
    `;
  }
}
