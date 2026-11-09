import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/booking';
import { renderElement } from './helpers';

/**
 * Storybook has no bookings API. These stories answer requests to MOCK_BASE with the data and the
 * outcomes their `render` chooses; every other request goes to the network as usual. Slots are generated
 * on weekdays from tomorrow, on a 30 minute grid, so the calendar is never empty.
 */
const MOCK_BASE = 'https://bookings.example.test';
const API = `${MOCK_BASE}/public/v1/bookings`;
const REFERENCE = 'demo.signed-token';

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });

const SERVICES = [
  { id: 'intro', name: 'Intro call', description: 'A first conversation about what you need.', durationMinutes: 30, online: true, staff: [{ id: 'ann', name: 'Ann' }, { id: 'bob', name: 'Bob' }] },
  { id: 'review', name: 'Architecture review', description: 'Walk us through your system.', durationMinutes: 60, online: true, staff: [{ id: 'ann', name: 'Ann' }] },
  { id: 'visit', name: 'Office visit', description: '', durationMinutes: 45, online: false, staff: [] }
];

interface Behaviour {
  book: () => Response;
  reschedule: () => Response;
  cancel: () => Response;
}

const happy: Behaviour = {
  book: () => json(201, { ok: true, booking: bookingAt(nextSlot(), 'intro') }),
  reschedule: () => json(200, { ok: true, booking: bookingAt(nextSlot(1), 'intro') }),
  cancel: () => json(200, { ok: true })
};
let behaviour: Behaviour = happy;
let noSlots = false;

function nextSlot(extraDays = 0): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1 + extraDays);
  while (date.getDay() === 0 || date.getDay() === 6) date.setDate(date.getDate() + 1);
  date.setHours(10, 0, 0, 0);
  return date;
}

function bookingAt(start: Date, serviceId: string) {
  const service = SERVICES.find(item => item.id === serviceId) ?? SERVICES[0];
  return {
    reference: REFERENCE,
    serviceId,
    serviceName: service?.name ?? '',
    start: start.toISOString(),
    end: new Date(start.getTime() + (service?.durationMinutes ?? 30) * 60_000).toISOString()
  };
}

function slotsBetween(from: Date, to: Date) {
  const slots: { start: string; end: string; staffIds: string[] }[] = [];
  const cursor = new Date(from);
  cursor.setMinutes(cursor.getMinutes() < 30 ? 30 : 60, 0, 0);
  while (cursor < to) {
    const day = cursor.getDay();
    const hour = cursor.getHours();
    if (day !== 0 && day !== 6 && hour >= 9 && hour < 17 && (cursor.getDate() + hour + cursor.getMinutes()) % 3 !== 0) {
      slots.push({ start: cursor.toISOString(), end: new Date(cursor.getTime() + 1_800_000).toISOString(), staffIds: ['ann', 'bob'] });
    }
    cursor.setMinutes(cursor.getMinutes() + 30);
  }
  return slots;
}

function mockApi(input: string, init: RequestInit = {}): Response | undefined {
  if (!input.startsWith(API)) return undefined;
  const url = new URL(input);
  const path = url.pathname.replace('/public/v1/bookings', '');
  const method = init.method ?? 'GET';
  if (method === 'GET' && path === '/services') return json(200, { ok: true, services: SERVICES });
  if (method === 'GET' && path === '/availability') {
    if (noSlots) return json(200, { ok: true, slots: [] });
    return json(200, { ok: true, slots: slotsBetween(new Date(url.searchParams.get('from') ?? ''), new Date(url.searchParams.get('to') ?? '')) });
  }
  if (method === 'POST' && path === '/appointments') return behaviour.book();
  if (method === 'GET' && path.startsWith('/appointments/')) return json(200, { ok: true, booking: bookingAt(nextSlot(), 'intro') });
  if (method === 'POST' && path.endsWith('/reschedule')) return behaviour.reschedule();
  if (method === 'DELETE') return behaviour.cancel();
  return json(404, { ok: false, error: 'not_found' });
}

const networkFetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  const answer = mockApi(String(input), init);
  return answer ? Promise.resolve(answer) : networkFetch(input, init);
};

function withBehaviour(next: Partial<Behaviour>, options: { empty?: boolean } = {}) {
  return (args: Args) => {
    behaviour = { ...happy, ...next };
    noSlots = options.empty === true;
    return renderElement('st-booking')(args);
  };
}

const meta = {
  title: 'Components/Booking',
  component: 'st-booking',
  tags: ['autodocs'],
  args: { endpoint: MOCK_BASE },
  render: withBehaviour({})
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** The whole flow against the mock: service, optional staff, day and time, details, confirmation with a private manage link. */
export const Default: Story = {};

/** Skips the service step: `serviceId` names a service the API lists. */
export const PresetService: Story = { args: { serviceId: 'review' } };

/** Opens an existing booking from its reference, with Reschedule and Cancel. In a page, `#ref=...` does the same. */
export const ExistingBooking: Story = { args: { reference: REFERENCE } };

/** Sunday as the first day of the week, German dates and times. */
export const SundayStartGerman: Story = { args: { weekStart: 0, locale: 'de' } };

/** Every text replaced through `labels` (here: German). */
export const CustomLabels: Story = {
  args: {
    labels: {
      serviceHeading: 'Leistung wählen',
      timeHeading: 'Datum und Uhrzeit wählen',
      detailsHeading: 'Ihre Angaben',
      submit: 'Termin buchen',
      continue: 'Weiter',
      back: 'Zurück',
      anyStaff: 'Beliebig'
    },
    locale: 'de'
  }
};

/** Someone else took the time while the visitor typed: the times reload and the note says so. */
export const SlotTaken: Story = {
  render: withBehaviour({ book: () => json(409, { ok: false, error: 'slot_taken' }) })
};

/** The server rejects the e-mail address. The input is kept. */
export const ServerValidation: Story = {
  render: withBehaviour({ book: () => json(400, { ok: false, error: 'validation', errors: { email: 'This address cannot receive mail.' } }) })
};

/** The server asks the visitor to wait 30 seconds. */
export const RateLimited: Story = {
  render: withBehaviour({ book: () => json(429, { ok: false }, { 'Retry-After': '30' }) })
};

/** Rescheduling or cancelling is refused because the appointment has started or is too close. */
export const TooLate: Story = {
  args: { reference: REFERENCE },
  render: withBehaviour({ reschedule: () => json(409, { ok: false, error: 'too_late' }), cancel: () => json(409, { ok: false, error: 'too_late' }) })
};

/** No free times in the coming months. */
export const NoAvailability: Story = { render: withBehaviour({}, { empty: true }) };

/** No endpoint is set: the unavailable note shows and nothing is sent. */
export const NotConfigured: Story = { args: { endpoint: '' } };
