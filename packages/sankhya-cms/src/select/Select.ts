import { LitElement, css, html, nothing } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { chevronIcon, externalLinkIcon } from '../shared/icons';
import { controlBaseStyles, eyebrowLabelStyles, fontFamilyStyles } from '../shared/styles';
import type { SelectOption } from './SelectEvents';
import type { SelectChangedEventDetail } from './SelectEvents';

let instanceCounter = 0;

/**
 * A fully custom-styled replacement for native `<select>`, used everywhere
 * the wizard needs a single-choice dropdown (template source, list, document
 * library, admin roles, ...).
 *
 * Built on the CSS Customizable Select API (`appearance: base-select`) —
 * still a real `<select>`/`<option>` element tree, so focus, keyboard
 * (arrows/Home/End/typeahead), and ARIA all come from the browser for free,
 * but the trigger (`<button>`/`<selectedcontent>`) and popup
 * (`::picker(select)`) are fully styleable instead of OS-rendered. Chromium
 * only for now (Firefox/Safari fall back to an unstyled native `<select>` —
 * the extra `<button>`/`<selectedcontent>` markup is simply not rendered by
 * browsers that don't support the parsing/CSS additions, so the control
 * still works there, just without the custom look).
 *
 * `options` intentionally has no "unselected" placeholder entry — set
 * `value=""` (or any value with no matching option) and it falls back to
 * showing `placeholder` in the trigger instead, letting callers swap the
 * placeholder text dynamically (e.g. "Select a list" vs "Select a list
 * first") without needing a synthetic option in the list. Internally this is
 * a real hidden/disabled `<option value="">`, since a native `<select>`
 * always has *some* option selected.
 *
 * Fires `select-change` (detail: `{ value }`) only when the value actually
 * changes, matching native `<select>`'s `change` event semantics.
 *
 * `link-href` optionally renders an external-link button in front of
 * `field-label` — the same glyph/placement as the "open library" links
 * placed next to the Templates/Save-location breadcrumbs — for callers that
 * want a one-click way to open whatever the current selection points at
 * (e.g. the SharePoint site or library) in a new tab.
 */
