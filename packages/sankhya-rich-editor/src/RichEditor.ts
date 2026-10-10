import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { initRichEditor, getCleanHTML } from './core/editor';
import { editorEventEmitter } from './core/events';
import { protectTemplateTags, restoreTemplateTags } from './templateSyntax';
import type { RichEditorChangeEventDetail, RichEditorErrorEventDetail } from './RichEditorEvents';

/**
 * Template-driven HTML editor: loads an HTML document into an isolated iframe and lets non-technical
 * users edit text and formatting in place through a toolbar, without breaking the template's layout
 * or CSS. Set the document with `content` (an HTML string) or `src` (a same-origin URL); `src` wins
 * when both are set. Read the result with `getHTML()`.
 *
 * Handlebars block tags (`{{#if}}`, `{{#each}}`, ...) in `content` are protected while editing, so loops
 * inside tables survive, and are restored in `getHTML()` and `rich-editor-change`. (Not applied to `src`.)
 *
 * The iframe is sandboxed without `allow-scripts`, so scripts in the template do not run while editing
 * (they are preserved in the output). The editor core keeps module-level state, so only one
 * `<st-rich-editor>` per page is supported.
 *
 * @fires rich-editor-ready - The document has loaded and the editor is active.
 * @fires rich-editor-change - The content changed; detail: `{ html }` (clean HTML).
 * @fires rich-editor-error - Initialization failed; detail: `{ error }`.
 */
@customElement('st-rich-editor')
export class RichEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 400px;
      border: 1px solid var(--st-color-border, #e5e7eb);
      border-radius: var(--st-radius-md, 8px);
      overflow: hidden;
      background: #fff;
    }

    iframe {
      display: block;
      width: 100%;
      height: 100%;
      min-height: inherit;
      border: 0;
    }
  `;

  /** HTML document to edit, as a string. Ignored when `src` is set. */
  @property() content = '';

  /** URL of a same-origin HTML document to edit. Takes precedence over `content`. */
  @property() src = '';

  /** Maximum number of undo/redo snapshots kept. */
  @property({ type: Number, attribute: 'max-stack-size' }) maxStackSize?: number;

  @query('iframe') private frame?: HTMLIFrameElement;

  private unsubscribe?: () => void;
  private ready = false;

  /** Returns the edited document as clean HTML (toolbar, editor classes and markers removed). */
  getHTML(): string {
    return restoreTemplateTags(getCleanHTML());
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = editorEventEmitter.on('contentChanged', () => {
      if (!this.ready) return; // the editor's own first snapshot is not a user edit
      this.dispatchEvent(
        new CustomEvent<RichEditorChangeEventDetail>('rich-editor-change', {
          detail: { html: this.getHTML() },
          bubbles: true,
          composed: true
        })
      );
    });
  }

  disconnectedCallback() {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    super.disconnectedCallback();
  }

  private handleLoad() {
    const frame = this.frame;
    if (!frame) return;
    this.ready = false;
    try {
      initRichEditor(frame, this.maxStackSize ? { maxStackSize: this.maxStackSize } : undefined);
      this.ready = true;
      this.dispatchEvent(new CustomEvent('rich-editor-ready', { bubbles: true, composed: true }));
    } catch (error) {
      this.dispatchEvent(
        new CustomEvent<RichEditorErrorEventDetail>('rich-editor-error', { detail: { error }, bubbles: true, composed: true })
      );
    }
  }

  render() {
    const useSrc = Boolean(this.src);
    return html`<iframe
      title="Rich HTML editor"
      sandbox="allow-same-origin"
      src=${useSrc ? this.src : 'about:blank'}
      .srcdoc=${useSrc ? '' : protectTemplateTags(this.content)}
      @load=${this.handleLoad}
    ></iframe>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-rich-editor': RichEditor;
  }
}
