import { pushStandaloneSnapshot, _getCurrentEditable, _setCurrentEditable } from "../core/state";
import {
  ensureSectionIds,
  getSectionContainer,
  getSections,
  moveSection,
  placeSection,
  sectionOf,
} from "../core/structure";
import { getEditorRoot } from "./root";

/**
 * Hover controls for reordering the document's sections with the mouse: a bar over the hovered
 * section with a drag handle, move up / down and delete, plus a blue drop line while dragging.
 * The bar and line live in the editor root, so they never reach the saved HTML.
 */
export function attachSectionControls(doc: Document) {
  const root = getEditorRoot(doc);
  const bar = doc.createElement("div");
  bar.className = "st-re-section-bar";
  bar.hidden = true;
  const line = doc.createElement("div");
  line.className = "st-re-drop-line";
  line.hidden = true;
  root.append(bar, line);

  let active: HTMLElement | null = null;
  let dragging: HTMLElement | null = null;
  let drop: { ref: HTMLElement; before: boolean } | null = null;

  const button = (label: string, title: string, onClick: () => void) => {
    const b = doc.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.title = title;
    b.setAttribute("aria-label", title);
    b.addEventListener("mousedown", (e) => e.preventDefault());
    b.addEventListener("click", onClick);
    return b;
  };

  const commit = () => {
    pushStandaloneSnapshot();
    show(active);
  };

  const handle = doc.createElement("span");
  handle.className = "st-re-drag-handle";
  handle.textContent = "⠿";
  handle.title = "Drag to move this section";
  handle.draggable = true;

  bar.append(
    handle,
    button("▲", "Move section up", () => active && moveSection(active, -1) && commit()),
    button("▼", "Move section down", () => active && moveSection(active, 1) && commit()),
    button("✕", "Delete section", () => {
      if (!active) return;
      if (_getCurrentEditable() && active.contains(_getCurrentEditable())) _setCurrentEditable(null);
      active.remove();
      active = null;
      bar.hidden = true;
      pushStandaloneSnapshot();
    }),
  );

  function show(section: HTMLElement | null) {
    active = section;
    if (!section || !section.isConnected) {
      bar.hidden = true;
      return;
    }
    const win = doc.defaultView!;
    const rect = section.getBoundingClientRect();
    bar.hidden = false;
    bar.style.top = `${rect.top + win.scrollY + 4}px`;
    bar.style.left = `${Math.max(4, rect.right + win.scrollX - bar.offsetWidth - 4)}px`;
    section.classList.add("st-re-section-hover");
  }

  function clearHover() {
    doc.querySelectorAll(".st-re-section-hover").forEach((el) => el.classList.remove("st-re-section-hover"));
  }

  doc.addEventListener("mouseover", (e) => {
    if (dragging) return;
    const target = e.target as Node;
    if (bar.contains(target)) return;
    const section = sectionOf(doc, target);
    if (section === active && !bar.hidden) return;
    clearHover();
    if (section) ensureSectionIds(doc);
    show(section);
  });
  doc.addEventListener("mouseleave", () => {
    if (dragging) return;
    clearHover();
    bar.hidden = true;
  });

  /* ---- drag and drop ---- */

  handle.addEventListener("dragstart", (e) => {
    if (!active) return e.preventDefault();
    dragging = active;
    e.dataTransfer?.setData("text/plain", "st-re-section");
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setDragImage(active, 0, 0);
    }
    active.classList.add("st-re-section-dragging");
  });

  doc.addEventListener("dragover", (e) => {
    if (!dragging) return;
    const container = getSectionContainer(doc);
    const sections = getSections(container);
    const over = sectionOf(doc, e.target as Node) ?? sections[sections.length - 1];
    if (!over) return;
    e.preventDefault();
    const rect = over.getBoundingClientRect();
    const before = e.clientY < rect.top + rect.height / 2;
    drop = { ref: over, before };
    const win = doc.defaultView!;
    line.hidden = false;
    line.style.top = `${(before ? rect.top : rect.bottom) + win.scrollY - 1}px`;
    line.style.left = `${rect.left + win.scrollX}px`;
    line.style.width = `${rect.width}px`;
  });

  doc.addEventListener("drop", (e) => {
    if (!dragging || !drop) return;
    e.preventDefault();
    if (placeSection(dragging, drop.ref, drop.before)) pushStandaloneSnapshot();
  });

  doc.addEventListener("dragend", () => {
    dragging?.classList.remove("st-re-section-dragging");
    dragging = null;
    drop = null;
    line.hidden = true;
    clearHover();
    bar.hidden = true;
  });
}
