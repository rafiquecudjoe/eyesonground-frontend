
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Services } from "@/components/sections/Services";
import { AuctionInspection } from "@/components/sections/AuctionInspection";
import { MarketplacePreview } from "@/components/sections/MarketplacePreview";
import { Features } from "@/components/sections/Features";
import { FeaturedAgents } from "@/components/sections/FeaturedAgents";
import { About } from "@/components/sections/About";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="bg-white overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <AuctionInspection />
        <MarketplacePreview />
        <Features />
        <FeaturedAgents />
        <Mission />
        <About />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
