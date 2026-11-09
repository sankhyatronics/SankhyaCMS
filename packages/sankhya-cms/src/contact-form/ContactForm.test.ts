// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

// Loads the module for its side effect (defining `st-contact-form`). It is a side-effect import on purpose: the
// class is used only as a type below, and a type-only import would be dropped, leaving the tag undefined.
import './ContactForm';
import type { ContactForm } from './ContactForm';
import { CONTACT_FORM_ERROR_EVENT, CONTACT_FORM_SENT_EVENT } from './ContactFormEvents';

const ENDPOINT = 'https://api.example.com/contact';

const TOPICS = [
  { value: 'sales', label: 'Sales', group: 'Products' },
  { value: 'pilot', label: 'Pilot programme', group: 'Products' },
  { value: 'support', label: 'Support' }
];

const VALID = {
  name: 'Asha Singh',
  email: 'asha@example.com',
  company: 'Acme',
  topic: 'sales',
  message: 'Hello there team',
  consent: true
};

type FetchImpl = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

/** Hosts created for the current test. They are removed afterwards, which removes the element too. */
let hosts: HTMLElement[] = [];

afterEach(() => {
  for (const host of hosts) host.remove();
  hosts = [];
  vi.unstubAllGlobals();
  window.history.replaceState({}, '', '/');
});

/**
 * Creates the element the way a page does (by parsing its markup), attaches it, sets the properties and the
 * attributes, and waits for the first render.
 */
async function mount(props: Partial<ContactForm> = {}, attributes: Record<string, string> = {}): Promise<ContactForm> {
  const host = document.createElement('div');
  host.innerHTML = '<st-contact-form></st-contact-form>';
  document.body.append(host);
  hosts.push(host);
  const element = host.querySelector<ContactForm>('st-contact-form') as ContactForm;
  Object.assign(element, { endpoint: ENDPOINT, topics: TOPICS, ...props });
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  await element.updateComplete;
  return element;
}

function $<T extends Element = HTMLElement>(element: ContactForm, selector: string): T {
  const found = element.shadowRoot?.querySelector<T>(selector);
  if (!found) throw new Error(`Missing ${selector}`);
  return found;
}

function stubFetch(impl: FetchImpl) {
  const mock = vi.fn(impl);
  vi.stubGlobal('fetch', mock);
  return mock;
}

function answer(status: number, body: unknown = undefined, headers: Record<string, string> = {}): FetchImpl {
  return async () =>
    new Response(body === undefined ? '' : typeof body === 'string' ? body : JSON.stringify(body), {
      status,
      headers: body === undefined || typeof body === 'string' ? headers : { 'Content-Type': 'application/json', ...headers }
    });
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(done => (resolve = done));
  return { promise, resolve };
}

function fill(element: ContactForm, values: Partial<typeof VALID> & { phone?: string; website?: string }) {
  if (values.name !== undefined) $<HTMLInputElement>(element, '#cf-name').value = values.name;
  if (values.email !== undefined) $<HTMLInputElement>(element, '#cf-email').value = values.email;
  if (values.company !== undefined) $<HTMLInputElement>(element, '#cf-company').value = values.company;
  if (values.phone !== undefined) $<HTMLInputElement>(element, '#cf-phone').value = values.phone;
  if (values.topic !== undefined) $<HTMLSelectElement>(element, '#cf-topic').value = values.topic;
  if (values.message !== undefined) $<HTMLTextAreaElement>(element, '#cf-message').value = values.message;
  if (values.consent !== undefined) $<HTMLInputElement>(element, '#cf-consent').checked = values.consent;
  if (values.website !== undefined) $<HTMLInputElement>(element, 'input[name="website"]').value = values.website;
}

function submit(element: ContactForm) {
  $<HTMLFormElement>(element, 'form').requestSubmit();
}

const button = (element: ContactForm) => $<HTMLButtonElement>(element, 'button.submit');
const alertText = (element: ContactForm) => $(element, '.alert').textContent?.trim() ?? '';
const successText = (element: ContactForm) => element.shadowRoot?.querySelector('.success')?.textContent?.replace(/\s+/g, ' ').trim();

