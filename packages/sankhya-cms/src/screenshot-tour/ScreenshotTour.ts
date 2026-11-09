import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { fontFamilyStyles } from '../shared/styles';

export interface ScreenshotTourItem {
  /** Text on the tab button that selects this screen. */
  label: string;
  /** Small uppercase line above the title (e.g. "Step 2"). */
  step?: string;
  /** Heading shown under the screenshot. */
  title: string;
  /** Body text shown under the heading. */
  caption?: string;
  /** Screenshot URL. */
  src: string;
  /** Alternative text for the screenshot. */
  alt: string;
}

/**
 * A product tour: a row of tab buttons, one per screenshot, and below it the selected screenshot
 * in a framed figure with its step, title and caption. Only the selected screen is shown; the
 * others are not rendered in the document flow.
 *
 * Keyboard (on the tab row): Arrow Right/Down moves to the next tab and Arrow Left/Up to the
 * previous one, both wrapping at the ends; Home and End jump to the first and last tab. Each of
 * these moves focus to the tab and selects it. Tab and Shift+Tab move through the tabs as usual.
 * On narrow screens the tab row scrolls sideways (it never scrolls the page vertically).
 *
 * @csspart tabs - The row of tab buttons (`role="group"`).
 * @csspart tab - Each tab button. Selected tabs carry `aria-pressed="true"`.
 * @csspart figure - The `figure` holding the screenshot and its caption.
 * @csspart frame - The bordered frame around the screenshot.
 * @csspart image - The screenshot `img`.
 * @csspart caption - The `figcaption` with the text beside (or below, on narrow screens) the image.
 * @csspart step - The small eyebrow line above the title.
 * @csspart title - The screen's heading.
 * @csspart text - The caption paragraph.
 */
@customElement('st-screenshot-tour')
export class ScreenshotTour extends LitElement {
  static styles = css`
    /* fontFamilyStyles is a bare declaration: it must sit inside a rule, or it swallows the next one. */
    :host {
      ${fontFamilyStyles}
    }

    :host {
      display: block;
      box-sizing: border-box;
    }

    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 32px;
    }

    .tab {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      min-height: 44px;
      padding: 0 18px;
      border: 1px solid var(--st-cms-primary-200, #c9d7fe);
      border-radius: 9999px;
      background: var(--st-color-surface, #fff);
      color: var(--st-cms-text-strong, #011d41);
      font: inherit;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.2;
      white-space: normal;
      cursor: pointer;
      transition:
        background-color 150ms ease,
        border-color 150ms ease,
        color 150ms ease;
    }

    .tab[aria-pressed='false']:hover {
      border-color: var(--st-cms-brand-navy, #2144aa);
    }

    .tab[aria-pressed='true'] {
      background: var(--st-cms-brand-navy, #2144aa);
      border-color: var(--st-cms-brand-navy, #2144aa);
      color: #fff;
    }

    .tab:focus-visible {
      outline: var(--st-focus-ring, 2px solid #1b91dd);
      outline-offset: 2px;
    }

    .figure {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 32px;
      margin: 0;
    }

    .frame {
      flex: 999 1 560px;
      min-width: 0;
      overflow: hidden;
      background: var(--st-color-surface, #fff);
      border: 1px solid var(--st-cms-primary-100, #e4ebff);
      border-radius: 16px;
      box-shadow: 0 20px 40px -12px rgb(0 0 0 / 0.1);
    }

    .image {
      display: block;
      width: 100%;
      height: auto;
    }

    .caption {
      flex: 1 1 260px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 0;
    }

    .step {
      margin: 0;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--st-cms-eyebrow, #0c64c5);
    }

    .title {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      line-height: 1.3;
      color: var(--st-cms-text-strong, #011d41);
    }

    .text {
      margin: 0;
      font-size: 16px;
      line-height: 1.6;
      color: var(--st-cms-text, #03346b);
    }

    @media (max-width: 768px) {
      .tabs {
        flex-wrap: nowrap;
        overflow-x: auto;
        scroll-snap-type: x proximity;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
        /* Padding keeps focus rings from being clipped by the scroll box. */
        padding: 4px 2px;
        margin: -4px -2px 24px;
      }

      .tabs::-webkit-scrollbar {
        display: none;
      }

      .tab {
        flex: none;
        scroll-snap-align: start;
        white-space: nowrap;
      }

      .figure {
        flex-direction: column;
        align-items: stretch;
        gap: 20px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .tab {
        transition: none;
      }
    }
  `;

  /** The screens, in tab order. */
  @property({ attribute: false })
  items: ScreenshotTourItem[] = [];

  /** Accessible name for the tab group. */
  @property({ type: String })
  label = 'Tour screens';

  /** Index of the selected screen. Clamped to the range of `items`. */
  @state()
  private active = 0;

  /** The selected index, kept inside the range of `items`. */
  private get current(): number {
    return Math.min(Math.max(this.active, 0), Math.max(this.items.length - 1, 0));
  }

  private tabButtons(): HTMLButtonElement[] {
    return Array.from(this.renderRoot.querySelectorAll<HTMLButtonElement>('button[part="tab"]'));
  }

  private select(index: number, focus = false) {
    this.active = index;
    const tab = this.tabButtons()[index];
    if (focus) tab?.focus({ preventScroll: true });
    // Scroll only the tab row: `nearest` on both axes never moves the page itself for a visible tab.
    void this.updateComplete.then(() => {
      this.tabButtons()[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }

  private onKeydown(event: KeyboardEvent) {
    const count = this.items.length;
    if (!count) return;
    const index = this.current;
    let next: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % count;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + count) % count;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = count - 1;
    if (next === null) return;
    event.preventDefault();
    this.select(next, true);
  }

  render() {
    const index = this.current;
    const item = this.items[index];
    return html`
      <div class="tabs" part="tabs" role="group" aria-label=${this.label} @keydown=${this.onKeydown}>
        ${this.items.map(
          (tab, i) => html`<button
            type="button"
            class="tab"
            part="tab"
            aria-pressed=${i === index ? 'true' : 'false'}
            @click=${() => this.select(i)}
          >${tab.label}</button>`
        )}
      </div>
      ${item
        ? html`<figure class="figure" part="figure">
            <div class="frame" part="frame">
              <img class="image" part="image" src=${item.src} alt=${item.alt} loading="lazy" decoding="async" />
            </div>
            <figcaption class="caption" part="caption" aria-live="polite">
              ${item.step ? html`<p class="step" part="step">${item.step}</p>` : nothing}
              <h3 class="title" part="title">${item.title}</h3>
              ${item.caption ? html`<p class="text" part="text">${item.caption}</p>` : nothing}
            </figcaption>
          </figure>`
        : nothing}
    `;
  }
}
