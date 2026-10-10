// Lit element (registers <st-rich-editor>)
export { RichEditor } from './RichEditor';
export type { RichEditorChangeEventDetail, RichEditorErrorEventDetail } from './RichEditorEvents';

// Handlebars block-tag protection (applied by the element; exported for server/preview code)
export { protectTemplateTags, restoreTemplateTags } from './templateSyntax';
