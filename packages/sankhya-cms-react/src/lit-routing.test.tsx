import { describe, expect, it, vi } from 'vitest';
import { isInternalHref, routeSelect } from './components/lit';

/** A stand-in for the cancelable select event an element dispatches (`CustomEvent` has the same surface). */
function selectEvent(href: string, cancelled = false) {
  const event = {
    defaultPrevented: cancelled,
    detail: { href },
    preventDefault() {
      this.defaultPrevented = true;
    }
  };
  return event;
}

describe('isInternalHref', () => {
  it.each(['/contact-us', '/contact-us?x=y', 'relative/path', '/'])('routes %s inside the app', href => {
    expect(isInternalHref(href)).toBe(true);
  });

  it.each(['https://sankhyatronics.com/x', 'mailto:hi@example.com', '//cdn.example.com/x', '#pricing', '', undefined])(
    'leaves %s to the browser',
    href => {
      expect(isInternalHref(href)).toBe(false);
    }
  );
});

describe('routeSelect', () => {
  it('navigates an internal href client-side and cancels the native follow', () => {
    const navigate = vi.fn();
    const event = selectEvent('/contact-us?x=y');
    routeSelect(event, navigate);
    expect(navigate).toHaveBeenCalledWith('/contact-us?x=y');
    expect(event.defaultPrevented).toBe(true);
  });

  it('leaves external URLs and #anchors to the browser', () => {
    const navigate = vi.fn();
    for (const href of ['https://example.com/a', '#pricing']) {
      const event = selectEvent(href);
      routeSelect(event, navigate);
      expect(event.defaultPrevented).toBe(false);
    }
    expect(navigate).not.toHaveBeenCalled();
  });

  it('does nothing when a listener already cancelled the event', () => {
    const navigate = vi.fn();
    routeSelect(selectEvent('/contact-us', true), navigate);
    expect(navigate).not.toHaveBeenCalled();
  });
});
