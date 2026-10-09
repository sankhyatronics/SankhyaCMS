/**
 * Theme runtime for `themes.css`: the list of themes, and applying one to `<html>`.
 * Framework-free and storage-free — where the chosen theme is remembered is up to the host app.
 */

export interface ThemeOption {
  value: string;
  label: string;
  /** Approximate color for a picker swatch, not the palette itself (that's `themes.css`). */
  swatch: string;
  dark: boolean;
}

export const DEFAULT_THEME = 'default';

/** `'default'` applies no class (the base palette); every other value is a class in `themes.css`. */
export const THEMES: readonly ThemeOption[] = [
  { value: 'default', label: 'Default', swatch: '#94a3b8', dark: false },
  { value: 'dark', label: 'Dark', swatch: '#1f2937', dark: true },
  { value: 'red', label: 'Red', swatch: '#ef4444', dark: false },
  { value: 'amber', label: 'Amber', swatch: '#f59e0b', dark: false },
  { value: 'lime', label: 'Lime', swatch: '#84cc16', dark: false },
  { value: 'teal', label: 'Teal', swatch: '#14b8a6', dark: false },
  { value: 'cyan', label: 'Cyan', swatch: '#06b6d4', dark: false },
  { value: 'sky', label: 'Sky', swatch: '#0ea5e9', dark: false },
  { value: 'blue', label: 'Blue', swatch: '#3b82f6', dark: false },
  { value: 'indigo', label: 'Indigo', swatch: '#6366f1', dark: false },
  { value: 'fuchsia', label: 'Fuchsia', swatch: '#d946ef', dark: false },
  { value: 'pink', label: 'Pink', swatch: '#ec4899', dark: false }
];

export function isTheme(value: unknown): value is string {
  return typeof value === 'string' && THEMES.some(theme => theme.value === value);
}

const THEME_CLASSES = THEMES.filter(theme => theme.value !== DEFAULT_THEME).map(theme => theme.value);
const DARK_QUERY = '(prefers-color-scheme: dark)';

/** The theme to use when nobody has chosen one: `dark` if the OS prefers it, else `default`. */
export function systemTheme(): string {
  if (typeof window === 'undefined' || !window.matchMedia) return DEFAULT_THEME;
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : DEFAULT_THEME;
}

/** Calls `onChange` when the OS light/dark setting flips; returns an unsubscribe function. */
export function watchSystemTheme(onChange: (theme: string) => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const query = window.matchMedia(DARK_QUERY);
  const listener = () => onChange(systemTheme());
  query.addEventListener('change', listener);
  return () => query.removeEventListener('change', listener);
}

/**
 * Applies a theme to `<html>`: swaps only the theme classes (other classes on the element are left
 * alone) and sets `color-scheme` so native controls and scrollbars match. `null`/`undefined` means
 * "nobody chose", which follows the OS; an unknown value falls back to `default`. Returns the
 * theme actually applied.
 */
export function applyTheme(theme: string | null | undefined): string {
  const resolved = theme === null || theme === undefined ? systemTheme() : isTheme(theme) ? theme : DEFAULT_THEME;
  if (typeof document === 'undefined') return resolved;
  const root = document.documentElement;
  root.classList.remove(...THEME_CLASSES);
  if (resolved !== DEFAULT_THEME) root.classList.add(resolved);
  root.style.colorScheme = THEMES.find(option => option.value === resolved)?.dark ? 'dark' : 'light';
  return resolved;
}
