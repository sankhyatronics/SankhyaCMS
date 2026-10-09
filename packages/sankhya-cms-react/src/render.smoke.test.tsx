import fs from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { DynamicRenderer } from './components/Common/DynamicRenderer';
import { DropdownProvider } from './contexts/DropdownContext';
import { UserProvider } from './contexts/UserContext';
import type { ComponentNode } from './components/Common/node';

const publicDir = path.resolve(import.meta.dirname, '../test/fixtures/en');
const pages = fs.readdirSync(publicDir).filter(name => name.endsWith('.json'));

const handlers = new Proxy({}, { get: () => () => {} }) as Record<string, () => void>;

describe('Site pages render through the real component registry', () => {
    it.each(pages)('%s', page => {
        const config = JSON.parse(fs.readFileSync(path.join(publicDir, page), 'utf8')) as ComponentNode[];
        const onError = vi.fn();
        const html = renderToStaticMarkup(
            <StaticRouter location="/">
                <UserProvider defaultLanguage="en" defaultTheme="light" languages={['en']} themes={['light']} storageKeyPrefix="test_">
                    <DropdownProvider>
                        <DynamicRenderer config={config} handlers={handlers} onError={onError} />
                    </DropdownProvider>
                </UserProvider>
            </StaticRouter>
        );
        expect(onError).not.toHaveBeenCalled();
        expect(html.length).toBeGreaterThan(0);
        expect(html).not.toContain('error-boundary');
    });
});
