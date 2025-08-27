-- Enable RLS (idempotent)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Managers can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Managers can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Managers can write blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can view blog posts" ON public.blog_posts;

-- Public read
CREATE POLICY "Public can view blog posts"
ON public.blog_posts
FOR SELECT
USING (true);

-- Public insert/update/delete to align with passkey-based admin portal
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