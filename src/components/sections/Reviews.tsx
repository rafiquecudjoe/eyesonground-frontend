
import { ReviewCard } from "../ui/ReviewCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export const Reviews = () => {
  const reviews = [
    {
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      name: "Sarah Mitchell",
      role: "Online Buyer",
      rating: 5,
      comment:
        "I needed to inspect a vintage car in another state before buying. The EyesOnGround agent was incredibly thorough - sent detailed photos, videos, and even did a test drive. Saved me from a bad purchase!",
    },
    {
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      name: "Marcus Chen",
      role: "Property Investor",
      rating: 5,
      comment:
        "Used EyesOnGround to inspect multiple properties across different cities. The agents were professional, punctual, and provided exactly the information I needed to make investment decisions.",
    },
    {
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      name: "David Rodriguez",
      role: "Inspection Agent",
      rating: 5,
      comment:
        "Working as an EyesOnGround agent has been incredibly rewarding. The platform is easy to use, clients are respectful, and I love helping people make informed purchasing decisions.",
    },
    {
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      name: "Jennifer Walsh",
      role: "Equipment Buyer",
      rating: 5,
      comment:
        "Needed to inspect industrial equipment before a major purchase. The agent's technical knowledge was impressive, and the detailed report helped me negotiate a better price. Excellent service!",
    },
    {
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      name: "Alex Thompson",
      role: "Antique Collector",
      rating: 5,
      comment:
        "As an antique collector, authenticity is crucial. EyesOnGround's agents have the expertise to spot details I need to verify. The video calls during inspections are a game-changer!",
    },
    {
      avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      name: "Maria Santos",
      role: "Small Business Owner",
      rating: 5,
      comment:
        "I run an online store and often need to verify products from suppliers. EyesOnGround has become an essential part of my business. Fast, reliable, and incredibly detailed inspections every time.",
    }
  ];

  return (
    <section id="reviews" className="w-full px-4 py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[rgba(42,100,186,0.3)] rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[rgba(13,38,75,0.2)] rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[rgba(13,38,75,1)] text-3xl md:text-5xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-[rgba(13,38,75,0.7)] text-lg md:text-xl max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust EyesOnGround for their remote inspection needs
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <ReviewCard {...review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="relative static left-0 right-auto translate-y-0" />
            <CarouselNext className="relative static right-0 left-auto translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
