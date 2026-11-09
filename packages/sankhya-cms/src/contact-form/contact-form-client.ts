/**
 * The DOM-free logic behind `st-contact-form`: the client-side checks, the request body, the call itself
 * and the reading of its answer. The server's rules stay authoritative; the checks here only give the
 * visitor an answer before a request is made. Kept apart from `ContactForm.ts` so every rule and every
 * response case can be unit-tested without a browser.
 */

/** The fields, in the order the form shows them. Focus moves through them in this order. */
export const CONTACT_FIELD_NAMES = ['name', 'email', 'company', 'phone', 'topic', 'message', 'consent'] as const;

export type ContactFieldName = (typeof CONTACT_FIELD_NAMES)[number];

/** Length limits, counted in Unicode code points. They match the server's; change both together. */
export const CONTACT_LIMITS = {
  nameMax: 100,
  emailMax: 254,
  companyMax: 120,
  phoneMax: 30,
  messageMin: 10,
  messageMax: 2000
} as const;

/** The message counter shows from this share of the limit. */
export const COUNTER_SHOW_RATIO = 0.8;

/** Failing fields from which the form shows a summary (with links) instead of focusing the first field. */
export const ERROR_SUMMARY_MIN = 3;

const MAILTO_PATTERN = /^[^\s@<>"'`\\]+@[^\s@<>"'`\\]+\.[^\s@<>"'`\\]+$/;

/** The address when it is safe to put in a `mailto:` link, else `undefined`. */
export function safeMailto(address: string): string | undefined {
  const trimmed = address.trim();
  return MAILTO_PATTERN.test(trimmed) ? trimmed : undefined;
}

/** Splits a note at its `{mailto}` placeholders: the text pieces, with `null` where the link goes. */
export function splitMailto(note: string): (string | null)[] {
  const pieces: (string | null)[] = [];
  note.split('{mailto}').forEach((part, index) => {
    if (index > 0) pieces.push(null);
    if (part !== '') pieces.push(part);
  });
  return pieces;
}

/** 0 below 80% of the limit, 1 from 80%, 2 from 90%, 3 once over. Screen readers hear a change of band, not every key. */
export function counterBand(length: number, max: number): 0 | 1 | 2 | 3 {
  if (length > max) return 3;
  if (length >= max * 0.9) return 2;
  if (length >= max * COUNTER_SHOW_RATIO) return 1;
  return 0;
}

/** How long a submission may take before the form reports that it could not be sent. */
export const CONTACT_TIMEOUT_MS = 15_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9 +\-().]+$/;
const RETRY_AFTER_PATTERN = /^\d+(\.\d+)?$/;
const RETRY_AFTER_MIN_SECONDS = 1;
const RETRY_AFTER_MAX_SECONDS = 3600;
const REFERENCE_MAX_LENGTH = 64;

/** One choice in the topic list. `group` puts it under an `<optgroup>` with that label. */
export interface ContactTopic {
  value: string;
  label: string;
  group?: string;
}

/** The raw values read from the form. Strings are as typed; `consent` is the checkbox. */
export interface ContactValues {
  name: string;
  email: string;
  company: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
  /** The honeypot input. Real visitors leave it empty. */
  website?: string;
}

/** The visible label of each text field, used in the "... is required." messages. */
export type ContactFieldLabels = Record<'name' | 'email' | 'company' | 'phone' | 'topic' | 'message', string>;

/**
 * The client-side messages. `{field}`, `{max}`, `{min}` are filled in. The server's messages are shown
 * as the server sends them, so these are the only text the component writes itself.
 */
export interface ContactErrorMessages {
  required: string;
  tooLong: string;
  invalidEmail: string;
  invalidPhone: string;
  unknownTopic: string;
  messageTooShort: string;
  messageTooLong: string;
  consentRequired: string;
}

export const DEFAULT_ERROR_MESSAGES: ContactErrorMessages = {
  required: '{field} is required.',
  tooLong: '{field} must be {max} characters or fewer.',
  invalidEmail: 'Enter a valid email address.',
  invalidPhone: 'Use only digits, spaces and + - ( ) . in the phone number.',
  unknownTopic: 'Choose a topic from the list.',
  messageTooShort: 'Your message must be at least {min} characters.',
  messageTooLong: 'Your message must be {max} characters or fewer.',
  consentRequired: 'Please accept to continue.'
};

/** Field name to message, for the fields that have one. */
export type ContactErrors = Partial<Record<ContactFieldName, string>>;

export interface ContactValidationOptions {
  labels: ContactFieldLabels;
  topics: readonly ContactTopic[];
  messages: ContactErrorMessages;
}

/** The request body. Exactly these keys, always. */
export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  phone: string;
  topic: string;
  message: string;
  consent: true;
  page: string;
  locale: string;
  submittedAt: string;
  website: string;
}

/** What a submission came back with, already interpreted. */
export type ContactSubmitResult =
  | { kind: 'sent'; reference?: string }
  | { kind: 'validation'; errors: ContactErrors; formMessage?: string }
  | { kind: 'rate_limited'; retryAfterSeconds?: number }
  | { kind: 'unavailable' };

/** The number of Unicode code points, so an emoji counts as one character. */
export function codePointLength(text: string): number {
  return [...text].length;
}

/** Replaces `{name}` placeholders in one pass. Substituted text is never scanned again. */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (placeholder, key: string) => (Object.hasOwn(values, key) ? String(values[key]) : placeholder));
}

/** Checks the values the way the server does. Only failing fields appear in the result. */
export function validateContact(values: ContactValues, options: ContactValidationOptions): ContactErrors {
  const { labels, topics, messages } = options;
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const company = values.company.trim();
  const phone = values.phone.trim();
  const topic = values.topic.trim();
  const message = values.message.trim();
  const required = (field: keyof ContactFieldLabels) => fillTemplate(messages.required, { field: labels[field] });
  const tooLong = (field: keyof ContactFieldLabels, max: number) => fillTemplate(messages.tooLong, { field: labels[field], max });

  if (name === '') errors.name = required('name');
  else if (codePointLength(name) > CONTACT_LIMITS.nameMax) errors.name = tooLong('name', CONTACT_LIMITS.nameMax);

  if (email === '') errors.email = required('email');
  else if (codePointLength(email) > CONTACT_LIMITS.emailMax) errors.email = tooLong('email', CONTACT_LIMITS.emailMax);
  else if (!EMAIL_PATTERN.test(email)) errors.email = messages.invalidEmail;

  if (company === '') errors.company = required('company');
  else if (codePointLength(company) > CONTACT_LIMITS.companyMax) errors.company = tooLong('company', CONTACT_LIMITS.companyMax);

  if (phone !== '') {
    if (codePointLength(phone) > CONTACT_LIMITS.phoneMax) errors.phone = tooLong('phone', CONTACT_LIMITS.phoneMax);
    else if (!PHONE_PATTERN.test(phone)) errors.phone = messages.invalidPhone;
  }

  if (topic === '') errors.topic = required('topic');
  else if (topics.length > 0 && !topics.some(item => item.value === topic)) errors.topic = messages.unknownTopic;

  const length = codePointLength(message);
  if (length === 0) errors.message = required('message');
  else if (length < CONTACT_LIMITS.messageMin) errors.message = fillTemplate(messages.messageTooShort, { min: CONTACT_LIMITS.messageMin });
  else if (length > CONTACT_LIMITS.messageMax) errors.message = fillTemplate(messages.messageTooLong, { max: CONTACT_LIMITS.messageMax });

  if (!values.consent) errors.consent = messages.consentRequired;
  return errors;
}

/** The first failing field, in form order. */
export function firstInvalidField(errors: ContactErrors): ContactFieldName | undefined {
  return CONTACT_FIELD_NAMES.find(name => errors[name] !== undefined);
}

/**
 * Builds the request body from checked values: trimmed text, `consent` as the literal `true`, and the
 * honeypot value as typed (normally empty). Throws if consent is missing, which validation prevents.
 */
export function buildContactPayload(values: ContactValues, meta: { page: string; locale: string; now: Date }): ContactPayload {
  if (!values.consent) throw new Error('A contact request needs consent.');
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    phone: values.phone.trim(),
    topic: values.topic.trim(),
    message: values.message.trim(),
    consent: true,
    page: meta.page,
    locale: meta.locale,
    submittedAt: meta.now.toISOString(),
    website: values.website ?? ''
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Keeps the usable topics: an object with a non-empty `value` (the first of each value wins). A missing
 * `label` falls back to the value; a blank `group` means no group.
 */
export function normalizeTopics(input: unknown): ContactTopic[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const topics: ContactTopic[] = [];
  for (const item of input) {
    if (!isPlainObject(item)) continue;
    const value = typeof item.value === 'string' ? item.value.trim() : '';
    if (value === '' || seen.has(value)) continue;
    seen.add(value);
    const label = typeof item.label === 'string' && item.label.trim() !== '' ? item.label.trim() : value;
    const group = typeof item.group === 'string' && item.group.trim() !== '' ? item.group.trim() : undefined;
    topics.push(group === undefined ? { value, label } : { value, label, group });
  }
  return topics;
}

/** Reads the `topics` attribute (a JSON array). Anything unreadable gives an empty list. */
export function parseTopicsAttribute(text: string | null): ContactTopic[] {
  if (text === null || text.trim() === '') return [];
  try {
    return normalizeTopics(JSON.parse(text));
  } catch {
    return [];
  }
}

/** One `<optgroup>` (or the ungrouped options when `group` is undefined), in order of first appearance. */
export interface TopicGroup {
  group?: string;
  topics: ContactTopic[];
}

export function groupTopics(topics: readonly ContactTopic[]): TopicGroup[] {
  const groups: TopicGroup[] = [];
  for (const topic of topics) {
    let group = groups.find(item => item.group === topic.group);
    if (!group) {
      group = topic.group === undefined ? { topics: [] } : { group: topic.group, topics: [] };
      groups.push(group);
    }
    group.topics.push(topic);
  }
  return groups;
}

export interface ContactQuery {
  product: string | null;
  topic: string | null;
}

/** Reads `product` and `topic` from a query string. Key names are matched without regard to case. */
export function readContactQuery(search: string): ContactQuery {
  const query: ContactQuery = { product: null, topic: null };
  new URLSearchParams(search).forEach((value, key) => {
    const name = key.toLowerCase();
    if (name === 'product' && query.product === null) query.product = value;
    if (name === 'topic' && query.topic === null) query.topic = value;
  });
  return query;
}

/**
 * The topic to preselect. `?product=` wins, then `?topic=`, each only when it names one of the topics
 * (compared without case). Otherwise `defaultTopic` if it is one of the topics. `fromQuery` is true when
 * the page's URL chose it.
 */
export function resolvePreselectedTopic(
  topics: readonly ContactTopic[],
  options: { defaultTopic?: string; product?: string | null; topic?: string | null }
): { value: string; fromQuery: boolean } {
  const findByName = (candidate: string | null | undefined): ContactTopic | undefined => {
    const wanted = candidate?.trim().toLowerCase();
    if (!wanted) return undefined;
    return topics.find(item => item.value.toLowerCase() === wanted);
  };
  const byProduct = findByName(options.product);
  if (byProduct) return { value: byProduct.value, fromQuery: true };
  const byTopic = findByName(options.topic);
  if (byTopic) return { value: byTopic.value, fromQuery: true };
  const wantedDefault = options.defaultTopic?.trim();
  const byDefault = wantedDefault ? topics.find(item => item.value === wantedDefault) : undefined;
  return { value: byDefault?.value ?? '', fromQuery: false };
}

/**
 * Reads a `Retry-After` header given in seconds. Anything that is not a plain number gives `undefined`
 * (the generic note). Numbers are rounded up and clamped to 1..3600.
 */
export function parseRetryAfter(raw: string | null): number | undefined {
  if (raw === null) return undefined;
  const trimmed = raw.trim();
  if (!RETRY_AFTER_PATTERN.test(trimmed)) return undefined;
  const seconds = Math.ceil(Number(trimmed));
  return Math.min(RETRY_AFTER_MAX_SECONDS, Math.max(RETRY_AFTER_MIN_SECONDS, seconds));
}

function parseJsonObject(text: string): Record<string, unknown> | undefined {
  try {
    const value: unknown = JSON.parse(text);
    return isPlainObject(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

/** A reference is shown as text. Only a short non-empty string is accepted. */
function parseReference(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed !== '' && trimmed.length <= REFERENCE_MAX_LENGTH ? trimmed : undefined;
}

function unavailable(): ContactSubmitResult {
  return { kind: 'unavailable' };
}

function interpretValidation(body: Record<string, unknown>): ContactSubmitResult {
  const raw = body.errors;
  if (!isPlainObject(raw)) return unavailable();
  const fieldNames: readonly string[] = CONTACT_FIELD_NAMES;
  const errors: ContactErrors = {};
  let formMessage: string | undefined;
  for (const [key, message] of Object.entries(raw)) {
    if (typeof message !== 'string' || message.trim() === '') continue;
    if (fieldNames.includes(key)) errors[key as ContactFieldName] ??= message;
    else formMessage ??= message;
  }
  if (Object.keys(errors).length === 0 && formMessage === undefined) return unavailable();
  return formMessage === undefined ? { kind: 'validation', errors } : { kind: 'validation', errors, formMessage };
}

/**
 * Turns a response into the outcome the form shows. Only the documented answers count:
 * 200 or 201 with `ok: true` (a reference is optional), 400 with an `errors` object, 429 (the body is
 * ignored). Any other answer, or any body that is not the expected JSON, is `unavailable`. The response
 * text is never shown.
 */
export function interpretContactResponse(status: number, retryAfter: string | null, bodyText: string): ContactSubmitResult {
  if (status === 429) {
    const retryAfterSeconds = parseRetryAfter(retryAfter);
    return retryAfterSeconds === undefined ? { kind: 'rate_limited' } : { kind: 'rate_limited', retryAfterSeconds };
  }
  const body = parseJsonObject(bodyText);
  if (!body) return unavailable();
  if (status === 200 || status === 201) {
    if (body.ok !== true) return unavailable();
    const reference = parseReference(body.reference);
    return reference === undefined ? { kind: 'sent' } : { kind: 'sent', reference };
  }
  if (status === 400) return interpretValidation(body);
  return unavailable();
}

/** Only `http:` and `https:` URLs are sent to. An empty or relative value is not sendable. */
export function isSubmittableEndpoint(endpoint: string): boolean {
  if (endpoint.trim() === '') return false;
  try {
    const url = new URL(endpoint);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/** The part of `fetch` the submission uses: a string URL in, a response out. */
export type ContactFetch = (input: string, init?: RequestInit) => Promise<Response>;

export interface ContactSubmitOptions {
  endpoint: string;
  payload: ContactPayload;
  /** Aborts the request (the element passes this when it is removed from the page). */
  signal?: AbortSignal;
  timeoutMs?: number;
  fetchImpl?: ContactFetch;
}

/**
 * Posts the payload as JSON, with no cookies, and interprets the answer. Never throws: a network error,
 * a timeout, an abort or an unsendable endpoint all give `unavailable` (without a request in the last case).
 */
export async function submitContact(options: ContactSubmitOptions): Promise<ContactSubmitResult> {
  const { endpoint, payload, signal, timeoutMs = CONTACT_TIMEOUT_MS, fetchImpl = globalThis.fetch } = options;
  if (!isSubmittableEndpoint(endpoint) || signal?.aborted) return unavailable();
  const controller = new AbortController();
  const abort = () => controller.abort();
  const timer = setTimeout(abort, timeoutMs);
  signal?.addEventListener('abort', abort, { once: true });
  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    const text = await response.text();
    return interpretContactResponse(response.status, response.headers.get('Retry-After'), text);
  } catch {
    return unavailable();
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
  }
}
