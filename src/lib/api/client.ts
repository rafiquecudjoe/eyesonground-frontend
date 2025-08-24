import { API_CONFIG, ApiResponse, ApiError } from './types';
import { TokenStorage } from './token-storage';

// Custom error class for API errors
export class ApiClientError extends Error {
    constructor(
        message: string,
        public status?: number,
        public code?: string,
        public response?: any
    ) {
        super(message);
        this.name = 'ApiClientError';
    }
}

// HTTP Client with robust error handling and automatic auth headers
class HttpClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private getAuthHeaders(): Record<string, string> {
        const token = TokenStorage.getAccessToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeaders(),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            // Parse response body
            let responseData: any;
            try {
                responseData = await response.json();
            } catch (parseError) {
                // If response is not JSON, use response text
                const responseText = await response.text();
                responseData = { message: responseText || 'Unknown error occurred' };
            }

            // Handle HTTP errors
            if (!response.ok) {
                // Handle token expiration
                if (response.status === 401 && TokenStorage.getAccessToken()) {
                    TokenStorage.clearAuthData();
                    // Could trigger a logout event or redirect to login
                }

                const errorMessage = responseData?.message || `HTTP ${response.status}: ${response.statusText}`;
                throw new ApiClientError(
                    errorMessage,
                    response.status,
                    responseData?.code,
                    responseData
                );
            }

            return responseData;
        } catch (error) {
            // Handle network errors
            if (error instanceof ApiClientError) {
                throw error;
            }

            // Handle fetch errors (network issues, etc.)
            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new ApiClientError(
                    'Network error: Unable to connect to the server. Please check your internet connection.',
                    0,
                    'NETWORK_ERROR'
                );
            }

            // Handle other unknown errors
            throw new ApiClientError(
                `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                500,
                'UNKNOWN_ERROR'
            );
        }
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}

// Create and export the API client instance
export const apiClient = new HttpClient(API_CONFIG.baseURL);

// Utility function to handle API errors consistently
export const handleApiError = (error: any): ApiError => {
    if (error instanceof ApiClientError) {
        return {
            message: error.message,
            status: error.status,
            code: error.code,
        };
    }

    return {
        message: 'An unexpected error occurred. Please try again.',
        status: 500,
        code: 'UNKNOWN_ERROR',
    };
};
