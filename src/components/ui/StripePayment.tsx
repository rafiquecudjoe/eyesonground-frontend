import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { paymentService } from '@/services/paymentService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  metadata?: Record<string, any>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onError, metadata }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setPaymentError(null);

    try {
      // Create payment intent
      const { clientSecret, paymentIntentId } = await paymentService.createPaymentIntent(
        amount,
        metadata
      );

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setPaymentError(error.message || 'Payment failed');
        onError(error.message || 'Payment failed');
      } else {
        onSuccess(paymentIntentId);
      }
    } catch (err: any) {
      setPaymentError(err.message);
      onError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border rounded-md">
            <CardElement options={cardElementOptions} />
          </div>

          {paymentError && (
            <Alert variant="destructive">
              <AlertDescription>{paymentError}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Total Amount:</span>
            <span className="font-semibold">${amount.toFixed(2)}</span>
          </div>

          <Button
            type="submit"
            disabled={!stripe || processing}
            className="w-full"
          >
            {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

interface StripePaymentProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  metadata?: Record<string, any>;
}

export const StripePayment: React.FC<StripePaymentProps> = (props) => {
  const stripePromise = paymentService.getStripe();

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};
