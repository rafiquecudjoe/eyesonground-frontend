import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { configService } from '@/config/environment';

interface PaymentStatusProps {
  onReturnToDashboard?: () => void;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ onReturnToDashboard }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<{
    status: 'success' | 'cancelled' | 'processing' | 'error';
    sessionId?: string;
    message?: string;
  }>({ status: 'processing' });

  useEffect(() => {
    const payment = searchParams.get('payment');
    const sessionId = searchParams.get('session_id');

    if (payment === 'success' && sessionId) {
      // Verify the payment session with your backend
      verifyPaymentSession(sessionId);
    } else if (payment === 'cancelled') {
      setPaymentStatus({ 
        status: 'cancelled',
        message: 'Payment was cancelled. You can try again or contact support if you need assistance.'
      });
      setIsLoading(false);
    } else {
      setPaymentStatus({ 
        status: 'error',
        message: 'Invalid payment status. Please contact support.'
      });
      setIsLoading(false);
    }
  }, [searchParams]);

  const verifyPaymentSession = async (sessionId: string) => {
    try {
      const response = await fetch(configService.getApiUrl(`api/v1/payments/verify-session/${sessionId}`), {
        method: 'GET',
        headers: configService.getApiHeaders(),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setPaymentStatus({
            status: 'success',
            sessionId,
            message: 'Your payment has been processed successfully!'
          });
        } else {
          setPaymentStatus({
            status: 'error',
            message: result.message || 'Payment verification failed.'
          });
        }
      } else {
        setPaymentStatus({
          status: 'error',
          message: 'Unable to verify payment. Please contact support.'
        });
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentStatus({
        status: 'error',
        message: 'Payment verification failed. Please contact support.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnToDashboard = () => {
    if (onReturnToDashboard) {
      onReturnToDashboard();
    } else {
      navigate('/dashboard');
    }
  };

  const handleTryAgain = () => {
    navigate(-1); // Go back to previous page
  };

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Processing Payment</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-center text-gray-600">
            Please wait while we verify your payment...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {paymentStatus.status === 'success' && (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-700">Payment Successful</span>
            </>
          )}
          {paymentStatus.status === 'cancelled' && (
            <>
              <XCircle className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-700">Payment Cancelled</span>
            </>
          )}
          {paymentStatus.status === 'error' && (
            <>
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-700">Payment Error</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className={
          paymentStatus.status === 'success' ? 'border-green-200 bg-green-50' :
          paymentStatus.status === 'cancelled' ? 'border-yellow-200 bg-yellow-50' :
          'border-red-200 bg-red-50'
        }>
          <AlertDescription>
            {paymentStatus.message}
          </AlertDescription>
        </Alert>

        {paymentStatus.sessionId && (
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            <strong>Session ID:</strong> {paymentStatus.sessionId}
          </div>
        )}

        <div className="flex space-x-2 pt-4">
          {paymentStatus.status === 'success' && (
            <Button 
              onClick={handleReturnToDashboard}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Return to Dashboard
            </Button>
          )}
          
          {(paymentStatus.status === 'cancelled' || paymentStatus.status === 'error') && (
            <>
              <Button 
                variant="outline" 
                onClick={handleReturnToDashboard}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                onClick={handleTryAgain}
                className="flex-1"
              >
                Try Again
              </Button>
            </>
          )}
        </div>

        {paymentStatus.status === 'success' && (
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentStatus;
