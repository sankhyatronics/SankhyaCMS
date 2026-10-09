import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { controlBaseStyles, cardShellStyles, fontFamilyStyles } from '../shared/styles';

/**
 * A surfaced container — content goes in the default slot. Ports `SankhyaUI`'s React `Card`
 * (`variant`, `padding`, `elevation`, `hoverable`, `inverted`); `onClick` is just a native `click`
 * listener on the element. `padding` takes `none | small | medium | large` (the source's
 * `sm|md|lg`, spelled like `paddingScaleStyles`); `elevation` takes `none | sm | md | lg`.
 */
@customElement('st-card')
export class Card extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      ${fontFamilyStyles}
      ${cardShellStyles}
      border-radius: var(--st-radius-lg);
      overflow: hidden;
      position: relative;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease,
        border-color 0.3s ease;
    }

    :host([variant='bordered']) {
      border-color: var(--st-color-border-strong);
    }

    :host([elevation='sm']) {
      box-shadow: 0 1px 2px var(--st-shadow-color-sm);
    }

    :host([elevation='md']) {
      box-shadow: 0 4px 6px -1px var(--st-shadow-color-md);
    }

    :host([elevation='lg']) {
      box-shadow: 0 10px 15px -3px var(--st-shadow-color-lg);
    }

    :host([hoverable]:hover) {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px var(--st-shadow-color-xl);
      border-color: var(--st-color-border-strong);
    }

    :host([inverted]) {
      background: var(--st-color-text-strong);
      color: var(--st-color-on-solid);
      border-color: var(--st-color-text-strong);
    }

    .body {
      padding: var(--st-space-24);
    }

    :host([padding='none']) .body {
      padding: 0;
    }

    :host([padding='small']) .body {
      padding: var(--st-space-16);
    }

    :host([padding='large']) .body {
      padding: var(--st-space-32);
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none;
      }

      :host([hoverable]:hover) {
        transform: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'default' | 'bordered' = 'default';

  @property({ type: String, reflect: true })
  padding: 'none' | 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  elevation: 'none' | 'sm' | 'md' | 'lg' = 'sm';

  @property({ type: Boolean, reflect: true })
  hoverable = false;

  @property({ type: Boolean, reflect: true })
  inverted = false;

  render() {
    return html`<div class="body" part="body"><slot></slot></div>`;
  }
}
