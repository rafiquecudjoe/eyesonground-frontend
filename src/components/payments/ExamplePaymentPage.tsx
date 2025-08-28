// Example usage of HybridPayment component
import React from 'react';
import { HybridPayment } from '@/components/payments/HybridPayment';

const ExamplePaymentPage: React.FC = () => {
  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log('Payment successful:', paymentIntentId);
    // Handle successful payment - redirect, show success message, etc.
    alert('Payment successful! Payment ID: ' + paymentIntentId);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    // Handle payment error - show error message, log, etc.
    alert('Payment failed: ' + error);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Service Details</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p><strong>Service:</strong> Property Inspection</p>
          <p><strong>Agent:</strong> John Smith</p>
          <p><strong>Property:</strong> 123 Main St, City, State</p>
          <p><strong>Date:</strong> March 15, 2024</p>
          <p className="text-xl font-bold mt-2">Total: $150.00</p>
        </div>
      </div>

      <HybridPayment
        amount={150}
        description="Property inspection service payment"
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        serviceDetails={{
          inspectionType: 'Property Inspection',
          propertyAddress: '123 Main St, City, State',
          agentName: 'John Smith',
          scheduledDate: 'March 15, 2024'
        }}
        metadata={{
          serviceId: 'service_123',
          userId: 'user_456',
          bookingId: 'booking_789'
        }}
      >
        Pay $150.00
      </HybridPayment>
    </div>
  );
};

export default ExamplePaymentPage;
