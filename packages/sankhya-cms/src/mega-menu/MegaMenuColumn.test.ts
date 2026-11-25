// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';

import './MegaMenuColumn';
import type { MegaMenuColumn } from './MegaMenuColumn';

let hosts: HTMLElement[] = [];

afterEach(() => {
  for (const host of hosts) host.remove();
  hosts = [];
});

async function mount(attrs: string, currentPath = ''): Promise<ShadowRoot> {
  const host = document.createElement('div');
  host.innerHTML = `<st-mega-menu-column variant="product" heading="P" ${attrs}></st-mega-menu-column>`;
  document.body.append(host);
  hosts.push(host);
  const column = host.querySelector<MegaMenuColumn>('st-mega-menu-column') as MegaMenuColumn;
  if (currentPath) column.currentPath = currentPath;
  await column.updateComplete;
  return column.shadowRoot as ShadowRoot;
}

describe('product card tag', () => {
  it('shows a text tag as a pill', async () => {
    const root = await mount('tag="Open source"');
    expect(root.querySelector('.pill.tag')?.textContent).toBe('Open source');
    expect(root.querySelector('.tag-image')).toBeNull();
  });

  it('shows an image URL as an image, with its alt text', async () => {
    const root = await mount('tag="https://img.example.com/badge.svg" tag-alt="Badge"');
    const img = root.querySelector<HTMLImageElement>('.tag-image img');
    expect(img?.getAttribute('src')).toBe('https://img.example.com/badge.svg');
    expect(img?.getAttribute('alt')).toBe('Badge');
    expect(root.querySelector('.pill.tag')).toBeNull();
  });

  it('treats a root-relative path as an image too', async () => {
    const root = await mount('tag="/images/badge.svg"');
    expect(root.querySelector('.tag-image img')).not.toBeNull();
  });

  it('keeps the tag beside the "You are here" pill on the current card', async () => {
    const root = await mount('tag="Open source" cta-href="/here" current-label="You are here"', '/here');
    expect(root.querySelector('.pill.current')?.textContent).toBe('You are here');
    expect(root.querySelector('.pill.tag')?.textContent).toBe('Open source');
  });
});
