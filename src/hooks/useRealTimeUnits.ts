
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

// Mock units data since we might not have seeded units yet
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
      const { data, error } = await supabase
        .from('units')
        .select('id, name, unit_type, total_securities, available_securities, security_price_usd, ownership_type, status, funded_percentage')
        .order('created_at', { ascending: true });

      if (error) {
        console.log('Units fetch error, using mock:', error);
        return mockUnits;
      }

      if (!data || data.length === 0) {
        return mockUnits;
      }

      return data as unknown as Unit[];
    },
  });

  const { data: securityPools = [], isLoading: poolsLoading, error: poolsError } = useQuery({
    queryKey: ['security-pools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('token_pools')
        .select('id, pool_type, total_tokens, sold_tokens, created_at, updated_at');

      if (error || !data) {
        console.log('Token pools fetch error or empty:', error);
        return [] as SecurityPool[];
      }

      // Normalize pool_type to match UI expectations: 'filipino' | 'foreign'
      const normalized = data.map((p: any) => ({
        id: p.id,
        pool_type: (p.pool_type || '').toLowerCase() === 'philippine' ? 'filipino' : 'foreign',
        total_securities: p.total_tokens,
        sold_securities: p.sold_tokens,
        created_at: p.created_at,
        updated_at: p.updated_at,
      })) as SecurityPool[];

      return normalized;
    },
  });

  return {
    units,
    securityPools,
    loading: unitsLoading || poolsLoading,
    error: unitsError || poolsError,
  };
};

