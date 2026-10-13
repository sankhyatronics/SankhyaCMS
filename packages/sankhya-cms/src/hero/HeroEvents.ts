/** Fired by `st-hero` / `st-promo-banner` when the call-to-action is activated (source: `onAction`). */
export interface HeroActionEventDetail {
  href: string;
  /** Which `st-hero` button was activated; `st-promo-banner` leaves it unset. */
  kind?: 'primary' | 'secondary';
}
