import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  CONTACT_TIMEOUT_MS,
  DEFAULT_ERROR_MESSAGES,
  buildContactPayload,
  codePointLength,
  fillTemplate,
  firstInvalidField,
  groupTopics,
  interpretContactResponse,
  isSubmittableEndpoint,
  normalizeTopics,
  parseRetryAfter,
  parseTopicsAttribute,
  readContactQuery,
  resolvePreselectedTopic,
  submitContact,
  validateContact,
  type ContactPayload,
  type ContactValues,
  type ContactValidationOptions
} from './contact-form-client';

const LABELS = {
  name: 'Full name',
  email: 'Work email',
  company: 'Company',
  phone: 'Phone (optional)',
  topic: 'Topic',
  message: 'Message'
};

const TOPICS = [
  { value: 'sales', label: 'Sales', group: 'Products' },
  { value: 'support', label: 'Support' }
];

const options: ContactValidationOptions = { labels: LABELS, topics: TOPICS, messages: DEFAULT_ERROR_MESSAGES };

const VALID: ContactValues = {
  name: 'Asha Singh',
  email: 'asha@example.com',
  company: 'Acme',
  phone: '',
  topic: 'sales',
  message: 'Hello there team',
  consent: true,
  website: ''
};

const withValues = (changes: Partial<ContactValues>): ContactValues => ({ ...VALID, ...changes });

describe('validateContact: the accepted baseline', () => {
  it('accepts a complete, valid form', () => {
    expect(validateContact(VALID, options)).toEqual({});
  });

  it('reports only the failing fields', () => {
    expect(Object.keys(validateContact(withValues({ name: '' }), options))).toEqual(['name']);
  });
});

describe('validateContact: name, company (required, length)', () => {
  it('requires a name after trimming', () => {
    expect(validateContact(withValues({ name: '   ' }), options).name).toBe('Full name is required.');
  });

  it('accepts a name of exactly 100 characters and rejects 101', () => {
    expect(validateContact(withValues({ name: 'a'.repeat(100) }), options).name).toBeUndefined();
    expect(validateContact(withValues({ name: 'a'.repeat(101) }), options).name).toBe('Full name must be 100 characters or fewer.');
  });

  it('accepts a company of exactly 120 characters and rejects 121', () => {
    expect(validateContact(withValues({ company: 'c'.repeat(120) }), options).company).toBeUndefined();
    expect(validateContact(withValues({ company: 'c'.repeat(121) }), options).company).toBe('Company must be 120 characters or fewer.');
  });

  it('counts code points, so an emoji is one character', () => {
    expect(validateContact(withValues({ name: '😀'.repeat(100) }), options).name).toBeUndefined();
    expect(validateContact(withValues({ name: '😀'.repeat(101) }), options).name).toBeDefined();
  });
});

describe('validateContact: email', () => {
  // local part of 64, '@', and a domain of 189: 254 in total; one more character makes 255.
  const address = (domainLength: number) => `${'a'.repeat(64)}@${'b'.repeat(domainLength - 4)}.com`;

  it('accepts 254 characters and rejects 255', () => {
    expect(address(189)).toHaveLength(254);
    expect(validateContact(withValues({ email: address(189) }), options).email).toBeUndefined();
    expect(address(190)).toHaveLength(255);
    expect(validateContact(withValues({ email: address(190) }), options).email).toBe('Work email must be 254 characters or fewer.');
  });

  it.each(['no-at-sign', 'a@b', 'a @b.co', 'a@b .co', '@b.co', 'a@@b.co'])('rejects %s', email => {
    expect(validateContact(withValues({ email }), options).email).toBe('Enter a valid email address.');
  });

  it('requires an email and trims it before the check', () => {
    expect(validateContact(withValues({ email: '' }), options).email).toBe('Work email is required.');
    expect(validateContact(withValues({ email: '  asha@example.com  ' }), options).email).toBeUndefined();
  });
});

