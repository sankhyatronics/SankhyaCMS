import { describe, it, beforeEach, expect } from "vitest";
import { _setDoc, _setUndoStack, _setRedoStack } from "../../core/state";
import { handleRedo } from "../../core/history";

describe("history redo script restoration", () => {
  let mockDoc: Document;
  beforeEach(() => {
    _setDoc(null);
    _setUndoStack([]);
    _setRedoStack([]);
    mockDoc = document.implementation.createHTMLDocument();
  });

  it("restores a script placeholder via redo and appends script to parent", async () => {
    _setDoc(mockDoc);

    const local = mockDoc.createElement("div");
    local.setAttribute("data-st-re-id", "r1");
    mockDoc.body.appendChild(local);

    const code = "window.__R = 7;";
    const encoded = encodeURIComponent(code);
    const attrs = encodeURIComponent(JSON.stringify({}));

    const next = `<!doctype html>\n<html><body><div data-st-re-id="r1"> <span data-st-re-script data-st-re-script-parent="r1" data-st-re-script="${encoded}" data-st-re-script-attrs="${attrs}"></span></div></body></html>`;
    const other = "<!doctype html>\n<html><body><div>other</div></body></html>";

    _setUndoStack([other]);
    _setRedoStack([next]);

    let restored = false;
    mockDoc.addEventListener("st-re:scripts-restored", () => (restored = true));

    handleRedo();

    const script = mockDoc.querySelector('[data-st-re-id="r1"] script');
    expect(script).not.toBeNull();
    expect(restored).toBe(true);
  });
});
