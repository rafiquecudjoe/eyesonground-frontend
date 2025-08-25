import { ShieldCheck } from "lucide-react";

export const Mission = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-[rgba(42,100,186,0.05)] via-white to-[rgba(13,38,75,0.03)]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[rgba(42,100,186,0.1)] p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-2xl flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[rgba(13,38,75,1)]">
              Our Mission
            </h2>
            
            <p className="text-xl md:text-2xl font-semibold mb-6 text-[rgba(42,100,186,1)]">
              Helping buyers bid with confidence at equipment auctions.
            </p>
            
            <div className="space-y-4 text-lg text-[rgba(13,38,75,0.8)] leading-relaxed">
              <p>
                At Eyes on Ground, we act as your trusted presence where you can't be. Our verified local agents provide real-time inspections, photos, videos, and detailed reports so you know exactly what you're bidding on.
              </p>
              
              <p>
                We're not here to sell you on an item — we stay neutral and objective — giving you the facts you need to make the right decision. Whether it's farm machinery, trucks, or construction equipment, our goal is to reduce uncertainty, eliminate surprises, and give you confidence before placing your bid.
              </p>
            </div>
            
            <div className="mt-8">
              <p className="text-2xl font-bold italic text-[rgba(13,38,75,1)] bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] py-3 px-6 rounded-xl">
                Your eyes, on the ground.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
