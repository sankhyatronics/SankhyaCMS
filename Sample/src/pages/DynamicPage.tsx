import React from 'react';
import { useParams, useLocation } from 'react-router';
import { DynamicRenderer } from '@sankhyatronics/sankhya-ui';
import { usePageData } from '../hooks/usePageData';

/**
 * DynamicPage component handles rendering of pages based on the URL path.
 * It maps the URL path to a page ID used by the CMS API.
 * If a page is not found, it falls back to the 'not-found' CMS endpoint.
 */
export const DynamicPage: React.FC = () => {
    const { slug } = useParams<{ slug?: string }>();
    const location = useLocation();

    // Determine the initial pageId. If path is '/', use 'home'.
    const initialPageId = location.pathname === '/' ? 'home' : (slug || 'home');

    // State to track which page content we are currently showing
    const [activePageId, setActivePageId] = React.useState(initialPageId);

    // Reset activePageId when the URL path changes
    React.useEffect(() => {
        setActivePageId(initialPageId);
    }, [initialPageId]);

    const { data, loading, error } = usePageData(`${activePageId}.json`);

    // If there's an error and we haven't tried the 'not-found' page yet, fall back to it
    React.useEffect(() => {
        if (error && activePageId !== 'not-found.json') {
            setActivePageId('not-found');
        }
    }, [error, activePageId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className={`page-${activePageId}`}>
            {data.map((section, index) => (
                <DynamicRenderer
                    key={index}
                    config={section.data}
                />
            ))}
        </div>
    );
};
