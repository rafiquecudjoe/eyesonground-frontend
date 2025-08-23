
import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the inspection process work?",
      answer: "Simply create a service request with details about the item you want inspected. We'll match you with a verified local agent who will visit the location, conduct a thorough inspection, and provide real-time updates with photos, videos, and a detailed report within 24 hours."
    },
    {
      question: "What types of items can be inspected?",
      answer: "EyesOnGround agents can inspect virtually any item including vehicles, real estate properties, appliances, electronics, machinery, antiques, and more. Our agents are trained across multiple categories to provide expert assessments."
    },
    {
      question: "How much does an inspection cost?",
      answer: "Inspection fees vary based on the type of item, location, and complexity of the inspection. Basic inspections start from $50, while comprehensive property or vehicle inspections may cost more. You'll see the exact price before confirming your request."
    },
    {
      question: "Are your inspection agents qualified and trustworthy?",
      answer: "Absolutely! All EyesOnGround agents undergo rigorous background checks, identity verification, and skills assessment. Many have professional experience in their inspection categories, and all are rated by previous clients."
    },
    {
      question: "How quickly can I get an inspection done?",
      answer: "Most inspections can be scheduled within 24-48 hours. For urgent requests, we offer same-day inspections in major cities for an additional fee. The actual inspection typically takes 1-3 hours depending on the item complexity."
    }
  ];

  return (
    <section id="faq" className="flex flex-col relative min-h-[600px] items-center gap-8 overflow-hidden text-[rgba(13,38,75,1)] leading-[1.2] py-16 md:py-20 px-4 md:px-20 bg-gradient-to-b from-[rgba(234,241,255,0.5)] to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[rgba(42,100,186,0.3)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[rgba(13,38,75,0.2)] rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-full flex items-center justify-center shadow-2xl border-4 border-white relative">
          <Eye className="w-10 h-10 text-white" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-3 h-3 text-[rgba(13,38,75,1)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center mx-auto w-full max-w-3xl mt-[25px] max-md:max-w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center max-md:max-w-full mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-[rgba(13,38,75,0.7)] text-lg text-center mb-12 max-w-2xl">
          Everything you need to know about our remote inspection services
        </p>
        <div className="w-full text-lg md:text-xl font-normal max-md:max-w-full">
          {faqs.map((faq, index) => (
            <div key={index} className="w-full mt-4 max-md:max-w-full">
              <div className="w-full max-md:max-w-full bg-white rounded-2xl shadow-sm border border-[rgba(42,100,186,0.1)] overflow-hidden hover:shadow-md transition-all duration-300">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full justify-between items-center p-6 text-left hover:bg-[rgba(42,100,186,0.02)] transition-colors"
                >
                  <div className="flex-1 font-semibold text-[rgba(13,38,75,1)]">{faq.question}</div>
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(42,100,186,0.1)] transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg className="w-4 h-4 text-[rgba(42,100,186,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-base md:text-lg text-[rgba(13,38,75,0.8)] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA at bottom of FAQ */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] rounded-3xl border border-[rgba(42,100,186,0.2)]">
          <h3 className="text-2xl font-bold text-[rgba(13,38,75,1)] mb-4">Still have questions?</h3>
          <p className="text-[rgba(13,38,75,0.7)] mb-6">Our support team is here to help you get started with your first inspection.</p>
          <Button asChild className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/account-type">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
