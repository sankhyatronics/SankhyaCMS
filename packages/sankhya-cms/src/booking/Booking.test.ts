// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

// Side-effect import on purpose: defines `st-booking`. The class is used only as a type below.
import './Booking';
import type { Booking } from './Booking';
import { BOOKING_CANCELLED_EVENT, BOOKING_CREATED_EVENT, BOOKING_ERROR_EVENT, BOOKING_RESCHEDULED_EVENT } from './BookingEvents';
import { dayKey } from './booking-client';

const BASE = 'https://api.example.com';
const REF = 'signed.token-ref';

const SERVICES = [
  { id: 's1', name: 'Intro call', description: 'A first chat', durationMinutes: 30, online: true, staff: [{ id: 'a', name: 'Ann' }, { id: 'b', name: 'Bob' }] },
  { id: 's2', name: 'Review', description: '', durationMinutes: 60, online: false, staff: [] }
];

/** A free slot two days from now at 10:00 local, so it is always in the future. */
function slotDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  date.setHours(10, 0, 0, 0);
  return date;
}

const bookingBody = (start: Date) => ({
  reference: REF,
  serviceId: 's1',
  serviceName: 'Intro call',
  start: start.toISOString(),
  end: new Date(start.getTime() + 1_800_000).toISOString()
});

type Route = (url: URL, init: RequestInit) => Response | undefined;

let hosts: HTMLElement[] = [];
let calls: { url: URL; init: RequestInit }[] = [];

afterEach(() => {
  for (const host of hosts) host.remove();
  hosts = [];
  calls = [];
  vi.unstubAllGlobals();
  window.history.replaceState({}, '', '/');
});

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });

/** The API: services, availability (only slots inside the asked window), and whatever `extra` routes add. */
function stubApi(extra: Route = () => undefined) {
  const slot = slotDate();
  const fetchMock = vi.fn(async (input: string, init: RequestInit = {}) => {
    const url = new URL(input);
    calls.push({ url, init });
    const custom = extra(url, init);
    if (custom) return custom;
    if (url.pathname.endsWith('/bookings/services')) return json(200, { ok: true, services: SERVICES });
    if (url.pathname.endsWith('/bookings/availability')) {
      const from = Date.parse(url.searchParams.get('from') ?? '');
      const to = Date.parse(url.searchParams.get('to') ?? '');
      const inside = slot.getTime() >= from && slot.getTime() < to;
      return json(200, { ok: true, slots: inside ? [{ start: slot.toISOString(), end: new Date(slot.getTime() + 1_800_000).toISOString(), staffIds: ['a', 'b'] }] : [] });
    }
    if (init.method === 'GET' && url.pathname.includes('/appointments/')) return json(200, { ok: true, booking: bookingBody(slot) });
    return json(404, { ok: false, error: 'not_found' });
  });
  vi.stubGlobal('fetch', fetchMock);
  return { fetchMock, slot };
}

