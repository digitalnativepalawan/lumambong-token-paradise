
import { useState, useEffect } from 'react';

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

// Mock data for frontend development
const mockUnits: Unit[] = [
  {
    id: 'unit-1',
    name: 'Beachfront Villa A1',
    unit_type: 'BEACHFRONT PREMIUM',
    total_tokens: 1000,
    available_tokens: 750,
    token_price_usd: 450,
    status: 'available',
    image_url: '/lovable-uploads/69c86e8e-ee37-4927-a0f4-7b5f4cf0d98d.png',
    funded_percentage: 25,
    ownership_type: 'filipino_only'
  },
  {
    id: 'unit-2',
    name: 'Beach View Villa B2',
    unit_type: 'BEACH VIEW',
    total_tokens: 800,
    available_tokens: 600,
    token_price_usd: 350,
    status: 'available',
    image_url: '/lovable-uploads/a37e0dbc-4399-45b0-82d5-d859062513e9.png',
    funded_percentage: 25,
    ownership_type: 'foreign_allowed'
  },
  {
    id: 'unit-3',
    name: 'Garden Paradise C3',
    unit_type: 'GARDEN PARADISE',
    total_tokens: 600,
    available_tokens: 480,
    token_price_usd: 250,
    status: 'available',
    image_url: '/lovable-uploads/f63a7feb-19f0-4b58-ba86-ee624f96d4ce.png',
    funded_percentage: 20,
    ownership_type: 'filipino_only'
  }
];

const mockTokenPools: TokenPool[] = [
  {
    id: 1,
    pool_type: 'filipino',
    total_tokens: 6,
    sold_tokens: 2,
    token_price_usd: 450
  },
  {
    id: 2,
    pool_type: 'foreign',
    total_tokens: 4,
    sold_tokens: 1,
    token_price_usd: 450
  }
];

export const useRealTimeUnits = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [tokenPools, setTokenPools] = useState<TokenPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUnits = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUnits(mockUnits);
    } catch (err) {
      console.error('Error fetching units:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch units');
    }
  };

  const fetchTokenPools = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setTokenPools(mockTokenPools);
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

    // Mock real-time updates
    const interval = setInterval(() => {
      console.log('Mock real-time update triggered');
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { units, tokenPools, loading, error, refetch: () => Promise.all([fetchUnits(), fetchTokenPools()]) };
};
