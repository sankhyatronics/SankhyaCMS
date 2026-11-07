import { LitElement, css, html, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'iconify-icon';

import { buttonResetStyles, controlBaseStyles, ctaPillStyles, rootFontFamilyStyles } from '../shared/styles';
import { ctaLinkStyles, paddingScaleStyles } from '../shared/section-styles';
import { splitTitleHighlight } from '../shared/title-highlight';
import { ctaAriaLabel, ctaLabelStyles, renderCtaLabel } from '../shared/cta-label';
import { externalLinkAttrs, externalLinkExtras, isExternalHref } from '../shared/external-link';
import type { HeroActionEventDetail } from './HeroEvents';

const HIGHLIGHT_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const ARROW_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
/* A small padlock, not a tick: the note under the buttons must not read as a fourth highlight. */
const CTA_NOTE_ICON = svg`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`;

/** A dark card on the corner of the split-layout image: an icon tile, a title and an optional line. */
export interface HeroMediaBadge {
  title: string;
  text?: string;
  /** Iconify icon name, e.g. `mdi:shield-check`. */
  icon?: string;
}

/** A small screenshot card on the bottom-right corner of the split-layout image. */
export interface HeroMediaInset {
  src: string;
  alt: string;
  /** Optional bar above the screenshot inside the card. */
  label?: string;
}

/**
 * Full-width hero banner: background image with a darkening overlay, optional eyebrow, title,
 * optional subtitle and up to two call-to-action links. The entrance animation is CSS keyframes
 * (skipped under `prefers-reduced-motion`).
 *
 * `size`, `content-position` and `overlay="gradient"` give the large editorial layout (copy on the
 * lower left over a gradient that darkens towards it) used by enterprise marketing heroes; the
 * defaults keep the original centered banner. Put several heroes in an `st-carousel` with
 * `indicator-style="tabs"` for a tabbed hero carousel.
 *
 * `badge` is a pill above the title; `highlights` is a row of check-marked points under the buttons.
 * `cta-note` is a short line with a small padlock under the buttons (e.g. "No credit card needed"), left-aligned
 * with the buttons, or centred in a centred layout.
 * `button-style="pill"` gives the buttons the 52px pill look (primary navy, secondary white with an arrow).
 * `layout="split"` swaps the background for a two-column layout: copy on one side, `image-src` as an
 * `<img>` (alt from `image-alt`) on the other, on normal page colours with no overlay. In the split
 * layout the copy sits in the page's container (`--st-cms-container-max`) with the same side gutter
 * as the other sections.
 *
 * In the split layout, `image-label` adds a window-style bar with that text above the image, and
 * `media-inset` (`{ src, alt, label? }`) puts a small screenshot card on the image's bottom-right corner.
 * `media-inset` replaces `media-badge` when both are set, so only one card shows.
 *
 * A CTA with an `href` is a real link (`<a href>`), so external URLs, `#anchors` and `/path?x=y`
 * work without JavaScript. Its `action` event is cancelable: call `preventDefault()` on it to stop
 * the browser following the link (a router does this to navigate client-side). A CTA without an
 * `href` is a `<button>`.
 *
 * @fires action - Cancelable, before following the link. Detail `{ href, kind }`, `kind` being `primary` or `secondary`.
 * @cssprop --st-hero-text-color - Text colour over the image.
 * @cssprop --st-hero-min-height - Minimum height when `size` is `large` (default `640px`).
 * @cssprop --st-hero-offset-top - Extra space above the content, e.g. the height of a fixed header (default `0`).
 * @cssprop --st-hero-cta-note-color - Colour of the `cta-note` line (default `var(--st-color-text-muted)`).
 * @csspart eyebrow - The small label above the title.
 * @csspart badge - The pill above the title.
 * @csspart highlights - The row of check-marked points.
 * @csspart cta-note - The small line with a padlock under the buttons (`cta-note`).
 * @csspart image - The image in `layout="split"`.
 * @csspart action - The primary call-to-action (`<a>` with an `href`, `<button>` without).
 * @csspart secondary-action - The outlined second call-to-action.
 * @csspart title-highlight - The part of the title picked by `title-highlight`.
 * @csspart media-badge - The dark card on the corner of the split-layout image.
 * @csspart image-bar - The window-style bar above the split-layout image (`image-label`).
 * @csspart media-inset - The screenshot card on the image's bottom-right corner (`media-inset`).
 * @cssprop --st-cms-brand-azure - Colour of the title highlight.
 */
@customElement('st-hero')
export class Hero extends LitElement {
  static styles = css`
    ${ctaLabelStyles}
    ${controlBaseStyles}
    ${paddingScaleStyles}

    @keyframes st-hero-zoom {
      from { opacity: 0; transform: scale(1.1); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes st-hero-rise {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: none; }
    }
    @keyframes st-hero-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      width: 100%;
      box-sizing: border-box;
      background-color: var(--st-color-text-strong);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: var(--st-hero-position, center center);
      color: var(--st-color-on-solid);
      /* Room for a fixed header over the top of the hero (see --st-hero-offset-top). */
      padding-top: var(--st-hero-offset-top, 0px);
      ${rootFontFamilyStyles}
      animation: st-hero-zoom 1.5s ease-out;
    }

    :host([inverted]) {
      background-color: var(--st-color-surface);
      color: var(--st-color-text-strong);
    }

    .overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(
        to bottom,
        color-mix(in oklch, var(--st-color-text-strong) 40%, transparent),
        color-mix(in oklch, var(--st-color-text-strong) 20%, transparent),
        color-mix(in oklch, var(--st-color-text-strong) 40%, transparent)
      );
    }

    :host([inverted]) .overlay {
      display: none;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-20);
      position: relative;
      z-index: 2;
      width: 80%;
      margin: 0 auto;
      text-align: center;
      align-items: center;
      /* Set here, not only on :host: text sits on the image/overlay, so a colour class the page puts
         on the host (e.g. a theme text colour) must not turn it dark. */
      color: var(--st-hero-text-color, var(--st-color-on-solid));
    }

    :host([inverted]) .content {
      color: var(--st-hero-text-color, var(--st-color-text-strong));
    }

    :host([text-alignment='left']) .content { text-align: left; align-items: flex-start; }
    :host([text-alignment='right']) .content { text-align: right; align-items: flex-end; }
    :host([text-alignment='justify']) .content { text-align: justify; align-items: stretch; }

    .title {
      font-size: var(--st-cms-text-display);
      font-weight: var(--st-font-weight-bold);
      line-height: 1.1;
      color: inherit;
      margin: 0;
      animation: st-hero-rise 0.8s 0.3s ease-out backwards;
    }

    .subtitle {
      font-size: var(--st-cms-text-xl);
      line-height: 1.5;
      color: inherit;
      margin: 0;
      animation: st-hero-fade 0.8s 0.5s ease-out backwards;
    }

    .actions {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .cta {
      ${buttonResetStyles}
      ${ctaLinkStyles}
      background: var(--st-button-primary-bg);
      color: var(--st-button-primary-color);
      font-weight: var(--st-button-font-weight);
      font-size: var(--st-text-md);
      animation: st-hero-rise 0.6s 0.7s ease-out backwards;
    }

    .cta:hover {
      transform: scale(1.05);
    }

    .cta:active {
      transform: scale(0.98);
    }

    .eyebrow {
      margin: 0;
      font-size: var(--st-text-sm);
      font-weight: var(--st-font-weight-bold);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: inherit;
      opacity: 0.85;
      animation: st-hero-fade 0.8s 0.2s ease-out backwards;
    }

    .actions {
      flex-wrap: wrap;
      gap: var(--st-space-12);
    }

    .cta.secondary {
      background: transparent;
      color: inherit;
      box-shadow: inset 0 0 0 1.5px currentColor;
    }

    .cta.secondary:hover {
      background: color-mix(in oklch, currentColor 12%, transparent);
    }

    /* size="large" / "full": a tall editorial hero. */
    :host([size='large']) {
      min-height: var(--st-hero-min-height, 640px);
    }

    :host([size='full']) {
      min-height: 100svh;
    }

    :host([size='large']) .title,
    :host([size='full']) .title {
      font-size: clamp(2.5rem, 6vw, 5rem);
      letter-spacing: -0.02em;
      line-height: 1.05;
    }

    /* content-position="bottom": copy sits in the lower part of the hero, on the container grid. */
    :host([content-position='bottom']) {
      align-items: flex-end;
    }

    :host([content-position='bottom']) .content {
      width: 100%;
      max-width: var(--st-cms-container-max);
      box-sizing: border-box;
      padding: var(--st-space-48) var(--st-space-24);
    }

    :host([content-position='bottom']) .title,
    :host([content-position='bottom']) .subtitle {
      max-width: 18ch;
    }

    :host([content-position='bottom']) .subtitle {
      max-width: 48ch;
    }

    :host([content-position='bottom']:not([text-alignment='center']):not([text-alignment='right'])) .actions {
      justify-content: flex-start;
    }

    :host([content-position='bottom'][text-alignment='center']) .title,
    :host([content-position='bottom'][text-alignment='center']) .subtitle {
      margin-inline: auto;
    }

    /* overlay="gradient": darkest behind the copy, clearing towards the far side of the image. */
    :host([overlay='gradient']) .overlay {
      background:
        linear-gradient(to top, color-mix(in oklch, var(--st-color-text-strong) 85%, transparent), transparent 70%),
        linear-gradient(to right, color-mix(in oklch, var(--st-color-text-strong) 70%, transparent), transparent 75%);
    }

    :host([overlay='gradient'][text-alignment='right']) .overlay {
      background:
        linear-gradient(to top, color-mix(in oklch, var(--st-color-text-strong) 85%, transparent), transparent 70%),
        linear-gradient(to left, color-mix(in oklch, var(--st-color-text-strong) 70%, transparent), transparent 75%);
    }

    :host([overlay='none']) .overlay {
      display: none;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--st-space-8);
      margin: 0;
      padding: 6px 14px;
      border: 1px solid var(--st-color-border);
      border-radius: var(--st-radius-full);
      background: var(--st-color-surface);
      color: var(--st-color-text-strong);
      font-size: var(--st-text-sm);
      font-weight: var(--st-font-weight-bold);
      letter-spacing: var(--st-tracking-wider);
      line-height: 1.2;
      text-transform: uppercase;
      animation: st-hero-fade 0.8s 0.2s ease-out backwards;
    }

    .badge::before {
      content: '';
      flex: none;
      width: 8px;
      height: 8px;
      border-radius: var(--st-radius-circle);
      background: var(--st-cms-highlight);
    }

    .highlights {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--st-space-12) var(--st-space-24);
      margin: 0;
      padding: 0;
      list-style: none;
      animation: st-hero-fade 0.8s 0.9s ease-out backwards;
    }

    .highlight {
      display: inline-flex;
      align-items: center;
      gap: var(--st-space-8);
      font-size: var(--st-text-md);
      font-weight: var(--st-font-weight-semibold);
      color: inherit;
    }

    .highlight svg {
      flex: none;
      width: 18px;
      height: 18px;
      color: var(--st-cms-highlight);
    }

    :host([text-alignment='left']) .highlights {
      justify-content: flex-start;
    }

    :host([text-alignment='right']) .highlights {
      justify-content: flex-end;
    }

    /* The buttons and the cta-note share one column, so the note sits under the buttons and follows their alignment. */
    .cta-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    :host([text-alignment='left']) .cta-group,
    :host([text-alignment='justify']) .cta-group {
      align-items: flex-start;
    }

    .cta-note {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin: 8px 0 0;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;
      color: var(--st-hero-cta-note-color, var(--st-color-text-muted));
      animation: st-hero-fade 0.8s 0.8s ease-out backwards;
    }

    .cta-note svg,
    .cta-note iconify-icon {
      flex: none;
      width: 14px;
      height: 14px;
      font-size: 14px;
    }

    /* layout="split": a two-column block on the page surface; the image replaces the background. */
    /* The side gutter matches the other CMS sections (--st-space-24, 16px on phones). Once the
       viewport is wider than the container, the padding takes the rest of the space so the copy
       and image fill the same centred --st-cms-container-max column as st-features-section and
       friends; the background stays edge to edge. */
    :host([layout='split']) {
      --st-hero-gutter: var(--st-space-24);
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr));
      align-items: center;
      gap: var(--st-space-48);
      overflow: visible;
      padding: calc(var(--st-cms-section-padding) + var(--st-hero-offset-top, 0px))
        max(var(--st-hero-gutter), calc((100% - var(--st-cms-container-max)) / 2)) !important;
      background-color: var(--st-color-surface);
      background-image: none;
      color: var(--st-color-text-strong);
      animation: none;
    }

    :host([layout='split']) .overlay {
      display: none;
    }

    :host([layout='split']) .content {
      width: 100%;
      margin: 0;
      padding: 0;
      max-width: 560px;
      color: var(--st-hero-text-color, var(--st-color-text-strong));
    }

    :host([layout='split'][text-alignment='left']) .actions {
      justify-content: flex-start;
    }

    :host([layout='split']) .highlight svg {
      color: var(--st-color-accent);
    }

    .media {
      margin: 0;
      min-width: 0;
      position: relative;
    }

    /* title-highlight: the picked words in the brand azure (large display text, so AA large applies). */
    .title-highlight {
      color: var(--st-cms-brand-azure);
    }

    /* mediaBadge: a navy card overlapping the bottom-left corner of the split-layout image. */
    .media-badge {
      position: absolute;
      left: -28px;
      bottom: -28px;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 12px;
      box-sizing: border-box;
      max-width: 260px;
      padding: 14px 16px;
      border-radius: 12px;
      background: var(--st-cms-navy);
      color: var(--st-cms-primary-100);
      box-shadow: 0 20px 25px -5px #0000001a, 0 10px 10px -5px #0000000a;
    }

    .media-badge-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--st-cms-highlight);
      color: var(--st-cms-navy);
      font-size: 20px;
    }

    .media-badge-title {
      margin: 0;
      font-size: 14px;
      font-weight: var(--st-font-weight-bold);
      line-height: 1.3;
      color: var(--st-cms-on-dark);
    }

    .media-badge-text {
      margin: 2px 0 0;
      font-size: 13px;
      line-height: 1.4;
      color: inherit;
    }

    /* imageLabel: a window-style bar above the split-layout image. It sits outside the image box, so
       the image keeps its 4:3 frame; the image's top corners are squared to meet the bar. */
    .image-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-bottom: 1px solid var(--st-cms-primary-100, #e4ebff);
      border-radius: var(--st-radius-lg) var(--st-radius-lg) 0 0;
      background: var(--st-hero-image-bar-bg, #fafbff);
    }

    .image-bar-dot {
      flex: none;
      width: 10px;
      height: 10px;
      border-radius: 9999px;
      background: var(--st-cms-primary-200, #c9d7fe);
    }

    .image-bar-label {
      margin-left: 8px;
      font-size: 12px;
      font-weight: 600;
      color: var(--st-cms-text, #03346b);
    }

    .image.has-bar {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    /* mediaInset: the media column reserves 36px below the image so the card hangs off the corner.
       The card is a sibling of the image, not inside it, so nothing clips it. */
    .media.has-inset {
      padding-bottom: 36px;
    }

    .media-inset {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 1;
      box-sizing: border-box;
      width: 46%;
      overflow: hidden;
      border: 1px solid var(--st-cms-primary-200, #c9d7fe);
      border-radius: 12px;
      background: var(--st-color-surface, #fff);
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);
    }

    .media-inset-label {
      padding: 6px 10px;
      font-size: 11px;
      font-weight: 600;
      color: var(--st-cms-text, #03346b);
      background: var(--st-cms-surface-soft, #f0f3ff);
      border-bottom: 1px solid var(--st-cms-primary-100, #e4ebff);
    }

    .media-inset img {
      display: block;
      width: 100%;
      height: auto;
    }

    /* buttonStyle="pill": 52px pills. The primary is brand navy with a soft shadow; the secondary is
       white with a light primary-200 border, navy text and a trailing arrow. */
    :host([button-style='pill']) .cta {
      ${ctaPillStyles}
      font-size: 17px;
      transition: transform 0.2s ease, background-color 0.2s ease;
    }

    :host([button-style='pill']) .cta:not(.secondary) {
      background: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
      box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d;
    }

    :host([button-style='pill']) .cta:not(.secondary):hover {
      background: color-mix(in oklch, var(--st-cms-brand-navy) 88%, var(--st-cms-navy));
    }

    :host([button-style='pill']) .cta.secondary {
      padding: 0 24px;
      background: var(--st-cms-on-dark);
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
      border: 1px solid var(--st-cms-primary-200);
      box-shadow: none;
    }

    :host([button-style='pill']) .cta.secondary:hover {
      background: var(--st-cms-primary-100);
    }

    :host([button-style='pill']) .cta svg {
      flex: none;
      width: 18px;
      height: 18px;
    }

    :host([button-style='pill']) .cta:focus-visible {
      outline: var(--st-focus-ring);
      outline-offset: 2px;
    }

    /* Wide screens: the badge hangs off the bottom-left corner. Its top sits 16px above the image's
       bottom edge (--st-hero-badge-overlap), so it overlaps only that corner and clears the button
       inside the image. The
       figure's bottom padding gives the hanging card room; the badge's top is measured from the
       image bottom (100% includes that padding, so it is subtracted). */
    @media (min-width: 769px) {
      .media {
        --st-hero-media-pad: 48px;
        padding-bottom: var(--st-hero-media-pad);
      }

      .media-badge {
        top: calc(100% - var(--st-hero-media-pad) - var(--st-hero-badge-overlap, 16px));
        bottom: auto;
      }
    }

    /* Narrow screens: the badge flows under the image instead of overlapping it. */
    @media (max-width: 768px) {
      .media-badge {
        position: static;
        margin-top: var(--st-space-16);
        max-width: none;
      }
    }

    .image {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      border-radius: var(--st-radius-lg);
      box-shadow: 0 24px 48px -16px var(--st-shadow-color-lg);
    }

    @media (max-width: 768px) {
      :host([layout='split']) {
        --st-hero-gutter: var(--st-space-16);
      }
    }

    @media (min-width: 768px) {
      .content { padding: var(--st-space-32); }
    }
    @media (min-width: 1024px) {
      .content { padding: var(--st-space-48); }
      :host([content-position='bottom']) .content { padding: var(--st-space-48) var(--st-space-32) 6rem; }
    }

    /* A carousel's first slide is on screen at first paint, so its entrance stays off (st-carousel sets
       data-st-still until the slides first change). Later slides animate in when they turn. */
    :host([data-st-still]),
    :host([data-st-still]) .eyebrow,
    :host([data-st-still]) .badge,
    :host([data-st-still]) .title,
    :host([data-st-still]) .subtitle,
    :host([data-st-still]) .cta,
    :host([data-st-still]) .cta-note,
    :host([data-st-still]) .highlights {
      animation: none;
    }

    @media (prefers-reduced-motion: reduce) {
      :host, .eyebrow, .badge, .title, .subtitle, .cta, .cta-note, .highlights { animation: none; }
      .cta { transition: none; }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String, attribute: 'image-src' })
  imageSrc = '';

  @property({ type: String, attribute: 'action-label' })
  actionLabel = '';

  /** Shorter `action-label` for phones (< 480px), so the button fits on one line. The full label
   * stays the link's accessible name. */
  @property({ type: String, attribute: 'action-label-short' })
  actionLabelShort = '';

  @property({ type: String })
  href = '';

  @property({ type: String, reflect: true, attribute: 'text-alignment' })
  textAlignment: 'left' | 'center' | 'right' | 'justify' = 'left';

  @property({ type: String, reflect: true })
  padding: 'none' | 'small' | 'medium' | 'large' = 'none';

  @property({ type: Boolean, reflect: true })
  inverted = false;

  @property({ type: String, attribute: 'focal-point' })
  focalPoint: 'top' | 'left' | 'right' | 'bottom' | 'center' = 'center';

  /** Small uppercase label above the title (e.g. an event or product name). */
  @property({ type: String })
  eyebrow = '';

  /** Label of an outlined second button next to the primary one. */
  @property({ type: String, attribute: 'secondary-action-label' })
  secondaryActionLabel = '';

  /** Shorter `secondary-action-label` for phones (< 480px). */
  @property({ type: String, attribute: 'secondary-action-label-short' })
  secondaryActionLabelShort = '';

  @property({ type: String, attribute: 'secondary-href' })
  secondaryHref = '';

  /** Small pill above the title (e.g. "New", "Now available"). */
  @property({ type: String })
  badge = '';

  /** Check-marked points shown in a row under the buttons. */
  @property({ attribute: false })
  highlights: string[] = [];

  /** Short line with a small check under the buttons (e.g. "No credit card needed"). Empty hides it. */
  @property({ type: String, attribute: 'cta-note' })
  ctaNote = '';

  /** Iconify icon for the `cta-note` line (e.g. `mdi:open-source-initiative`). Empty keeps the padlock. */
  @property({ type: String, attribute: 'cta-note-icon' })
  ctaNoteIcon = '';

  /** `background` (default) puts `image-src` behind the copy; `split` puts copy and image side by side. */
  @property({ type: String, reflect: true })
  layout: 'background' | 'split' = 'background';

  /** Alt text of the image in `layout="split"`. Empty marks it as decorative. */
  @property({ type: String, attribute: 'image-alt' })
  imageAlt = '';

  /** `auto` sizes to the content; `large` is a tall editorial hero (`--st-hero-min-height`); `full` fills the viewport. */
  @property({ type: String, reflect: true })
  size: 'auto' | 'large' | 'full' = 'auto';

  /** `center` keeps the copy in the middle; `bottom` puts it in the lower part of the hero, on the page container. */
  @property({ type: String, reflect: true, attribute: 'content-position' })
  contentPosition: 'center' | 'bottom' = 'center';

  /** `even` darkens the whole image; `gradient` darkens behind the copy only; `none` shows the image as is. */
  @property({ type: String, reflect: true })
  overlay: 'even' | 'gradient' | 'none' = 'even';

  /** Text of `title` to set in the brand azure. Only the first occurrence is highlighted. */
  @property({ type: String, attribute: 'title-highlight' })
  titleHighlight = '';

  /** A dark card on the corner of the image, with an optional icon. Shown with `layout="split"` and an `image-src`. */
  @property({ attribute: false })
  mediaBadge?: HeroMediaBadge;

  /** Label of a window-style bar (three dots, then the text) above the split-layout image. Shown with `layout="split"` and an `image-src`. */
  @property({ type: String, attribute: 'image-label' })
  imageLabel = '';

  /** A small screenshot card on the bottom-right corner of the split-layout image. Replaces `mediaBadge` when both are set. */
  @property({ attribute: false })
  mediaInset?: HeroMediaInset;

  /** `default` keeps the plain buttons. `pill` gives the buttons the 52px pill style (the secondary one with an arrow). */
  @property({ type: String, reflect: true, attribute: 'button-style' })
  buttonStyle: 'default' | 'pill' = 'default';

  /** Level of the title heading: `1` (default) for a page's main hero, `2` for a hero that is not the
   * page heading (e.g. the slides of a hero carousel, where the page has its own `<h1>`). */
  @property({ type: Number, attribute: 'heading-level' })
  headingLevel: 1 | 2 = 1;

  private static positions = {
    top: 'center top',
    left: 'left center',
    right: 'right center',
    bottom: 'center bottom',
    center: 'center center'
  } as const;

  /**
   * A hero that is already inside the first screen when it connects is on screen at first paint, so its
   * entrance animation (rise, fades, image zoom) would only delay the copy: it renders still. A hero
   * further down the page keeps its entrance. A carousel slide is handled by `st-carousel` instead.
   */
  connectedCallback(): void {
    super.connectedCallback();
    if (this.closest('st-carousel')) return;
    if (this.getBoundingClientRect().top < window.innerHeight) this.setAttribute('data-st-still', '');
  }

  protected willUpdate(): void {
    const asBackground = this.layout !== 'split';
    this.style.backgroundImage = asBackground && this.imageSrc ? `url(${JSON.stringify(this.imageSrc)})` : '';
    this.style.setProperty('--st-hero-position', Hero.positions[this.focalPoint] ?? Hero.positions.center);
  }

  private emitAction(event: MouseEvent, href: string, kind: 'primary' | 'secondary'): void {
    const action = new CustomEvent<HeroActionEventDetail>('action', {
      detail: { href, kind },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(action);
    if (action.defaultPrevented) event.preventDefault();
  }

  private renderCta(label: string, href: string, kind: 'primary' | 'secondary') {
    const secondary = kind === 'secondary';
    const className = secondary ? 'cta secondary' : 'cta';
    const part = secondary ? 'secondary-action' : 'action';
    const onClick = (event: MouseEvent) => this.emitAction(event, href, kind);
    const arrow = secondary && this.buttonStyle === 'pill' ? ARROW_ICON : nothing;
    const { target, rel } = externalLinkAttrs(href);
    const external = isExternalHref(href);
    const short = secondary ? this.secondaryActionLabelShort : this.actionLabelShort;
    const text = renderCtaLabel(label, short);
    const ariaLabel = ctaAriaLabel(label, short, external ? ' (opens in new tab)' : '');
    return href
      ? html`<a class=${className} part=${part} href=${href} target=${target} rel=${rel} aria-label=${ariaLabel} @click=${onClick}
          >${text}${external ? externalLinkExtras(href) : arrow}</a
        >`
      : html`<button class=${className} part=${part} type="button" aria-label=${ariaLabel} @click=${onClick}>${text}${arrow}</button>`;
  }

  /** The title with the `title-highlight` text wrapped in its own span; plain text otherwise. */
  private renderTitle() {
    const parts = splitTitleHighlight(this.title, this.titleHighlight);
    if (!parts) return this.title;
    return html`${parts.before}<span class="title-highlight" part="title-highlight">${parts.match}</span>${parts.after}`;
  }

  private renderMediaBadge() {
    const badge = this.mediaBadge;
    if (!badge?.title) return nothing;
    return html`<div class="media-badge" part="media-badge">
      ${badge.icon ? html`<span class="media-badge-icon" aria-hidden="true"><iconify-icon icon=${badge.icon}></iconify-icon></span>` : nothing}
      <div>
        <p class="media-badge-title">${badge.title}</p>
        ${badge.text ? html`<p class="media-badge-text">${badge.text}</p>` : nothing}
      </div>
    </div>`;
  }

  private renderImageBar() {
    if (!this.imageLabel) return nothing;
    return html`<div class="image-bar" part="image-bar">
      <span class="image-bar-dot" aria-hidden="true"></span>
      <span class="image-bar-dot" aria-hidden="true"></span>
      <span class="image-bar-dot" aria-hidden="true"></span>
      <span class="image-bar-label">${this.imageLabel}</span>
    </div>`;
  }

  private renderMediaInset(inset: HeroMediaInset) {
    return html`<div class="media-inset" part="media-inset">
      ${inset.label ? html`<div class="media-inset-label">${inset.label}</div>` : nothing}
      <img src=${inset.src} alt=${inset.alt} />
    </div>`;
  }

  render() {
    const inset = this.mediaInset?.src ? this.mediaInset : undefined;
    return html`
      <div class="overlay" part="overlay"></div>
      <div class="content" part="content">
        ${this.eyebrow ? html`<p class="eyebrow" part="eyebrow">${this.eyebrow}</p>` : nothing}
        ${this.badge ? html`<p class="badge" part="badge">${this.badge}</p>` : nothing}
        ${this.headingLevel === 2
          ? html`<h2 class="title" part="title">${this.renderTitle()}</h2>`
          : html`<h1 class="title" part="title">${this.renderTitle()}</h1>`}
        ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
        ${this.actionLabel || this.secondaryActionLabel || this.ctaNote
          ? html`<div class="cta-group">
              ${this.actionLabel || this.secondaryActionLabel
                ? html`<div class="actions" part="actions">
                    ${this.actionLabel ? this.renderCta(this.actionLabel, this.href, 'primary') : nothing}
                    ${this.secondaryActionLabel ? this.renderCta(this.secondaryActionLabel, this.secondaryHref, 'secondary') : nothing}
                  </div>`
                : nothing}
              ${this.ctaNote
                ? html`<p class="cta-note" part="cta-note">${this.ctaNoteIcon
                    ? html`<iconify-icon icon=${this.ctaNoteIcon} aria-hidden="true"></iconify-icon>`
                    : CTA_NOTE_ICON}<span>${this.ctaNote}</span></p>`
                : nothing}
            </div>`
          : nothing}
        ${this.highlights.length
          ? html`<ul class="highlights" part="highlights">
              ${this.highlights.map(
                (text) => html`<li class="highlight" part="highlight">${HIGHLIGHT_ICON}<span>${text}</span></li>`
              )}
            </ul>`
          : nothing}
        <slot></slot>
      </div>
      ${this.layout === 'split' && this.imageSrc
        ? html`<figure class=${inset ? 'media has-inset' : 'media'} part="media">
            ${this.renderImageBar()}
            <img class=${this.imageLabel ? 'image has-bar' : 'image'} part="image" src=${this.imageSrc} alt=${this.imageAlt} />
            ${inset ? this.renderMediaInset(inset) : this.renderMediaBadge()}
          </figure>`
        : nothing}
    `;
  }
}
