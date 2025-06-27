
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Unit {
  id: string;
  name: string;
  unit_type: string;
  total_tokens: number;
  available_tokens: number;
  token_price_usd: number;
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

export const useRealTimeUnits = () => {
  const { data: units = [], isLoading: unitsLoading, error: unitsError } = useQuery({
    queryKey: ['units'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('units')
        .select('*');
      
      if (error) throw error;
      
      // Map units data to Unit interface with calculated fields
      return data.map((unit): Unit => {
        const soldSecurities = unit.total_tokens - (unit.total_tokens || 0); // Calculate sold securities
        const fundedPercentage = unit.total_tokens > 0 ? (soldSecurities / unit.total_tokens) * 100 : 0;
        
        return {
          id: unit.id,
          name: unit.name,
          unit_type: 'Premium Villa', // Default since this field might not exist
          total_tokens: unit.total_tokens,
          available_tokens: unit.total_tokens, // Assuming all securities are available initially
          token_price_usd: unit.token_price_usd,
          ownership_type: 'foreign_allowed', // Default value
          status: unit.status,
          funded_percentage: fundedPercentage
        };
      });
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
        total_securities: pool.total_tokens, // Map total_tokens to total_securities
        sold_securities: pool.sold_tokens,   // Map sold_tokens to sold_securities
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
