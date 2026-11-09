import { LitElement, css, html, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';

export interface FlowNode {
  label: string;
  caption?: string;
  /** `solid` (default, primary fill), `outline` (dashed accent border) or `accent` (cyan fill). */
  variant?: 'solid' | 'outline' | 'accent';
}

/**
 * A left-to-right process or architecture flow: boxes joined by arrows. Boxes come in three looks
 * (`solid`, `outline`, `accent`); the arrows are decorative (`aria-hidden`), and the list is exposed
 * as an ordered list. Below 600px the row stacks vertically and the arrows point down.
 * `inverted` puts the flow on the dark band (`--st-cms-band-dark-bg`).
 *
 * @cssprop --st-flow-padding - Overrides the block's padding.
 * @csspart flow - The ordered list of nodes.
 * @csspart node - Each step's box (a `li`'s child).
 * @csspart label - The box's label.
 * @csspart caption - The box's caption.
 * @csspart arrow - The arrow between two boxes.
 */
@customElement('st-flow')
export class Flow extends LitElement {
  static styles = css`
    ${controlBaseStyles}
    /* fontFamilyStyles is a bare declaration: it must sit inside a rule, or it swallows the next one. */
    :host {
      ${fontFamilyStyles}
    }

    :host {
      display: block;
      box-sizing: border-box;
      /* !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         padding; override with --st-flow-padding instead. */
      padding: var(--st-flow-padding, var(--st-space-40) var(--st-space-24)) !important;
      background: var(--st-color-page);
    }

    :host([inverted]) {
      background: var(--st-cms-band-dark-bg);
    }

    .flow {
      display: flex;
      align-items: stretch;
      max-width: var(--st-cms-container-max);
      margin: 0 auto;
      padding: 0;
      list-style: none;
    }

    .step {
      display: flex;
      align-items: center;
      flex: 1 1 0;
      min-width: 0;
      margin: 0;
    }

    .node {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      justify-content: center;
      gap: var(--st-space-4);
      box-sizing: border-box;
      min-width: 0;
      min-height: 84px;
      padding: var(--st-space-16) var(--st-space-20);
      border: 1.5px solid transparent;
      border-radius: var(--st-radius-lg);
      text-align: center;
      overflow-wrap: anywhere;
    }

    .label {
      margin: 0;
      font-size: var(--st-text-lg);
      font-weight: var(--st-font-weight-bold);
      line-height: 1.3;
    }

    .caption {
      margin: 0;
      font-size: var(--st-text-sm);
      line-height: 1.5;
      opacity: 0.85;
    }

    .node.solid {
      background: var(--st-button-primary-bg);
      color: var(--st-button-primary-color);
    }

    .node.outline {
      background: var(--st-color-surface);
      border-color: var(--st-color-accent);
      border-style: dashed;
      color: var(--st-color-text-strong);
    }

    .node.accent {
      background: var(--st-cms-highlight);
      color: var(--st-cms-navy);
    }

    .arrow {
      flex: 0 0 auto;
      width: 24px;
      height: 24px;
      margin: 0 var(--st-space-8);
      color: var(--st-color-text-faint);
    }

    /* inverted: outlined boxes take the cyan highlight so the dashed edge reads on navy. */
    :host([inverted]) .node.outline {
      background: transparent;
      border-color: var(--st-cms-highlight);
      color: var(--st-cms-band-dark-color);
    }

    :host([inverted]) .arrow {
      color: color-mix(in oklch, var(--st-cms-band-dark-color) 60%, transparent);
    }

    @media (max-width: 600px) {
      :host {
        padding: var(--st-flow-padding, var(--st-space-32) var(--st-space-20)) !important;
      }
      .flow {
        flex-direction: column;
      }
      .step {
        flex: 0 0 auto;
        flex-direction: column;
        align-items: stretch;
      }
      .arrow {
        align-self: center;
        transform: rotate(90deg);
        margin: var(--st-space-4) 0;
      }
    }
  `;

  /** The boxes, in order. */
  @property({ attribute: false })
  nodes: FlowNode[] = [];

  /** Accessible name for the list of steps. */
  @property({ type: String })
  label = '';

  /** Puts the flow on the dark band (`--st-cms-band-dark-bg`), which stays dark in the dark theme. */
  @property({ type: Boolean, reflect: true })
  inverted = false;

  private arrow() {
    return svg`<svg class="arrow" part="arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>`;
  }

  render() {
    const last = this.nodes.length - 1;
    return html`
      <ol class="flow" part="flow" aria-label=${this.label || nothing}>
        ${this.nodes.map(
          (node, index) => html`
            <li class="step">
              <div class="node ${node.variant ?? 'solid'}" part="node">
                <p class="label" part="label">${node.label}</p>
                ${node.caption ? html`<p class="caption" part="caption">${node.caption}</p>` : nothing}
              </div>
              ${index < last ? this.arrow() : nothing}
            </li>
          `
        )}
      </ol>
    `;
  }
}
