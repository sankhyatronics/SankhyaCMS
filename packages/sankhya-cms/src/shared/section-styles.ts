import { css } from 'lit';

/**
 * CSS fragments shared by the CMS section components (hero, features, stats, ...), replacing the
 * source React library's global `Common.css` classes (`.section-title`, `.theme-inverted`, ...)
 * so each Lit component composes them into its own shadow root instead of re-declaring them.
 */

/** Section heading + subheading typography. Use on `.title` / `.subtitle` selectors. */
export const sectionTitleStyles = css`
  font-size: var(--st-cms-text-4xl);
  font-weight: var(--st-font-weight-bold);
  color: var(--st-color-text-strong);
  margin: 0 0 var(--st-space-16);
  line-height: 1.2;
`;

export const sectionSubtitleStyles = css`
  font-size: var(--st-cms-text-lg);
  color: var(--st-color-text-muted);
  line-height: 1.6;
  margin: 0 0 var(--st-space-28);
`;

/** Card heading + body typography. */
export const cardTitleStyles = css`
  font-size: var(--st-text-2xl);
  font-weight: var(--st-font-weight-semibold);
  color: var(--st-color-text-strong);
  margin: 0 0 var(--st-space-8);
`;

export const cardDescriptionStyles = css`
  font-size: var(--st-text-md);
  color: var(--st-color-text-muted);
  line-height: 1.5;
`;

/** Outlined call-to-action link/button used by hero, promo banner, features, ... */
export const ctaLinkStyles = css`
  display: inline-block;
  padding: 12px 24px;
  border-radius: var(--st-radius-sm);
  font: inherit;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;
`;

/** Maps the source's `padding` prop (none|small|medium|large) to `:host([padding=...])` rules. */
export const paddingScaleStyles = css`
  :host([padding='small']) { padding: var(--st-space-16); }
  :host([padding='medium']) { padding: var(--st-space-24); }
  :host([padding='large']) { padding: var(--st-space-32); }
`;

/** Centered title/subtitle block above a section's content. Use on a `.header` wrapper. */
export const sectionHeaderStyles = css`
  text-align: center;
  margin-bottom: var(--st-space-48);
`;

/** Rounded icon tile (holds an `<iconify-icon>`) used by bento cards, feature lists, ... */
export const iconTileStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: var(--st-radius-lg);
  background: var(--st-color-subtle);
  color: var(--st-color-text-muted);
`;

/** Collapses CSS transitions/animations for users who prefer reduced motion. */
export const reducedMotionStyles = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`;

/** Light-on-dark title/subtitle for an `inverted` section host. Place inside the host's `static styles`. */
export const invertedSectionTextStyles = css`
  :host([inverted]) .title {
    color: var(--st-color-on-solid);
  }

  :host([inverted]) .subtitle {
    color: var(--st-color-border);
  }
`;
