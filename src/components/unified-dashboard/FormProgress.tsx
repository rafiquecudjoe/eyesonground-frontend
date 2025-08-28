import { CheckCircle, Circle, AlertCircle, Clock, FileText, MapPin, Phone, Camera, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface FormProgressProps {
  formData: any;
  selectedServiceTier: string;
  photoFiles: File[];
  className?: string;
}

export const FormProgress = ({ formData, selectedServiceTier, photoFiles, className = '' }: FormProgressProps) => {
  // Updated field structure to match new payload
  const requiredFields = [
    { key: 'title', label: 'Request Title', icon: FileText },
    { key: 'category', label: 'Category', icon: Star },
    { key: 'subCategory', label: 'Sub-Category', icon: Star },
    { key: 'state', label: 'State', icon: MapPin },
    { key: 'city', label: 'City', icon: MapPin },
    { key: 'address', label: 'Address', icon: MapPin },
    { key: 'urgency', label: 'Preferred Date', icon: Clock },
    { key: 'phoneNumber', label: 'Phone Number', icon: Phone },
    { key: 'recordingConsent', label: 'Recording Consent', icon: Camera }
  ];

  const recommendedFields = [
    { key: 'specificAreas', label: 'Specific Areas', icon: MapPin },
    { key: 'knownIssues', label: 'Known Issues', icon: AlertCircle },
    { key: 'accessInstructions', label: 'Access Instructions', icon: FileText },
    { key: 'contactPerson', label: 'Contact Person', icon: Phone },
    { key: 'contactPhone', label: 'Contact Phone', icon: Phone },
    { key: 'preferredContact', label: 'Contact Method', icon: Phone },
    { key: 'availabilityWindow', label: 'Availability Window', icon: Clock },
    { key: 'specialRequirements', label: 'Special Requirements', icon: Star },
    { key: 'safetyConsiderations', label: 'Safety Considerations', icon: AlertCircle }
  ];

  const completedRequired = requiredFields.filter(field => {
    const value = formData[field.key];
    if (field.key === 'recordingConsent') return value === true;
    return value && value.toString().trim() !== '';
  });

  const completedRecommended = recommendedFields.filter(field => {
    const value = formData[field.key];
    return value && value.toString().trim() !== '';
  });

  const hasPhotos = photoFiles.length > 0;
  const hasServiceTier = selectedServiceTier !== '';

  const requiredProgress = (completedRequired.length / requiredFields.length) * 100;
  const totalPossibleItems = requiredFields.length + recommendedFields.length + 2; // +2 for photos and service tier
  const completedItems = completedRequired.length + completedRecommended.length + (hasPhotos ? 1 : 0) + (hasServiceTier ? 1 : 0);
  const overallProgress = (completedItems / totalPossibleItems) * 100;

  const getStatusIcon = (isCompleted: boolean, isRequired: boolean = false, IconComponent = Circle) => {
    if (isCompleted) {
      return <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />;
    }
    if (isRequired) {
      return <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />;
    }
    return <IconComponent className="h-4 w-4 text-gray-400 flex-shrink-0" />;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  return (
    <div className={`bg-gradient-to-br from-white to-blue-50/30 border border-[rgba(42,100,186,0.2)] rounded-xl p-4 shadow-lg backdrop-blur-sm ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[rgba(13,38,75,1)] flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              Form Progress
            </h3>
            <Badge variant="outline" className="bg-white/80">
              <span className="text-sm font-bold text-[rgba(42,100,186,1)]">{Math.round(overallProgress)}%</span>
            </Badge>
          </div>
          <div className="relative">
            <Progress 
              value={overallProgress} 
              className={`h-3 ${getProgressColor(overallProgress)} transition-all duration-500`} 
            />
          </div>
        </div>

        {/* Required Fields Section */}
        <div className="bg-white/60 rounded-lg p-3 border border-red-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Required Fields
            </h4>
            <Badge variant={requiredProgress === 100 ? "default" : "destructive"} className="text-xs">
              {completedRequired.length}/{requiredFields.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {requiredFields.map(field => {
              const isCompleted = completedRequired.some(c => c.key === field.key);
              const IconComponent = field.icon;
              return (
                <div key={field.key} className="flex items-center gap-2 text-xs p-2 rounded-md hover:bg-white/80 transition-colors">
                  {getStatusIcon(isCompleted, true, IconComponent)}
                  <span className={`flex-1 ${isCompleted ? 'text-green-600 line-through' : 'text-red-600'}`}>
                    {field.label}
                  </span>
                  {isCompleted && <Badge variant="secondary" className="text-xs">✓</Badge>}
                </div>
              );
            })}
            {/* Service Tier */}
            <div className="flex items-center gap-2 text-xs p-2 rounded-md hover:bg-white/80 transition-colors">
              {getStatusIcon(hasServiceTier, true, Star)}
              <span className={`flex-1 ${hasServiceTier ? 'text-green-600 line-through' : 'text-red-600'}`}>
                Service Tier Selected
              </span>
              {hasServiceTier && <Badge variant="secondary" className="text-xs">{selectedServiceTier}</Badge>}
            </div>
          </div>
        </div>

        {/* Recommended Fields Section */}
        <div className="bg-white/60 rounded-lg p-3 border border-blue-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-[rgba(42,100,186,1)] flex items-center gap-1">
              <Star className="h-3 w-3" />
              Recommended Fields
            </h4>
            <Badge variant="outline" className="text-xs bg-white/80">
              {completedRecommended.length}/{recommendedFields.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {recommendedFields.map(field => {
              const isCompleted = completedRecommended.some(c => c.key === field.key);
              const IconComponent = field.icon;
              return (
                <div key={field.key} className="flex items-center gap-2 text-xs p-2 rounded-md hover:bg-white/80 transition-colors">
                  {getStatusIcon(isCompleted, false, IconComponent)}
                  <span className={`flex-1 ${isCompleted ? 'text-green-600' : 'text-[rgba(13,38,75,0.7)]'}`}>
                    {field.label}
                  </span>
                  {isCompleted && <Badge variant="secondary" className="text-xs">✓</Badge>}
                </div>
              );
            })}
            {/* Photos */}
            <div className="flex items-center gap-2 text-xs p-2 rounded-md hover:bg-white/80 transition-colors">
              {getStatusIcon(hasPhotos, false, Camera)}
              <span className={`flex-1 ${hasPhotos ? 'text-green-600' : 'text-[rgba(13,38,75,0.7)]'}`}>
                Reference Photos
              </span>
              {hasPhotos && <Badge variant="secondary" className="text-xs">{photoFiles.length} files</Badge>}
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {requiredProgress < 100 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-red-800">Required fields missing</p>
                <p className="text-xs text-red-600 mt-1">
                  Complete all required fields to submit your request.
                </p>
              </div>
            </div>
          </div>
        )}

        {requiredProgress === 100 && overallProgress < 100 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Star className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-blue-800">Good progress!</p>
                <p className="text-xs text-blue-600 mt-1">
                  Consider adding recommended fields for better results.
                </p>
              </div>
            </div>
          </div>
        )}

        {overallProgress === 100 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-green-800">Perfect!</p>
                <p className="text-xs text-green-600 mt-1">
                  Your request is complete and ready to submit.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
