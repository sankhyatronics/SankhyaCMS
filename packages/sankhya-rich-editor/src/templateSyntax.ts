/**
 * Handlebars/Mustache block tags (`{{#if x}}`, `{{#each xs}}`, `{{/if}}`, `{{else}}`) are plain text,
 * and the HTML parser moves stray text out of table contexts — `{{#each Lines}}` placed between
 * `<tbody>` and `<tr>` would end up before the table. Comments are legal everywhere, so block tags
 * are swapped for comments before the document is loaded and swapped back when it is read out.
 * Inline `{{Value}}` tags are ordinary text and are left alone.
 */
const BLOCK_TAG = /\{\{\s*(?:[#/^]|else\b)[^}]*\}\}/g;
const PROTECTED = /<!--st-tpl:([^>]*?)-->/g;

/** Replaces template block tags with `<!--st-tpl:...-->` comments. */
export function protectTemplateTags(html: string): string {
  return html.replace(BLOCK_TAG, (tag) => `<!--st-tpl:${encodeURIComponent(tag).replace(/-/g, '%2D')}-->`);
}

/** Restores the block tags that `protectTemplateTags` turned into comments. */
export function restoreTemplateTags(html: string): string {
  return html.replace(PROTECTED, (_, encoded: string) => decodeURIComponent(encoded));
}
