
-- Fix the check_investment_quota function with a fixed search path
CREATE OR REPLACE FUNCTION public.check_investment_quota()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
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
$$;
