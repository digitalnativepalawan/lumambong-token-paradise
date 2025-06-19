
-- Create lots table for property units
CREATE TABLE public.lots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  total_tokens INTEGER NOT NULL DEFAULT 0,
  available_tokens INTEGER NOT NULL DEFAULT 0,
  token_price_usd DECIMAL(10,2) DEFAULT 450.00,
  status TEXT DEFAULT 'available',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create token_pools table for tracking ownership quotas
CREATE TABLE public.token_pools (
  id SERIAL PRIMARY KEY,
  pool_type TEXT NOT NULL CHECK (pool_type IN ('filipino', 'foreign')),
  total_tokens INTEGER NOT NULL DEFAULT 0,
  sold_tokens INTEGER NOT NULL DEFAULT 0,
  token_price_usd DECIMAL(10,2) DEFAULT 450.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial data for demonstration
INSERT INTO public.lots (name, total_tokens, available_tokens, token_price_usd, status) VALUES
('UNIT 1 - BEACHFRONT PREMIUM', 1000, 750, 450.00, 'available'),
('UNIT 2 - BEACH VIEW', 800, 600, 450.00, 'available'),
('UNIT 3 - GARDEN PARADISE', 600, 400, 450.00, 'available'),
('UNIT 4 - BEACHFRONT PREMIUM', 1000, 900, 450.00, 'available'),
('UNIT 5 - BEACH VIEW', 800, 200, 450.00, 'available'),
('UNIT 6 - GARDEN PARADISE', 600, 100, 450.00, 'available');

-- Insert token pool data for 60/40 compliance
INSERT INTO public.token_pools (pool_type, total_tokens, sold_tokens, token_price_usd) VALUES
('filipino', 6, 2, 450.00),
('foreign', 4, 1, 450.00);

-- Enable Row Level Security (for future authentication)
ALTER TABLE public.lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_pools ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access for now
CREATE POLICY "Allow public read access on lots" ON public.lots FOR SELECT USING (true);
CREATE POLICY "Allow public read access on token_pools" ON public.token_pools FOR SELECT USING (true);

-- Enable real-time updates
ALTER TABLE public.lots REPLICA IDENTITY FULL;
ALTER TABLE public.token_pools REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.lots;
ALTER PUBLICATION supabase_realtime ADD TABLE public.token_pools;
