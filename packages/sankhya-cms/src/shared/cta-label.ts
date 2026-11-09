import { css, html, nothing, type TemplateResult } from 'lit';

/** Phones narrower than this show the short CTA label. */
export const SHORT_LABEL_MAX_WIDTH = 479;

/** Styles for the long/short label pair; include them in any component that uses `renderCtaLabel`. */
export const ctaLabelStyles = css`
  .label-short {
    display: none;
  }

  @media (max-width: ${SHORT_LABEL_MAX_WIDTH}px) {
    .label-short {
      display: inline;
    }

    .label-long:has(+ .label-short) {
      display: none;
    }
  }
`;

/**
 * The text of a CTA. With a `short` label, both are rendered and CSS shows the short one on phones
 * (< 480px), so the button fits on one line. The link then needs `ariaLabel` (the full wording).
 */
export function renderCtaLabel(label: string, short: string): TemplateResult | string {
  if (!short || short === label) return label;
  return html`<span class="label-long">${label}</span><span class="label-short" aria-hidden="true">${short}</span>`;
}

/** `aria-label` that keeps the full wording while the short label is visible; `nothing` otherwise. */
export function ctaAriaLabel(label: string, short: string, suffix = ''): string | typeof nothing {
  return short && short !== label ? `${label}${suffix}` : nothing;
}
