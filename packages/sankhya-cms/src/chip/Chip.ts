import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { fontFamilyStyles } from '../shared/styles';

/**
 * A small rounded status pill: text in the default slot, with an optional leading dot. Tones map
 * to the theme's status tokens (soft background, text colour on that background), so a chip reads
 * the same in every theme. Use `neutral` for plain labels, `accent` for the brand tint, and the
 * status tones for meaning only (success = done, warning = due soon, danger = overdue).
 *
 * The pill's box (padding, background) sits on an inner element, not on `:host`: an outer page's
 * CSS reset (Tailwind's preflight zeroes padding on every element) beats a component's `:host`
 * rules, which would leave the pill without its padding.
 */
@customElement('st-chip')
export class Chip extends LitElement {
  static styles = css`
    ${fontFamilyStyles}

    :host {
      display: inline-flex;
      max-width: 100%;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: var(--st-space-6);
      padding: var(--st-space-2) var(--st-space-10);
      border-radius: var(--st-radius-full);
      font-size: var(--st-text-sm);
      font-weight: var(--st-font-weight-medium);
      line-height: 1.4;
      white-space: nowrap;
      background: var(--st-color-subtle);
      color: var(--st-color-text-secondary);
      font-variant-numeric: tabular-nums;
    }

    :host([size='sm']) .pill {
      padding: 0 var(--st-space-8);
      font-size: var(--st-text-xs);
    }

    :host([tone='accent']) .pill {
      background: var(--st-color-accent-subtle);
      color: var(--st-color-accent-text);
    }

    :host([tone='success']) .pill {
      background: var(--st-color-success-subtle);
      color: var(--st-color-success-text);
    }

    :host([tone='warning']) .pill {
      background: var(--st-color-warning-subtle);
      color: var(--st-color-warning-text);
    }

    :host([tone='danger']) .pill {
      background: var(--st-color-danger-subtle);
      color: var(--st-color-danger-text);
    }

    /* A see-through pill for a chip on a coloured card (the blue hero): white at a low opacity, with white
       text, like the License Server's hero chips. */
    :host([translucent]) .pill {
      background: rgb(255 255 255 / 0.18);
      color: var(--st-color-on-solid);
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: var(--st-radius-circle);
      background: currentColor;
      flex: none;
    }

    :host(:not([dot])) .dot {
      display: none;
    }
  `;

  /** Colour treatment: a soft tint of the matching theme token. */
  @property({ type: String, reflect: true })
  tone: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' = 'neutral';

  /** `sm` for dense lists and table cells. */
  @property({ type: String, reflect: true })
  size: 'md' | 'sm' = 'md';

  /** A see-through white pill with white text, for a chip on a coloured card. */
  @property({ type: Boolean, reflect: true })
  translucent = false;

  /** Shows a leading dot in the chip's text colour. */
  @property({ type: Boolean, reflect: true })
  dot = false;

  render() {
    return html`<span class="pill" part="pill"><span class="dot" part="dot" aria-hidden="true"></span><slot></slot></span>`;
  }
}
