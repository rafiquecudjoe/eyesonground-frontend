import { TokenStorage } from '@/lib/api/token-storage';

interface GeocodeResult {
    lat: number;
    lon: number;
    display_name: string;
    address?: {
        city?: string;
        state?: string;
        country?: string;
        postcode?: string;
    };
}

class GeocodingService {
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

    /**
     * Pre-validate if an address appears to be US-based
     */
    private isLikelyUSAddress(address: string): boolean {
        const addressLower = address.toLowerCase();

        // Check for common non-US indicators
        const nonUSIndicators = [
            'canada', 'uk', 'united kingdom', 'france', 'germany', 'australia',
            'mexico', 'spain', 'italy', 'japan', 'china', 'india', 'brazil',
            'london', 'paris', 'berlin', 'tokyo', 'sydney', 'toronto'
        ];

        // Check for US state abbreviations or names
        const usStatePatterns = [
            /\b(al|alabama|ak|alaska|az|arizona|ar|arkansas|ca|california|co|colorado|ct|connecticut|de|delaware|fl|florida|ga|georgia|hi|hawaii|id|idaho|il|illinois|in|indiana|ia|iowa|ks|kansas|ky|kentucky|la|louisiana|me|maine|md|maryland|ma|massachusetts|mi|michigan|mn|minnesota|ms|mississippi|mo|missouri|mt|montana|ne|nebraska|nv|nevada|nh|new hampshire|nj|new jersey|nm|new mexico|ny|new york|nc|north carolina|nd|north dakota|oh|ohio|ok|oklahoma|or|oregon|pa|pennsylvania|ri|rhode island|sc|south carolina|sd|south dakota|tn|tennessee|tx|texas|ut|utah|vt|vermont|va|virginia|wa|washington|wv|west virginia|wi|wisconsin|wy|wyoming|dc|district of columbia)\b/i
        ];

        // Check for non-US indicators
        const hasNonUSIndicator = nonUSIndicators.some(indicator =>
            addressLower.includes(indicator)
        );

        if (hasNonUSIndicator) {
            return false;
        }

        // Check for US state patterns
        const hasUSState = usStatePatterns.some(pattern =>
            pattern.test(addressLower)
        );

        // Also check for US ZIP code pattern (5 digits or 5+4 format)
        const hasUSZip = /\b\d{5}(-\d{4})?\b/.test(address);

        // If we find US indicators, it's likely US
        if (hasUSState || hasUSZip) {
            return true;
        }

        // If no clear indicators, allow it through (let the API decide)
        return true;
    }

    async geocodeAddress(address: string): Promise<{
        success: boolean;
        results: GeocodeResult[];
    }> {
        if (!this.isAuthenticated()) {
            console.error('User not authenticated for geocoding');
            throw new Error('Authentication required for geocoding services');
        }

        // Pre-validate US address
        if (!this.isLikelyUSAddress(address)) {
            throw new Error('Please enter a valid US address. International addresses are not supported.');
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/v1/geocoding/geocode`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ address }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error(`Authentication failed: Please login to use geocoding services`);
                }
                if (response.status === 403) {
                    throw new Error(`Access denied: Insufficient permissions for geocoding`);
                }
                if (response.status === 400) {
                    const errorData = await response.json().catch(() => null);
                    if (errorData?.message?.includes('United States')) {
                        throw new Error(`Please enter a valid US address. International addresses are not supported.`);
                    }
                }
                throw new Error(`Geocoding failed: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            return {
                success: result.success || true,
                results: result.data || [],
            };
        } catch (error) {
            console.error('Error geocoding address:', error);
            throw error;
        }
    }

    /**
     * Check if coordinates are within US boundaries
     */
    private isWithinUSBounds(lat: number, lon: number): boolean {
        // Continental US boundaries (approximate)
        const continentalUS = lat >= 24.396308 && lat <= 49.384358 &&
            lon >= -125.0 && lon <= -66.93457;

        // Alaska boundaries (approximate)
        const alaska = lat >= 54.0 && lat <= 71.5 &&
            lon >= -179.0 && lon <= -129.0;

        // Hawaii boundaries (approximate)  
        const hawaii = lat >= 18.0 && lat <= 23.0 &&
            lon >= -162.0 && lon <= -154.0;

        return continentalUS || alaska || hawaii;
    }

    async reverseGeocode(lat: number, lon: number): Promise<{
        success: boolean;
        result: GeocodeResult;
    }> {
        if (!this.isAuthenticated()) {
            console.error('User not authenticated for reverse geocoding');
            throw new Error('Authentication required for reverse geocoding services');
        }

        // Pre-validate US coordinates
        if (!this.isWithinUSBounds(lat, lon)) {
            throw new Error('Coordinates are outside the United States. Only US locations are supported.');
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/v1/geocoding/reverse-geocode`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ lat, lon }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error(`Authentication failed: Please login to use reverse geocoding services`);
                }
                if (response.status === 403) {
                    throw new Error(`Access denied: Insufficient permissions for reverse geocoding`);
                }
                if (response.status === 400) {
                    const errorData = await response.json().catch(() => null);
                    if (errorData?.message?.includes('United States')) {
                        throw new Error(`Location is outside the United States. Only US locations are supported.`);
                    }
                }
                throw new Error(`Reverse geocoding failed: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            return {
                success: result.success || true,
                result: result.data,
            };
        } catch (error) {
            console.error('Error reverse geocoding:', error);
            throw error;
        }
    }

    async validateAddress(address: string): Promise<{
        isValid: boolean;
        success: boolean;
    }> {
        if (!this.isAuthenticated()) {
            console.warn('User not authenticated for address validation, using fallback');
            // For validation, we can try to continue without auth as fallback
        }

        try {
            const encodedAddress = encodeURIComponent(address);
            const response = await fetch(`${this.baseUrl}/api/v1/geocoding/validate?address=${encodedAddress}`, {
                method: 'GET',
                headers: this.getAuthHeaders(),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.error('Authentication failed for address validation');
                    throw new Error(`Authentication required for address validation`);
                }
                if (response.status === 403) {
                    console.error('Access denied for address validation');
                    throw new Error(`Access denied for address validation`);
                }
                throw new Error(`Address validation failed: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            return {
                success: result.success || true,
                isValid: result.data?.isValid || false,
            };
        } catch (error) {
            console.error('Error validating address:', error);
            // Fallback: Use geocoding to validate if user is authenticated
            if (this.isAuthenticated()) {
                try {
                    console.log('Attempting fallback validation using geocoding...');
                    const geocodeResult = await this.geocodeAddress(address);
                    return {
                        success: true,
                        isValid: geocodeResult.success && geocodeResult.results.length > 0,
                    };
                } catch (fallbackError) {
                    console.error('Fallback validation also failed:', fallbackError);
                }
            }

            return {
                success: false,
                isValid: false,
            };
        }
    }

    /**
     * Debug method to check authentication status
     */
    checkAuthStatus(): { isAuthenticated: boolean; token: string | null } {
        const token = TokenStorage.getAccessToken();
        return {
            isAuthenticated: !!token,
            token: token ? `${token.substring(0, 10)}...` : null
        };
    }
}

export const geocodingService = new GeocodingService();
export type { GeocodeResult };
