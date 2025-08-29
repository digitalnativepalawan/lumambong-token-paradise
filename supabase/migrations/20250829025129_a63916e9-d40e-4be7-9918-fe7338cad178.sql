-- Create table for configurable business plan buttons
CREATE TABLE public.business_plan_buttons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.business_plan_buttons ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read, admin write)
CREATE POLICY "Everyone can view active buttons" 
ON public.business_plan_buttons 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage buttons" 
ON public.business_plan_buttons 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Insert default buttons
INSERT INTO public.business_plan_buttons (name, url, order_index) VALUES
('Resources Hub', 'https://example.com/resources', 1),
('Investment Guide', 'https://example.com/guide', 2),
('Legal Documents', 'https://example.com/legal', 3),
('Support Center', 'https://example.com/support', 4);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_business_plan_buttons_updated_at
BEFORE UPDATE ON public.business_plan_buttons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();