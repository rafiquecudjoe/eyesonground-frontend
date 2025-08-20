
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageGallerySectionProps {
  images: string[];
}

export const ImageGallerySection = ({ images }: ImageGallerySectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section>
      <h2 className="text-lg font-medium text-[rgba(13,38,75,1)] uppercase mb-4">IMAGES</h2>
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="overflow-hidden mx-auto" style={{ width: "1195.59px", height: "509.48px", maxWidth: "100%" }}>
            <img 
              src={images[currentImageIndex]} 
              alt={`Service image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain object-center"
            />
          </div>
          {images.length > 1 && (
            <div className="absolute inset-y-0 flex items-center justify-between w-full px-4">
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full bg-white/80 hover:bg-white shadow"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full bg-white/80 hover:bg-white shadow"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
};
