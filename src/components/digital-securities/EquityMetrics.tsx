
import { Building, TrendingUp, DollarSign, Target, Star, Calendar } from "lucide-react";
import { SimulationResult } from "./types";

interface EquityMetricsProps {
  simulationResult: SimulationResult;
  formatCurrency: (amount: number) => string;
}

const EquityMetrics = ({ simulationResult, formatCurrency }: EquityMetricsProps) => {
  if (!simulationResult.currentEquityValue) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h6 className="text-xs font-medium text-gray-700 mb-2">
          Real Estate Equity & Exit Analysis
        </h6>
      </div>

      {/* Current vs Projected Equity */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center border border-blue-100">
          <Building className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
          <div className="text-xs sm:text-sm font-bold text-blue-600 leading-tight">
            {formatCurrency(simulationResult.currentEquityValue)}
          </div>
          <div className="text-xs text-blue-700 mt-1">Your Equity Today</div>
        </div>

        <div className="bg-emerald-50 p-2 sm:p-3 rounded-lg text-center border border-emerald-100">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto mb-1" />
          <div className="text-xs sm:text-sm font-bold text-emerald-600 leading-tight">
            {formatCurrency(simulationResult.projectedEquityValue || 0)}
          </div>
          <div className="text-xs text-emerald-700 mt-1">
            Equity in {simulationResult.exitYears} yrs
          </div>
        </div>
      </div>

      {/* Equity Gain and Cumulative Dividends */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-green-50 p-2 sm:p-3 rounded-lg text-center border border-green-100">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mx-auto mb-1" />
          <div className="text-xs sm:text-sm font-bold text-green-600 leading-tight">
            {formatCurrency(simulationResult.equityGain || 0)}
          </div>
          <div className="text-xs text-green-700 mt-1">Equity Gain</div>
        </div>

        <div className="bg-purple-50 p-2 sm:p-3 rounded-lg text-center border border-purple-100">
          <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mx-auto mb-1" />
          <div className="text-xs sm:text-sm font-bold text-purple-600 leading-tight">
            {formatCurrency(simulationResult.cumulativeDividends || 0)}
          </div>
          <div className="text-xs text-purple-700 mt-1">
            Cumulative Dividends ({simulationResult.exitYears}yr)
          </div>
        </div>
      </div>

      {/* Exit Proceeds and Total Return */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-orange-50 p-2 sm:p-3 rounded-lg text-center border border-orange-100">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mx-auto mb-1" />
          <div className="text-xs sm:text-sm font-bold text-orange-600 leading-tight">
            {formatCurrency(simulationResult.exitProceeds || 0)}
          </div>
          <div className="text-xs text-orange-700 mt-1">Exit Proceeds</div>
        </div>

        <div className="bg-indigo-50 p-2 sm:p-3 rounded-lg text-center border border-indigo-100">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mx-auto mb-1" />
          <div className="text-xs sm:text-sm font-bold text-indigo-600 leading-tight">
            {simulationResult.returnMultiple?.toFixed(1)}×
          </div>
          <div className="text-xs text-indigo-700 mt-1">Return Multiple</div>
        </div>
      </div>

      {/* Bonus Stay Pool */}
      {simulationResult.userBonusStayDays && (
        <div className="bg-yellow-50 p-2 sm:p-3 rounded-lg text-center border border-yellow-100">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mx-auto mb-1" />
          <div className="text-xs sm:text-sm font-bold text-yellow-600 leading-tight">
            {simulationResult.userBonusStayDays.toFixed(2)} days
          </div>
          <div className="text-xs text-yellow-700 mt-1">
            Bonus Stay Days (from {simulationResult.bonusStayPool} night pool)
          </div>
        </div>
      )}

      {/* Summary Box */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-lg border border-emerald-200">
        <div className="text-center">
          <div className="text-sm font-medium text-emerald-800 mb-2">Total Return Summary</div>
          <div className="text-lg font-bold text-emerald-600">
            {formatCurrency((simulationResult.exitProceeds || 0) + (simulationResult.cumulativeDividends || 0))}
          </div>
          <div className="text-xs text-emerald-700 mt-1">
            Total Return ({simulationResult.returnMultiple?.toFixed(1)}× your investment)
          </div>
        </div>
      </div>

      {/* Explanatory text */}
      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border">
        <div className="font-medium mb-1">Understanding Your Investment:</div>
        <div>Your Digital Securities represent real equity ownership in Binga Beach property. 
        Your equity value grows through 22%/yr asset appreciation, while you also earn 
        dividends from operations and enjoy bonus complimentary nights.</div>
      </div>
    </div>
  );
};

export default EquityMetrics;
