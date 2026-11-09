import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { fontFamilyStyles } from '../shared/styles';

/**
 * A calendar date tile: a month band over a large day number, as used for due dates. `tone`
 * colours the month band: `default` for a neutral date, `warning` for due soon, `danger` for
 * overdue. The tile's box sits on an inner element, so an outer page's CSS reset can't remove
 * its border.
 */
@customElement('st-date-tile')
export class DateTile extends LitElement {
  static styles = css`
    ${fontFamilyStyles}

    :host {
      display: inline-flex;
      flex: none;
    }

    .tile {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 52px;
      border: 1px solid var(--st-color-border);
      border-radius: var(--st-radius-sm);
      background: var(--st-color-surface);
      overflow: hidden;
      text-align: center;
    }

    .month {
      padding: var(--st-space-3) 0;
      font-size: var(--st-text-2xs);
      font-weight: var(--st-font-weight-bold);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      background: var(--st-color-accent-subtle);
      color: var(--st-color-accent-text);
    }

    :host([tone='warning']) .month {
      background: var(--st-color-warning-subtle);
      color: var(--st-color-warning-text);
    }

    :host([tone='danger']) .month {
      background: var(--st-color-danger-subtle);
      color: var(--st-color-danger-text);
    }

    .day {
      padding: var(--st-space-6) 0 var(--st-space-8);
      font-size: var(--st-text-2xl);
      font-weight: var(--st-font-weight-bold);
      line-height: 1;
      font-variant-numeric: tabular-nums;
      color: var(--st-color-text-strong);
    }
  `;

  /** Month abbreviation shown in the band (for example "NOV"). */
  @property({ type: String })
  month = '';

  /** Day of the month (for example "11"). */
  @property({ type: String })
  day = '';

  /** Colour of the month band. */
  @property({ type: String, reflect: true })
  tone: 'default' | 'warning' | 'danger' = 'default';

  render() {
    return html`<div class="tile" part="tile"><span class="month" part="month">${this.month}</span><span class="day" part="day">${this.day}</span></div>`;
  }
}
