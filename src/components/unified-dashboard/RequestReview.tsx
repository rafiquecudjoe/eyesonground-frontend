import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ServiceTierDetails, SERVICE_TIERS, calculateTotalPrice } from '@/lib/pricing/service-tiers';

interface RequestReviewProps {
  formData: any;
  selectedTier: ServiceTierDetails['id'];
  selectedAdditionalServices: any[];
  onClose: () => void;
  onPay: () => void;
  onPost: () => void;
}

export const RequestReview = ({ formData, selectedTier, selectedAdditionalServices, onClose, onPay, onPost }: RequestReviewProps) => {
  const tier = SERVICE_TIERS.find(t => t.id === selectedTier);
  const total = calculateTotalPrice(selectedTier as any, selectedAdditionalServices || []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-w-2xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Review your request</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Title</h4>
                <div className="text-sm text-[rgba(13,38,75,0.7)]">{formData.title}</div>
              </div>

              <div>
                <h4 className="font-medium">Location</h4>
                <div className="text-sm text-[rgba(13,38,75,0.7)]">{formData.address} — {formData.city}, {formData.state}</div>
              </div>

              <div>
                <h4 className="font-medium">Service Tier</h4>
                <div className="text-sm text-[rgba(13,38,75,0.7)]">{tier?.name} — ${tier?.price}</div>
              </div>

              <div>
                <h4 className="font-medium">Add-ons</h4>
                <div className="text-sm text-[rgba(13,38,75,0.7)] space-y-1">
                  {selectedAdditionalServices.length === 0 && <div>None</div>}
                  {selectedAdditionalServices.map(s => (
                    <div key={s.id}>{s.name} {s.units ? `(${s.units} units)` : ''} — ${s.id === 'travel_surcharge' ? ((s.units || 0) * s.price).toFixed(2) : s.price}</div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between font-bold text-lg">
                <div>Total</div>
                <div>${total}</div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={onClose}>Edit</Button>
                {total > 0 ? (
                  <Button onClick={onPay}>Proceed to Payment</Button>
                ) : (
                  <Button onClick={onPost}>Post Request</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestReview;
