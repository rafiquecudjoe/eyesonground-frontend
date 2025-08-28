import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  XCircle, 
  ArrowLeft, 
  CreditCard, 
  AlertCircle,
  Home,
  RefreshCw
} from 'lucide-react';

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get error details from URL params or default messages
  const errorMessage = searchParams.get('message') || 'Payment could not be processed';
  const reference = searchParams.get('reference') || searchParams.get('trxref');

  const handleTryAgain = () => {
    // Try to restore the form data if available
    const requestDataString = localStorage.getItem('pendingRequestData');
    if (requestDataString) {
      // Redirect back to create request with existing data
      navigate('/create-request', { state: { restoreData: JSON.parse(requestDataString) } });
    } else {
      navigate('/create-request');
    }
  };

  const handleContactSupport = () => {
    // You can implement contact support functionality here
    // For now, we'll navigate to dashboard where they can find support info
    navigate('/client-dashboard/overview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Error Animation Circle */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <XCircle className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        {/* Main Error Card */}
        <Card className="border-red-200 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center border-b border-red-200 bg-gradient-to-r from-red-50 to-orange-50 pb-6">
            <CardTitle className="text-3xl font-bold text-red-900 flex items-center justify-center gap-3">
              <CreditCard className="h-8 w-8 text-red-600" />
              Payment Failed
            </CardTitle>
            <p className="text-lg text-red-800 mt-2">
              There was an issue processing your payment
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6">
            {/* Error Details */}
            <div className="border border-red-200 rounded-xl p-6 bg-red-50">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Error Details</h3>
                  <p className="text-red-800 mb-3">{errorMessage}</p>
                  {reference && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-red-700">Reference:</span>
                      <Badge variant="outline" className="border-red-300 text-red-700 text-xs">
                        {reference}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Common Issues */}
            <div className="border border-orange-200 rounded-xl p-6 bg-orange-50">
              <h3 className="font-semibold text-orange-900 mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Common Issues & Solutions
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="text-sm font-medium text-orange-900">Insufficient Funds</p>
                    <p className="text-xs text-orange-800">Check your account balance and try again</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="text-sm font-medium text-orange-900">Card Declined</p>
                    <p className="text-xs text-orange-800">Contact your bank or try a different payment method</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <p className="text-sm font-medium text-orange-900">Network Issues</p>
                    <p className="text-xs text-orange-800">Check your internet connection and try again</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <p className="text-sm font-medium text-orange-900">Expired Card</p>
                    <p className="text-xs text-orange-800">Update your payment information</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What You Can Do */}
            <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                What you can do
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</div>
                  <p className="text-sm text-blue-800">Try the payment again with the same or different payment method</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</div>
                  <p className="text-sm text-blue-800">Contact your bank to ensure your card is enabled for online payments</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</div>
                  <p className="text-sm text-blue-800">If the issue persists, contact our support team for assistance</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={handleTryAgain}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Try Payment Again
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/client-dashboard')}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                size="lg"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </div>

            {/* Support Section */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                Still having trouble? Our support team is here to help.
              </p>
              <Button 
                variant="ghost" 
                onClick={handleContactSupport}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                Contact Support
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentFailed;
