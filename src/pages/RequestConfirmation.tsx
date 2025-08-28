import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  Eye, 
  ArrowRight, 
  FileText,
  Home,
  Sparkles
} from 'lucide-react';

const RequestConfirmation = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/client-dashboard/my-ads');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Success Animation Circle */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-yellow-500 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Main Success Card */}
        <Card className="border-[rgba(42,100,186,0.2)] shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center border-b border-[rgba(42,100,186,0.1)] bg-gradient-to-r from-[rgba(42,100,186,0.05)] to-[rgba(13,38,75,0.05)] pb-6">
            <CardTitle className="text-3xl font-bold text-[rgba(13,38,75,1)] flex items-center justify-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              Request Posted Successfully!
            </CardTitle>
            <p className="text-lg text-[rgba(13,38,75,0.7)] mt-2">
              Your inspection request is now live and visible to qualified agents
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6">
            {/* Status Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-green-200 rounded-xl bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-[rgba(13,38,75,1)]">Posted</h3>
                <p className="text-sm text-[rgba(13,38,75,0.7)]">Request is live</p>
              </div>
              
              <div className="text-center p-4 border border-blue-200 rounded-xl bg-blue-50">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-[rgba(13,38,75,1)]">Notifying</h3>
                <p className="text-sm text-[rgba(13,38,75,0.7)]">Agents being alerted</p>
              </div>
              
              <div className="text-center p-4 border border-purple-200 rounded-xl bg-purple-50">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-[rgba(13,38,75,1)]">Waiting</h3>
                <p className="text-sm text-[rgba(13,38,75,0.7)]">For applications</p>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="border border-[rgba(42,100,186,0.2)] rounded-xl p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                What happens next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</div>
                  <p className="text-sm text-[rgba(13,38,75,0.8)]">Qualified agents in your area will receive notifications about your request</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</div>
                  <p className="text-sm text-[rgba(13,38,75,0.8)]">Interested agents will submit applications with their profiles and quotes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</div>
                  <p className="text-sm text-[rgba(13,38,75,0.8)]">You'll receive notifications and can review applications in your dashboard</p>
                </div>
              </div>
            </div>

            {/* Auto Redirect Notice */}
            <div className="text-center p-4 border border-yellow-200 rounded-xl bg-yellow-50">
              <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-[rgba(13,38,75,0.8)]">
                Automatically redirecting to your requests in <Badge variant="secondary" className="mx-1">{countdown}s</Badge>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => navigate('/client-dashboard/my-ads')}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <FileText className="h-5 w-5 mr-2" />
                View My Requests
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/client-dashboard')}
                className="flex-1 border-[rgba(42,100,186,0.3)] text-[rgba(13,38,75,1)] hover:bg-[rgba(42,100,186,0.05)] hover:border-[rgba(42,100,186,0.5)] transition-all duration-200"
                size="lg"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="text-center">
          <p className="text-sm text-[rgba(13,38,75,0.6)]">
            Need help? <button className="text-blue-600 hover:text-blue-700 underline">Contact Support</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestConfirmation;