@customElement('st-select')
export class Select extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: inline-flex;
      flex-direction: column;
      gap: var(--st-space-4);
      min-width: 0;
      ${fontFamilyStyles}
    }

    .field-label-row {
      display: flex;
      align-items: center;
      gap: var(--st-space-6);
      min-width: 0;
    }

    .field-label {
      font-size: var(--st-text-xs);
      ${eyebrowLabelStyles}
    }

    .field-label-link {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      color: var(--st-color-text-faint);
    }

    .field-label-link:hover {
      color: var(--st-color-text-strong);
    }

    select {
      appearance: base-select;
      width: 100%;
      min-width: 0;
      border: 0;
      padding: 0;
      background: transparent;
      font: inherit;
      color: inherit;
    }

    select::picker(select) {
      appearance: base-select;
      margin-top: var(--st-space-4);
      background: var(--st-color-surface);
      border: 1px solid var(--st-color-border);
      border-radius: var(--st-radius-sm);
      box-shadow: 0 4px 16px var(--st-shadow-color-sm);
      padding: var(--st-space-4) 0;
    }

    .trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--st-space-8);
      width: 100%;
      padding: var(--st-space-8) var(--st-space-10);
      border-radius: var(--st-radius-sm);
      border: 1px solid var(--st-color-border);
      background: var(--st-color-surface);
      color: var(--st-color-text-strong);
      font: inherit;
      font-size: var(--st-text-base);
      box-sizing: border-box;
      text-align: left;
      cursor: pointer;
    }

    .trigger:hover,
    .trigger:focus-visible {
      background: var(--st-color-hover);
    }

    /* Borderless variant for a header/toolbar utility slot, so it reads as the same kind of
     * hover-only control as st-icon-button and st-header's own language trigger (same fixed
     * height, no permanent visible border) instead of a form-field box. */
    :host([ghost]) .trigger {
      height: var(--st-size-32);
      padding: 0 var(--st-space-8);
      border: none;
      background: transparent;
    }

    :host([ghost]) .trigger:hover,
    :host([ghost]) .trigger:focus-visible {
      background: var(--st-color-hover);
    }

    select:disabled .trigger {
      color: var(--st-color-text-muted);
      cursor: not-allowed;
    }

    selectedcontent {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    select:has(option[value='']:checked) selectedcontent {
      color: var(--st-color-text-muted);
    }

    select::picker-icon {
      display: none;
    }

    .caret {
      display: flex;
      flex: none;
      color: var(--st-color-text-muted);
    }

    option {
      display: block;
      padding: var(--st-space-8) var(--st-space-10);
      font-size: var(--st-text-base);
      color: var(--st-color-text);
      cursor: pointer;
    }

    option[hidden] {
      display: none;
    }

    option:hover,
    option:focus {
      background: var(--st-color-hover);
    }

    option:checked {
      color: var(--st-color-text-strong);
      font-weight: var(--st-font-weight-semibold);
    }

    option::checkmark {
      display: none;
    }
  `;

  @property({ attribute: false })
  options: SelectOption[] = [];

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = 'Select…';

  /** Renders an internal `<label>` above the trigger, associated via `aria-labelledby`. Leave empty when the field is labeled some other way (e.g. context alone). */
  @property({ type: String, attribute: 'field-label' })
  fieldLabel = '';

  /**
   * Optional URL for an external-link button rendered in front of
   * `field-label` (same glyph/placement as the "open library" links next to
   * the Templates/Save-location breadcrumbs) — e.g. a link to the
   * SharePoint site or library the current selection points at. Ignored
   * when `field-label` is empty, since there'd be nothing to place it in
   * front of.
   */
  @property({ type: String, attribute: 'link-href' })
  linkHref = '';

  /** Accessible name/title for the `link-href` button. */
  @property({ type: String, attribute: 'link-label' })
  linkLabel = 'Open';

  /** Accessible name for the trigger when there's no visible `field-label` (e.g. a filter-row select). Ignored when `field-label` is set. */
  @property({ type: String, attribute: 'select-label' })
  selectLabel = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Borderless variant for a header/toolbar utility slot — see the `:host([ghost])` styles. */
  @property({ type: Boolean, reflect: true })
  ghost = false;

  @query('select')
  private readonly selectEl!: HTMLSelectElement;

  private readonly instanceId = ++instanceCounter;
  private readonly fieldLabelId = `st-select-label-${this.instanceId}`;

  protected updated(changed: PropertyValues): void {
    if (changed.has('value') || changed.has('options')) {
      const hasValue = this.options.some((option) => option.value === this.value);
      const nextValue = hasValue ? this.value : '';
      if (this.selectEl.value !== nextValue) this.selectEl.value = nextValue;
    }
  }

  render() {
    const hasValue = this.options.some((option) => option.value === this.value);

    return html`
      ${this.fieldLabel
        ? html`
            <span class="field-label-row">
              ${this.linkHref
                ? html`
                    <a
                      part="field-label-link"
                      class="field-label-link"
                      href=${this.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      title=${this.linkLabel}
                      aria-label=${this.linkLabel}
                    >
                      ${externalLinkIcon(11)}
                    </a>
                  `
                : nothing}
              <span part="field-label" id=${this.fieldLabelId} class="field-label">${this.fieldLabel}</span>
            </span>
          `
        : nothing}
      <select
        part="select"
        aria-label=${!this.fieldLabel && this.selectLabel ? this.selectLabel : nothing}
        aria-labelledby=${this.fieldLabel ? this.fieldLabelId : nothing}
        ?disabled=${this.disabled}
        @change=${this.onChange}
      >
        <button part="trigger" class="trigger" type="button">
          <selectedcontent></selectedcontent>
          <span class="caret">${chevronIcon('down', 10)}</span>
        </button>
        <option value="" ?selected=${!hasValue} disabled hidden>${this.placeholder}</option>
        ${this.options.map(
          (option) => html`<option part="option" value=${option.value} ?selected=${option.value === this.value}>${option.label}</option>`
        )}
      </select>
    `;
  }

  private onChange = (event: Event): void => {
    const newValue = (event.target as HTMLSelectElement).value;
    if (newValue === this.value) return;

    this.value = newValue;
    this.dispatchEvent(new CustomEvent<SelectChangedEventDetail>('select-change', { detail: { value: newValue }, bubbles: true, composed: true }));
  };
}
