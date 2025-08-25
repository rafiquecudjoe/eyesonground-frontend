import { useState } from 'react';
import { Clock, Shield, User, FileText, AlertTriangle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InspectionDetailsFormProps {
  formData: {
    specificAreas: string;
    knownIssues: string;
    accessInstructions: string;
    contactPerson: string;
    contactPhone: string;
    preferredContact: string;
    availabilityWindow: string;
    specialRequirements: string;
    safetyConsiderations: string;
    recordingConsent: boolean;
    certificationRequirements: string[];
  };
  onChange: (field: string, value: any) => void;
}

export const InspectionDetailsForm = ({ formData, onChange }: InspectionDetailsFormProps) => {
  const [availableCertifications] = useState([
    'Licensed Home Inspector',
    'ASI Certified',
    'Automotive Technician',
    'Real Estate Professional',
    'Electronics Specialist',
    'HVAC Certified',
    'Structural Engineer',
    'Insurance Adjuster'
  ]);

  const handleCertificationChange = (certification: string, checked: boolean) => {
    const current = formData.certificationRequirements || [];
    if (checked) {
      onChange('certificationRequirements', [...current, certification]);
    } else {
      onChange('certificationRequirements', current.filter(c => c !== certification));
    }
  };

  return (
    <div className="space-y-6">
      {/* Specific Inspection Requirements */}
      <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
        <CardHeader>
          <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
            <FileText className="h-5 w-5 text-[rgba(42,100,186,1)]" />
            Inspection Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="specificAreas">Specific Areas/Aspects to Focus On</Label>
            <Textarea
              id="specificAreas"
              placeholder="e.g., Engine condition, electrical systems, structural integrity, specific rooms..."
              value={formData.specificAreas}
              onChange={(e) => onChange('specificAreas', e.target.value)}
              className="min-h-[80px] rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="knownIssues">Known Issues or Concerns</Label>
            <Textarea
              id="knownIssues"
              placeholder="Describe any known problems, damage, or specific concerns you want investigated..."
              value={formData.knownIssues}
              onChange={(e) => onChange('knownIssues', e.target.value)}
              className="min-h-[80px] rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="safetyConsiderations">Safety Considerations or Hazards</Label>
            <Textarea
              id="safetyConsiderations"
              placeholder="Any safety concerns, hazardous materials, restricted areas, or special precautions..."
              value={formData.safetyConsiderations}
              onChange={(e) => onChange('safetyConsiderations', e.target.value)}
              className="min-h-[60px] rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Access & Contact Information */}
      <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
        <CardHeader>
          <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
            <User className="h-5 w-5 text-[rgba(42,100,186,1)]" />
            Access & Contact Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accessInstructions">Property Access Instructions</Label>
            <Textarea
              id="accessInstructions"
              placeholder="Key location, entry codes, gate access, parking instructions, etc..."
              value={formData.accessInstructions}
              onChange={(e) => onChange('accessInstructions', e.target.value)}
              className="min-h-[80px] rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">On-site Contact Person</Label>
              <Input
                id="contactPerson"
                placeholder="Name of person agent can contact"
                value={formData.contactPerson}
                onChange={(e) => onChange('contactPerson', e.target.value)}
                className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone Number</Label>
              <Input
                id="contactPhone"
                placeholder="Phone number for day of inspection"
                value={formData.contactPhone}
                onChange={(e) => onChange('contactPhone', e.target.value)}
                className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredContact">Preferred Contact Method</Label>
            <Select value={formData.preferredContact} onValueChange={(value) => onChange('preferredContact', value)}>
              <SelectTrigger className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                <SelectValue placeholder="How should the agent contact you?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="text">Text Message</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="app">In-App Messaging</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Scheduling & Availability */}
      <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
        <CardHeader>
          <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[rgba(42,100,186,1)]" />
            Scheduling Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="availabilityWindow">Your Availability</Label>
            <Select value={formData.availabilityWindow} onValueChange={(value) => onChange('availabilityWindow', value)}>
              <SelectTrigger className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                <SelectValue placeholder="When are you available?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekdays-morning">Weekdays (9 AM - 12 PM)</SelectItem>
                <SelectItem value="weekdays-afternoon">Weekdays (12 PM - 5 PM)</SelectItem>
                <SelectItem value="weekdays-evening">Weekdays (5 PM - 8 PM)</SelectItem>
                <SelectItem value="weekends">Weekends Only</SelectItem>
                <SelectItem value="anytime">Anytime</SelectItem>
                <SelectItem value="flexible">Flexible (Will coordinate)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements">Special Requirements</Label>
            <Textarea
              id="specialRequirements"
              placeholder="Scheduling constraints, appointment preferences, or special accommodations needed..."
              value={formData.specialRequirements}
              onChange={(e) => onChange('specialRequirements', e.target.value)}
              className="min-h-[60px] rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Agent Requirements */}
      <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
        <CardHeader>
          <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
            <Shield className="h-5 w-5 text-[rgba(42,100,186,1)]" />
            Agent Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Required Certifications/Expertise</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableCertifications.map((cert) => (
                <div key={cert} className="flex items-center space-x-2">
                  <Checkbox
                    id={cert}
                    checked={formData.certificationRequirements?.includes(cert) || false}
                    onCheckedChange={(checked) => handleCertificationChange(cert, checked as boolean)}
                  />
                  <Label htmlFor={cert} className="text-sm text-[rgba(13,38,75,0.8)]">
                    {cert}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consent & Legal */}
      <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
        <CardHeader>
          <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[rgba(42,100,186,1)]" />
            Consent & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="recordingConsent"
              checked={formData.recordingConsent}
              onCheckedChange={(checked) => onChange('recordingConsent', checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="recordingConsent" className="text-sm font-medium text-[rgba(13,38,75,1)]">
                Recording & Documentation Consent
              </Label>
              <p className="text-sm text-[rgba(13,38,75,0.7)]">
                I consent to the recording, photographing, and documentation of the inspection for the purposes of 
                providing the requested services. I understand that these materials may be shared with me and used 
                for quality assurance purposes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
