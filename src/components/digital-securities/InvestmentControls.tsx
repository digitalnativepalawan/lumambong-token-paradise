
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestorType, Currency, SimulationResult } from "./types";

interface InvestmentControlsProps {
  tokenQuantity: number[];
  setTokenQuantity: (value: number[]) => void;
  investorType: InvestorType;
  setInvestorType: (value: InvestorType) => void;
  currency: Currency;
  setCurrency: (value: Currency) => void;
  simulationResult: SimulationResult | null;
}

const InvestmentControls = ({
  tokenQuantity,
  setTokenQuantity,
  investorType,
  setInvestorType,
  currency,
  setCurrency,
  simulationResult
}: InvestmentControlsProps) => {
  const getMaxTokens = () => {
    if (!simulationResult) return 10000;
    return investorType === 'FOREIGN' 
      ? simulationResult.caps.remainingForeign
      : simulationResult.caps.remainingPhilippine;
  };

  // Update slider max when caps change
  useEffect(() => {
    if (simulationResult) {
      const maxTokens = getMaxTokens();
      if (tokenQuantity[0] > maxTokens) {
        setTokenQuantity([Math.min(maxTokens, 1000)]);
      }
    }
  }, [simulationResult, investorType, tokenQuantity, setTokenQuantity]);

  return (
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
        <Tabs value={investorType} onValueChange={(value) => setInvestorType(value as InvestorType)}>
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
        <Tabs value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="USD" className="py-2 text-xs sm:text-sm data-[state=active]:bg-white">USD ($)</TabsTrigger>
            <TabsTrigger value="PHP" className="py-2 text-xs sm:text-sm data-[state=active]:bg-white">PHP (₱)</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentControls;
