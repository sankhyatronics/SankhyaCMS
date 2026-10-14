import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { chevronIcon } from '../shared/icons';
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
 * kept on top: `align`, `active`, `disabled`, `inline`, and the `dropdown-toggle` event — plus
 * `mega` and `open-on-hover` for an okta.com-style mega menu (see `st-mega-menu`).
 *
 * @cssprop --st-mega-menu-max-width - Maximum width of a `mega` panel (default `1400px`).
 * @cssprop --st-mega-menu-inset - Minimum space between a `mega` panel and the header's sides (default `1rem`).
 * @cssprop --st-mega-menu-gap - Space between the header and a `mega` panel (default `12px`).
 * @cssprop --st-mega-menu-radius - Corner radius of a `mega` panel (default `24px`).
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
      /* --st-nav-*: set by a host bar (st-header's transparent state) to recolour its nav items. */
      color: var(--st-nav-color, var(--st-color-text));
      font-size: 0.875rem;
      text-decoration: none;
      white-space: nowrap;
      transition: background-color 0.3s ease;
    }

    .menu-title:hover,
    .menu-title[aria-expanded='true'] {
      background: var(--st-nav-hover-bg, var(--st-color-hover));
      color: var(--st-nav-color, var(--st-color-text-strong));
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
      /* The panel has its own surface: items in it never take the bar's nav colours. */
      --st-nav-color: initial;
      --st-nav-hover-bg: initial;
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

    /* Mega (okta.com): the panel is a large rounded card floating under the whole bar, centred on
       the nearest positioned ancestor (st-header) instead of hanging off the trigger — the host
       stops being the panel's containing block. */
    :host([mega]:not([inline])) {
      position: static;
    }

    :host([mega]:not([inline])) .menu-dropdown {
      top: calc(100% + var(--st-mega-menu-gap, 12px));
      left: var(--st-mega-menu-inset, 1rem);
      right: var(--st-mega-menu-inset, 1rem);
      max-width: var(--st-mega-menu-max-width, 1400px);
      margin: 0 auto;
      padding: 0;
      max-height: calc(100dvh - var(--st-mega-menu-offset, 96px));
      overflow-y: auto;
      border: 0;
      border-radius: var(--st-mega-menu-radius, 24px);
      box-shadow: 0 24px 48px var(--st-shadow-color-md);
    }

    /* The open section's trigger becomes an accent pill — also for a plain dropdown marked \`bar\`,
       so it matches the mega triggers (and st-menu-item variant="bar") beside it. */
    :host([mega]:not([inline])) .menu-title,
    :host([bar]:not([inline])) .menu-title {
      border-radius: 9999px;
    }

    :host([mega]:not([inline])) .menu-title[aria-expanded='true'],
    :host([bar]:not([inline])) .menu-title[aria-expanded='true'] {
      background: var(--st-color-accent);
      color: var(--st-color-on-solid);
    }

    .mega-back-bar,
    .mega-heading {
      display: none;
    }

    /* Mega in st-header's hamburger panel: rather than an accordion, the panel slides in over the
       whole screen with a Back button (okta.com's phone menu). Fixed to the viewport, stacked
       inside the header's own full-screen layer, so the header's close toggle stays on top. */
    :host([mega][inline]) .menu-dropdown {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 1;
      padding: 0 1.5rem 2rem;
      overflow-y: auto;
      border: 0;
      border-radius: 0;
      visibility: hidden;
      transform: translateX(100%);
      transition:
        transform 0.3s ease,
        visibility 0s linear 0.3s;
    }

    :host([mega][inline]) .menu-dropdown.show {
      visibility: visible;
      transform: none;
      transition-delay: 0s;
    }

    :host([mega][inline]) .mega-back-bar {
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1;
      height: 64px;
      margin: 0 -1.5rem;
      padding: 0 1rem;
      background: inherit;
      border-bottom: 1px solid var(--st-color-border);
    }

    .mega-back {
      ${buttonResetStyles}
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 40px;
      padding: 0 12px 0 6px;
      border-radius: var(--st-radius-sm);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--st-color-text-strong);
    }

    .mega-back:hover {
      background: var(--st-color-hover);
    }

    :host([mega][inline]) .mega-heading {
      display: block;
      margin: 1.25rem 0 0.75rem;
      font-size: 1.375rem;
      font-weight: 600;
      color: var(--st-color-text-strong);
    }

    /* The drill-down replaces the trigger's open state, so the caret points the way it goes. */
    :host([mega][inline]) .arrow {
      transform: rotate(-90deg);
    }

    @media (prefers-reduced-motion: reduce) {
      .menu-dropdown,
      .arrow,
      :host([mega][inline]) .menu-dropdown {
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

  /**
   * Mega-menu panel (okta.com style), typically holding an `st-mega-menu`: the panel spans the
   * full width of the nearest positioned ancestor — `st-header` — right under it, instead of
   * hanging off the trigger. In `st-header`'s hamburger layout (`inline`) it slides in over the
   * screen with a Back button rather than opening as an accordion. A click inside the panel only
   * closes it when it lands on a link.
   */
  @property({ type: Boolean, reflect: true })
  mega = false;

  /** Styles a non-`mega` trigger like a mega one — a pill that turns solid accent while open — so
   * a plain dropdown (e.g. "+ New") lines up with mega triggers in the same header bar. */
  @property({ type: Boolean, reflect: true })
  bar = false;

  /** Opens the panel while a mouse hovers the trigger or panel (touch and keyboard still click). Off while `inline`. */
  @property({ type: Boolean, attribute: 'open-on-hover' })
  openOnHover = false;

  /** Text of the Back button in the `mega` + `inline` drill-down panel. */
  @property({ type: String, attribute: 'back-label' })
  backLabel = 'Back';

  private hoverTimer = 0;

  /** When hover last opened the panel — a click right after that keeps it open instead of toggling it shut. */
  private hoverOpenedAt = 0;

  /** Whether the default slot has content — the source's `children` check. */
  @state() private hasContent = false;

  /** Whether `slot="icon"` has content. */
  @state() private hasIcon = false;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('mousedown', this.closeOnOutsideMouseDown);
    window.addEventListener('keydown', this.closeOnEscape);
    this.addEventListener('pointerenter', this.onPointerEnter);
    this.addEventListener('pointerleave', this.onPointerLeave);
  }

  disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.closeOnOutsideMouseDown);
    window.removeEventListener('keydown', this.closeOnEscape);
    this.removeEventListener('pointerenter', this.onPointerEnter);
    this.removeEventListener('pointerleave', this.onPointerLeave);
    clearTimeout(this.hoverTimer);
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

  private hovers(event: PointerEvent): boolean {
    return this.openOnHover && !this.inline && !this.disabled && this.hasContent && event.pointerType === 'mouse';
  }

  /** Short delays so a pointer crossing the gap between trigger and panel doesn't close it. */
  private onPointerEnter = (event: PointerEvent): void => {
    if (!this.hovers(event)) return;
    clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      if (!this.open) this.hoverOpenedAt = Date.now();
      this.setOpen(true);
    }, 80);
  };

  private onPointerLeave = (event: PointerEvent): void => {
    if (!this.hovers(event)) return;
    clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => this.setOpen(false), 200);
  };

  private onBackClick = (event: Event): void => {
    event.stopPropagation();
    this.setOpen(false);
    this.trigger()?.focus();
  };

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
      'st-menu-item, st-menu-grid-item, st-mega-menu-feature, a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
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
    clearTimeout(this.hoverTimer);
    if (this.open && Date.now() - this.hoverOpenedAt < 400) return;
    this.setOpen(!this.open);
  };

  /** A click anywhere inside the panel closes it, as in the source — for `mega`, only a click on a
   * link: a big panel has headings and gaps, and a click there shouldn't also close st-header's
   * hamburger layer. */
  private onPanelClick = (event: Event): void => {
    if (this.mega && !event.composedPath().some((node) => node instanceof HTMLAnchorElement)) {
      event.stopPropagation();
      return;
    }
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
          ${this.mega
            ? html`
                <div class="mega-back-bar" part="back-bar">
                  <button type="button" class="mega-back" part="back" @click=${this.onBackClick}>
                    ${chevronIcon('left', 16)} ${this.backLabel}
                  </button>
                </div>
                ${this.label ? html`<p class="mega-heading" part="mobile-heading">${this.label}</p>` : nothing}
              `
            : nothing}
          <slot @slotchange=${this.onContentSlotChange}></slot>
        </div>
      </div>
    `;
  }
}