async function settle(element: Booking, rounds = 6): Promise<void> {
  for (let i = 0; i < rounds; i += 1) {
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}

async function mount(props: Partial<Booking> = {}): Promise<Booking> {
  const host = document.createElement('div');
  host.innerHTML = '<st-booking></st-booking>';
  document.body.append(host);
  hosts.push(host);
  const element = host.querySelector<Booking>('st-booking') as Booking;
  Object.assign(element, { endpoint: BASE, ...props });
  await settle(element);
  return element;
}

function $<T extends Element = HTMLElement>(element: Booking, selector: string): T {
  const found = element.shadowRoot?.querySelector<T>(selector);
  if (!found) throw new Error(`Missing ${selector}`);
  return found;
}

// The detail of the first event a spy received.
const detailOf = (spy: { mock: { calls: unknown[][] } }) => ((spy.mock.calls[0] ?? [])[0] as CustomEvent).detail as Record<string, unknown>;

const text = (element: Booking) => element.shadowRoot?.textContent ?? '';

async function click(element: Booking, target: HTMLElement): Promise<void> {
  target.click();
  await settle(element);
}

/** Services -> Intro call -> the slot's day -> the slot -> Continue (the details form). */
async function reachDetails(element: Booking, slot: Date): Promise<void> {
  await click(element, $(element, '.service'));
  await click(element, $(element, `[data-day="${dayKey(slot)}"]`));
  await click(element, $(element, '.slot'));
  await click(element, $(element, '.btn.primary'));
}

function fillDetails(element: Booking, values: { name?: string; email?: string; phone?: string; notes?: string; consent?: boolean; website?: string }) {
  const set = (id: string, value: string | undefined) => value !== undefined && (($(element, id) as HTMLInputElement).value = value);
  set('#bk-name', values.name);
  set('#bk-email', values.email);
  set('#bk-phone', values.phone);
  set('#bk-notes', values.notes);
  if (values.consent !== undefined) $<HTMLInputElement>(element, '#bk-consent').checked = values.consent;
  if (values.website !== undefined) ($(element, 'input[name="website"]') as HTMLInputElement).value = values.website;
}

async function submit(element: Booking): Promise<void> {
  $<HTMLFormElement>(element, 'form').requestSubmit();
  await settle(element);
}

describe('st-booking, new booking', () => {
  it('lists the services, shows the calendar and slots in the visitor\'s zone, and books', async () => {
    const { slot } = stubApi((url, init) =>
      init.method === 'POST' && url.pathname.endsWith('/bookings/appointments') ? json(201, { ok: true, booking: bookingBody(slot) }) : undefined
    );
    const element = await mount();
    const created = vi.fn();
    element.addEventListener(BOOKING_CREATED_EVENT, created);

    expect(element.shadowRoot?.querySelectorAll('.service')).toHaveLength(2);
    expect(text(element)).toContain('30 min');

    await click(element, $(element, '.service'));
    expect(text(element)).toContain('Any available');
    expect(text(element)).toContain(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const day = $(element, `[data-day="${dayKey(slot)}"]`);
    expect(day.getAttribute('aria-disabled')).toBe('false');

    await click(element, day);
    const slotButton = $(element, '.slot');
    expect(slotButton.textContent?.trim()).toBe(new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(slot));
    await click(element, slotButton);
    expect($(element, '.slot').getAttribute('aria-pressed')).toBe('true');
    await click(element, $(element, '.btn.primary'));

    fillDetails(element, { name: ' Asha ', email: 'asha@example.com', notes: 'Hi', consent: true });
    await submit(element);

    const post = calls.find(call => call.init.method === 'POST');
    expect(post?.url.pathname).toBe('/public/v1/bookings/appointments');
    const body = JSON.parse(String(post?.init.body)) as Record<string, unknown>;
    expect(body).toEqual({
      serviceId: 's1',
      start: slot.toISOString(),
      name: 'Asha',
      email: 'asha@example.com',
      phone: '',
      notes: 'Hi',
      consent: true,
      website: ''
    });
    expect(text(element)).toContain('Your appointment is booked');
    expect(($(element, '#bk-link') as HTMLInputElement).value).toBe(`${window.location.origin}/#ref=${encodeURIComponent(REF)}`);
    expect(created).toHaveBeenCalledTimes(1);
    const detail = detailOf(created);
    expect(detail).toEqual({ serviceId: 's1', start: slot.toISOString() });
    expect(JSON.stringify(detail)).not.toContain(REF);
  });

  it('sends the chosen staff member and filters availability by it', async () => {
    stubApi();
    const element = await mount();
    await click(element, $(element, '.service'));
    const radios = element.shadowRoot?.querySelectorAll<HTMLInputElement>('input[name="staff"]');
    expect(radios).toHaveLength(3);
    expect(radios?.[0]?.checked).toBe(true);
    const bob = radios?.[2] as HTMLInputElement;
    bob.checked = true;
    bob.dispatchEvent(new Event('change'));
    await settle(element);
    const availability = calls.filter(call => call.url.pathname.endsWith('/availability'));
    expect(availability.at(-1)?.url.searchParams.get('staffId')).toBe('b');
    expect(availability[0]?.url.searchParams.has('staffId')).toBe(false);
  });

  it('keeps the honeypot empty for people and sends it when a bot fills it', async () => {
    const { slot } = stubApi((url, init) => (init.method === 'POST' && url.pathname.endsWith('/appointments') ? json(201, { ok: true, booking: bookingBody(slot) }) : undefined));
    const element = await mount();
    await reachDetails(element, slot);
    expect(($(element, 'input[name="website"]') as HTMLInputElement).tabIndex).toBe(-1);
    expect($(element, '.hp').getAttribute('aria-hidden')).toBe('true');
    fillDetails(element, { name: 'Bot', email: 'bot@example.com', consent: true, website: 'http://spam' });
    await submit(element);
    const post = calls.find(call => call.init.method === 'POST');
    expect((JSON.parse(String(post?.init.body)) as { website: string }).website).toBe('http://spam');
  });

  it('checks the details in the browser first and focuses the first problem without a request', async () => {
    const { slot } = stubApi();
    const element = await mount();
    await reachDetails(element, slot);
    fillDetails(element, { name: '', email: 'nope', consent: false });
    await submit(element);
    expect(calls.some(call => call.init.method === 'POST')).toBe(false);
    expect($(element, '#bk-name').getAttribute('aria-invalid')).toBe('true');
    expect($(element, '#bk-name-error').textContent).toContain('is required');
    expect(element.shadowRoot?.activeElement?.id).toBe('bk-name');
    expect(text(element)).toContain('Please accept to continue.');
  });

  it('shows the server message on its field and keeps the input', async () => {
    const { slot } = stubApi((url, init) =>
      init.method === 'POST' && url.pathname.endsWith('/appointments') ? json(400, { ok: false, error: 'validation', errors: { email: 'Cannot receive mail.' } }) : undefined
    );
    const element = await mount();
    const errored = vi.fn();
    element.addEventListener(BOOKING_ERROR_EVENT, errored);
    await reachDetails(element, slot);
    fillDetails(element, { name: 'Asha', email: 'asha@example.com', consent: true });
    await submit(element);
    expect($(element, '#bk-email-error').textContent).toBe('Cannot receive mail.');
    expect(($(element, '#bk-name') as HTMLInputElement).value).toBe('Asha');
    expect(detailOf(errored)).toEqual({ kind: 'validation' });
  });

  it('on slot_taken goes back to the times, reloads them and says so', async () => {
    const { slot } = stubApi((url, init) =>
      init.method === 'POST' && url.pathname.endsWith('/appointments') ? json(409, { ok: false, error: 'slot_taken' }) : undefined
    );
    const element = await mount();
    await reachDetails(element, slot);
    fillDetails(element, { name: 'Asha', email: 'asha@example.com', consent: true });
    const before = calls.filter(call => call.url.pathname.endsWith('/availability')).length;
    await submit(element);
    expect(calls.filter(call => call.url.pathname.endsWith('/availability')).length).toBeGreaterThan(before);
    expect($(element, '.alert').textContent).toContain('just been taken');
    expect(element.shadowRoot?.querySelector('.calendar, [role="grid"]')).not.toBeNull();
    expect(($(element, '.btn.primary') as HTMLButtonElement).disabled).toBe(true);
  });

  it('shows the wait from Retry-After on 429', async () => {
    const { slot } = stubApi((url, init) =>
      init.method === 'POST' && url.pathname.endsWith('/appointments') ? json(429, { ok: false }, { 'Retry-After': '45' }) : undefined
    );
    const element = await mount();
    await reachDetails(element, slot);
    fillDetails(element, { name: 'Asha', email: 'asha@example.com', consent: true });
    await submit(element);
    expect($(element, '.alert').textContent).toContain('45 seconds');
    expect(($(element, '#bk-name') as HTMLInputElement).value).toBe('Asha');
  });

  it('shows the error state with a retry when the services cannot be loaded', async () => {
    stubApi(url => (url.pathname.endsWith('/services') ? json(503, { ok: false, error: 'unavailable' }) : undefined));
    const element = await mount();
    expect($(element, '.alert').textContent).toContain('could not be reached');
    expect(text(element)).toContain('Try again');
  });

  it('shows the empty state when there are no services, and sends nothing without an endpoint', async () => {
    stubApi(url => (url.pathname.endsWith('/services') ? json(200, { ok: true, services: [] }) : undefined));
    const element = await mount();
    expect(text(element)).toContain('No services can be booked online');

    const { fetchMock } = stubApi();
    const unconfigured = await mount({ endpoint: '' });
    expect(fetchMock).not.toHaveBeenCalled();
    expect($(unconfigured, '.alert').textContent).toContain('could not be reached');
  });

  it('shows the empty-month note when no times exist', async () => {
    stubApi(url => (url.pathname.endsWith('/availability') ? json(200, { ok: true, slots: [] }) : undefined));
    const element = await mount();
    await click(element, $(element, '.service'));
    expect(text(element)).toContain('No times are available in');
  });

  it('skips the service step when service-id names a listed service', async () => {
    stubApi();
    const element = await mount({ serviceId: 's2' });
    expect(element.shadowRoot?.querySelector('.service')).toBeNull();
    expect(calls.some(call => call.url.searchParams.get('serviceId') === 's2')).toBe(true);
  });

  it('moves focus to the step heading and moves around the calendar with the arrow keys', async () => {
    const { slot } = stubApi();
    const element = await mount();
    await click(element, $(element, '.service'));
    expect(element.shadowRoot?.activeElement?.id).toBe('bk-heading');
    const day = $(element, `[data-day="${dayKey(slot)}"]`);
    day.focus();
    day.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }));
    await settle(element);
    const next = new Date(slot);
    next.setDate(next.getDate() + 1);
    if (next.getMonth() === slot.getMonth()) expect(element.shadowRoot?.activeElement?.getAttribute('data-day')).toBe(dayKey(next));
  });
});