describe('validateContact: phone (optional, length, charset)', () => {
  it('is optional', () => {
    expect(validateContact(withValues({ phone: '' }), options).phone).toBeUndefined();
    expect(validateContact(withValues({ phone: '   ' }), options).phone).toBeUndefined();
  });

  it('accepts exactly 30 characters and rejects 31', () => {
    expect(validateContact(withValues({ phone: '1'.repeat(30) }), options).phone).toBeUndefined();
    expect(validateContact(withValues({ phone: '1'.repeat(31) }), options).phone).toBe('Phone (optional) must be 30 characters or fewer.');
  });

  it('accepts digits, spaces and + - ( ) .', () => {
    expect(validateContact(withValues({ phone: '+1 (555) 010-200.' }), options).phone).toBeUndefined();
  });

  it.each(['call me', '555a', '555#1', '5552@1', '٣٣٣'])('rejects %s', phone => {
    expect(validateContact(withValues({ phone }), options).phone).toBe(DEFAULT_ERROR_MESSAGES.invalidPhone);
  });
});

describe('validateContact: topic', () => {
  it('requires a topic', () => {
    expect(validateContact(withValues({ topic: '' }), options).topic).toBe('Topic is required.');
  });

  it('rejects a topic that is not in the list when there is one', () => {
    expect(validateContact(withValues({ topic: 'other' }), options).topic).toBe('Choose a topic from the list.');
  });

  it('accepts any non-empty topic when no list is given', () => {
    expect(validateContact(withValues({ topic: 'anything' }), { ...options, topics: [] }).topic).toBeUndefined();
  });
});

describe('validateContact: message (10..2000 code points after trimming)', () => {
  it('requires a message', () => {
    expect(validateContact(withValues({ message: '   ' }), options).message).toBe('Message is required.');
  });

  it('rejects 9 characters and accepts 10', () => {
    expect(validateContact(withValues({ message: 'a'.repeat(9) }), options).message).toBe(
      'Your message must be at least 10 characters.'
    );
    expect(validateContact(withValues({ message: 'a'.repeat(10) }), options).message).toBeUndefined();
  });

  it('accepts 2000 characters and rejects 2001', () => {
    expect(validateContact(withValues({ message: 'a'.repeat(2000) }), options).message).toBeUndefined();
    expect(validateContact(withValues({ message: 'a'.repeat(2001) }), options).message).toBe(
      'Your message must be 2000 characters or fewer.'
    );
  });

  it('counts an emoji as ONE character', () => {
    expect(validateContact(withValues({ message: '😀'.repeat(10) }), options).message).toBeUndefined();
    expect(validateContact(withValues({ message: '😀'.repeat(9) }), options).message).toBeDefined();
    expect(validateContact(withValues({ message: '😀'.repeat(2000) }), options).message).toBeUndefined();
    expect(validateContact(withValues({ message: '😀'.repeat(2001) }), options).message).toBeDefined();
  });

  it('measures the trimmed text', () => {
    expect(validateContact(withValues({ message: `  ${'a'.repeat(10)}  ` }), options).message).toBeUndefined();
  });
});

describe('validateContact: consent and messages', () => {
  it('requires consent to be given', () => {
    expect(validateContact(withValues({ consent: false }), options).consent).toBe('Please accept to continue.');
  });

  it('uses the replacement messages it is given', () => {
    const custom = { ...options, messages: { ...DEFAULT_ERROR_MESSAGES, required: '{field} fehlt.' } };
    expect(validateContact(withValues({ name: '' }), custom).name).toBe('Full name fehlt.');
  });
});

describe('firstInvalidField', () => {
  it('returns the first failing field in form order', () => {
    expect(firstInvalidField({ consent: 'x', email: 'y' })).toBe('email');
    expect(firstInvalidField({})).toBeUndefined();
  });
});

