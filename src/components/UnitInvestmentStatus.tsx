import { useState, useEffect } from 'react';

interface Investor {
  id: string;
  percentage: number;
  nationality: string;
  investment_amount_usd: number;
}

interface Unit {
  id: string;
  // other properties
}

interface UnitInvestmentStatusProps {
  unit: Unit;
}

export const UnitInvestmentStatus = ({ unit }: UnitInvestmentStatusProps) => {
  const [investors, setInvestors] = useState<Investor[]>([]);

  useEffect(() => {
    // Disabled - no investors table in current schema
    setInvestors([]);
  }, [unit.id]);

  return (
    <div className="text-sm text-gray-500">
      Investment status not available
    </div>
  );
};
