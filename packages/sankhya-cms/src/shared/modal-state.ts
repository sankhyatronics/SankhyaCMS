/**
 * Page-wide "a modal is open" signal. While any modal (st-quote-dialog) is open, `<html>` carries
 * `data-st-modal-open`, so other fixed UI such as st-cookie-consent can step aside.
 */
export const MODAL_OPEN_ATTRIBUTE = 'data-st-modal-open';

const openModals = new Set<object>();

/** Marks `owner` as open or closed; the attribute stays while at least one owner is open. */
export function setModalOpen(owner: object, open: boolean): void {
  if (open) openModals.add(owner);
  else openModals.delete(owner);
  const root = document.documentElement;
  if (openModals.size > 0) root.setAttribute(MODAL_OPEN_ATTRIBUTE, '');
  else root.removeAttribute(MODAL_OPEN_ATTRIBUTE);
}
