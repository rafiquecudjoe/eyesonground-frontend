
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Features } from "@/components/sections/Features";
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
        <Features />
        <About />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