describe('st-booking, an existing booking', () => {
  it('opens the reference property, shows the booking and does not leak the reference into events or text', async () => {
    const { slot } = stubApi();
    const element = await mount({ reference: REF });
    expect(text(element)).toContain('Intro call');
    expect(text(element)).not.toContain(REF);
    expect(calls[0]?.url.pathname).toBe(`/public/v1/bookings/appointments/${encodeURIComponent(REF)}`);
    expect(calls[0]?.init.referrerPolicy).toBe('no-referrer');
    expect(element.shadowRoot?.querySelector('#bk-link')).toBeNull();
    expect(text(element)).toContain(new Intl.DateTimeFormat(undefined, { month: 'long' }).format(slot));
  });

  it('opens #ref= and ?ref= from the page URL', async () => {
    stubApi();
    window.history.replaceState({}, '', `/manage#ref=${REF}`);
    await mount();
    expect(calls[0]?.url.pathname).toContain(REF);
    calls = [];
    window.history.replaceState({}, '', `/manage?ref=${REF}`);
    await mount();
    expect(calls[0]?.url.pathname).toContain(REF);
  });

  it('shows the not-found state for an unknown reference', async () => {
    stubApi((url, init) => (init.method === 'GET' && url.pathname.includes('/appointments/') ? json(404, { ok: false, error: 'not_found' }) : undefined));
    const element = await mount({ reference: REF });
    expect(text(element)).toContain('could not find this appointment');
  });

  it('reschedules among the availability of the same service', async () => {
    const { slot } = stubApi((url, init) =>
      init.method === 'POST' && url.pathname.endsWith('/reschedule') ? json(200, { ok: true, booking: bookingBody(new Date(slot.getTime() + 1_800_000)) }) : undefined
    );
    const element = await mount({ reference: REF });
    const moved = vi.fn();
    element.addEventListener(BOOKING_RESCHEDULED_EVENT, moved);
    await click(element, $(element, '.btn.primary'));
    expect(calls.at(-1)?.url.searchParams.get('serviceId')).toBe('s1');
    await click(element, $(element, `[data-day="${dayKey(slot)}"]`));
    await click(element, $(element, '.slot'));
    await click(element, $(element, '.btn.primary'));
    const post = calls.find(call => call.init.method === 'POST');
    expect(post?.url.pathname).toBe(`/public/v1/bookings/appointments/${encodeURIComponent(REF)}/reschedule`);
    expect(JSON.parse(String(post?.init.body))).toEqual({ start: slot.toISOString() });
    expect(text(element)).toContain('moved to the new time');
    expect(moved).toHaveBeenCalledTimes(1);
    expect(detailOf(moved)).toEqual({ serviceId: 's1', start: new Date(slot.getTime() + 1_800_000).toISOString() });
  });

  it('says so when the appointment is too late to move', async () => {
    const { slot } = stubApi((url, init) => (init.method === 'POST' && url.pathname.endsWith('/reschedule') ? json(409, { ok: false, error: 'too_late' }) : undefined));
    const element = await mount({ reference: REF });
    await click(element, $(element, '.btn.primary'));
    await click(element, $(element, `[data-day="${dayKey(slot)}"]`));
    await click(element, $(element, '.slot'));
    await click(element, $(element, '.btn.primary'));
    expect($(element, '.alert').textContent).toContain('can no longer be changed');
  });

  it('asks before cancelling, then cancels with DELETE', async () => {
    stubApi((url, init) => (init.method === 'DELETE' ? json(200, { ok: true }) : undefined));
    const element = await mount({ reference: REF });
    const cancelled = vi.fn();
    element.addEventListener(BOOKING_CANCELLED_EVENT, cancelled);
    await click(element, $(element, '.btn.danger'));
    expect(text(element)).toContain('Cancel this appointment?');
    expect(calls.some(call => call.init.method === 'DELETE')).toBe(false);
    await click(element, $(element, '.btn.danger'));
    expect(calls.at(-1)?.init.method).toBe('DELETE');
    expect(calls.at(-1)?.init.body).toBeUndefined();
    expect(text(element)).toContain('Your appointment is cancelled');
    expect(detailOf(cancelled)).toEqual({ serviceId: 's1' });
  });

  it('keeps the booking when the cancel is refused as too late', async () => {
    stubApi((url, init) => (init.method === 'DELETE' ? json(409, { ok: false, error: 'too_late' }) : undefined));
    const element = await mount({ reference: REF });
    await click(element, $(element, '.btn.danger'));
    await click(element, $(element, '.btn.danger'));
    expect($(element, '.alert').textContent).toContain('can no longer be changed');
    expect(text(element)).toContain('Intro call');
  });
});
