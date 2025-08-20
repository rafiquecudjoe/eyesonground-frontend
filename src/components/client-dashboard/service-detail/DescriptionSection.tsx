
import React from "react";
import { Card } from "@/components/ui/card";

interface DescriptionSectionProps {
  description: string;
}

export const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  return (
    <section>
      <h2 className="text-lg font-medium text-[rgba(13,38,75,1)] uppercase mb-4">DESCRIPTION</h2>
      <Card className="p-4">
        <p className="text-gray-700">{description}</p>
      </Card>
    </section>
  );
};
