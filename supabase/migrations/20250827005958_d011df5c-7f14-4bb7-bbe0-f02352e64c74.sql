-- Update RLS policies for blog_posts to handle authentication properly
DROP POLICY IF EXISTS "Managers can write blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Managers can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Managers can delete blog posts" ON public.blog_posts;

-- Create more flexible policies for authenticated users
CREATE POLICY "Authenticated users can write blog posts" 
ON public.blog_posts 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts" 
ON public.blog_posts 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts" 
ON public.blog_posts 
FOR DELETE 
TO authenticated
USING (true);