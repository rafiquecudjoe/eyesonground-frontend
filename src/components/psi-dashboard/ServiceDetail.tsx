
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationSection } from "@/components/client-dashboard/service-detail/LocationSection";
import { PSIInfoSection } from "@/components/client-dashboard/service-detail/PSIInfoSection";
import { QuoteSection } from "@/components/client-dashboard/service-detail/QuoteSection";
import { DescriptionSection } from "@/components/client-dashboard/service-detail/DescriptionSection";
import { TimeAndDateSection } from "@/components/client-dashboard/service-detail/TimeAndDateSection";
import { ImageGallerySection } from "@/components/client-dashboard/service-detail/ImageGallerySection";
import { VideoSection } from "@/components/client-dashboard/service-detail/VideoSection";
import { getServiceById } from "@/components/client-dashboard/service-detail/ServiceData";

export const ServiceDetail = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = getServiceById(serviceId || "1");
  
  const handleAccept = () => {
    console.log("Service accepted:", serviceId);
    // In a real app, you would update the service status
    // and redirect the agent to their services
    navigate("/psi-dashboard/services-history");
  };

  const handleDecline = () => {
    console.log("Service declined:", serviceId);
    // In a real app, you would update the service status
    navigate("/psi-dashboard/service-requests");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 max-w-4xl">
      <div className="mb-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center text-[rgba(13,38,75,1)] hover:text-[rgba(42,100,186,1)]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            View Service Details
          </button>
          
          <div className="flex gap-3">
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleAccept}
            >
              Accept service
            </Button>
            <Button 
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={handleDecline}
            >
              Decline service
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <LocationSection 
            address={service.location.address} 
            coordinates={service.location.coordinates} 
          />
          
          <PSIInfoSection 
            category={service.psiInformation.category}
            subCategory={service.psiInformation.subCategory}
            details={service.psiInformation.details}
            agentName={service.psiInformation.agentName}
          />
          
          <QuoteSection quote={service.quote} />
          
          <div>
            <h2 className="text-lg font-medium text-[rgba(13,38,75,1)] uppercase mb-4">DESCRIPTION</h2>
            <div className="bg-white rounded-lg p-4 border">
              <p className="text-gray-700">{service.description}</p>
            </div>
          </div>
          
          <TimeAndDateSection
            date={service.timeAndDate.date}
            time={service.timeAndDate.time}
            duration={service.timeAndDate.duration}
            mile={service.timeAndDate.mile}
          />
          
          <div>
            <h2 className="text-lg font-medium text-[rgba(13,38,75,1)] uppercase mb-4">IMAGES</h2>
            <div className="bg-white rounded-lg overflow-hidden border">
              <div className="relative">
                <div className="overflow-hidden mx-auto">
                  <img 
                    src="/lovable-uploads/f37ec18e-4fd6-4602-a2e8-7bada77cac50.png" 
                    alt="Service image"
                    className="w-full object-contain"
                  />
                </div>
                <div className="absolute inset-y-0 flex items-center justify-between w-full px-4">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full bg-white/80 hover:bg-white shadow"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full bg-white/80 hover:bg-white shadow"
                  >
                    <ArrowLeft className="h-5 w-5 rotate-180" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-[rgba(13,38,75,1)] uppercase mb-4">VIDEO</h2>
            <div className="bg-white rounded-lg overflow-hidden border">
              <div className="relative h-[200px] bg-gray-900">
                <img 
                  src="/lovable-uploads/f37ec18e-4fd6-4602-a2e8-7bada77cac50.png" 
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="icon" variant="secondary" className="rounded-full bg-white/30 hover:bg-white/50 w-14 h-14">
                    <div className="h-6 w-6 ml-1 triangle-right"></div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
