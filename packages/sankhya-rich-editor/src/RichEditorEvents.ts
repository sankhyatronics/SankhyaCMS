export interface RichEditorChangeEventDetail {
  /** Clean HTML of the whole document after the edit (editor markers and toolbar removed). */
  html: string;
}

export interface RichEditorErrorEventDetail {
  error: unknown;
}
