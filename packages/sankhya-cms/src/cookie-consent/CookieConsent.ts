import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { MODAL_OPEN_ATTRIBUTE } from '../shared/modal-state';
import { buttonResetStyles, controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';
import type { CookieCategory, CookieConsentEventDetail, CookieConsentStatus } from './CookieConsentEvents';

/** Host attribute set while a modal is open: the bar is hidden and inert until it closes. */
const MODAL_HIDDEN_ATTRIBUTE = 'data-st-modal-hidden';
/** `<html>` attribute set while the mobile nav drawer is open (by st-header). */
const DRAWER_OPEN_ATTRIBUTE = 'data-st-drawer-open';
/** Host attribute set while the drawer is open: the bar is hidden until it closes. */
const DRAWER_HIDDEN_ATTRIBUTE = 'data-st-drawer-hidden';
/** `<html>` custom property holding the bar's height while it is shown, so the footer can pad past it. */
const BANNER_HEIGHT_PROPERTY = '--st-cookie-banner-height';

const DEFAULT_STORAGE_KEY = 'sankhya_ui_cookie_consent';

const DEFAULT_MESSAGE =
  'We use cookies that are needed for this site to work. With your permission we would also use optional cookies; they stay off until you accept them.';

interface StoredConsent {
  status: CookieConsentStatus;
  /** Only stored for `custom`: the optional categories the visitor allowed. */
  categories?: Record<string, boolean>;
}

/**
 * Fixed bottom consent bar with explicit choices: accept all, reject all optional cookies, or (with
 * `categories` and a `settings-button-text`) open a settings panel to allow categories one by one.
 * Optional categories are off until the visitor turns them on. The choice is kept in localStorage
 * (`storage-key`, default `sankhya_ui_cookie_consent`; storage errors are ignored) and the bar renders
 * nothing once a choice exists. Fires `cookie-consent-accept`, `cookie-consent-refuse` or
 * `cookie-consent-save` (detail `{ status, categories }`). The default slot replaces the message
 * text. `privacy-policy-link` opens in the same tab for a site path, in a new tab for an external URL.
 *
 * While a modal is open (`<html data-st-modal-open>`, set by st-quote-dialog) the bar is hidden
 * (`visibility: hidden`) and inert, and it reappears unchanged when the modal closes. While the mobile
 * nav drawer is open (`<html data-st-drawer-open>`, set by st-header) the bar is not displayed.
 *
 * While the bar is shown its height is published as `--st-cookie-banner-height` on `<html>` (removed
 * when it is dismissed), so a page's footer can pad its last row above the bar.
 *
 * @fires cookie-consent-accept - Every category allowed.
 * @fires cookie-consent-refuse - Only required categories allowed.
 * @fires cookie-consent-save - The categories picked in the settings panel.
 * @cssprop --st-cookie-consent-padding - Overrides the bar's padding.
 * @csspart settings - The settings panel.
 */
@customElement('st-cookie-consent')
export class CookieConsent extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    @keyframes st-cookie-slide-up {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    :host {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      max-height: 100vh;
      overflow-y: auto;
      box-sizing: border-box;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: var(--st-space-12);
      /* Compact on a phone: the padding is the mobile value; the desktop rule below widens it.
         !important: a page-level reset (e.g. Tailwind Preflight) otherwise zeroes a shadow host's
         padding; override with --st-cookie-consent-padding instead. */
      padding: var(--st-cookie-consent-padding, var(--st-space-16)) !important;
      background: var(--st-color-surface);
      color: var(--st-color-text);
      border-top: 1px solid var(--st-color-border);
      box-shadow: 0 -4px 10px var(--st-shadow-color-sm);
      animation: st-cookie-slide-up 0.3s ease-out;
      ${rootFontFamilyStyles}
    }

    :host([data-st-modal-hidden]) {
      visibility: hidden;
    }

    :host([data-st-drawer-hidden]) {
      display: none;
    }

    .bar {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-12);
    }

    .content {
      flex: 1;
    }

    .message {
      margin: 0;
      font-size: var(--st-text-sm);
      line-height: 1.5;
    }

    /* Phone: the copy at 14px (the smallest body size the site uses). */
    @media (max-width: 767px) {
      .message {
        font-size: 14px;
      }
    }

    .link {
      color: var(--st-color-accent-text);
      text-decoration: underline;
      margin-left: var(--st-space-4);
    }

    .link:hover {
      text-decoration: none;
    }

    /* One row of buttons on every screen. On a phone they share the row equally. */
    .actions {
      display: flex;
      flex-wrap: nowrap;
      gap: var(--st-space-12);
      flex-shrink: 0;
    }

    .btn {
      ${buttonResetStyles}
      flex: 1 1 0;
      min-width: 0;
      min-height: 44px;
      padding: 0 var(--st-space-12);
      border: 1px solid transparent;
      border-radius: 9999px;
      font-weight: var(--st-font-weight-semibold);
      font-size: var(--st-text-md);
      white-space: nowrap;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }

    .btn:focus-visible {
      outline: 2px solid var(--st-color-accent);
      outline-offset: 2px;
    }

    /* Reject and Accept carry the same weight (refusing must be as easy as accepting): the same size,
       type and outline. Settings uses the same outline. */
    .refuse,
    .accept,
    .settings-toggle {
      background: var(--st-color-surface);
      border-color: var(--st-color-text-strong);
      color: var(--st-color-text-strong);
    }

    .refuse:hover,
    .accept:hover,
    .settings-toggle:hover {
      background: var(--st-color-hover);
    }

    /* The settings panel's save button is the one primary action in that panel. */
    .save {
      background: var(--st-button-primary-bg);
      border-color: transparent;
      color: var(--st-button-primary-color);
    }

    .save:hover {
      opacity: 0.9;
    }

    .settings {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-12);
      margin: 0;
      padding: var(--st-space-16) 0 0;
      border: 0;
      border-top: 1px solid var(--st-color-border);
    }

    .settings legend {
      padding: 0;
      margin-bottom: var(--st-space-8);
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
    }

    .category {
      display: flex;
      gap: var(--st-space-12);
      align-items: flex-start;
      font-size: var(--st-text-md);
      line-height: 1.5;
    }

    .category input {
      width: 18px;
      height: 18px;
      margin: 3px 0 0;
      flex: none;
    }

    .category-label {
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
    }

    .category-description {
      display: block;
      color: var(--st-color-text);
    }

    @media (min-width: 768px) {
      :host {
        gap: var(--st-space-16);
        padding: var(--st-cookie-consent-padding, var(--st-space-16) var(--st-space-32)) !important;
      }

      .bar {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: var(--st-space-16);
      }

      .btn {
        flex: none;
        padding: 0 var(--st-space-20);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        animation: none;
      }
      .btn {
        transition: none;
      }
    }
  `;

  @property({ type: String })
  message = '';

  @property({ type: String, attribute: 'accept-button-text' })
  acceptButtonText = 'Accept';

  @property({ type: String, attribute: 'refuse-button-text' })
  refuseButtonText = 'Reject';

  /** Label of the button that opens the settings panel. Shown only with `categories`. */
  @property({ type: String, attribute: 'settings-button-text' })
  settingsButtonText = 'Settings';

  @property({ type: String, attribute: 'save-button-text' })
  saveButtonText = 'Save choices';

  @property({ type: String, attribute: 'settings-heading' })
  settingsHeading = 'Cookie settings';

  /** Cookie groups for the settings panel. Without any, the bar only offers accept and reject. */
  @property({ attribute: false })
  categories: CookieCategory[] = [];

  @property({ type: String, attribute: 'privacy-policy-link' })
  privacyPolicyLink = '';

  @property({ type: String, attribute: 'privacy-policy-text' })
  privacyPolicyText = 'Privacy Policy';

  @property({ type: String, attribute: 'storage-key' })
  storageKey = DEFAULT_STORAGE_KEY;

  /** The stored choice, or `null` while undecided (the bar is only shown then). */
  @state() private consent: StoredConsent | null = null;
  @state() private settingsOpen = false;
  /** Optional categories ticked in the settings panel (all off until the visitor ticks them). */
  @state() private picked: Record<string, boolean> = {};

  private pageObserver?: MutationObserver;
  private sizeObserver?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this.consent = this.readStored();
    this.pageObserver = new MutationObserver(() => this.syncPageState());
    this.pageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [MODAL_OPEN_ATTRIBUTE, DRAWER_OPEN_ATTRIBUTE]
    });
    this.sizeObserver = new ResizeObserver(() => this.publishBannerHeight());
    this.sizeObserver.observe(this);
    this.syncPageState();
  }

  disconnectedCallback(): void {
    this.pageObserver?.disconnect();
    this.pageObserver = undefined;
    this.sizeObserver?.disconnect();
    this.sizeObserver = undefined;
    document.documentElement.style.removeProperty(BANNER_HEIGHT_PROPERTY);
    super.disconnectedCallback();
  }

  protected updated(): void {
    this.publishBannerHeight();
  }

  /** Follows the page: a modal hides and disables the bar, an open nav drawer hides it (the stored choice is untouched). */
  private syncPageState(): void {
    const root = document.documentElement;
    const blocked = root.hasAttribute(MODAL_OPEN_ATTRIBUTE);
    this.toggleAttribute(MODAL_HIDDEN_ATTRIBUTE, blocked);
    this.toggleAttribute('inert', blocked);
    this.toggleAttribute(DRAWER_HIDDEN_ATTRIBUTE, root.hasAttribute(DRAWER_OPEN_ATTRIBUTE));
    this.publishBannerHeight();
  }

  /** Publishes the bar's height on <html> while it is shown; removes it once dismissed or hidden. */
  private publishBannerHeight(): void {
    const root = document.documentElement;
    const shown = this.isConnected && this.consent === null && !this.hasAttribute(DRAWER_HIDDEN_ATTRIBUTE);
    if (!shown) {
      root.style.removeProperty(BANNER_HEIGHT_PROPERTY);
      return;
    }
    // The height is the box's own: the slide-up animation moves it with a transform, which does not change it.
    root.style.setProperty(BANNER_HEIGHT_PROPERTY, `${this.getBoundingClientRect().height}px`);
  }

  private readStored(): StoredConsent | null {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved === 'accepted' || saved === 'refused') return { status: saved };
      if (saved?.startsWith('{')) {
        const parsed = JSON.parse(saved) as StoredConsent;
        if (parsed.status === 'custom' && parsed.categories && typeof parsed.categories === 'object') return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }

  /** Every category id mapped to whether it is allowed under `status`. */
  private allowedFor(status: CookieConsentStatus, picked: Record<string, boolean>): Record<string, boolean> {
    return Object.fromEntries(
      this.categories.map(category => [
        category.id,
        Boolean(category.required) || status === 'accepted' || (status === 'custom' && Boolean(picked[category.id]))
      ])
    );
  }

  private choose(status: CookieConsentStatus): void {
    const categories = this.allowedFor(status, this.picked);
    const stored: StoredConsent = status === 'custom' ? { status, categories } : { status };
    this.consent = stored;
    try {
      localStorage.setItem(this.storageKey, status === 'custom' ? JSON.stringify(stored) : status);
    } catch {
      // Storage unavailable (private mode, blocked): the choice just doesn't persist.
    }
    const name = { accepted: 'cookie-consent-accept', refused: 'cookie-consent-refuse', custom: 'cookie-consent-save' }[status];
    this.dispatchEvent(new CustomEvent<CookieConsentEventDetail>(name, { detail: { status, categories }, bubbles: true, composed: true }));
  }

  private toggleSettings(): void {
    this.settingsOpen = !this.settingsOpen;
    if (this.settingsOpen) {
      void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLInputElement>('.settings input:not([disabled])')?.focus());
    }
  }

  private renderLink() {
    if (!this.privacyPolicyLink) return nothing;
    const external = /^[a-z][a-z0-9+.-]*:/i.test(this.privacyPolicyLink);
    return external
      ? html`<a class="link" part="link" href=${this.privacyPolicyLink} target="_blank" rel="noopener noreferrer">${this.privacyPolicyText}</a>`
      : html`<a class="link" part="link" href=${this.privacyPolicyLink}>${this.privacyPolicyText}</a>`;
  }

  private renderSettings() {
    return html`<fieldset class="settings" part="settings" id="cookie-settings">
      <legend>${this.settingsHeading}</legend>
      ${this.categories.map(
        category => html`<label class="category">
          <input
            type="checkbox"
            name=${category.id}
            .checked=${Boolean(category.required) || Boolean(this.picked[category.id])}
            ?disabled=${category.required}
            @change=${(event: Event) =>
              (this.picked = { ...this.picked, [category.id]: (event.target as HTMLInputElement).checked })}
          />
          <span>
            <span class="category-label">${category.label}</span>
            ${category.description ? html`<span class="category-description">${category.description}</span>` : nothing}
          </span>
        </label>`
      )}
      <div class="actions">
        <button class="btn save" part="save" type="button" @click=${() => this.choose('custom')}>${this.saveButtonText}</button>
      </div>
    </fieldset>`;
  }

  render() {
    if (this.consent !== null) return nothing;
    const hasSettings = this.categories.length > 0 && Boolean(this.settingsButtonText);
    return html`
      <div class="bar">
        <div class="content" part="content">
          <p class="message" part="message">
            <slot>${this.message || DEFAULT_MESSAGE} ${this.renderLink()}</slot>
          </p>
        </div>
        <div class="actions" part="actions">
          ${hasSettings
            ? html`<button
                class="btn settings-toggle"
                part="settings-toggle"
                type="button"
                aria-expanded=${this.settingsOpen ? 'true' : 'false'}
                aria-controls="cookie-settings"
                @click=${this.toggleSettings}
              >
                ${this.settingsButtonText}
              </button>`
            : nothing}
          <button class="btn refuse" part="refuse" type="button" @click=${() => this.choose('refused')}>${this.refuseButtonText}</button>
          <button class="btn accept" part="accept" type="button" @click=${() => this.choose('accepted')}>${this.acceptButtonText}</button>
        </div>
      </div>
      ${hasSettings && this.settingsOpen ? this.renderSettings() : nothing}
    `;
  }
}
