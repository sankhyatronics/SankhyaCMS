import { LitElement, css, html, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../dropdown/Dropdown';
import type { Dropdown } from '../dropdown/Dropdown';
import type { DropdownToggleEventDetail } from '../dropdown/DropdownEvents';
import { checkIcon } from '../shared/icons';
import { fontFamilyStyles } from '../shared/styles';
import { THEMES, type ThemeOption } from '../theming';
import type { ThemeChangeEventDetail } from './ThemePickerEvents';

/** A theme's four colours as one small pill: page background, banner, accent, ink. Decorative. */
function swatch(theme: ThemeOption | undefined): TemplateResult | typeof nothing {
  if (!theme) return nothing;
  const { background, banner, accent, ink } = theme.palette;
  return html`<span class="swatch" part="swatch" aria-hidden="true"
    >${[background, banner, accent, ink].map(color => html`<span style="background:${color}"></span>`)}</span
  >`;
}

/**
 * Theme picker: an `st-dropdown` whose panel lists the themes by name under Light and Dark
 * headings, each with a strip of its colours (page background, banner, accent, text). The current
 * theme is checked.
 *
 * Controlled: it shows `value` and fires `theme-change` (detail `{ value }`) when the user picks
 * another theme; the host applies it (`applyTheme`) and saves it. The header applies at once; a
 * settings form can keep the choice as a draft until it is saved.
 *
 * - `variant="icon"` (default): for a header's utility slot. The trigger is the current theme's
 *   colour strip (after an optional `slot="icon"` picture).
 * - `variant="field"`: for a form. The trigger looks like a select: strip, theme name, caret.
 *
 * Keyboard: Enter, Space or the arrow keys open the list; the arrow keys, Home and End move through
 * it; Enter or Space picks; Escape closes. Focus goes back to the trigger. The panel keeps the
 * page's own surface colours inside a tinted header.
 *
 * Theme names are shown as written in every language. The other text is set by attributes, so the
 * host can translate it.
 *
 * @slot icon - An optional picture before the colour strip on the `icon` trigger (none by default).
 * @fires theme-change - The user picked a different theme. Detail: `{ value }`. Bubbles, composed.
 * @csspart swatch - Each colour strip.
 */
@customElement('st-theme-picker')
export class ThemePicker extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      ${fontFamilyStyles}
    }

    :host([variant='field']) {
      display: block;
    }

    .swatch {
      display: inline-flex;
      flex: none;
      overflow: hidden;
      border-radius: 4px;
      border: 1px solid color-mix(in oklab, currentColor 30%, transparent);
    }

    .swatch > span {
      width: 10px;
      height: 16px;
    }

    .trigger-content {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    st-dropdown::part(panel) {
      padding: 6px;
    }

    /* Field: a select-like trigger the width of its container. */
    :host([variant='field']) st-dropdown {
      display: block;
    }

    :host([variant='field']) st-dropdown::part(trigger) {
      width: 100%;
      justify-content: flex-start;
      min-height: 40px;
      padding: 0 12px;
      border: 1px solid var(--st-input-border-color);
      border-radius: var(--st-input-radius);
      background: var(--st-input-bg);
      color: var(--st-input-color);
      font-family: var(--st-input-font-family);
      font-size: var(--st-input-font-size);
    }

    :host([variant='field']) st-dropdown::part(trigger):focus-visible {
      outline: none;
      border-color: var(--st-color-accent);
      box-shadow: var(--st-focus-ring-shadow);
    }

    :host([variant='field']) st-dropdown::part(caret) {
      margin-left: auto;
    }

    :host([variant='field']) st-dropdown::part(panel) {
      min-width: 100%;
      box-sizing: border-box;
    }

    .listbox {
      display: flex;
      flex-direction: column;
      min-width: 200px;
    }

    .group + .group {
      margin-top: 4px;
      padding-top: 4px;
      border-top: 1px solid var(--st-color-divider);
    }

    .group-heading {
      padding: 6px 10px 4px;
      font-size: var(--st-text-xs);
      font-weight: var(--st-font-weight-semibold);
      letter-spacing: var(--st-tracking-wide);
      text-transform: uppercase;
      color: var(--st-color-text-muted);
    }

    .option {
      display: flex;
      align-items: center;
      gap: 8px;
      box-sizing: border-box;
      width: 100%;
      padding: 6px 10px;
      border-radius: 8px;
      color: var(--st-color-text);
      font-size: var(--st-text-md);
      text-align: left;
      cursor: pointer;
      user-select: none;
    }

    .option:hover,
    .option:focus-visible {
      background: var(--st-color-hover);
    }

    .option:focus-visible {
      outline: var(--st-focus-ring);
      outline-offset: -2px;
    }

    .option[aria-selected='true'] {
      font-weight: var(--st-font-weight-semibold);
    }

    .tag {
      color: var(--st-color-text-muted);
      font-size: var(--st-text-sm);
      font-weight: var(--st-font-weight-regular);
    }

    .check {
      display: inline-flex;
      margin-left: auto;
      padding-left: 8px;
      color: var(--st-color-accent-text);
    }
  `;

  /** The current theme (a `THEMES` value). */
  @property({ type: String })
  value = 'default';

  /** `icon` for a header, `field` for a form. */
  @property({ type: String, reflect: true })
  variant: 'icon' | 'field' = 'icon';

  /** Accessible name of the picker, e.g. "Change theme" (header) or "Theme" (form). Also the tooltip on the `icon` trigger. */
  @property({ type: String })
  label = 'Theme';

  /** Heading of the light themes. */
  @property({ type: String, attribute: 'light-label' })
  lightLabel = 'Light';

  /** Heading of the dark themes. */
  @property({ type: String, attribute: 'dark-label' })
  darkLabel = 'Dark';

  /** The tag after a dark theme's name, shown as "(dark)". */
  @property({ type: String, attribute: 'dark-tag' })
  darkTag = 'dark';

  /** Added to a dark theme's accessible name: "Aurora, dark theme". */
  @property({ type: String, attribute: 'dark-theme-label' })
  darkThemeLabel = 'dark theme';

  /** Which edge of the trigger the panel lines up with (`right` suits a header's utility slot). */
  @property({ type: String })
  align: 'left' | 'right' = 'right';

  /** The themes to offer. Defaults to every theme in `THEMES`. */
  @property({ attribute: false })
  themes: readonly ThemeOption[] = THEMES;

  private accessibleName(theme: ThemeOption): string {
    return theme.dark ? `${theme.label}, ${this.darkThemeLabel}` : theme.label;
  }

  private dropdown(): Dropdown | null {
    return this.renderRoot.querySelector('st-dropdown');
  }

  private options(): HTMLElement[] {
    return Array.from(this.renderRoot.querySelectorAll<HTMLElement>('[role="option"]'));
  }

  private pick(value: string): void {
    this.dropdown()?.close(true);
    if (value === this.value) return;
    this.value = value;
    this.dispatchEvent(new CustomEvent<ThemeChangeEventDetail>('theme-change', { detail: { value }, bubbles: true, composed: true }));
  }

  private onOptionKeyDown(event: KeyboardEvent, value: string): void {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    event.stopPropagation();
    this.pick(value);
  }

  /** Opened from the keyboard, st-dropdown focuses the first option; move that to the current theme. */
  private onToggle = (event: Event): void => {
    if (!(event as CustomEvent<DropdownToggleEventDetail>).detail.open) return;
    setTimeout(() => {
      const focused = (this.renderRoot as ShadowRoot).activeElement;
      if (!focused?.matches('[role="option"]')) return;
      this.options()
        .find(option => option.getAttribute('aria-selected') === 'true')
        ?.focus();
    });
  };

  private renderGroup(id: string, heading: string, themes: readonly ThemeOption[]): TemplateResult | typeof nothing {
    if (themes.length === 0) return nothing;
    return html`
      <div class="group" role="group" aria-labelledby=${id}>
        <div class="group-heading" id=${id}>${heading}</div>
        ${themes.map(theme => {
          const selected = theme.value === this.value;
          return html`
            <div
              class="option"
              role="option"
              tabindex="0"
              aria-selected=${selected ? 'true' : 'false'}
              aria-label=${this.accessibleName(theme)}
              @click=${() => this.pick(theme.value)}
              @keydown=${(event: KeyboardEvent) => this.onOptionKeyDown(event, theme.value)}
            >
              ${swatch(theme)}
              <span class="name">${theme.label}</span>
              ${theme.dark ? html`<span class="tag">(${this.darkTag})</span>` : nothing}
              ${selected ? html`<span class="check">${checkIcon(14)}</span>` : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    const current = this.themes.find(theme => theme.value === this.value);
    const name = current ? `${this.label}: ${this.accessibleName(current)}` : this.label;
    const trigger =
      this.variant === 'field'
        ? html`<span class="trigger-content"
            >${swatch(current)}<span aria-hidden="true">${current?.label ?? ''}</span><span class="sr-only">${name}</span></span
          >`
        : html`<span class="trigger-content"
            ><slot name="icon"></slot>${swatch(current)}<span class="sr-only">${name}</span></span
          >`;

    return html`
      <st-dropdown
        align=${this.align}
        icon-size="auto"
        title=${this.variant === 'icon' ? this.label : nothing}
        @dropdown-toggle=${this.onToggle}
      >
        <span slot="icon">${trigger}</span>
        <div class="listbox" role="listbox" aria-label=${this.label}>
          ${this.renderGroup('st-theme-picker-light', this.lightLabel, this.themes.filter(theme => !theme.dark))}
          ${this.renderGroup('st-theme-picker-dark', this.darkLabel, this.themes.filter(theme => theme.dark))}
        </div>
      </st-dropdown>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-theme-picker': ThemePicker;
  }
  interface HTMLElementEventMap {
    'theme-change': CustomEvent<ThemeChangeEventDetail>;
  }
}
