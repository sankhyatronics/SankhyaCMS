export interface CarouselChangeEventDetail {
  index: number;
}

declare global {
  interface HTMLElementEventMap {
    'carousel-change': CustomEvent<CarouselChangeEventDetail>;
  }
}
