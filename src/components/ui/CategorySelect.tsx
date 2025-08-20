import React from "react";
import { Search, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CategorySelect = () => {
  const categories = [
    "Vehicle Inspection",
    "Property Assessment", 
    "Appliance Check",
    "Electronics Verification",
    "Machinery Inspection",
    "Antique Authentication",
    "Equipment Evaluation",
    "Real Estate Survey",
    "Art & Collectibles",
    "General Item Inspection"
  ];

  return (
    <div className="flex w-full max-w-[586px] flex-col gap-3">
      <div className="flex items-center gap-2 text-xl font-semibold text-[rgba(20,40,77,1)]">
        <Eye className="h-6 w-6 text-[rgba(42,100,186,1)]" />
        <span>Request an Inspection</span>
      </div>
      <div className="relative flex w-full items-center gap-3">
        <div className="absolute left-4 z-10">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <Select>
          <SelectTrigger className="h-[65px] w-full rounded-2xl border-2 border-[rgba(42,100,186,0.2)] bg-white/80 backdrop-blur-sm pl-12 text-[rgba(20,40,77,0.8)] text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[rgba(42,100,186,0.4)]">
            <SelectValue placeholder="What would you like to inspect?" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-[rgba(42,100,186,0.2)]">
            {categories.map((category) => (
              <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')} className="hover:bg-[rgba(42,100,186,0.1)]">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};