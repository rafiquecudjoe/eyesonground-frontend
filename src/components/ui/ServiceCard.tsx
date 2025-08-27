
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  link?: string;
}

export const ServiceCard = ({ icon: Icon, title, description, className, link }: ServiceCardProps) => {
  const CardContent = () => (
    <div className={cn(
      "bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)] flex flex-col overflow-hidden items-stretch p-6 rounded-2xl hover:bg-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.3)] transition-all duration-300 h-full group hover:transform hover:-translate-y-2 hover:shadow-2xl",
      className
    )}>
      <div className="self-center flex w-full flex-col items-center text-base text-white font-semibold leading-[30px]">
        <div className="w-24 h-24 bg-gradient-to-br from-white/25 to-white/15 rounded-3xl shadow-2xl mb-6 group-hover:scale-110 transition-all duration-500 border border-white/30 flex items-center justify-center group-hover:from-white/35 group-hover:to-white/25 group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Icon className="w-12 h-12 text-white drop-shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h3 className="text-center text-lg font-bold mb-3 group-hover:text-white transition-colors duration-300">{title}</h3>
      </div>
      <p className="text-[rgba(219,231,255,0.9)] text-sm font-normal leading-relaxed text-center flex-1">
        {description}
      </p>
      <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.2)]">
        <div className="text-center">
          <span className="text-xs text-[rgba(219,231,255,0.8)] group-hover:text-white transition-colors">Learn More →</span>
        </div>
      </div>
    </div>
  );

  return link ? (
    <Link to={link}>
      <CardContent />
    </Link>
  ) : (
    <CardContent />
  );
};

ServiceCard.displayName = "ServiceCard";
