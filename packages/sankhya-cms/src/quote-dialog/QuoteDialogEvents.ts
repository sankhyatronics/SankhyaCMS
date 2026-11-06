/** Window-level event that asks a `st-quote-dialog` with the matching `id` to open. */
export const QUOTE_OPEN_EVENT = 'st-quote-open';

/** Detail of `st-quote-open`. `trigger` is the element that opened the dialog; focus returns to it on close. */
export interface QuoteOpenEventDetail {
  /** The `id` of the `st-quote-dialog` to open. */
  dialog: string;
  /** Option to preselect (an option `id`, or `unsure`). */
  option?: string;
  trigger?: HTMLElement | null;
}

/** Detail of the `quote-submit` event: the chosen option and every field the visitor filled in. */
export interface QuoteSubmitEventDetail {
  option: string;
  name: string;
  email: string;
  company: string;
  count: string;
  message: string;
  consent: boolean;
}
