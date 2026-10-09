export interface AccordionToggleEventDetail {
  id: string;
  open: boolean;
}

declare global {
  interface HTMLElementEventMap {
    'accordion-toggle': CustomEvent<AccordionToggleEventDetail>;
  }
}