/** Submits a valid form, holds the request open, and answers it with `status`/`body`. */
async function sendAndAnswer(element: ContactForm, status: number, body?: unknown, headers: Record<string, string> = {}) {
  const gate = deferred<Response>();
  const mock = stubFetch(() => gate.promise);
  fill(element, VALID);
  submit(element);
  await element.updateComplete;
  gate.resolve(await answer(status, body, headers)(''));
  await vi.waitFor(() => expect(button(element).disabled).toBe(false));
  await element.updateComplete;
  return mock;
}

describe('rendering', () => {
  it('renders the fields with their labels', async () => {
    const element = await mount();
    for (const id of ['cf-name', 'cf-email', 'cf-company', 'cf-phone', 'cf-topic', 'cf-message', 'cf-consent']) {
      expect($(element, `#${id}`)).toBeTruthy();
    }
    expect($(element, 'label[for="cf-name"]').textContent).toContain('Full name');
    expect($(element, 'label[for="cf-email"]').textContent).toContain('Work email');
    expect($(element, 'label[for="cf-phone"]').textContent).toContain('Phone (optional)');
  });

  it('adds the visually hidden "(required)" text to required labels', async () => {
    const element = await mount();
    const label = $(element, 'label[for="cf-name"]');
    expect(label.querySelector('.sr-only')?.textContent).toContain('(required)');
    expect(label.querySelector('[aria-hidden="true"]')?.textContent).toContain('*');
  });

  it('hides the phone field when show-phone is false', async () => {
    const element = await mount({}, { 'show-phone': 'false' });
    expect(element.showPhone).toBe(false);
    expect(element.shadowRoot?.querySelector('#cf-phone')).toBeNull();
  });

  it('keeps the phone field when show-phone is absent', async () => {
    const element = await mount();
    expect(element.showPhone).toBe(true);
    expect(element.shadowRoot?.querySelector('#cf-phone')).not.toBeNull();
  });

  it('reads topics from the JSON attribute', async () => {
    const element = await mount({}, { topics: JSON.stringify(TOPICS) });
    expect(element.topics).toHaveLength(3);
    expect($(element, '#cf-topic option[value="support"]').textContent).toBe('Support');
  });

  it('renders the honeypot off-screen, hidden from assistive tech, out of the tab order and empty', async () => {
    const element = await mount();
    const honeypot = $<HTMLInputElement>(element, 'input[name="website"]');
    const wrapper = honeypot.closest('.hp');
    expect(wrapper?.getAttribute('aria-hidden')).toBe('true');
    expect(wrapper?.hasAttribute('inert')).toBe(true);
    expect(honeypot.getAttribute('tabindex')).toBe('-1');
    expect(honeypot.getAttribute('aria-hidden')).toBe('true');
    expect(honeypot.getAttribute('autocomplete')).toBe('off');
    expect(honeypot.value).toBe('');
    expect(honeypot.style.display).not.toBe('none');
  });

  it('groups topics under optgroups, and keeps ungrouped ones at the top level', async () => {
    const element = await mount();
    const groups = [...(element.shadowRoot?.querySelectorAll('optgroup') ?? [])];
    expect(groups.map(group => group.label)).toEqual(['Products']);
    expect([...groups[0].querySelectorAll('option')].map(option => option.textContent)).toEqual(['Sales', 'Pilot programme']);
    expect($(element, 'select option[value="support"]').parentElement?.tagName).toBe('SELECT');
  });

  it('starts with the placeholder selected and disabled when there is no preselected topic', async () => {
    const element = await mount();
    const placeholder = $<HTMLOptionElement>(element, 'select option[value=""]');
    expect(placeholder.disabled).toBe(true);
    expect($<HTMLSelectElement>(element, '#cf-topic').value).toBe('');
  });
});

describe('preselecting a topic', () => {
  it('uses ?product= first and shows the About pill', async () => {
    window.history.replaceState({}, '', '/pricing?product=PILOT&topic=support');
    const element = await mount();
    expect($<HTMLSelectElement>(element, '#cf-topic').value).toBe('pilot');
    expect($(element, '.pill').textContent?.trim()).toBe('About: Pilot programme');
  });

  it('uses ?topic= when there is no product', async () => {
    window.history.replaceState({}, '', '/?topic=support');
    const element = await mount();
    expect($<HTMLSelectElement>(element, '#cf-topic').value).toBe('support');
    expect(element.shadowRoot?.querySelector('.pill')).not.toBeNull();
  });

  it('ignores a query value that is not one of the topics', async () => {
    window.history.replaceState({}, '', '/?product=unknown');
    const element = await mount();
    expect($<HTMLSelectElement>(element, '#cf-topic').value).toBe('');
    expect(element.shadowRoot?.querySelector('.pill')).toBeNull();
  });

  it('uses default-topic when the URL names no topic, with no pill', async () => {
    const element = await mount({ defaultTopic: 'support' });
    expect($<HTMLSelectElement>(element, '#cf-topic').value).toBe('support');
    expect(element.shadowRoot?.querySelector('.pill')).toBeNull();
  });
});

