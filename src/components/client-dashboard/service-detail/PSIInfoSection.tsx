
import React from "react";
import { Card } from "@/components/ui/card";

interface PSIInfoSectionProps {
  category: string;
  subCategory: string;
  details: string;
  agentName: string;
}

export const PSIInfoSection = ({ category, subCategory, details, agentName }: PSIInfoSectionProps) => {
  return (
    <section>
      <h2 className="text-lg font-medium text-[rgba(13,38,75,1)] uppercase mb-4">PSI INFORMATION</h2>
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Category:</p>
            <p className="font-medium">{category}</p>
          </div>
          <div>
            <p className="text-gray-600">Sub category:</p>
            <p className="font-medium">{subCategory}</p>
          </div>
          <div>
            <p className="text-gray-600">Details:</p>
            <p className="font-medium">{details}</p>
          </div>
          <div>
            <p className="text-gray-600">Agent name:</p>
            <p className="font-medium">{agentName}</p>
          </div>
        </div>
      </Card>
    </section>
  );
};