describe('buildContactPayload', () => {
  const now = new Date('2026-11-07T10:20:30.000Z');
  const meta = { page: '/pricing', locale: 'en', now };

  it('has exactly the eleven documented keys', () => {
    expect(Object.keys(buildContactPayload(VALID, meta)).sort()).toEqual(
      ['name', 'email', 'company', 'phone', 'topic', 'message', 'consent', 'page', 'locale', 'submittedAt', 'website'].sort()
    );
  });

  it('trims the text values and sends the page, locale and time', () => {
    const payload = buildContactPayload(withValues({ name: '  Asha  ', phone: ' 555 ', message: '  Hello there  ' }), meta);
    expect(payload).toEqual({
      name: 'Asha',
      email: 'asha@example.com',
      company: 'Acme',
      phone: '555',
      topic: 'sales',
      message: 'Hello there',
      consent: true,
      page: '/pricing',
      locale: 'en',
      submittedAt: '2026-11-07T10:20:30.000Z',
      website: ''
    });
  });

  it('sends consent as the literal true', () => {
    expect(buildContactPayload(VALID, meta).consent).toBe(true);
  });

  it('sends the honeypot value as typed, normally empty', () => {
    expect(buildContactPayload(VALID, meta).website).toBe('');
    expect(buildContactPayload(withValues({ website: 'http://spam.example' }), meta).website).toBe('http://spam.example');
  });

  it('refuses to build a payload without consent', () => {
    expect(() => buildContactPayload(withValues({ consent: false }), meta)).toThrow();
  });
});

describe('interpretContactResponse: success', () => {
  it('reads the reference from a 201', () => {
    expect(interpretContactResponse(201, null, '{"ok":true,"reference":"INQ-1234"}')).toEqual({ kind: 'sent', reference: 'INQ-1234' });
  });

  it('accepts a 201 without a reference', () => {
    expect(interpretContactResponse(201, null, '{"ok":true}')).toEqual({ kind: 'sent' });
  });

  it('accepts the honeypot answer, a 200 with ok, as success without a reference', () => {
    expect(interpretContactResponse(200, null, '{"ok":true}')).toEqual({ kind: 'sent' });
  });

  it('does not treat a success status as success unless the body says ok', () => {
    expect(interpretContactResponse(201, null, '{"ok":false}')).toEqual({ kind: 'unavailable' });
    expect(interpretContactResponse(201, null, '{}')).toEqual({ kind: 'unavailable' });
    expect(interpretContactResponse(201, null, '')).toEqual({ kind: 'unavailable' });
    expect(interpretContactResponse(201, null, 'Created')).toEqual({ kind: 'unavailable' });
  });

  it.each(['', '   ', 'x'.repeat(65), 42])('drops an unusable reference (%j)', reference => {
    const body = JSON.stringify({ ok: true, reference });
    expect(interpretContactResponse(201, null, body)).toEqual({ kind: 'sent' });
  });

  it('trims a usable reference', () => {
    expect(interpretContactResponse(201, null, '{"ok":true,"reference":" INQ-9 "}')).toEqual({ kind: 'sent', reference: 'INQ-9' });
  });

  it('treats other 2xx answers as unavailable', () => {
    expect(interpretContactResponse(202, null, '{"ok":true}')).toEqual({ kind: 'unavailable' });
    expect(interpretContactResponse(204, null, '')).toEqual({ kind: 'unavailable' });
  });
});

