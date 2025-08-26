import { loadStripe, Stripe } from '@stripe/stripe-js';

class PaymentService {
    private stripe: Promise<Stripe | null>;
    private baseUrl: string;

    constructor() {
        // Initialize Stripe with your publishable key
        this.stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');
        this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    }

    async createPaymentIntent(amount: number, metadata?: Record<string, any>) {
        try {
            const response = await fetch(`${this.baseUrl}/payments/create-payment-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    currency: 'usd',
                    metadata,
                }),
            });

            if (!response.ok) {
                throw new Error(`Payment intent creation failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    }

    async confirmPayment(clientSecret: string, returnUrl?: string) {
        const stripe = await this.stripe;
        if (!stripe) {
            throw new Error('Stripe not initialized');
        }

        try {
            const result = await stripe.confirmPayment({
                clientSecret,
                confirmParams: {
                    return_url: returnUrl || window.location.href,
                },
            });

            return result;
        } catch (error) {
            console.error('Error confirming payment:', error);
            throw error;
        }
    }

    async confirmPaymentIntent(paymentIntentId: string) {
        try {
            const response = await fetch(`${this.baseUrl}/payments/confirm/${paymentIntentId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Payment confirmation failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error confirming payment intent:', error);
            throw error;
        }
    }

    getStripe() {
        return this.stripe;
    }
}

export const paymentService = new PaymentService();