describe('client-side checks', () => {
  it('does not send an invalid form and marks the fields', async () => {
    const element = await mount();
    const mock = stubFetch(answer(201, { ok: true }));
    submit(element);
    await element.updateComplete;

    expect(mock).not.toHaveBeenCalled();
    expect($(element, '#cf-name').getAttribute('aria-invalid')).toBe('true');
    expect($(element, '#cf-name').getAttribute('aria-describedby')).toBe('cf-name-error');
    expect($(element, '#cf-name-error').textContent).toBe('Full name is required.');
    expect($(element, '#cf-consent').getAttribute('aria-invalid')).toBe('true');
  });

  it('announces a singular summary for one failing field, and focuses that field', async () => {
    const element = await mount();
    fill(element, VALID);
    fill(element, { email: 'nope' });
    submit(element);
    await element.updateComplete;
    await vi.waitFor(() => expect(element.shadowRoot?.activeElement?.id).toBe('cf-email'));
    expect($(element, '.sr-only[aria-live="polite"]').textContent).toBe('Please fix 1 field.');
    expect($(element, '#cf-email-error').textContent).toBe('Enter a valid email address.');
    expect(element.shadowRoot?.querySelector('.summary')).toBeNull();
  });

  it('with two failing fields shows no summary and focuses the first field', async () => {
    const element = await mount();
    fill(element, VALID);
    fill(element, { name: '', email: 'nope' });
    submit(element);
    await element.updateComplete;
    await vi.waitFor(() => expect(element.shadowRoot?.activeElement?.id).toBe('cf-name'));
    expect(element.shadowRoot?.querySelector('.summary')).toBeNull();
    expect($(element, '.sr-only[aria-live="polite"]').textContent).toBe('Please fix 2 fields.');
  });

  it('uses replacement messages from errorMessages', async () => {
    const element = await mount({ errorMessages: { required: '{field} fehlt.' } });
    submit(element);
    await element.updateComplete;
    expect($(element, '#cf-name-error').textContent).toBe('Full name fehlt.');
  });

  it('shows the counter only from 80% of the limit, counts code points, and turns red past the limit', async () => {
    const element = await mount();
    const message = $<HTMLTextAreaElement>(element, '#cf-message');
    const type = async (value: string) => {
      message.value = value;
      message.dispatchEvent(new Event('input'));
      await element.updateComplete;
    };

    await type('😀😀😀');
    expect(element.shadowRoot?.querySelector('#cf-message-count')).toBeNull();
    expect(message.hasAttribute('aria-describedby')).toBe(false);

    await type('a'.repeat(1599));
    expect(element.shadowRoot?.querySelector('#cf-message-count')).toBeNull();
    await type('😀'.repeat(1600));
    expect($(element, '#cf-message-count').textContent?.trim()).toBe('1600 / 2000');
    expect(message.getAttribute('aria-describedby')).toBe('cf-message-count');

    await type('a'.repeat(2001));
    expect($(element, '#cf-message-count').classList.contains('over')).toBe(true);
  });

  it('announces the counter politely when it passes 80%, 90% and the limit, not on every key', async () => {
    const element = await mount();
    const message = $<HTMLTextAreaElement>(element, '#cf-message');
    const live = () => $(element, '#cf-message-live');
    const type = async (length: number) => {
      message.value = 'a'.repeat(length);
      message.dispatchEvent(new Event('input'));
      await element.updateComplete;
    };
    expect(live().getAttribute('aria-live')).toBe('polite');

    await type(1000);
    expect(live().textContent).toBe('');
    await type(1600);
    expect(live().textContent).toBe('1600 / 2000');
    await type(1650);
    expect(live().textContent).toBe('1600 / 2000');
    await type(1800);
    expect(live().textContent).toBe('1800 / 2000');
    await type(100);
    expect(live().textContent).toBe('');
  });
});

