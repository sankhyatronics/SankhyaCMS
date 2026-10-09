import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import type { MarkdownErrorEventDetail } from './MarkdownEvents';

/**
 * Renders Markdown (GFM, single newlines become `<br>`) from either an inline `content` string or
 * a `src` URL it fetches. Ports `SankhyaUI`'s `useMarkdown` hook + `react-markdown` (remark-gfm,
 * remark-breaks); output is sanitized with DOMPurify. `src` wins over `content` when both are set.
 * While a fetch is pending it shows "Loading content..."; on failure "Error loading content." and
 * a `markdown-error` event (detail: `{ error }`).
 *
 * Text color is inherited from the parent so inverted containers just work.
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

    pre,
    code {
      background: var(--st-color-subtle);
      border-radius: var(--st-radius-xs);
    }

    code {
      padding: 0 var(--st-space-4);
    }

    pre {
      padding: var(--st-space-16);
      overflow-x: auto;
    }

    pre code {
      padding: 0;
    }
  `;

  /** Inline Markdown source. Ignored when `src` is set. */
  @property({ type: String })
  content = '';

  /** URL of a Markdown file to fetch. */
  @property({ type: String })
  src = '';

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
    const rendered = DOMPurify.sanitize(marked.parse(source, { gfm: true, breaks: true, async: false }));
    return html`<div part="body">${unsafeHTML(rendered)}</div>`;
  }
}
