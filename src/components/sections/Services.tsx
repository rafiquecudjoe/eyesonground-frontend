
import { ServiceCard } from "../ui/ServiceCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Services = () => {
  const isMobile = useIsMobile();
  
  const services = [
    {
      icon: "https://images.pexels.com/photos/3964736/pexels-photo-3964736.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      title: "VEHICLE INSPECTIONS",
      description:
        "Comprehensive vehicle inspections including engine checks, body condition, interior assessment, and test drives by certified automotive experts.",
    },
    {
      icon: "https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      title: "APPLIANCE & ELECTRONICS",
      description:
        "Detailed inspections of home appliances, electronics, and gadgets with functionality tests, condition reports, and warranty verification.",
    },
    {
      icon: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      title: "MACHINERY & EQUIPMENT",
      description:
        "Professional inspection of industrial machinery, construction equipment, and heavy-duty tools with operational assessments and safety checks.",
    },
    {
      icon: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      title: "REAL ESTATE & PROPERTY",
      description:
        "Thorough property inspections including structural assessments, room-by-room documentation, and neighborhood evaluation reports.",
    },
  ];

  return (
    <section id="services" className="bg-gradient-to-b from-[rgba(13,38,75,1)] to-[rgba(13,38,75,0.95)] flex w-full flex-col overflow-hidden items-center pt-16 pb-20 px-5 md:px-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[rgba(42,100,186,0.3)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[rgba(42,100,186,0.2)] rounded-full blur-3xl"></div>
      </div>
      
      <div className="flex w-full max-w-[1228px] flex-col items-stretch max-md:max-w-full">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight self-center max-md:max-w-full mb-4">
            INSPECTION SERVICES WE OFFER
          </h2>
          <p className="text-[rgba(219,231,255,0.9)] text-lg md:text-xl max-w-3xl mx-auto">
            Our network of verified local agents provides comprehensive inspection services across multiple categories, ensuring you make informed purchasing decisions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <Button asChild className="bg-white text-[rgba(13,38,75,1)] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Link to="/account-type">
              Start Your First Inspection
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
