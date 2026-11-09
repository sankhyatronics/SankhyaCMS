/** `accepted`: every category on. `refused`: only required categories. `custom`: picked in the settings. */
export type CookieConsentStatus = 'accepted' | 'refused' | 'custom';

/** One group of cookies the visitor can allow or block in the settings panel. */
export interface CookieCategory {
  id: string;
  label: string;
  description?: string;
  /** Always on (e.g. strictly necessary cookies); shown checked and disabled. */
  required?: boolean;
}

/**
 * Detail of `cookie-consent-accept` / `cookie-consent-refuse` / `cookie-consent-save`.
 * `categories` maps every category id to whether it is allowed (required ones are always `true`).
 */
export interface CookieConsentEventDetail {
  status: CookieConsentStatus;
  categories: Record<string, boolean>;
}
