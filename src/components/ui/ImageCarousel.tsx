
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Image {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: Image[];
  interval?: number;
  className?: string;
}

export const ImageCarousel = ({
  images,
  interval = 5000,
  className,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden rounded-lg", className)}>
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
