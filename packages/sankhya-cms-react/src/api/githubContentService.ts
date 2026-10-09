
/**
 * Generic service for loading JSON content from a GitHub public repository.
 * This service fetches raw content directly from GitHub.
 */

import { type PageContent } from './datatypes';

const DEFAULT_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes for external calls

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

const githubContentCache = new Map<string, CacheEntry<any>>();

export interface GithubContentOptions {
    /**
     * GitHub branch to fetch from. Defaults to 'main'.
     */
    branch?: string;
    /**
     * Cache duration in milliseconds. Defaults to 10 minutes.
     */
    cacheDuration?: number;
    /**
     * Force fresh fetch, bypassing cache.
     */
    noCache?: boolean;
}

/**
 * Fetches JSON content from a public GitHub repository.
 *
 * @param owner The GitHub user or organization name (e.g., 'facebook').
 * @param repo The repository name (e.g., 'react').
 * @param path The path to the file within the repo (e.g., 'package.json' or 'docs/intro.json').
 * @param options Configuration options.
 */
export async function fetchGithubContent<T = PageContent>(
    owner: string,
    repo: string,
    path: string,
    options: GithubContentOptions = {}
): Promise<T> {
    const {
        branch = 'main',
        cacheDuration = DEFAULT_CACHE_DURATION,
        noCache = false,
    } = options;

    // Construct Raw GitHub URL
    // Format: https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    const cacheKey = url;

    // Check cache
    if (!noCache) {
        const cached = githubContentCache.get(cacheKey);
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
            throw new Error(`GitHub Content Error: ${response.status} ${response.statusText} at ${url}`);
        }

        const data = await response.json();

        // Update cache
        githubContentCache.set(cacheKey, {
            data,
            timestamp: Date.now(),
        });

        return data as T;
    } catch (error) {
        console.error(`Failed to fetch GitHub content from ${url}:`, error);
        throw error;
    }
}