describe('the error summary', () => {
  it('with three or more failing fields shows a role="alert" summary and moves focus to it', async () => {
    const element = await mount();
    const mock = stubFetch(answer(201, { ok: true }));
    submit(element);
    await element.updateComplete;
    await vi.waitFor(() => expect(element.shadowRoot?.activeElement?.id).toBe('cf-summary'));

    expect(mock).not.toHaveBeenCalled();
    const summary = $(element, '#cf-summary');
    expect(summary.getAttribute('role')).toBe('alert');
    expect(summary.getAttribute('tabindex')).toBe('-1');
    expect($(element, '.summary-title').textContent).toBe('Please fix 6 fields.');
    const links = [...summary.querySelectorAll<HTMLAnchorElement>('a')];
    expect(links.map(link => link.getAttribute('href'))).toEqual([
      '#cf-name',
      '#cf-email',
      '#cf-company',
      '#cf-topic',
      '#cf-message',
      '#cf-consent'
    ]);
    expect(links[0].textContent).toBe('Full name is required.');
    // The polite one-line summary is left empty so the error is not announced twice.
    expect($(element, '.sr-only[aria-live="polite"]').textContent).toBe('');
  });

  it('puts the summary above the fields', async () => {
    const element = await mount();
    submit(element);
    await element.updateComplete;
    const form = $(element, 'form');
    const summary = $(element, '#cf-summary');
    const firstField = $(element, '.grid');
    expect(form.contains(summary)).toBe(true);
    expect(summary.compareDocumentPosition(firstField) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('focuses the field of the link that is clicked, without navigating', async () => {
    const element = await mount();
    submit(element);
    await element.updateComplete;
    const link = $<HTMLAnchorElement>(element, '#cf-summary a[href="#cf-email"]');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    await vi.waitFor(() => expect(element.shadowRoot?.activeElement?.id).toBe('cf-email'));
  });

  it('is removed once a later submit has fewer than three failing fields', async () => {
    const element = await mount();
    submit(element);
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('#cf-summary')).not.toBeNull();
    fill(element, VALID);
    fill(element, { email: 'nope' });
    submit(element);
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('#cf-summary')).toBeNull();
  });

  it('also shows for three or more server-side field errors, using the server messages', async () => {
    const element = await mount();
    await sendAndAnswer(element, 400, { errors: { name: 'Server: name', email: 'Server: email', company: 'Server: company' } });
    await vi.waitFor(() => expect(element.shadowRoot?.activeElement?.id).toBe('cf-summary'));
    const links = [...$(element, '#cf-summary').querySelectorAll('a')].map(link => link.textContent);
    expect(links).toEqual(['Server: name', 'Server: email', 'Server: company']);
  });
});

describe('the required note', () => {
  it('shows "* Required" by default and describes the form', async () => {
    const element = await mount();
    const note = $(element, '#cf-required-note');
    expect(note.textContent).toBe('* Required');
    expect($(element, 'form').getAttribute('aria-describedby')).toBe('cf-required-note');
  });

  it('takes its text from required-note, and is hidden when empty', async () => {
    const element = await mount({}, { 'required-note': 'Fields with * must be filled in' });
    expect($(element, '#cf-required-note').textContent).toBe('Fields with * must be filled in');
    element.requiredNote = '';
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('#cf-required-note')).toBeNull();
    expect($(element, 'form').hasAttribute('aria-describedby')).toBe(false);
  });
});

describe('a {mailto} link in the error notes', () => {
  it('renders {mailto} in the unavailable note as a real mailto: link', async () => {
    const element = await mount({ mailto: 'contact@example.com', errorNote: 'Could not send. Email us at {mailto}.' });
    await sendAndAnswer(element, 500, 'oops');
    const link = $<HTMLAnchorElement>(element, '.alert a');
    expect(link.getAttribute('href')).toBe('mailto:contact@example.com');
    expect(link.textContent).toBe('contact@example.com');
    expect(alertText(element)).toBe('Could not send. Email us at contact@example.com.');
  });

  it('renders {mailto} in the rate-limit note as a link', async () => {
    const element = await mount({ mailto: 'contact@example.com', rateLimitedNote: 'Wait {seconds}s or write to {mailto}.' });
    await sendAndAnswer(element, 429, undefined, { 'Retry-After': '30' });
    expect($<HTMLAnchorElement>(element, '.alert a').getAttribute('href')).toBe('mailto:contact@example.com');
    expect(alertText(element)).toBe('Wait 30s or write to contact@example.com.');
  });

  it('leaves the placeholder out when mailto is empty or not an address', async () => {
    for (const mailto of ['', 'javascript:alert(1)', 'a b@c.d', '"><img src=x>@e.f']) {
      const element = await mount({ mailto, errorNote: 'Write to {mailto}!' });
      await sendAndAnswer(element, 500, 'oops');
      expect(element.shadowRoot?.querySelector('.alert a')).toBeNull();
      expect(alertText(element)).toBe('Write to !');
    }
  });

  it('never links text that came from the server', async () => {
    const element = await mount({ mailto: 'contact@example.com' });
    await sendAndAnswer(element, 400, { errors: { form: 'Blocked, see {mailto}' } });
    expect(element.shadowRoot?.querySelector('.alert a')).toBeNull();
    expect(alertText(element)).toBe('Blocked, see {mailto}');
  });
});

