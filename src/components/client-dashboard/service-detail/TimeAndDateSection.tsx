
import React from "react";
import { Card } from "@/components/ui/card";

interface TimeAndDateSectionProps {
  date: string;
  time: string;
  duration: string;
  mile: string;
}

export const TimeAndDateSection = ({ date, time, duration, mile }: TimeAndDateSectionProps) => {
  return (
    <section>
      <h2 className="text-lg font-medium text-[rgba(13,38,75,1)] uppercase mb-4">TIME AND DATE</h2>
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Date:</p>
            <p className="font-medium">{date}</p>
          </div>
          <div>
            <p className="text-gray-600">Time:</p>
            <p className="font-medium">{time}</p>
          </div>
          <div>
            <p className="text-gray-600">Service duration:</p>
            <p className="font-medium">{duration}</p>
          </div>
          <div>
            <p className="text-gray-600">Mile:</p>
            <p className="font-medium">{mile}</p>
          </div>
        </div>
      </Card>
    </section>
  );
};
