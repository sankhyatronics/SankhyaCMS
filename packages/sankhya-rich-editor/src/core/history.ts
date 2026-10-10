import {
  _getDoc,
  _getUndoStack,
  _getRedoStack,
  _setUndoStack,
  _setRedoStack,
} from "./state";

import { restoreStructure } from "./structure";
import { restorePageFont } from "./pageFont";
import { sanitizeHtml } from "../utils/sanitize";
import { injectStyles } from "../dom/styles";

export function handleUndo() {
  try {
    const doc = _getDoc();
    if (!doc) {
      console.warn(
        "[sankhya-rich-editor] handleUndo called before initialization",
      );
      return;
    }
    if (_getUndoStack().length < 2) return;
    const undoStack = _getUndoStack();
    const redoStack = _getRedoStack();
    const current = undoStack.pop()!;
    redoStack.push(current);
    const prev = undoStack[undoStack.length - 1];
    if (!doc.documentElement) {
      throw new Error("Document is missing documentElement");
    }
    // Sanitize the snapshot and extract only the body content so we
    // avoid overwriting head/link/style nodes that may contain page
    // or editor styles. Replacing only `document.body` preserves those
    // nodes while still restoring user content.
    const safe = sanitizeHtml(prev.replace(/^<!doctype html>\n?/i, ""), doc);
    try {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(safe, "text/html");
      if (parsed && parsed.body && doc.body) {
        restorePageFont(doc, prev);
        // Prefer selective restoration: if the snapshot contains elements
        // marked with `data-st-re-id`, restore only those elements so we do
        // not clobber page-level UI (headers, tabs, carousel scripts).
        const parsedEls = parsed.body.querySelectorAll("[data-st-re-id]");
        if (restoreStructure(doc, parsed.body)) {
          /* sections/rows changed: page content replaced from the snapshot */
        } else if (parsedEls && parsedEls.length) {
          const loadPromises: Promise<void>[] = [];
          parsedEls.forEach((pe) => {
            const id = pe.getAttribute("data-st-re-id");
            if (!id) return;
            const local = doc.body.querySelector(`[data-st-re-id="${id}"]`);
            if (!local) return;
            // Copy non-identifying attributes from parsed element to local
            try {
              Array.from(local.attributes).forEach((a) => {
                if (a.name !== "data-st-re-id") local.removeAttribute(a.name);
              });
              Array.from(pe.attributes).forEach((a) => {
                if (a.name !== "data-st-re-id")
                  local.setAttribute(a.name, a.value);
              });
            } catch {
              /* ignore attribute copy errors */
            }
            // Replace innerHTML of the editable region only
            try {
              local.innerHTML = pe.innerHTML;
            } catch {
              /* ignore innerHTML set errors */
            }
            // Recreate preserved script placeholders inside the parsed element
            try {
              const placeholders = pe.querySelectorAll("[data-st-re-script]");
              placeholders.forEach((ph) => {
                const encoded = ph.getAttribute("data-st-re-script") || "";
                let code = "";
                try {
                  code =
                    typeof atob !== "undefined"
                      ? decodeURIComponent(escape(atob(encoded)))
                      : decodeURIComponent(encoded);
                } catch {
                  try {
                    code = decodeURIComponent(encoded);
                  } catch (er) {
                    code = "";
                  }
                }
                const attrsRaw = ph.getAttribute("data-st-re-script-attrs");
                let attrs: Record<string, string> = {};
                if (attrsRaw) {
                  try {
                    attrs = JSON.parse(decodeURIComponent(attrsRaw));
                  } catch {
                    attrs = {};
                  }
                }
                const parentId = ph.getAttribute("data-st-re-script-parent");
                try {
                  const s = doc.createElement("script");
                  try {
                    s.type = "text/javascript";
                    (s as any).async = false;
                  } catch {
                    /* ignore */
                  }
                  Object.keys(attrs).forEach((k) =>
                    s.setAttribute(k, attrs[k]),
                  );
                  if (attrs.src) {
                    const p = new Promise<void>((resolve) => {
                      s.addEventListener("load", () => resolve());
                      s.addEventListener("error", () => resolve());
                    });
                    loadPromises.push(p);
                    s.src = attrs.src;
                  } else {
                    s.textContent = code;
                  }
                  if (parentId === "head") {
                    doc.head.appendChild(s);
                  } else {
                    const target = doc.body.querySelector(
                      `[data-st-re-id="${parentId}"]`,
                    );
                    if (target) target.appendChild(s);
                    else doc.body.appendChild(s);
                  }
                } catch {
                  /* ignore script injection errors */
                }
              });
            } catch {
              /* ignore placeholder processing errors */
            }
          });
          try {
            if (loadPromises.length) {
              const waiter = (Promise as any).allSettled
                ? (Promise as any).allSettled(loadPromises)
                : Promise.all(
                    loadPromises.map((p) => p.catch(() => undefined)),
                  );
              waiter.then(() => {
                try {
                  doc.dispatchEvent(new Event("st-re:scripts-restored"));
                } catch {
                  /* ignore */
                }
              });
            } else {
              try {
                doc.dispatchEvent(new Event("st-re:scripts-restored"));
              } catch {
                /* ignore */
              }
            }
          } catch {
            /* ignore */
          }
        } else {
          // No markers present — fallback to previous behavior of replacing
          // the body contents. This preserves backward compatibility.
          doc.body.innerHTML = parsed.body.innerHTML;
        }
      } else {
        // Fallback to replacing the whole documentElement if body is missing
        doc.documentElement.innerHTML = safe;
      }
    } catch {
      // On any parse error, fall back to previous behavior
      doc.documentElement.innerHTML = safe;
    }

    // Re-inject editor styles (toolbar/style) and notify listeners so the
    // toolbar is restored and selectionchange handlers run.
    injectStyles(doc);
    try {
      doc.dispatchEvent(new Event("selectionchange"));
    } catch {
      /* ignore dispatch errors */
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[sankhya-rich-editor] Undo failed:", message);
  }
}

export function handleRedo() {
  try {
    const doc = _getDoc();
    if (!doc) {
      console.warn(
        "[sankhya-rich-editor] handleRedo called before initialization",
      );
      return;
    }
    if (!_getRedoStack().length) return;
    const undoStack = _getUndoStack();
    const redoStack = _getRedoStack();
    const next = redoStack.pop()!;
    undoStack.push(next);
    if (!doc.documentElement) {
      throw new Error("Document is missing documentElement");
    }
    const safeNext = sanitizeHtml(
      next.replace(/^<!doctype html>\n?/i, ""),
      doc,
    );
    try {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(safeNext, "text/html");
      if (parsed && parsed.body && doc.body) {
        restorePageFont(doc, next);
        const parsedEls = parsed.body.querySelectorAll("[data-st-re-id]");
        if (restoreStructure(doc, parsed.body)) {
          /* sections/rows changed: page content replaced from the snapshot */
        } else if (parsedEls && parsedEls.length) {
          const loadPromises: Promise<void>[] = [];
          parsedEls.forEach((pe) => {
            const id = pe.getAttribute("data-st-re-id");
            if (!id) return;
            const local = doc.body.querySelector(`[data-st-re-id="${id}"]`);
            if (!local) return;
            try {
              Array.from(local.attributes).forEach((a) => {
                if (a.name !== "data-st-re-id") local.removeAttribute(a.name);
              });
              Array.from(pe.attributes).forEach((a) => {
                if (a.name !== "data-st-re-id")
                  local.setAttribute(a.name, a.value);
              });
            } catch {
              /* ignore */
            }
            try {
              local.innerHTML = pe.innerHTML;
            } catch {
              /* ignore */
            }
            try {
              const placeholders = pe.querySelectorAll("[data-st-re-script]");
              placeholders.forEach((ph) => {
                const encoded = ph.getAttribute("data-st-re-script") || "";
                let code = "";
                try {
                  code =
                    typeof atob !== "undefined"
                      ? decodeURIComponent(escape(atob(encoded)))
                      : decodeURIComponent(encoded);
                } catch {
                  try {
                    code = decodeURIComponent(encoded);
                  } catch (er) {
                    code = "";
                  }
                }
                const attrsRaw = ph.getAttribute("data-st-re-script-attrs");
                let attrs: Record<string, string> = {};
                if (attrsRaw) {
                  try {
                    attrs = JSON.parse(decodeURIComponent(attrsRaw));
                  } catch {
                    attrs = {};
                  }
                }
                const parentId = ph.getAttribute("data-st-re-script-parent");
                try {
                  const s = doc.createElement("script");
                  try {
                    s.type = "text/javascript";
                    (s as any).async = false;
                  } catch {
                    /* ignore */
                  }
                  Object.keys(attrs).forEach((k) =>
                    s.setAttribute(k, attrs[k]),
                  );
                  if (attrs.src) {
                    const p = new Promise<void>((resolve) => {
                      s.addEventListener("load", () => resolve());
                      s.addEventListener("error", () => resolve());
                    });
                    loadPromises.push(p);
                    s.src = attrs.src;
                  } else {
                    s.textContent = code;
                  }
                  if (parentId === "head") {
                    doc.head.appendChild(s);
                  } else {
                    const target = doc.body.querySelector(
                      `[data-st-re-id="${parentId}"]`,
                    );
                    if (target) target.appendChild(s);
                    else doc.body.appendChild(s);
                  }
                } catch {
                  /* ignore script injection errors */
                }
              });
            } catch {
              /* ignore placeholder processing errors */
            }
          });
          try {
            if (loadPromises.length) {
              const waiter = (Promise as any).allSettled
                ? (Promise as any).allSettled(loadPromises)
                : Promise.all(
                    loadPromises.map((p) => p.catch(() => undefined)),
                  );
              waiter.then(() => {
                try {
                  doc.dispatchEvent(new Event("st-re:scripts-restored"));
                } catch {
                  /* ignore */
                }
              });
            } else {
              try {
                doc.dispatchEvent(new Event("st-re:scripts-restored"));
              } catch {
                /* ignore */
              }
            }
          } catch {
            /* ignore */
          }
        } else {
          doc.body.innerHTML = parsed.body.innerHTML;
        }
      } else {
        doc.documentElement.innerHTML = safeNext;
      }
    } catch {
      doc.documentElement.innerHTML = safeNext;
    }

    // Re-inject styles and notify listeners so toolbar/styles are restored
    injectStyles(doc);
    try {
      doc.dispatchEvent(new Event("selectionchange"));
    } catch {
      /* ignore dispatch errors */
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[sankhya-rich-editor] Redo failed:", message);
  }
}
