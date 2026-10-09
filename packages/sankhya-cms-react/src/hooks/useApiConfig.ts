import { useState, useEffect, useCallback } from 'react';

// Define a generic API service interface
export interface ApiService {
  get<T = any>(endpoint: string, options?: any): Promise<{
    data: T;
    status: number;
    statusText: string;
  }>;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers?: Record<string, string>;
}

export interface ApiError {
  error: string;
  status: number;
  statusText: string;
}

interface UseApiConfigOptions {
  endpoint: string;
  storyName?: string;
  params?: Record<string, string>;
  autoFetch?: boolean;
  apiService?: ApiService; // Make API service configurable
}

// Default API service (can be overridden)
let defaultApiService: ApiService;

// Set the default API service
export function setDefaultApiService(service: ApiService) {
  defaultApiService = service;
}

// Get the current default API service
export function getDefaultApiService(): ApiService {
  if (!defaultApiService) {
    throw new Error('Default API service not set. Call setDefaultApiService() first.');
  }
  return defaultApiService;
}

export function useApiConfig<T = any>({
  endpoint,
  storyName = 'Default',
  params = {},
  autoFetch = true,
  apiService // Allow custom API service per hook instance
}: UseApiConfigOptions) {
  const [data, setData] = useState<T | null>(null);
  const [fetching, setFetching] = useState(autoFetch);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Use custom API service or fall back to default
  const serviceToUse = apiService || defaultApiService;
  const paramsKey = JSON.stringify(params);

  const fetchData = useCallback(async (customStory?: string, customParams?: Record<string, string>) => {
    if (!serviceToUse) return;

    setFetching(true);
    setFetchError(null);

    try {
      // Build query string
      const queryParams = new URLSearchParams({
        story: customStory || storyName,
        ...(JSON.parse(paramsKey) as Record<string, string>),
        ...customParams
      }).toString();

      const url = queryParams ? `${endpoint}?${queryParams}` : endpoint;
      const response = await serviceToUse.get<T>(url);

      if (response.status === 200) {
        setData(response.data);
      } else {
        setFetchError(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error(`Failed to fetch from ${endpoint}:`, err);
      setFetchError(err.message || 'Failed to fetch configuration');
    } finally {
      setFetching(false);
    }
  }, [endpoint, storyName, paramsKey, serviceToUse]);

  useEffect(() => {
    if (autoFetch && serviceToUse) {
      fetchData();
    }
  }, [autoFetch, serviceToUse, fetchData]);

  const notConfigured = !serviceToUse;
  const loading = notConfigured ? false : fetching;
  const error = notConfigured ? 'API service not configured' : fetchError;

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData
  };
}