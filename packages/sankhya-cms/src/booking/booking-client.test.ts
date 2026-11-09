import { describe, expect, it, vi } from 'vitest';

import {
  BOOKING_LIMITS,
  DEFAULT_BOOKING_ERROR_MESSAGES,
  MAX_AVAILABILITY_MS,
  addMonths,
  appointmentPath,
  buildBookingPayload,
  buildManageUrl,
  bookingUrl,
  callBookings,
  dayKey,
  groupSlotsByDay,
  interpretBookingResponse,
  isCallableBase,
  monthCells,
  monthWindow,
  parseBooking,
  parseServices,
  parseSlots,
  readBooking,
  readReferenceParam,
  staffIdToSend,
  validateBooking
} from './booking-client';

const LABELS = { name: 'Name', email: 'Email', phone: 'Phone', notes: 'Notes' };
const VALID = { name: 'Asha Singh', email: 'asha@example.com', phone: '', notes: '', consent: true };

describe('parsing', () => {
  it('keeps usable services and drops the rest', () => {
    const services = parseServices([
      { id: 's1', name: 'Intro call', durationMinutes: 30, online: true, staff: [{ id: 'a', name: 'Ann' }, { id: '', name: 'x' }, 'bad'] },
      { id: '', name: 'No id' },
      'bad',
      { id: 's2', name: 'Review', description: ' Long ', durationMinutes: -5 }
    ]);
    expect(services).toEqual([
      { id: 's1', name: 'Intro call', description: '', durationMinutes: 30, online: true, staff: [{ id: 'a', name: 'Ann' }] },
      { id: 's2', name: 'Review', description: 'Long', durationMinutes: 0, online: false, staff: [] }
    ]);
    expect(parseServices('nope')).toEqual([]);
  });

  it('sorts slots and drops invalid instants', () => {
    const slots = parseSlots([
      { start: '2030-01-02T10:30:00Z', end: '2030-01-02T11:00:00Z', staffIds: ['a'] },
      { start: 'not a date', end: '2030-01-02T11:00:00Z' },
      { start: '2030-01-02T10:00:00Z', end: '2030-01-02T10:30:00Z', staffIds: ['a', 1] }
    ]);
    expect(slots.map(slot => slot.start)).toEqual(['2030-01-02T10:00:00Z', '2030-01-02T10:30:00Z']);
    expect(slots[0]?.staffIds).toEqual(['a']);
  });

  it('reads a booking only when it is complete', () => {
    const booking = { reference: 'tok.en', serviceId: 's', serviceName: 'N', start: '2030-01-02T10:00:00Z', end: '2030-01-02T10:30:00Z' };
    expect(parseBooking(booking)).toEqual(booking);
    expect(parseBooking({ ...booking, reference: '' })).toBeUndefined();
    expect(parseBooking({ ...booking, start: 'x' })).toBeUndefined();
    expect(parseBooking(null)).toBeUndefined();
  });
});

describe('validateBooking', () => {
  it('accepts valid details with an empty phone and notes', () => {
    expect(validateBooking(VALID, LABELS, DEFAULT_BOOKING_ERROR_MESSAGES)).toEqual({});
  });

  it('reports each failing field with its own message', () => {
    const errors = validateBooking(
      { name: ' ', email: 'nope', phone: 'abc', notes: 'x'.repeat(BOOKING_LIMITS.notesMax + 1), consent: false },
      LABELS,
      DEFAULT_BOOKING_ERROR_MESSAGES
    );
    expect(errors).toEqual({
      name: 'Name is required.',
      email: 'Enter a valid email address.',
      phone: DEFAULT_BOOKING_ERROR_MESSAGES.invalidPhone,
      notes: 'Notes must be 1000 characters or fewer.',
      consent: 'Please accept to continue.'
    });
  });

  it('counts code points, not UTF-16 units', () => {
    const notes = '😀'.repeat(BOOKING_LIMITS.notesMax);
    expect(validateBooking({ ...VALID, notes }, LABELS, DEFAULT_BOOKING_ERROR_MESSAGES).notes).toBeUndefined();
  });
});

