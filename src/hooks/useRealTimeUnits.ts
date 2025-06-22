
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Unit {
  id: string;
  name: string;
  unit_type: string;
  total_tokens: number;
  available_tokens: number;
  token_price: number;
  status: 'available' | 'reserved' | 'sold';
}

export interface TokenPool {
  id: string;
  name: string;
  total_tokens: number;
  available_tokens: number;
  token_price_usd: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useRealTimeUnits = () => {
  const { data: units = [], isLoading: unitsLoading, error: unitsError } = useQuery({
    queryKey: ['units'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('token_pools')
        .select('*');
      
      if (error) throw error;
      
      // Map token_pools data to Unit interface
      return data.map((pool): Unit => ({
        id: pool.id,
        name: pool.name,
        unit_type: 'apartment', // Default value since this field doesn't exist in token_pools
        total_tokens: pool.total_tokens,
        available_tokens: pool.total_tokens, // Assuming all tokens are available initially
        token_price: pool.token_price_usd,
        status: pool.status === 'active' ? 'available' : 'sold'
      }));
    },
  });

  const { data: tokenPools = [], isLoading: poolsLoading, error: poolsError } = useQuery({
    queryKey: ['token-pools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('token_pools')
        .select('*');
      
      if (error) throw error;
      return data as TokenPool[];
    },
  });

  return {
    units,
    tokenPools,
    isLoading: unitsLoading || poolsLoading,
    error: unitsError || poolsError,
  };
};
