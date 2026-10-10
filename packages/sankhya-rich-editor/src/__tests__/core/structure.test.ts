import { describe, it, expect, beforeEach } from "vitest";
import { initRichEditor, getCleanHTML } from "../../core/editor";
import { handleUndo, handleRedo } from "../../core/history";
import { handleToolbarCommand } from "../../core/formatActions";
import { _setDoc, _setUndoStack, _setRedoStack, _setCurrentEditable, pushStandaloneSnapshot } from "../../core/state";
import {
  addColumn,
  addRow,
  createTable,
  deleteColumn,
  deleteRow,
  getSectionContainer,
  getSections,
  moveSection,
  placeSection,
} from "../../core/structure";

function setup(bodyHtml: string) {
  _setDoc(null);
  _setUndoStack([]);
  _setRedoStack([]);
  _setCurrentEditable(null);
  const doc = document.implementation.createHTMLDocument("t");
  doc.body.innerHTML = bodyHtml;
  const iframe = document.createElement("iframe");
  Object.defineProperty(iframe, "contentDocument", { value: doc });
  initRichEditor(iframe);
  return doc;
}

const order = (doc: Document) =>
  getSections(getSectionContainer(doc)).map((s) => s.textContent!.trim());

const PAGE = "<div><p>A</p></div><div><p>B</p></div><table><tr><td>C</td></tr></table>";

describe("sections", () => {
  it("moves a section up and down and stops at the ends", () => {
    const doc = setup(PAGE);
    const [a, , c] = getSections(getSectionContainer(doc));
    expect(moveSection(a, -1)).toBe(false);
    expect(moveSection(a, 1)).toBe(true);
    expect(order(doc)).toEqual(["B", "A", "C"]);
    expect(moveSection(c, 1)).toBe(false);
  });

  it("places a section before/after another (drag and drop)", () => {
    const doc = setup(PAGE);
    const [a, , c] = getSections(getSectionContainer(doc));
    expect(placeSection(c, a, true)).toBe(true);
    expect(order(doc)).toEqual(["C", "A", "B"]);
    expect(placeSection(c, a, true)).toBe(false); // already there
  });

  it("treats the single wrapper a template uses as the container", () => {
    const doc = setup('<div class="page"><div>A</div><div>B</div></div>');
    expect(getSectionContainer(doc).className).toBe("page");
    expect(order(doc)).toEqual(["A", "B"]);
  });

  it("keeps the editor root out of sections and out of the saved HTML", () => {
    const doc = setup(PAGE);
    expect(getSections(doc.body).some((s) => s.hasAttribute("data-st-re-root"))).toBe(false);
    const html = getCleanHTML();
    expect(html).not.toContain("st-re-");
    expect(html).not.toContain("toolbar");
  });

  it("undo and redo restore the section order", () => {
    const doc = setup(PAGE);
    placeSection(getSections(getSectionContainer(doc))[2], getSections(getSectionContainer(doc))[0], true);
    pushStandaloneSnapshot(); // what the controls do after a move
    expect(order(doc)).toEqual(["C", "A", "B"]);
    handleUndo();
    expect(order(doc)).toEqual(["A", "B", "C"]);
    handleRedo();
    expect(order(doc)).toEqual(["C", "A", "B"]);
  });

  it("undo reverts an inserted section", () => {
    const doc = setup(PAGE);
    handleToolbarCommand("insertSection");
    expect(order(doc)).toHaveLength(4);
    handleUndo();
    expect(order(doc)).toEqual(["A", "B", "C"]);
  });
});

describe("insert commands", () => {
  it("inserts a section after the current one, else at the end", () => {
    const doc = setup(PAGE);
    handleToolbarCommand("insertSection");
    expect(order(doc)[3]).toMatch(/New section/);
    _setCurrentEditable(getSections(getSectionContainer(doc))[0].querySelector("p"));
    handleToolbarCommand("insertTable");
    expect(getSections(getSectionContainer(doc))[1].tagName).toBe("TABLE");
  });

  it("opens the image dialog and drops the section if no image is chosen", () => {
    const doc = setup(PAGE);
    const before = getSections(getSectionContainer(doc)).length;
    handleToolbarCommand("insertImage");
    expect(doc.querySelector(".st-re-img-modal-overlay")).not.toBeNull();
    expect(getSections(getSectionContainer(doc)).length).toBe(before + 1);
    (doc.querySelector(".st-re-img-actions button") as HTMLButtonElement).click(); // Cancel
    expect(getSections(getSectionContainer(doc)).length).toBe(before);
  });
});

describe("table editing", () => {
  const cells = (t: HTMLElement) => Array.from((t as HTMLTableElement).rows).map((r) => r.cells.length);

  it("adds and deletes rows and columns", () => {
    const doc = setup("<p>x</p>");
    const table = createTable(doc, 3, 3);
    const cell = (table as HTMLTableElement).rows[1].cells[1];
    addRow(cell);
    expect(cells(table)).toEqual([3, 3, 3, 3]);
    addColumn(cell);
    expect(cells(table)).toEqual([4, 4, 4, 4]);
    deleteRow(cell);
    expect(cells(table)).toEqual([4, 4, 4]);
    deleteColumn((table as HTMLTableElement).rows[0].cells[0]);
    expect(cells(table)).toEqual([3, 3, 3]);
  });

  it("adding below a header row creates a body row of td", () => {
    const doc = setup("<p>x</p>");
    const table = createTable(doc, 1, 2) as HTMLTableElement;
    addRow(table.rows[0].cells[0]);
    expect(table.rows[1].cells[0].tagName).toBe("TD");
  });

  it("removes the table with its last row or column", () => {
    const doc = setup("<p>x</p>");
    const host = doc.body;
    const t1 = createTable(doc, 1, 2);
    host.append(t1);
    deleteRow((t1 as HTMLTableElement).rows[0].cells[0]);
    expect(t1.isConnected).toBe(false);
    const t2 = createTable(doc, 2, 1);
    host.append(t2);
    deleteColumn((t2 as HTMLTableElement).rows[0].cells[0]);
    expect(t2.isConnected).toBe(false);
  });
});
