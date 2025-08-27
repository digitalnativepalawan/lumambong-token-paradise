-- Ensure RLS is enabled
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop restrictive manager-only policies if they exist
DROP POLICY IF EXISTS "Managers can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Managers can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Managers can write blog posts" ON public.blog_posts;

-- Recreate/ensure public read policy
DROP POLICY IF EXISTS "Public can view blog posts" ON public.blog_posts;
CREATE POLICY "Public can view blog posts"
ON public.blog_posts
FOR SELECT
USING (true);

-- Create permissive policies to align with passkey-based admin portal
CREATE POLICY "Public can insert blog posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public can update blog posts"
ON public.blog_posts
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Public can delete blog posts"
ON public.blog_posts
FOR DELETE
USING (true);