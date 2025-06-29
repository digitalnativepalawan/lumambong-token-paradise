
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Download, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Info,
  Home
} from "lucide-react";
import SimulatorResultsTable from "./SimulatorResultsTable";
import SimulatorChart from "./SimulatorChart";

const DigitalSecuritiesSimulator = () => {
  const [tokenQuantity, setTokenQuantity] = useState([1000]);
  const [nationality, setNationality] = useState<'filipino' | 'foreign'>('filipino');
  const [currency, setCurrency] = useState<'USD' | 'PHP'>('USD');

  // Configurable parameters
  const FILIPINO_ALLOCATION = 0.6;
  const FOREIGN_ALLOCATION = 0.4;
  const TOKENS_PER_LOT = 100000;
  const LOT_VALUE = 250000; // USD
  const TOKEN_PRICE = 25; // USD
  const TOTAL_STAYS_PER_LOT = 365; // days per year
  const PROJECTED_ANNUAL_RENT = 125000; // USD per lot

  // Exchange rate (simplified)
  const USD_TO_PHP = 56;

  // Calculations
  const tokensPurchased = tokenQuantity[0];
  const ownershipPercentage = (tokensPurchased / TOKENS_PER_LOT) * 100;
  const investmentAmount = tokensPurchased * TOKEN_PRICE;
  
  const staysAllocation = nationality === 'filipino' 
    ? (tokensPurchased / TOKENS_PER_LOT) * TOTAL_STAYS_PER_LOT * FILIPINO_ALLOCATION
    : (tokensPurchased / TOKENS_PER_LOT) * TOTAL_STAYS_PER_LOT * FOREIGN_ALLOCATION;
    
  const annualDividend = (tokensPurchased / TOKENS_PER_LOT) * PROJECTED_ANNUAL_RENT * 0.3; // 30% revenue share

  const formatCurrency = (amount: number) => {
    if (currency === 'PHP') {
      return `₱${(amount * USD_TO_PHP).toLocaleString()}`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const downloadSummary = () => {
    const summaryData = {
      tokensPurchased,
      nationality,
      ownershipPercentage: ownershipPercentage.toFixed(3),
      investmentAmount: formatCurrency(investmentAmount),
      annualStays: Math.round(staysAllocation),
      projectedAnnualDividend: formatCurrency(annualDividend),
      currency,
      generatedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(summaryData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `BBT-Investment-Summary-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-emerald-50 py-16 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800">
            <Calculator className="w-4 h-4 mr-2" />
            Investment Simulator
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-black">
            BBT Digital Securities Calculator
          </h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Simulate your investment in Palawan real estate through our Digital Securities. 
            Each lot includes titled land, solar-powered modular homes, valued at $250,000 USD.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Panel */}
          <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div className="space-y-8">
              <div className="text-center">
                <h4 className="text-xl font-bold mb-2">Investment Calculator</h4>
                <p className="text-sm text-gray-600">Configure your Digital Securities purchase</p>
              </div>

              {/* Token Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Digital Securities Quantity</Label>
                  <Input
                    type="number"
                    value={tokenQuantity[0]}
                    onChange={(e) => setTokenQuantity([parseInt(e.target.value) || 1])}
                    className="w-24 text-right"
                    min="1"
                    max="100000"
                  />
                </div>
                <Slider
                  value={tokenQuantity}
                  onValueChange={setTokenQuantity}
                  max={10000}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>10,000+</span>
                </div>
              </div>

              {/* Nationality Toggle */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Investor Classification</Label>
                <Tabs value={nationality} onValueChange={(value) => setNationality(value as 'filipino' | 'foreign')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="filipino" className="text-sm">
                      🇵🇭 Filipino (60% Pool)
                    </TabsTrigger>
                    <TabsTrigger value="foreign" className="text-sm">
                      🌍 Foreign (40% Pool)
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Currency Toggle */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Display Currency</Label>
                <Tabs value={currency} onValueChange={(value) => setCurrency(value as 'USD' | 'PHP')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="USD">USD ($)</TabsTrigger>
                    <TabsTrigger value="PHP">PHP (₱)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </Card>

          {/* Results Display */}
          <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-xl font-bold mb-2">Investment Summary</h4>
                <p className="text-sm text-gray-600">Your projected returns and benefits</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-600">
                    {formatCurrency(investmentAmount)}
                  </div>
                  <div className="text-xs text-blue-700">Total Investment</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <Home className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600">
                    {ownershipPercentage.toFixed(3)}%
                  </div>
                  <div className="text-xs text-green-700">Ownership Share</div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-purple-600">
                    {Math.round(staysAllocation)}
                  </div>
                  <div className="text-xs text-purple-700">Annual Stay Days</div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-orange-600">
                    {formatCurrency(annualDividend)}
                  </div>
                  <div className="text-xs text-orange-700">Annual Dividend</div>
                </div>
              </div>

              <Button 
                onClick={downloadSummary}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Investment Summary
              </Button>
            </div>
          </Card>
        </div>

        {/* Results Table */}
        <SimulatorResultsTable 
          nationality={nationality}
          currency={currency}
          formatCurrency={formatCurrency}
        />

        {/* Chart Visualization */}
        <SimulatorChart 
          nationality={nationality}
          currency={currency}
          formatCurrency={formatCurrency}
        />

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-2">Important Disclaimer</p>
              <p>
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
  );
};

export default DigitalSecuritiesSimulator;
