export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[rgba(1,9,21,1)] to-[rgba(13,38,75,1)] w-full overflow-hidden pt-16 pb-8 px-6 md:px-[52px] max-md:max-w-full relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[rgba(42,100,186,0.3)] rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[rgba(42,100,186,0.2)] rounded-full blur-2xl"></div>
      </div>
      
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-full md:w-[37%] max-md:w-full max-md:ml-0 relative z-10">
          <div className="flex w-full flex-col items-stretch mt-[11px] max-md:mt-10">
            <div className="flex items-center gap-4 text-2xl text-white font-bold">
              <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center shadow-lg relative border-2 border-white/20">
                <Eye className="w-6 h-6 text-white" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-2 h-2 text-[rgba(42,100,186,1)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <div className="self-stretch my-auto tracking-wide">EYESONGROUND</div>
            </div>
            <p className="text-[rgba(219,231,255,0.8)] text-base font-normal leading-relaxed mt-4">
              The world's most trusted remote inspection platform. We connect buyers with verified local agents to provide detailed, real-time inspections of items anywhere in the world.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white text-sm">500+ Verified Agents</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white text-sm">2.5k+ Inspections</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[16%] md:ml-5 max-md:w-full max-md:ml-0 relative z-10">
          <nav className="flex flex-col items-stretch text-white max-md:mt-10">
            <h3 className="text-xl font-bold mb-6">
              Quick Links
            </h3>
            <div className="space-y-3">
              <a href="/" className="text-[rgba(219,231,255,0.8)] hover:text-white transition-colors block">Home</a>
              <a href="/#about" className="text-[rgba(219,231,255,0.8)] hover:text-white transition-colors block">About</a>
              <a href="/#services" className="text-[rgba(219,231,255,0.8)] hover:text-white transition-colors block">Services</a>
              <a href="/#reviews" className="text-[rgba(219,231,255,0.8)] hover:text-white transition-colors block">Reviews</a>
              <a href="/account-type" className="text-[rgba(219,231,255,0.8)] hover:text-white transition-colors block">Get Started</a>
            </div>
          </nav>
        </div>

        <div className="w-full md:w-[46%] md:ml-5 max-md:w-full max-md:ml-0 relative z-10">
          <div className="flex w-full flex-col max-md:max-w-full max-md:mt-10">
            <h3 className="text-white text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-[rgba(42,100,186,0.6)] flex min-h-[40px] items-center justify-center w-10 rounded-xl shadow-lg">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1584f779b3da9f0add75f2de825ecca4ff2dbbaf"
                    alt="Location"
                    className="aspect-[1] object-contain w-5 self-stretch my-auto"
                  />
                </div>
                <div className="text-[rgba(219,231,255,0.9)] text-base font-normal">
                  Global Headquarters, Tech District, Innovation City
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[rgba(42,100,186,0.6)] flex min-h-[40px] items-center justify-center w-10 rounded-xl shadow-lg">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/eabd09348a334be78e1ed3d67617de037731368d"
                    alt="Phone"
                    className="aspect-[1] object-contain w-5 self-stretch my-auto"
                  />
                </div>
                <div className="text-[rgba(219,231,255,0.9)] text-base font-normal">
                  +1 (555) 123-EYES
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[rgba(42,100,186,0.6)] flex min-h-[40px] items-center justify-center w-10 rounded-xl shadow-lg">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/063fb62c1d46326d1812b22fffa46480c7e1b9c2"
                    alt="Email"
                    className="aspect-[1] object-contain w-5 self-stretch my-auto"
                  />
                </div>
                <div className="text-[rgba(219,231,255,0.9)] text-base font-normal">
                  hello@eyesonground.com
                </div>
              </div>
            </div>
            
            {/* Social media */}
            <div className="mt-12">
              <h4 className="text-white text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex gap-3">
              {[
                "https://cdn.builder.io/api/v1/image/assets/TEMP/352d7c0bfe8f6bfd4b765016f3d2f4595103fe76",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/7e81f548a744072012ada7b2be7646bff96c9c11",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/969bc18f0ba9e7c595bb4a441726876758b329a1",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/37fd59f426d1e80fa7b0ff5e127f769dc0b202c1",
              ].map((url, index) => (
                <button
                  key={index}
                  className="bg-[rgba(42,100,186,0.6)] flex min-h-[40px] items-center justify-center w-10 rounded-xl hover:bg-[rgba(42,100,186,0.8)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <img
                    src={url}
                    alt={`Social media ${index + 1}`}
                    className="aspect-[1] object-contain w-5 self-stretch my-auto"
                  />
                </button>
              ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="w-full mt-12 pt-8 border-t border-[rgba(255,255,255,0.1)] text-center relative z-10">
          <p className="text-[rgba(219,231,255,0.7)] text-sm">
            © {new Date().getFullYear()} EyesOnGround. All rights reserved. | Trusted by thousands worldwide for remote inspections.
          </p>
        </div>
      </div>
    </footer>
  );
};
