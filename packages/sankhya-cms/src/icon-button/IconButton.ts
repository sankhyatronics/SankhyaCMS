import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { buttonResetStyles, controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';

/**
 * A small, icon-only action button. The icon is default-slotted content (the package has no icon
 * library dependency), the same convention as `st-dropdown`/`st-menu-grid-item`'s `slot="icon"`.
 *
 * Fires a plain native `click` — no custom event, since a caller just wants an ordinary button.
 */
@customElement('st-icon-button')
export class IconButton extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: inline-flex;
      ${rootFontFamilyStyles}
    }

    button {
      ${buttonResetStyles}
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--st-size-32);
      height: var(--st-size-32);
      border-radius: var(--st-radius-sm);
      color: var(--st-color-text-muted);
    }

    button:hover {
      background: var(--st-color-hover);
      color: var(--st-color-text-strong);
    }

    :host([disabled]) button {
      color: var(--st-color-text-muted);
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  /**
   * Accessible name, set as the button's `aria-label` and its `title` (tooltip). Required for a
   * control with no visible text. Matches the source component's `ariaLabel` (renamed: modern
   * browsers already expose a native `ariaLabel` reflected property on every `Element`, so reusing
   * that exact name as a Lit reactive property would shadow it).
   */
  @property({ type: String })
  label = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    return html`
      <button
        part="button"
        type="button"
        aria-label=${this.label || nothing}
        title=${this.label || nothing}
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </button>
    `;
  }
}
