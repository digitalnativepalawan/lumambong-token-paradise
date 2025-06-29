
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Info,
  Home,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SimulationResult {
  ownershipPct: number;
  annualStayDays: number;
  annualDividendUSD: number;
  breakdown: {
    grossRental: number;
    grossAmenities: number;
    netIncome: number;
    dividendPool: number;
  };
  caps: {
    foreignCap: number;
    philippineCap: number;
    remainingForeign: number;
    remainingPhilippine: number;
  };
}

interface InvestmentExplanation {
  explanation: string;
  metrics: {
    totalInvestment: number;
    equityToday: number;
    equityFuture: number;
    equityGain: number;
    twelveYearDividends: number;
    totalReturnMultiple: number;
  };
}

const DigitalSecuritiesSimulator = () => {
  const [tokenQuantity, setTokenQuantity] = useState([1000]);
  const [investorType, setInvestorType] = useState<'PHILIPPINE' | 'FOREIGN'>('PHILIPPINE');
  const [currency, setCurrency] = useState<'USD' | 'PHP'>('USD');
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [investmentExplanation, setInvestmentExplanation] = useState<InvestmentExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Constants
  const TOTAL_TOKENS = 248400;
  const TOKEN_PRICE = 25; // USD
  const USD_TO_PHP = 56;

  // Calculate max tokens based on investor type and available caps
  const getMaxTokens = () => {
    if (!simulationResult) return 10000; // Default while loading
    
    return investorType === 'FOREIGN' 
      ? simulationResult.caps.remainingForeign
      : simulationResult.caps.remainingPhilippine;
  };

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

      // Generate explanation after successful simulation
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

  // Update slider max when caps change
  useEffect(() => {
    if (simulationResult) {
      const maxTokens = getMaxTokens();
      if (tokenQuantity[0] > maxTokens) {
        setTokenQuantity([Math.min(maxTokens, 1000)]);
      }
    }
  }, [simulationResult, investorType]);

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
                {/* Left Column - Inputs */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Token Quantity Selector */}
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      <Label className="text-xs sm:text-sm font-medium">Digital Securities Quantity</Label>
                      <Input
                        type="number"
                        value={tokenQuantity[0]}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1;
                          const maxTokens = getMaxTokens();
                          setTokenQuantity([Math.min(Math.max(1, value), maxTokens)]);
                        }}
                        className="w-full text-center text-base sm:text-lg font-medium py-2 sm:py-3"
                        min="1"
                        max={getMaxTokens()}
                      />
                    </div>
                    <Slider
                      value={tokenQuantity}
                      onValueChange={setTokenQuantity}
                      max={getMaxTokens()}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1</span>
                      <span>{getMaxTokens().toLocaleString()} max</span>
                    </div>
                  </div>

                  {/* Investor Type Toggle */}
                  <div className="space-y-3">
                    <Label className="text-xs sm:text-sm font-medium">Investor Classification</Label>
                    <Tabs value={investorType} onValueChange={(value) => setInvestorType(value as 'PHILIPPINE' | 'FOREIGN')}>
                      <TabsList className="grid w-full grid-cols-1 gap-2 h-auto bg-gray-100">
                        <TabsTrigger value="PHILIPPINE" className="text-xs sm:text-sm py-2 px-3 data-[state=active]:bg-white">
                          🇵🇭 Philippine (60% Pool)
                        </TabsTrigger>
                        <TabsTrigger value="FOREIGN" className="text-xs sm:text-sm py-2 px-3 data-[state=active]:bg-white">
                          🌍 Foreign (40% Pool)
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    {simulationResult && (
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border">
                        <div className="font-medium mb-1">Pool Availability</div>
                        <div>
                          {investorType === 'FOREIGN' 
                            ? simulationResult.caps.remainingForeign.toLocaleString()
                            : simulationResult.caps.remainingPhilippine.toLocaleString()
                          } tokens remaining
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Currency Toggle */}
                  <div className="space-y-3">
                    <Label className="text-xs sm:text-sm font-medium">Display Currency</Label>
                    <Tabs value={currency} onValueChange={(value) => setCurrency(value as 'USD' | 'PHP')}>
                      <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                        <TabsTrigger value="USD" className="py-2 text-xs sm:text-sm data-[state=active]:bg-white">USD ($)</TabsTrigger>
                        <TabsTrigger value="PHP" className="py-2 text-xs sm:text-sm data-[state=active]:bg-white">PHP (₱)</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                {/* Right Column - Results */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold mb-2">Investment Summary</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Your projected returns and benefits</p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs sm:text-sm text-red-800 leading-relaxed">{error}</div>
                    </div>
                  )}

                  {isLoading ? (
                    <div className="text-center py-6">
                      <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2">Calculating...</p>
                    </div>
                  ) : simulationResult && (
                    <div className="space-y-3">
                      {/* Summary Cards Grid */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center border border-blue-100">
                          <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
                          <div className="text-xs sm:text-sm font-bold text-blue-600 leading-tight">
                            {formatCurrency(tokenQuantity[0] * TOKEN_PRICE)}
                          </div>
                          <div className="text-xs text-blue-700 mt-1">Investment</div>
                        </div>

                        <div className="bg-green-50 p-2 sm:p-3 rounded-lg text-center border border-green-100">
                          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mx-auto mb-1" />
                          <div className="text-xs sm:text-sm font-bold text-green-600 leading-tight">
                            {simulationResult.ownershipPct}%
                          </div>
                          <div className="text-xs text-green-700 mt-1">Ownership</div>
                        </div>

                        <div className="bg-purple-50 p-2 sm:p-3 rounded-lg text-center border border-purple-100">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mx-auto mb-1" />
                          <div className="text-xs sm:text-sm font-bold text-purple-600 leading-tight">
                            {simulationResult.annualStayDays}
                          </div>
                          <div className="text-xs text-purple-700 mt-1">Stay Days/Year</div>
                        </div>

                        <div className="bg-orange-50 p-2 sm:p-3 rounded-lg text-center border border-orange-100">
                          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mx-auto mb-1" />
                          <div className="text-xs sm:text-sm font-bold text-orange-600 leading-tight">
                            {formatCurrency(simulationResult.annualDividendUSD)}
                          </div>
                          <div className="text-xs text-orange-700 mt-1">Annual Dividend</div>
                        </div>
                      </div>

                      {/* Revenue Breakdown Table */}
                      <div className="bg-gray-50 p-3 rounded-lg border">
                        <h5 className="font-medium text-gray-800 mb-2 text-xs sm:text-sm">Revenue Breakdown</h5>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center py-1">
                            <span className="text-xs text-gray-600">Gross Rental:</span>
                            <span className="text-xs font-medium">{formatCurrency(simulationResult.breakdown.grossRental)}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-xs text-gray-600">Amenity Revenue:</span>
                            <span className="text-xs font-medium">{formatCurrency(simulationResult.breakdown.grossAmenities)}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-xs text-gray-600">Net Income:</span>
                            <span className="text-xs font-medium">{formatCurrency(simulationResult.breakdown.netIncome)}</span>
                          </div>
                          <div className="flex justify-between items-center py-1 border-t border-gray-200 pt-2">
                            <span className="text-xs text-gray-600 font-medium">Dividend Pool:</span>
                            <span className="text-xs font-bold text-gray-800">{formatCurrency(simulationResult.breakdown.dividendPool)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Investment Explanation Section */}
              {simulationResult && (
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
