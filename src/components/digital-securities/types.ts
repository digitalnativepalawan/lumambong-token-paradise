
export interface SimulationResult {
  ownershipPct: number;
  annualStayDays: number;
  annualDividendUSD: number;
  exitYears?: number;
  tokenGrowthPct?: number;
  exitTokenPrice?: number;
  exitValue?: number;
  totalDividends?: number;
  totalReturn?: number;
  returnMultiple?: number;
  // Equity-related fields
  currentEquityValue?: number;
  projectedEquityValue?: number;
  equityGain?: number;
  cumulativeDividends?: number;
  exitProceeds?: number;
  // Bonus stay pool fields
  bonusStayPool?: number;
  userBonusStayDays?: number;
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

export interface InvestmentExplanation {
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

export interface SimulationAdjustments {
  rateDelta: number;
  highOccDelta: number;
  lowOccDelta: number;
  amenityDelta: number;
  tokenGrowthPct: number;
  exitYears: number;
}

export type InvestorType = 'PHILIPPINE' | 'FOREIGN';
export type Currency = 'USD' | 'PHP';
