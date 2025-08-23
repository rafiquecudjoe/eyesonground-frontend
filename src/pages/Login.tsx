import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft, Shield, Users, CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<"client" | "agent">("client");
  
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      // Store user type for the back-to-dashboard feature
      localStorage.setItem('userType', accountType);
      
      if (accountType === "client") {
        toast.success("Login successful!", {
          description: "Welcome to your client dashboard"
        });
        navigate("/client-dashboard/service-history");
      } else {
        toast.success("Login successful!", {
          description: "Welcome to your agent dashboard"
        });
        navigate("/agent-dashboard/services-history");
      }
    } else {
      toast.error("Login failed", {
        description: "Please fill in all fields"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgba(42,100,186,0.05)] via-white to-[rgba(13,38,75,0.03)] flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[rgba(42,100,186,0.3)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[rgba(13,38,75,0.2)] rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 md:p-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-[rgba(13,38,75,1)] hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center shadow-lg relative">
            <Eye className="w-6 h-6 text-white" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg className="w-2 h-2 text-[rgba(42,100,186,1)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-wide">EYESONGROUND</span>
        </Link>
        
        <Button variant="ghost" asChild className="text-[rgba(13,38,75,1)]">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md relative z-10">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-[rgba(42,100,186,0.1)] p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-4">
                <Shield className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Secure Login</span>
              </div>
              <h1 className="text-[rgba(13,38,75,1)] text-2xl md:text-3xl font-bold mb-2">
                Welcome Back
              </h1>
              <p className="text-[rgba(13,38,75,0.7)] text-base">
                Sign in to access your dashboard
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Account Type Selection */}
              <div className="space-y-3">
                <Label className="text-[rgba(13,38,75,1)] font-medium">Account Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType('client')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      accountType === 'client'
                        ? 'bg-[rgba(42,100,186,1)] border-[rgba(42,100,186,1)] text-white shadow-lg'
                        : 'bg-white border-[rgba(42,100,186,0.2)] text-[rgba(13,38,75,1)] hover:border-[rgba(42,100,186,0.4)]'
                    }`}
                  >
                    <Users className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">Client</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('agent')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      accountType === 'agent'
                        ? 'bg-[rgba(42,100,186,1)] border-[rgba(42,100,186,1)] text-white shadow-lg'
                        : 'bg-white border-[rgba(42,100,186,0.2)] text-[rgba(13,38,75,1)] hover:border-[rgba(42,100,186,0.4)]'
                    }`}
                  >
                    <Shield className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">Agent</span>
                  </button>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[rgba(13,38,75,1)] font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-[rgba(13,38,75,1)] font-medium">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[rgba(42,100,186,1)] hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 backdrop-blur-sm pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[rgba(42,100,186,1)] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign In
              </Button>
              
              {/* Register Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-[rgba(13,38,75,0.7)]">
                  Don't have an account?{" "}
                  <Link
                    to="/account-type"
                    className="text-[rgba(42,100,186,1)] font-semibold hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[rgba(42,100,186,0.1)]">
              <div className="text-lg font-bold text-[rgba(13,38,75,1)]">500+</div>
              <div className="text-xs text-[rgba(13,38,75,0.7)]">Verified Agents</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[rgba(42,100,186,0.1)]">
              <div className="text-lg font-bold text-[rgba(13,38,75,1)]">2.5k+</div>
              <div className="text-xs text-[rgba(13,38,75,0.7)]">Inspections</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[rgba(42,100,186,0.1)]">
              <div className="text-lg font-bold text-[rgba(13,38,75,1)]">98%</div>
              <div className="text-xs text-[rgba(13,38,75,0.7)]">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;