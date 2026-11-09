/** One labelled line of a `mailto:` body. */
export interface MailtoField {
  label: string;
  value: string;
}

export interface MailtoInput {
  /** Recipient address. */
  to: string;
  subject: string;
  /** Written into the body as one `Label: value` line each, in order. */
  fields: MailtoField[];
  /**
   * Longest the percent-encoded body may be (default 1800). Mail apps and browsers cut off long
   * `mailto:` URLs, so the field picked by `truncateField` is shortened with "…" until the body fits.
   */
  maxBodyLength?: number;
  /** Index of the field to shorten when the body is too long (default: the last field). */
  truncateField?: number;
}

export const DEFAULT_MAILTO_BODY_LIMIT = 1800;

const ELLIPSIS = '…';

function bodyText(fields: MailtoField[]): string {
  return fields.map(field => `${field.label}: ${field.value.trim() || '-'}`).join('\n');
}

/**
 * Builds a `mailto:` URL whose body is plain text: one `Label: value` line per field (an empty value
 * is written as `-`). Subject and body are percent-encoded, so line breaks and symbols survive the
 * URL. When the encoded body is longer than `maxBodyLength`, one field (the last, unless
 * `truncateField` says otherwise) is cut short, on a character boundary, and ends in "…".
 */
export function buildMailto({ to, subject, fields, maxBodyLength = DEFAULT_MAILTO_BODY_LIMIT, truncateField }: MailtoInput): string {
  const url = (body: string) => `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const full = bodyText(fields);
  if (encodeURIComponent(full).length <= maxBodyLength || fields.length === 0) return url(full);

  const target = Math.min(Math.max(truncateField ?? fields.length - 1, 0), fields.length - 1);
  // Array.from splits by code point, so a cut never leaves half of a surrogate pair.
  const chars = Array.from(fields[target].value.trim());
  const withLength = (length: number) =>
    bodyText(fields.map((field, i) => (i === target ? { ...field, value: chars.slice(0, length).join('').trimEnd() + ELLIPSIS } : field)));

  // Longest prefix of the field that still fits (binary search; 0 keeps just the ellipsis).
  let low = 0;
  let high = chars.length;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (encodeURIComponent(withLength(mid)).length <= maxBodyLength) low = mid;
    else high = mid - 1;
  }
  return url(withLength(low));
}
