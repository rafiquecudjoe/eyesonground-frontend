import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft, Users, CheckCircle, Shield, Star, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRegister, validateRegistrationForm } from "@/lib/api/auth";
import type { RegisterUserRequest } from "@/lib/api/types";

const ClientRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  const registerMutation = useRegister({
    onSuccess: (data) => {
      // Store user type and data for the dashboard
      localStorage.setItem('userType', 'client');
      localStorage.setItem('userData', JSON.stringify(data.data));
      
      toast.success("Registration successful!", {
        description: "Welcome to your client dashboard"
      });
      
      navigate("/client-dashboard/post-board");
    },
    onError: (error) => {
      toast.error("Registration failed", {
        description: error.message || "Please check your information and try again"
      });
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !agreed) {
      toast.error("Please fill in all fields", {
        description: "All fields are required to create your account"
      });
      return;
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure both password fields match"
      });
      return;
    }

    const registrationData: RegisterUserRequest = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password,
      userType: 'client'
    };

    // Validate form data
    const validationErrors = validateRegistrationForm(registrationData);
    if (validationErrors.length > 0) {
      toast.error("Please correct the following errors:", {
        description: validationErrors.join(", ")
      });
      return;
    }

    // Submit registration
    registerMutation.mutate(registrationData);
  };

  const handleGoBack = () => {
    navigate("/account-type");
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
        
        <Button variant="ghost" onClick={handleGoBack} className="text-[rgba(13,38,75,1)]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Benefits */}
          <div className="relative z-10 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-4">
                <Users className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Client Benefits</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgba(13,38,75,1)] mb-6">
                Buy with Confidence
              </h2>
              <p className="text-lg text-[rgba(13,38,75,0.7)] mb-8">
                Join thousands of satisfied clients who trust our verified agents for remote inspections worldwide.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] p-3 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[rgba(13,38,75,1)] mb-2">Verified Agents</h3>
                  <p className="text-[rgba(13,38,75,0.7)]">All agents are background-checked and professionally trained</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] p-3 rounded-xl shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[rgba(13,38,75,1)] mb-2">Real-time Reports</h3>
                  <p className="text-[rgba(13,38,75,0.7)]">Get instant updates with photos, videos, and detailed analysis</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] p-3 rounded-xl shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[rgba(13,38,75,1)] mb-2">Satisfaction Guaranteed</h3>
                  <p className="text-[rgba(13,38,75,0.7)]">We vet our agents so you can trust their expertise</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[rgba(42,100,186,0.1)]">
                <div className="text-2xl font-bold text-[rgba(13,38,75,1)]">500+</div>
                <div className="text-sm text-[rgba(13,38,75,0.7)]">Verified Agents</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[rgba(42,100,186,0.1)]">
                <div className="text-2xl font-bold text-[rgba(13,38,75,1)]">2.5k+</div>
                <div className="text-sm text-[rgba(13,38,75,0.7)]">Inspections</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[rgba(42,100,186,0.1)]">
                <div className="text-2xl font-bold text-[rgba(13,38,75,1)]">98%</div>
                <div className="text-sm text-[rgba(13,38,75,0.7)]">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right side - Registration Form */}
          <div className="relative z-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-[rgba(42,100,186,0.1)] p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-4">
                  <Users className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Client Registration</span>
                </div>
                <h1 className="text-[rgba(13,38,75,1)] text-2xl font-bold mb-2">
                  Create Your Account
                </h1>
                <p className="text-[rgba(13,38,75,0.7)] text-base">
                  Start requesting professional inspections
                </p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[rgba(13,38,75,1)] font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 backdrop-blur-sm"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[rgba(13,38,75,1)] font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 backdrop-blur-sm"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
                
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
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[rgba(13,38,75,1)] font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 backdrop-blur-sm pr-12"
                      placeholder="Create a password"
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
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[rgba(13,38,75,1)] font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 backdrop-blur-sm pr-12"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[rgba(42,100,186,1)] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="terms"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked === true)}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-[rgba(13,38,75,0.8)] leading-relaxed"
                  >
                    I agree to the{" "}
                    <Link to="/terms-and-conditions" className="text-[rgba(42,100,186,1)] hover:underline font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-[rgba(42,100,186,1)] hover:underline font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!agreed || !firstName || !lastName || !email || !password || !confirmPassword || registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Client Account'
                  )}
                </Button>
                
                <div className="text-center pt-4">
                  <p className="text-sm text-[rgba(13,38,75,0.7)]">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-[rgba(42,100,186,1)] font-semibold hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientRegistration;