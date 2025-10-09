
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface AngelInvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AngelInvestorModal = ({ isOpen, onClose }: AngelInvestorModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Angel investor presentation slides - these would be the content from the Google Drive presentation
  const slides = [
    {
      title: "Angel Investor Opportunity",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-black">Palawan Collective Token (BBT)</h3>
          <p className="text-lg text-gray-700">
            Revolutionary tokenized real estate investment opportunity in pristine Palawan beachfront property.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$25</div>
              <div className="text-sm text-blue-700">Token Price</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$2.5M</div>
              <div className="text-sm text-green-700">Total Raise</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Investment Highlights",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-black">Why Invest in BBT?</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-black">Prime Location</h4>
              <p className="text-gray-700">UNESCO Biosphere Reserve, Palawan - World's Best Island</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-black">Tokenized Ownership</h4>
              <p className="text-gray-700">Fractional ownership with governance rights and timeshare benefits</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-black">Multiple Revenue Streams</h4>
              <p className="text-gray-700">Rental income, token appreciation, and ecosystem rewards</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Market Opportunity",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-black">Market Size & Growth</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-black">$2.7B</div>
                <div className="text-sm text-gray-600">Global Real Estate Tokenization Market</div>
                <div className="text-xs text-green-600">+18.2% CAGR</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-black">$8.2B</div>
                <div className="text-sm text-gray-600">Philippines Tourism Revenue</div>
                <div className="text-xs text-green-600">+25% YoY</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-black">1.8M</div>
                <div className="text-sm text-gray-600">Palawan Tourist Arrivals</div>
                <div className="text-xs text-green-600">+35% YoY</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-black">12-18%</div>
                <div className="text-sm text-gray-600">Average Beach Resort ROI</div>
                <div className="text-xs text-green-600">Annually</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Financial Projections",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-black">5-Year Financial Outlook</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Revenue Projections</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">Year 1</div>
                  <div className="text-sm text-blue-700">$150K</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">Year 3</div>
                  <div className="text-sm text-blue-700">$450K</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">Year 5</div>
                  <div className="text-sm text-blue-700">$850K</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Token Value Growth</h4>
              <p className="text-green-700">Projected 15-25% annual appreciation based on property value and ecosystem growth</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Investment Terms",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-black">Angel Investment Details</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-black mb-2">Minimum Investment</h4>
              <p className="text-gray-700">$10,000 USD (400 BBT tokens)</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-black mb-2">Angel Investor Benefits</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Priority access to all 10 modular units</li>
                <li>• Governance voting rights</li>
                <li>• Timeshare privileges (2 weeks annually)</li>
                <li>• Revenue sharing from rental income</li>
                <li>• Early access to Phase 3 expansion</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-black mb-2">Lock-up Period</h4>
              <p className="text-gray-700">12 months with quarterly liquidity windows</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Next Steps",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-black">Ready to Invest?</h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-black mb-3">Contact Information</h4>
              <div className="space-y-2">
                <p className="text-gray-700">📧 david@bingabeach.com</p>
                <p className="text-gray-700">📱 +63 947 444 3597</p>
                <p className="text-gray-700">🌐 Visit our full presentation at:</p>
                <a 
                  href="https://drive.google.com/file/d/18yJQc1Qq7r8SZuSTUFwu5O2xwSqINgyW/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  Google Drive Presentation
                </a>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-4">Ready to secure your piece of paradise?</p>
              <Button 
                onClick={onClose}
                className="modern-button px-8 py-3 rounded-xl"
              >
                Let's Discuss Your Investment
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            Angel Investor Presentation
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-[500px] p-6">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {currentSlide + 1} of {slides.length}
            </span>
            <div className="flex gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              onClick={onClose}
              className="ml-4 px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AngelInvestorModal;
