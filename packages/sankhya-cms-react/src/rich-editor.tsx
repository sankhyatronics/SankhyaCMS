/**
 * React wrapper over `<st-rich-editor>` from `@sankhyatronics/sankhya-rich-editor`. Same rule as the
 * rest of this package: the element holds all the logic; this only maps props/events to React.
 *
 * Kept off the main entry so apps that only render CMS pages don't bundle the editor.
 * Read the result with a ref (`ref.current.getHTML()`) or from `onRichEditorChange` (`event.detail.html`).
 */
import * as React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';

import { RichEditor as RichEditorElement } from '@sankhyatronics/sankhya-rich-editor';
import type { RichEditorChangeEventDetail, RichEditorErrorEventDetail } from '@sankhyatronics/sankhya-rich-editor';

export const RichEditor = createComponent({
  react: React,
  tagName: 'st-rich-editor',
  elementClass: RichEditorElement,
  events: {
    onRichEditorReady: 'rich-editor-ready' as EventName<CustomEvent<void>>,
    onRichEditorChange: 'rich-editor-change' as EventName<CustomEvent<RichEditorChangeEventDetail>>,
    onRichEditorError: 'rich-editor-error' as EventName<CustomEvent<RichEditorErrorEventDetail>>
  }
});

export type { RichEditorElement, RichEditorChangeEventDetail, RichEditorErrorEventDetail };