describe('buildBookingPayload', () => {
  it('has exactly the keys the server accepts, trimmed, and omits an unchosen staff member', () => {
    const payload = buildBookingPayload({ ...VALID, name: '  Asha  ' }, { serviceId: 's1', start: '2030-01-02T10:00:00Z' });
    expect(Object.keys(payload).sort()).toEqual(['consent', 'email', 'name', 'notes', 'phone', 'serviceId', 'start', 'website']);
    expect(payload).toMatchObject({ name: 'Asha', consent: true, website: '' });
  });

  it('includes the staff member when chosen, and refuses a missing consent', () => {
    expect(buildBookingPayload(VALID, { serviceId: 's', staffId: 'a', start: 'x' }).staffId).toBe('a');
    expect(() => buildBookingPayload({ ...VALID, consent: false }, { serviceId: 's', start: 'x' })).toThrow();
    expect(staffIdToSend('')).toBeUndefined();
    expect(staffIdToSend('a')).toBe('a');
  });
});

describe('interpretBookingResponse', () => {
  const booking = { reference: 'r', serviceId: 's', serviceName: 'N', start: '2030-01-02T10:00:00Z', end: '2030-01-02T10:30:00Z' };
  const json = (value: unknown) => JSON.stringify(value);

  it('reads 201 and 200 answers', () => {
    expect(interpretBookingResponse(201, null, json({ ok: true, booking }), readBooking)).toEqual({ kind: 'ok', data: booking });
    expect(interpretBookingResponse(200, null, json({ ok: false }), readBooking)).toEqual({ kind: 'unavailable' });
    expect(interpretBookingResponse(201, null, json({ ok: true }), readBooking)).toEqual({ kind: 'unavailable' });
  });

  it('maps the documented errors', () => {
    const read = () => true as const;
    expect(interpretBookingResponse(400, null, json({ ok: false, error: 'validation', errors: { email: 'bad', name: '' } }), read)).toEqual({
      kind: 'validation',
      errors: { email: 'bad' }
    });
    expect(interpretBookingResponse(409, null, json({ error: 'slot_taken' }), read)).toEqual({ kind: 'slot_taken' });
    expect(interpretBookingResponse(409, null, json({ error: 'too_late' }), read)).toEqual({ kind: 'too_late' });
    expect(interpretBookingResponse(404, null, json({ error: 'not_found' }), read)).toEqual({ kind: 'not_found' });
    expect(interpretBookingResponse(503, null, json({ error: 'disabled' }), read)).toEqual({ kind: 'unavailable' });
    expect(interpretBookingResponse(500, null, 'oops', read)).toEqual({ kind: 'unavailable' });
  });

  it('reads Retry-After on 429 without a body', () => {
    const read = () => true as const;
    expect(interpretBookingResponse(429, '30', '', read)).toEqual({ kind: 'rate_limited', retryAfterSeconds: 30 });
    expect(interpretBookingResponse(429, 'soon', '', read)).toEqual({ kind: 'rate_limited' });
  });
});

