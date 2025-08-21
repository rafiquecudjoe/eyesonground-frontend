import { Link } from "react-router-dom";
import { CheckCircle, Eye, Shield, Clock, Star } from "lucide-react";
export const Features = () => {
  return <section className="w-full py-12 max-md:max-w-full">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-white to-[rgba(42,100,186,0.02)] overflow-hidden rounded-3xl shadow-2xl flex flex-col md:flex-row border border-[rgba(42,100,186,0.1)]">
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
          <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-6">
            <Eye className="h-5 w-5 text-[rgba(42,100,186,1)]" />
            <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Trusted Inspection Platform</span>
          </div>
          <h2 className="text-[rgba(20,40,77,1)] text-3xl md:text-4xl font-bold mb-8 leading-tight">
            YOUR TRUSTED EYES <br />
            <span className="text-[rgba(42,100,186,1)]">ANYWHERE IN THE WORLD</span>
          </h2>
          
          <div className="mb-8">
            <h3 className="text-[rgba(93,93,95,1)] text-xl font-semibold mb-8">
              Why choose EyesOnGround for your inspections?
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] flex min-h-12 items-center justify-center w-12 h-12 rounded-2xl flex-shrink-0 shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-[rgba(20,40,77,1)] text-lg font-bold mb-2">
                    Verified Local Agents
                  </h4>
                  <p className="text-[rgba(13,38,75,0.8)] text-base leading-relaxed">
                    All our inspection agents are thoroughly vetted, background-checked, and trained to provide detailed, accurate reports you can trust.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] flex min-h-12 items-center justify-center w-12 h-12 rounded-2xl flex-shrink-0 shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-[rgba(20,40,77,1)] text-lg font-bold mb-2">
                    Real-time Reporting
                  </h4>
                  <p className="text-[rgba(13,38,75,0.8)] text-base leading-relaxed">
                    Get instant updates with photos, videos, and detailed reports delivered in real-time during the inspection process.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] flex min-h-12 items-center justify-center w-12 h-12 rounded-2xl flex-shrink-0 shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-[rgba(20,40,77,1)] text-lg font-bold mb-2">
                    Satisfaction Guaranteed
                  </h4>
                  <p className="text-[rgba(13,38,75,0.8)] text-base leading-relaxed">
                    We guarantee quality inspections with our money-back promise. If you're not satisfied, we'll make it right.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Link to="/account-type" className="block w-full bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white text-center py-4 rounded-xl font-semibold hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Request Your First Inspection
          </Link>
        </div>
        
        <div className="w-full md:w-1/2 bg-gradient-to-tr from-[rgba(42,100,186,0.05)] to-[rgba(13,38,75,0.02)] relative overflow-hidden">
          <div className="absolute top-0 right-0 bottom-0 left-0 md:left-auto md:w-full h-full">
          {/* <img alt="Professional inspector examining equipment" src="https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-center object-cover" /> */}
            <img
              src="/images/pexels-cottonbro-5184919.jpg"
              alt="Professional inspector conducting detailed inspection with tablet and equipment"
              className="w-full h-full object-center object-cover"
              />
            
            {/* Overlay with inspection stats */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,38,75,0.8)] via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h4 className="text-[rgba(13,38,75,1)] font-bold text-lg mb-3">Live Inspection Process</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Photos & Videos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Live Updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Detailed Reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Expert Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};