
import React from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VideoSectionProps {
  videoUrl: string;
  thumbnailUrl: string;
}

export const VideoSection = ({ videoUrl, thumbnailUrl }: VideoSectionProps) => {
  return (
    <section>
      <h2 className="text-lg font-medium text-[rgba(13,38,75,1)] uppercase mb-4">VIDEO</h2>
      <Card className="overflow-hidden">
        <div className="relative h-[200px] bg-gray-900">
          <img 
            src={thumbnailUrl} 
            alt="Video thumbnail"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="icon" variant="secondary" className="rounded-full bg-white/30 hover:bg-white/50 w-14 h-14">
              <Play className="h-6 w-6 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};
