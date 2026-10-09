import { afterEach, describe, expect, it } from 'vitest';
import { applyTheme, isTheme, THEMES } from './index';

function installFakeDom() {
  const classes = new Set<string>(['keep-me']);
  const style: Record<string, string> = {};
  Object.assign(globalThis, {
    document: {
      documentElement: {
        classList: {
          add: (...names: string[]) => names.forEach(n => classes.add(n)),
          remove: (...names: string[]) => names.forEach(n => classes.delete(n))
        },
        style
      }
    }
  });
  return { classes, style };
}

afterEach(() => {
  Reflect.deleteProperty(globalThis, 'document');
});

describe('theme registry', () => {
  it('knows its themes', () => {
    expect(isTheme('dark')).toBe(true);
    expect(isTheme('nope')).toBe(false);
    expect(THEMES[0].value).toBe('default');
  });
});

describe('applyTheme', () => {
  it('swaps only theme classes and sets color-scheme', () => {
    const { classes, style } = installFakeDom();
    expect(applyTheme('dark')).toBe('dark');
    expect([...classes].sort()).toEqual(['dark', 'keep-me']);
    expect(style.colorScheme).toBe('dark');

    expect(applyTheme('red')).toBe('red');
    expect([...classes].sort()).toEqual(['keep-me', 'red']);
    expect(style.colorScheme).toBe('light');
  });

  it('default adds no class, unknown falls back to default', () => {
    const { classes } = installFakeDom();
    applyTheme('dark');
    expect(applyTheme('default')).toBe('default');
    expect(applyTheme('bogus')).toBe('default');
    expect([...classes]).toEqual(['keep-me']);
  });
});
