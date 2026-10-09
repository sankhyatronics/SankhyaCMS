import { useState, useEffect } from 'react';

interface MarkdownState {
    url?: string;
    content: string;
    error: Error | null;
}

export const useMarkdown = (url?: string) => {
    const [state, setState] = useState<MarkdownState>({ url: undefined, content: '', error: null });

    useEffect(() => {
        if (!url) return;

        let cancelled = false;
        const fetchMarkdown = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch markdown: ${response.statusText}`);
                }
                const content = await response.text();
                if (!cancelled) setState({ url, content, error: null });
            } catch (err) {
                console.error('Error fetching markdown:', err);
                if (!cancelled) {
                    setState({ url, content: '', error: err instanceof Error ? err : new Error('Unknown error fetching markdown') });
                }
            }
        };

        fetchMarkdown();
        return () => {
            cancelled = true;
        };
    }, [url]);

    // State belongs to the url it was fetched for; anything else is still loading (or no url at all).
    const current = state.url === url;
    return {
        content: url && current ? state.content : '',
        loading: Boolean(url) && !current,
        error: url && current ? state.error : null
    };
};
