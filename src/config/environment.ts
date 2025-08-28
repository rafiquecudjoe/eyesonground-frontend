/**
 * Environment Configuration Service
 * Centralizes all environment variable management with validation
 */

import { TokenStorage } from '@/lib/api/token-storage';

interface EnvironmentConfig {
    // API Configuration
    apiBaseUrl: string;
    clientKey: string;
    clientSecret: string;

    // Stripe Configuration
    stripePublishableKey: string;

    // Environment
    isDevelopment: boolean;
    isProduction: boolean;
}

class ConfigService {
    private config: EnvironmentConfig;

    constructor() {
        this.config = this.loadConfig();
        this.validateConfig();
    }

    private loadConfig(): EnvironmentConfig {
        return {
            // API Configuration
            apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
            clientKey: import.meta.env.VITE_CLIENT_KEY || '',
            clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',

            // Stripe Configuration
            stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',

            // Environment
            isDevelopment: import.meta.env.VITE_NODE_ENV === 'development' || import.meta.env.DEV,
            isProduction: import.meta.env.VITE_NODE_ENV === 'production' || import.meta.env.PROD,
        };
    }

    private validateConfig(): void {
        const requiredKeys = [
            'stripePublishableKey',
            'apiBaseUrl'
        ];

        const missingKeys = requiredKeys.filter(key =>
            !this.config[key as keyof EnvironmentConfig]
        );

        if (missingKeys.length > 0) {
            console.warn('Missing required environment variables:', missingKeys);

            if (this.config.isProduction) {
                throw new Error(`Missing required environment variables in production: ${missingKeys.join(', ')}`);
            }
        }

        // Validate Stripe key format
        if (this.config.stripePublishableKey && !this.config.stripePublishableKey.startsWith('pk_')) {
            console.error('Invalid Stripe publishable key format. Should start with "pk_"');
        }

        // Validate API URL format
        if (this.config.apiBaseUrl && !this.config.apiBaseUrl.startsWith('http')) {
            console.warn('API Base URL should include protocol (http/https)');
        }
    }

    // Getters for accessing configuration
    get api() {
        return {
            baseUrl: this.config.apiBaseUrl,
            clientKey: this.config.clientKey,
            clientSecret: this.config.clientSecret,
        };
    }

    get stripe() {
        return {
            publishableKey: this.config.stripePublishableKey,
        };
    }

    get environment() {
        return {
            isDevelopment: this.config.isDevelopment,
            isProduction: this.config.isProduction,
        };
    }

    // Helper methods
    getApiHeaders(): Record<string, string> {
        const token = TokenStorage.getAccessToken();

        return {
            'Content-Type': 'application/json',
            ...(this.config.clientKey && { 'client-key': this.config.clientKey }),
            ...(this.config.clientSecret && { 'client-secret': this.config.clientSecret }),
            ...(token && { Authorization: `Bearer ${token}` })
        };
    }

    getApiUrl(endpoint: string): string {
        // Remove leading slash if present to avoid double slashes
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
        return `${this.config.apiBaseUrl}/${cleanEndpoint}`;
    }

    // Development helpers
    logConfig(): void {
        if (this.config.isDevelopment) {
            console.group('🔧 Environment Configuration');
            console.log('API Base URL:', this.config.apiBaseUrl);
            console.log('Stripe Key:', this.config.stripePublishableKey ? '✅ Configured' : '❌ Missing');
            console.log('Client Key:', this.config.clientKey ? '✅ Configured' : '❌ Missing');
            console.log('Environment:', this.config.isDevelopment ? 'Development' : 'Production');
            console.groupEnd();
        }
    }
}

// Export singleton instance
export const configService = new ConfigService();

// Export types for use in other files
export type { EnvironmentConfig };

// Initialize and log configuration in development
if (configService.environment.isDevelopment) {
    configService.logConfig();
}
