import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FormProgressProps {
  formData: any;
  selectedServiceTier: string;
  photoFiles: File[];
  className?: string;
}

export const FormProgress = ({ formData, selectedServiceTier, photoFiles, className = '' }: FormProgressProps) => {
  const requiredFields = [
    { key: 'title', label: 'Request Title' },
    { key: 'category', label: 'Category' },
    { key: 'location', label: 'Location' },
    { key: 'address', label: 'Address' },
    { key: 'urgency', label: 'Timeline' },
    { key: 'description', label: 'Description' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'recordingConsent', label: 'Recording Consent' }
  ];

  const importantFields = [
    { key: 'accessInstructions', label: 'Access Instructions' },
    { key: 'contactPhone', label: 'Contact Phone' },
    { key: 'specificAreas', label: 'Specific Areas' },
    { key: 'preferredContact', label: 'Contact Method' }
  ];

  const completedRequired = requiredFields.filter(field => {
    const value = formData[field.key];
    return field.key === 'recordingConsent' ? value === true : value && value.trim() !== '';
  });

  const completedImportant = importantFields.filter(field => {
    const value = formData[field.key];
    return value && value.trim() !== '';
  });

  const hasPhotos = photoFiles.length > 0;
  const hasServiceTier = selectedServiceTier !== '';

  const requiredProgress = (completedRequired.length / requiredFields.length) * 100;
  const overallProgress = (
    (completedRequired.length + completedImportant.length + (hasPhotos ? 1 : 0) + (hasServiceTier ? 1 : 0)) /
    (requiredFields.length + importantFields.length + 2)
  ) * 100;

  const getStatusIcon = (isCompleted: boolean, isRequired: boolean = false) => {
    if (isCompleted) {
      return <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />;
    }
    if (isRequired) {
      return <AlertCircle className="h-3 w-3 text-red-500 flex-shrink-0" />;
    }
    return <Circle className="h-3 w-3 text-gray-400 flex-shrink-0" />;
  };

  return (
    <div className={`bg-white/90 backdrop-blur-sm border border-[rgba(42,100,186,0.1)] rounded-xl p-3 ${className}`}>
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-[rgba(13,38,75,1)]">Progress</h3>
            <span className="text-sm font-bold text-[rgba(42,100,186,1)]">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-red-600 mb-2">Required Fields</h4>
            <div className="space-y-1">
              {requiredFields.map(field => {
                const isCompleted = completedRequired.some(c => c.key === field.key);
                return (
                  <div key={field.key} className="flex items-center gap-2 text-xs">
                    {getStatusIcon(isCompleted, true)}
                    <span className={isCompleted ? 'text-green-600' : 'text-red-500'}>
                      {field.label}
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center gap-2 text-xs">
                {getStatusIcon(hasServiceTier, true)}
                <span className={hasServiceTier ? 'text-green-600' : 'text-red-500'}>
                  Service Tier Selected
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-[rgba(42,100,186,1)] mb-2">Recommended Fields</h4>
            <div className="space-y-1">
              {importantFields.map(field => {
                const isCompleted = completedImportant.some(c => c.key === field.key);
                return (
                  <div key={field.key} className="flex items-center gap-2 text-xs">
                    {getStatusIcon(isCompleted)}
                    <span className={isCompleted ? 'text-green-600' : 'text-[rgba(13,38,75,0.7)}'}>
                      {field.label}
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center gap-2 text-xs">
                {getStatusIcon(hasPhotos)}
                <span className={hasPhotos ? 'text-green-600' : 'text-[rgba(13,38,75,0.7)}'}>
                  Reference Photos
                </span>
              </div>
            </div>
          </div>
        </div>

        {requiredProgress < 100 && (
          <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600">
              Please complete all required fields to submit your request.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
