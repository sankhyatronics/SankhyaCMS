import { describe, expect, it } from 'vitest';

import { buildMailto } from './mailto';
import { fillTemplate } from '../quote-dialog/quote-mailto';

const bodyOf = (url: string) => new URL(url).searchParams.get('body') ?? '';

describe('buildMailto', () => {
  it('writes labelled lines and encodes subject and body', () => {
    const url = buildMailto({
      to: 'contact@example.com',
      subject: 'Enquiry: T-pilot – Acme & Co',
      fields: [
        { label: 'Name', value: 'Asha' },
        { label: 'Message', value: 'Hi\nthere' }
      ]
    });
    expect(url.startsWith('mailto:contact@example.com?subject=Enquiry%3A%20T-pilot%20%E2%80%93%20Acme%20%26%20Co&body=')).toBe(true);
    expect(bodyOf(url)).toBe('Name: Asha\nMessage: Hi\nthere');
  });

  it('shortens the last field with an ellipsis to keep the encoded body under the limit', () => {
    const message = 'x'.repeat(5000);
    const url = buildMailto({ to: 'a@b.co', subject: 'S', fields: [{ label: 'Name', value: 'Asha' }, { label: 'Message', value: message }], maxBodyLength: 1800 });
    const encodedBody = url.split('&body=')[1];
    expect(encodedBody.length).toBeLessThanOrEqual(1800);
    const body = bodyOf(url);
    expect(body.startsWith('Name: Asha\nMessage: xxx')).toBe(true);
    expect(body.endsWith('…')).toBe(true);
  });

  it('never splits a surrogate pair when shortening', () => {
    const url = buildMailto({ to: 'a@b.co', subject: 'S', fields: [{ label: 'M', value: '😀'.repeat(400) }], maxBodyLength: 300 });
    expect(bodyOf(url)).toMatch(/^M: (😀)+…$/u);
  });

  it('leaves a short body untouched', () => {
    expect(bodyOf(buildMailto({ to: 'a@b.co', subject: 'S', fields: [{ label: 'M', value: 'short' }] }))).toBe('M: short');
  });
});

describe('fillTemplate', () => {
  it('fills known placeholders and keeps unknown ones', () => {
    expect(fillTemplate('Quote request: T-pilot {option} – {company} {other}', { option: 'Cloud', company: 'Acme' })).toBe(
      'Quote request: T-pilot Cloud – Acme {other}'
    );
  });
});
