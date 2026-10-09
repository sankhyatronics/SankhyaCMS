import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import type { MenuItemSelectEventDetail } from './MenuItemEvents';

/**
 * A single flat nav row — icon (`slot="icon"`) + title + badge on one line, an optional
 * description below — as opposed to `st-menu-grid-item`'s card for a multi-column grid. A 1:1
 * port of `SankhyaUI`'s React `MenuItem` (`SankhyaCMS/SankhyaUI/src/components/Menu`): same
 * markup and CSS, with its `motion` effects redone in CSS — nudges right and scales to 1.01 on
 * hover / 0.99 while pressed, the icon tilts on hover, the badge pops in, the description fades
 * in. Colors come from the suite theme rather than per-item utility classes.
 *
 * Renders a real `<a href>` but fires a *cancelable* `menu-item-select` event (detail: `{ href }`)
 * before navigating — a host doing client-side routing calls `event.preventDefault()` on it (the
 * source used react-router's `Link` here; the suite apps have no router).
 */
@customElement('st-menu-item')
export class MenuItem extends LitElement {
  /** `focus()` on the element focuses its link, so `st-dropdown` can arrow-key between items. */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      ${fontFamilyStyles}
    }

    @keyframes st-menu-item-badge-pop {
      from {
        transform: scale(0);
      }
      70% {
        transform: scale(1.12);
      }
      to {
        transform: scale(1);
      }
    }

    @keyframes st-menu-item-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .menu-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      font-size: 0.875rem;
      text-decoration: none;
      color: var(--st-color-text);
      border-radius: 6px;
      /* The source's 'all 0.15s', minus visibility: animating the visibility this link inherits
         from a dropdown panel kept it unfocusable for a frame after the panel opened. */
      transition-property: background-color, color, padding, transform, border-color;
      transition-duration: 0.15s;
      transition-timing-function: ease;
      box-sizing: border-box;
    }

    /* The source's hover nudge (x: 4px) is done with padding, not a transform: a transform would
       spill past a scrolling panel's edge (st-source-bar's menus) and show a horizontal scrollbar.
       Keyboard focus gets the same treatment as hover. */
    .menu-item:hover,
    .menu-item:focus-visible {
      background: var(--st-color-hover);
      color: var(--st-color-text-strong);
      padding-left: 20px;
      transition-duration: 0.1s;
    }

    .menu-item.compact:hover,
    .menu-item.compact:focus-visible {
      padding-left: 16px;
    }

    .menu-item:active {
      transform: scale(0.99);
      transition-duration: 0.1s;
    }

    .menu-item.active {
      background-color: var(--st-color-accent-subtle);
      color: var(--st-color-accent-text);
      border-left: 4px solid var(--st-color-accent);
    }

    .menu-item-icon {
      display: flex;
      flex-shrink: 0;
      margin-top: 2px;
      transition: transform 0.2s ease;
    }

    .menu-item-icon:hover {
      transform: rotate(5deg);
    }

    .menu-item-icon[hidden] {
      display: none;
    }

    .menu-item-icon ::slotted(*) {
      width: 16px;
      height: 16px;
    }

    .menu-item-content {
      flex: 1;
      min-width: 0;
    }

    .menu-item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .menu-item-title {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .menu-item-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 9999px;
      flex-shrink: 0;
      background: var(--st-color-accent-subtle);
      color: var(--st-color-accent-text);
      animation: st-menu-item-badge-pop 0.35s ease-out;
    }

    .menu-item-description {
      display: -webkit-box;
      margin: 4px 0 0;
      font-size: 0.75rem;
      color: var(--st-color-text-muted);
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
      animation: st-menu-item-fade-in 0.2s ease;
    }

    .menu-item.compact {
      padding: 8px 12px;
      gap: 8px;
    }

    .menu-item.compact .menu-item-icon ::slotted(*) {
      width: 14px;
      height: 14px;
    }

    .menu-item.compact .menu-item-title {
      font-size: 0.75rem;
    }

    .menu-item.compact .menu-item-description {
      font-size: 0.75rem;
    }

    .menu-item.no-description {
      align-items: center;
    }

    .menu-item.no-description .menu-item-icon {
      margin-top: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .menu-item,
      .menu-item-icon {
        transition: none;
      }

      .menu-item:active,
      .menu-item-icon:hover {
        transform: none;
      }

      .menu-item-badge,
      .menu-item-description {
        animation: none;
      }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  href = '';

  @property({ type: String })
  description = '';

  /** Small trailing label, e.g. a count or "New"/"Beta" — omit for none. */
  @property({ type: String })
  badge = '';

  /** Highlights this row as the current page (source: `isActive`). */
  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  compact = false;

  /** Suppresses the description even when `description` is set (source: `showDescription`, default `true`). */
  @property({ type: Boolean, attribute: 'show-description' })
  showDescription = true;

  /** `target` for the `<a>` (source default `_self`). */
  @property({ type: String })
  target = '_self';

  /** Whether `slot="icon"` has content, so an omitted icon leaves no empty box. */
  @state() private hasIcon = false;

  private onIconSlotChange = (event: Event): void => {
    this.hasIcon = (event.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  private onClick = (event: MouseEvent): void => {
    const selectEvent = new CustomEvent<MenuItemSelectEventDetail>('menu-item-select', {
      detail: { href: this.href },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(selectEvent);
    if (selectEvent.defaultPrevented) event.preventDefault();
  };

  render() {
    const showDescription = !!this.description && this.showDescription;
    const classes = ['menu-item', this.active ? 'active' : '', this.compact ? 'compact' : '', showDescription ? '' : 'no-description']
      .filter(Boolean)
      .join(' ');
    return html`
      <a part="item" class=${classes} href=${this.href} target=${this.target} @click=${this.onClick}>
        <span class="menu-item-icon" part="icon" ?hidden=${!this.hasIcon}><slot name="icon" @slotchange=${this.onIconSlotChange}></slot></span>
        <span class="menu-item-content" part="content">
          <span class="menu-item-header" part="header">
            <span part="title" class="menu-item-title">${this.title}</span>
            ${this.badge ? html`<span part="badge" class="menu-item-badge">${this.badge}</span>` : nothing}
          </span>
          ${showDescription ? html`<p part="description" class="menu-item-description">${this.description}</p>` : nothing}
        </span>
      </a>
    `;
  }
}
