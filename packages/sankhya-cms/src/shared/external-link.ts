import { html, nothing, type TemplateResult } from 'lit';
import { arrowUpRightIcon } from './icons';

/** True for an absolute http(s) URL on another origin: such a link leaves the site. */
export function isExternalHref(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  try {
    return new URL(href).origin !== window.location.origin;
  } catch {
    return true;
  }
}

/** `target` / `rel` for an anchor: a new tab with `noopener` for an external link, nothing otherwise. */
export function externalLinkAttrs(href: string): { target: string | typeof nothing; rel: string | typeof nothing } {
  const external = isExternalHref(href);
  return { target: external ? '_blank' : nothing, rel: external ? 'noopener noreferrer' : nothing };
}

const SR_ONLY =
  'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';

/** The ↗ icon plus "(opens in new tab)" for screen readers, or nothing for an internal link. */
export function externalLinkExtras(href: string): TemplateResult | typeof nothing {
  if (!isExternalHref(href)) return nothing;
  return html`<span aria-hidden="true" style="display:inline-flex;margin-inline-start:6px;vertical-align:middle"
      >${arrowUpRightIcon(14)}</span
    ><span style=${SR_ONLY}> (opens in new tab)</span>`;
}
