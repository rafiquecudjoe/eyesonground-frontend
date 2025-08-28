import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { paymentService } from '@/services/paymentService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Lock, Shield, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface PaymentFormProps {
  amount: number;
  description?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  metadata?: Record<string, any>;
  onClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  description,
  onSuccess, 
  onError, 
  metadata,
  onClose 
}) => {
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
        onClose();
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
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Payment
        </CardTitle>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border rounded-md bg-gray-50">
            <CardElement options={cardElementOptions} />
          </div>

          {paymentError && (
            <Alert variant="destructive">
              <AlertDescription>{paymentError}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-semibold text-lg">${amount.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <Button
              type="submit"
              disabled={!stripe || processing}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Pay ${amount.toFixed(2)}
                </>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full"
              disabled={processing}
            >
              Cancel
            </Button>
          </div>

          {/* Security indicators */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Stripe Protected</span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

interface SecureStripePaymentProps {
  amount: number;
  description?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  metadata?: Record<string, any>;
  children: React.ReactNode;
  showSecurityInfo?: boolean;
  disabled?: boolean;
}

export const SecureStripePayment: React.FC<SecureStripePaymentProps> = ({
  amount,
  description,
  onSuccess,
  onError,
  metadata,
  children,
  showSecurityInfo = true,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const stripePromise = paymentService.getStripe();

  return (
    <div className="space-y-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12"
            disabled={disabled}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {children}
            <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-white/30">
              Instant
            </Badge>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Enter your payment details to complete the transaction securely.
            </DialogDescription>
          </DialogHeader>
          
          <Elements stripe={stripePromise}>
            <PaymentForm 
              amount={amount}
              description={description}
              onSuccess={onSuccess}
              onError={onError}
              metadata={metadata}
              onClose={() => setOpen(false)}
            />
          </Elements>
        </DialogContent>
      </Dialog>

      {showSecurityInfo && (
        <div className="flex items-center justify-center gap-4 text-xs text-[rgba(13,38,75,0.6)]">
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>Stripe Verified</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            <span>PCI Compliant</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Also export the basic component for backward compatibility
export const StripePayment: React.FC<{
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  metadata?: Record<string, any>;
}> = (props) => {
  const stripePromise = paymentService.getStripe();

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} onClose={() => {}} />
    </Elements>
  );
};
