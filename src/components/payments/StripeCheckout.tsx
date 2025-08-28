import React, { useState } from 'react';
import { paymentService as apiPaymentService } from '@/lib/api/payment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Lock, Shield, ExternalLink } from 'lucide-react';

interface StripeCheckoutProps {
  amount: number;
  description?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  metadata?: Record<string, any>;
  children?: React.ReactNode;
}

export const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  amount,
  description = '',
  onSuccess,
  onError,
  metadata = {},
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStripeCheckout = async () => {
    setIsLoading(true);
    try {
      // Ensure we have proper absolute URLs that pass URI validation
      const baseUrl = window.location.protocol + '//' + window.location.host;
      const currentPath = window.location.pathname;
      
      // Construct valid URIs for success and cancel URLs
      const successUrl = new URL('/payment-success?payment=success&session_id={CHECKOUT_SESSION_ID}', baseUrl).toString();
      const cancelUrl = new URL('/dashboard?payment=cancelled', baseUrl).toString();
            
      const checkoutPayload = {
        amount: amount,
        description: description,
        successUrl: successUrl,
        cancelUrl: cancelUrl,
        metadata: metadata,
      };

      const session = await apiPaymentService.createCheckoutSession(checkoutPayload);

      
      // Redirect to Stripe Checkout
      apiPaymentService.redirectToStripeCheckout(session.url);
      
      // Note: Don't set loading to false here since we're redirecting away
    } catch (error) {
      console.error('Checkout session creation failed:', error);
      onError(error instanceof Error ? error.message : 'Failed to create checkout session');
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-[rgba(42,100,186,0.2)] shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-[#0d264b]">
          <CreditCard className="h-5 w-5" />
          Secure Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Security badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
            <Shield className="h-3 w-3" />
            256-bit SSL
          </div>
          <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
            <Lock className="h-3 w-3" />
            Stripe Verified
          </div>
          <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs">
            <Shield className="h-3 w-3" />
            PCI Compliant
          </div>
        </div>

        {/* Payment button */}
        <Button
          onClick={handleStripeCheckout}
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-[#2a64ba] to-[#1e4a87] hover:from-[#1e4a87] hover:to-[#0d264b] text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Creating Session...
            </div>
          ) : (
            <>
              <ExternalLink className="h-4 w-4" />
              {children || `Pay $${amount.toFixed(2)} with Stripe`}
            </>
          )}
        </Button>

        <div className="text-xs text-[rgba(13,38,75,0.6)] text-center px-2">
          You'll be redirected to Stripe's secure checkout page to complete your payment.
        </div>
      </CardContent>
    </Card>
  );
};
