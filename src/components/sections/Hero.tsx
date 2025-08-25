
import { Link } from "react-router-dom";
import { ImageCarousel } from "../ui/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Eye, Shield, Clock } from "lucide-react";

export const Hero = () => {
  const heroImages = [
    {
      src: "/images/pexels-shvetsa-4315575.jpg",
      alt: "Professional equipment inspector consulting with clients about heavy machinery"
    },
    {
      src: "/images/pexels-gustavo-fring-4975384.jpg", 
      alt: "Inspector measuring equipment dimensions with professional tools"
    },
    {
      src: "/images/pexels-tim-samuel-5835356.jpg",
      alt: "Professional inspector documenting findings with tablet outdoors"
    },
    {
      src: "/images/pexels-a-darmel-7641860.jpg",
      alt: "Professional documenting delivery and goods inspection"
    }
  ];
  
  return <section className="relative w-full overflow-hidden bg-gradient-to-br from-[rgba(42,100,186,0.1)] via-white to-[rgba(13,38,75,0.05)] px-6 md:px-14 py-12 md:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-full lg:w-6/12 max-md:w-full max-md:ml-0 relative z-10">
          <div className="mt-2 max-md:max-w-full max-md:mt-10 space-y-8">
            <div className="w-full text-[rgba(20,40,77,1)] max-md:max-w-full">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[rgba(42,100,186,0.2)] mb-6">
                <div className="w-5 h-5 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded flex items-center justify-center">
                  <Eye className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Trusted Remote Inspection Service</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight max-md:max-w-full max-md:text-[40px] max-md:leading-[50px] bg-gradient-to-r from-[rgba(13,38,75,1)] to-[rgba(42,100,186,1)] bg-clip-text text-transparent">
                Get Your Eyes <br />
                <span className="text-[rgba(42,100,186,1)]">On The Ground</span>
              </h1>
              <p className="text-xl md:text-2xl font-light leading-relaxed mt-6 max-md:max-w-full text-[rgba(13,38,75,0.8)]">
                Need to inspect an item before buying? Our verified agents provide real-time inspections with photos, videos, and detailed reports - so you can buy with confidence from anywhere in the world.
              </p>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[rgba(13,38,75,0.7)]">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Verified Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Real-time Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-500" />
                <span>Major Cities in the US</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row w-full items-center gap-4 mt-8 max-md:max-w-full">
              <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Link to="/account-type">
                  Request Inspection
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto border-2 border-[rgba(13,38,75,1)] text-[rgba(13,38,75,1)] px-8 py-6 text-lg font-semibold rounded-xl hover:bg-[rgba(13,38,75,0.05)] transition-all duration-300 hover:shadow-md">
                <Link to="/account-type">
                  Become an Agent
                </Link>
              </Button>
            </div>
            
            {/* Marketplace CTA */}
            <div className="flex justify-center mt-6">
              <Button asChild variant="ghost" className="text-[rgba(42,100,186,1)] hover:text-[rgba(13,38,75,1)] font-medium px-6 py-2 rounded-lg hover:bg-[rgba(42,100,186,0.1)] transition-all duration-300 group">
                <Link to="/account-type" className="flex items-center gap-2">
                  <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Browse Marketplace & Agents
                </Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[rgba(42,100,186,0.1)] shadow-sm">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">500+</div>
                <div className="text-sm text-[rgba(13,38,75,0.7)]">Verified Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">2.5k+</div>
                <div className="text-sm text-[rgba(13,38,75,0.7)]">Inspections Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">98%</div>
                <div className="text-sm text-[rgba(13,38,75,0.7)]">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 lg:ml-5 max-md:w-full max-md:ml-0 relative">
          <div className="aspect-[1.1] w-full max-md:max-w-full max-md:mt-10 relative">
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-[rgba(42,100,186,0.2)] to-[rgba(13,38,75,0.2)] rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] rounded-full blur-2xl animate-pulse delay-1000"></div>
            
            <ImageCarousel 
              images={heroImages} 
              interval={4000} 
              className="aspect-[1.1] w-full h-full rounded-2xl shadow-2xl border-4 border-white/50 backdrop-blur-sm overflow-hidden"
            />
            
            {/* Overlay badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-[rgba(13,38,75,1)]">Live Inspection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
