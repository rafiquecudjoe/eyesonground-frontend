import { Clock, Lightbulb, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RequestTips = () => {
  return (
    <div className="space-y-3">
      {/* Completion Time */}
      <Card className="bg-gradient-to-br from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.05)] border-[rgba(42,100,186,0.2)]">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[rgba(42,100,186,0.1)] rounded-lg">
              <Clock className="h-3 w-3 text-[rgba(42,100,186,1)]" />
            </div>
            <div>
              <h4 className="text-xs font-medium text-[rgba(13,38,75,1)]">Estimated Time</h4>
              <p className="text-xs text-[rgba(13,38,75,0.7)]">2-3 minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs text-[rgba(13,38,75,1)] flex items-center gap-2">
            <Lightbulb className="h-3 w-3 text-yellow-500" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <div className="space-y-1.5">
            <div className="flex items-start gap-1.5">
              <Star className="h-2.5 w-2.5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[rgba(13,38,75,0.8)]">
                Be specific about inspection areas
              </p>
            </div>
            <div className="flex items-start gap-1.5">
              <Star className="h-2.5 w-2.5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[rgba(13,38,75,0.8)]">
                Upload reference photos
              </p>
            </div>
            <div className="flex items-start gap-1.5">
              <Star className="h-2.5 w-2.5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[rgba(13,38,75,0.8)]">
                Provide clear access instructions
              </p>
            </div>
            <div className="flex items-start gap-1.5">
              <Star className="h-2.5 w-2.5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[rgba(13,38,75,0.8)]">
                Mention safety concerns upfront
              </p>
            </div>
            <div className="flex items-start gap-1.5">
              <Star className="h-2.5 w-2.5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[rgba(13,38,75,0.8)]">
                You'll be matched within 30 minutes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
