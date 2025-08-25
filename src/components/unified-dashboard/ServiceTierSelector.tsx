import { useState } from 'react';
import { Check, Star, Clock, Camera, Video, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  SERVICE_TIERS, 
  ADDITIONAL_SERVICES, 
  ServiceTier, 
  ServiceTierDetails, 
  AdditionalService,
  calculateTotalPrice 
} from '@/lib/pricing/service-tiers';

interface ServiceTierSelectorProps {
  selectedTier: ServiceTier;
  onTierChange: (tier: ServiceTier) => void;
  selectedAdditionalServices: AdditionalService[];
  onAdditionalServicesChange: (services: AdditionalService[]) => void;
  className?: string;
}

export const ServiceTierSelector = ({
  selectedTier,
  onTierChange,
  selectedAdditionalServices,
  onAdditionalServicesChange,
  className = ''
}: ServiceTierSelectorProps) => {
  const [showAdditionalServices, setShowAdditionalServices] = useState(false);

  const getTierIcon = (tier: ServiceTierDetails) => {
    switch (tier.id) {
      case 'basic':
        return <Camera className="h-6 w-6" />;
      case 'standard':
        return <Video className="h-6 w-6" />;
      case 'premium':
        return <Phone className="h-6 w-6" />;
      default:
        return <Camera className="h-6 w-6" />;
    }
  };

  const handleAdditionalServiceToggle = (service: AdditionalService) => {
    const isCurrentlySelected = selectedAdditionalServices.some(s => s.id === service.id);
    
    if (isCurrentlySelected) {
      onAdditionalServicesChange(
        selectedAdditionalServices.filter(s => s.id !== service.id)
      );
    } else {
      onAdditionalServicesChange([
        ...selectedAdditionalServices,
        { ...service, included: true }
      ]);
    }
  };

  const totalPrice = calculateTotalPrice(selectedTier, selectedAdditionalServices);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Service Tier Selection */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-[rgba(13,38,75,1)] mb-2">
            Choose Your Service Level
          </h3>
          <p className="text-[rgba(13,38,75,0.7)]">
            Select the inspection package that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SERVICE_TIERS.map((tier) => (
            <Card
              key={tier.id}
              className={`relative cursor-pointer transition-all duration-300 border-2 ${
                selectedTier === tier.id
                  ? 'border-[rgba(42,100,186,1)] bg-[rgba(42,100,186,0.05)] shadow-lg'
                  : 'border-[rgba(42,100,186,0.2)] hover:border-[rgba(42,100,186,0.4)] bg-white/80'
              }`}
              onClick={() => onTierChange(tier.id)}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  <div className={`p-3 rounded-full ${
                    selectedTier === tier.id 
                      ? 'bg-[rgba(42,100,186,1)] text-white' 
                      : 'bg-[rgba(42,100,186,0.1)] text-[rgba(42,100,186,1)]'
                  }`}>
                    {getTierIcon(tier)}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-[rgba(13,38,75,1)]">
                  {tier.name}
                </CardTitle>
                <div className="text-3xl font-bold text-[rgba(42,100,186,1)]">
                  ${tier.price}
                </div>
                <p className="text-sm text-[rgba(13,38,75,0.7)]">
                  {tier.description}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Clock className="h-4 w-4 text-[rgba(42,100,186,1)]" />
                  <span className="text-sm text-[rgba(13,38,75,0.8)]">
                    {tier.deliveryTime}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[rgba(13,38,75,0.8)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {selectedTier === tier.id && (
                  <div className="mt-4 p-3 bg-[rgba(42,100,186,0.1)] rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[rgba(42,100,186,1)]" />
                      <span className="text-sm font-medium text-[rgba(42,100,186,1)]">
                        Selected
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-[rgba(13,38,75,1)]">
            Additional Services
          </h4>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAdditionalServices(!showAdditionalServices)}
            className="text-[rgba(42,100,186,1)]"
          >
            {showAdditionalServices ? 'Hide' : 'Show'} Add-ons
          </Button>
        </div>

        {showAdditionalServices && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADDITIONAL_SERVICES.map((service) => {
              const isSelected = selectedAdditionalServices.some(s => s.id === service.id);
              
              return (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-[rgba(42,100,186,1)] bg-[rgba(42,100,186,0.05)]'
                      : 'border-[rgba(42,100,186,0.2)] hover:border-[rgba(42,100,186,0.4)]'
                  }`}
                  onClick={() => handleAdditionalServiceToggle(service)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleAdditionalServiceToggle(service)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-[rgba(13,38,75,1)]">
                            {service.name}
                          </h5>
                          <span className="font-bold text-[rgba(42,100,186,1)]">
                            +${service.price}
                          </span>
                        </div>
                        <p className="text-sm text-[rgba(13,38,75,0.7)]">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Summary */}
      <Card className="bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] border-[rgba(42,100,186,0.3)]">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[rgba(13,38,75,0.8)]">
                {SERVICE_TIERS.find(t => t.id === selectedTier)?.name}
              </span>
              <span className="font-medium text-[rgba(13,38,75,1)]">
                ${SERVICE_TIERS.find(t => t.id === selectedTier)?.price}
              </span>
            </div>
            
            {selectedAdditionalServices.map((service) => (
              <div key={service.id} className="flex justify-between items-center text-sm">
                <span className="text-[rgba(13,38,75,0.7)]">
                  {service.name}
                </span>
                <span className="text-[rgba(13,38,75,0.8)]">
                  +${service.price}
                </span>
              </div>
            ))}
            
            <hr className="border-[rgba(42,100,186,0.2)]" />
            
            <div className="flex justify-between items-center font-bold text-lg">
              <span className="text-[rgba(13,38,75,1)]">Total</span>
              <span className="text-[rgba(42,100,186,1)]">${totalPrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
