// Enhanced Payment service for new Stripe integration
import { configService } from '@/config/environment';

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

export interface SavedPaymentMethod {
    id: string;
    type: string;
    card?: {
        brand: string;
        last4: string;
        exp_month: number;
        exp_year: number;
    };
    created: number;
}

export interface CreateStripePaymentIntentPayload {
    amount: number; // Amount in dollars (will be converted to cents)
    currency?: string;
    savePaymentMethod?: boolean; // NEW: Option to save payment method
    description?: string;
    metadata?: {
        requestId?: string;
        userId?: string;
        customerEmail?: string;
        [key: string]: string;
    };
}

export interface CreateCheckoutSessionPayload {
    amount: number;
    currency?: string;
    description?: string;
    successUrl: string;
    cancelUrl: string;
    serviceDetails?: {
        inspectionType?: string;
        propertyAddress?: string;
        agentName?: string;
        scheduledDate?: string;
    };
    metadata?: Record<string, string>;
}

export interface CheckoutSessionResponse {
    sessionId: string;
    url: string;
    paymentIntentId?: string;
}

export interface PayWithSavedMethodPayload {
    paymentMethodId: string;
    amount: number;
    currency?: string;
}

class PaymentService {
    private getHeaders() {
        return configService.getApiHeaders();
    }

    private getApiUrl(endpoint: string): string {
        return configService.getApiUrl(endpoint);
    }

    /**
     * Create a payment intent for Stripe
     */
    async createPaymentIntent(payload: CreateStripePaymentIntentPayload): Promise<StripePaymentIntent> {
        try {
            const response = await fetch(this.getApiUrl('api/v1/payments/create-payment-intent'), {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Failed to create payment intent');
            }

            return {
                id: data.data.paymentIntentId,
                amount: data.data.amount,
                currency: data.data.currency,
                client_secret: data.data.clientSecret,
                status: 'requires_payment_method',
                createdAt: new Date().toISOString(),
                metadata: payload.metadata
            };
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    }

    /**
     * Get user's saved payment methods
     */
    async getSavedPaymentMethods(): Promise<SavedPaymentMethod[]> {
        try {
            const response = await fetch(this.getApiUrl('api/v1/payments/saved-methods'), {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch saved payment methods');
            }

            return data.data || [];
        } catch (error) {
            console.error('Error fetching saved payment methods:', error);
            throw error;
        }
    }

    /**
     * Pay with saved payment method
     */
    async payWithSavedMethod(payload: PayWithSavedMethodPayload): Promise<{ success: boolean; paymentIntentId: string; amount: number; status: string; paidAt?: string }> {
        try {
            const response = await fetch(this.getApiUrl('api/v1/payments/pay-with-saved'), {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Payment with saved method failed');
            }

            return {
                success: true,
                paymentIntentId: data.data.paymentIntentId,
                amount: data.data.amount,
                status: data.data.status,
                paidAt: data.data.status === 'succeeded' ? new Date().toISOString() : undefined
            };
        } catch (error) {
            console.error('Error paying with saved method:', error);
            throw error;
        }
    }

    /**
     * Remove saved payment method
     */
    async removeSavedPaymentMethod(paymentMethodId: string): Promise<{ success: boolean; message: string }> {
        try {
            const response = await fetch(this.getApiUrl(`api/v1/payments/remove-saved-method/${paymentMethodId}`), {
                method: 'POST',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Failed to remove payment method');
            }

            return { success: true, message: 'Payment method removed successfully' };
        } catch (error) {
            console.error('Error removing saved payment method:', error);
            throw error;
        }
    }

    /**
     * Confirm payment (for tracking purposes)
     */
    async confirmPayment(paymentIntentId: string): Promise<PaymentVerification> {
        try {
            const response = await fetch(this.getApiUrl('api/v1/payments/confirm-with-method'), {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ paymentIntentId })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Payment confirmation failed');
            }

            return {
                success: true,
                paymentIntentId: data.data.paymentIntentId,
                amount: data.data.amount,
                status: data.data.status
            };
        } catch (error) {
            console.error('Error confirming payment:', error);
            throw error;
        }
    }

    /**
     * Get payment status
     */
    async getPaymentStatus(paymentIntentId: string): Promise<PaymentVerification> {
        try {
            const response = await fetch(this.getApiUrl(`api/v1/payments/status/${paymentIntentId}`), {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Failed to get payment status');
            }

            return {
                success: true,
                paymentIntentId: data.data.paymentIntentId,
                amount: data.data.amount / 100, // Convert from cents to dollars
                status: data.data.status,
                paidAt: data.data.status === 'succeeded' ? new Date().toISOString() : undefined
            };
        } catch (error) {
            console.error('Error getting payment status:', error);
            throw error;
        }
    }

    /**
     * Process refund
     */
    async refundPayment(paymentIntentId: string, amount?: number, reason?: string): Promise<any> {
        try {
            const response = await fetch(this.getApiUrl('api/v1/payments/refund'), {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    paymentIntentId,
                    amount,
                    reason,
                    metadata: { refundedAt: new Date().toISOString() }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Refund failed');
            }

            return data.data;
        } catch (error) {
            console.error('Error processing refund:', error);
            throw error;
        }
    }

    /**
     * Create Stripe Checkout session for multiple payment methods
     */
    async createCheckoutSession(payload: CreateCheckoutSessionPayload): Promise<CheckoutSessionResponse> {
        try {
            const response = await fetch(this.getApiUrl('api/v1/payments/create-checkout-session'), {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Check if response contains an error message
            if (data.error || (data.message && data.message.includes('error'))) {
                throw new Error(data.message || 'Failed to create checkout session');
            }

            // Ensure we have the required data
            if (!data.data || !data.data.sessionId || !data.data.url) {
                throw new Error('Invalid response: missing session data');
            }

            return {
                sessionId: data.data.sessionId,
                url: data.data.url,
                paymentIntentId: data.data.paymentIntentId
            };
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }
    }

    /**
     * Redirect to Stripe Checkout
     */
    redirectToStripeCheckout(checkoutUrl: string): void {
        window.location.href = checkoutUrl;
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

    /**
     * Get payment history for the current user
     */
    async getPaymentHistory(): Promise<any[]> {
        try {
            const response = await fetch(this.getApiUrl('api/v1/payments/history'), {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Check if response contains an error message
            if (data.error || (data.message && data.message.includes('error'))) {
                throw new Error(data.message || 'Failed to get payment history');
            }

            return data.data?.payments || [];
        } catch (error) {
            console.error('Error fetching payment history:', error);
            throw error;
        }
    }
}

export const paymentService = new PaymentService();
