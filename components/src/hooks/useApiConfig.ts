import { useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  // Use custom API service or fall back to default
  const serviceToUse = apiService || defaultApiService;

  const fetchData = async (customStory?: string, customParams?: Record<string, string>) => {
    if (!serviceToUse) {
      setError('API service not configured');
      setLoading(false);
      return;
    }

    const storyToUse = customStory || storyName;
    setLoading(true);
    setError(null);

    try {
      // Build query string
      const queryParams = new URLSearchParams({
        story: storyToUse,
        ...params,
        ...customParams
      }).toString();

      const url = queryParams ? `${endpoint}?${queryParams}` : endpoint;
      const response = await serviceToUse.get<T>(url);

      if (response.status === 200) {
        setData(response.data);
      } else {
        setError(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error(`Failed to fetch from ${endpoint}:`, err);
      setError(err.message || 'Failed to fetch configuration');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && serviceToUse) {
      fetchData();
    } else if (autoFetch && !serviceToUse) {
      setError('API service not configured');
      setLoading(false);
    }
  }, [endpoint, storyName, JSON.stringify(params), autoFetch, serviceToUse]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData
  };
}