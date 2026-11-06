import { describe, expect, it } from 'vitest';

import { splitTitleHighlight } from './title-highlight';

describe('splitTitleHighlight', () => {
  it('splits around the highlighted substring', () => {
    expect(splitTitleHighlight('Ship portals from JSON', 'portals')).toEqual({
      before: 'Ship ',
      match: 'portals',
      after: ' from JSON'
    });
  });

  it('highlights only the first occurrence', () => {
    expect(splitTitleHighlight('go go go', 'go')).toEqual({ before: '', match: 'go', after: ' go go' });
  });

  it('returns null when there is nothing to highlight', () => {
    expect(splitTitleHighlight('Plain title', '')).toBeNull();
    expect(splitTitleHighlight('Plain title', 'missing')).toBeNull();
  });

  it('keeps markup-like text as plain text', () => {
    expect(splitTitleHighlight('<b>Hi</b>', '<b>')).toEqual({ before: '', match: '<b>', after: 'Hi</b>' });
  });
});
