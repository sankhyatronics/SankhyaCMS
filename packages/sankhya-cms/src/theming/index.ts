/**
 * Theme runtime for `themes.css`: the list of themes, and applying one to `<html>`.
 * Framework-free and storage-free — where the chosen theme is remembered is up to the host app.
 */

/** The four colours a theme's picker swatch shows, left to right. */
export interface ThemePalette {
  /** The page background (`--st-primary-background`). */
  background: string;
  /** The app-card banner (`--st-primary-banner`, else `--st-primary-brand-soft`). */
  banner: string;
  /** The accent (`--st-brand-color` / `--st-primary-accent`). */
  accent: string;
  /** The text colour (`--st-primary-color`). */
  ink: string;
}

export interface ThemeOption {
  value: string;
  /** The theme's name, shown as written in every language. */
  label: string;
  /** One colour standing for the theme where a single dot fits (the accent, or the banner when
   * the accent is near-black). Kept for older pickers; new ones show `palette`. */
  swatch: string;
  dark: boolean;
  /**
   * The theme's colours for a picker swatch. For the brand themes these are the literal values in
   * `themes.css` (theming.test.ts fails if the two differ); `default` and `dark` give the hex
   * equivalent of their oklch values.
   */
  palette: ThemePalette;
  /**
   * The Google Fonts family the theme's `--st-font-family` names, loaded by `applyTheme` the first
   * time the theme is applied. Unset: the font is bundled (Inter, `fonts.css`).
   */
  font?: string;
}

export const DEFAULT_THEME = 'default';

/**
 * `'default'` applies no class (the base palette); every other value is a class in `themes.css`.
 * A `dark` theme other than `'dark'` itself is applied together with the `dark` class.
 */
export const THEMES: readonly ThemeOption[] = [
  {
    value: 'default', label: 'Default', swatch: '#3557e0', dark: false,
    palette: { background: '#F6F7F9', banner: '#EEF2FE', accent: '#3557E0', ink: '#14171F' }
  },
  {
    value: 'electric', label: 'Electric', swatch: '#4338ca', dark: false, font: 'Plus Jakarta Sans',
    palette: { background: '#ECEEFF', banner: '#DCE0FF', accent: '#4338CA', ink: '#0B0B1F' }
  },
  {
    value: 'inklime', label: 'InkLime', swatch: '#d9f99d', dark: false, font: 'Space Grotesk',
    palette: { background: '#F2F2EC', banner: '#D9F99D', accent: '#0A0A0A', ink: '#0A0A0A' }
  },
  {
    value: 'citrus', label: 'Citrus', swatch: '#ea580c', dark: false, font: 'Outfit',
    palette: { background: '#FFF5DE', banner: '#FFE2AD', accent: '#EA580C', ink: '#1A1205' }
  },
  {
    value: 'emerald', label: 'Emerald', swatch: '#047857', dark: false, font: 'DM Sans',
    palette: { background: '#E6F5EC', banner: '#C4EBD4', accent: '#047857', ink: '#03140C' }
  },
  {
    value: 'coral', label: 'Coral', swatch: '#e11d48', dark: false, font: 'Sora',
    palette: { background: '#FFF0EC', banner: '#FFD6CC', accent: '#E11D48', ink: '#1F0A0E' }
  },
  {
    value: 'dark', label: 'Dark', swatch: '#6f8bff', dark: true,
    palette: { background: '#010513', banner: '#1E2A4F', accent: '#6F8BFF', ink: '#F8F8F8' }
  },
  {
    value: 'neon', label: 'Neon', swatch: '#a3e635', dark: true, font: 'Space Grotesk',
    palette: { background: '#06070B', banner: '#1B2410', accent: '#A3E635', ink: '#F4F6FA' }
  },
  {
    value: 'aurora', label: 'Aurora', swatch: '#22d3ee', dark: true, font: 'Outfit',
    palette: { background: '#070D1C', banner: '#0E3046', accent: '#22D3EE', ink: '#EAF6FF' }
  },
  {
    value: 'ember', label: 'Ember', swatch: '#fb923c', dark: true, font: 'Sora',
    palette: { background: '#110A07', banner: '#3A1D0E', accent: '#FB923C', ink: '#FFF3EB' }
  }
];
export function isTheme(value: unknown): value is string {
  return typeof value === 'string' && THEMES.some(theme => theme.value === value);
}

const THEME_CLASSES = THEMES.filter(theme => theme.value !== DEFAULT_THEME).map(theme => theme.value);
const DARK_THEME = 'dark';
const DARK_QUERY = '(prefers-color-scheme: dark)';

/** The theme to use when nobody has chosen one: `dark` if the OS prefers it, else `default`. */
export function systemTheme(): string {
  if (typeof window === 'undefined' || !window.matchMedia) return DEFAULT_THEME;
  return window.matchMedia(DARK_QUERY).matches ? DARK_THEME : DEFAULT_THEME;
}

/** Calls `onChange` when the OS light/dark setting flips; returns an unsubscribe function. */
export function watchSystemTheme(onChange: (theme: string) => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const query = window.matchMedia(DARK_QUERY);
  const listener = () => onChange(systemTheme());
  query.addEventListener('change', listener);
  return () => query.removeEventListener('change', listener);
}

/** The Google Fonts stylesheet for one family, in the four weights the components use. */
export function themeFontHref(family: string): string {
  return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, '+')}:wght@400;500;600;700&display=swap`;
}

/** Adds the theme font's stylesheet to `<head>` once; later calls for the same family do nothing. */
function loadThemeFont(family: string): void {
  const id = `st-theme-font-${family.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  if (!document.head || document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = themeFontHref(family);
  document.head.appendChild(link);
}

/**
 * Applies a theme to `<html>`: swaps only the theme classes (other classes on the element are left
 * alone), adds `dark` beside a dark theme's own class, loads the theme's font if it names one, and
 * sets `color-scheme` so native controls and scrollbars match. `null`/`undefined` means "nobody
 * chose", which follows the OS; an unknown value falls back to `default`. Returns the theme
 * actually applied.
 */
export function applyTheme(theme: string | null | undefined): string {
  const resolved = theme === null || theme === undefined ? systemTheme() : isTheme(theme) ? theme : DEFAULT_THEME;
  if (typeof document === 'undefined') return resolved;
  const option = THEMES.find(candidate => candidate.value === resolved);
  const root = document.documentElement;
  root.classList.remove(...THEME_CLASSES);
  if (option?.dark && resolved !== DARK_THEME) root.classList.add(DARK_THEME);
  if (resolved !== DEFAULT_THEME) root.classList.add(resolved);
  if (option?.font) loadThemeFont(option.font);
  root.style.colorScheme = option?.dark ? 'dark' : 'light';
  return resolved;
}
