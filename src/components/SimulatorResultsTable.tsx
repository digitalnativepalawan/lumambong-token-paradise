
import { Card } from "@/components/ui/card";
import {
  ModernTable,
  ModernTableHeader,
  ModernTableBody,
  ModernTableRow,
  ModernTableCell,
  ModernTableHeadCell
} from "@/components/ui/modern-table";

interface SimulatorResultsTableProps {
  nationality: 'filipino' | 'foreign';
  currency: 'USD' | 'PHP';
  formatCurrency: (amount: number) => string;
}

const SimulatorResultsTable = ({ nationality, currency, formatCurrency }: SimulatorResultsTableProps) => {
  // Configurable parameters
  const FILIPINO_ALLOCATION = 0.6;
  const FOREIGN_ALLOCATION = 0.4;
  const TOKENS_PER_LOT = 100000;
  const TOKEN_PRICE = 25; // USD
  const TOTAL_STAYS_PER_LOT = 365; // days per year
  const PROJECTED_ANNUAL_RENT = 125000; // USD per lot

  const sampleQuantities = [1, 100, 1000, 5000, 10000, 25000, 50000];

  const calculateBenefits = (tokens: number) => {
    const ownershipPercentage = (tokens / TOKENS_PER_LOT) * 100;
    const investmentAmount = tokens * TOKEN_PRICE;
    
    const staysAllocation = nationality === 'filipino' 
      ? (tokens / TOKENS_PER_LOT) * TOTAL_STAYS_PER_LOT * FILIPINO_ALLOCATION
      : (tokens / TOKENS_PER_LOT) * TOTAL_STAYS_PER_LOT * FOREIGN_ALLOCATION;
      
    const annualDividend = (tokens / TOKENS_PER_LOT) * PROJECTED_ANNUAL_RENT * 0.3; // 30% revenue share

    return {
      ownershipPercentage,
      investmentAmount,
      staysAllocation: Math.round(staysAllocation),
      annualDividend
    };
  };

  return (
    <Card className="mb-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <div className="p-6">
        <div className="text-center mb-6">
          <h4 className="text-2xl font-bold mb-2">Investment Scenarios</h4>
          <p className="text-gray-600">
            Compare different investment levels for {nationality === 'filipino' ? 'Filipino' : 'Foreign'} investors
          </p>
        </div>

        <ModernTable>
          <ModernTableHeader>
            <ModernTableRow>
              <ModernTableHeadCell>Digital Securities</ModernTableHeadCell>
              <ModernTableHeadCell align="right">Investment</ModernTableHeadCell>
              <ModernTableHeadCell align="right">Ownership %</ModernTableHeadCell>
              <ModernTableHeadCell align="right">Annual Stays</ModernTableHeadCell>
              <ModernTableHeadCell align="right">Projected Dividend</ModernTableHeadCell>
            </ModernTableRow>
          </ModernTableHeader>
          <ModernTableBody>
            {sampleQuantities.map((quantity) => {
              const benefits = calculateBenefits(quantity);
              return (
                <ModernTableRow key={quantity}>
                  <ModernTableCell>
                    <div className="font-medium">{quantity.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">
                      @ ${TOKEN_PRICE} each
                    </div>
                  </ModernTableCell>
                  <ModernTableCell align="right">
                    <div className="font-medium">
                      {formatCurrency(benefits.investmentAmount)}
                    </div>
                  </ModernTableCell>
                  <ModernTableCell align="right">
                    <div className="font-medium">
                      {benefits.ownershipPercentage.toFixed(3)}%
                    </div>
                  </ModernTableCell>
                  <ModernTableCell align="right">
                    <div className="font-medium text-purple-600">
                      {benefits.staysAllocation} days
                    </div>
                    <div className="text-xs text-gray-500">
                      {nationality === 'filipino' ? '60% pool' : '40% pool'}
                    </div>
                  </ModernTableCell>
                  <ModernTableCell align="right">
                    <div className="font-medium text-green-600">
                      {formatCurrency(benefits.annualDividend)}
                    </div>
                    <div className="text-xs text-gray-500">
                      30% revenue share
                    </div>
                  </ModernTableCell>
                </ModernTableRow>
              );
            })}
          </ModernTableBody>
        </ModernTable>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-blue-800 mb-1">Stay Calculation</div>
              <div className="text-blue-700">
                Stays = (Your Securities ÷ 100,000) × 365 days × {nationality === 'filipino' ? '60%' : '40%'} allocation
              </div>
            </div>
            <div>
              <div className="font-medium text-blue-800 mb-1">Dividend Calculation</div>
              <div className="text-blue-700">
                Dividend = (Your Securities ÷ 100,000) × $125,000 annual rent × 30% revenue share
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimulatorResultsTable;
