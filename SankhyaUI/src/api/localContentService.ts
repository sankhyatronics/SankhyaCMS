import { type PageContent } from './datatypes';

const DEFAULT_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

const localContentCache = new Map<string, CacheEntry<any>>();

export interface LocalContentOptions {
    /**
     * Optional language code to include in the path (e.g., 'en').
     * If provided, the path will be constructed as `{baseUrl}/{lang}/{endpoint}`.
     * If omitted, it will be `{baseUrl}/{endpoint}`.
     * Default depends on implementation, here we assume it might be passed or empty.
     */
    lang?: string;
    /**
     * Base URL for the public folder. Defaults to './'.
     */
    baseUrl?: string;
    /**
     * Cache duration in milliseconds. Defaults to 5 minutes.
     */
    cacheDuration?: number;
    /**
     * Force fresh fetch, bypassing cache.
     */
    noCache?: boolean;
}

/**
 * Fetches JSON content from a local public path.
 *
 * @param endpoint The filename or path to the JSON file (e.g., 'data.json' or 'home/hero.json').
 * @param options Configuration options.
 */
export async function fetchLocalContent<T = PageContent>(
    endpoint: string,
    options: LocalContentOptions = {}
): Promise<T> {
    const {
        lang,
        baseUrl = './',
        cacheDuration = DEFAULT_CACHE_DURATION,
        noCache = false,
    } = options;

    // Construct URL based on presence of lang
    // Standard pattern often used: ./en/filename.json or ./filename.json
    const url = lang
        ? `${baseUrl.replace(/\/$/, '')}/${lang}/${endpoint}`
        : `${baseUrl.replace(/\/$/, '')}/${endpoint}`;

    const cacheKey = url;

    // Check cache
    if (!noCache) {
        const cached = localContentCache.get(cacheKey);
        if (cached) {
            const isExpired = Date.now() - cached.timestamp > cacheDuration;
            if (!isExpired) {
                return cached.data as T;
            }
        }
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Local Content Error: ${response.status} ${response.statusText} at ${url}`);
        }

        const data = await response.json();

        // Update cache
        localContentCache.set(cacheKey, {
            data,
            timestamp: Date.now(),
        });

        return data as T;
    } catch (error) {
        console.error(`Failed to fetch local content from ${url}:`, error);
        throw error;
    }
}
