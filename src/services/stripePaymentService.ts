import { loadStripe } from '@stripe/stripe-js';
import { configService } from '@/config/environment';
import { paymentService as apiPaymentService } from '@/lib/api/payment';

// Adapter class to bridge the gap between the old and new payment services
class StripePaymentService {
    private stripe = loadStripe(configService.stripe.publishableKey);

    // Get Stripe instance for Elements
    getStripe() {
        return this.stripe;
    }

    // Get saved payment methods
    async getSavedPaymentMethods() {
        return await apiPaymentService.getSavedPaymentMethods();
    }

    // Create payment intent with simple parameters
    async createPaymentIntent(amount: number, savePaymentMethod?: boolean, metadata?: Record<string, any>) {
        const result = await apiPaymentService.createPaymentIntent({
            amount,
            savePaymentMethod,
            metadata
        });

        return {
            clientSecret: result.client_secret,
            paymentIntentId: result.id
        };
    }

    // Process payment with card element
    async processPayment({
        cardElement,
        amount,
        description,
        savePaymentMethod = false,
        metadata
    }: {
        cardElement: any;
        amount: number;
        description?: string;
        savePaymentMethod?: boolean;
        metadata?: Record<string, any>;
    }) {
        const stripe = await this.stripe;
        if (!stripe) {
            throw new Error('Stripe not initialized');
        }

        try {
            // Create payment intent
            const { clientSecret } = await this.createPaymentIntent(amount, savePaymentMethod, metadata);

            // Confirm payment with card
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            return result;
        } catch (error) {
            console.error('Error processing payment:', error);
            throw error;
        }
    }

    // Process payment with saved method
    async processPaymentWithSavedMethod({
        paymentMethodId,
        amount,
        description,
        metadata
    }: {
        paymentMethodId: string;
        amount: number;
        description?: string;
        metadata?: Record<string, any>;
    }) {
        try {
            const result = await apiPaymentService.payWithSavedMethod({
                paymentMethodId,
                amount,
                currency: 'usd'
            });

            return { paymentIntent: result, error: null };
        } catch (error) {
            console.error('Error processing payment with saved method:', error);
            return { paymentIntent: null, error: { message: error instanceof Error ? error.message : 'Payment failed' } };
        }
    }

    // Delete saved payment method
    async deleteSavedPaymentMethod(paymentMethodId: string) {
        return await apiPaymentService.removeSavedPaymentMethod(paymentMethodId);
    }

    // Remove saved payment method (alias for deleteSavedPaymentMethod)
    async removeSavedPaymentMethod(paymentMethodId: string) {
        return await this.deleteSavedPaymentMethod(paymentMethodId);
    }

    // Pay with saved method (simplified interface)
    async payWithSavedMethod(paymentMethodId: string, amount: number) {
        const result = await apiPaymentService.payWithSavedMethod({
            paymentMethodId,
            amount,
            currency: 'usd'
        });
        return result;
    }

    // Confirm payment intent
    async confirmPaymentIntent(paymentIntentId: string) {
        return await apiPaymentService.confirmPayment(paymentIntentId);
    }
}

export const paymentService = new StripePaymentService();
