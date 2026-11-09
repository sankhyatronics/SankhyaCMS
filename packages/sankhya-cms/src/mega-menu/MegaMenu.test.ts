// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';

// Side-effect imports: they define `st-mega-menu` and `st-mega-menu-column`. The class is only used as a type.
import './MegaMenu';
import './MegaMenuColumn';
import type { MegaMenu } from './MegaMenu';
import { MEGA_MENU_LAYOUT_EVENT } from './MegaMenuEvents';

let hosts: HTMLElement[] = [];

afterEach(() => {
  for (const host of hosts) host.remove();
  hosts = [];
});

async function mount(markup: string): Promise<{ menu: MegaMenu; tracks: number[] }> {
  const host = document.createElement('div');
  const tracks: number[] = [];
  host.addEventListener(MEGA_MENU_LAYOUT_EVENT, event => tracks.push((event as CustomEvent<{ tracks: number }>).detail.tracks));
  host.innerHTML = markup;
  document.body.append(host);
  hosts.push(host);
  const menu = host.querySelector<MegaMenu>('st-mega-menu') as MegaMenu;
  await menu.updateComplete;
  return { menu, tracks };
}

const column = (heading: string) => `<st-mega-menu-column heading="${heading}"></st-mega-menu-column>`;

describe('mega menu layout event', () => {
  it('reports the number of columns when it lays them out', async () => {
    const { tracks } = await mount(`<st-mega-menu columns="2">${column('A')}${column('B')}</st-mega-menu>`);
    expect(tracks).toEqual([2]);
  });

  it('counts the intro and featured columns as tracks', async () => {
    const { tracks } = await mount(
      `<st-mega-menu columns="2" heading="Intro" featured-heading="Featured">${column('A')}${column('B')}</st-mega-menu>`
    );
    expect(tracks.at(-1)).toBe(4);
  });

  it('reports again only when the number of tracks changes', async () => {
    const { menu, tracks } = await mount(`<st-mega-menu columns="2">${column('A')}${column('B')}</st-mega-menu>`);
    menu.heading = 'Intro';
    await menu.updateComplete;
    menu.description = 'Same track count';
    await menu.updateComplete;
    expect(tracks).toEqual([2, 3]);
  });
});
