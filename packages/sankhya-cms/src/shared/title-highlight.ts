/** The three pieces of a title around its first highlighted substring. */
export interface TitleHighlightParts {
  before: string;
  match: string;
  after: string;
}

/**
 * Splits `title` around the first occurrence of `highlight`. Returns `null` when there is nothing
 * to highlight (empty `highlight`, or it does not occur), so the caller renders the plain title.
 * Plain string handling only: the caller renders the pieces as text, never as HTML.
 */
export function splitTitleHighlight(title: string, highlight: string): TitleHighlightParts | null {
  if (!highlight) return null;
  const index = title.indexOf(highlight);
  if (index === -1) return null;
  return {
    before: title.slice(0, index),
    match: highlight,
    after: title.slice(index + highlight.length)
  };
}
