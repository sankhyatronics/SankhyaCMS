import { buildMailto, type MailtoField } from '../shared/mailto';

/** One labelled line of the request e-mail. */
export type QuoteMailField = MailtoField;

export interface QuoteMailtoInput {
  /** Recipient address. */
  to: string;
  subject: string;
  /** Human label of the chosen option, written into the body. */
  optionLabel: string;
  fields: QuoteMailField[];
  /** Longest the encoded body may be; the last field is shortened with "…" to fit (default 1800). */
  maxBodyLength?: number;
}

/**
 * Builds a `mailto:` URL whose body is plain text: the chosen option, then one `Label: value` line
 * per field (see `buildMailto`). Subject and body are percent-encoded, so line breaks and symbols
 * survive the URL. An empty value is written as `-`.
 */
export function buildQuoteMailto({ to, subject, optionLabel, fields, maxBodyLength }: QuoteMailtoInput): string {
  return buildMailto({ to, subject, fields: [{ label: 'Option', value: optionLabel }, ...fields], maxBodyLength });
}

/** Fills `{name}` placeholders in a subject or text line; unknown names are left as they are. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (Object.hasOwn(values, key) ? values[key] : match));
}
