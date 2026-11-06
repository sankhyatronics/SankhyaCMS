import DOMPurify from 'dompurify';
import { marked } from 'marked';

/**
 * Renders Markdown (GFM, single newlines become `<br>`) to HTML sanitized with DOMPurify. The one
 * place the CMS turns authored Markdown into markup; render the result with `unsafeHTML`.
 */
export function renderMarkdown(source: string): string {
  return DOMPurify.sanitize(marked.parse(source, { gfm: true, breaks: true, async: false }));
}
