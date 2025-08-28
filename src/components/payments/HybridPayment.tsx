import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { paymentService } from '@/services/paymentService';
import { paymentService as apiPaymentService } from '@/lib/api/payment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Lock, Shield, Check, ExternalLink, Banknote, Smartphone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SecureStripePayment } from './StripePayment';

interface HybridPaymentProps {
  amount: number;
  description?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  metadata?: Record<string, any>;
  children: React.ReactNode;
  showSecurityInfo?: boolean;
  disabled?: boolean;
  serviceDetails?: {
    inspectionType?: string;
    propertyAddress?: string;
    agentName?: string;
    scheduledDate?: string;
  };
}

// Threshold for showing Stripe Checkout vs custom form
const CHECKOUT_THRESHOLD = 100; // $100

export const HybridPayment: React.FC<HybridPaymentProps> = ({
  amount,
  description,
  onSuccess,
  onError,
  metadata,
  children,
  showSecurityInfo = true,
  disabled = false,
  serviceDetails,
}) => {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'checkout' | 'custom' | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  // Determine best payment method based on amount and user preferences
  const shouldUseCheckout = amount >= CHECKOUT_THRESHOLD;

  const handlePaymentMethodChoice = (method: 'checkout' | 'custom') => {
    setPaymentMethod(method);
  };

  const handleStripeCheckout = async () => {
    try {
      setIsCreatingSession(true);

      const currentUrl = window.location.origin + window.location.pathname;
      const checkoutPayload = {
        amount,
        description: description || `Payment for ${serviceDetails?.inspectionType || 'inspection service'}`,
        successUrl: `${currentUrl}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${currentUrl}?payment=cancelled`,
        serviceDetails,
        metadata,
      };

      const session = await apiPaymentService.createCheckoutSession(checkoutPayload);
      
      // Redirect to Stripe Checkout
      apiPaymentService.redirectToStripeCheckout(session.url);
      
    } catch (error) {
      console.error('Checkout session creation failed:', error);
      onError(error instanceof Error ? error.message : 'Failed to create checkout session');
    } finally {
      setIsCreatingSession(false);
    }
  };

  const PaymentMethodSelector = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose Payment Method</h3>
      
      {/* Stripe Checkout Option */}
      <Card className="cursor-pointer hover:border-blue-500 transition-colors" 
            onClick={() => handlePaymentMethodChoice('checkout')}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <ExternalLink className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">Stripe Checkout</h4>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Recommended
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Multiple payment options: Cards, Apple Pay, Google Pay, Bank transfers
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <CreditCard className="h-3 w-3" />
                  <span>All Cards</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Smartphone className="h-3 w-3" />
                  <span>Mobile Wallets</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Banknote className="h-3 w-3" />
                  <span>Bank Transfer</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Form Option */}
      <Card className="cursor-pointer hover:border-blue-500 transition-colors" 
            onClick={() => handlePaymentMethodChoice('custom')}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Credit/Debit Card</h4>
              <p className="text-sm text-gray-600 mt-1">
                Pay directly with your card (with option to save for future)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {amount >= CHECKOUT_THRESHOLD && (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            For payments over ${CHECKOUT_THRESHOLD}, we recommend Stripe Checkout for access to more payment methods and better security.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

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
            {shouldUseCheckout && (
              <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-white/30">
                Multiple Options
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment - ${amount.toFixed(2)}</DialogTitle>
            <DialogDescription>
              {shouldUseCheckout 
                ? "Choose your preferred payment method for the best experience."
                : "Complete your payment securely using your preferred method."
              }
            </DialogDescription>
          </DialogHeader>
          
          {!paymentMethod ? (
            <PaymentMethodSelector />
          ) : paymentMethod === 'checkout' ? (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Redirecting to Stripe Checkout</h3>
                <p className="text-sm text-gray-600 mb-4">
                  You'll be redirected to a secure payment page with multiple payment options.
                </p>
                
                <Button 
                  onClick={handleStripeCheckout} 
                  disabled={isCreatingSession}
                  className="w-full bg-[#635bff] hover:bg-[#5851f7] text-white"
                >
                  {isCreatingSession ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Session...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Continue to Stripe Checkout
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setPaymentMethod(null)}
                  className="w-full mt-2"
                  disabled={isCreatingSession}
                >
                  Back to Payment Options
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Pay with Card</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setPaymentMethod(null)}
                >
                  Change Method
                </Button>
              </div>
              
              <Elements stripe={paymentService.getStripe()}>
                <SecureStripePayment
                  amount={amount}
                  description={description}
                  onSuccess={onSuccess}
                  onError={onError}
                  metadata={metadata}
                  showSecurityInfo={false}
                  showSaveOption={true}
                >
                  Pay ${amount.toFixed(2)}
                </SecureStripePayment>
              </Elements>
            </div>
          )}
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

export default HybridPayment;
