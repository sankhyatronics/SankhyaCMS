import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { fontFamilyStyles } from '../shared/styles';

/** How long a pointer must rest on the control before its label shows. Keyboard focus shows it at once. */
const HOVER_DELAY_MS = 300;

/**
 * A small label that shows above a control: after a short rest on hover, and at once on keyboard focus.
 * Wrap the control (a button or an icon button) in it and pass the same words as its accessible name in
 * `text`. The control is still the thing that's announced; the bubble is decorative (`aria-hidden`), so the
 * words aren't read twice.
 *
 * The bubble is `position: fixed` and placed from the wrapper's position when it shows, so a clipping
 * ancestor (a card or panel with `overflow: hidden`) can't cut it off. It shows around a control that
 * can't act right now too, as long as that control is focusable or hoverable (use `aria-disabled`, not
 * the native `disabled`, which takes a control out of focus and pointer events).
 */
@customElement('st-tooltip')
export class Tooltip extends LitElement {
  static styles = css`
    ${fontFamilyStyles}

    :host {
      display: inline-flex;
    }

    .bubble {
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      transform: translate(-50%, calc(-100% - 6px));
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
      visibility: hidden;
      transition: opacity 0.12s ease;
    }

    .bubble[data-open] {
      opacity: 1;
      visibility: visible;
    }

    @media (prefers-reduced-motion: reduce) {
      .bubble {
        transition: none;
      }
    }
  `;

  /** The words shown in the bubble: the same words as the control's accessible name, or the reason the
   * control can't act right now. */
  @property({ type: String })
  text = '';

  private bubble?: HTMLElement;
  private timer?: number;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('pointerenter', this.onPointerEnter);
    this.addEventListener('pointerleave', this.hide);
    this.addEventListener('focusin', this.show);
    this.addEventListener('focusout', this.hide);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('pointerenter', this.onPointerEnter);
    this.removeEventListener('pointerleave', this.hide);
    this.removeEventListener('focusin', this.show);
    this.removeEventListener('focusout', this.hide);
    this.cancel();
  }

  firstUpdated() {
    this.bubble = this.renderRoot.querySelector<HTMLElement>('.bubble') ?? undefined;
  }

  private onPointerEnter = () => {
    this.cancel();
    this.timer = window.setTimeout(this.show, HOVER_DELAY_MS);
  };

  private cancel() {
    if (this.timer !== undefined) window.clearTimeout(this.timer);
    this.timer = undefined;
  }

  private show = () => {
    this.cancel();
    if (!this.bubble || !this.text) return;
    const box = this.getBoundingClientRect();
    this.bubble.style.left = `${box.left + box.width / 2}px`;
    this.bubble.style.top = `${box.top}px`;
    this.bubble.setAttribute('data-open', '');
  };

  private hide = () => {
    this.cancel();
    this.bubble?.removeAttribute('data-open');
  };

  render() {
    return html`<slot></slot><span class="bubble" part="bubble" aria-hidden="true">${this.text}</span>`;
  }
}
