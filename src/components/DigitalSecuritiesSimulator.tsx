
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import InvestmentControls from "./digital-securities/InvestmentControls";
import InvestmentResults from "./digital-securities/InvestmentResults";
import InvestmentExplanation from "./digital-securities/InvestmentExplanation";
import { SimulationResult, InvestmentExplanation as InvestmentExplanationType, InvestorType, Currency } from "./digital-securities/types";

const DigitalSecuritiesSimulator = () => {
  const [tokenQuantity, setTokenQuantity] = useState([1000]);
  const [investorType, setInvestorType] = useState<InvestorType>('PHILIPPINE');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [investmentExplanation, setInvestmentExplanation] = useState<InvestmentExplanationType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Constants
  const TOTAL_TOKENS = 248400;
  const USD_TO_PHP = 56;

  const formatCurrency = (amount: number) => {
    if (currency === 'PHP') {
      return `₱${(amount * USD_TO_PHP).toLocaleString()}`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const simulateInvestment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('simulate-investment', {
        body: {
          tokensPurchased: tokenQuantity[0],
          totalTokens: TOTAL_TOKENS,
          investorType: investorType
        }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        setError(data.error);
        toast.error(data.error);
        return;
      }

      setSimulationResult(data);
      generateExplanation(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to simulate investment';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const generateExplanation = async (simulationData: SimulationResult) => {
    setIsGeneratingExplanation(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-investment-explanation', {
        body: {
          tokensPurchased: tokenQuantity[0],
          totalTokens: TOTAL_TOKENS,
          investorType: investorType,
          simulationResult: simulationData
        }
      });

      if (error) {
        console.error('Failed to generate explanation:', error);
        return;
      }

      setInvestmentExplanation(data);
    } catch (err) {
      console.error('Explanation generation error:', err);
    } finally {
      setIsGeneratingExplanation(false);
    }
  };

  // Run simulation on component mount and when inputs change
  useEffect(() => {
    simulateInvestment();
  }, [tokenQuantity[0], investorType]);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-emerald-50 py-6 md:py-16 mt-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="text-center mb-6 md:mb-12">
          <Badge className="mb-3 bg-emerald-100 text-emerald-800 text-xs sm:text-sm">
            <Calculator className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Investment Simulator
          </Badge>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-6 text-black px-2">
            BBT Digital Securities Calculator
          </h3>
          <p className="text-sm md:text-lg text-gray-700 max-w-3xl mx-auto px-2 leading-relaxed">
            Simulate your investment in Palawan real estate through our Digital Securities. 
            Each lot includes titled land, solar-powered modular homes, valued at $250,000 USD.
          </p>
        </div>

        <div className="space-y-4 md:space-y-8">
          <Card className="p-3 sm:p-4 md:p-8 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <div className="space-y-4 md:space-y-8">
              <div className="text-center">
                <h4 className="text-base sm:text-lg md:text-xl font-bold mb-2">Investment Calculator</h4>
                <p className="text-xs sm:text-sm text-gray-600">Configure your Digital Securities purchase</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12">
                {/* Left Column - Controls */}
                <div>
                  <div className="text-center mb-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold mb-2">Investment Configuration</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Set your investment parameters</p>
                  </div>
                  <InvestmentControls
                    tokenQuantity={tokenQuantity}
                    setTokenQuantity={setTokenQuantity}
                    investorType={investorType}
                    setInvestorType={setInvestorType}
                    currency={currency}
                    setCurrency={setCurrency}
                    simulationResult={simulationResult}
                  />
                </div>

                {/* Right Column - Results */}
                <div>
                  <div className="text-center mb-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold mb-2">Investment Summary</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Your projected returns and benefits</p>
                  </div>
                  <InvestmentResults
                    simulationResult={simulationResult}
                    tokenQuantity={tokenQuantity[0]}
                    currency={currency}
                    isLoading={isLoading}
                    error={error}
                    formatCurrency={formatCurrency}
                  />
                </div>
              </div>

              {/* Investment Explanation Section */}
              {simulationResult && (
                <InvestmentExplanation
                  investmentExplanation={investmentExplanation}
                  isGeneratingExplanation={isGeneratingExplanation}
                />
              )}
            </div>
          </Card>

          {/* Disclaimer */}
          <div className="p-3 sm:p-4 md:p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-start gap-2 sm:gap-3">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm text-yellow-800">
                <p className="font-medium mb-2">Important Disclaimer</p>
                <p className="leading-relaxed">
                  Digital Securities represent fractional ownership in real estate assets. 
                  All projections are estimates based on current market conditions and are not guaranteed. 
                  Past performance does not indicate future results. Please consult with financial 
                  advisors before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalSecuritiesSimulator;
