/**
 * Check if an element can be edited
 *
 * Valid elements: Text container tags (p, div, section, etc.)
 * Invalid elements: HTML structure tags, inputs, scripts, styles
 *
 * @param el - Element to check
 * @returns True if element is a valid editable candidate
 */
export function isEditableCandidate(el: HTMLElement | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  const DISALLOWED = [
    "HTML",
    "HEAD",
    "BODY",
    "SCRIPT",
    "STYLE",
    "LINK",
    "META",
    "NOSCRIPT",
  ];
  if (DISALLOWED.includes(tag)) return false;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return false;
  return true;
}

const STRUCTURAL = new Set(["TABLE", "THEAD", "TBODY", "TFOOT", "TR", "COLGROUP", "COL", "UL", "OL"]);
const BLOCK = new Set([
  "DIV", "P", "TABLE", "UL", "OL", "SECTION", "ARTICLE", "HEADER", "FOOTER", "ASIDE", "NAV",
  "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE", "PRE", "FIGURE",
]);

/**
 * The element a click/hover should edit: the clicked element when it is a text container, or `null`
 * for layout (tables, rows, lists, and containers that hold other blocks). Without this, clicking the
 * gap in a table or a flex row would make the whole structure editable instead of the cell or text.
 */
export function resolveEditTarget(el: HTMLElement | null): HTMLElement | null {
  if (!isEditableCandidate(el) || !el) return null;
  if (STRUCTURAL.has(el.tagName)) return null;
  if (Array.from(el.children).some((child) => BLOCK.has(child.tagName))) return null;
  return el;
}
