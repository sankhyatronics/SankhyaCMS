/** Fired by `st-hero` / `st-promo-banner` when the call-to-action is activated (source: `onAction`). */
export interface HeroActionEventDetail {
  href: string;
  /** Which button was activated. Unset for a primary button; `st-promo-banner` sets `secondary` on its second button. */
  kind?: 'primary' | 'secondary';
}
