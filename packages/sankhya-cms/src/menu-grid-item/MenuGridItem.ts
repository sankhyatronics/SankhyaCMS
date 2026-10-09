import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import type { MenuGridItemSelectEventDetail } from './MenuGridItemEvents';

/**
 * One entry in an `st-menu-grid` — icon (via `slot="icon"`) + title on one line, an optional
 * description below, and an optional corner badge ("New", "Popular", ...). A 1:1 port of
 * `SankhyaUI`'s React `MenuGridItem` (`SankhyaCMS/SankhyaUI/src/components/Menu`): same markup and
 * CSS, with its `motion` effects redone in CSS — fades up the first time it scrolls into view,
 * scales to 1.02 on hover / 0.98 while pressed, the icon tilts on hover, the badge pops in.
 * Colors come from the suite theme rather than per-item utility classes.
 *
 * An `http(s)` `href` opens in a new tab, like the source. Any other `href` fires a *cancelable*
 * `menu-grid-item-select` event (detail: `{ href }`) first: a host doing client-side routing calls
 * `event.preventDefault()` on it, which also cancels the anchor's own navigation (the source used
 * react-router's `Link` here; the suite apps have no router).
 */
@customElement('st-menu-grid-item')
export class MenuGridItem extends LitElement {
  /** `focus()` on the element focuses its link, so `st-dropdown` can arrow-key between items. */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      ${fontFamilyStyles}
    }

    @keyframes st-menu-grid-badge-pop {
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

    .menu-grid-item {
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      color: var(--st-color-text);
      transition:
        opacity 0.4s ease-out,
        transform 0.2s ease,
        background-color 0.2s ease;
    }

    .menu-grid-item.pending {
      opacity: 0;
      transform: translateY(20px);
    }

    .menu-grid-item.regular {
      padding: 16px;
    }

    .menu-grid-item.compact {
      padding: 12px;
    }

    /* Keyboard focus gets the same treatment as hover. */
    .menu-grid-item:hover,
    .menu-grid-item:has(.menu-grid-link:focus-visible) {
      background: var(--st-color-hover);
      transform: scale(1.02);
    }

    .menu-grid-item:active {
      transform: scale(0.98);
    }

    .menu-grid-link {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: inherit;
      width: 100%;
      height: 100%;
      gap: 8px;
    }

    .menu-grid-badge {
      position: absolute;
      top: 2px;
      right: 8px;
      font-size: 0.5rem;
      padding: 2px 8px;
      border-radius: 9999px;
      font-weight: 500;
      z-index: 1;
      background-color: var(--st-color-text-strong);
      color: var(--st-color-on-solid);
      animation: st-menu-grid-badge-pop 0.35s ease-out;
    }

    .menu-grid-header {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }

    .menu-grid-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      transition:
        background-color 0.2s ease,
        transform 0.2s ease;
      flex-shrink: 0;
      padding: 0;
      margin-bottom: 0;
    }

    .menu-grid-icon:hover {
      transform: rotate(5deg) scale(1.1);
    }

    .menu-grid-icon[hidden] {
      display: none;
    }

    .menu-grid-icon ::slotted(*) {
      width: 18px;
      height: 18px;
    }

    .menu-grid-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--st-color-text-strong);
      transition: color 0.2s ease;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 0;
    }

    .menu-grid-description {
      font-size: 0.75rem;
      color: var(--st-color-text-muted);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
      transition: color 0.2s ease;
    }

    .menu-grid-item.compact .menu-grid-header {
      gap: 8px;
    }

    .menu-grid-item.compact .menu-grid-icon {
      width: 24px;
      height: 24px;
    }

    .menu-grid-item.compact .menu-grid-icon ::slotted(*) {
      width: 14px;
      height: 14px;
    }

    .menu-grid-item.compact .menu-grid-title {
      font-size: 0.75rem;
    }

    .menu-grid-item.compact .menu-grid-description {
      font-size: 0.75rem;
    }

    .menu-grid-header.icon-only {
      justify-content: center;
    }

    @media (max-width: 480px) {
      .menu-grid-header {
        gap: 8px;
      }

      .menu-grid-icon {
        width: 28px;
        height: 28px;
      }

      .menu-grid-icon ::slotted(*) {
        width: 16px;
        height: 16px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .menu-grid-item,
      .menu-grid-icon {
        transition: none;
      }

      .menu-grid-item.pending {
        opacity: 1;
        transform: none;
      }

      .menu-grid-badge {
        animation: none;
      }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  description = '';

  @property({ type: String })
  href = '';

  /** Small corner label, e.g. "New"/"Beta" — omit for none. */
  @property({ type: String })
  badge = '';

  @property({ type: Boolean, reflect: true })
  compact = false;

  /** Suppresses the description even when `description` is set (source: `showDescription`, default `true`). */
  @property({ type: Boolean, attribute: 'show-description' })
  showDescription = true;

  /** Whether `slot="icon"` has content, so an omitted icon leaves no empty box. */
  @state() private hasIcon = false;

  /** True until the item first scrolls into view (the source's `whileInView ... once`). */
  @state() private pending = true;

  private observer?: IntersectionObserver;

  connectedCallback(): void {
    super.connectedCallback();
    if (typeof IntersectionObserver === 'undefined') {
      this.pending = false;
      return;
    }
    this.observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        this.pending = false;
        this.observer?.disconnect();
      }
    });
    this.observer.observe(this);
  }

  disconnectedCallback(): void {
    this.observer?.disconnect();
    super.disconnectedCallback();
  }

  private onIconSlotChange = (event: Event): void => {
    this.hasIcon = (event.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  private get isExternal(): boolean {
    return this.href.startsWith('http');
  }

  private onClick = (event: MouseEvent): void => {
    if (this.isExternal) return;
    const selectEvent = new CustomEvent<MenuGridItemSelectEventDetail>('menu-grid-item-select', {
      detail: { href: this.href },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(selectEvent);
    if (selectEvent.defaultPrevented) event.preventDefault();
  };

  render() {
    const iconOnly = this.hasIcon && !this.title;
    return html`
      <div class="menu-grid-item ${this.compact ? 'compact' : 'regular'} ${this.pending ? 'pending' : ''}" part="item">
        <a
          part="link"
          class="menu-grid-link"
          href=${this.href}
          target=${this.isExternal ? '_blank' : '_self'}
          rel=${this.isExternal ? 'noopener noreferrer' : nothing}
          @click=${this.onClick}
        >
          ${this.badge ? html`<span part="badge" class="menu-grid-badge">${this.badge}</span>` : nothing}
          <span class="menu-grid-header ${iconOnly ? 'icon-only' : ''}" part="header">
            <span class="menu-grid-icon" part="icon" ?hidden=${!this.hasIcon}><slot name="icon" @slotchange=${this.onIconSlotChange}></slot></span>
            ${this.title ? html`<span part="title" class="menu-grid-title">${this.title}</span>` : nothing}
          </span>
          ${this.description && this.showDescription
            ? html`<span part="description" class="menu-grid-description">${this.description}</span>`
            : nothing}
        </a>
      </div>
    `;
  }
}
