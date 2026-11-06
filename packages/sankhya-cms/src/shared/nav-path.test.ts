import { describe, expect, it } from 'vitest';

import { isCurrentPath, normalisePath } from './nav-path';

describe('normalisePath', () => {
  it('makes relative hrefs absolute', () => {
    expect(normalisePath('t-pilot')).toBe('/t-pilot');
    expect(normalisePath('./t-pilot')).toBe('/t-pilot');
  });

  it('drops the query, the hash and trailing slashes', () => {
    expect(normalisePath('/contact-us?x=y')).toBe('/contact-us');
    expect(normalisePath('/docs#intro')).toBe('/docs');
    expect(normalisePath('/products/')).toBe('/products');
    expect(normalisePath('/')).toBe('/');
  });

  it('ignores external URLs, hash-only and query-only links', () => {
    expect(normalisePath('https://example.com/x')).toBe('');
    expect(normalisePath('mailto:hi@example.com')).toBe('');
    expect(normalisePath('//cdn.example.com/x')).toBe('');
    expect(normalisePath('#top')).toBe('');
    expect(normalisePath('?page=2')).toBe('');
    expect(normalisePath('')).toBe('');
    expect(normalisePath(undefined)).toBe('');
  });
});

describe('isCurrentPath', () => {
  it('matches an exact path, relative or absolute', () => {
    expect(isCurrentPath('t-pilot', '/t-pilot')).toBe(true);
    expect(isCurrentPath('/t-pilot', '/t-pilot')).toBe(true);
    expect(isCurrentPath('/t-pilot', '/t-pilot/')).toBe(true);
  });

  it('matches a non-root href for the pages beneath it, but not a sibling that shares a prefix', () => {
    expect(isCurrentPath('/products', '/products/pricing')).toBe(true);
    expect(isCurrentPath('/products', '/productsx')).toBe(false);
    expect(isCurrentPath('/products', '/')).toBe(false);
  });

  it('matches "/" only on "/" (Home is not active on /t-pilot)', () => {
    expect(isCurrentPath('/', '/')).toBe(true);
    expect(isCurrentPath('/', '/t-pilot')).toBe(false);
    expect(isCurrentPath('/', '/products')).toBe(false);
  });

  it('never matches external or hash-only hrefs', () => {
    expect(isCurrentPath('https://example.com/t-pilot', '/t-pilot')).toBe(false);
    expect(isCurrentPath('#t-pilot', '/t-pilot')).toBe(false);
  });

  it('treats an empty current path as "/"', () => {
    expect(isCurrentPath('/', '')).toBe(true);
    expect(isCurrentPath('/t-pilot', '')).toBe(false);
  });
});
