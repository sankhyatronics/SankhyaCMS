/**
 * One font for the whole page. It is a `<style data-page-font="...">` in the document head — so it is
 * saved with the HTML and found again when the saved document is reopened — that overrides the
 * template's own font rules (`!important`) for everything except the editor's own UI.
 *
 * Undo/redo only restore the body, so each snapshot carries the font in a leading comment (read back
 * from the snapshot string: a parsed document would put a leading comment outside the body).
 */
const MARKER = "data-page-font";
const COMMENT = "st-re-font:";
/** Font-family lists only: names, commas, quotes, spaces and hyphens. */
const SAFE_FONT = /^[\w\s,'"-]+$/;

function styleElement(doc: Document): HTMLStyleElement | null {
  return doc.head?.querySelector<HTMLStyleElement>(`style[${MARKER}]`) ?? null;
}

export function getPageFont(doc: Document): string | null {
  return styleElement(doc)?.getAttribute(MARKER) ?? null;
}

/** Sets the page font, or removes it (back to the template's own fonts) with null/empty. */
export function setPageFont(doc: Document, font: string | null): void {
  const existing = styleElement(doc);
  if (!font || !SAFE_FONT.test(font)) {
    existing?.remove();
    return;
  }
  const style = existing ?? doc.createElement("style");
  style.setAttribute(MARKER, font);
  const scope = "body > :not([data-st-re-root])";
  style.textContent = `${scope}, ${scope} * { font-family: ${font} !important; }`;
  if (!existing) doc.head.append(style);
}

/** The comment a snapshot carries so undo/redo can bring the font back. */
export function pageFontComment(doc: Document): Comment | null {
  const font = getPageFont(doc);
  return font ? doc.createComment(COMMENT + encodeURIComponent(font)) : null;
}

/** Applies the font recorded in a snapshot (none recorded = no page font). */
export function restorePageFont(doc: Document, snapshot: string): void {
  const match = snapshot.match(new RegExp(`<!--${COMMENT}([^>]*?)-->`));
  setPageFont(doc, match ? decodeURIComponent(match[1]) : null);
}
