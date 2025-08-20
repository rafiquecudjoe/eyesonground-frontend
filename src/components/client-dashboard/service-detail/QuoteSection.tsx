
import React from "react";
import { Card } from "@/components/ui/card";

interface QuoteSectionProps {
  quote: string;
}

export const QuoteSection = ({ quote }: QuoteSectionProps) => {
  return (
    <section>
      <h2 className="text-lg font-medium text-[rgba(13,38,75,1)] uppercase mb-4">QUOTE</h2>
      <Card className="p-4">
        <p className="text-xl font-bold text-[rgba(13,38,75,1)]">{quote}</p>
      </Card>
    </section>
  );
};
