import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { buttonResetStyles, controlBaseStyles } from '../shared/styles';
import { reducedMotionStyles } from '../shared/section-styles';
import type { CarouselChangeEventDetail } from './CarouselEvents';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Cycles through its slotted children, one visible at a time, with optional autoplay, arrows and
 * dot indicators. The incoming slide slides in from the travel direction (CSS keyframes in place
 * of the source's framer-motion spring), or fades in with `transition="fade"`. Autoplay pauses
 * while hovered (unless `pause-on-hover` is turned off, e.g. for a full-screen hero the pointer
 * nearly always rests on) or focused, and stops when the element is disconnected; a paused slide
 * keeps the time it had left. Under `prefers-reduced-motion: reduce` autoplay starts paused; the
 * tabs' play button still starts it.
 *
 * `indicator-style="tabs"` replaces the dots with a row of labelled tabs along the bottom, each
 * with a progress bar that fills while its slide is showing, plus a pause button — the tabbed hero
 * carousel layout (put `st-hero`s in it). Tab labels come from `tab-labels`, else each slide's
 * `data-tab-label` attribute, else its `title`.
 *
 * @fires carousel-change - Detail `{ index }`, when the visible slide changes.
 * @cssprop --st-carousel-tab-color - Tab text and progress colour (default: light, for slides with a dark image).
 * @cssprop --st-carousel-tabs-space - Room kept free under each slide's content for the tabs (default `6rem`).
 * @csspart tabs - The tab row.
 * @csspart tab - One tab button.
 * @csspart progress - A tab's progress bar.
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
      box-sizing: border-box;
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }

    /* The slides sit in a clipping viewport and each is exactly the carousel's width, so the next
       slide never shows at the edge; the slide animations move inside the viewport. */
    .viewport {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    ::slotted([data-st-active]) {
      display: block !important;
    }

    /* data-st-still (set on the first slide until the first change) keeps the entrance off on first
       paint, so the copy is there at once; later changes animate. */
    ::slotted([data-st-active]:not([data-st-still])) {
      animation: st-carousel-in-next 0.4s ease both;
    }

    :host([data-direction='prev']) ::slotted([data-st-active]:not([data-st-still])) {
      animation-name: st-carousel-in-prev;
    }

    :host([transition='fade']) ::slotted([data-st-active]:not([data-st-still])),
    :host([transition='fade'][data-direction]) ::slotted([data-st-active]:not([data-st-still])) {
      animation: st-carousel-fade 0.7s ease both;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
      border: 0;
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

    @keyframes st-carousel-fade {
      from {
        opacity: 0;
      }
      to {
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

    /* ---- indicator-style="tabs" ---- */

    :host([indicator-style='tabs']) ::slotted(*) {
      padding-bottom: var(--st-carousel-tabs-space, 6rem);
    }

    .tabs {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      color: var(--st-carousel-tab-color, var(--st-color-on-solid));
    }

    .tabs-inner {
      display: flex;
      align-items: flex-start;
      gap: var(--st-space-24);
      max-width: var(--st-cms-container-max);
      margin: 0 auto;
      box-sizing: border-box;
      padding: 0 var(--st-space-24) var(--st-space-24);
    }

    .tablist {
      flex: 1;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(0, 1fr);
      gap: var(--st-space-24);
    }

    .tab {
      ${buttonResetStyles}
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--st-space-12);
      padding: var(--st-space-12) 0;
      color: inherit;
      text-align: left;
      font-size: var(--st-text-base);
      font-weight: var(--st-font-weight-semibold);
      line-height: 1.3;
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }

    .tab:hover,
    .tab.active {
      opacity: 1;
    }

    .tab:focus-visible,
    .play:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 4px;
    }

    /* Touch targets: the tab and the pause button keep their look; a pseudo-element extends the tap
       area to at least 44x44 CSS px. */
    .tab::after,
    .play::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: max(100%, 44px);
      height: max(100%, 44px);
      transform: translate(-50%, -50%);
    }

    .progress {
      position: relative;
      display: block;
      height: 3px;
      border-radius: 2px;
      overflow: hidden;
      background: color-mix(in oklch, currentColor 30%, transparent);
    }

    .fill {
      position: absolute;
      inset: 0;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left center;
    }

    .tab.active .fill {
      transform: scaleX(1);
    }

    .tab.active.running .fill {
      animation: st-carousel-progress var(--st-carousel-interval, 5000ms) linear both;
    }

    :host([data-paused]) .tab.active.running .fill {
      animation-play-state: paused;
    }

    @keyframes st-carousel-progress {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }

    .play {
      ${buttonResetStyles}
      position: relative;
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--st-size-32);
      height: var(--st-size-32);
      margin-top: var(--st-space-4);
      border-radius: var(--st-radius-circle);
      color: inherit;
      box-shadow: inset 0 0 0 1.5px color-mix(in oklch, currentColor 60%, transparent);
    }

    .play:hover {
      background: color-mix(in oklch, currentColor 15%, transparent);
    }

    .tab-current {
      display: none;
    }

    @media (max-width: 768px) {
      .tablist {
        gap: var(--st-space-8);
      }

      .tab-label {
        display: none;
      }

      .tab-current {
        display: block;
        margin: 0 0 var(--st-space-4);
        font-size: var(--st-text-base);
        font-weight: var(--st-font-weight-semibold);
      }

      .tabs-inner {
        flex-wrap: wrap;
        align-items: center;
      }
    }

    @media (min-width: 1024px) {
      .tabs-inner {
        padding: 0 var(--st-space-32) var(--st-space-32);
      }
    }

    ${reducedMotionStyles}
    @media (prefers-reduced-motion: reduce) {
      ::slotted([data-st-active]) {
        animation: none !important;
      }
      .tab.active.running .fill {
        animation: none;
      }
    }
  `;

  @property({ type: Boolean, attribute: 'auto-play' })
  autoPlay = true;

  /** Autoplay delay in milliseconds. */
  @property({ type: Number })
  interval = 5000;

  /** Pause autoplay while the pointer is over the carousel. Turn off for a hero that fills the
   * screen; the tabs' pause button and keyboard focus still pause it. */
  @property({ type: Boolean, attribute: 'pause-on-hover' })
  pauseOnHover = true;

  @property({ type: Boolean, attribute: 'show-arrows' })
  showArrows = true;

  @property({ type: Boolean, attribute: 'show-indicators' })
  showIndicators = true;

  /** `dots` (default) or `tabs`: labelled tabs with progress bars along the bottom. */
  @property({ type: String, reflect: true, attribute: 'indicator-style' })
  indicatorStyle: 'dots' | 'tabs' = 'dots';

  /** `slide` (default) or `fade`. */
  @property({ type: String, reflect: true })
  transition: 'slide' | 'fade' = 'slide';

  /** Tab labels, one per slide, for `indicator-style="tabs"`. Missing entries fall back to the slide's `data-tab-label`, then its `title`. */
  @property({ attribute: false })
  tabLabels: string[] = [];

  @state() private index = 0;
  @state() private count = 0;
  @state() private slideLabels: string[] = [];
  /** Paused with the pause button; stays paused until the button is pressed again. */
  @state() private userPaused = false;
  /** Pointer is over the carousel (only counts with `pause-on-hover`). */
  @state() private hovered = false;
  /** Focus is inside the carousel, other than the play button. */
  @state() private focused = false;
  /** False until the slides first change: the first slide is on screen at first paint and does not animate. */
  @state() private turned = false;
  private timer?: ReturnType<typeof setTimeout>;
  /** Time left on the current slide, so a pause resumes where it stopped. */
  private remaining = 0;
  private startedAt = 0;
  private reducedMotion?: MediaQueryList;

  private onReducedMotionChange = (event: MediaQueryListEvent) => {
    if (event.matches) this.hold(() => (this.userPaused = true));
  };

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'region');
    this.setAttribute('aria-roledescription', 'carousel');
    // Visitors who ask for reduced motion get a still carousel: autoplay starts paused (the play
    // button still starts it), and turning the OS setting on later pauses it too.
    this.reducedMotion = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(REDUCED_MOTION_QUERY) : undefined;
    if (this.reducedMotion?.matches) this.hold(() => (this.userPaused = true));
    this.reducedMotion?.addEventListener('change', this.onReducedMotionChange);
    this.addEventListener('mouseenter', this.onPointerEnter);
    this.addEventListener('mouseleave', this.onPointerLeave);
    this.addEventListener('focusin', this.onFocusIn);
    this.addEventListener('focusout', this.onFocusOut);
  }

  disconnectedCallback() {
    this.stopTimer();
    this.reducedMotion?.removeEventListener('change', this.onReducedMotionChange);
    this.reducedMotion = undefined;
    this.removeEventListener('mouseenter', this.onPointerEnter);
    this.removeEventListener('mouseleave', this.onPointerLeave);
    this.removeEventListener('focusin', this.onFocusIn);
    this.removeEventListener('focusout', this.onFocusOut);
    super.disconnectedCallback();
  }

  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has('interval')) this.style.setProperty('--st-carousel-interval', `${this.interval}ms`);
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('index') || changed.has('count') || changed.has('indicatorStyle') || changed.has('tabLabels') || changed.has('turned')) this.syncSlides();
    if (changed.has('autoPlay') || changed.has('interval') || changed.has('count')) this.restartTimer();
  }

  private get halted(): boolean {
    return this.hovered || this.focused || this.userPaused;
  }

  /** Applies a pause-state change, freezing or resuming the timer (and the tab progress bar). */
  private hold(update: () => void) {
    const was = this.halted;
    update();
    const now = this.halted;
    if (was === now) return;
    this.toggleAttribute('data-paused', now);
    if (now) {
      if (this.timer !== undefined) this.remaining -= performance.now() - this.startedAt;
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  private onPointerEnter = () => {
    if (this.pauseOnHover) this.hold(() => (this.hovered = true));
  };

  private onPointerLeave = () => this.hold(() => (this.hovered = false));

  /** Focus inside the carousel pauses it (WCAG 2.2.2), but focusing the play button does not, so pressing play starts it. */
  private onFocusIn = (event: FocusEvent) => {
    const target = event.composedPath()[0];
    const onPlay = target instanceof Element && target.classList.contains('play');
    this.hold(() => (this.focused = !onPlay));
  };

  private onFocusOut = () => this.hold(() => (this.focused = false));

  private togglePlay = () =>
    this.hold(() => {
      this.userPaused = !this.userPaused;
      // A press while the pointer rests on the carousel starts it; hover pausing applies again on re-entry.
      this.hovered = false;
    });

  private get slides(): Element[] {
    return this.shadowRoot?.querySelector('slot')?.assignedElements({ flatten: true }) ?? [];
  }

  private labelFor(i: number): string {
    return this.tabLabels[i] || this.slideLabels[i] || `Slide ${i + 1}`;
  }

  private syncSlides() {
    const slides = this.slides;
    slides.forEach((el, i) => {
      const active = i === this.index;
      el.toggleAttribute('data-st-active', active);
      el.toggleAttribute('data-st-still', active && !this.turned);
      el.setAttribute('role', 'group');
      el.setAttribute('aria-roledescription', 'slide');
      el.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
    });
  }

  private onSlotChange() {
    const slides = this.slides;
    this.count = slides.length;
    this.slideLabels = slides.map(el => (el as HTMLElement).dataset.tabLabel || (el as HTMLElement).title || '');
    if (this.index >= this.count) this.index = 0;
    this.preloadImage(slides[0]);
    this.syncSlides();
  }

  /**
   * The first slide's image is the one visitors see first, so it is preloaded at high priority. The
   * other slides are display:none (their CSS backgrounds are not fetched) until they are shown.
   */
  private preloadImage(slide?: Element) {
    const src = (slide as (Element & { imageSrc?: string }) | undefined)?.imageSrc || slide?.getAttribute('image-src');
    if (!src) return;
    const preloaded = Array.from(document.head.querySelectorAll('link[rel="preload"]')).some(link => link.getAttribute('href') === src);
    if (preloaded) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.setAttribute('fetchpriority', 'high');
    document.head.append(link);
  }

  private stopTimer() {
    if (this.timer !== undefined) clearTimeout(this.timer);
    this.timer = undefined;
  }

  private startTimer() {
    this.stopTimer();
    if (!this.autoPlay || this.count < 2 || this.halted) return;
    this.startedAt = performance.now();
    this.timer = setTimeout(() => this.go(this.index + 1, 'next'), Math.max(0, this.remaining));
  }

  private restartTimer() {
    this.remaining = this.interval;
    this.startTimer();
  }

  private go(target: number, direction: 'next' | 'prev') {
    if (this.count === 0) return;
    this.turned = true;
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

  private onTabKeydown(event: KeyboardEvent) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    let target: number | undefined;
    if (step !== undefined) target = this.index + step;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = this.count - 1;
    if (target === undefined) return;
    event.preventDefault();
    this.go(target, step === -1 || target < this.index ? 'prev' : 'next');
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>('.tab.active')?.focus());
  }

  private renderTabs() {
    const running = this.autoPlay && this.count > 1;
    return html`<div class="tabs" part="tabs">
      <div class="tabs-inner">
        <p class="tab-current" aria-hidden="true">${this.labelFor(this.index)}</p>
        <div class="tablist" role="tablist" aria-label="Slides" @keydown=${this.onTabKeydown}>
          ${Array.from({ length: this.count }, (_, i) => {
            const active = i === this.index;
            return html`
              <button
                part="tab"
                type="button"
                role="tab"
                aria-label=${this.labelFor(i)}
                class="tab ${active ? 'active' : ''} ${running ? 'running' : ''}"
                aria-selected=${active ? 'true' : 'false'}
                tabindex=${active ? 0 : -1}
                @click=${() => active || this.go(i, i > this.index ? 'next' : 'prev')}
              >
                <span class="progress" part="progress"><span class="fill"></span></span>
                <span class="tab-label">${this.labelFor(i)}</span>
              </button>
            `;
          })}
        </div>
        ${running
          ? html`<button
              part="play-button"
              type="button"
              class="play"
              aria-label=${this.userPaused ? 'Play slides' : 'Pause slides'}
              @click=${this.togglePlay}
            >
              ${this.userPaused
                ? html`<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>`
                : html`<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" /></svg>`}
            </button>`
          : nothing}
      </div>
    </div>`;
  }

  private renderDots() {
    return html`<div class="indicators" part="indicators">
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
    </div>`;
  }

  render() {
    const multiple = this.count > 1;
    return html`
      <div class="viewport" part="viewport">
        <slot @slotchange=${this.onSlotChange}></slot>
      </div>
      ${multiple
        ? html`<div class="sr-only" aria-live=${this.halted ? 'polite' : 'off'} aria-atomic="true">${this.index + 1} of ${this.count}</div>`
        : nothing}
      ${this.showArrows && multiple
        ? html`
            <button part="nav-button prev" class="nav prev" aria-label="Previous Slide" @click=${() => this.go(this.index - 1, 'prev')}>&#10094;</button>
            <button part="nav-button next" class="nav next" aria-label="Next Slide" @click=${() => this.go(this.index + 1, 'next')}>&#10095;</button>
          `
        : nothing}
      ${this.showIndicators && multiple ? (this.indicatorStyle === 'tabs' ? this.renderTabs() : this.renderDots()) : nothing}
    `;
  }
}
