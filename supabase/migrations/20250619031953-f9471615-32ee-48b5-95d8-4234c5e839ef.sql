
-- Create storage bucket for KYC documents
INSERT INTO storage.buckets (id, name, public) VALUES ('kyc-docs', 'kyc-docs', false);

-- Create storage policy for KYC documents (users can upload their own)
CREATE POLICY "Users can upload their own KYC documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'kyc-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policy for users to view their own documents
CREATE POLICY "Users can view their own KYC documents" ON storage.objects
FOR SELECT USING (bucket_id = 'kyc-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policy for admins to view all documents
CREATE POLICY "Admins can view all KYC documents" ON storage.objects
FOR SELECT USING (bucket_id = 'kyc-docs');

-- Create users table for storing user profiles and KYC status
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  nationality TEXT CHECK (nationality IN ('ph', 'foreign')),
  kyc_verified BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON public.users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.users
FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = TRUE));

-- Create investors table for tracking unit investments
CREATE TABLE IF NOT EXISTS public.investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  unit_id TEXT NOT NULL,
  percentage NUMERIC NOT NULL CHECK (percentage > 0 AND percentage <= 100),
  nationality TEXT NOT NULL CHECK (nationality IN ('ph', 'foreign')),
  investment_amount_usd NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on investors table
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for investors
CREATE POLICY "Users can view their own investments" ON public.investors
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own investments" ON public.investors
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all investments" ON public.investors
FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = TRUE));

-- Function to check investment quota compliance
CREATE OR REPLACE FUNCTION public.check_investment_quota()
RETURNS TRIGGER AS $$
DECLARE
  max_filipino NUMERIC := 60;
  max_foreign NUMERIC := 40;
  current_filipino NUMERIC;
  current_foreign NUMERIC;
BEGIN
  -- Calculate current ownership percentages for the unit
  SELECT 
    COALESCE(SUM(percentage) FILTER (WHERE nationality = 'ph'), 0),
    COALESCE(SUM(percentage) FILTER (WHERE nationality = 'foreign'), 0)
  INTO current_filipino, current_foreign
  FROM public.investors
  WHERE unit_id = NEW.unit_id AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid);

  -- Check Filipino quota
  IF NEW.nationality = 'ph' AND (current_filipino + NEW.percentage) > max_filipino THEN
    RAISE EXCEPTION 'Filipino ownership quota exceeded. Current: %.2f%%, Attempting: %.2f%%, Max: %.2f%%', 
      current_filipino, NEW.percentage, max_filipino;
  END IF;

  -- Check Foreign quota
  IF NEW.nationality = 'foreign' AND (current_foreign + NEW.percentage) > max_foreign THEN
    RAISE EXCEPTION 'Foreign ownership quota exceeded. Current: %.2f%%, Attempting: %.2f%%, Max: %.2f%%', 
      current_foreign, NEW.percentage, max_foreign;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce quota
CREATE TRIGGER enforce_investment_quota
  BEFORE INSERT OR UPDATE ON public.investors
  FOR EACH ROW EXECUTE FUNCTION public.check_investment_quota();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_investors_user_id ON public.investors(user_id);
CREATE INDEX IF NOT EXISTS idx_investors_unit_id ON public.investors(unit_id);
CREATE INDEX IF NOT EXISTS idx_investors_nationality ON public.investors(nationality);
CREATE INDEX IF NOT EXISTS idx_users_nationality ON public.users(nationality);
CREATE INDEX IF NOT EXISTS idx_users_kyc_verified ON public.users(kyc_verified);
