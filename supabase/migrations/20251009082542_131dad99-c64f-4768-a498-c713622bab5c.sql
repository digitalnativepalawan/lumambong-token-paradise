-- Create table to persist Admin Portal quick actions
CREATE TABLE public.admin_quick_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_quick_actions ENABLE ROW LEVEL SECURITY;

-- Policies: allow authenticated users to manage admin quick actions
CREATE POLICY "Authenticated users can manage admin quick actions"
ON public.admin_quick_actions
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Update timestamp trigger
CREATE TRIGGER update_admin_quick_actions_updated_at
BEFORE UPDATE ON public.admin_quick_actions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();