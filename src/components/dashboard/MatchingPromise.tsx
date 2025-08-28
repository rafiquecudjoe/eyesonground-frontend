import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MatchingPromiseProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export const MatchingPromise: React.FC<MatchingPromiseProps> = ({ 
  variant = 'default', 
  className = '' 
}) => {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg ${className}`}>
        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-800">
          <span className="font-medium">30-minute matching guarantee</span> - We'll find you the perfect agent
        </p>
      </div>
    );
  }

  return (
    <Card className={`border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-green-100 rounded-full">
            <Clock className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 mb-1">30-Minute Matching Guarantee</h3>
            <p className="text-sm text-green-800 mb-3">
              Our intelligent matching system will pair you with the most qualified agent in your area within 30 minutes of posting your request.
            </p>
            <div className="flex items-center gap-2 text-xs text-green-700">
              <AlertCircle className="h-3 w-3" />
              <span>If we can't find a match, we'll contact you directly to discuss alternatives</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
