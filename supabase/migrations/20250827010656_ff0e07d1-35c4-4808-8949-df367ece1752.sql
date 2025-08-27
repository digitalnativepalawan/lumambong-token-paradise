-- Revert blog_posts policies to manager-only management
DROP POLICY IF EXISTS "Authenticated users can write blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON public.blog_posts;

DO $$ BEGIN
  -- Recreate manager-only policies if missing
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blog_posts' AND policyname='Managers can write blog posts'
  ) THEN
    CREATE POLICY "Managers can write blog posts"
    ON public.blog_posts
    FOR INSERT
    TO authenticated
    WITH CHECK (has_role('manager'::app_role));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blog_posts' AND policyname='Managers can update blog posts'
  ) THEN
    CREATE POLICY "Managers can update blog posts"
    ON public.blog_posts
    FOR UPDATE
    TO authenticated
    USING (has_role('manager'::app_role))
    WITH CHECK (has_role('manager'::app_role));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blog_posts' AND policyname='Managers can delete blog posts'
  ) THEN
    CREATE POLICY "Managers can delete blog posts"
    ON public.blog_posts
    FOR DELETE
    TO authenticated
    USING (has_role('manager'::app_role));
  END IF;
END $$;