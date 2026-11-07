/*
 * Events of `st-contact-form`. They bubble and are composed, and none of them carries personal data: no name,
 * e-mail address, company, phone number or message text. `topic` is one of the configured topic values.
 */

/**
 * Fired on `st-contact-form` once the fields pass the checks and the request is about to be sent.
 * Detail `{ topic }`. Bubbles and is composed.
 */
export const CONTACT_FORM_SUBMIT_EVENT = 'st-contact-form-submit';

/** Fired on `st-contact-form` when the API accepted the message. Bubbles and is composed. */
export const CONTACT_FORM_SENT_EVENT = 'st-contact-form-sent';

/** Fired on `st-contact-form` when a submission was not accepted. Bubbles and is composed. */
export const CONTACT_FORM_ERROR_EVENT = 'st-contact-form-error';

/**
 * Why a submission was not accepted: `validation` (the server rejected a field), `rate_limited` (too many
 * messages in a short time) or `unavailable` (the form could not reach the API, or the API failed).
 */
export type ContactFormErrorKind = 'validation' | 'rate_limited' | 'unavailable';

export interface ContactFormSubmitEventDetail {
  /** The chosen topic's `value` (a configured key, not typed by the visitor). */
  topic: string;
}

export interface ContactFormSentEventDetail {
  /** The reference the API gave the message, when it gave one. */
  reference?: string;
}

export interface ContactFormErrorEventDetail {
  kind: ContactFormErrorKind;
}
