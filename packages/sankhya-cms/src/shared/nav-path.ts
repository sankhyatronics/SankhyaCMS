/**
 * Decides whether a nav link points at the page being shown. Used by `st-header` (and the nav items
 * it marks) to set `current` / `aria-current="page"`.
 */

const EXTERNAL = /^([a-z][a-z0-9+.-]*:|\/\/)/i;

/**
 * The pathname an `href` points at, normalised for comparison: a relative `t-pilot` becomes
 * `/t-pilot`, the query and hash are dropped, and trailing slashes are removed (`/` stays `/`).
 * Returns `''` for anything that is not a path on this site: external URLs, `#hash`-only and
 * `?query`-only links, or an empty value.
 */
export function normalisePath(value: string | undefined): string {
  if (!value || EXTERNAL.test(value)) return '';
  const pathname = value.split(/[?#]/, 1)[0].replace(/^\.\//, '');
  if (!pathname) return '';
  const absolute = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const trimmed = absolute.replace(/\/+$/, '');
  return trimmed || '/';
}

/**
 * True when `href` is the page at `currentPath`. `/` matches only `/`. Any other `href` matches the
 * same path and everything beneath it (`/products` is current on `/products/pricing`).
 */
export function isCurrentPath(href: string | undefined, currentPath: string | undefined): boolean {
  const target = normalisePath(href);
  if (!target) return false;
  const current = normalisePath(currentPath) || '/';
  if (target === '/') return current === '/';
  return current === target || current.startsWith(`${target}/`);
}

/** The links an element carries that can be the current page: `href`, plus `ctaHref` on a mega column. */
export interface NavLinkLike {
  href?: string;
  ctaHref?: string;
}

/**
 * Whether any of `root`'s descendant nav items (`selector`) links to `currentPath`. Items inside an
 * element matching `ignoreWithin` (e.g. a mega menu's intro/featured shortcuts) don't count.
 */
export function hasCurrentLink(root: Element, selector: string, currentPath: string, ignoreWithin?: string): boolean {
  return Array.from(root.querySelectorAll<HTMLElement & NavLinkLike>(selector)).some((el) => {
    if (ignoreWithin) {
      const skip = el.closest(ignoreWithin);
      if (skip && root.contains(skip)) return false;
    }
    return isCurrentPath(el.href, currentPath) || isCurrentPath(el.ctaHref, currentPath);
  });
}