describe('parts', () => {
  it('exposes field, label, input, error and success parts', async () => {
    const element = await mount();
    submit(element);
    await element.updateComplete;
    const count = (part: string) => element.shadowRoot?.querySelectorAll(`[part~="${part}"]`).length ?? 0;
    expect(count('field')).toBe(6 + 1);
    expect(count('label')).toBe(5 + 1);
    expect(count('input')).toBe(6);
    expect(count('error')).toBe(6);

    const sent = await mount();
    await sendAndAnswer(sent, 201, { ok: true });
    expect(sent.shadowRoot?.querySelectorAll('[part~="success"]').length).toBe(1);
  });
});

describe('events', () => {
  it('fires st-contact-form-submit with only the topic, after the checks and before the request', async () => {
    const element = await mount();
    const seen: unknown[] = [];
    element.addEventListener('st-contact-form-submit', event => seen.push((event as CustomEvent).detail));
    submit(element);
    await element.updateComplete;
    expect(seen).toEqual([]);

    const gate = deferred<Response>();
    stubFetch(() => gate.promise);
    fill(element, VALID);
    submit(element);
    await element.updateComplete;
    expect(seen).toEqual([{ topic: 'sales' }]);
    gate.resolve(await answer(201, { ok: true, reference: 'R-1' })(''));
    await vi.waitFor(() => expect(button(element).disabled).toBe(false));
  });

  it('carries no personal data in any event', async () => {
    const element = await mount();
    const details: string[] = [];
    for (const name of ['st-contact-form-submit', 'st-contact-form-sent', 'st-contact-form-error']) {
      element.addEventListener(name, event => details.push(JSON.stringify((event as CustomEvent).detail)));
    }
    await sendAndAnswer(element, 201, { ok: true, reference: 'R-1' });
    await sendAndAnswer(element, 500, 'oops');
    const all = details.join(' ');
    for (const personal of [VALID.name, VALID.email, VALID.company, VALID.message]) expect(all).not.toContain(personal);
    expect(all).toContain('"topic":"sales"');
  });
});

describe('a successful submission', () => {
  it('posts the documented body and clears the form, including the topic and consent', async () => {
    const element = await mount({ defaultTopic: 'support' });
    const mock = await sendAndAnswer(element, 201, { ok: true, reference: 'INQ-1234' });

    expect(mock).toHaveBeenCalledTimes(1);
    const [url, init] = mock.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(init?.credentials).toBe('omit');
    const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    expect(Object.keys(body).sort()).toEqual(
      ['name', 'email', 'company', 'phone', 'topic', 'message', 'consent', 'page', 'locale', 'submittedAt', 'website'].sort()
    );
    expect(body).toMatchObject({ name: 'Asha Singh', topic: 'sales', consent: true, website: '' });

    expect($<HTMLInputElement>(element, '#cf-name').value).toBe('');
    expect($<HTMLInputElement>(element, '#cf-consent').checked).toBe(false);
    expect($<HTMLSelectElement>(element, '#cf-topic').value).toBe('support');
    expect($<HTMLTextAreaElement>(element, '#cf-message').value).toBe('');
  });

  it('shows the reference and fires st-contact-form-sent with it', async () => {
    const element = await mount();
    const listener = vi.fn();
    element.addEventListener(CONTACT_FORM_SENT_EVENT, listener);
    await sendAndAnswer(element, 201, { ok: true, reference: 'INQ-1234' });

    expect(successText(element)).toContain('Your reference: INQ-1234');
    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent<{ reference?: string }>).detail).toEqual({ reference: 'INQ-1234' });
  });

  it('bubbles and crosses the shadow boundary', async () => {
    const element = await mount();
    const onBody = vi.fn();
    document.body.addEventListener(CONTACT_FORM_SENT_EVENT, onBody);
    await sendAndAnswer(element, 201, { ok: true });
    document.body.removeEventListener(CONTACT_FORM_SENT_EVENT, onBody);
    expect(onBody).toHaveBeenCalledTimes(1);
    expect((onBody.mock.calls[0][0] as Event).composed).toBe(true);
  });

  it('shows the success note without a reference for the honeypot answer', async () => {
    const element = await mount();
    const listener = vi.fn();
    element.addEventListener(CONTACT_FORM_SENT_EVENT, listener);
    await sendAndAnswer(element, 200, { ok: true });
    expect(successText(element)).toBe('Thanks, your message has been sent. We will reply soon.');
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({});
  });
});

