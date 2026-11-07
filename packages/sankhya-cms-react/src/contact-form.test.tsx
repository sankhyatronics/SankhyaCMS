// @vitest-environment jsdom
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { ContactForm } from './components/lit';
import { getComponent, registerComponent } from './components/Common/DynamicRenderer.constants';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let unmount: (() => void) | undefined;

afterEach(() => {
  unmount?.();
  unmount = undefined;
  document.body.innerHTML = '';
});

describe('ContactForm React wrapper', () => {
  // Vitest resolves @lit/react to its Node build, which does not copy props or attach events to the element.
  // So the events (onSent, onError) are not exercised here; the wrapper's event mapping is checked by review only.
  it('renders the st-contact-form element', async () => {
    const container = document.createElement('div');
    document.body.append(container);
    const root = createRoot(container);
    unmount = () => void act(() => root.unmount());

    await act(async () => {
      root.render(<ContactForm endpoint="https://api.example.com/contact" />);
    });

    expect(container.querySelector('st-contact-form')).not.toBeNull();
  });

  it('is the renderer default for "ContactForm", and an app that registers its own replaces it', () => {
    expect(getComponent('ContactForm')).toBe(ContactForm);

    const AppOwnContactForm = () => null;
    registerComponent('ContactForm', AppOwnContactForm);
    expect(getComponent('ContactForm')).toBe(AppOwnContactForm);
  });
});
