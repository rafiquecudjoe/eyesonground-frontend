import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Calendar, ArrowLeft, Shield, CheckCircle, Star, Clock, DollarSign, Loader2 } from "lucide-react";
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
import { useRegister, validateRegistrationForm } from "@/lib/api/auth";
import type { RegisterUserRequest } from "@/lib/api/types";

const AgentRegistration = () => {
  const [step, setStep] = useState<"basicInfo" | "addressInfo">("basicInfo");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Address information
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  
  const navigate = useNavigate();

  const registerMutation = useRegister({
    onSuccess: (data) => {
      // Store user type and data for the dashboard
      localStorage.setItem('userType', 'agent');
      localStorage.setItem('userData', JSON.stringify(data.data));
      
      toast.success("Registration successful!", {
        description: "Welcome to your agent dashboard"
      });
      
      navigate("/agent-dashboard/overview");
    },
    onError: (error) => {
      toast.error("Registration failed", {
        description: error.message || "Please check your information and try again"
      });
    }
  });

  const handleNextStep = () => {
    if (step === "basicInfo") {
      // Validate basic info before proceeding
      if (!firstName || !lastName || !email || !password || !confirmPassword || !dob) {
        toast.error("Please fill in all required fields", {
          description: "All basic information fields are required"
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

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Invalid email", {
          description: "Please enter a valid email address"
        });
        return;
      }

      // Validate password
      if (password.length < 6) {
        toast.error("Weak password", {
          description: "Password must be at least 6 characters long"
        });
        return;
      }

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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCompleteRegistration = async () => {
    // Final validation
    if (!fullAddress || !city || !zipCode || !agreed) {
      toast.error("Please complete all fields", {
        description: "All address fields and terms agreement are required"
      });
      return;
    }

    const registrationData: RegisterUserRequest = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password,
      userType: 'agent',
      dateOfBirth: dob ? dob.toISOString().split('T')[0] : undefined, // Convert to YYYY-MM-DD format
      fullAddress: fullAddress.trim(),
      city: city.trim(),
      zipCode: zipCode.trim(),
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
                  <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Agent Registration</span>
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
                        <SelectItem value="new-york">New York, NY</SelectItem>
                        <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
                        <SelectItem value="chicago">Chicago, IL</SelectItem>
                        <SelectItem value="houston">Houston, TX</SelectItem>
                        <SelectItem value="phoenix">Phoenix, AZ</SelectItem>
                        <SelectItem value="philadelphia">Philadelphia, PA</SelectItem>
                        <SelectItem value="san-antonio">San Antonio, TX</SelectItem>
                        <SelectItem value="san-diego">San Diego, CA</SelectItem>
                        <SelectItem value="dallas">Dallas, TX</SelectItem>
                        <SelectItem value="san-jose">San Jose, CA</SelectItem>
                        <SelectItem value="austin">Austin, TX</SelectItem>
                        <SelectItem value="jacksonville">Jacksonville, FL</SelectItem>
                        <SelectItem value="fort-worth">Fort Worth, TX</SelectItem>
                        <SelectItem value="columbus">Columbus, OH</SelectItem>
                        <SelectItem value="charlotte">Charlotte, NC</SelectItem>
                        <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                        <SelectItem value="indianapolis">Indianapolis, IN</SelectItem>
                        <SelectItem value="seattle">Seattle, WA</SelectItem>
                        <SelectItem value="denver">Denver, CO</SelectItem>
                        <SelectItem value="washington-dc">Washington, DC</SelectItem>
                        <SelectItem value="boston">Boston, MA</SelectItem>
                        <SelectItem value="el-paso">El Paso, TX</SelectItem>
                        <SelectItem value="detroit">Detroit, MI</SelectItem>
                        <SelectItem value="nashville">Nashville, TN</SelectItem>
                        <SelectItem value="portland">Portland, OR</SelectItem>
                        <SelectItem value="memphis">Memphis, TN</SelectItem>
                        <SelectItem value="oklahoma-city">Oklahoma City, OK</SelectItem>
                        <SelectItem value="las-vegas">Las Vegas, NV</SelectItem>
                        <SelectItem value="louisville">Louisville, KY</SelectItem>
                        <SelectItem value="baltimore">Baltimore, MD</SelectItem>
                        <SelectItem value="milwaukee">Milwaukee, WI</SelectItem>
                        <SelectItem value="albuquerque">Albuquerque, NM</SelectItem>
                        <SelectItem value="tucson">Tucson, AZ</SelectItem>
                        <SelectItem value="fresno">Fresno, CA</SelectItem>
                        <SelectItem value="mesa">Mesa, AZ</SelectItem>
                        <SelectItem value="sacramento">Sacramento, CA</SelectItem>
                        <SelectItem value="atlanta">Atlanta, GA</SelectItem>
                        <SelectItem value="kansas-city">Kansas City, MO</SelectItem>
                        <SelectItem value="colorado-springs">Colorado Springs, CO</SelectItem>
                        <SelectItem value="miami">Miami, FL</SelectItem>
                        <SelectItem value="raleigh">Raleigh, NC</SelectItem>
                        <SelectItem value="omaha">Omaha, NE</SelectItem>
                        <SelectItem value="long-beach">Long Beach, CA</SelectItem>
                        <SelectItem value="virginia-beach">Virginia Beach, VA</SelectItem>
                        <SelectItem value="oakland">Oakland, CA</SelectItem>
                        <SelectItem value="minneapolis">Minneapolis, MN</SelectItem>
                        <SelectItem value="tulsa">Tulsa, OK</SelectItem>
                        <SelectItem value="tampa">Tampa, FL</SelectItem>
                        <SelectItem value="arlington">Arlington, TX</SelectItem>
                        <SelectItem value="wichita">Wichita, KS</SelectItem>
                        <SelectItem value="other">Other (Please specify in full address)</SelectItem>
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
                        <SelectItem value="10001">10001 - New York, NY</SelectItem>
                        <SelectItem value="90210">90210 - Beverly Hills, CA</SelectItem>
                        <SelectItem value="60601">60601 - Chicago, IL</SelectItem>
                        <SelectItem value="77001">77001 - Houston, TX</SelectItem>
                        <SelectItem value="85001">85001 - Phoenix, AZ</SelectItem>
                        <SelectItem value="19101">19101 - Philadelphia, PA</SelectItem>
                        <SelectItem value="78201">78201 - San Antonio, TX</SelectItem>
                        <SelectItem value="92101">92101 - San Diego, CA</SelectItem>
                        <SelectItem value="75201">75201 - Dallas, TX</SelectItem>
                        <SelectItem value="95101">95101 - San Jose, CA</SelectItem>
                        <SelectItem value="73301">73301 - Austin, TX</SelectItem>
                        <SelectItem value="32099">32099 - Jacksonville, FL</SelectItem>
                        <SelectItem value="76101">76101 - Fort Worth, TX</SelectItem>
                        <SelectItem value="43215">43215 - Columbus, OH</SelectItem>
                        <SelectItem value="28202">28202 - Charlotte, NC</SelectItem>
                        <SelectItem value="94102">94102 - San Francisco, CA</SelectItem>
                        <SelectItem value="46201">46201 - Indianapolis, IN</SelectItem>
                        <SelectItem value="98101">98101 - Seattle, WA</SelectItem>
                        <SelectItem value="80202">80202 - Denver, CO</SelectItem>
                        <SelectItem value="20001">20001 - Washington, DC</SelectItem>
                        <SelectItem value="02101">02101 - Boston, MA</SelectItem>
                        <SelectItem value="79901">79901 - El Paso, TX</SelectItem>
                        <SelectItem value="48201">48201 - Detroit, MI</SelectItem>
                        <SelectItem value="37201">37201 - Nashville, TN</SelectItem>
                        <SelectItem value="97201">97201 - Portland, OR</SelectItem>
                        <SelectItem value="38101">38101 - Memphis, TN</SelectItem>
                        <SelectItem value="73101">73101 - Oklahoma City, OK</SelectItem>
                        <SelectItem value="89101">89101 - Las Vegas, NV</SelectItem>
                        <SelectItem value="40201">40201 - Louisville, KY</SelectItem>
                        <SelectItem value="21201">21201 - Baltimore, MD</SelectItem>
                        <SelectItem value="53201">53201 - Milwaukee, WI</SelectItem>
                        <SelectItem value="87101">87101 - Albuquerque, NM</SelectItem>
                        <SelectItem value="85701">85701 - Tucson, AZ</SelectItem>
                        <SelectItem value="93701">93701 - Fresno, CA</SelectItem>
                        <SelectItem value="85201">85201 - Mesa, AZ</SelectItem>
                        <SelectItem value="95814">95814 - Sacramento, CA</SelectItem>
                        <SelectItem value="30303">30303 - Atlanta, GA</SelectItem>
                        <SelectItem value="64108">64108 - Kansas City, MO</SelectItem>
                        <SelectItem value="80903">80903 - Colorado Springs, CO</SelectItem>
                        <SelectItem value="33101">33101 - Miami, FL</SelectItem>
                        <SelectItem value="27601">27601 - Raleigh, NC</SelectItem>
                        <SelectItem value="68102">68102 - Omaha, NE</SelectItem>
                        <SelectItem value="90802">90802 - Long Beach, CA</SelectItem>
                        <SelectItem value="23451">23451 - Virginia Beach, VA</SelectItem>
                        <SelectItem value="94601">94601 - Oakland, CA</SelectItem>
                        <SelectItem value="55401">55401 - Minneapolis, MN</SelectItem>
                        <SelectItem value="74103">74103 - Tulsa, OK</SelectItem>
                        <SelectItem value="33602">33602 - Tampa, FL</SelectItem>
                        <SelectItem value="76010">76010 - Arlington, TX</SelectItem>
                        <SelectItem value="67202">67202 - Wichita, KS</SelectItem>
                        <SelectItem value="other">Other (Please specify in address)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    type="button"
                    onClick={handleCompleteRegistration}
                    className="w-full h-12 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!fullAddress || !city || !zipCode || !agreed || registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Complete Registration'
                    )}
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

export default AgentRegistration;