describe('interpretContactResponse: validation (400)', () => {
  it('maps each field message to its field', () => {
    expect(interpretContactResponse(400, null, '{"ok":false,"errors":{"email":"Bad","name":"Too short"}}')).toEqual({
      kind: 'validation',
      errors: { email: 'Bad', name: 'Too short' }
    });
  });

  it('puts a body key in the form message', () => {
    expect(interpretContactResponse(400, null, '{"ok":false,"errors":{"body":"Request is malformed"}}')).toEqual({
      kind: 'validation',
      errors: {},
      formMessage: 'Request is malformed'
    });
  });

  it('puts an unknown key in the form message, next to the field messages', () => {
    expect(interpretContactResponse(400, null, '{"errors":{"email":"Bad","extra":"Odd"}}')).toEqual({
      kind: 'validation',
      errors: { email: 'Bad' },
      formMessage: 'Odd'
    });
  });

  it('ignores messages that are not text or are blank', () => {
    expect(interpretContactResponse(400, null, '{"errors":{"email":42,"name":"  "}}')).toEqual({ kind: 'unavailable' });
  });

  it('is unavailable when there is no errors object, or it is empty', () => {
    expect(interpretContactResponse(400, null, '{"ok":false}')).toEqual({ kind: 'unavailable' });
    expect(interpretContactResponse(400, null, '{"ok":false,"errors":[]}')).toEqual({ kind: 'unavailable' });
    expect(interpretContactResponse(400, null, '{"errors":{}}')).toEqual({ kind: 'unavailable' });
  });

  it('is unavailable for a 400 that is not JSON', () => {
    expect(interpretContactResponse(400, null, '<html>Bad Request</html>')).toEqual({ kind: 'unavailable' });
  });
});

describe('interpretContactResponse: rate limit (429)', () => {
  it.each([
    ['30', 30],
    ['0', 1],
    ['-5', undefined],
    ['abc', undefined],
    ['12.2', 13],
    [' 45 ', 45],
    ['', undefined],
    ['99999999999999999999999999', 3600],
    ['1e3', undefined],
    ['Wed, 21 Oct 2026 07:28:00 GMT', undefined]
  ])('Retry-After %j gives %s seconds', (header, expected) => {
    const result = interpretContactResponse(429, header, '{"ok":false}');
    expect(result).toEqual(expected === undefined ? { kind: 'rate_limited' } : { kind: 'rate_limited', retryAfterSeconds: expected });
  });

  it('works without the header', () => {
    expect(interpretContactResponse(429, null, '')).toEqual({ kind: 'rate_limited' });
  });

  it('ignores the body', () => {
    expect(interpretContactResponse(429, '10', 'not json at all')).toEqual({ kind: 'rate_limited', retryAfterSeconds: 10 });
  });

  it('parseRetryAfter is clamped to 1..3600 and whole', () => {
    expect(parseRetryAfter('3600')).toBe(3600);
    expect(parseRetryAfter('3601')).toBe(3600);
    expect(parseRetryAfter('1')).toBe(1);
    expect(parseRetryAfter(null)).toBeUndefined();
  });
});

describe('interpretContactResponse: everything else', () => {
  it.each([400, 404, 413, 415, 500, 502, 503])('%i is unavailable and keeps no body text', status => {
    expect(interpretContactResponse(status, null, '{"ok":false,"errors":{"email":"Bad"}}')).toEqual(
      status === 400 ? { kind: 'validation', errors: { email: 'Bad' } } : { kind: 'unavailable' }
    );
  });

  it.each([413, 415, 500, 503])('%i with a plain body is unavailable', status => {
    expect(interpretContactResponse(status, null, 'Internal stack trace')).toEqual({ kind: 'unavailable' });
  });

  it('is unavailable for JSON of the wrong shape', () => {
    expect(interpretContactResponse(201, null, '[{"ok":true}]')).toEqual({ kind: 'unavailable' });
    expect(interpretContactResponse(201, null, 'null')).toEqual({ kind: 'unavailable' });
    expect(interpretContactResponse(201, null, '"ok"')).toEqual({ kind: 'unavailable' });
  });
});

