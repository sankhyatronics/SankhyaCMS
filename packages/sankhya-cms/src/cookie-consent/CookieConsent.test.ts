// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Side-effect import: it defines `st-cookie-consent`. The class is only used as a type below.
import './CookieConsent';
import type { CookieConsent } from './CookieConsent';

const KEY = 'test-consent';

let hosts: HTMLElement[] = [];

beforeEach(() => {
  localStorage.clear();
  // jsdom has no ResizeObserver; the bar uses one to publish its height.
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});
afterEach(() => {
  for (const host of hosts) host.remove();
  hosts = [];
  localStorage.clear();
  vi.unstubAllGlobals();
});

/** Attaches the element first and sets `storageKey` afterwards, the way a framework wrapper does. */
async function mount(setKeyAfterConnect: string | null): Promise<CookieConsent> {
  const host = document.createElement('div');
  host.innerHTML = '<st-cookie-consent></st-cookie-consent>';
  document.body.append(host);
  hosts.push(host);
  const element = host.querySelector<CookieConsent>('st-cookie-consent') as CookieConsent;
  if (setKeyAfterConnect !== null) element.storageKey = setKeyAfterConnect;
  await element.updateComplete;
  return element;
}

const barShown = (element: CookieConsent) => element.shadowRoot?.querySelector('button.accept') != null;

describe('a stored choice', () => {
  it('shows the bar when nothing is stored', async () => {
    const element = await mount(KEY);
    expect(barShown(element)).toBe(true);
  });

  it('hides the bar when a choice is stored under the key set after the element connected', async () => {
    localStorage.setItem(KEY, 'accepted');
    const element = await mount(KEY);
    expect(barShown(element)).toBe(false);
  });

  it('hides the bar for a refused choice and for a custom one', async () => {
    localStorage.setItem(KEY, 'refused');
    expect(barShown(await mount(KEY))).toBe(false);
    localStorage.setItem(KEY, JSON.stringify({ status: 'custom', categories: { necessary: true, analytics: false } }));
    expect(barShown(await mount(KEY))).toBe(false);
  });

  it('keeps showing the bar when the choice is stored under a different key', async () => {
    localStorage.setItem('some-other-key', 'accepted');
    expect(barShown(await mount(KEY))).toBe(true);
  });

  it('marks the host answered, so it is not drawn empty, only once a choice exists', async () => {
    const fresh = await mount(KEY);
    expect(fresh.hasAttribute('data-st-answered')).toBe(false);

    fresh.shadowRoot?.querySelector<HTMLButtonElement>('button.accept')?.click();
    await fresh.updateComplete;
    expect(fresh.hasAttribute('data-st-answered')).toBe(true);

    localStorage.setItem(KEY, 'refused');
    expect((await mount(KEY)).hasAttribute('data-st-answered')).toBe(true);
  });

  it('saves the choice under the key in force, so the next load finds it', async () => {
    const element = await mount(KEY);
    element.shadowRoot?.querySelector<HTMLButtonElement>('button.accept')?.click();
    await element.updateComplete;
    expect(localStorage.getItem(KEY)).toBe('accepted');
    expect(barShown(element)).toBe(false);
    expect(barShown(await mount(KEY))).toBe(false);
  });
});
