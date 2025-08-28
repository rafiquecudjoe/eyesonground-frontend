// Payment service for handling Stripe integration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export interface StripePaymentIntent {
    id: string;
    amount: number;
    currency: string;
    client_secret: string;
    status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
    createdAt: string;
    metadata?: Record<string, string>;
}

export interface PaymentVerification {
    success: boolean;
    paymentIntentId: string;
    amount: number;
    status: string;
    paidAt?: string;
    charges?: any;
}

export interface CreateStripePaymentIntentPayload {
    amount: number; // Amount in dollars (will be converted to cents)
    currency?: string;
    description?: string;
    metadata?: {
        requestId?: string;
        userId?: string;
        customerEmail?: string;
        [key: string]: string;
    };
    return_url?: string;
}

class PaymentService {
    private getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        };
    }

    /**
     * Create a payment intent for Stripe
     */
    async createPaymentIntent(payload: CreateStripePaymentIntentPayload): Promise<StripePaymentIntent> {
        try {
            const requestPayload = {
                ...payload,
                amount: Math.round(payload.amount * 100), // Convert dollars to cents for Stripe
                currency: payload.currency || 'usd'
            };

            const response = await fetch(`${API_BASE_URL}/api/v1/payments/stripe/create-intent`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(requestPayload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    }

    /**
     * Verify payment with Stripe
     */
    async verifyPayment(paymentIntentId: string): Promise<PaymentVerification> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/payments/stripe/verify/${paymentIntentId}`, {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw error;
        }
    }

    /**
     * Get payment status
     */
    async getPaymentStatus(reference: string): Promise<PaymentVerification> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/payments/status/${reference}`, {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error getting payment status:', error);
            throw error;
        }
    }

    /**
     * Redirect to Paystack payment page
     */
    redirectToPaystack(authorizationUrl: string): void {
        window.location.href = authorizationUrl;
    }

    /**
     * Generate unique payment reference
     */
    generatePaymentReference(): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        return `EOG_${timestamp}_${random}`;
    }
}

export const paymentService = new PaymentService();
