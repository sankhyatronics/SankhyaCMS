import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { fontFamilyStyles } from '../shared/styles';

export interface SegmentedOption {
  value: string;
  label: string;
}

/** Fired when a segment is chosen. `detail.value` is the chosen option's `value`. */
export interface SegmentChangeEventDetail {
  value: string;
}

/**
 * A row of mutually exclusive segments in a grey track, one of them lifted as white. Pass the
 * segments as `options` and the chosen one as `value`; a `segment-change` event fires on choice.
 * Keyboard: arrows move between segments, Home and End jump to the ends.
 */
@customElement('st-segmented-control')
export class SegmentedControl extends LitElement {
  static styles = css`
    ${fontFamilyStyles}

    :host {
      display: inline-flex;
      max-width: 100%;
    }

    .track {
      display: flex;
      gap: var(--st-space-2);
      padding: var(--st-space-3);
      border-radius: var(--st-radius-md);
      background: var(--st-color-subtle);
      max-width: 100%;
    }

    button {
      appearance: none;
      border: 0;
      border-radius: var(--st-radius-sm);
      padding: var(--st-space-6) var(--st-space-14);
      background: transparent;
      color: var(--st-color-text-secondary);
      font: inherit;
      font-size: var(--st-text-base);
      font-weight: var(--st-font-weight-medium);
      white-space: nowrap;
      cursor: pointer;
    }

    button[aria-checked='true'] {
      background: var(--st-color-surface);
      color: var(--st-color-text-strong);
      font-weight: var(--st-font-weight-semibold);
      box-shadow: 0 1px 2px rgba(20, 23, 31, 0.08);
    }

    button:focus-visible {
      outline: 2px solid var(--st-color-accent);
      outline-offset: 1px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  /** The segments, in order. */
  @property({ attribute: false })
  options: SegmentedOption[] = [];

  /** The chosen segment's `value`. */
  @property({ type: String, reflect: true })
  value = '';

  /** Names the group for assistive technology. */
  @property({ type: String, attribute: 'group-label' })
  groupLabel = '';

  private select(next: string) {
    if (next === this.value) return;
    this.value = next;
    this.dispatchEvent(
      new CustomEvent<SegmentChangeEventDetail>('segment-change', {
        detail: { value: next },
        bubbles: true,
        composed: true
      })
    );
  }

  private onKeydown(event: KeyboardEvent) {
    const enabled = this.options;
    if (!enabled.length) return;
    const index = enabled.findIndex(option => option.value === this.value);
    let next: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % enabled.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + enabled.length) % enabled.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = enabled.length - 1;
    if (next === null) return;
    event.preventDefault();
    this.select(enabled[next].value);
    this.renderRoot.querySelector<HTMLButtonElement>(`button[data-value="${enabled[next].value}"]`)?.focus();
  }

  render() {
    return html`<div class="track" role="radiogroup" aria-label=${this.groupLabel || nothing} @keydown=${this.onKeydown}>
      ${this.options.map(
        option => html`<button
          type="button"
          role="radio"
          data-value=${option.value}
          aria-checked=${option.value === this.value ? 'true' : 'false'}
          tabindex=${option.value === this.value ? 0 : -1}
          @click=${() => this.select(option.value)}
        >${option.label}</button>`
      )}
    </div>`;
  }
}
