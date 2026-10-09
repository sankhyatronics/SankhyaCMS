import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { componentTags } from '@sankhyatronics/sankhya-cms/schema';
import { baseComponents } from './components/Common/DynamicRenderer.constants';

/** Guard for the repo rule: every base component is a Lit element; React only wraps it. */
describe('registry matches the schema', () => {
    it('has exactly the types the schema lists', () => expect(Object.keys(baseComponents).sort()).toEqual(Object.keys(componentTags).sort()));
});

describe('base components are Lit-backed', () => {
    it.each(Object.entries(baseComponents))('%s renders an st-* element', (_name, Component) => {
        const html = renderToStaticMarkup(
            <StaticRouter location="/">{createElement(Component as React.ComponentType<Record<string, unknown>>, {})}</StaticRouter>
        );
        expect(html).toMatch(new RegExp(`^<${componentTags[_name as keyof typeof componentTags]}[ >/]`));
    });
});
