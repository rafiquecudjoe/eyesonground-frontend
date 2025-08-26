import { Eye, Camera, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const AuctionInspection = () => {
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-br from-[rgba(13,38,75,0.02)] to-[rgba(42,100,186,0.05)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[rgba(42,100,186,0.3)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[rgba(13,38,75,0.2)] rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full">
                <Eye className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Auction Inspections</span>
              </div>
              
              <h2 className="text-[rgba(13,38,75,1)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Get Your Eyes 
                <span className="text-[rgba(42,100,186,1)]"> On The Ground</span>
              </h2>
              
              <p className="text-[rgba(13,38,75,0.8)] text-lg leading-relaxed">
                Need to inspect an item before buying? Our verified agents provide real-time inspections with photos, videos, and detailed reports - so you can buy with confidence from anywhere in the world.
              </p>
              
              <p className="text-[rgba(13,38,75,0.9)] text-base font-medium">
                Whether it's equipment, vehicles, or valuable items, we provide the eyes and expertise you need to make informed purchasing decisions.
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-[rgba(13,38,75,1)] font-semibold mb-1">Simple Service Request</h4>
                  <p className="text-[rgba(13,38,75,0.7)] text-sm">Create a request with item details and we'll match you with a verified local agent</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-[rgba(13,38,75,1)] font-semibold mb-1">Live Feed Available</h4>
                  <p className="text-[rgba(13,38,75,0.7)] text-sm">Want a live feed? Our cameras can be your eyes so you see first hand what you are buying</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-[rgba(13,38,75,1)] font-semibold mb-1">24-Hour Turnaround</h4>
                  <p className="text-[rgba(13,38,75,0.7)] text-sm">Thorough inspection with real-time updates, photos, videos, and detailed report within 24 hours</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/account-type?type=client">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Start Auction Inspection
                </Button>
              </Link>
              <Link to="#services">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-[rgba(42,100,186,1)] text-[rgba(42,100,186,1)] hover:bg-[rgba(42,100,186,0.1)] font-semibold px-8 py-3 rounded-xl transition-all duration-300">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/image4.jpeg"
                alt="Professional machinery inspection at auction site"
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay badges */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-[rgba(13,38,75,1)]">Live Auction Feed</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[rgba(13,38,75,1)]">24hrs</div>
                  <div className="text-xs text-[rgba(13,38,75,0.7)]">Report Delivery</div>
                </div>
              </div>
            </div>
            
            {/* Floating inspection details card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl border border-[rgba(42,100,186,0.1)] max-w-xs">
              <h5 className="text-[rgba(13,38,75,1)] font-bold mb-2">Inspection Report Includes:</h5>
              <ul className="space-y-1 text-sm text-[rgba(13,38,75,0.8)]">
                <li>• High-resolution photos & videos</li>
                <li>• Honest condition notes from our on-site inspector</li>
                <li>• Optional basic function test (start-up, idle, basic movement)</li>
                <li>• Live video call</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
