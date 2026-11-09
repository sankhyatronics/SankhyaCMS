export interface MegaMenuSelectEventDetail {
  href: string;
}

/**
 * Fired on `st-mega-menu` (bubbles, composed) when the number of grid tracks it lays out changes: the intro
 * column, each link column and the featured column. The `mega` dropdown around it uses this to keep a panel
 * with few columns from stretching to the full width.
 */
export const MEGA_MENU_LAYOUT_EVENT = 'st-mega-menu-layout';

export interface MegaMenuLayoutEventDetail {
  tracks: number;
}
