
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "What is tokenization and how does it apply to this real estate project?",
      answer: "Tokenization converts ownership rights of real assets like beachfront land and modular homes into digital tokens on a blockchain, enabling fractional ownership, easy trading, automated revenue sharing, and governance participation."
    },
    {
      question: "How does blockchain technology benefit investors in this project?",
      answer: "Blockchain ensures transparency, security, and automation by maintaining immutable ownership records, automating dividend payments, enforcing transfer restrictions, and enabling on-chain voting, reducing intermediaries and costs."
    },
    {
      question: "Where else is real estate tokenization being successfully implemented?",
      answer: "Real estate tokenization is growing worldwide in markets such as New York, Dubai, and Singapore, opening property investment to wider audiences and improving liquidity in traditionally illiquid assets."
    },
    {
      question: "Who are Binga Beach Brothers Inc.?",
      answer: "Binga Beach Brothers Inc. is the SEC-registered Philippine corporation behind this project. It owns titled beachfront land in Palawan, has secured all necessary permits, complies with environmental regulations, and is authorized for land buying and selling."
    },
    {
      question: "What permits and environmental compliances does the project have?",
      answer: "The project holds all required local and national permits for land development and resort operations. It adheres to strict environmental compliance through sustainable planning and continuous monitoring to protect Palawan's ecosystem."
    },
    {
      question: "How does the timeshare and governance model work for token holders?",
      answer: "Token holders receive proportional timeshare rights to use or rent their units annually. They also participate in governance by voting on key resort decisions through secure on-chain mechanisms, giving them a voice in property management and development."
    },
    {
      question: "What makes this resort eco-friendly and sustainable?",
      answer: "The resort features modular homes with low environmental footprints, powered by 10 kVA solar systems for off-grid energy. Wastewater is managed via PVC septic tanks, and water is sustainably sourced and pumped. All construction and operations prioritize minimal ecological impact."
    },
    {
      question: "How can I buy tokens and what are the investment terms?",
      answer: "Tokens are sold through a secure, KYC/AML-compliant online portal. Each token represents fractional ownership of a lot and entitles holders to revenue sharing and governance rights. The initial offering price is $25 per token, with a funding goal of $2.5 million."
    },
    {
      question: "Where is Lumambong Beach located and why is it special?",
      answer: "Lumambong Beach is in Sitio Lumambong, San Vicente, Palawan Island, Philippines—an area known for pristine beaches, rich biodiversity, and growing eco-tourism. It is part of the Tourism Infrastructure and Enterprise Zone Authority (TIEZA) program, which offers both foreign and Filipino investors significant incentives including VAT tax relief, import/export benefits, visa facilitation for families, and other government-supported tourism enterprise zone advantages."
    },
    {
      question: "Who is the team behind this project?",
      answer: "The project is led by partners of Binga Beach Brothers Inc., including David Le, who successfully created Binga Beach Resort and established the Lumambong Beach retreat with all permits and environmental compliance. Quennie Azarraga, also a partner, brings expertise from her glass and aluminum business as well as aggregates and construction ventures. Other key team members include:\n\nJulius Leuteric (Lead Solar Technician)\n\nJasper Arcinas (Survivalist, Conservation Guide, Researcher)\n\nRommel Cruz (Blue Bird Philippines, Mountain Expeditions)\n\nAlfie Laos (Pinoy Mountaineer, Researcher, Drone Cinematographer, Food Science Video Editor)\n\nCM Madrid (Environmental Planner, Consultant, Researcher)\n\nMelinda Acala (Accountant, TESDA Course Instructor)"
    }
  ];

  return (
    <section id="faq" className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about tokenized real estate investment
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-black pr-4">
                  {item.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                openItems.includes(index) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="px-8 pb-6">
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