describe('a rejected submission', () => {
  it('shows each server message on its field, keeps the input and focuses the first one', async () => {
    const element = await mount();
    const listener = vi.fn();
    element.addEventListener(CONTACT_FORM_ERROR_EVENT, listener);
    await sendAndAnswer(element, 400, { ok: false, errors: { email: 'This address cannot receive mail.', name: 'Use your full name.' } });

    expect($(element, '#cf-email-error').textContent).toBe('This address cannot receive mail.');
    expect($(element, '#cf-name-error').textContent).toBe('Use your full name.');
    expect($<HTMLInputElement>(element, '#cf-name').value).toBe('Asha Singh');
    expect($<HTMLInputElement>(element, '#cf-email').value).toBe('asha@example.com');
    expect(element.shadowRoot?.activeElement?.id).toBe('cf-name');
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({ kind: 'validation' });
  });

  it('puts a body key in the form alert', async () => {
    const element = await mount();
    await sendAndAnswer(element, 400, { ok: false, errors: { body: 'Please check the form.' } });
    expect(alertText(element)).toBe('Please check the form.');
  });

  it('shows the phone message in the alert when the phone field is hidden', async () => {
    const element = await mount({ showPhone: false });
    await sendAndAnswer(element, 400, { ok: false, errors: { phone: 'Phone is not valid.' } });
    expect(alertText(element)).toBe('Phone is not valid.');
    expect(element.shadowRoot?.querySelector('#cf-phone')).toBeNull();
  });

  it('shows the rate-limit note with the wait in seconds, keeps the input and fires rate_limited', async () => {
    const element = await mount();
    const listener = vi.fn();
    element.addEventListener(CONTACT_FORM_ERROR_EVENT, listener);
    await sendAndAnswer(element, 429, { ok: false }, { 'Retry-After': '30' });

    expect(alertText(element)).toBe('You have sent several messages in a short time. Please wait 30 seconds and try again.');
    expect($<HTMLTextAreaElement>(element, '#cf-message').value).toBe('Hello there team');
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({ kind: 'rate_limited' });
  });

  it('shows the generic rate-limit note when Retry-After is missing', async () => {
    const element = await mount();
    await sendAndAnswer(element, 429, { ok: false });
    expect(alertText(element)).toBe('You have sent several messages in a short time. Please wait a little and try again.');
  });

  it('shows the generic rate-limit note when Retry-After is not a number', async () => {
    const element = await mount();
    await sendAndAnswer(element, 429, { ok: false }, { 'Retry-After': 'later' });
    expect(alertText(element)).toBe('You have sent several messages in a short time. Please wait a little and try again.');
  });

  it.each([500, 503])('shows the error note for %i, never the server text, and keeps the input', async status => {
    const element = await mount();
    const listener = vi.fn();
    element.addEventListener(CONTACT_FORM_ERROR_EVENT, listener);
    await sendAndAnswer(element, status, 'Stack trace: secret-internal-detail');
    expect(alertText(element)).toBe('Sorry, your message could not be sent. Please try again later.');
    expect(element.shadowRoot?.textContent).not.toContain('secret-internal-detail');
    expect($<HTMLInputElement>(element, '#cf-name').value).toBe('Asha Singh');
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({ kind: 'unavailable' });
  });

  it('shows the error note when the network fails', async () => {
    const element = await mount();
    stubFetch(async () => {
      throw new TypeError('Failed to fetch');
    });
    fill(element, VALID);
    submit(element);
    await vi.waitFor(() => expect(alertText(element)).toBe('Sorry, your message could not be sent. Please try again later.'));
    expect($<HTMLInputElement>(element, '#cf-company').value).toBe('Acme');
  });

  it('shows the error note for a 201 that is not the expected JSON', async () => {
    const element = await mount();
    await sendAndAnswer(element, 201, 'Created');
    expect(alertText(element)).toBe('Sorry, your message could not be sent. Please try again later.');
  });
});

