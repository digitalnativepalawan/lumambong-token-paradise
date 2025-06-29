
import { Sparkles } from "lucide-react";
import { InvestmentExplanation as InvestmentExplanationType } from "./types";

interface InvestmentExplanationProps {
  investmentExplanation: InvestmentExplanationType | null;
  isGeneratingExplanation: boolean;
}

const InvestmentExplanation = ({
  investmentExplanation,
  isGeneratingExplanation
}: InvestmentExplanationProps) => {
  return (
    <div className="pt-3 sm:pt-4 border-t border-gray-200">
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-3 sm:p-4 md:p-6 rounded-xl border border-blue-200">
        <div className="flex items-start gap-2 sm:gap-3 mb-3">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-blue-800 mb-1 text-sm sm:text-base">What This Means For You</h5>
            <p className="text-xs text-blue-700">AI-powered investment summary</p>
          </div>
        </div>
        
        {isGeneratingExplanation ? (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-blue-600"></div>
            <span className="text-xs sm:text-sm">Generating personalized explanation...</span>
          </div>
        ) : investmentExplanation ? (
          <div className="text-xs sm:text-sm text-blue-800 leading-relaxed">
            {investmentExplanation.explanation}
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-blue-700 leading-relaxed">
            Adjust your investment amount to see a personalized explanation of your potential returns.
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentExplanation;
