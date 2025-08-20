import React from "react";
import { Eye, Search, Globe, Shield, Camera, MapPin } from "lucide-react";

export const LogoSamples = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">EyesOnGround Logo Samples</h1>
          <p className="text-lg text-gray-600">Choose your preferred logo design</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logo Option 1 - Modern Geometric */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Option 1: Modern Geometric</h3>
              <p className="text-sm text-gray-600">Clean, professional, tech-focused</p>
            </div>
            
            {/* Logo 1 Design */}
            <div className="flex flex-col items-center space-y-6">
              {/* Large version */}
              <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] p-6 rounded-2xl shadow-lg">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Globe className="w-3 h-3 text-[rgba(42,100,186,1)]" />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] bg-clip-text text-transparent">
                  EYESONGROUND
                </div>
                <div className="text-xs text-gray-500 mt-1 tracking-wider">TRUSTED INSPECTIONS</div>
              </div>
              
              {/* Small version */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center relative">
                  <Eye className="w-5 h-5 text-white" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                    <Globe className="w-1.5 h-1.5 text-[rgba(42,100,186,1)]" />
                  </div>
                </div>
                <span className="font-bold text-[rgba(13,38,75,1)]">EYESONGROUND</span>
              </div>
            </div>
          </div>

          {/* Logo Option 2 - Circular Badge */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Option 2: Circular Badge</h3>
              <p className="text-sm text-gray-600">Professional, trustworthy, classic</p>
            </div>
            
            {/* Logo 2 Design */}
            <div className="flex flex-col items-center space-y-6">
              {/* Large version */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <div className="relative">
                    <Eye className="w-10 h-10 text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Shield className="w-2 h-2 text-[rgba(13,38,75,1)]" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg border border-gray-200">
                  <span className="text-xs font-bold text-[rgba(13,38,75,1)]">VERIFIED</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-[rgba(13,38,75,1)]">
                  EYESONGROUND
                </div>
                <div className="text-xs text-[rgba(42,100,186,1)] mt-1 font-medium">PROFESSIONAL INSPECTIONS</div>
              </div>
              
              {/* Small version */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-full flex items-center justify-center shadow-lg border-2 border-white relative">
                  <Eye className="w-5 h-5 text-white" />
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                </div>
                <span className="font-bold text-[rgba(13,38,75,1)]">EYESONGROUND</span>
              </div>
            </div>
          </div>

          {/* Logo Option 3 - Dynamic Search */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Option 3: Dynamic Search</h3>
              <p className="text-sm text-gray-600">Active, innovative, search-focused</p>
            </div>
            
            {/* Logo 3 Design */}
            <div className="flex flex-col items-center space-y-6">
              {/* Large version */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[rgba(42,100,186,1)] via-[rgba(42,100,186,0.8)] to-[rgba(13,38,75,1)] rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="relative">
                    <Search className="w-8 h-8 text-white" />
                    <div className="absolute top-1 left-1 w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[rgba(42,100,186,0.2)]">
                  <MapPin className="w-4 h-4 text-[rgba(42,100,186,1)]" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  <span className="text-[rgba(42,100,186,1)]">EYES</span>
                  <span className="text-[rgba(13,38,75,1)]">ON</span>
                  <span className="text-[rgba(42,100,186,1)]">GROUND</span>
                </div>
                <div className="text-xs text-gray-500 mt-1 tracking-wider">GLOBAL • INSTANT • TRUSTED</div>
              </div>
              
              {/* Small version */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center shadow-lg relative">
                  <Search className="w-5 h-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <span className="font-bold text-[rgba(13,38,75,1)] text-sm">EYESONGROUND</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">How They Look in Context</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Context 1 - Header */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-100 p-4 border-b">
                <h4 className="font-semibold text-gray-700">Header Navigation</h4>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center relative">
                    <Eye className="w-4 h-4 text-white" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-white rounded-full flex items-center justify-center">
                      <Globe className="w-1 h-1 text-[rgba(42,100,186,1)]" />
                    </div>
                  </div>
                  <span className="font-bold text-[rgba(13,38,75,1)] text-sm">EYESONGROUND</span>
                </div>
              </div>
            </div>

            {/* Context 2 - Business Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-100 p-4 border-b">
                <h4 className="font-semibold text-gray-700">Business Card</h4>
              </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-full flex items-center justify-center shadow-lg border-2 border-white relative mx-auto mb-3">
                  <Eye className="w-6 h-6 text-white" />
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
                <div className="font-bold text-[rgba(13,38,75,1)] text-sm">EYESONGROUND</div>
                <div className="text-xs text-[rgba(42,100,186,1)]">PROFESSIONAL INSPECTIONS</div>
              </div>
            </div>

            {/* Context 3 - App Icon */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-100 p-4 border-b">
                <h4 className="font-semibold text-gray-700">App Icon Style</h4>
              </div>
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[rgba(42,100,186,1)] via-[rgba(42,100,186,0.8)] to-[rgba(13,38,75,1)] rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 mx-auto mb-3 relative">
                  <Search className="w-8 h-8 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-2 h-2 text-[rgba(42,100,186,1)]" />
                  </div>
                </div>
                <div className="font-bold text-sm">
                  <span className="text-[rgba(42,100,186,1)]">EYES</span>
                  <span className="text-[rgba(13,38,75,1)]">ON</span>
                  <span className="text-[rgba(42,100,186,1)]">GROUND</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Buttons */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Which logo do you prefer?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Choose Option 1
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Choose Option 2
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Choose Option 3
            </button>
          </div>
        </div>

        {/* Logo Specifications */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Logo Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[rgba(42,100,186,0.1)] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-[rgba(42,100,186,1)]" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Option 1: Modern Geometric</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Clean geometric shapes</li>
                <li>• Professional gradient</li>
                <li>• Global connectivity symbol</li>
                <li>• Scalable design</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[rgba(42,100,186,0.1)] rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-[rgba(42,100,186,1)]" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Option 2: Circular Badge</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Trust-building circular design</li>
                <li>• Verification badge element</li>
                <li>• Professional appearance</li>
                <li>• Classic and timeless</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[rgba(42,100,186,0.1)] rounded-xl flex items-center justify-center mx-auto mb-3 transform rotate-3">
                <Search className="w-6 h-6 text-[rgba(42,100,186,1)]" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Option 3: Dynamic Search</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Action-oriented design</li>
                <li>• Multi-colored branding</li>
                <li>• Dynamic visual elements</li>
                <li>• Modern and energetic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};