describe('callBookings', () => {
  const ok = () => true as const;

  it('sends no cookies, no referrer and no Content-Type on a GET', async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    const result = await callBookings({ base: 'https://api.example.com/', method: 'GET', path: '/services', readOk: ok, fetchImpl });
    expect(result.kind).toBe('ok');
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.example.com/public/v1/bookings/services');
    expect(init).toMatchObject({ method: 'GET', credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store' });
    expect(init.headers).not.toHaveProperty('Content-Type');
    expect(init.body).toBeUndefined();
  });

  it('sends JSON with a Content-Type on a POST', async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    await callBookings({ base: 'https://a.test', method: 'POST', path: '/appointments', body: { a: 1 }, readOk: ok, fetchImpl });
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(init.headers).toMatchObject({ 'Content-Type': 'application/json' });
    expect(init.body).toBe('{"a":1}');
  });

  it('never throws and sends nothing to an uncallable base', async () => {
    const fetchImpl = vi.fn();
    expect(await callBookings({ base: '', method: 'GET', path: '/services', readOk: ok, fetchImpl })).toEqual({ kind: 'unavailable' });
    expect(await callBookings({ base: '/relative', method: 'GET', path: '/services', readOk: ok, fetchImpl })).toEqual({ kind: 'unavailable' });
    expect(fetchImpl).not.toHaveBeenCalled();
    const failing = vi.fn(async () => {
      throw new TypeError('network');
    });
    expect(await callBookings({ base: 'https://a.test', method: 'GET', path: '/x', readOk: ok, fetchImpl: failing })).toEqual({ kind: 'unavailable' });
  });

  it('encodes the reference in the path', () => {
    expect(appointmentPath('a/b+c', '/reschedule')).toBe('/appointments/a%2Fb%2Bc/reschedule');
    expect(bookingUrl(' https://a.test// ', '/services')).toBe('https://a.test/public/v1/bookings/services');
    expect(isCallableBase('ftp://a.test')).toBe(false);
  });
});

describe('the reference in the page URL', () => {
  it('reads ?ref= and #ref=, and prefers neither blank value', () => {
    expect(readReferenceParam('?ref=abc.def', '')).toBe('abc.def');
    expect(readReferenceParam('', '#ref=abc.def')).toBe('abc.def');
    expect(readReferenceParam('', '#/manage?ref=abc')).toBe('abc');
    expect(readReferenceParam('?ref=%20', '')).toBeNull();
    expect(readReferenceParam('?x=1', '#top')).toBeNull();
  });

  it('builds a manage link with the reference in the hash only', () => {
    const link = buildManageUrl('https://site.test/book?ref=old&x=1#old', 'a b.c');
    expect(link).toBe('https://site.test/book?x=1#ref=a%20b.c');
  });
});

describe('calendar arithmetic', () => {
  it('builds rows of seven cells starting on the chosen weekday', () => {
    const june2030 = new Date(2030, 5, 1); // a Saturday
    const monday = monthCells(june2030, 1);
    expect(monday.length % 7).toBe(0);
    expect(monday.slice(0, 5).every(cell => cell === null)).toBe(true);
    expect(monday[5]?.getDate()).toBe(1);
    const sunday = monthCells(june2030, 0);
    expect(sunday.slice(0, 6).every(cell => cell === null)).toBe(true);
    expect(sunday[6]?.getDate()).toBe(1);
    expect(monday.filter(Boolean)).toHaveLength(30);
  });

  it('keeps a month window within the server limit and never in the past', () => {
    const now = new Date(2030, 0, 10, 12, 0);
    const first = monthWindow(new Date(2030, 0, 1), now);
    expect(first.from).toEqual(now);
    expect(first.to).toEqual(new Date(2030, 1, 1));
    const later = monthWindow(new Date(2030, 2, 1), now);
    expect(later.from).toEqual(new Date(2030, 2, 1));
    for (let month = 0; month < 24; month += 1) {
      const window = monthWindow(addMonths(new Date(2030, 0, 1), month), new Date(2029, 0, 1));
      expect(window.to.getTime() - window.from.getTime()).toBeLessThanOrEqual(MAX_AVAILABILITY_MS);
    }
  });

  it('groups slots by the visitor\'s local day', () => {
    const early = new Date(2030, 0, 2, 9, 0);
    const late = new Date(2030, 0, 2, 17, 30);
    const next = new Date(2030, 0, 3, 9, 0);
    const days = groupSlotsByDay(
      [early, late, next].map(date => ({ start: date.toISOString(), end: date.toISOString(), staffIds: [] }))
    );
    expect([...days.keys()]).toEqual([dayKey(early), dayKey(next)]);
    expect(days.get(dayKey(early))).toHaveLength(2);
    expect(dayKey(new Date(2030, 0, 2))).toBe('2030-01-02');
  });
});
