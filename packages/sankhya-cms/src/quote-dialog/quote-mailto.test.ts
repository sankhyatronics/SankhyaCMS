import { describe, expect, it } from 'vitest';

import { buildQuoteMailto } from './quote-mailto';

describe('buildQuoteMailto', () => {
  const url = buildQuoteMailto({
    to: 'sales@example.com',
    subject: 'Quote request',
    optionLabel: 'Pilot programme',
    fields: [
      { label: 'Name', value: 'Asha Singh' },
      { label: 'Email', value: 'asha@example.com' },
      { label: 'Message', value: 'Line one\nLine two' }
    ]
  });

  it('addresses the recipient and encodes the subject', () => {
    expect(url.startsWith('mailto:sales@example.com?subject=Quote%20request&body=')).toBe(true);
  });

  it('writes the option and every field into a plain-text body', () => {
    const body = new URL(url).searchParams.get('body');
    expect(body).toBe('Option: Pilot programme\nName: Asha Singh\nEmail: asha@example.com\nMessage: Line one\nLine two');
  });

  it('writes an empty value as a dash', () => {
    const body = new URL(buildQuoteMailto({ to: 'a@b.co', subject: 'S', optionLabel: 'O', fields: [{ label: 'Message', value: '  ' }] })).searchParams.get('body');
    expect(body).toBe('Option: O\nMessage: -');
  });
});
