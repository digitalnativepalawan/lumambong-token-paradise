
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Unit {
  id: string;
  name: string;
  unit_type: string;
  total_tokens: number;
  available_tokens: number;
  token_price_usd: number;
  status: string;
  image_url?: string;
  funded_percentage: number;
  ownership_type: 'filipino_only' | 'foreign_allowed';
}

interface TokenPool {
  id: number;
  pool_type: string;
  total_tokens: number;
  sold_tokens: number;
  token_price_usd: number;
}

export const useRealTimeUnits = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [tokenPools, setTokenPools] = useState<TokenPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUnits = async () => {
    try {
      const { data: lotsData, error: lotsError } = await supabase
        .from('lots')
        .select('*');

      if (lotsError) throw lotsError;

      // Transform lots data to match Unit interface
      const transformedUnits: Unit[] = (lotsData || []).map((lot, index) => ({
        id: lot.id,
        name: lot.name,
        unit_type: lot.name.includes('BEACHFRONT') ? 'BEACHFRONT PREMIUM' :
                   lot.name.includes('BEACH') ? 'BEACH VIEW' : 'GARDEN PARADISE',
        total_tokens: lot.total_tokens,
        available_tokens: lot.available_tokens,
        token_price_usd: Number(lot.token_price_usd || 450),
        status: lot.status || 'available',
        image_url: lot.image_url,
        funded_percentage: lot.total_tokens > 0 ? 
          Math.round(((lot.total_tokens - lot.available_tokens) / lot.total_tokens) * 100) : 0,
        ownership_type: index % 2 === 0 ? 'filipino_only' : 'foreign_allowed'
      }));

      setUnits(transformedUnits);
    } catch (err) {
      console.error('Error fetching units:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch units');
    }
  };

  const fetchTokenPools = async () => {
    try {
      const { data, error } = await supabase
        .from('token_pools')
        .select('*');

      if (error) throw error;
      setTokenPools(data || []);
    } catch (err) {
      console.error('Error fetching token pools:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch token pools');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUnits(), fetchTokenPools()]);
      setLoading(false);
    };

    fetchData();

    // Set up real-time subscriptions
    const lotsSubscription = supabase
      .channel('lots-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'lots' },
        () => {
          console.log('Lots data changed, refetching...');
          fetchUnits();
        }
      )
      .subscribe();

    const poolsSubscription = supabase
      .channel('pools-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'token_pools' },
        () => {
          console.log('Token pools data changed, refetching...');
          fetchTokenPools();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(lotsSubscription);
      supabase.removeChannel(poolsSubscription);
    };
  }, []);

  return { units, tokenPools, loading, error, refetch: () => Promise.all([fetchUnits(), fetchTokenPools()]) };
};
