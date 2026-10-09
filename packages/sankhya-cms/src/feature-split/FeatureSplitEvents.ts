export interface FeatureSplitActionEventDetail {
  href: string;
}

declare global {
  interface HTMLElementEventMap {
    'feature-split-action': CustomEvent<FeatureSplitActionEventDetail>;
  }
}
