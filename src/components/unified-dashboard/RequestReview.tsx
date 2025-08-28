import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  MapPin, 
  Settings, 
  DollarSign, 
  Send,
  Edit3,
  X,
  CheckCircle2,
  Package
} from 'lucide-react';
import { ServiceTierDetails, SERVICE_TIERS, calculateTotalPrice } from '@/lib/pricing/service-tiers';
import { StripeCheckout } from '@/components/payments/StripeCheckout';
import { TokenStorage } from '@/lib/api/token-storage';

interface RequestReviewProps {
  formData: any;
  selectedTier: ServiceTierDetails['id'];
  selectedAdditionalServices: any[];
  onClose: () => void;
  onPay: () => void;
  onPost: () => void;
}

export const RequestReview = ({ formData, selectedTier, selectedAdditionalServices, onClose, onPay, onPost }: RequestReviewProps) => {
  // Get current user data for payment metadata
  const userData = TokenStorage.getUserData();
  const userId = userData?.id?.toString() || 'unknown_user';
  const tier = SERVICE_TIERS.find(t => t.id === selectedTier);
  const total = calculateTotalPrice(selectedTier as any, selectedAdditionalServices || []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-[rgba(42,100,186,0.2)] shadow-2xl">
          <CardHeader className="relative border-b border-[rgba(42,100,186,0.1)] bg-gradient-to-r from-[rgba(42,100,186,0.05)] to-[rgba(13,38,75,0.05)] pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-[rgba(13,38,75,1)]">Review Your Request</CardTitle>
                  <p className="text-sm text-[rgba(13,38,75,0.7)] mt-1">
                    Verify all details before submitting your inspection request
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="hover:bg-[rgba(42,100,186,0.1)] text-[rgba(13,38,75,0.7)]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Request Details */}
              <div className="space-y-6">
                {/* Request Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                    <h3 className="font-semibold text-[rgba(13,38,75,1)]">Request Information</h3>
                  </div>
                  
                  <div className="border border-[rgba(42,100,186,0.2)] rounded-lg p-4 bg-[rgba(42,100,186,0.02)]">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs font-medium text-[rgba(13,38,75,0.6)] uppercase tracking-wide">
                          Request Title
                        </Label>
                        <p className="text-sm font-medium text-[rgba(13,38,75,1)] mt-1">
                          {formData.title}
                        </p>
                      </div>
                      
                      {formData.description && (
                        <div>
                          <Label className="text-xs font-medium text-[rgba(13,38,75,0.6)] uppercase tracking-wide">
                            Description
                          </Label>
                          <p className="text-sm text-[rgba(13,38,75,0.8)] mt-1 leading-relaxed">
                            {formData.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                    <h3 className="font-semibold text-[rgba(13,38,75,1)]">Location Details</h3>
                  </div>
                  
                  <div className="border border-[rgba(42,100,186,0.2)] rounded-lg p-4 bg-[rgba(42,100,186,0.02)]">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[rgba(13,38,75,1)]">
                        {formData.address}
                      </p>
                      <p className="text-sm text-[rgba(13,38,75,0.8)]">
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                    <h3 className="font-semibold text-[rgba(13,38,75,1)]">Service Configuration</h3>
                  </div>
                  
                  <div className="border border-[rgba(42,100,186,0.2)] rounded-lg p-4 bg-[rgba(42,100,186,0.02)]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[rgba(13,38,75,1)]">{tier?.name}</p>
                          <p className="text-xs text-[rgba(13,38,75,0.6)]">{tier?.description}</p>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border border-blue-200">
                          ${tier?.price}
                        </Badge>
                      </div>
                      
                      {selectedAdditionalServices.length > 0 && (
                        <>
                          <Separator className="border-[rgba(42,100,186,0.2)]" />
                          <div>
                            <p className="text-sm font-medium text-[rgba(13,38,75,1)] mb-2">Additional Services</p>
                            <div className="space-y-2">
                              {selectedAdditionalServices.map(service => (
                                <div key={service.id} className="flex items-center justify-between text-sm">
                                  <span className="text-[rgba(13,38,75,0.8)]">
                                    {service.name} {service.units ? `(${service.units} units)` : ''}
                                  </span>
                                  <span className="font-medium text-[rgba(13,38,75,1)]">
                                    ${service.id === 'travel_surcharge' 
                                      ? ((service.units || 0) * service.price).toFixed(2) 
                                      : service.price}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing & Actions */}
              <div className="space-y-6">
                {/* Pricing Summary */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                    <h3 className="font-semibold text-[rgba(13,38,75,1)]">Pricing Summary</h3>
                  </div>
                  
                  <div className="border border-[rgba(42,100,186,0.2)] rounded-lg p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[rgba(13,38,75,0.8)]">Base Service</span>
                        <span className="font-medium text-[rgba(13,38,75,1)]">${tier?.price}</span>
                      </div>
                      
                      {selectedAdditionalServices.length > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[rgba(13,38,75,0.8)]">Additional Services</span>
                          <span className="font-medium text-[rgba(13,38,75,1)]">
                            ${(total - (tier?.price || 0)).toFixed(2)}
                          </span>
                        </div>
                      )}
                      
                      <Separator className="border-green-300" />
                      
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span className="text-[rgba(13,38,75,1)]">Total Amount</span>
                        <span className="text-green-700">${total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                    <h3 className="font-semibold text-[rgba(13,38,75,1)]">Submission Options</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Post Only Button */}
                    <Button 
                      onClick={onPost}
                      variant="outline"
                      className="w-full border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.05)] text-[rgba(13,38,75,1)] h-12"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Post Request Only
                      <Badge variant="outline" className="ml-2 border-green-300 text-green-700">
                        Free
                      </Badge>
                    </Button>
                    
                    <div className="text-xs text-[rgba(13,38,75,0.6)] text-center px-2">
                      Post your request to connect with qualified agents. We use a hybrid approach to match you with the best inspectors for your needs.
                    </div>

                    {/* Pay Now Button */}
                    {total > 0 && (
                      <>
                        <div className="relative my-4">
                          <Separator className="border-[rgba(42,100,186,0.2)]" />
                          <div className="absolute inset-0 flex justify-center">
                            <span className="bg-white px-3 text-xs text-[rgba(13,38,75,0.6)]">or</span>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => {
                            console.log('🔥 Pay Now button clicked');
                            console.log('📋 Form data:', formData);
                            console.log('💰 Total amount:', total);
                            onPay();
                          }}
                          className="w-full h-12 bg-gradient-to-r from-[#2a64ba] to-[#1e4a87] hover:from-[#1e4a87] hover:to-[#0d264b] text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <DollarSign className="h-4 w-4" />
                          Pay Now (${total.toFixed(2)})
                        </Button>
                        
                        <div className="text-xs text-[rgba(13,38,75,0.6)] text-center px-2">
                          Secure checkout powered by Stripe. Request will be prioritized and assigned immediately.
                        </div>
                      </>
                    )}

                    {/* Edit Button */}
                    <Separator className="border-[rgba(42,100,186,0.2)] my-4" />
                    
                    <Button 
                      variant="ghost" 
                      onClick={onClose}
                      className="w-full text-[rgba(13,38,75,0.7)] hover:bg-[rgba(42,100,186,0.05)] h-10"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Request Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestReview;
