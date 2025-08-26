import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, FileText, X, CheckCircle, Star, Shield, Calendar, MapIcon } from 'lucide-react';

interface RequestReviewProps {
  formData: {
    title: string;
    address: string;
    city: string;
    state: string;
    urgency: string;
    category: string;
    subCategory: string;
    specificAreas?: string;
    knownIssues?: string;
    [key: string]: any;
  };
  selectedTier: string;
  selectedAdditionalServices: any[];
  onClose: () => void;
  onPay: () => void;
  onPost: () => void;
}

const RequestReview: React.FC<RequestReviewProps> = ({
  formData,
  selectedTier,
  selectedAdditionalServices,
  onClose,
  onPay,
  onPost,
}) => {
  // Calculate estimated price with enhanced logic
  const estimatedPrice = React.useMemo(() => {
    let basePrice = 0;
    
    switch (selectedTier) {
      case 'basic':
        basePrice = 50;
        break;
      case 'standard':
        basePrice = 150;
        break;
      case 'premium':
        basePrice = 250;
        break;
      default:
        basePrice = 50;
    }
    
    const additionalPrice = selectedAdditionalServices?.reduce((total, service) => {
      return total + (service.price || 0);
    }, 0) || 0;
    
    return basePrice + additionalPrice;
  }, [selectedTier, selectedAdditionalServices]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatUrgency = (urgency: string) => {
    const urgencyMap = {
      'same_day': { label: 'Same Day', color: 'bg-red-100 text-red-800 border-red-200' },
      'within_24h': { label: 'Within 24 Hours', color: 'bg-orange-100 text-orange-800 border-orange-200' },
      'within_3_days': { label: 'Within 3 Days', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      'within_week': { label: 'Within a Week', color: 'bg-green-100 text-green-800 border-green-200' },
      'flexible': { label: 'Flexible', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    };
    
    return urgencyMap[urgency as keyof typeof urgencyMap] || { 
      label: urgency || 'Not specified', 
      color: 'bg-gray-100 text-gray-800 border-gray-200' 
    };
  };

  const getTierInfo = (tier: string) => {
    const tierMap = {
      'basic': { 
        icon: <Shield className="h-4 w-4" />, 
        color: 'bg-blue-500', 
        description: 'Essential inspection with detailed documentation' 
      },
      'standard': { 
        icon: <Star className="h-4 w-4" />, 
        color: 'bg-purple-500', 
        description: 'Comprehensive inspection with advanced features' 
      },
      'premium': { 
        icon: <CheckCircle className="h-4 w-4" />, 
        color: 'bg-gold-500', 
        description: 'Premium inspection with all features included' 
      },
    };
    
    return tierMap[tier as keyof typeof tierMap] || tierMap.basic;
  };

  const getFullAddress = () => {
    const parts = [formData.address, formData.city, formData.state].filter(Boolean);
    return parts.join(', ') || 'Not specified';
  };

  const urgencyInfo = formatUrgency(formData.urgency);
  const tierInfo = getTierInfo(selectedTier);

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl transform transition-all duration-300">
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Review Request</h1>
              <p className="text-blue-100 text-sm">Confirm details before proceeding</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
              aria-label="Close review"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Compact Request Details */}
          <div className="space-y-4">
            {/* Title & Category in one row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Title</label>
                <p className="text-sm font-medium text-gray-900 bg-gray-50 p-2 rounded border">
                  {formData.title || 'Not specified'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Category</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">
                  {formData.category || 'Not specified'}
                </p>
              </div>
            </div>

            {/* Location & Urgency - compact cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <div>
                    <h3 className="text-xs font-medium text-gray-700">Location</h3>
                    <p className="text-sm text-gray-900 truncate">{getFullAddress()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <div>
                    <h3 className="text-xs font-medium text-gray-700">Urgency</h3>
                    <Badge className={`${urgencyInfo.color} text-xs px-2 py-0.5`}>
                      {urgencyInfo.label}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Tier - compact */}
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${tierInfo.color} rounded-lg text-white`}>
                  {tierInfo.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 capitalize">{selectedTier} Inspection</h3>
                  <p className="text-xs text-gray-600">{tierInfo.description}</p>
                </div>
              </div>
            </div>

            {/* Additional Services - compact */}
            {selectedAdditionalServices && selectedAdditionalServices.length > 0 && (
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-2">Additional Services</label>
                <div className="flex flex-wrap gap-2">
                  {selectedAdditionalServices.map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                      {service.name || service.id || `Service ${index + 1}`}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Compact Pricing */}
          <div className="bg-green-50 rounded-lg border border-green-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-900">Total Price</span>
              </div>
              <span className="text-xl font-bold text-green-600">
                {formatPrice(estimatedPrice)}
              </span>
            </div>
          </div>

          {/* Compact Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 h-10 text-sm"
            >
              Edit
            </Button>
            
            <Button 
              onClick={onPost} 
              variant="secondary"
              className="flex-1 h-10 text-sm"
            >
              Post Only
            </Button>
            
            <Button 
              onClick={onPay} 
              className="flex-1 h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium"
            >
              Pay & Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestReview;
