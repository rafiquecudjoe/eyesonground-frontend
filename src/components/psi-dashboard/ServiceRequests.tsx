
import { useState } from "react";
import { MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

// Mock data for service requests
const mockRequests = [
  {
    id: 1,
    clientId: "342",
    clientImage: "https://randomuser.me/api/portraits/men/72.jpg",
    address: "21 brooks street 425 US",
    details: {
      dateRange: "12- sept - 14- sept",
      serviceType: "Automobile service",
      serviceSubtype: "Car repair"
    },
    amount: 30000
  },
  {
    id: 2,
    clientId: "342",
    clientImage: "https://randomuser.me/api/portraits/men/72.jpg",
    address: "21 brooks street 425 US",
    details: {
      dateRange: "12- sept - 14- sept",
      serviceType: "Automobile service",
      serviceSubtype: "Car repair"
    },
    amount: 30000
  },
  {
    id: 3,
    clientId: "342",
    clientImage: "https://randomuser.me/api/portraits/men/72.jpg",
    address: "21 brooks street 425 US",
    details: {
      dateRange: "12- sept - 14- sept",
      serviceType: "Automobile service",
      serviceSubtype: "Car repair"
    },
    amount: 30000
  }
];

export const ServiceRequests = () => {
  const isMobile = useIsMobile();

  const handleAccept = (requestId: number) => {
    console.log("Accepting request:", requestId);
    // In a real app, you would update the request status
  };

  const handleReject = (requestId: number) => {
    console.log("Rejecting request:", requestId);
    // In a real app, you would update the request status
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-6">
        {/* Service requests */}
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Matched Requests ({mockRequests.length})</h1>
          
          <div className="space-y-4">
            {mockRequests.map((request) => (
              <Card key={request.id} className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={request.clientImage} 
                      alt={`Client ${request.clientId}`} 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-medium">Client {request.clientId}</h3>
                      <p className="text-sm text-gray-500">Is requesting service request</p>
                      
                      <div className="flex items-center mt-2">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{request.address}</span>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Chat with Client
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:ml-auto flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">Details:</span>
                      <span className="text-sm">{request.details.dateRange}</span>
                      <span className="text-sm">{request.details.serviceType}</span>
                      <span className="text-sm">{request.details.serviceSubtype}</span>
                      <Link 
                        to={`/psi-dashboard/service-detail/${request.id}`} 
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View service details
                      </Link>
                    </div>
                    
                    <div className="md:ml-6 text-xl font-bold text-[rgba(13,38,75,1)]">
                      $ {request.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Button 
                    className="bg-[rgba(13,38,75,1)] hover:bg-[rgba(13,38,75,0.9)]"
                    onClick={() => handleAccept(request.id)}
                  >
                    Accept service
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    onClick={() => handleReject(request.id)}
                  >
                    Reject service
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
