import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { buttonResetStyles, controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import type { DropdownToggleEventDetail } from './DropdownEvents';

/**
 * A labeled trigger + slotted dropdown panel — nav menus (typically holding an `st-menu-grid`),
 * action menus, anything "click a trigger, show content under it". A 1:1 port of `SankhyaUI`'s
 * React `Dropdown` (`SankhyaCMS/SankhyaUI/src/components/Dropdown`): same markup
 * (`.menu` > `.menu-title` + `.menu-dropdown`), sizes, 0.3s slide/fade, and behavior —
 *
 * - only one dropdown is open at a time (the source's `DropdownProvider`, built in here, so no
 *   provider element is needed);
 * - a mousedown outside, Escape, or a click inside the panel closes it;
 * - an `href` trigger toggles the panel when it has content, and is a plain link when it doesn't;
 * - `inline` opens the panel in the flow, the source's `.touch-device` layout.
 *
 * Colors and the panel's surface come from the suite theme (the source left those to the
 * consumer's `className`/`itemGroupClassName` utility classes). Two source rules are left out
 * because they break existing suite uses (`st-source-bar`'s site/library menus): the 100vw panel
 * at <=768px (overflows the screen from wherever the trigger sits; the header uses `inline`
 * instead) and `overflow: hidden` on slotted children (clips their focus rings). Suite additions
 * kept on top: `align`, `active`, `disabled`, `inline`, and the `dropdown-toggle` event.
 */
@customElement('st-dropdown')
export class Dropdown extends LitElement {
  /** The open dropdown, if any — the source's `DropdownContext.activeDropdown`. */
  private static openDropdown: Dropdown | null = null;

  static styles = css`
    ${controlBaseStyles}

    :host {
      display: inline-block;
      position: relative;
      ${fontFamilyStyles}
    }

    .menu-title {
      ${buttonResetStyles}
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      min-height: 40px;
      padding: 12px;
      gap: 8px;
      text-align: center;
      width: fit-content;
      border-radius: var(--st-radius-sm);
      color: var(--st-color-text);
      font-size: 0.875rem;
      text-decoration: none;
      white-space: nowrap;
      transition: background-color 0.3s ease;
    }

    .menu-title:hover,
    .menu-title[aria-expanded='true'] {
      background: var(--st-color-hover);
      color: var(--st-color-text-strong);
    }

    :host([active]) .menu-title {
      background: var(--st-color-accent-subtle);
      color: var(--st-color-accent-text);
    }

    :host([disabled]) .menu-title {
      color: var(--st-color-text-muted);
      cursor: not-allowed;
      pointer-events: none;
    }

    .icon {
      display: inline-flex;
      flex: none;
      align-items: center;
      justify-content: center;
    }

    .icon[hidden] {
      display: none;
    }

    .arrow {
      display: inline-block;
      margin-left: 8px;
      font-size: 0.75rem;
      transition: transform 0.3s ease;
    }

    .menu-title[aria-expanded='true'] .arrow {
      transform: rotate(180deg);
    }

    .menu-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 100;
      padding: 16px;
      background: var(--st-color-surface);
      color: var(--st-color-text);
      border: 1px solid var(--st-color-border);
      border-radius: var(--st-radius-sm);
      box-shadow: 0 4px 16px var(--st-shadow-color-sm);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      /* visibility flips at once on open (so keyboard focus can move into the panel on the same
         frame) and only after the 0.3s fade on close. */
      transition:
        opacity 0.3s ease,
        transform 0.3s ease,
        visibility 0s linear 0.3s;
      pointer-events: none;
    }

    .menu-dropdown.align-right {
      left: auto;
      right: 0;
    }

    .menu-dropdown.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
      transition-delay: 0s;
    }

    /* Inline: the panel opens in the flow under its trigger and pushes what follows down, instead
       of floating — the source's .touch-device layout. st-header turns this on for its menu while
       the hamburger panel is showing. */
    :host([inline]) {
      display: block;
    }

    :host([inline]) .menu-title {
      width: 100%;
      justify-content: flex-start;
    }

    :host([inline]) .arrow {
      margin-left: auto;
    }

    :host([inline]) .menu-dropdown {
      display: none;
      position: relative;
      top: auto;
      left: auto;
      right: auto;
      width: 100%;
      box-sizing: border-box;
      box-shadow: none;
      opacity: 1;
      visibility: visible;
      transform: none;
    }

    :host([inline]) .menu-dropdown.show {
      display: block;
      pointer-events: auto;
    }

    @media (prefers-reduced-motion: reduce) {
      .menu-dropdown,
      .arrow {
        transition: none;
      }
    }
  `;

  /** Trigger label text (source: `title`, renamed because `title` is the native tooltip
   * attribute). Leave empty to show only `slot="icon"`. */
  @property({ type: String })
  label = '';

  /** Renders the trigger as an `<a href>`. With panel content the click toggles the panel (as in
   * the source); with none it navigates. */
  @property({ type: String })
  href = '';

  @property({ type: String, attribute: 'icon-position' })
  iconPosition: 'left' | 'right' = 'left';

  /** Inline `width`/`height` of the `slot="icon"` wrapper (source: `iconSize`, default `1.2rem`). */
  @property({ type: String, attribute: 'icon-size' })
  iconSize = '1.2rem';

  /** Inline `color` of the `slot="icon"` wrapper (source: `iconColor`). */
  @property({ type: String, attribute: 'icon-color' })
  iconColor = 'currentColor';

  /** Which edge of the trigger the panel lines up with. */
  @property({ type: String })
  align: 'left' | 'right' = 'left';

  /** `target` of an `href` trigger (source default `_self`). */
  @property({ type: String })
  target = '_self';

  /** Extra class(es) on the trigger (source: `className`; a `class` on `st-dropdown` styles the host). */
  @property({ type: String, attribute: 'trigger-class-name' })
  triggerClassName = '';

  /** Extra class(es) on the panel (source: `itemGroupClassName`). */
  @property({ type: String, attribute: 'item-group-class-name' })
  itemGroupClassName = '';

  /** Unused, as in the source (`itemClassName` is never read there); kept for prop parity. */
  @property({ type: String, attribute: 'item-class-name' })
  itemClassName = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Highlights the trigger as the current section (e.g. the current page is one of its items). */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** Opens the panel in the flow under the trigger instead of floating over the page (see the
   * styles). `st-header` sets this on its own menu's dropdowns while its hamburger panel shows. */
  @property({ type: Boolean, reflect: true })
  inline = false;

  /** Whether the panel is showing. Follows user toggles; may also be set from outside. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Whether the default slot has content — the source's `children` check. */
  @state() private hasContent = false;

  /** Whether `slot="icon"` has content. */
  @state() private hasIcon = false;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('mousedown', this.closeOnOutsideMouseDown);
    window.addEventListener('keydown', this.closeOnEscape);
  }

  disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.closeOnOutsideMouseDown);
    window.removeEventListener('keydown', this.closeOnEscape);
    if (Dropdown.openDropdown === this) Dropdown.openDropdown = null;
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (!changed.has('open')) return;
    if (this.open) {
      const previous = Dropdown.openDropdown;
      Dropdown.openDropdown = this;
      if (previous && previous !== this) previous.setOpen(false);
    } else if (Dropdown.openDropdown === this) {
      Dropdown.openDropdown = null;
    }
  }

  private setOpen(open: boolean): void {
    if (this.open === open) return;
    this.open = open;
    this.dispatchEvent(new CustomEvent<DropdownToggleEventDetail>('dropdown-toggle', { detail: { open }, bubbles: true, composed: true }));
  }

  private closeOnOutsideMouseDown = (event: Event): void => {
    if (this.open && !event.composedPath().includes(this)) this.setOpen(false);
  };

  private closeOnEscape = (event: KeyboardEvent): void => {
    if (!this.open || event.key !== 'Escape') return;
    const focusWasInside = event.composedPath().includes(this);
    this.setOpen(false);
    if (focusWasInside) this.trigger()?.focus();
  };

  private trigger(): HTMLElement | null {
    return this.renderRoot.querySelector<HTMLElement>('.menu-title');
  }

  /** Keyboard-reachable entries in the panel, in order: menu items (they delegate focus to their
   * own link) plus any plain links/buttons/tabbable elements a caller slots in. */
  private panelItems(): HTMLElement[] {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>('.menu-dropdown slot');
    if (!slot) return [];
    const selector =
      'st-menu-item, st-menu-grid-item, a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const items: HTMLElement[] = [];
    for (const el of slot.assignedElements({ flatten: true })) {
      if (el.matches(selector)) items.push(el as HTMLElement);
      items.push(...Array.from(el.querySelectorAll<HTMLElement>(selector)));
    }
    return items;
  }

  /** Moves focus into the panel once it has become visible (it is `visibility: hidden` until the
   * `show` class lands, and hidden elements can't take focus). */
  private focusItem(pick: (items: HTMLElement[]) => HTMLElement | undefined): void {
    void this.updateComplete.then(() => pick(this.panelItems())?.focus());
  }

  /** Enter/Space/ArrowDown open the panel and focus its first entry; ArrowUp its last. */
  private onTitleKeyDown = (event: KeyboardEvent): void => {
    if (!this.hasContent || this.disabled) return;
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.setOpen(true);
      this.focusItem((items) => items[0]);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();
      this.setOpen(true);
      this.focusItem((items) => items[items.length - 1]);
    }
  };

  /** Arrow keys/Home/End move between the panel's entries; Tab closes the panel and moves on. */
  private onPanelKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Tab') {
      this.setOpen(false);
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const items = this.panelItems();
    if (items.length === 0) return;
    event.preventDefault();
    event.stopPropagation();
    const path = event.composedPath();
    const current = items.findIndex((item) => path.includes(item));
    const last = items.length - 1;
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? last
          : event.key === 'ArrowDown'
            ? current < 0 || current === last ? 0 : current + 1
            : current <= 0 ? last : current - 1;
    items[next].focus();
  };

  private onTitleClick = (event: Event): void => {
    event.stopPropagation();
    if (!this.hasContent) return;
    event.preventDefault();
    this.setOpen(!this.open);
  };

  /** A click anywhere inside the panel closes it, as in the source. */
  private onPanelClick = (): void => {
    this.setOpen(false);
  };

  private onContentSlotChange = (event: Event): void => {
    this.hasContent = (event.target as HTMLSlotElement).assignedNodes({ flatten: true }).some(
      (node) => node.nodeType === Node.ELEMENT_NODE || !!node.textContent?.trim()
    );
  };

  private onIconSlotChange = (event: Event): void => {
    this.hasIcon = (event.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  render() {
    const icon = html`<span
      class="icon ${this.iconPosition === 'left' ? 'icon-left' : 'icon-right'}"
      ?hidden=${!this.hasIcon}
      style="width:${this.iconSize};height:${this.iconSize};color:${this.iconColor}"
      ><slot name="icon" @slotchange=${this.onIconSlotChange}></slot
    ></span>`;
    const titleContent = html`
      ${this.iconPosition === 'left' ? icon : nothing} ${this.label ? html`<span part="label">${this.label}</span>` : nothing}
      ${this.iconPosition === 'right' ? icon : nothing}
      ${this.hasContent ? html`<span class="arrow" part="caret" aria-hidden="true">▼</span>` : nothing}
    `;
    const titleClass = `menu-title ${this.triggerClassName} ${this.open ? 'active' : ''}`;

    return html`
      <div class="menu" part="menu">
        ${this.href
          ? html`
              <a
                part="trigger"
                class=${titleClass}
                href=${this.href}
                target=${this.target}
                aria-haspopup=${this.hasContent ? 'true' : 'false'}
                aria-expanded=${this.open}
                aria-disabled=${this.disabled ? 'true' : nothing}
                @click=${this.onTitleClick}
                @keydown=${this.onTitleKeyDown}
              >
                ${titleContent}
              </a>
            `
          : html`
              <button
                part="trigger"
                class=${titleClass}
                type="button"
                aria-haspopup="true"
                aria-expanded=${this.open}
                ?disabled=${this.disabled}
                @click=${this.onTitleClick}
                @keydown=${this.onTitleKeyDown}
              >
                ${titleContent}
              </button>
            `}
        <div
          part="panel"
          class="menu-dropdown align-${this.align} ${this.itemGroupClassName} ${this.open ? 'show' : ''}"
          role="menu"
          @click=${this.onPanelClick}
          @keydown=${this.onPanelKeyDown}
        >
          <slot @slotchange=${this.onContentSlotChange}></slot>
        </div>
      </div>
    `;
  }
}
