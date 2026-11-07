// @vitest-environment jsdom
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { Booking } from './components/lit';
import { getComponent, registerComponent } from './components/Common/DynamicRenderer.constants';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let unmount: (() => void) | undefined;

afterEach(() => {
  unmount?.();
  unmount = undefined;
  document.body.innerHTML = '';
});

describe('Booking React wrapper', () => {
  // Vitest resolves @lit/react to its Node build, which does not copy props or attach events to the element.
  // So the events (onCreated, onRescheduled, onCancelled, onError) are not exercised here; the wrapper's event
  // mapping is checked by review only.
  it('renders the st-booking element', async () => {
    const container = document.createElement('div');
    document.body.append(container);
    const root = createRoot(container);
    unmount = () => void act(() => root.unmount());

    await act(async () => {
      root.render(<Booking />);
    });

    expect(container.querySelector('st-booking')).not.toBeNull();
  });

  it('is the renderer default for "Booking", and an app that registers its own replaces it', () => {
    expect(getComponent('Booking')).toBe(Booking);

    const AppOwnBooking = () => null;
    registerComponent('Booking', AppOwnBooking);
    expect(getComponent('Booking')).toBe(AppOwnBooking);
  });
});
