// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';

// Side-effect import: it defines `st-footer`. The class is only used as a type below.
import './Footer';
import type { Footer } from './Footer';

let hosts: HTMLElement[] = [];

afterEach(() => {
  for (const host of hosts) host.remove();
  hosts = [];
});

async function mount(columns: Footer['columns']): Promise<Footer> {
  const host = document.createElement('div');
  host.innerHTML = '<st-footer></st-footer>';
  document.body.append(host);
  hosts.push(host);
  const element = host.querySelector<Footer>('st-footer') as Footer;
  element.columns = columns;
  await element.updateComplete;
  return element;
}

const labels = (element: Footer) => [...(element.shadowRoot?.querySelectorAll('.link') ?? [])].map(link => link.textContent?.trim());
const titles = (element: Footer) => [...(element.shadowRoot?.querySelectorAll('.column-title') ?? [])].map(title => title.textContent?.trim());

describe('footer link visibility', () => {
  it('shows every link and column when none sets visible', async () => {
    const element = await mount([{ title: 'Products', links: [{ label: 'A', href: '/a' }, { label: 'B', href: '/b' }] }]);
    expect(titles(element)).toEqual(['Products']);
    expect(labels(element)).toEqual(['A', 'B']);
  });

  it('leaves out a link with visible: false and keeps the others in order', async () => {
    const element = await mount([
      {
        title: 'Products',
        links: [
          { label: 'A', href: '/a', visible: false },
          { label: 'B', href: '/b' },
          { label: 'C', href: '/c', visible: true },
          { label: 'D', href: '/d', visible: false }
        ]
      }
    ]);
    expect(labels(element)).toEqual(['B', 'C']);
  });

  it('leaves out a column with visible: false', async () => {
    const element = await mount([
      { title: 'Hidden', visible: false, links: [{ label: 'A', href: '/a' }] },
      { title: 'Shown', links: [{ label: 'B', href: '/b' }] }
    ]);
    expect(titles(element)).toEqual(['Shown']);
    expect(labels(element)).toEqual(['B']);
  });

  it('leaves out a column whose links are all hidden, heading included', async () => {
    const element = await mount([
      { title: 'Empty', links: [{ label: 'A', href: '/a', visible: false }] },
      { title: 'Shown', links: [{ label: 'B', href: '/b' }] }
    ]);
    expect(titles(element)).toEqual(['Shown']);
  });
});
