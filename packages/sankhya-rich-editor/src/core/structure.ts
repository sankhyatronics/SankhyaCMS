import {
  _getDoc,
  _getCurrentEditable,
  _setCurrentEditable,
  pushStandaloneSnapshot,
} from "./state";
import { openImageEditor } from "../dom/imageEditor";
import { setPageFont } from "./pageFont";

/** The toolbar select's value for "use the template's own fonts". */
export const DEFAULT_FONT = "__default__";

/**
 * Document structure: sections (the blocks a user reorders), inserting new blocks, and table
 * rows/columns. A "section" is a direct child of the section container — the body, or the single
 * wrapper element a template puts around its content.
 */

const NON_SECTION = new Set([
  "SCRIPT",
  "STYLE",
  "LINK",
  "META",
  "NOSCRIPT",
  "TEMPLATE",
]);
const ROOT_SELECTOR = "[data-st-re-root]";
/** Elements that count towards "the layout changed" when comparing snapshots (inline formatting does not). */
const LAYOUT_SELECTOR =
  "table,tr,td,th,li,ul,ol,img,hr,p,div,section,article,header,footer,aside,nav,h1,h2,h3,h4,h5,h6,blockquote,pre";
const CELL_STYLE = "border:1px solid #d1d5db;padding:6px 8px;text-align:left";
const BLANK_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

let uidCounter = 0;
function uid(): string {
  uidCounter += 1;
  return `st-re-s${Date.now().toString(36)}${uidCounter}`;
}

function isSection(el: Element): el is HTMLElement {
  return (
    !NON_SECTION.has(el.tagName) &&
    !el.matches(ROOT_SELECTOR) &&
    !el.hasAttribute("data-st-re-script")
  );
}

export function getSections(container: Element): HTMLElement[] {
  return Array.from(container.children).filter(isSection);
}

/** The body, or — when a template wraps everything in one element — that wrapper (repeatedly). */
export function getSectionContainer(doc: Document): HTMLElement {
  let container: HTMLElement = doc.body;
  for (;;) {
    const sections = getSections(container);
    const only = sections.length === 1 ? sections[0] : null;
    if (only && only.tagName !== "TABLE" && getSections(only).length >= 2)
      container = only;
    else return container;
  }
}

/** Gives every section a stable id so undo/redo can tell sections apart. */
export function ensureSectionIds(doc: Document): void {
  getSections(getSectionContainer(doc)).forEach((s) => {
    if (!s.hasAttribute("data-st-re-id")) s.setAttribute("data-st-re-id", uid());
  });
}

/** The section containing `node`, or null. */
export function sectionOf(
  doc: Document,
  node: Node | null,
): HTMLElement | null {
  const container = getSectionContainer(doc);
  let cur: Node | null = node;
  while (cur && cur.parentNode !== container) cur = cur.parentNode;
  return cur && cur.nodeType === Node.ELEMENT_NODE && isSection(cur as Element)
    ? (cur as HTMLElement)
    : null;
}

function currentSection(doc: Document): HTMLElement | null {
  return sectionOf(
    doc,
    _getCurrentEditable() ?? doc.getSelection()?.anchorNode ?? null,
  );
}

/** Moves `section` by one position (-1 up, +1 down). Returns whether it moved. */
export function moveSection(section: HTMLElement, delta: -1 | 1): boolean {
  const siblings = getSections(section.parentElement!);
  const target = siblings[siblings.indexOf(section) + delta];
  if (!target) return false;
  if (delta < 0) target.before(section);
  else target.after(section);
  return true;
}

/** Places `section` before or after `ref`. Returns whether the order changed. */
export function placeSection(
  section: HTMLElement,
  ref: HTMLElement,
  before: boolean,
): boolean {
  if (section === ref) return false;
  if (before ? ref.previousElementSibling === section : ref.nextElementSibling === section)
    return false;
  if (before) ref.before(section);
  else ref.after(section);
  return true;
}

/* ---- insert ---- */

