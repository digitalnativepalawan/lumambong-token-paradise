
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
      answer: "Tokenization is a way to turn real-world assets—like beachfront land and modular homes—into digital tokens recorded securely on a blockchain. Think of these tokens as tiny shares of the property that anyone can buy. Unlike Bitcoin or other cryptocurrencies, which are digital money, these tokens represent actual ownership rights in the resort.\n\nThis means you don't have to buy an entire property; you can invest a small amount and still become a partner. Your tokens give you a share of the property's value, rental income, and even a say in important decisions through voting. The blockchain technology behind it keeps everything transparent, secure, and easy to trade, so you can buy or sell your ownership anytime without the usual hassle of real estate transactions.\n\nIn short, tokenization lowers the entry barrier for real estate investment, allowing both small and large investors worldwide to participate and benefit from owning a piece of paradise."
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
                openItems.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
