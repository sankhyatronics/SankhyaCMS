import { svg } from 'lit';
import type { TemplateResult } from 'lit';

export type DecorationName = 'flow' | 'orbit' | 'waves' | 'ribbon';

/** The line art of a card's `decoration` (240 x 160 viewBox, anchored top-right), drawn in `currentColor`. */
export const DECORATIONS: Record<DecorationName, TemplateResult> = {
  flow: svg`
    <path d="M240 8 C 190 20, 150 70, 70 150" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
    <path d="M240 28 C 196 40, 162 84, 100 156" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.25"/>
    <path d="M240 48 C 204 60, 176 98, 130 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
    <path d="M226 0 C 180 10, 130 52, 40 132" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.25"/>
    <path d="M206 0 C 166 8, 112 36, 12 108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
  `,
  orbit: svg`
    <circle cx="240" cy="0" r="36" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
    <circle cx="240" cy="0" r="62" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.25"/>
    <circle cx="240" cy="0" r="90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
    <circle cx="240" cy="0" r="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1" stroke-dasharray="2 6"/>
    <circle cx="204" cy="34" r="3" fill="currentColor" stroke="none"/>
  `,
  waves: svg`
    <path d="M0 30 C 40 6, 80 54, 120 30 S 200 6, 240 30" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
    <path d="M0 48 C 40 24, 80 72, 120 48 S 200 24, 240 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.25"/>
    <path d="M0 66 C 40 42, 80 90, 120 66 S 200 42, 240 66" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
    <path d="M0 84 C 40 60, 80 108, 120 84 S 200 60, 240 84" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
  `,
  ribbon: svg`
    <path d="M250 20 C 170 -10, 120 90, 180 110 S 250 40, 150 20 S 40 70, -10 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
    <path d="M250 50 C 180 20, 140 110, 196 128 S 256 70, 160 52 S 60 100, -10 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1"/>
  `
};
