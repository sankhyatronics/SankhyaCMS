import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { renderMarkdown } from '../shared/markdown';
import type { MarkdownErrorEventDetail } from './MarkdownEvents';

/**
 * Renders Markdown (GFM, single newlines become `<br>`) from either an inline `content` string or
 * a `src` URL it fetches. Output is sanitized with DOMPurify. `src` wins over `content` when both are set.
 * While a fetch is pending it shows "Loading content..."; on failure "Error loading content." and
 * a `markdown-error` event (detail: `{ error }`).
 *
 * Text color is inherited from the parent so inverted containers just work.
 *
 * `list-style="check"` replaces the bullets of unordered lists with a check mark, in the colour of
 * `--st-markdown-list-check-color` (navy by default).
 *
 * Code blocks are a dark navy panel (14px monospace, 20px padding, 12px corners) that scrolls
 * sideways only when a line is wider than the block; ```json fences get syntax colours. Inline
 * `code` is a chip tinted from the surrounding text colour.
 *
 * @cssprop --st-markdown-list-check-color - Colour of the check marks (`list-style="check"`).
 * @cssprop --st-markdown-code-bg - Code block background (default `#011d41`).
 * @cssprop --st-markdown-code-color - Code block text (default `#e4ebff`).
 * @cssprop --st-markdown-code-border - Code block hairline (default `#e4ebff` at 14%).
 * @cssprop --st-markdown-code-key - JSON keys (default `#8eaffe`).
 * @cssprop --st-markdown-code-string - JSON strings (default `#49cce0`).
 * @cssprop --st-markdown-code-number - JSON numbers, `true`, `false`, `null` (default `#fbbf77`).
 * @cssprop --st-markdown-code-punct - JSON punctuation (default `#c9d7fe`).
 */
@customElement('st-markdown')
export class Markdown extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      ${fontFamilyStyles}
      line-height: 1.7;
    }

    /* list-style="check": unordered items get a check mark instead of a bullet. */
    :host([list-style='check']) ul {
      list-style: none;
      padding-left: 0;
    }

    :host([list-style='check']) ul > li {
      position: relative;
      padding-left: 32px;
    }

    :host([list-style='check']) ul > li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.3em;
      width: 20px;
      height: 20px;
      background-color: var(--st-markdown-list-check-color, var(--st-cms-navy));
      -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 6 9 17l-5-5' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 6 9 17l-5-5' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
    }

    :host > div > :first-child {
      margin-top: 0;
    }

    h1,
    h2,
    h3,
    h4 {
      color: inherit;
      font-weight: var(--st-font-weight-bold);
      line-height: 1.3;
    }

    h2 {
      font-size: var(--st-text-2xl);
      margin: var(--st-space-48) 0 var(--st-space-24);
    }

    h3 {
      font-size: var(--st-text-xl);
      font-weight: var(--st-font-weight-semibold);
      margin: var(--st-space-32) 0 var(--st-space-16);
    }

    p {
      margin: 0 0 var(--st-space-24);
    }

    ul,
    ol {
      margin: 0 0 var(--st-space-24);
      padding-left: var(--st-space-24);
    }

    li {
      margin-bottom: var(--st-space-8);
    }

    a {
      color: inherit;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    a:hover {
      color: var(--st-color-text-strong);
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: var(--st-radius-sm);
      margin: var(--st-space-32) 0;
    }

    blockquote {
      border-left: 4px solid var(--st-color-border);
      margin: var(--st-space-32) 0;
      padding-left: var(--st-space-24);
      font-style: italic;
    }

    table {
      border-collapse: collapse;
      margin: 0 0 var(--st-space-24);
    }

    th,
    td {
      border: 1px solid var(--st-color-border);
      padding: var(--st-space-8) var(--st-space-12);
    }

    /* Inline code: a chip tinted from the surrounding text colour, so it reads on light and inverted
       (dark) containers alike. */
    code {
      font-family: var(--st-markdown-code-font, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
      font-size: 0.875em;
      padding: 0.1em 0.4em;
      border-radius: 6px;
      background: color-mix(in srgb, currentColor 12%, transparent);
      overflow-wrap: anywhere;
    }

    /* Code blocks: always a dark navy panel with light text (white-on-light-grey was unreadable). The
       token colours are all at least 4.5:1 on #011d41 and on #03346b. Long lines scroll inside the block. */
    pre {
      margin: 0 0 var(--st-space-24);
      padding: 20px;
      overflow-x: auto;
      border: 1px solid var(--st-markdown-code-border, rgb(228 235 255 / 0.14));
      border-radius: 12px;
      background: var(--st-markdown-code-bg, #011d41);
      color: var(--st-markdown-code-color, #e4ebff);
      font-size: 14px;
      line-height: 1.6;
      tab-size: 2;
    }

    pre code {
      display: block;
      padding: 0;
      border-radius: 0;
      background: none;
      font-size: 14px;
      color: inherit;
      white-space: pre;
      overflow-wrap: normal;
    }

    pre .tok-key {
      color: var(--st-markdown-code-key, #8eaffe);
    }

    pre .tok-string {
      color: var(--st-markdown-code-string, #49cce0);
    }

    pre .tok-number,
    pre .tok-literal {
      color: var(--st-markdown-code-number, #fbbf77);
    }

    pre .tok-punct {
      color: var(--st-markdown-code-punct, #c9d7fe);
    }
  `;

  /** Inline Markdown source. Ignored when `src` is set. */
  @property({ type: String })
  content = '';

  /** URL of a Markdown file to fetch. */
  @property({ type: String })
  src = '';

  /** `default` keeps bullets; `check` shows a check mark on each unordered item. */
  @property({ type: String, reflect: true, attribute: 'list-style' })
  listStyle: 'default' | 'check' = 'default';

  @state() private fetched = '';
  @state() private loading = false;
  @state() private error: Error | null = null;

  private abort?: AbortController;

  willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('src')) void this.load();
  }

  disconnectedCallback(): void {
    this.abort?.abort();
    super.disconnectedCallback();
  }

  private async load(): Promise<void> {
    this.abort?.abort();
    this.fetched = '';
    this.error = null;
    if (!this.src) {
      this.loading = false;
      return;
    }
    const controller = new AbortController();
    this.abort = controller;
    this.loading = true;
    try {
      const response = await fetch(this.src, { signal: controller.signal });
      if (!response.ok) throw new Error(`Failed to fetch markdown: ${response.statusText}`);
      const text = await response.text();
      if (controller.signal.aborted) return;
      this.fetched = text;
    } catch (err) {
      if (controller.signal.aborted) return;
      this.error = err instanceof Error ? err : new Error('Unknown error fetching markdown');
      this.dispatchEvent(
        new CustomEvent<MarkdownErrorEventDetail>('markdown-error', {
          detail: { error: this.error },
          bubbles: true,
          composed: true
        })
      );
    }
    this.loading = false;
  }

  render() {
    if (this.loading) return html`<div part="loading">Loading content...</div>`;
    if (this.error) return html`<div part="error">Error loading content.</div>`;
    const source = this.src ? this.fetched : this.content;
    if (!source) return nothing;
    return html`<div part="body">${unsafeHTML(renderMarkdown(source))}</div>`;
  }
}
