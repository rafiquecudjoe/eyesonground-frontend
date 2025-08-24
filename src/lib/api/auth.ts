import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { apiClient, handleApiError } from './client';
import {
    API_CONFIG,
    RegisterUserRequest,
    LoginUserRequest,
    RegisterUserResponse,
    LoginUserResponse,
    ApiResponse,
    ApiError
} from './types';
import { TokenStorage } from './token-storage';

// Auth Service Functions
export const authService = {
    async register(userData: RegisterUserRequest): Promise<ApiResponse<RegisterUserResponse>> {
        const response = await apiClient.post<RegisterUserResponse>(API_CONFIG.endpoints.users.register, userData);

        // Store tokens and user data after successful registration
        if (response.data) {
            TokenStorage.storeAuthData(
                {
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                    jwtExpiresIn: response.data.jwtExpiresIn
                },
                response.data.userData
            );
        }

        return response;
    },

    async login(credentials: LoginUserRequest): Promise<ApiResponse<LoginUserResponse>> {
        const response = await apiClient.post<LoginUserResponse>(API_CONFIG.endpoints.users.login, credentials);

        // Store tokens and user data after successful login
        if (response.data) {
            TokenStorage.storeAuthData(
                {
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                    jwtExpiresIn: response.data.jwtExpiresIn
                },
                response.data.userData
            );
        }

        return response;
    },
};

// React Query Hooks with proper error handling

export interface UseRegisterOptions {
    onSuccess?: (data: ApiResponse<RegisterUserResponse>, variables: RegisterUserRequest) => void;
    onError?: (error: ApiError, variables: RegisterUserRequest) => void;
}

export const useRegister = (options?: UseRegisterOptions) => {
    return useMutation<ApiResponse<RegisterUserResponse>, ApiError, RegisterUserRequest>({
        mutationFn: authService.register,
        onSuccess: options?.onSuccess,
        onError: (error, variables) => {
            const apiError = handleApiError(error);
            options?.onError?.(apiError, variables);
        },
    });
};

export interface UseLoginOptions {
    onSuccess?: (data: ApiResponse<LoginUserResponse>, variables: LoginUserRequest) => void;
    onError?: (error: ApiError, variables: LoginUserRequest) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
    return useMutation<ApiResponse<LoginUserResponse>, ApiError, LoginUserRequest>({
        mutationFn: authService.login,
        onSuccess: options?.onSuccess,
        onError: (error, variables) => {
            const apiError = handleApiError(error);
            options?.onError?.(apiError, variables);
        },
    });
};

// Authentication utility functions
export const logout = (): void => {
    TokenStorage.clearAuthData();
    // Could redirect to login page or trigger global state update
};

export const isAuthenticated = (): boolean => {
    return TokenStorage.isAuthenticated() && !TokenStorage.isTokenExpired();
};

export const getCurrentUser = () => {
    return TokenStorage.getUserData();
};

export const getAccessToken = (): string | null => {
    return TokenStorage.getAccessToken();
};

// Utility functions for form validation
export const validateRegistrationForm = (data: Partial<RegisterUserRequest>): string[] => {
    const errors: string[] = [];

    if (!data.firstName?.trim()) {
        errors.push('First name is required');
    }

    if (!data.lastName?.trim()) {
        errors.push('Last name is required');
    }

    if (!data.email?.trim()) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.password) {
        errors.push('Password is required');
    } else if (data.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (!data.userType) {
        errors.push('User type is required');
    }

    // Additional validation for agents
    if (data.userType === 'agent') {
        if (!data.dateOfBirth) {
            errors.push('Date of birth is required for agents');
        }
        if (!data.fullAddress?.trim()) {
            errors.push('Full address is required for agents');
        }
        if (!data.city?.trim()) {
            errors.push('City is required for agents');
        }
        if (!data.zipCode?.trim()) {
            errors.push('Zip code is required for agents');
        }
    }

    return errors;
};

export const validateLoginForm = (data: Partial<LoginUserRequest>): string[] => {
    const errors: string[] = [];

    if (!data.email?.trim()) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.password) {
        errors.push('Password is required');
    }

    if (!data.userType) {
        errors.push('User type is required');
    }

    return errors;
};
