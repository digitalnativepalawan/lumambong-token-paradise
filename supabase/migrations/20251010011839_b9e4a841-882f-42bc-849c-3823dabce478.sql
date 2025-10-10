-- Add image_url column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS image_url text;

-- Create blog-images storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for blog-images bucket
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);