import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { paymentService } from '@/services/stripePaymentService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Lock, Shield, Check, Trash2, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaymentFormProps {
  amount: number;
  description?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  metadata?: Record<string, any>;
  onClose: () => void;
  showSaveOption?: boolean;
}

interface SavedPaymentMethod {
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

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  description,
  onSuccess, 
  onError, 
  metadata,
  onClose,
  showSaveOption = true
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [savedMethods, setSavedMethods] = useState<SavedPaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('new');
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [loadingSavedMethods, setLoadingSavedMethods] = useState(false);

  // Load saved payment methods on component mount
  useEffect(() => {
    loadSavedMethods();
  }, []);

  const loadSavedMethods = async () => {
    try {
      setLoadingSavedMethods(true);
      const methods = await paymentService.getSavedPaymentMethods();
      setSavedMethods(methods);
    } catch (error) {
      console.warn('Could not load saved payment methods:', error);
      // Don't show error to user as this is optional functionality
    } finally {
      setLoadingSavedMethods(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setPaymentError(null);

    try {
      if (selectedMethod !== 'new') {
        // Pay with saved method
        const result = await paymentService.payWithSavedMethod(selectedMethod, amount);
        onSuccess(result.paymentIntentId);
        onClose();
        return;
      }

      // Create new payment intent
      const { clientSecret, paymentIntentId } = await paymentService.createPaymentIntent(
        amount,
        savePaymentMethod,
        metadata
      );

      // Confirm payment with new card
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
        // Confirm with backend for tracking
        await paymentService.confirmPaymentIntent(paymentIntentId);
        onSuccess(paymentIntentId);
        onClose();
        
        // Reload saved methods if user saved the payment method
        if (savePaymentMethod) {
          setTimeout(() => loadSavedMethods(), 1000);
        }
      }
    } catch (err: any) {
      setPaymentError(err.message);
      onError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const removeSavedMethod = async (methodId: string) => {
    try {
      await paymentService.removeSavedPaymentMethod(methodId);
      setSavedMethods(prev => prev.filter(method => method.id !== methodId));
      if (selectedMethod === methodId) {
        setSelectedMethod('new');
      }
    } catch (error: any) {
      setPaymentError(error.message || 'Failed to remove payment method');
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
          {/* Saved Payment Methods Section */}
          {!loadingSavedMethods && savedMethods.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Choose Payment Method</label>
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add New Card
                    </div>
                  </SelectItem>
                  {savedMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span className="capitalize">{method.card?.brand}</span>
                          <span>•••• {method.card?.last4}</span>
                          <span className="text-xs text-gray-500">
                            {method.card?.exp_month}/{method.card?.exp_year}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Remove saved method button */}
              {selectedMethod !== 'new' && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeSavedMethod(selectedMethod)}
                  className="w-full text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove This Payment Method
                </Button>
              )}
            </div>
          )}

          {/* New Card Input - only show if new method is selected */}
          {selectedMethod === 'new' && (
            <>
              <div className="p-4 border rounded-md bg-gray-50">
                <CardElement options={cardElementOptions} />
              </div>

              {/* Save payment method option */}
              {showSaveOption && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="savePaymentMethod"
                    checked={savePaymentMethod}
                    onChange={(e) => setSavePaymentMethod(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="savePaymentMethod" className="text-sm text-gray-600">
                    Save this payment method for future use
                  </label>
                </div>
              )}
            </>
          )}

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
                  {selectedMethod === 'new' ? `Pay $${amount.toFixed(2)}` : `Pay $${amount.toFixed(2)} with saved card`}
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
  showSaveOption?: boolean;
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
  showSaveOption = false,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<SavedPaymentMethod[]>([]);
  const [selectedSavedMethod, setSelectedSavedMethod] = useState<string | null>(null);
  const [showSavedMethods, setShowSavedMethods] = useState(false);
  const [isLoadingSavedMethods, setIsLoadingSavedMethods] = useState(false);
  const [useNewCard, setUseNewCard] = useState(false);

  // Load saved payment methods when component mounts
  useEffect(() => {
    if (showSaveOption) {
      loadSavedPaymentMethods();
    }
  }, [showSaveOption]);

  const loadSavedPaymentMethods = async () => {
    try {
      setIsLoadingSavedMethods(true);
      const methods = await paymentService.getSavedPaymentMethods();
      setSavedPaymentMethods(methods);
      setShowSavedMethods(methods.length > 0);
    } catch (error) {
      console.error('Failed to load saved payment methods:', error);
    } finally {
      setIsLoadingSavedMethods(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      if (selectedSavedMethod) {
        // Use saved payment method
        const result = await paymentService.processPaymentWithSavedMethod({
          paymentMethodId: selectedSavedMethod,
          amount,
          description,
          metadata,
        });

        if (result.error) {
          onError(result.error.message);
        } else {
          onSuccess(result.paymentIntent.id);
        }
      } else {
        // Use new card
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          onError('Card element not found');
          return;
        }

        const result = await paymentService.processPayment({
          cardElement,
          amount,
          description,
          savePaymentMethod,
          metadata,
        });

        if (result.error) {
          onError(result.error.message);
        } else {
          onSuccess(result.paymentIntent.id);
          if (savePaymentMethod) {
            await loadSavedPaymentMethods();
          }
        }
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteSavedMethod = async (paymentMethodId: string) => {
    try {
      await paymentService.deleteSavedPaymentMethod(paymentMethodId);
      await loadSavedPaymentMethods();
    } catch (error) {
      onError('Failed to delete payment method');
    }
  };

  return (
    <div className="space-y-4">
      {/* Saved Payment Methods */}
      {showSavedMethods && savedPaymentMethods.length > 0 && !useNewCard && (
        <div className="space-y-3">
          <h4 className="font-medium">Saved Payment Methods</h4>
          {savedPaymentMethods.map((method) => (
            <Card 
              key={method.id} 
              className={`cursor-pointer transition-colors ${
                selectedSavedMethod === method.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedSavedMethod(method.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">
                        •••• •••• •••• {method.card?.last4}
                      </p>
                      <p className="text-sm text-gray-500">
                        {method.card?.brand.toUpperCase()} expires {method.card?.exp_month}/{method.card?.exp_year}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSavedMethod(method.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            onClick={() => setUseNewCard(true)}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Use New Card
          </Button>
        </div>
      )}

      {/* New Card Form */}
      {(!showSavedMethods || savedPaymentMethods.length === 0 || useNewCard) && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {useNewCard && (
            <Button 
              type="button"
              variant="ghost" 
              onClick={() => {
                setUseNewCard(false);
                setSelectedSavedMethod(null);
              }}
              className="text-blue-600 hover:text-blue-700"
            >
              ← Back to Saved Methods
            </Button>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Card Information</label>
            <div className="border rounded-md p-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {showSaveOption && (
            <div className="flex items-center space-x-2">
              <input
                id="save-payment"
                type="checkbox"
                checked={savePaymentMethod}
                onChange={(e) => setSavePaymentMethod(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="save-payment" className="text-sm">
                Save payment method for future purchases
              </label>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={!stripe || isProcessing || disabled}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              children
            )}
          </Button>
        </form>
      )}

      {/* Selected Saved Method Payment */}
      {selectedSavedMethod && !useNewCard && (
        <Button 
          onClick={handleSubmit}
          disabled={isProcessing || disabled}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            children
          )}
        </Button>
      )}

      {showSecurityInfo && (
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
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
