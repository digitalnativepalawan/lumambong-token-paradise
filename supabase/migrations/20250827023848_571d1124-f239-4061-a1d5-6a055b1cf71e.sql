-- First, let's see what policies exist
SELECT schemaname, tablename, policyname, cmd, permissive, roles, qual, with_check
FROM pg_policies 
WHERE tablename = 'blog_posts';

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Managers can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Managers can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Managers can write blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can view blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can delete blog posts" ON public.blog_posts;

-- Now create the policies we want
CREATE POLICY "Public can view blog posts"
ON public.blog_posts
FOR SELECT
USING (true);

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