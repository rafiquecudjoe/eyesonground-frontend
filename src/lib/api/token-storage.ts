import { AuthTokens, AuthUserData } from './types';

const STORAGE_KEYS = {
    ACCESS_TOKEN: 'eyesonground_access_token',
    REFRESH_TOKEN: 'eyesonground_refresh_token',
    USER_DATA: 'eyesonground_user_data',
    TOKEN_EXPIRY: 'eyesonground_token_expiry',
} as const;

export class TokenStorage {
    /**
     * Store authentication tokens and user data
     */
    static storeAuthData(tokens: AuthTokens, userData: AuthUserData): void {
        try {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
            localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, tokens.jwtExpiresIn);
            localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        } catch (error) {
            console.error('Error storing auth data:', error);
        }
    }

    /**
     * Get stored access token
     */
    static getAccessToken(): string | null {
        try {
            return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        } catch (error) {
            console.error('Error getting access token:', error);
            return null;
        }
    }

    /**
     * Get stored refresh token
     */
    static getRefreshToken(): string | null {
        try {
            return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        } catch (error) {
            console.error('Error getting refresh token:', error);
            return null;
        }
    }

    /**
     * Get stored user data
     */
    static getUserData(): AuthUserData | null {
        try {
            const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    }

    /**
     * Get token expiry date
     */
    static getTokenExpiry(): string | null {
        try {
            return localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
        } catch (error) {
            console.error('Error getting token expiry:', error);
            return null;
        }
    }

    /**
     * Check if user is authenticated (has valid tokens)
     */
    static isAuthenticated(): boolean {
        const accessToken = this.getAccessToken();
        const userData = this.getUserData();
        return Boolean(accessToken && userData);
    }

    /**
     * Check if token is expired
     */
    static isTokenExpired(): boolean {
        try {
            const expiry = this.getTokenExpiry();
            if (!expiry) return true;

            const expiryDate = new Date(expiry);
            const now = new Date();
            return now >= expiryDate;
        } catch (error) {
            console.error('Error checking token expiry:', error);
            return true;
        }
    }

    /**
     * Clear all stored authentication data
     */
    static clearAuthData(): void {
        try {
            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_DATA);
            localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
        } catch (error) {
            console.error('Error clearing auth data:', error);
        }
    }

    /**
     * Update only the access token (useful for token refresh)
     */
    static updateAccessToken(accessToken: string, expiry?: string): void {
        try {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
            if (expiry) {
                localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiry);
            }
        } catch (error) {
            console.error('Error updating access token:', error);
        }
    }
}
