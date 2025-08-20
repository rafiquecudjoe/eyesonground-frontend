
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

interface BasicInfoFormProps {
  firstName: string;
  lastName: string;
  dob: Date | undefined;
  email: string;
  password: string;
  agreed: boolean;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setDob: (value: Date | undefined) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setAgreed: (value: boolean) => void;
  onNextStep: () => void;
}

export const BasicInfoForm = ({
  firstName,
  lastName,
  dob,
  email,
  password,
  agreed,
  setFirstName,
  setLastName,
  setDob,
  setEmail,
  setPassword,
  setAgreed,
  onNextStep
}: BasicInfoFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useIsMobile();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="rounded-md h-11 md:h-12"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="rounded-md h-11 md:h-12"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dob">Date of birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                id="dob"
                value={dob ? format(dob, "PPP") : ""}
                readOnly
                className="rounded-md pl-3 cursor-pointer h-11 md:h-12"
                required
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
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
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md h-11 md:h-12"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md pr-10 h-11 md:h-12"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff size={isMobile ? 18 : 20} />
            ) : (
              <Eye size={isMobile ? 18 : 20} />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex items-start pt-2">
        <div className="flex items-center h-5">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => 
              setAgreed(checked === true)
            }
          />
        </div>
        <Label
          htmlFor="terms"
          className="ml-2 text-xs sm:text-sm font-normal text-[#0D264B]"
        >
          I agree to{" "}
          <Link to="/terms" className="text-[#2A64BA] hover:underline">
            Terms of Use
          </Link>{" "}
          &{" "}
          <Link
            to="/privacy"
            className="text-[#2A64BA] hover:underline"
          >
            Privacy Policy
          </Link>
        </Label>
      </div>
      
      <Button
        type="button"
        onClick={onNextStep}
        className="w-full bg-[#0D264B] text-white py-5 md:py-6 rounded-md mt-4"
        disabled={!agreed || !firstName || !lastName || !dob || !email || !password}
      >
        Next step
      </Button>
    </form>
  );
};
