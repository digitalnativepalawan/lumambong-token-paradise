
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Investor {
  id: string;
  user_id: string;
  percentage: number;
  nationality: 'ph' | 'foreign';
  investment_amount_usd: number;
  created_at: string;
}

interface UnitInvestmentStatusProps {
  unit: any;
}

const UnitInvestmentStatus = ({ unit }: UnitInvestmentStatusProps) => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [filipinoPercentage, setFilipinoPercentage] = useState(0);
  const [foreignPercentage, setForeignPercentage] = useState(0);

  useEffect(() => {
    // Mock data for frontend-only mode
    const mockInvestors: Investor[] = [
      {
        id: '1',
        user_id: 'user1',
        percentage: 15.5,
        nationality: 'ph',
        investment_amount_usd: 69750,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        user_id: 'user2',
        percentage: 8.2,
        nationality: 'foreign',
        investment_amount_usd: 36900,
        created_at: new Date().toISOString()
      }
    ];

    setInvestors(mockInvestors);

    // Calculate percentages
    const filipinoTotal = mockInvestors
      .filter(inv => inv.nationality === 'ph')
      .reduce((sum, inv) => sum + inv.percentage, 0);
    
    const foreignTotal = mockInvestors
      .filter(inv => inv.nationality === 'foreign')
      .reduce((sum, inv) => sum + inv.percentage, 0);

    setFilipinoPercentage(filipinoTotal);
    setForeignPercentage(foreignTotal);
  }, [unit?.id]);

  const totalInvested = filipinoPercentage + foreignPercentage;
  const availableForFilipinos = Math.max(0, 60 - filipinoPercentage);
  const availableForForeigners = Math.max(0, 40 - foreignPercentage);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filipino Ownership */}
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-blue-600">🇵🇭 Filipino Ownership</span>
            <Badge variant="outline">{filipinoPercentage.toFixed(1)}% / 60%</Badge>
          </div>
          <Progress value={(filipinoPercentage / 60) * 100} className="mb-2" />
          <p className="text-sm text-gray-600">
            Available: {availableForFilipinos.toFixed(1)}%
          </p>
        </div>

        {/* Foreign Ownership */}
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-green-600">🌍 Foreign Ownership</span>
            <Badge variant="outline">{foreignPercentage.toFixed(1)}% / 40%</Badge>
          </div>
          <Progress value={(foreignPercentage / 40) * 100} className="mb-2" />
          <p className="text-sm text-gray-600">
            Available: {availableForForeigners.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Total Unit Investment</span>
          <Badge>{totalInvested.toFixed(1)}% / 100%</Badge>
        </div>
        <Progress value={totalInvested} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{investors.length} investors</span>
          <span>{(100 - totalInvested).toFixed(1)}% remaining</span>
        </div>
      </div>

      {/* Recent Investors */}
      {investors.length > 0 && (
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">Recent Investors</h4>
          <div className="space-y-2">
            {investors.slice(0, 3).map((investor) => (
              <div key={investor.id} className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2">
                  {investor.nationality === 'ph' ? '🇵🇭' : '🌍'}
                  User {investor.user_id.slice(-4)}
                </span>
                <div className="text-right">
                  <div className="font-medium">{investor.percentage}%</div>
                  <div className="text-gray-500">${investor.investment_amount_usd.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitInvestmentStatus;