function insertSectionNode(doc: Document, node: HTMLElement): void {
  node.setAttribute("data-st-re-id", uid());
  const after = currentSection(doc);
  if (after) after.after(node);
  else getSectionContainer(doc).append(node);
}

export function createTextSection(doc: Document): HTMLElement {
  const div = doc.createElement("div");
  const p = doc.createElement("p");
  p.textContent = "New section. Click here to edit.";
  div.append(p);
  return div;
}

function createCell(doc: Document, tag: "th" | "td"): HTMLTableCellElement {
  const cell = doc.createElement(tag);
  cell.setAttribute("style", CELL_STYLE);
  cell.textContent = tag === "th" ? "Heading" : "Text";
  return cell;
}

export function createTable(doc: Document, rows = 3, cols = 3): HTMLElement {
  const table = doc.createElement("table");
  table.setAttribute("style", "width:100%;border-collapse:collapse");
  for (let r = 0; r < rows; r++) {
    const tr = doc.createElement("tr");
    for (let c = 0; c < cols; c++) tr.append(createCell(doc, r === 0 ? "th" : "td"));
    table.append(tr);
  }
  return table;
}

function insertImage(doc: Document): void {
  if (doc.querySelector(".st-re-img-modal-overlay")) return;
  const div = doc.createElement("div");
  const img = doc.createElement("img");
  img.alt = "";
  img.setAttribute("style", "max-width:100%");
  img.src = BLANK_GIF;
  div.append(img);
  insertSectionNode(doc, div);
  // The section only stays once an image was chosen; choosing one takes the undo snapshot.
  openImageEditor(doc, img, (applied) => {
    if (!applied) div.remove();
  });
}

/* ---- tables ---- */

function currentCell(doc: Document): HTMLTableCellElement | null {
  const start: Node | null =
    _getCurrentEditable() ?? doc.getSelection()?.anchorNode ?? null;
  const el =
    start && start.nodeType === Node.ELEMENT_NODE
      ? (start as Element)
      : (start?.parentElement ?? null);
  return (el?.closest("td,th") as HTMLTableCellElement | null) ?? null;
}

/** Adds a row below the cell's row (below the header row, as a body row, when that is a header). */
export function addRow(cell: HTMLTableCellElement): void {
  const row = cell.parentElement as HTMLTableRowElement;
  const doc = row.ownerDocument;
  const tr = doc.createElement("tr");
  Array.from(row.cells).forEach((c) => {
    const td = createCell(doc, "td");
    const style = c.getAttribute("style");
    if (style) td.setAttribute("style", style);
    tr.append(td);
  });
  const isHeader = Array.from(row.cells).every((c) => c.tagName === "TH");
  const table = row.closest("table")!;
  if (isHeader && row.parentElement?.tagName === "THEAD" && table.tBodies[0])
    table.tBodies[0].prepend(tr);
  else row.after(tr);
}

export function addColumn(cell: HTMLTableCellElement): void {
  const index = cell.cellIndex;
  const doc = cell.ownerDocument;
  Array.from(cell.closest("table")!.rows).forEach((row) => {
    const ref = row.cells[index];
    if (!ref) return;
    const c = createCell(doc, ref.tagName === "TH" ? "th" : "td");
    const style = ref.getAttribute("style");
    if (style) c.setAttribute("style", style);
    ref.after(c);
  });
}

/** Deletes the cell's row; the last row takes the table with it. */
export function deleteRow(cell: HTMLTableCellElement): void {
  const row = cell.parentElement as HTMLTableRowElement;
  const table = row.closest("table")!;
  if (table.rows.length <= 1) table.remove();
  else row.remove();
}

/** Deletes the cell's column; the last column takes the table with it. */
export function deleteColumn(cell: HTMLTableCellElement): void {
  const index = cell.cellIndex;
  const table = cell.closest("table")!;
  if ((table.rows[0]?.cells.length ?? 0) <= 1) table.remove();
  else Array.from(table.rows).forEach((row) => row.cells[index]?.remove());
}

/* ---- background ---- */

const BLOCK_SELECTOR =
  "td,th,li,p,h1,h2,h3,h4,h5,h6,blockquote,pre,div,section,article,header,footer,aside,nav,table";

