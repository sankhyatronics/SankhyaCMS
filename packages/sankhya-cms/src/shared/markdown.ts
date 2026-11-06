import DOMPurify from 'dompurify';
import { Marked, type Tokens } from 'marked';

const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* One JSON token per match: a string (a key when a colon follows), a literal, a number or punctuation. */
const JSON_TOKEN = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],])/g;

/**
 * Wraps the tokens of a JSON code block in `<span class="tok-…">` (key, string, number, literal,
 * punct) so `st-markdown` can colour them. Everything between tokens is copied through escaped.
 */
export function highlightJson(source: string): string {
  let out = '';
  let last = 0;
  for (const match of source.matchAll(JSON_TOKEN)) {
    const index = match.index ?? 0;
    out += escapeHtml(source.slice(last, index));
    const [whole, str, colon, literal, number, punct] = match;
    if (str !== undefined) {
      out += `<span class="${colon ? 'tok-key' : 'tok-string'}">${escapeHtml(str)}</span>`;
      if (colon) out += `<span class="tok-punct">${escapeHtml(colon)}</span>`;
    } else if (literal !== undefined) {
      out += `<span class="tok-literal">${literal}</span>`;
    } else if (number !== undefined) {
      out += `<span class="tok-number">${number}</span>`;
    } else if (punct !== undefined) {
      out += `<span class="tok-punct">${escapeHtml(punct)}</span>`;
    } else {
      out += escapeHtml(whole);
    }
    last = index + whole.length;
  }
  return out + escapeHtml(source.slice(last));
}

/* Own instance, so the renderer override never leaks into other users of the global `marked`. */
const markdown = new Marked({
  gfm: true,
  breaks: true,
  async: false,
  renderer: {
    code({ text, lang }: Tokens.Code): string | false {
      const language = (lang ?? '').trim().split(/\s+/)[0].toLowerCase();
      if (language !== 'json') return false;
      return `<pre><code class="language-json">${highlightJson(text)}</code></pre>\n`;
    }
  }
});

/**
 * Renders Markdown (GFM, single newlines become `<br>`) to HTML sanitized with DOMPurify. The one
 * place the CMS turns authored Markdown into markup; render the result with `unsafeHTML`.
 * ```json fences get token spans (see highlightJson) for syntax colours.
 */
export function renderMarkdown(source: string): string {
  return DOMPurify.sanitize(markdown.parse(source) as string);
}
