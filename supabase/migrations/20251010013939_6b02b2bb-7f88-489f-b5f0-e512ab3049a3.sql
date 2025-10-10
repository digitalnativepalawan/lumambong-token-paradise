-- Add multiple images support to blog_posts
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS image_urls text[] NOT NULL DEFAULT '{}'::text[];