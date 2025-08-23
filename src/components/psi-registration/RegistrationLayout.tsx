
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface RegistrationLayoutProps {
  children: ReactNode;
}

export const RegistrationLayout = ({ children }: RegistrationLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Link
        to="/"
        className="flex items-center gap-4 text-[rgba(13,38,75,1)] py-4 md:py-6 px-4 md:pl-10"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/113b119e8f2edb03a62904cfa33b3c300948ba0a?placeholderIfAbsent=true"
          alt="PSI Company Logo"
          className="aspect-[1] object-contain w-8 md:w-10 self-stretch shrink-0 my-auto"
        />
        <span className="text-xl md:text-2xl font-light self-stretch my-auto">PSI COMPANY</span>
      </Link>
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side with image - hidden on mobile */}
        <div className="hidden md:block md:w-[380px] bg-blue-600 relative">
          <img
            src="/lovable-uploads/922e7656-a989-40b5-afd3-dd2377a7facb.png"
            alt="Agent"
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Right side with form */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-6 md:py-10">
          <div className="w-full max-w-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
