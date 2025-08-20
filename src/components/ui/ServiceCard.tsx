
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
  link?: string;
}

export const ServiceCard = ({ icon, title, description, className, link }: ServiceCardProps) => {
  const CardContent = () => (
    <div className={cn(
      "bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)] flex flex-col overflow-hidden items-stretch p-6 rounded-2xl hover:bg-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.3)] transition-all duration-300 h-full group hover:transform hover:-translate-y-2 hover:shadow-2xl",
      className
    )}>
      <div className="self-center flex w-full flex-col items-center text-base text-white font-semibold leading-[30px]">
        <img
          src={icon}
          alt={title}
          className="w-20 h-20 object-cover rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300"
        />
        <h3 className="text-center text-lg font-bold mb-3">{title}</h3>
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
