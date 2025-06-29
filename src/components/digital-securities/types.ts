
export interface SimulationResult {
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

export type InvestorType = 'PHILIPPINE' | 'FOREIGN';
export type Currency = 'USD' | 'PHP';
