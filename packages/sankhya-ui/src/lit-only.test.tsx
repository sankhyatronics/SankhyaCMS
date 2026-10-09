import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { baseComponents } from './components/Common/DynamicRenderer.constants';

/** Guard for the repo rule: every base component is a Lit element; React only wraps it. */
describe('base components are Lit-backed', () => {
    it.each(Object.entries(baseComponents))('%s renders an st-* element', (_name, Component) => {
        const html = renderToStaticMarkup(
            <StaticRouter location="/">{createElement(Component as React.ComponentType<Record<string, unknown>>, {})}</StaticRouter>
        );
        expect(html).toMatch(/^<st-[a-z-]+/);
    });
});