describe('submitContact', () => {
  const payload: ContactPayload = buildContactPayload(VALID, { page: '/x', locale: 'en', now: new Date('2026-01-01T00:00:00Z') });
  const ENDPOINT = 'https://api.example.com/contact';

  afterEach(() => {
    vi.useRealTimers();
  });

  function fakeFetch(response: Response) {
    return vi.fn(async (_url: string, _init?: RequestInit) => response);
  }

  it('posts the payload as JSON with the documented options', async () => {
    const fetchImpl = fakeFetch(new Response('{"ok":true,"reference":"INQ-1"}', { status: 201 }));
    const result = await submitContact({ endpoint: ENDPOINT, payload, fetchImpl });

    expect(result).toEqual({ kind: 'sent', reference: 'INQ-1' });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(ENDPOINT);
    expect(init.method).toBe('POST');
    expect(init.credentials).toBe('omit');
    expect(init.mode).toBe('cors');
    expect(init.headers).toEqual({ 'Content-Type': 'application/json', Accept: 'application/json' });
    expect(JSON.parse(String(init.body))).toEqual(payload);
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('never fetches without an endpoint', async () => {
    const fetchImpl = fakeFetch(new Response('{}', { status: 201 }));
    expect(await submitContact({ endpoint: '', payload, fetchImpl })).toEqual({ kind: 'unavailable' });
    expect(await submitContact({ endpoint: '   ', payload, fetchImpl })).toEqual({ kind: 'unavailable' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('never fetches an endpoint that is not http or https', async () => {
    const fetchImpl = fakeFetch(new Response('{}', { status: 201 }));
    expect(await submitContact({ endpoint: 'javascript:alert(1)', payload, fetchImpl })).toEqual({ kind: 'unavailable' });
    expect(await submitContact({ endpoint: '/relative/contact', payload, fetchImpl })).toEqual({ kind: 'unavailable' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('reports a network failure as unavailable', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('Failed to fetch');
    });
    expect(await submitContact({ endpoint: ENDPOINT, payload, fetchImpl })).toEqual({ kind: 'unavailable' });
  });

  it('reports a body that cannot be read as unavailable', async () => {
    const broken = { status: 201, headers: new Headers(), text: async () => Promise.reject(new Error('reset')) } as unknown as Response;
    expect(await submitContact({ endpoint: ENDPOINT, payload, fetchImpl: fakeFetch(broken) })).toEqual({ kind: 'unavailable' });
  });

  it('gives up after the timeout and reports unavailable', async () => {
    vi.useFakeTimers();
    const fetchImpl = vi.fn(
      (_url: string, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        })
    );
    const pending = submitContact({ endpoint: ENDPOINT, payload, fetchImpl });
    await vi.advanceTimersByTimeAsync(CONTACT_TIMEOUT_MS - 1);
    let settled = false;
    void pending.then(() => (settled = true));
    await Promise.resolve();
    expect(settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(await pending).toEqual({ kind: 'unavailable' });
  });

  it('aborts the request when the caller aborts', async () => {
    const controller = new AbortController();
    let seen: AbortSignal | undefined;
    const fetchImpl = vi.fn(
      (_url: string, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          seen = init?.signal ?? undefined;
          init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        })
    );
    const pending = submitContact({ endpoint: ENDPOINT, payload, signal: controller.signal, fetchImpl });
    controller.abort();
    expect(await pending).toEqual({ kind: 'unavailable' });
    expect(seen?.aborted).toBe(true);
  });

  it('does not send at all when the caller had already aborted', async () => {
    const controller = new AbortController();
    controller.abort();
    const fetchImpl = vi.fn(async () => new Response('{}', { status: 201 }));
    expect(await submitContact({ endpoint: ENDPOINT, payload, signal: controller.signal, fetchImpl })).toEqual({ kind: 'unavailable' });
  });
});

describe('isSubmittableEndpoint', () => {
  it.each(['https://api.example.com/contact', 'http://localhost:8080/contact'])('accepts %s', url => {
    expect(isSubmittableEndpoint(url)).toBe(true);
  });

  it.each(['', 'contact', 'mailto:hi@example.com', 'ftp://x.example/contact'])('rejects %j', url => {
    expect(isSubmittableEndpoint(url)).toBe(false);
  });
});

describe('topics', () => {
  it('normalizes items: needs a value, label defaults to value, blank group is no group, first value wins', () => {
    expect(
      normalizeTopics([
        { value: ' sales ', label: ' Sales ', group: ' Products ' },
        { value: 'support' },
        { value: 'support', label: 'Duplicate' },
        { label: 'No value' },
        { value: '   ' },
        'not an object',
        { value: 'x', label: 'Blank group', group: '  ' },
        null
      ])
    ).toEqual([
      { value: 'sales', label: 'Sales', group: 'Products' },
      { value: 'support', label: 'support' },
      { value: 'x', label: 'Blank group' }
    ]);
  });

  it('returns nothing for anything that is not an array', () => {
    expect(normalizeTopics({ value: 'a' })).toEqual([]);
    expect(normalizeTopics(undefined)).toEqual([]);
  });

  it('reads the topics attribute and survives bad JSON', () => {
    expect(parseTopicsAttribute('[{"value":"a","label":"A"}]')).toEqual([{ value: 'a', label: 'A' }]);
    expect(parseTopicsAttribute('[{"value":')).toEqual([]);
    expect(parseTopicsAttribute(null)).toEqual([]);
    expect(parseTopicsAttribute('   ')).toEqual([]);
  });

  it('groups ungrouped items as one run, in order of first appearance', () => {
    const groups = groupTopics([
      { value: 'a', label: 'A', group: 'G1' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C', group: 'G1' },
      { value: 'd', label: 'D', group: 'G2' }
    ]);
    expect(groups.map(group => [group.group, group.topics.map(topic => topic.value)])).toEqual([
      ['G1', ['a', 'c']],
      [undefined, ['b']],
      ['G2', ['d']]
    ]);
  });

  it('preselects from ?product= first, then ?topic=, then the default, matching without case', () => {
    expect(resolvePreselectedTopic(TOPICS, { product: 'SALES', topic: 'support', defaultTopic: 'support' })).toEqual({
      value: 'sales',
      fromQuery: true
    });
    expect(resolvePreselectedTopic(TOPICS, { product: 'unknown', topic: 'support' })).toEqual({ value: 'support', fromQuery: true });
    expect(resolvePreselectedTopic(TOPICS, { defaultTopic: 'support' })).toEqual({ value: 'support', fromQuery: false });
  });

  it('ignores a query value that is not a topic, and a default that is not a topic', () => {
    expect(resolvePreselectedTopic(TOPICS, { product: 'nope', topic: '' })).toEqual({ value: '', fromQuery: false });
    expect(resolvePreselectedTopic(TOPICS, { defaultTopic: 'SALES' })).toEqual({ value: '', fromQuery: false });
    expect(resolvePreselectedTopic([], { product: 'sales', defaultTopic: 'sales' })).toEqual({ value: '', fromQuery: false });
  });

  it('reads product and topic from the query, key names without regard to case', () => {
    expect(readContactQuery('?Product=Sales&topic=Support')).toEqual({ product: 'Sales', topic: 'Support' });
    expect(readContactQuery('?topic=first&topic=second')).toEqual({ product: null, topic: 'first' });
    expect(readContactQuery('')).toEqual({ product: null, topic: null });
  });
});

describe('fillTemplate and codePointLength', () => {
  it('fills placeholders in one pass, so substituted text is not filled again', () => {
    expect(fillTemplate('{a} {b}', { a: '{b}', b: 'x' })).toBe('{b} x');
  });

  it('leaves unknown placeholders alone', () => {
    expect(fillTemplate('{count} of {max}', { count: 3 })).toBe('3 of {max}');
  });

  it('counts code points', () => {
    expect(codePointLength('a😀b')).toBe(3);
    expect(codePointLength('')).toBe(0);
  });
});
