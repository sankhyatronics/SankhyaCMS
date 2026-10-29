import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { fontFamilyStyles } from '../shared/styles';

export interface BarChartBar {
  /** Category under the bar (for example a month abbreviation). */
  label: string;
  /** Bar height in the chart's units. `null` draws a grey stub, for periods not reached yet. */
  value: number | null;
  /** The value text above the bar. Format it before passing it in (for example "5.74 L"). */
  valueLabel?: string;
  /** Highlights this bar in the lighter accent, for the current period. */
  current?: boolean;
}

export interface BarChartTick {
  /** Height of the gridline, in the chart's units. */
  value: number;
  /** Text at the left edge of the gridline, already formatted. */
  label: string;
}

/**
 * A vertical bar chart for a fixed set of categories: value labels above the bars, gridlines with
 * labels on the left, and category labels underneath. Heights scale to `max`, or to the largest
 * bar or tick when `max` is not set. Values are not formatted here: pass `valueLabel` and tick
 * labels already formatted (currency, lakh/crore), so this element stays locale-free.
 */
@customElement('st-bar-chart')
export class BarChart extends LitElement {
  static styles = css`
    ${fontFamilyStyles}

    :host {
      display: block;
      min-width: 0;
      color: var(--st-color-text-muted);
    }

    .frame {
      position: relative;
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: var(--st-space-10);
    }

    .axis {
      position: relative;
      height: var(--st-bar-chart-height, 200px);
      font-size: var(--st-text-xs);
      font-variant-numeric: tabular-nums;
    }

    .axis span {
      position: absolute;
      right: 0;
      transform: translateY(50%);
      white-space: nowrap;
    }

    .plot {
      position: relative;
      height: var(--st-bar-chart-height, 200px);
      border-bottom: 1px solid var(--st-color-border);
    }

    .grid {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .grid i {
      position: absolute;
      left: 0;
      right: 0;
      border-top: 1px dashed var(--st-color-border);
    }

    .bars {
      position: absolute;
      inset: 0;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      align-items: end;
      gap: var(--st-space-8);
    }

    .col {
      position: relative;
      height: 100%;
      min-width: 0;
    }

    /* The bar and its value label share one box, anchored to the baseline, so the label always
       sits just above the bar's top edge. */
    .stack {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .value {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 100%;
      padding-bottom: var(--st-space-4);
      text-align: center;
      font-size: var(--st-text-xs);
      font-weight: var(--st-font-weight-medium);
      white-space: nowrap;
      color: var(--st-color-text-secondary);
    }

    .bar {
      width: 100%;
      height: 100%;
      border-radius: 4px 4px 0 0;
      background: var(--st-color-accent);
      min-height: 2px;
    }

    .col[data-state='current'] .bar {
      background: color-mix(in oklch, var(--st-color-accent) 70%, #ffffff);
    }

    .col[data-state='future'] .bar {
      background: var(--st-color-subtle);
      min-height: 4px;
    }

    .col[data-state='current'] .value {
      color: var(--st-color-accent-text);
      font-weight: var(--st-font-weight-semibold);
    }

    .categories {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      gap: var(--st-space-8);
      margin-top: var(--st-space-8);
      font-size: var(--st-text-xs);
      text-align: center;
    }

    .categories .current {
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-accent-text);
    }

    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 120px;
      font-size: var(--st-text-base);
    }
  `;

  /** The bars, in order from left to right. */
  @property({ attribute: false })
  bars: BarChartBar[] = [];

  /** Optional gridlines with labels. */
  @property({ attribute: false })
  ticks: BarChartTick[] = [];

  /** The value that maps to the top of the plot. Defaults to the largest bar or tick. */
  @property({ type: Number })
  max: number | null = null;

  /** Plot height in pixels, excluding category labels. */
  @property({ type: Number, attribute: 'plot-height' })
  plotHeight = 200;

  /** Accessible name for the chart. */
  @property({ type: String, attribute: 'chart-label' })
  chartLabel = '';

  private topValue(): number {
    if (this.max !== null && this.max > 0) return this.max;
    const values = [...this.bars.map(bar => bar.value ?? 0), ...this.ticks.map(tick => tick.value)];
    return Math.max(...values, 0) || 1;
  }

  private heightPct(value: number | null): number {
    if (value === null) return 0;
    return Math.max(0, Math.min(100, (value / this.topValue()) * 100));
  }

  render() {
    if (!this.bars.length) {
      return html`<div class="empty">${this.chartLabel || nothing}</div>`;
    }
    const top = this.topValue();
    return html`
      <div class="frame" role="img" aria-label=${this.chartLabel || nothing} style="--st-bar-chart-height: ${this.plotHeight}px">
        <div class="axis" aria-hidden="true">
          ${this.ticks.map(tick => html`<span style="bottom: ${(tick.value / top) * 100}%">${tick.label}</span>`)}
        </div>
        <div class="plot">
          <div class="grid" aria-hidden="true">
            ${this.ticks.map(tick => html`<i style="bottom: ${(tick.value / top) * 100}%"></i>`)}
          </div>
          <div class="bars">
            ${this.bars.map(bar => {
              const state = bar.value === null ? 'future' : bar.current ? 'current' : 'default';
              return html`<div class="col" data-state=${state} title=${bar.valueLabel ?? bar.label}>
                <div class="stack" style="height: ${this.heightPct(bar.value)}%">
                  ${bar.valueLabel ? html`<span class="value">${bar.valueLabel}</span>` : nothing}
                  <div class="bar"></div>
                </div>
              </div>`;
            })}
          </div>
        </div>
        <div></div>
        <div class="categories" aria-hidden="true">
          ${this.bars.map(bar => html`<span class=${bar.current ? 'current' : ''}>${bar.label}</span>`)}
        </div>
      </div>
    `;
  }
}
