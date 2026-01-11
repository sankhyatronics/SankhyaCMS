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
    apiService?: ApiService;
}
export declare function setDefaultApiService(service: ApiService): void;
export declare function getDefaultApiService(): ApiService;
export declare function useApiConfig<T = any>({ endpoint, storyName, params, autoFetch, apiService }: UseApiConfigOptions): {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: (customStory?: string, customParams?: Record<string, string>) => Promise<void>;
    setData: import('react').Dispatch<import('react').SetStateAction<T | null>>;
};
export {};
