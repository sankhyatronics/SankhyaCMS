import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { fontFamilyStyles } from '../shared/styles';

/**
 * A tinted panel that calls out the most serious item needing action: an icon, a title, a line of
 * detail and an action link. `tone` picks the colour: `warning` (amber) for things due soon,
 * `danger` (red) for overdue or failing items, `accent` (blue) for set-up tips.
 *
 * Slots: `icon` (a glyph beside the title), default (the detail text), `action` (a link or button).
 */
@customElement('st-attention-panel')
export class AttentionPanel extends LitElement {
  static styles = css`
    ${fontFamilyStyles}

    :host {
      display: flex;
      align-items: flex-start;
      gap: var(--st-space-12);
      padding: var(--st-space-16);
      border-radius: var(--st-radius-md);
      background: var(--st-color-accent-subtle);
      color: var(--st-color-text);
    }

    :host([tone='warning']) {
      background: var(--st-color-warning-subtle);
    }

    :host([tone='danger']) {
      background: var(--st-color-danger-subtle);
    }

    .icon {
      display: inline-grid;
      place-items: center;
      width: 32px;
      height: 32px;
      border-radius: var(--st-radius-sm);
      background: var(--st-color-surface);
      flex: none;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-4);
      min-width: 0;
      flex: 1;
    }

    .title {
      margin: 0;
      font-size: var(--st-text-lg);
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
    }

    .detail {
      font-size: var(--st-text-base);
      line-height: 1.5;
      color: var(--st-color-text-secondary);
    }

    .action {
      margin-top: var(--st-space-6);
      font-size: var(--st-text-base);
      font-weight: var(--st-font-weight-semibold);
    }

    :host([tone='warning']) .action {
      color: var(--st-color-warning-text);
    }

    :host([tone='danger']) .action {
      color: var(--st-color-danger-text);
    }

    :host([tone='accent']) .action {
      color: var(--st-color-accent-text);
    }

    .action:empty {
      display: none;
    }

    .icon:empty {
      display: none;
    }
  `;

  /** Colour of the panel: `accent` for tips, `warning` for due soon, `danger` for overdue. */
  @property({ type: String, reflect: true })
  tone: 'accent' | 'warning' | 'danger' = 'accent';

  /** Bold line at the top of the panel. */
  @property({ type: String })
  heading = '';

  render() {
    return html`
      <span class="icon" part="icon"><slot name="icon"></slot></span>
      <div class="body">
        <p class="title" part="title">${this.heading}</p>
        <div class="detail" part="detail"><slot></slot></div>
        <div class="action" part="action"><slot name="action"></slot></div>
      </div>
    `;
  }
}
