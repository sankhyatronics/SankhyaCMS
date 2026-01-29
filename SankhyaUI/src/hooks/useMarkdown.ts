import { useState, useEffect } from 'react';

export const useMarkdown = (url?: string) => {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!url) {
            setContent('');
            return;
        }

        const fetchMarkdown = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch markdown: ${response.statusText}`);
                }
                const text = await response.text();
                setContent(text);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error fetching markdown'));
                console.error('Error fetching markdown:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkdown();
    }, [url]);

    return { content, loading, error };
};
