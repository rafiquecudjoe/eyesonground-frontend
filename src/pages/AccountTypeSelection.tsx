import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Users, Shield, CheckCircle, Star, Globe, Clock } from "lucide-react";

const AccountTypeSelection = () => {
  const [selectedType, setSelectedType] = useState<"client" | "agent" | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedType) {
      if (selectedType === "client") {
        navigate(`/clientregister`);
      } else {
        navigate(`/psiregister`);
      }
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgba(42,100,186,0.05)] via-white to-[rgba(13,38,75,0.03)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[rgba(42,100,186,0.3)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[rgba(13,38,75,0.2)] rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 md:p-8">
        <Link
          to="/"
          className="flex items-center gap-4 text-[rgba(13,38,75,1)] hover:opacity-80 transition-opacity"
        >
          <img
            src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
            alt="EyesOnGround Logo"
            className="aspect-square object-cover w-10 h-10 rounded-lg shadow-sm"
          />
          <span className="text-xl md:text-2xl font-bold tracking-wide">EYESONGROUND</span>
        </Link>
        
        <Button variant="ghost" onClick={handleGoBack} className="text-[rgba(13,38,75,1)]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back to Home</span>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-4xl relative z-10">
          {/* Main Content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-6">
              <Globe className="h-5 w-5 text-[rgba(42,100,186,1)]" />
              <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Join Our Global Network</span>
            </div>
            <h1 className="text-[rgba(13,38,75,1)] text-3xl md:text-5xl font-bold mb-4">
              Choose Your Account Type
            </h1>
            <p className="text-[rgba(13,38,75,0.7)] text-lg md:text-xl max-w-2xl mx-auto">
              Whether you need inspections or want to provide them, we have the perfect solution for you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Client Card */}
            <Card
              className={cn(
                "cursor-pointer border-2 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 relative overflow-hidden",
                selectedType === "client"
                  ? "bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white border-[rgba(42,100,186,1)] shadow-2xl"
                  : "bg-white/80 backdrop-blur-sm text-[rgba(13,38,75,1)] border-[rgba(42,100,186,0.2)] hover:border-[rgba(42,100,186,0.4)]"
              )}
              onClick={() => setSelectedType("client")}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full blur-lg"></div>
              </div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={cn(
                    "p-4 rounded-2xl shadow-lg",
                    selectedType === "client" ? "bg-white/20" : "bg-[rgba(42,100,186,0.1)]"
                  )}>
                    <Users className={cn(
                      "h-8 w-8",
                      selectedType === "client" ? "text-white" : "text-[rgba(42,100,186,1)]"
                    )} />
                  </div>
                  {selectedType === "client" && (
                    <CheckCircle className="h-6 w-6 text-white" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-4">I'm a Client</h3>
                <p className={cn(
                  "text-base leading-relaxed mb-6",
                  selectedType === "client" ? "text-white/90" : "text-[rgba(13,38,75,0.7)]"
                )}>
                  I need professional inspection services to verify items before purchasing. Get detailed reports, photos, and videos from trusted local agents.
                </p>
                
                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className={cn(
                      "h-4 w-4",
                      selectedType === "client" ? "text-white" : "text-green-500"
                    )} />
                    <span className="text-sm">Request inspections worldwide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className={cn(
                      "h-4 w-4",
                      selectedType === "client" ? "text-white" : "text-green-500"
                    )} />
                    <span className="text-sm">Real-time updates & reports</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className={cn(
                      "h-4 w-4",
                      selectedType === "client" ? "text-white" : "text-green-500"
                    )} />
                    <span className="text-sm">Verified agent network</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Agent Card */}
            <Card
              className={cn(
                "cursor-pointer border-2 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 relative overflow-hidden",
                selectedType === "agent"
                  ? "bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white border-[rgba(42,100,186,1)] shadow-2xl"
                  : "bg-white/80 backdrop-blur-sm text-[rgba(13,38,75,1)] border-[rgba(42,100,186,0.2)] hover:border-[rgba(42,100,186,0.4)]"
              )}
              onClick={() => setSelectedType("agent")}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full blur-lg"></div>
              </div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={cn(
                    "p-4 rounded-2xl shadow-lg",
                    selectedType === "agent" ? "bg-white/20" : "bg-[rgba(42,100,186,0.1)]"
                  )}>
                    <Shield className={cn(
                      "h-8 w-8",
                      selectedType === "agent" ? "text-white" : "text-[rgba(42,100,186,1)]"
                    )} />
                  </div>
                  {selectedType === "agent" && (
                    <CheckCircle className="h-6 w-6 text-white" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-4">I'm a PSI Agent</h3>
                <p className={cn(
                  "text-base leading-relaxed mb-6",
                  selectedType === "agent" ? "text-white/90" : "text-[rgba(13,38,75,0.7)]"
                )}>
                  I want to provide professional inspection services and earn money by helping clients make informed purchasing decisions.
                </p>
                
                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className={cn(
                      "h-4 w-4",
                      selectedType === "agent" ? "text-white" : "text-green-500"
                    )} />
                    <span className="text-sm">Flexible working schedule</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className={cn(
                      "h-4 w-4",
                      selectedType === "agent" ? "text-white" : "text-green-500"
                    )} />
                    <span className="text-sm">Competitive compensation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className={cn(
                      "h-4 w-4",
                      selectedType === "agent" ? "text-white" : "text-green-500"
                    )} />
                    <span className="text-sm">Professional training provided</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedType}
              className={cn(
                "px-12 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform",
                selectedType 
                  ? "bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white hover:shadow-xl hover:-translate-y-1" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              Continue Registration
            </Button>
          </div>

          {/* Already have account */}
          <div className="text-center mt-8">
            <p className="text-[rgba(13,38,75,0.7)]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[rgba(42,100,186,1)] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;