describe('sending state', () => {
  it('disables the button, sets aria-busy and sends only once on a double submit', async () => {
    const element = await mount();
    const gate = deferred<Response>();
    const mock = stubFetch(() => gate.promise);
    fill(element, VALID);

    submit(element);
    submit(element);
    await element.updateComplete;

    expect(mock).toHaveBeenCalledTimes(1);
    expect(button(element).disabled).toBe(true);
    expect($(element, 'form').getAttribute('aria-busy')).toBe('true');
    expect(button(element).textContent?.trim()).toBe('Sending…');

    gate.resolve(new Response('{"ok":true}', { status: 201 }));
    await vi.waitFor(() => expect(button(element).disabled).toBe(false));
    expect($(element, 'form').getAttribute('aria-busy')).toBe('false');
  });

  it('aborts the request when the element is removed', async () => {
    const element = await mount();
    let signal: AbortSignal | undefined;
    stubFetch((_input, init) => {
      signal = init?.signal ?? undefined;
      return new Promise<Response>((_resolve, reject) => {
        signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      });
    });
    fill(element, VALID);
    submit(element);
    await element.updateComplete;
    expect(signal?.aborted).toBe(false);

    element.remove();
    expect(signal?.aborted).toBe(true);
  });
});

describe('without an endpoint', () => {
  it('renders, never fetches, and shows the error note when submitted', async () => {
    const element = await mount({ endpoint: '' });
    const mock = stubFetch(answer(201, { ok: true }));
    const listener = vi.fn();
    element.addEventListener(CONTACT_FORM_ERROR_EVENT, listener);
    fill(element, VALID);
    submit(element);
    await vi.waitFor(() => expect(alertText(element)).toBe('Sorry, your message could not be sent. Please try again later.'));
    expect(mock).not.toHaveBeenCalled();
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('text safety', () => {
  it('renders a script or markup in labels and topics as plain text', async () => {
    const hostile = '<img src=x onerror="alert(1)"><script>alert(2)</script>';
    const element = await mount({
      nameLabel: hostile,
      consentLabel: hostile,
      topics: [{ value: 'a', label: hostile, group: hostile }]
    });
    const root = element.shadowRoot as ShadowRoot;
    expect(root.querySelector('script')).toBeNull();
    expect(root.querySelector('img')).toBeNull();
    expect($(element, 'label[for="cf-name"]').textContent).toContain(hostile);
    expect($(element, '#cf-topic option[value="a"]').textContent).toBe(hostile);
    expect($(element, 'optgroup').getAttribute('label')).toBe(hostile);
  });

  it('renders server field messages as text', async () => {
    const element = await mount();
    await sendAndAnswer(element, 400, { ok: false, errors: { email: '<b>bold</b><script>x()</script>' } });
    expect($(element, '#cf-email-error').textContent).toBe('<b>bold</b><script>x()</script>');
    expect(element.shadowRoot?.querySelector('#cf-email-error b')).toBeNull();
  });

  it('puts the server reference in text, not markup', async () => {
    const element = await mount();
    await sendAndAnswer(element, 201, { ok: true, reference: '<img src=x>' });
    expect(element.shadowRoot?.querySelector('.reference')?.textContent).toBe('<img src=x>');
    expect(element.shadowRoot?.querySelector('.success img')).toBeNull();
  });
});

describe('the optional settings', () => {
  it('renders the privacy link with the href it is given', async () => {
    const element = await mount({ privacyNote: 'We keep it private.', privacyHref: '/privacy' });
    const link = $<HTMLAnchorElement>(element, '.privacy a');
    expect(link.getAttribute('href')).toBe('/privacy');
    expect(link.textContent).toBe('Privacy Policy');
  });

  it('hides the privacy line when there is no privacy-note', async () => {
    const element = await mount();
    expect(element.shadowRoot?.querySelector('.privacy')).toBeNull();
  });
});
