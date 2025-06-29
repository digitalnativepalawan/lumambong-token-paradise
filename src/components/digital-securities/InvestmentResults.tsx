
import { AlertTriangle, DollarSign, Home, Calendar, TrendingUp } from "lucide-react";
import { SimulationResult, Currency } from "./types";

interface InvestmentResultsProps {
  simulationResult: SimulationResult | null;
  tokenQuantity: number;
  currency: Currency;
  isLoading: boolean;
  error: string | null;
  formatCurrency: (amount: number) => string;
}

const InvestmentResults = ({
  simulationResult,
  tokenQuantity,
  currency,
  isLoading,
  error,
  formatCurrency
}: InvestmentResultsProps) => {
  const TOKEN_PRICE = 25;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs sm:text-sm text-red-800 leading-relaxed">{error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-6">
        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">Calculating...</p>
      </div>
    );
  }

  if (!simulationResult) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center border border-blue-100">
          <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
          <div className="text-xs sm:text-sm font-bold text-blue-600 leading-tight">
            {formatCurrency(tokenQuantity * TOKEN_PRICE)}
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
  );
};

export default InvestmentResults;
