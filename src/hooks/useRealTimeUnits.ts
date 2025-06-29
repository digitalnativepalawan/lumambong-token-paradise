
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Unit {
  id: string;
  name: string;
  unit_type: string;
  total_securities: number;
  available_securities: number;
  security_price_usd: number;
  ownership_type: string;
  status: string;
  funded_percentage: number;
}

export interface SecurityPool {
  id: string;
  pool_type: string;
  total_securities: number;
  sold_securities: number;
  created_at: string;
  updated_at: string;
}

// Mock units data since we don't have a units table yet
const mockUnits: Unit[] = [
  {
    id: 'unit-1',
    name: 'Beachfront Premium Villa',
    unit_type: 'Premium Villa',
    total_securities: 1000,
    available_securities: 750,
    security_price_usd: 450,
    ownership_type: 'foreign_allowed',
    status: 'available',
    funded_percentage: 25
  },
  {
    id: 'unit-2',
    name: 'Garden Paradise Suite',
    unit_type: 'Garden Suite',
    total_securities: 800,
    available_securities: 600,
    security_price_usd: 350,
    ownership_type: 'foreign_allowed',
    status: 'available',
    funded_percentage: 25
  }
];

export const useRealTimeUnits = () => {
  const { data: units = [], isLoading: unitsLoading, error: unitsError } = useQuery({
    queryKey: ['units'],
    queryFn: async () => {
      // For now, return mock data since we don't have a units table
      // In the future, this would query: supabase.from('units').select('*')
      return mockUnits;
    },
  });

  const { data: securityPools = [], isLoading: poolsLoading, error: poolsError } = useQuery({
    queryKey: ['security-pools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('token_pools')
        .select('*');
      
      if (error) throw error;
      
      return data.map((pool): SecurityPool => ({
        id: pool.id,
        pool_type: pool.pool_type,
        total_securities: pool.total_tokens,
        sold_securities: pool.sold_tokens,
        created_at: pool.created_at,
        updated_at: pool.updated_at
      }));
    },
  });

  return {
    units,
    securityPools,
    loading: unitsLoading || poolsLoading,
    error: unitsError || poolsError,
  };
};
