import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Calendar, ArrowLeft, Shield, CheckCircle, Star, Clock, DollarSign } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PSIAgentRegistration = () => {
  const [step, setStep] = useState<"basicInfo" | "addressInfo">("basicInfo");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Address information
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step === "basicInfo") {
      setStep("addressInfo");
    }
  };

  const handlePreviousStep = () => {
    if (step === "addressInfo") {
      setStep("basicInfo");
    } else {
      navigate("/account-type");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCompleteRegistration = () => {
    console.log("Registration complete", {
      firstName,
      lastName,
      dob,
      email,
      password,
      fullAddress,
      city,
      zipCode
    });
    
    toast.success("Registration successful!", {
      description: "Welcome to your PSI agent dashboard"
    });
    
    navigate("/psi-dashboard/services-history");
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
            src="https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
            alt="EyesOnGround Logo"
            className="aspect-square object-cover w-12 h-12 rounded-xl shadow-lg border-2 border-white/20"
          />
          <span className="text-xl md:text-2xl font-bold tracking-wide">EYESONGROUND</span>
        </Link>
        
        <Button variant="ghost" onClick={handlePreviousStep} className="text-[rgba(13,38,75,1)]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Benefits */}
          <div className="relative z-10 space-y-8 order-2 lg:order-1">
            <div>
              <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-4">
                <Shield className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Agent Benefits</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgba(13,38,75,1)] mb-6">
                Earn as You Inspect
              </h2>
              <p className="text-lg text-[rgba(13,38,75,0.7)] mb-8">
                Join our network of professional agents and start earning by providing trusted inspection services.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] p-3 rounded-xl shadow-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[rgba(13,38,75,1)] mb-2">Competitive Earnings</h3>
                  <p className="text-[rgba(13,38,75,0.7)]">Earn $50-200+ per inspection with flexible scheduling</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] p-3 rounded-xl shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[rgba(13,38,75,1)] mb-2">Flexible Schedule</h3>
                  <p className="text-[rgba(13,38,75,0.7)]">Work when you want, choose your own assignments</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] p-3 rounded-xl shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[rgba(13,38,75,1)] mb-2">Professional Growth</h3>
                  <p className="text-[rgba(13,38,75,0.7)]">Build your reputation and increase your earning potential</p>
                </div>
              </div>
            </div>

            {/* Agent image */}
            <div className="hidden lg:block">
              <img
                src="https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Professional inspector"
                className="w-full h-64 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Right side - Registration Form */}
          <div className="relative z-10 order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-[rgba(42,100,186,0.1)] p-8 md:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-4">
                  <Shield className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  <span className="text-sm font-medium text-[rgba(13,38,75,1)]">PSI Agent Registration</span>
                </div>
                <h1 className="text-[rgba(13,38,75,1)] text-2xl font-bold mb-2">
                  Become an Agent
                </h1>
                <p className="text-[rgba(13,38,75,0.7)] text-base">
                  Join our professional network
                </p>
              </div>
              
              {/* Progress indicator */}
              <div className="flex justify-center items-center mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(42,100,186,1)] text-white shadow-lg">
                    {step === "basicInfo" ? "1" : <CheckCircle className="h-4 w-4" />}
                  </div>
                  <span className="mx-3 text-sm font-medium text-[rgba(13,38,75,1)]">Basic Info</span>
                </div>
                <div className="w-16 h-[2px] bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(42,100,186,0.3)] mx-2"></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    step === "addressInfo" 
                      ? "bg-[rgba(42,100,186,1)] text-white" 
                      : "border-2 border-[rgba(42,100,186,0.3)] text-[rgba(42,100,186,0.5)] bg-white"
                  }`}>
                    2
                  </div>
                  <span className={`mx-3 text-sm font-medium ${
                    step === "addressInfo" ? "text-[rgba(13,38,75,1)]" : "text-[rgba(13,38,75,0.5)]"
                  }`}>
                    Address
                  </span>
                </div>
              </div>
              
              {/* Form Steps */}
              {step === "basicInfo" ? (
                <form className="space-y-6">
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
                    <Label htmlFor="dob" className="text-[rgba(13,38,75,1)] font-medium">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <Input
                            id="dob"
                            value={dob ? format(dob, "PPP") : ""}
                            readOnly
                            className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 backdrop-blur-sm cursor-pointer"
                            placeholder="Select your date of birth"
                            required
                          />
                          <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={dob}
                          onSelect={setDob}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
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
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
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
                      <Link to="/terms" className="text-[rgba(42,100,186,1)] hover:underline font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-[rgba(42,100,186,1)] hover:underline font-medium"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full h-12 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    disabled={!agreed || !firstName || !lastName || !dob || !email || !password}
                  >
                    Next Step
                  </Button>
                </form>
              ) : (
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullAddress" className="text-[rgba(13,38,75,1)] font-medium">Full Address</Label>
                    <Input
                      id="fullAddress"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 backdrop-blur-sm"
                      placeholder="Enter your full address"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-[rgba(13,38,75,1)] font-medium">City</Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger id="city" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="abuja">Abuja</SelectItem>
                        <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                        <SelectItem value="kano">Kano</SelectItem>
                        <SelectItem value="ibadan">Ibadan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-[rgba(13,38,75,1)] font-medium">Zip Code</Label>
                    <Select value={zipCode} onValueChange={setZipCode}>
                      <SelectTrigger id="zipCode" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Select your zip code" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="23401">23401</SelectItem>
                        <SelectItem value="90001">90001</SelectItem>
                        <SelectItem value="10001">10001</SelectItem>
                        <SelectItem value="60601">60601</SelectItem>
                        <SelectItem value="30301">30301</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    type="button"
                    onClick={handleCompleteRegistration}
                    className="w-full h-12 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    disabled={!fullAddress || !city || !zipCode}
                  >
                    Complete Registration
                  </Button>
                </form>
              )}

              {/* Login Link */}
              <div className="text-center pt-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSIAgentRegistration;