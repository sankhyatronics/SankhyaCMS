/**
 * The DOM-free logic behind `st-booking`: the typed reading of Suite Core's public bookings API, the
 * client-side checks of the visitor's details, the request calls, and the calendar arithmetic. The server's
 * rules stay authoritative; the checks here only give the visitor an answer before a request is made. Kept
 * apart from `Booking.ts` so every rule and every response case can be unit-tested without a browser.
 */

import { codePointLength, fillTemplate, parseRetryAfter } from '../contact-form/contact-form-client';

export { fillTemplate, codePointLength as codePointLengthOf };

/** The fields of the details form, in the order it shows them. Focus moves through them in this order. */
export const BOOKING_FIELD_NAMES = ['name', 'email', 'phone', 'notes', 'consent'] as const;

export type BookingFieldName = (typeof BOOKING_FIELD_NAMES)[number];

/** Length limits, counted in Unicode code points. They match the server's; change both together. */
export const BOOKING_LIMITS = { nameMax: 100, emailMax: 254, phoneMax: 30, notesMax: 1000 } as const;

/** How long a request may take before the component reports that it could not reach the API. */
export const BOOKING_TIMEOUT_MS = 15_000;

/** The longest window one availability request may cover (the server's limit is 31 days). */
export const MAX_AVAILABILITY_MS = 31 * 24 * 3600_000 - 3600_000;

/** How many months ahead the component looks for a first free day before it shows the empty state. */
export const MAX_MONTH_LOOKAHEAD = 3;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9 +\-().]+$/;
const REFERENCE_MAX_LENGTH = 2048;

export interface BookingStaff {
  id: string;
  name: string;
}

export interface BookingService {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  online: boolean;
  staff: BookingStaff[];
}

export interface BookingSlot {
  /** RFC 3339 UTC instant. */
  start: string;
  end: string;
  staffIds: string[];
}

export interface BookingInfo {
  /** A signed token. It is the only key to the booking: never logged, never put in an event. */
  reference: string;
  serviceId: string;
  serviceName: string;
  start: string;
  end: string;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function validInstant(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

/** Keeps the usable services: an object with a non-empty `id` and `name`. */
export function parseServices(input: unknown): BookingService[] {
  if (!Array.isArray(input)) return [];
  const services: BookingService[] = [];
  for (const item of input) {
    if (!isPlainObject(item)) continue;
    const id = str(item.id).trim();
    const name = str(item.name).trim();
    if (id === '' || name === '') continue;
    const staff: BookingStaff[] = [];
    if (Array.isArray(item.staff)) {
      for (const member of item.staff) {
        if (isPlainObject(member) && str(member.id).trim() !== '' && str(member.name).trim() !== '') {
          staff.push({ id: str(member.id).trim(), name: str(member.name).trim() });
        }
      }
    }
    const minutes = typeof item.durationMinutes === 'number' && item.durationMinutes > 0 ? Math.round(item.durationMinutes) : 0;
    services.push({ id, name, description: str(item.description).trim(), durationMinutes: minutes, online: item.online === true, staff });
  }
  return services;
}

/** Keeps the usable slots (valid instants), sorted by start. */
export function parseSlots(input: unknown): BookingSlot[] {
  if (!Array.isArray(input)) return [];
  const slots: BookingSlot[] = [];
  for (const item of input) {
    if (!isPlainObject(item) || !validInstant(item.start) || !validInstant(item.end)) continue;
    const staffIds = Array.isArray(item.staffIds) ? item.staffIds.filter((id): id is string => typeof id === 'string') : [];
    slots.push({ start: item.start, end: item.end, staffIds });
  }
  return slots.sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
}

/** A booking, or `undefined` when the answer is not one. */
export function parseBooking(input: unknown): BookingInfo | undefined {
  if (!isPlainObject(input)) return undefined;
  const reference = str(input.reference).trim();
  if (reference === '' || reference.length > REFERENCE_MAX_LENGTH || !validInstant(input.start) || !validInstant(input.end)) return undefined;
  return { reference, serviceId: str(input.serviceId), serviceName: str(input.serviceName), start: input.start, end: input.end };
}

/* ---------------------------------------------------------------- the visitor's details */

export interface BookingValues {
  name: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
  /** The honeypot input. Real visitors leave it empty. */
  website?: string;
}

export type BookingFieldLabels = Record<'name' | 'email' | 'phone' | 'notes', string>;

/** The client-side messages. `{field}` and `{max}` are filled in. The server's own messages are shown as sent. */
export interface BookingErrorMessages {
  required: string;
  tooLong: string;
  invalidEmail: string;
  invalidPhone: string;
  consentRequired: string;
}

export const DEFAULT_BOOKING_ERROR_MESSAGES: BookingErrorMessages = {
  required: '{field} is required.',
  tooLong: '{field} must be {max} characters or fewer.',
  invalidEmail: 'Enter a valid email address.',
  invalidPhone: 'Use only digits, spaces and + - ( ) . in the phone number.',
  consentRequired: 'Please accept to continue.'
};

export type BookingErrors = Partial<Record<BookingFieldName, string>>;

/** Checks the details the way the server does. Only failing fields appear in the result. */
export function validateBooking(values: BookingValues, labels: BookingFieldLabels, messages: BookingErrorMessages): BookingErrors {
  const errors: BookingErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const notes = values.notes.trim();
  const required = (field: keyof BookingFieldLabels) => fillTemplate(messages.required, { field: labels[field] });
  const tooLong = (field: keyof BookingFieldLabels, max: number) => fillTemplate(messages.tooLong, { field: labels[field], max });

  if (name === '') errors.name = required('name');
  else if (codePointLength(name) > BOOKING_LIMITS.nameMax) errors.name = tooLong('name', BOOKING_LIMITS.nameMax);

  if (email === '') errors.email = required('email');
  else if (codePointLength(email) > BOOKING_LIMITS.emailMax) errors.email = tooLong('email', BOOKING_LIMITS.emailMax);
  else if (!EMAIL_PATTERN.test(email)) errors.email = messages.invalidEmail;

  if (phone !== '') {
    if (codePointLength(phone) > BOOKING_LIMITS.phoneMax) errors.phone = tooLong('phone', BOOKING_LIMITS.phoneMax);
    else if (!PHONE_PATTERN.test(phone)) errors.phone = messages.invalidPhone;
  }

  if (codePointLength(notes) > BOOKING_LIMITS.notesMax) errors.notes = tooLong('notes', BOOKING_LIMITS.notesMax);
  if (!values.consent) errors.consent = messages.consentRequired;
  return errors;
}

/** The first failing field, in form order. */
export function firstInvalidBookingField(errors: BookingErrors): BookingFieldName | undefined {
  return BOOKING_FIELD_NAMES.find(name => errors[name] !== undefined);
}

/** The request body of a new appointment. Exactly these keys, always (the server rejects unknown ones). */
export interface BookingPayload {
  serviceId: string;
  staffId?: string;
  start: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  consent: true;
  website: string;
}

/** Builds the body from checked values: trimmed text, `consent` as the literal `true`, the honeypot as typed. */
export function buildBookingPayload(values: BookingValues, choice: { serviceId: string; staffId?: string; start: string }): BookingPayload {
  if (!values.consent) throw new Error('A booking needs consent.');
  const payload: BookingPayload = {
    serviceId: choice.serviceId,
    start: choice.start,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    notes: values.notes.trim(),
    consent: true,
    website: values.website ?? ''
  };
  if (choice.staffId) payload.staffId = choice.staffId;
  return payload;
}

/* ---------------------------------------------------------------- the API */

/** What a call came back with, already interpreted. */
export type BookingOutcome<T> =
  | { kind: 'ok'; data: T }
  | { kind: 'validation'; errors: Record<string, string> }
  | { kind: 'slot_taken' }
  | { kind: 'too_late' }
  | { kind: 'not_found' }
  | { kind: 'rate_limited'; retryAfterSeconds?: number }
  | { kind: 'unavailable' };

export type BookingFailureKind = Exclude<BookingOutcome<unknown>['kind'], 'ok'>;

function parseJsonObject(text: string): Record<string, unknown> | undefined {
  try {
    const value: unknown = JSON.parse(text);
    return isPlainObject(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Turns a response into an outcome. 429 is read from the status alone. Anything unexpected (a body that is
 * not the documented JSON, an unknown status) is `unavailable`; the response text is never shown.
 */
export function interpretBookingResponse<T>(
  status: number,
  retryAfter: string | null,
  bodyText: string,
  readOk: (body: Record<string, unknown>) => T | undefined
): BookingOutcome<T> {
  if (status === 429) {
    const retryAfterSeconds = parseRetryAfter(retryAfter);
    return retryAfterSeconds === undefined ? { kind: 'rate_limited' } : { kind: 'rate_limited', retryAfterSeconds };
  }
  const body = parseJsonObject(bodyText);
  if (!body) return { kind: 'unavailable' };
  if (status >= 200 && status < 300) {
    if (body.ok !== true) return { kind: 'unavailable' };
    const data = readOk(body);
    return data === undefined ? { kind: 'unavailable' } : { kind: 'ok', data };
  }
  if (status === 400 && body.error === 'validation' && isPlainObject(body.errors)) {
    const errors: Record<string, string> = {};
    for (const [key, message] of Object.entries(body.errors)) {
      if (typeof message === 'string' && message.trim() !== '') errors[key] = message;
    }
    return Object.keys(errors).length > 0 ? { kind: 'validation', errors } : { kind: 'unavailable' };
  }
  if (status === 409 && body.error === 'slot_taken') return { kind: 'slot_taken' };
  if (status === 409 && body.error === 'too_late') return { kind: 'too_late' };
  if (status === 404 && body.error === 'not_found') return { kind: 'not_found' };
  return { kind: 'unavailable' };
}

/** Only `http:` and `https:` bases are called. An empty or relative value is not callable. */
export function isCallableBase(base: string): boolean {
  if (base.trim() === '') return false;
  try {
    const url = new URL(base);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/** `{base}/public/v1/bookings{path}`, with the base's trailing slashes dropped. */
export function bookingUrl(base: string, path: string): string {
  return `${base.trim().replace(/\/+$/, '')}/public/v1/bookings${path}`;
}

/** The path of one appointment. The reference is encoded; it is a secret and never appears in a message. */
export function appointmentPath(reference: string, suffix = ''): string {
  return `/appointments/${encodeURIComponent(reference)}${suffix}`;
}

export type BookingFetch = (input: string, init?: RequestInit) => Promise<Response>;

export interface BookingCall<T> {
  base: string;
  method: 'GET' | 'POST' | 'DELETE';
  path: string;
  body?: unknown;
  readOk: (body: Record<string, unknown>) => T | undefined;
  signal?: AbortSignal;
  timeoutMs?: number;
  fetchImpl?: BookingFetch;
}

/**
 * Calls the API with no cookies and no referrer, and interprets the answer. Never throws: a network error,
 * a timeout, an abort or an uncallable base all give `unavailable` (without a request in the last case).
 * Only requests with a body send a `Content-Type`, so GET and DELETE need no CORS preflight for it.
 */
export async function callBookings<T>(call: BookingCall<T>): Promise<BookingOutcome<T>> {
  const { base, method, path, body, readOk, signal, timeoutMs = BOOKING_TIMEOUT_MS, fetchImpl = globalThis.fetch } = call;
  if (!isCallableBase(base) || signal?.aborted) return { kind: 'unavailable' };
  const controller = new AbortController();
  const abort = () => controller.abort();
  const timer = setTimeout(abort, timeoutMs);
  signal?.addEventListener('abort', abort, { once: true });
  try {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    const response = await fetchImpl(bookingUrl(base, path), {
      method,
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-store',
      referrerPolicy: 'no-referrer',
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal
    });
    const text = await response.text();
    return interpretBookingResponse(response.status, response.headers.get('Retry-After'), text, readOk);
  } catch {
    return { kind: 'unavailable' };
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
  }
}

/** Read helpers for `callBookings`. */
export const readServices = (body: Record<string, unknown>) => parseServices(body.services);
export const readSlots = (body: Record<string, unknown>) => parseSlots(body.slots);
export const readBooking = (body: Record<string, unknown>) => parseBooking(body.booking);
export const readNothing = () => true as const;

/* ---------------------------------------------------------------- the reference in the page URL */

/** The `ref` of a query string or a hash (`?ref=...`, `#ref=...`, `#/x?ref=...`). `null` when absent or blank. */
export function readReferenceParam(search: string, hash: string): string | null {
  const fromQuery = new URLSearchParams(search).get('ref');
  if (fromQuery?.trim()) return fromQuery.trim();
  const fragment = hash.replace(/^#/, '');
  const queryStart = fragment.indexOf('?');
  const params = new URLSearchParams(queryStart >= 0 ? fragment.slice(queryStart + 1) : fragment);
  const fromHash = params.get('ref');
  return fromHash?.trim() ? fromHash.trim() : null;
}

/**
 * The link that opens a booking: the page's address with the reference in the hash. A hash is not sent to
 * any server and not in a Referer header; any `ref` already in the query or hash is replaced.
 */
export function buildManageUrl(pageUrl: string, reference: string): string {
  const url = new URL(pageUrl);
  url.searchParams.delete('ref');
  url.hash = `ref=${encodeURIComponent(reference)}`;
  return url.toString();
}

/* ---------------------------------------------------------------- calendar arithmetic (visitor's local time) */

/** `YYYY-MM-DD` of a date in the visitor's time zone. */
export function dayKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function parseDayKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(month: Date, count: number): Date {
  return new Date(month.getFullYear(), month.getMonth() + count, 1);
}

export function addDays(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + count);
}

/**
 * The availability window for a month: from now (or the month's first instant, if later) to the month's end,
 * never longer than the server allows.
 */
export function monthWindow(month: Date, now: Date): { from: Date; to: Date } {
  const first = startOfMonth(month);
  const from = first.getTime() > now.getTime() ? first : now;
  const end = addMonths(first, 1);
  const to = new Date(Math.min(end.getTime(), from.getTime() + MAX_AVAILABILITY_MS));
  return { from, to };
}

/** Slots grouped by local day, in time order. */
export function groupSlotsByDay(slots: readonly BookingSlot[]): Map<string, BookingSlot[]> {
  const days = new Map<string, BookingSlot[]>();
  for (const slot of slots) {
    const key = dayKey(new Date(slot.start));
    const list = days.get(key);
    if (list) list.push(slot);
    else days.set(key, [slot]);
  }
  return days;
}

/** The cells of a month: `null` pads before the first and after the last day, so rows have seven cells. */
export function monthCells(month: Date, weekStart: 0 | 1): (Date | null)[] {
  const first = startOfMonth(month);
  const lead = (first.getDay() - weekStart + 7) % 7;
  const count = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= count; day += 1) cells.push(new Date(first.getFullYear(), first.getMonth(), day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/** The staff id to send: the chosen member, or none (the server picks) for "any available". */
export function staffIdToSend(chosen: string): string | undefined {
  return chosen === '' ? undefined : chosen;
}
