import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { fontFamilyStyles } from '../shared/styles';

/**
 * A small label that shows above a control on hover and on keyboard focus. Wrap the control (a button
 * or an icon button) in it and pass the same words as its accessible name in `text`. The bubble is
 * decorative (`aria-hidden`): the control's own `aria-label` is what a screen reader announces, so the
 * words aren't read twice.
 *
 * The bubble is positioned by the wrapper, so put the tooltip where it has room above: it's not
 * clipped by the wrapper's own box, but it is clipped by an ancestor with `overflow: hidden`.
 */
@customElement('st-tooltip')
export class Tooltip extends LitElement {
  static styles = css`
    ${fontFamilyStyles}

    :host {
      position: relative;
      display: inline-flex;
    }

    .bubble {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
      padding: var(--st-space-4) var(--st-space-8);
      border-radius: var(--st-radius-xs);
      background: var(--st-color-text-strong);
      color: var(--st-color-on-solid);
      font-size: var(--st-text-xs);
      font-weight: var(--st-font-weight-medium);
      line-height: 1.3;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.12s ease;
    }

    /* Hover waits a moment, so a passing pointer doesn't flash a label; keyboard focus shows it at once. */
    :host(:hover) .bubble {
      opacity: 1;
      transition-delay: var(--st-tooltip-delay, 300ms);
    }

    :host(:focus-within) .bubble {
      opacity: 1;
      transition-delay: 0s;
    }

    @media (prefers-reduced-motion: reduce) {
      .bubble {
        transition: none;
      }
    }
  `;

  /** The words shown in the bubble: the same words as the control's accessible name. */
  @property({ type: String })
  text = '';

  render() {
    return html`<slot></slot><span class="bubble" part="bubble" aria-hidden="true">${this.text}</span>`;
  }
}
