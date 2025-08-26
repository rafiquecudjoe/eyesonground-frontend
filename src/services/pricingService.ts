import { TokenStorage } from '@/lib/api/token-storage';


interface ServiceTierPricing {
    basic: number;
    standard: number;
    premium: number;
}

interface AdditionalService {
    id: string;
    name: string;
    price: number;
}

interface PricingCalculation {
    basePrice: number;
    additionalServicesTotal: number;
    totalPrice: number;
    breakdown: {
        serviceTier: {
            tier: string;
            price: number;
        };
        additionalServices: AdditionalService[];
    };
}





class PricingService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    }

    private isAuthenticated(): boolean {
        const token = TokenStorage.getAccessToken();
        return !!token;
    }

    private getAuthHeaders() {
        const token = TokenStorage.getAccessToken();
        const clientKey = import.meta.env.VITE_CLIENT_KEY;
        const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

        if (!token) {
            console.warn('No authentication token found. Geocoding requests may fail.');
        }

        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
            'client-key': clientKey || '',
            'client-secret': clientSecret || '',
        };
    }

    async getServiceTierPricing(): Promise<{
        success: boolean;
        serviceTiers: ServiceTierPricing;
    }> {
        try {

            if (!this.isAuthenticated()) {
                console.error('User not authenticated for pricing');
                throw new Error('Authentication required for pricing services');
            }

            console.error('Fetching service tier pricing with auth headers:', this.getAuthHeaders());
            const response = await fetch(`${this.baseUrl}/api/v1/pricing/service-tiers`, {
                method: 'GET',
                headers: this.getAuthHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch service tier pricing: ${response.statusText}`);
            }

            const result = await response.json();

            return {
                success: result.success || true,
                serviceTiers: result.data || result
            };
        } catch (error) {
            console.error('Error fetching service tier pricing:', error);
            throw error;
        }
    }

    async getAdditionalServices(): Promise<{
        success: boolean;
        additionalServices: AdditionalService[];
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/api/v1/pricing/additional-services`, {
                method: 'GET',
                headers: this.getAuthHeaders(),

            });

            if (!response.ok) {
                throw new Error(`Failed to fetch additional services: ${response.statusText}`);
            }

            const result = await response.json();

            return {
                success: result.success || true,
                additionalServices: result.data || result
            };
        } catch (error) {
            console.error('Error fetching additional services:', error);
            throw error;
        }
    }

    async calculatePricing(
        serviceTier: 'basic' | 'standard' | 'premium',
        additionalServiceIds: string[] = []
    ): Promise<{
        success: boolean;
        pricing: PricingCalculation;
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/api/v1/pricing/calculate`, {
                method: 'POST',
                headers: this.getAuthHeaders(),

                body: JSON.stringify({
                    serviceTier,
                    additionalServiceIds,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to calculate pricing: ${response.statusText}`);
            }

            const result = await response.json();

            // Transform backend response to expected frontend format
            return {
                success: result.success || true,
                pricing: result.data || result
            };
        } catch (error) {
            console.error('Error calculating pricing:', error);
            throw error;
        }
    }
}

export const pricingService = new PricingService();
export type { ServiceTierPricing, AdditionalService, PricingCalculation };
