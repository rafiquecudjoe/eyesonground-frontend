// API Configuration
export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    endpoints: {
        users: {
            register: '/api/v1/users/register',
            login: '/api/v1/users/login',
        },
    },
} as const;

// API Response Types
export interface ApiResponse<T = any> {
    status: number;
    message: string;
    data?: T;
}

export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

// User Types
export type UserType = 'client' | 'agent';

export interface RegisterUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: UserType;
    dateOfBirth?: string; // ISO date string
    fullAddress?: string;
    city?: string;
    zipCode?: string;
}

export interface LoginUserRequest {
    email: string;
    password: string;
    userType: UserType;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userType: UserType;
    dateOfBirth?: string;
    fullAddress?: string;
    city?: string;
    zipCode?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    jwtExpiresIn: string;
}

export interface AuthUserData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    userType: UserType;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    jwtExpiresIn: string;
    userData: AuthUserData;
}

export interface RegisterUserResponse extends AuthResponse { }
export interface LoginUserResponse extends AuthResponse { }
