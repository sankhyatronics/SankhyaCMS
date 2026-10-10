import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RichEditor } from './rich-editor';

describe('RichEditor wrapper', () => {
    it('renders an st-rich-editor element', () => {
        expect(renderToStaticMarkup(<RichEditor ref={createRef()} maxStackSize={20} />)).toMatch(/^<st-rich-editor[ >/]/);
    });
});
