/** One labelled line of the request e-mail. */
export interface QuoteMailField {
  label: string;
  value: string;
}

export interface QuoteMailtoInput {
  /** Recipient address. */
  to: string;
  subject: string;
  /** Human label of the chosen option, written into the body. */
  optionLabel: string;
  fields: QuoteMailField[];
}

/**
 * Builds a `mailto:` URL whose body is plain text: the chosen option, then one `Label: value` line
 * per field. Subject and body are percent-encoded, so line breaks and symbols survive the URL.
 * An empty value is written as `-`.
 */
export function buildQuoteMailto({ to, subject, optionLabel, fields }: QuoteMailtoInput): string {
  const body = [`Option: ${optionLabel}`, ...fields.map(field => `${field.label}: ${field.value.trim() || '-'}`)].join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
