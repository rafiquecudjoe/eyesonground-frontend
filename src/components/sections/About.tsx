
import { Eye } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="bg-gradient-to-b from-[rgba(234,241,255,1)] to-white w-full overflow-hidden px-6 md:px-[62px] py-16 md:py-20 max-md:max-w-full relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[rgba(42,100,186,0.3)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[rgba(13,38,75,0.2)] rounded-full blur-3xl"></div>
      </div>
      
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-full lg:w-[43%] max-md:w-full max-md:ml-0 relative z-10">
          <div className="flex w-full flex-col items-stretch text-4xl md:text-[52px] text-[rgba(13,38,75,1)] font-bold max-md:max-w-full max-md:mt-10">
            <div className="flex items-center gap-4 justify-start mb-8 max-md:text-[40px]">
              <div className="w-20 h-20 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-2xl flex items-center justify-center shadow-xl relative">
                <Eye className="w-10 h-10 text-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-[rgba(13,38,75,1)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <h2 className="self-stretch my-auto max-md:text-[32px] bg-gradient-to-r from-[rgba(13,38,75,1)] to-[rgba(42,100,186,1)] bg-clip-text text-transparent">
                About us
              </h2>
            </div>
            <div className="relative">
              <img
              src="/images/pexels-tim-samuel-5835356.jpg"
              alt="Professional inspector conducting detailed inspection with tablet and equipment"
              className="aspect-[1.26] object-cover w-full rounded-3xl shadow-2xl border-4 border-white/50"
              />
              {/* Floating inspection badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-[rgba(13,38,75,1)]">Live Inspection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[57%] lg:ml-5 max-md:w-full max-md:ml-0 relative z-10">
          <div className="flex w-full flex-col font-normal mt-8 lg:mt-32 max-md:max-w-full max-md:mt-10">
            <div className="self-stretch max-md:max-w-full">
              <h3 className="text-black text-3xl md:text-[42px] leading-tight max-md:max-w-full mb-8">
                <span className="font-bold">WHAT IS </span>
                <span className="font-bold text-[rgba(42,100,186,1)]">
                  EYESONGROUND{" "}
                </span>
                <span className="font-bold">ABOUT</span>
                <span className="font-bold text-[rgba(42,100,186,1)]">?</span>
              </h3>
              <p className="text-[#233E4C] text-lg md:text-2xl leading-relaxed max-md:max-w-full">
                EyesOnGround is the world's leading remote inspection platform that connects buyers with verified agents who act as your eyes and hands on the ground. Whether you're purchasing a car, appliance, property, or any valuable item from a distant location, our professional inspectors provide detailed reports, photos, videos, and real-time updates to help you make confident buying decisions.
              </p>
              
              {/* Neutral Inspector Message */}
              <div className="mt-8 p-6 bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] rounded-2xl border border-[rgba(42,100,186,0.2)]">
                <h4 className="font-bold text-[rgba(13,38,75,1)] text-xl mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  Our Commitment to Neutrality
                </h4>
                <p className="text-[rgba(13,38,75,0.9)] text-base leading-relaxed">
                  We are your <strong>neutral inspector</strong> — providing objective, factual reports without influencing your purchasing decisions. Our agents deliver comprehensive condition assessments, detailed documentation, and professional observations, but the final decision always remains yours. We keep it simple, safe, and scalable by staying focused on what we do best: being your trusted eyes on the ground.
                </p>
                <div className="mt-4 text-sm text-[rgba(13,38,75,0.7)] italic">
                  Future enhancement: Market Insight add-on for general pricing trends and resale data (not personal purchase advice).
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 text-base text-[#233E4C] leading-6 mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[rgba(42,100,186,0.1)] shadow-sm">
              <img
                src="/images/pexels-tim-samuel-5835356.jpg"
                alt="Feature 1"
                className="aspect-square object-cover w-14 h-14 rounded-xl shadow-lg flex-shrink-0 border border-white/50"
              />
              <div>
                <h4 className="font-bold text-[rgba(13,38,75,1)] mb-2">Locations</h4>
                <p className="text-[rgba(13,38,75,0.8)]">
                  Our network spans across major cities in the US, ensuring we have qualified agents ready to inspect items in your target location within hours.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-base text-[#233E4C] leading-6 mt-6 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[rgba(42,100,186,0.1)] shadow-sm">
              <img
                src="/images/pexels-rdne-7362950.jpg"
                alt="Feature 2"
                className="aspect-square object-cover w-14 h-14 rounded-xl shadow-lg flex-shrink-0 border border-white/50"
              />
              <div>
                <h4 className="font-bold text-[rgba(13,38,75,1)] mb-2">Professional Reports</h4>
                <p className="text-[rgba(13,38,75,0.8)]">
                  Receive comprehensive inspection reports with high-quality photos, videos, condition assessments, and expert recommendations within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
