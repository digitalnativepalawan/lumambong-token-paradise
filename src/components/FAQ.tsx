
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
      question: "What is a real estate digital securities project and how does it work?",
      answer: "A real estate digital securities project converts ownership rights in physical assets—such as beachfront land and modular homes—into secure digital securities recorded on a blockchain. These digital securities act like small shares of the property, allowing anyone to invest, similar to owning shares in a company. Unlike cryptocurrencies, these digital securities represent actual ownership in the resort. Investors can buy as little or as much as they want, entitling them to a share of the property's value, potential rental income, and voting rights on important decisions. Blockchain technology ensures a secure, transparent record of ownership, automates dividend payments, and enforces rules without intermediaries, making real estate investing faster, safer, and more accessible."
    },
    {
      question: "How does blockchain technology benefit investment in this project?",
      answer: "Blockchain provides a transparent, tamper-proof record of all transactions, reducing the risk of fraud and errors. It streamlines processes, lowers costs, and enables faster, more secure transfers of ownership for investors."
    },
    {
      question: "Where are real estate digital securities being successfully implemented?",
      answer: "Real estate digital securities are already in use in major markets such as New York, Dubai, and Singapore. These projects allow global investors to participate in property ownership and benefit from increased liquidity."
    },
    {
      question: "Who are Binga Beach Brothers Inc.?",
      answer: "Binga Beach Brothers Inc. is a SEC-registered Philippine corporation managing this project. The company already operates the fully permitted and environmentally compliant Binga Beach Resort, maintaining a strong relationship with TIEZA and the local government (LGU)."
    },
    {
      question: "What permits and environmental compliances does the project have?",
      answer: "The project holds all required building permits and environmental clearances, and strictly follows both local and national regulations, ensuring responsible and legal development."
    },
    {
      question: "How does the governance model work for digital securities holders?",
      answer: "Digital securities holders can participate in governance through secure online voting, giving them a direct say in major project decisions and ensuring transparency."
    },
    {
      question: "What makes this project eco-friendly and sustainable?",
      answer: "The project uses green building materials, renewable energy sources, and sustainable design practices to minimize environmental impact and promote long-term ecological health."
    },
    {
      question: "How can I buy digital securities and what are the investment terms?",
      answer: "Investors can purchase digital securities through a secure, KYC/AML-compliant online platform. Each digital security represents fractional ownership, with clear terms on minimum investment, investor rights, and governance participation."
    },
    {
      question: "Where is Lumambong Beach located and why is it special?",
      answer: "Lumambong Beach is located in Barangay Binga, within San Vicente Municipality on Palawan Island, known as the \"Last Frontier\" of the Philippines. It is a dedicated Cluster 3 area in the TIEZA Tourism Master Plan, prized for its pristine shoreline, clear waters, and ecological significance."
    },
    {
      question: "Who is leading this project?",
      answer: "The project is led by partners of Binga Beach Brothers Inc., including David Le, who successfully created Binga Beach Resort and established the Lumambong Beach retreat with all permits and environmental compliance. Quennie Azarraga, also a partner, brings expertise from her glass and aluminum business as well as aggregates and construction ventures. Other key team members include:\n\nJulius Leuteric – Lead Solar Technician\nJasper Arcinas – Survivalist, Conservation Guide, Researcher\nRommel Cruz – Blue Bird Philippines, Mountain Expeditions\nAlfie Laos – Pinoy Mountaineer, Researcher, Drone Cinematographer, Food Science Video Editor\nCM Madrid – Environmental Planner, Consultant, Researcher\nMelinda Acala – Accountant, TESDA Course Instructor\n\nThis multidisciplinary team ensures expertise in property development, compliance, sustainability, and technology."
    }
  ];

  return (
    <section id="faq" className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Real Estate Digital Securities Project FAQ
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about digital securities real estate investment
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
