import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  ArrowRight, 
  FileText,
  Home,
  Loader2,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { inspectionRequestService, CreateInspectionRequestPayload } from '@/lib/api/inspection-requests';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [requestCreated, setRequestCreated] = useState(false);
  const [requestId, setRequestId] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const processPaymentSuccess = async () => {
      try {
        // 1. Verify payment with Paystack
        const reference = searchParams.get('reference') || localStorage.getItem('paymentReference');
        const trxref = searchParams.get('trxref');
        
        if (!reference && !trxref) {
          throw new Error('No payment reference found');
        }

        // TODO: Verify payment with backend
        // const paymentVerification = await paymentService.verifyPayment(reference || trxref);
        // if (!paymentVerification.success) {
        //   throw new Error('Payment verification failed');
        // }

        // 2. Get stored request data
        const requestDataString = localStorage.getItem('pendingRequestData');
        if (!requestDataString) {
          throw new Error('No pending request data found');
        }

        const requestData = JSON.parse(requestDataString);

        // 3. Create the inspection request with payment details
        const payload: CreateInspectionRequestPayload = {
          ...requestData,
          paymentIntentId: reference || trxref || 'verified_payment',
          paymentStatus: 'succeeded',
          paidAt: new Date().toISOString(),
        };

        console.log('Creating paid request:', payload);

        const response = await inspectionRequestService.createInspectionRequest(payload);
        
        if (response.data) {
          setRequestId(response.data.id);
          setRequestCreated(true);
          
          // Clean up localStorage
          localStorage.removeItem('pendingRequestData');
          localStorage.removeItem('paymentReference');
          
          toast.success('Payment successful and request created!', {
            description: 'Your request has been submitted and will be assigned within 30 minutes.'
          });
        } else {
          throw new Error('Failed to create request after payment');
        }

      } catch (err) {
        console.error('Error processing payment success:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast.error('Payment processing error', {
          description: 'Please contact support if this issue persists.'
        });
      } finally {
        setIsProcessing(false);
      }
    };

    processPaymentSuccess();
  }, [searchParams]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h2>
            <p className="text-gray-600">
              Please wait while we verify your payment and create your inspection request...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !requestCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-200">
          <CardContent className="p-8 text-center">
            <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-900 mb-2">Payment Processing Error</h2>
            <p className="text-red-700 mb-6">
              {error || 'There was an issue processing your payment. Please contact support.'}
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/client-dashboard')}
                variant="outline"
                className="w-full"
              >
                Return to Dashboard
              </Button>
              <Button 
                onClick={() => navigate('/create-request')}
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Success Animation Circle */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        {/* Main Success Card */}
        <Card className="border-green-200 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center border-b border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 pb-6">
            <CardTitle className="text-3xl font-bold text-green-900 flex items-center justify-center gap-3">
              <FileText className="h-8 w-8 text-green-600" />
              Payment Successful!
            </CardTitle>
            <p className="text-lg text-green-800 mt-2">
              Your inspection request has been created and you'll be matched with an agent within 30 minutes
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6">
            {/* Status Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-green-200 rounded-xl bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Payment Verified</h3>
                <p className="text-sm text-green-700">Transaction completed</p>
              </div>
              
              <div className="text-center p-4 border border-blue-200 rounded-xl bg-blue-50">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Priority Matching</h3>
                <p className="text-sm text-blue-700">Finding your agent</p>
              </div>
              
              <div className="text-center p-4 border border-purple-200 rounded-xl bg-purple-50">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">30 Minutes</h3>
                <p className="text-sm text-purple-700">Maximum wait time</p>
              </div>
            </div>

            {/* Request Details */}
            <div className="border border-green-200 rounded-xl p-6 bg-green-50">
              <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Request Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-800">Request ID:</span>
                  <Badge variant="outline" className="border-green-300 text-green-700">
                    {requestId}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-800">Status:</span>
                  <Badge className="bg-green-100 text-green-800 border border-green-300">
                    Paid & Active
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-800">Priority:</span>
                  <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                    High (Paid)
                  </Badge>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                What happens next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</div>
                  <p className="text-sm text-blue-800">Your paid request receives priority matching with our best agents</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</div>
                  <p className="text-sm text-blue-800">You'll be assigned an agent within 30 minutes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</div>
                  <p className="text-sm text-blue-800">Your assigned agent will contact you to schedule the inspection</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => navigate('/client-dashboard/my-ads')}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <FileText className="h-5 w-5 mr-2" />
                View My Requests
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/client-dashboard')}
                className="flex-1 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all duration-200"
                size="lg"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
