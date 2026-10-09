import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { buttonResetStyles, controlBaseStyles, rootFontFamilyStyles } from '../shared/styles';
import type { CookieConsentEventDetail, CookieConsentStatus } from './CookieConsentEvents';

const DEFAULT_STORAGE_KEY = 'sankhya_ui_cookie_consent';

/**
 * Fixed bottom consent bar. The source read/wrote consent through a React `UserContext`; here the
 * element persists the choice itself in localStorage (`storage-key`, default the source's
 * `sankhya_ui_cookie_consent`; storage errors are ignored) and renders nothing once a choice
 * exists. Fires `cookie-consent-accept` / `cookie-consent-refuse` (detail `{ status }`). The
 * default slot replaces the message text.
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
      box-sizing: border-box;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: var(--st-space-16);
      padding: var(--st-space-24);
      background: var(--st-color-surface);
      color: var(--st-color-text);
      border-top: 1px solid var(--st-color-border);
      box-shadow: 0 -4px 10px var(--st-shadow-color-sm);
      animation: st-cookie-slide-up 0.3s ease-out;
      ${rootFontFamilyStyles}
    }

    .content {
      flex: 1;
    }

    .message {
      margin: 0;
      font-size: var(--st-text-md);
      line-height: 1.5;
    }

    .link {
      color: var(--st-color-accent-text);
      text-decoration: underline;
      margin-left: var(--st-space-4);
    }

    .link:hover {
      text-decoration: none;
    }

    .actions {
      display: flex;
      gap: var(--st-space-12);
      flex-shrink: 0;
    }

    .btn {
      ${buttonResetStyles}
      padding: var(--st-space-8) var(--st-space-16);
      border: 1px solid transparent;
      border-radius: var(--st-radius-xs);
      font-weight: var(--st-font-weight-medium);
      font-size: var(--st-text-md);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }

    .accept {
      background: var(--st-button-primary-bg);
      color: var(--st-button-primary-color);
    }

    .accept:hover {
      opacity: 0.9;
    }

    .refuse {
      border-color: var(--st-color-border);
      color: var(--st-color-text-muted);
    }

    .refuse:hover {
      background: var(--st-color-hover);
      color: var(--st-color-text-strong);
    }

    @media (min-width: 768px) {
      :host {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: var(--st-space-16) var(--st-space-32);
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
  refuseButtonText = 'Refuse';

  @property({ type: String, attribute: 'privacy-policy-link' })
  privacyPolicyLink = '';

  @property({ type: String, attribute: 'privacy-policy-text' })
  privacyPolicyText = 'Privacy Policy';

  @property({ type: String, attribute: 'storage-key' })
  storageKey = DEFAULT_STORAGE_KEY;

  /** The stored choice, or `null` while undecided (the bar is only shown then). */
  @state() private consent: CookieConsentStatus | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.consent = this.readStored();
  }

  private readStored(): CookieConsentStatus | null {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved === 'accepted' || saved === 'refused' ? saved : null;
    } catch {
      return null;
    }
  }

  private choose(status: CookieConsentStatus): void {
    this.consent = status;
    try {
      localStorage.setItem(this.storageKey, status);
    } catch {
      // Storage unavailable (private mode, blocked): the choice just doesn't persist.
    }
    this.dispatchEvent(
      new CustomEvent<CookieConsentEventDetail>(status === 'accepted' ? 'cookie-consent-accept' : 'cookie-consent-refuse', {
        detail: { status },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    if (this.consent !== null) return nothing;
    return html`
      <div class="content" part="content">
        <p class="message" part="message">
          <slot>
            ${this.message || 'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.'}
            ${this.privacyPolicyLink
              ? html`<a class="link" part="link" href=${this.privacyPolicyLink} target="_blank" rel="noopener noreferrer">${this.privacyPolicyText}</a>`
              : nothing}
          </slot>
        </p>
      </div>
      <div class="actions" part="actions">
        <button class="btn refuse" part="refuse" type="button" @click=${() => this.choose('refused')}>${this.refuseButtonText}</button>
        <button class="btn accept" part="accept" type="button" @click=${() => this.choose('accepted')}>${this.acceptButtonText}</button>
      </div>
    `;
  }
}
