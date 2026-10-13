/** Fired by `st-testimonials` when a card's story link or the section link is activated. */
export interface TestimonialsLinkEventDetail {
  href: string;
}

declare global {
  interface HTMLElementEventMap {
    'testimonials-link': CustomEvent<TestimonialsLinkEventDetail>;
  }
}