/** The block that "fill" applies to: the nearest block around the element being edited, else its section. */
export function backgroundTarget(doc: Document): HTMLElement | null {
  const start = _getCurrentEditable() ?? currentSection(doc);
  return (start?.closest(BLOCK_SELECTOR) as HTMLElement | null) ?? currentSection(doc);
}

/** Sets (or, with null/empty, removes) an element's background. Print keeps it (`print-color-adjust`). */
export function setBackground(el: HTMLElement, color: string | null): void {
  const props = ["print-color-adjust", "-webkit-print-color-adjust"];
  if (color) {
    el.style.backgroundColor = color;
    props.forEach((p) => el.style.setProperty(p, "exact"));
    return;
  }
  el.style.removeProperty("background-color");
  props.forEach((p) => el.style.removeProperty(p));
  if (!el.getAttribute("style")?.trim()) el.removeAttribute("style");
}

/** `#rrggbb` for an inline `rgb()`/hex colour, else null. */
export function toHex(color: string | null | undefined): string | null {
  const v = (color ?? "").trim();
  if (/^#[0-9a-f]{6}$/i.test(v)) return v.toLowerCase();
  const m = v.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  return m ? "#" + [m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, "0")).join("") : null;
}

/** The inline background of the fill target, for the toolbar's colour input. */
export function currentBackground(doc: Document): string | null {
  return toHex(backgroundTarget(doc)?.style.backgroundColor);
}

/* ---- commands ---- */

export const STRUCTURE_COMMANDS = [
  "insertSection",
  "insertTable",
  "insertImage",
  "tableAddRow",
  "tableAddColumn",
  "tableDeleteRow",
  "tableDeleteColumn",
  "blockBackground",
  "pageFont",
] as const;

/** Runs a structure command; returns false when `command` is not one. */
export function handleStructureCommand(command: string, value?: string): boolean {
  if (!(STRUCTURE_COMMANDS as readonly string[]).includes(command)) return false;
  const doc = _getDoc();
  if (!doc) return true;
  if (command === "insertImage") {
    insertImage(doc);
    return true;
  }
  if (command === "pageFont") setPageFont(doc, value && value !== DEFAULT_FONT ? value : null);
  else if (command === "blockBackground") {
    const target = backgroundTarget(doc);
    if (!target) return true;
    setBackground(target, value || null);
  } else if (command === "insertSection") insertSectionNode(doc, createTextSection(doc));
  else if (command === "insertTable") insertSectionNode(doc, createTable(doc));
  else {
    const cell = currentCell(doc);
    if (!cell) return true;
    if (command === "tableAddRow") addRow(cell);
    else if (command === "tableAddColumn") addColumn(cell);
    else if (command === "tableDeleteRow") deleteRow(cell);
    else deleteColumn(cell);
  }
  pushStandaloneSnapshot();
  return true;
}

/** Whether the caret is in a table cell (enables the table buttons). */
export function isInTableCell(doc: Document): boolean {
  return currentCell(doc) !== null;
}

/* ---- undo/redo of structural changes ---- */

function signature(body: Element): string {
  return getSections(body)
    .map(
      (s) =>
        `${s.getAttribute("data-st-re-id") ?? s.tagName}:${s.querySelectorAll(LAYOUT_SELECTOR).length}`,
    )
    .join(",");
}

/**
 * When a snapshot differs from the page in structure (sections moved/added/removed, rows or columns
 * changed), replaces the page content with it and returns true. Text-only differences return false so
 * the caller can restore them in place.
 */
export function restoreStructure(
  doc: Document,
  snapshotBody: Element,
): boolean {
  if (signature(doc.body) === signature(snapshotBody)) return false;
  Array.from(doc.body.children).forEach((child) => {
    if (!child.matches(ROOT_SELECTOR)) child.remove();
  });
  Array.from(snapshotBody.children).forEach((child) =>
    doc.body.append(doc.importNode(child, true)),
  );
  _setCurrentEditable(null);
  return true;
}
