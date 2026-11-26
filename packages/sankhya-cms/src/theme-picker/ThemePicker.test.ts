// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';

// Side-effect import: it defines `st-theme-picker` (and `st-dropdown`).
import './ThemePicker';
import type { ThemePicker } from './ThemePicker';
import type { Dropdown } from '../dropdown/Dropdown';

let hosts: HTMLElement[] = [];

afterEach(() => {
  for (const host of hosts) host.remove();
  hosts = [];
});

async function mount(value: string, variant: 'icon' | 'field' = 'icon'): Promise<ThemePicker> {
  const host = document.createElement('div');
  host.innerHTML = `<st-theme-picker value="${value}" variant="${variant}" label="Change theme"></st-theme-picker>`;
  document.body.append(host);
  hosts.push(host);
  const element = host.querySelector<ThemePicker>('st-theme-picker') as ThemePicker;
  await element.updateComplete;
  return element;
}

const options = (element: ThemePicker) => [...(element.shadowRoot?.querySelectorAll<HTMLElement>('[role="option"]') ?? [])];
const dropdown = (element: ThemePicker) => element.shadowRoot?.querySelector('st-dropdown') as Dropdown;

describe('st-theme-picker', () => {
  it('groups the themes under Light and Dark, with dark ones named as such', async () => {
    const element = await mount('default');
    const groups = [...(element.shadowRoot?.querySelectorAll('[role="group"]') ?? [])];
    expect(groups.map(group => group.querySelector('.group-heading')?.textContent)).toEqual(['Light', 'Dark']);
    expect(options(element).map(option => option.getAttribute('aria-label'))).toEqual([
      'Default',
      'Electric',
      'InkLime',
      'Citrus',
      'Emerald',
      'Coral',
      'Dark, dark theme',
      'Neon, dark theme',
      'Aurora, dark theme',
      'Ember, dark theme'
    ]);
  });

  it('marks the current theme, with a four-colour swatch per option', async () => {
    const element = await mount('aurora');
    const selected = options(element).filter(option => option.getAttribute('aria-selected') === 'true');
    expect(selected.map(option => option.getAttribute('aria-label'))).toEqual(['Aurora, dark theme']);
    expect(selected[0].querySelector('.check')).not.toBeNull();
    const blocks = [...selected[0].querySelectorAll<HTMLElement>('.swatch > span')].map(block => block.style.background);
    expect(blocks).toHaveLength(4);
    expect(selected[0].querySelector('.swatch')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('fires theme-change on click and on Enter, and closes the panel', async () => {
    const element = await mount('default');
    const picked: string[] = [];
    element.addEventListener('theme-change', event => picked.push(event.detail.value));

    dropdown(element).open = true;
    await dropdown(element).updateComplete;
    options(element)[1].click();
    expect(picked).toEqual(['electric']);
    expect(dropdown(element).open).toBe(false);

    await element.updateComplete;
    options(element)[8].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    expect(picked).toEqual(['electric', 'aurora']);
    expect(element.value).toBe('aurora');
  });

  it('does not fire for the theme already chosen', async () => {
    const element = await mount('citrus');
    const picked: string[] = [];
    element.addEventListener('theme-change', event => picked.push(event.detail.value));
    options(element)[3].click();
    expect(picked).toEqual([]);
  });

  it('names the trigger after the label and the current theme', async () => {
    const element = await mount('neon', 'field');
    expect(element.shadowRoot?.querySelector('.sr-only')?.textContent).toBe('Change theme: Neon, dark theme');
  });
});
