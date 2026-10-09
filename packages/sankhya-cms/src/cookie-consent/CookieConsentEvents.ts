export type CookieConsentStatus = 'accepted' | 'refused';

/** Detail of `cookie-consent-accept` / `cookie-consent-refuse` (source: `onAccept` / `onRefuse`). */
export interface CookieConsentEventDetail {
  status: CookieConsentStatus;
}
