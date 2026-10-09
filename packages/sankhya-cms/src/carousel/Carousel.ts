import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { buttonResetStyles, controlBaseStyles } from '../shared/styles';
import { reducedMotionStyles } from '../shared/section-styles';
import type { CarouselChangeEventDetail } from './CarouselEvents';

/**
 * Cycles through its slotted children, one visible at a time, with optional autoplay, arrows and
 * dot indicators. The incoming slide slides in from the travel direction (CSS keyframes in place
 * of the source's framer-motion spring). Autoplay pauses while hovered or focused and stops when
 * the element is disconnected.
 */
@customElement('st-carousel')
export class Carousel extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    ::slotted(*) {
      display: none !important;
    }

    ::slotted([data-st-active]) {
      display: block !important;
      animation: st-carousel-in-next 0.4s ease both;
    }

    :host([data-direction='prev']) ::slotted([data-st-active]) {
      animation-name: st-carousel-in-prev;
    }

    @keyframes st-carousel-in-next {
      from {
        transform: translateX(10%);
        opacity: 0;
      }
      to {
        transform: none;
        opacity: 1;
      }
    }

    @keyframes st-carousel-in-prev {
      from {
        transform: translateX(-10%);
        opacity: 0;
      }
      to {
        transform: none;
        opacity: 1;
      }
    }

    .nav {
      ${buttonResetStyles}
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--st-size-38);
      height: var(--st-size-38);
      border-radius: var(--st-radius-circle);
      border: 1px solid var(--st-color-border);
      background: var(--st-color-surface);
      color: var(--st-color-text-strong);
      font-size: var(--st-text-xl);
      opacity: 0.8;
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    }

    .nav:hover {
      opacity: 1;
      transform: translateY(-50%) scale(1.1);
    }

    .prev {
      left: var(--st-space-12);
    }

    .next {
      right: var(--st-space-12);
    }

    .indicators {
      position: absolute;
      bottom: var(--st-space-24);
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      display: flex;
      gap: var(--st-space-12);
    }

    .dot {
      ${buttonResetStyles}
      width: var(--st-space-12);
      height: var(--st-space-12);
      padding: 0;
      border-radius: var(--st-radius-circle);
      background: var(--st-color-border-strong);
      transition:
        background 0.3s ease,
        transform 0.3s ease;
    }

    .dot:hover {
      background: var(--st-color-text-muted);
    }

    .dot.active {
      background: var(--st-color-text-strong);
      transform: scale(1.2);
    }

    ${reducedMotionStyles}
    @media (prefers-reduced-motion: reduce) {
      ::slotted([data-st-active]) {
        animation: none;
      }
    }
  `;

  @property({ type: Boolean, attribute: 'auto-play' })
  autoPlay = true;

  /** Autoplay delay in milliseconds. */
  @property({ type: Number })
  interval = 5000;

  @property({ type: Boolean, attribute: 'show-arrows' })
  showArrows = true;

  @property({ type: Boolean, attribute: 'show-indicators' })
  showIndicators = true;

  @state() private index = 0;
  @state() private count = 0;
  private paused = false;
  private timer?: ReturnType<typeof setInterval>;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', this.pause);
    this.addEventListener('mouseleave', this.resume);
    this.addEventListener('focusin', this.pause);
    this.addEventListener('focusout', this.resume);
  }

  disconnectedCallback() {
    this.stopTimer();
    this.removeEventListener('mouseenter', this.pause);
    this.removeEventListener('mouseleave', this.resume);
    this.removeEventListener('focusin', this.pause);
    this.removeEventListener('focusout', this.resume);
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('index') || changed.has('count')) this.syncSlides();
    if (changed.has('autoPlay') || changed.has('interval') || changed.has('count')) this.restartTimer();
  }

  private pause = () => {
    this.paused = true;
  };

  private resume = () => {
    this.paused = false;
  };

  private get slides(): Element[] {
    return this.shadowRoot?.querySelector('slot')?.assignedElements({ flatten: true }) ?? [];
  }

  private syncSlides() {
    this.slides.forEach((el, i) => el.toggleAttribute('data-st-active', i === this.index));
  }

  private onSlotChange() {
    this.count = this.slides.length;
    if (this.index >= this.count) this.index = 0;
    this.syncSlides();
  }

  private stopTimer() {
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
  }

  private restartTimer() {
    this.stopTimer();
    if (!this.autoPlay || this.count < 2) return;
    this.timer = setInterval(() => {
      if (!this.paused) this.go(this.index + 1, 'next');
    }, this.interval);
  }

  private go(target: number, direction: 'next' | 'prev') {
    if (this.count === 0) return;
    this.setAttribute('data-direction', direction);
    this.index = (target + this.count) % this.count;
    this.dispatchEvent(
      new CustomEvent<CarouselChangeEventDetail>('carousel-change', {
        detail: { index: this.index },
        bubbles: true,
        composed: true,
      }),
    );
    this.restartTimer();
  }

  render() {
    const multiple = this.count > 1;
    return html`
      <slot @slotchange=${this.onSlotChange}></slot>
      ${this.showArrows && multiple
        ? html`
            <button part="nav-button prev" class="nav prev" aria-label="Previous Slide" @click=${() => this.go(this.index - 1, 'prev')}>&#10094;</button>
            <button part="nav-button next" class="nav next" aria-label="Next Slide" @click=${() => this.go(this.index + 1, 'next')}>&#10095;</button>
          `
        : nothing}
      ${this.showIndicators && multiple
        ? html`<div class="indicators" part="indicators">
            ${Array.from(
              { length: this.count },
              (_, i) => html`
                <button
                  part="dot"
                  class="dot ${i === this.index ? 'active' : ''}"
                  aria-label="Go to slide ${i + 1}"
                  aria-current=${i === this.index ? 'true' : 'false'}
                  @click=${() => this.go(i, i > this.index ? 'next' : 'prev')}
                ></button>
              `,
            )}
          </div>`
        : nothing}
    `;
  }
}
