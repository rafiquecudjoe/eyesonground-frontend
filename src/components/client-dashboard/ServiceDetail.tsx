
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getServiceById } from "./service-detail/ServiceData";
import { StatusBadge } from "./service-detail/StatusBadge";
import { LocationSection } from "./service-detail/LocationSection";
import { PSIInfoSection } from "./service-detail/PSIInfoSection";
import { QuoteSection } from "./service-detail/QuoteSection";
import { DescriptionSection } from "./service-detail/DescriptionSection";
import { TimeAndDateSection } from "./service-detail/TimeAndDateSection";
import { ImageGallerySection } from "./service-detail/ImageGallerySection";
import { VideoSection } from "./service-detail/VideoSection";

export const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = getServiceById(serviceId || "1");
  
  return (
    <div className="bg-[rgba(249,250,251,1)] min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="mb-6">
          <Link to="/client-dashboard/service-history" className="inline-flex items-center text-[rgba(42,100,186,1)] hover:text-[rgba(13,38,75,1)] mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Services
          </Link>
          
          <div className="mb-4">
            <StatusBadge status={service.status} />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)] mb-6">
            {service.title}
          </h1>
          
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
            
            <DescriptionSection description={service.description} />
            
            <TimeAndDateSection
              date={service.timeAndDate.date}
              time={service.timeAndDate.time}
              duration={service.timeAndDate.duration}
              mile={service.timeAndDate.mile}
            />
            
            <ImageGallerySection images={service.images} />
            
            <VideoSection 
              videoUrl={service.video} 
              thumbnailUrl={service.images[0]} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
