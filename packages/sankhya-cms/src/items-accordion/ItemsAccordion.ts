import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import 'iconify-icon';

import { buttonResetStyles, controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import {
  reducedMotionStyles,
  sectionHeaderStyles,
  sectionSubtitleStyles,
  sectionTitleStyles,
} from '../shared/section-styles';
import type { AccordionToggleEventDetail } from './ItemsAccordionEvents';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

/** A vertical list of collapsible title/content rows; one open at a time unless `allow-multiple`. */
@customElement('st-items-accordion')
export class ItemsAccordion extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      padding: var(--st-cms-section-padding) var(--st-space-24);
      background: var(--st-color-page);
      ${fontFamilyStyles}
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      ${sectionHeaderStyles}
    }

    .title {
      ${sectionTitleStyles}
      font-size: var(--st-text-2xl);
      margin-bottom: var(--st-space-12);
    }

    .subtitle {
      ${sectionSubtitleStyles}
      font-size: var(--st-text-base);
      margin: 0;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-16);
    }

    .item {
      border: 1px solid var(--st-color-border);
      border-radius: var(--st-radius-lg);
      background: var(--st-color-surface);
      overflow: hidden;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    }

    .item.open {
      border-color: var(--st-color-border-strong);
      box-shadow: 0 4px 6px -1px var(--st-shadow-color-sm);
    }

    .trigger {
      ${buttonResetStyles}
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--st-space-24);
      text-align: left;
      font-size: var(--st-text-lg);
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
    }

    .trigger:hover {
      background: var(--st-color-hover);
    }

    .chevron {
      flex-shrink: 0;
      margin-left: var(--st-space-16);
      font-size: 24px;
      color: var(--st-color-text-faint);
      transition: transform 0.3s ease;
    }

    .open .chevron {
      transform: rotate(180deg);
    }

    .content {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease;
    }

    .open .content {
      grid-template-rows: 1fr;
    }

    .content-clip {
      overflow: hidden;
      min-height: 0;
    }

    .content-inner {
      padding: 0 var(--st-space-24) var(--st-space-24);
      color: var(--st-color-text);
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--st-space-48) var(--st-space-20);
      }

      .title {
        font-size: var(--st-text-xl);
      }
    }

    ${reducedMotionStyles}
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ attribute: false })
  items: AccordionItem[] = [];

  @property({ type: Boolean, attribute: 'allow-multiple' })
  allowMultiple = false;

  @state() private openIds = new Set<string>();

  private toggle(id: string) {
    const wasOpen = this.openIds.has(id);
    const next = new Set(this.allowMultiple ? this.openIds : []);
    if (wasOpen) next.delete(id);
    else next.add(id);
    this.openIds = next;
    this.dispatchEvent(
      new CustomEvent<AccordionToggleEventDetail>('accordion-toggle', {
        detail: { id, open: !wasOpen },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="container" part="container">
        ${this.title || this.subtitle
          ? html`<div class="header" part="header">
              ${this.title ? html`<h2 class="title" part="title">${this.title}</h2>` : nothing}
              ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : nothing}
            </div>`
          : nothing}
        <div class="list" part="list">
          ${this.items.map((item) => {
            const open = this.openIds.has(item.id);
            return html`
              <div class="item ${open ? 'open' : ''}" part="item">
                <button
                  class="trigger"
                  part="trigger"
                  type="button"
                  aria-expanded=${open ? 'true' : 'false'}
                  aria-controls="content-${item.id}"
                  @click=${() => this.toggle(item.id)}
                >
                  <span>${item.title}</span>
                  <iconify-icon class="chevron" icon="mdi:chevron-down"></iconify-icon>
                </button>
                <div class="content" id="content-${item.id}" part="content" role="region" ?inert=${!open}>
                  <div class="content-clip">
                    <div class="content-inner">${item.content}</div>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
