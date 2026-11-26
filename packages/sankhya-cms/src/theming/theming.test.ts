import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { applyTheme, isTheme, THEMES } from './index';

function installFakeDom() {
  const classes = new Set<string>(['keep-me']);
  const style: Record<string, string> = {};
  const head: { id: string; rel: string; href: string }[] = [];
  Object.assign(globalThis, {
    document: {
      documentElement: {
        classList: {
          add: (...names: string[]) => names.forEach(n => classes.add(n)),
          remove: (...names: string[]) => names.forEach(n => classes.delete(n))
        },
        style
      },
      head: { appendChild: (link: { id: string; rel: string; href: string }) => head.push(link) },
      createElement: () => ({ id: '', rel: '', href: '' }),
      getElementById: (id: string) => head.find(link => link.id === id) ?? null
    }
  });
  return { classes, style, head };
}

afterEach(() => {
  Reflect.deleteProperty(globalThis, 'document');
});

describe('theme registry', () => {
  it('knows its themes', () => {
    expect(isTheme('dark')).toBe(true);
    expect(isTheme('nope')).toBe(false);
    expect(THEMES[0].value).toBe('default');
    expect(isTheme('red')).toBe(false);
  });

  // The swatch colours are a second copy of themes.css's literals; this keeps them from drifting.
  it("brand themes' palettes match themes.css", () => {
    const css = readFileSync(fileURLToPath(new URL('../themes.css', import.meta.url)), 'utf8');
    const brand = THEMES.filter(theme => theme.value !== 'default' && theme.value !== 'dark');
    expect(brand).toHaveLength(8);
    for (const theme of brand) {
      const selector = theme.dark ? `:root.dark.${theme.value}` : `:root.${theme.value}`;
      const block = css.match(new RegExp(`${selector.replace(/\./g, '\\.')} \\{([^}]*)\\}`))?.[1];
      expect(block, selector).toBeDefined();
      const token = (name: string) => block!.match(new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`))?.[1]?.toUpperCase();
      expect(
        { background: token('--st-primary-background'), banner: token('--st-primary-banner'), accent: token('--st-brand-color'), ink: token('--st-primary-color') },
        theme.value
      ).toEqual(theme.palette);
    }
  });

  it('every theme class in themes.css is registered', () => {
    const css = readFileSync(fileURLToPath(new URL('../themes.css', import.meta.url)), 'utf8');
    const classes = [...css.matchAll(/^:root((?:\.[a-z]+)+) \{/gm)].map(match => match[1].split('.').pop());
    expect(classes.sort()).toEqual(THEMES.filter(theme => theme.value !== 'default').map(theme => theme.value).sort());
  });
});

describe('applyTheme', () => {
  it('swaps only theme classes and sets color-scheme', () => {
    const { classes, style } = installFakeDom();
    expect(applyTheme('dark')).toBe('dark');
    expect([...classes].sort()).toEqual(['dark', 'keep-me']);
    expect(style.colorScheme).toBe('dark');

    expect(applyTheme('citrus')).toBe('citrus');
    expect([...classes].sort()).toEqual(['citrus', 'keep-me']);
    expect(style.colorScheme).toBe('light');
  });

  it('default adds no class, unknown falls back to default', () => {
    const { classes } = installFakeDom();
    applyTheme('dark');
    expect(applyTheme('default')).toBe('default');
    expect(applyTheme('bogus')).toBe('default');
    expect([...classes]).toEqual(['keep-me']);
  });

  it('applies a dark brand theme with the dark class, and removes both on switch', () => {
    const { classes, style } = installFakeDom();
    expect(applyTheme('aurora')).toBe('aurora');
    expect([...classes].sort()).toEqual(['aurora', 'dark', 'keep-me']);
    expect(style.colorScheme).toBe('dark');

    applyTheme('electric');
    expect([...classes].sort()).toEqual(['electric', 'keep-me']);
    expect(style.colorScheme).toBe('light');

    applyTheme('dark');
    expect([...classes].sort()).toEqual(['dark', 'keep-me']);
  });

  it("loads a theme's font once, and none for a theme without one", () => {
    const { head } = installFakeDom();
    applyTheme('default');
    expect(head).toHaveLength(0);

    applyTheme('electric');
    applyTheme('default');
    applyTheme('electric');
    expect(head).toHaveLength(1);
    expect(head[0].href).toBe('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

    applyTheme('inklime');
    applyTheme('neon');
    expect(head).toHaveLength(2);
  });
});
