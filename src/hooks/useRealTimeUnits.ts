
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Unit {
  id: string;
  unit_number: string;
  size_sqm: number;
  price_usd: number;
  status: 'available' | 'reserved' | 'sold';
  ownership_type: 'filipino' | 'foreign';
  amenities: string[];
}

export interface TokenPool {
  id: string;
  pool_type: string;
  total_tokens: number;
  sold_tokens: number;
  created_at: string;
  updated_at: string;
}

export const useRealTimeUnits = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [tokenPools, setTokenPools] = useState<TokenPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch units
        const { data: unitsData, error: unitsError } = await supabase
          .from('units')
          .select('*');

        if (unitsError) throw unitsError;

        // Fetch token pools
        const { data: poolsData, error: poolsError } = await supabase
          .from('token_pools')
          .select('*');

        if (poolsError) throw poolsError;

        // Transform units data to match interface
        const transformedUnits: Unit[] = unitsData?.map(unit => ({
          id: unit.id,
          unit_number: unit.unit_number || `Unit ${unit.id}`,
          size_sqm: unit.size_sqm || 50,
          price_usd: unit.price_usd || 25000,
          status: unit.status || 'available',
          ownership_type: unit.ownership_type || 'filipino',
          amenities: unit.amenities || []
        })) || [];

        setUnits(transformedUnits);
        setTokenPools(poolsData || []);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        
        // Fallback to mock data
        setUnits([
          {
            id: '1',
            unit_number: 'Unit 1',
            size_sqm: 50,
            price_usd: 25000,
            status: 'available',
            ownership_type: 'filipino',
            amenities: ['Beach Access', 'Pool', 'Garden View']
          },
          {
            id: '2',
            unit_number: 'Unit 2',
            size_sqm: 75,
            price_usd: 37500,
            status: 'reserved',
            ownership_type: 'foreign',
            amenities: ['Ocean View', 'Private Balcony', 'Pool']
          }
        ]);
        
        setTokenPools([
          {
            id: '1',
            pool_type: 'filipino',
            total_tokens: 6,
            sold_tokens: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            pool_type: 'foreign',
            total_tokens: 4,
            sold_tokens: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscriptions
    const unitsSubscription = supabase
      .channel('units_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'units' }, 
        () => fetchData()
      )
      .subscribe();

    const poolsSubscription = supabase
      .channel('pools_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'token_pools' }, 
        () => fetchData()
      )
      .subscribe();

    return () => {
      unitsSubscription.unsubscribe();
      poolsSubscription.unsubscribe();
    };
  }, []);

  return { units, tokenPools, loading, error };
};
