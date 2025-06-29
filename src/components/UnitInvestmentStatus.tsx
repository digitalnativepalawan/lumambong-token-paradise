
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';

interface Investor {
  id: string;
  percentage: number;
  nationality: string;
  investment_amount_usd: number;
  created_at: string;
}

interface UnitInvestmentStatusProps {
  unit: {
    id: string;
    name: string;
  };
}

const UnitInvestmentStatus = ({ unit }: UnitInvestmentStatusProps) => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvestors = async () => {
    try {
      // Try to fetch investors, but handle the case where table doesn't exist yet
      const { data, error } = await supabase
        .from('investors' as any)
        .select('*')
        .eq('unit_id', unit.id);

      if (error) {
        console.log('Investors table not yet available:', error);
        setInvestors([]);
      } else {
        setInvestors(data || []);
      }
    } catch (error) {
      console.error('Error fetching investors:', error);
      setInvestors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestors();

    // Set up real-time subscription (will fail gracefully if table doesn't exist)
    try {
      const subscription = supabase
        .channel(`investors-${unit.id}`)
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'investors',
            filter: `unit_id=eq.${unit.id}`
          },
          () => {
            console.log('Investors data changed, refetching...');
            fetchInvestors();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    } catch (error) {
      console.log('Real-time subscription not available yet:', error);
    }
  }, [unit.id]);

  // Calculate ownership percentages
  const filipinoOwnership = investors
    .filter(i => i.nationality === 'ph')
    .reduce((sum, i) => sum + Number(i.percentage || 0), 0);

  const foreignOwnership = investors
    .filter(i => i.nationality === 'foreign')
    .reduce((sum, i) => sum + Number(i.percentage || 0), 0);

  const totalInvestment = investors
    .reduce((sum, i) => sum + Number(i.investment_amount_usd || 0), 0);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {unit.name} Ownership Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filipino Ownership */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">🇵🇭 Filipino Investors</span>
            <span className="text-sm text-gray-600">
              {filipinoOwnership.toFixed(1)}% / 60% max
            </span>
          </div>
          <Progress 
            value={(filipinoOwnership / 60) * 100} 
            className="h-2"
          />
          <div className="text-xs text-gray-500 mt-1">
            {investors.filter(i => i.nationality === 'ph').length} investor(s)
          </div>
        </div>

        {/* Foreign Ownership */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">🌍 Foreign Investors</span>
            <span className="text-sm text-gray-600">
              {foreignOwnership.toFixed(1)}% / 40% max
            </span>
          </div>
          <Progress 
            value={(foreignOwnership / 40) * 100} 
            className="h-2"
          />
          <div className="text-xs text-gray-500 mt-1">
            {investors.filter(i => i.nationality === 'foreign').length} investor(s)
          </div>
        </div>

        {/* Investment Summary */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Investment</span>
            <span className="text-sm font-bold text-green-600">
              ${totalInvestment.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">Total Ownership</span>
            <span className="text-xs text-gray-600">
              {(filipinoOwnership + foreignOwnership).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Availability Status */}
        <div className="text-center py-2">
          {filipinoOwnership >= 60 && foreignOwnership >= 40 ? (
            <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
              ⚠️ Fully Subscribed
            </span>
          ) : (
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
              ✅ Available for Investment
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitInvestmentStatus;
