-- Create table for dynamic page content
CREATE TABLE public.page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type TEXT NOT NULL, -- 'whitepaper' or 'business_plan'
  section_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view active page content" 
ON public.page_content 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Managers can manage all page content" 
ON public.page_content 
FOR ALL 
USING (has_role('manager'::app_role))
WITH CHECK (has_role('manager'::app_role));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_page_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_page_content_updated_at
BEFORE UPDATE ON public.page_content
FOR EACH ROW
EXECUTE FUNCTION public.update_page_content_updated_at();

-- Insert default whitepaper sections
INSERT INTO public.page_content (page_type, section_id, title, content, order_index) VALUES
('whitepaper', 'executive-summary', 'Executive Summary', 'Halo Bloc offers investors a unique opportunity to own a piece of paradise in Palawan through a cutting-edge, blockchain-powered real estate investment platform.', 1),
('whitepaper', 'testing-objectives', 'Testing Objectives', 'Validate that fractional real estate investment via the HBCX Digital Asset is secure, efficient, and compliant.', 2),
('whitepaper', 'test-scenarios', 'Test Scenarios', 'Multiple scenarios will be run to cover all core functionalities including onboarding, token acquisition, and dividend distribution.', 3);

-- Insert default business plan sections
INSERT INTO public.page_content (page_type, section_id, title, content, order_index) VALUES
('business_plan', 'executive-summary', 'Executive Summary', 'Comprehensive overview of Binga Beach digital securities real estate investment opportunity.', 1),
('business_plan', 'market-analysis', 'Market Analysis', 'Analysis of the Philippine real estate tokenization market and competitive landscape.', 2),
('business_plan', 'business-model', 'Business Model', 'Detailed explanation of our fractional ownership and digital securities model.', 3);