import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles } from '../shared/styles';

/**
 * A responsive grid of `st-menu-grid-item`s — the "rich" nav-menu layout (icon + title +
 * description per entry, arranged in columns), typically slotted into `st-dropdown`'s default
 * slot. A 1:1 port of `SankhyaUI`'s React `MenuGrid` (`SankhyaCMS/SankhyaUI/src/components/Menu`):
 * same markup (`.menu-grid-container` > `.menu-grid.columns-N`), gap and breakpoints (768px: 2–4
 * columns → 2; 480px: everything → 1; a 1-column grid stays 1).
 */
@customElement('st-menu-grid')
export class MenuGrid extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
    }

    .menu-grid-container {
      width: 100%;
    }

    .menu-grid {
      display: grid;
      gap: 12px;
    }

    .menu-grid.columns-1 {
      grid-template-columns: repeat(1, 1fr);
    }

    .menu-grid.columns-2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .menu-grid.columns-3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .menu-grid.columns-4 {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 768px) {
      .menu-grid.columns-2,
      .menu-grid.columns-3,
      .menu-grid.columns-4 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .menu-grid.columns-1,
      .menu-grid.columns-2,
      .menu-grid.columns-3,
      .menu-grid.columns-4 {
        grid-template-columns: 1fr;
      }
    }
  `;

  /** Number of columns at full width (1–4, same as the source component's `columns-N` classes). */
  @property({ type: Number })
  columns = 3;

  /** Extra class(es) appended to the inner grid element — the source component's `gridClassName`.
   * Its outer `className` is the host element itself here: set a `class` attribute on `st-menu-grid`. */
  @property({ type: String, attribute: 'grid-class-name' })
  gridClassName = '';

  render() {
    const columns = Math.min(4, Math.max(1, Math.round(this.columns) || 1));
    return html`
      <div class="menu-grid-container" part="container">
        <div part="grid" class="menu-grid columns-${columns} ${this.gridClassName}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
