
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProgressIndicatorProps {
  currentStep: "basicInfo" | "addressInfo";
}

export const ProgressIndicator = ({ currentStep }: ProgressIndicatorProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex justify-center items-center mb-8 md:mb-10">
      <div className="flex items-center">
        <div className={cn(
          "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center",
          "bg-[#2A64BA] text-white"
        )}>
          <Check size={isMobile ? 14 : 16} />
        </div>
        <span className="mx-2 text-xs md:text-sm text-[#0D264B]">Basic information</span>
      </div>
      <div className="w-10 md:w-16 h-[1px] bg-gray-300 mx-1 md:mx-2"></div>
      <div className="flex items-center">
        <div className={cn(
          "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center",
          currentStep === "addressInfo" ? "bg-[#2A64BA] text-white" : "border border-gray-300 text-gray-400"
        )}>
          {currentStep === "addressInfo" ? <Check size={isMobile ? 14 : 16} /> : "2"}
        </div>
        <span className={cn(
          "mx-2 text-xs md:text-sm",
          currentStep === "addressInfo" ? "text-[#0D264B]" : "text-gray-400"
        )}>
          Address information
        </span>
      </div>
    </div>
  );
};
