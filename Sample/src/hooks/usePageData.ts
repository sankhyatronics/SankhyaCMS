import { useState, useEffect } from 'react';
import { fetchLocalContent, useUser, type PageContent } from '@sankhyatronics/sankhya-ui';



export function usePageData(pageId: string) {
    const [data, setData] = useState<PageContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { language } = useUser();

    useEffect(() => {
        async function fetchPage() {
            setLoading(true);
            setError(null);
            try {
                // Use the page fetcher with the current language
                const result = await fetchLocalContent(pageId, { lang: language });
                setData(result);
            } catch (err: any) {
                console.error('Failed to fetch page data:', err);
                setError(err.message || 'Failed to load page');
            } finally {
                setLoading(false);
            }
        }

        if (pageId) {
            fetchPage();
        }
    }, [pageId, language]);

    return { data, loading, error };
}
