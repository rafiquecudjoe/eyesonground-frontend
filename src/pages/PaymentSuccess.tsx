import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  ArrowRight, 
  Home,
  Receipt,
  FileText,
  MapPin,
  DollarSign
} from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get Stripe session ID from URL
        const sessionId = searchParams.get('session_id');
        const paymentStatus = searchParams.get('payment');
        
        if (paymentStatus !== 'success' || !sessionId) {
          setError('Invalid payment parameters');
          setIsLoading(false);
          return;
        }

        // Verify payment with backend
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/payments/verify-session/${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('eyesonground_access_token')}`,
            'client-key': import.meta.env.VITE_CLIENT_KEY || '',
            'client-secret': import.meta.env.VITE_CLIENT_SECRET || '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to verify payment');
        }

        const result = await response.json();
        
        if (!result.data?.isSuccessful) {
          throw new Error('Payment verification failed');
        }

        // Set payment details
        setPaymentDetails({
          sessionId: sessionId,
          amount: (result.data.amountTotal / 100), // Convert from cents
          currency: result.data.currency?.toUpperCase() || 'USD',
          status: 'succeeded',
          customerEmail: result.data.customerEmail,
          paymentIntentId: result.data.paymentIntentId,
          confirmationNumber: `REQ-${Date.now().toString().slice(-6)}`,
          paidAt: new Date().toISOString()
        });
        
        setIsLoading(false);
        
      } catch (error) {
        console.error('Payment verification error:', error);
        setError(error instanceof Error ? error.message : 'Payment verification failed');
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error || !paymentDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-red-500 mb-4">
              <CheckCircle2 className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Error</h2>
            <p className="text-gray-600 mb-4">{error || 'There was an issue with your payment verification.'}</p>
            <Button onClick={() => navigate('/unified-dashboard')} className="w-full">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-lg text-gray-600">Your payment has been processed and confirmed.</p>
          </div>

          {/* Payment Details Card */}
          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Payment Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Amount Paid</label>
                  <p className="text-lg font-semibold text-gray-900">
                    ${paymentDetails.amount.toFixed(2)} {paymentDetails.currency}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Status</label>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {paymentDetails.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium text-gray-500">Session ID</label>
                <p className="text-sm font-mono text-gray-700 break-all">{paymentDetails.sessionId}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Confirmation Number</label>
                <p className="text-lg font-semibold text-blue-600">{paymentDetails.confirmationNumber}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Payment Date</label>
                <p className="text-sm text-gray-700">
                  {new Date(paymentDetails.paidAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Card */}
          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Payment Confirmation</p>
                    <p className="text-sm text-gray-600">Your payment has been successfully processed and confirmed.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Inspector Assignment</p>
                    <p className="text-sm text-gray-600">We'll assign a qualified inspector to your request within 2 hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Inspection Completion</p>
                    <p className="text-sm text-gray-600">Complete inspection and detailed report delivered as scheduled.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => navigate('/unified-dashboard')}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Home className="h-4 w-4 mr-2" />
              View Dashboard
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.print()}
              className="flex-1 h-12"
            >
              <Receipt className="h-4 w-4 mr-2" />
              Print Confirmation
            </Button>
          </div>

          {/* Support Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@eyesonground.com" className="text-blue-600 hover:underline">
                support@eyesonground.com
              </a>
              {' '}or call{' '}
              <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                (123) 456-7890
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
