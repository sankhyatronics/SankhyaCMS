import type { Args } from '@storybook/web-components-vite';

/**
 * Render function for a custom element story: args are assigned as properties (so arrays and
 * objects work), `inner` is the element's light-DOM content (slotted children).
 */
export function renderElement(tag: string, inner = '') {
  return (args: Args): HTMLElement => {
    const element = document.createElement(tag);
    Object.assign(element, args);
    element.innerHTML = inner;
    return element;
  };
}
