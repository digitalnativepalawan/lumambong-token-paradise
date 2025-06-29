
import { Building, TrendingUp, DollarSign, Target } from "lucide-react";
import { SimulationResult, Currency } from "./types";

interface EquityMetricsProps {
  simulationResult: SimulationResult;
  formatCurrency: (amount: number) => string;
}

const EquityMetrics = ({ simulationResult, formatCurrency }: EquityMetricsProps) => {
  if (!simulationResult.currentEquityValue) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="text-center">
        <h6 className="text-xs font-medium text-gray-700 mb-2">
          Real Estate Equity Value
        </h6>
      </div>

      {/* Current vs Projected Equity */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center border border-blue-100">
          <Building className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
          <div className="text-xs sm:text-sm font-bold text-blue-600 leading-tight">
            {formatCurrency(simulationResult.currentEquityValue)}
          </div>
          <div className="text-xs text-blue-700 mt-1">Equity Today</div>
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
            Total Dividends ({simulationResult.exitYears}yr)
          </div>
        </div>
      </div>

      {/* Exit Proceeds and Total Return */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-lg border border-emerald-200">
        <div className="text-center">
          <div className="text-sm font-medium text-emerald-800 mb-2">Exit Analysis</div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="font-bold text-emerald-600">
                {formatCurrency(simulationResult.exitProceeds || 0)}
              </div>
              <div className="text-emerald-700">Exit Proceeds</div>
            </div>
            <div>
              <div className="font-bold text-emerald-600">
                {simulationResult.returnMultiple?.toFixed(1)}×
              </div>
              <div className="text-emerald-700">Return Multiple</div>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-emerald-200">
            <div className="font-bold text-emerald-800">
              Total Return: {formatCurrency(simulationResult.totalReturn || 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory text */}
      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border">
        <div className="font-medium mb-1">Understanding Your Equity:</div>
        <div>Your Digital Securities represent real ownership in Binga Beach property. 
        Equity value grows through asset appreciation (22%/yr projected), while you also 
        earn dividends from rental operations.</div>
      </div>
    </div>
  );
};

export default EquityMetrics;
