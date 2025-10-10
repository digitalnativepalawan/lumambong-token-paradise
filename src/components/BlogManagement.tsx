import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, User, Edit, Trash2, Plus, Eye, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AIContentGenerator from './ai/AIContentGenerator';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image_url?: string;
  image_urls?: string[];
}

const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '', category: '', image_url: '', image_urls: [] as string[] });
  const [isLoading, setIsLoading] = useState(true);
  const [showReadMore, setShowReadMore] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();

  // Fetch blog posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Fetch blog posts from database
  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      if (isEditing && editingPost) {
        setEditingPost({ ...editingPost, image_url: publicUrl });
      } else {
        setNewPost({ ...newPost, image_url: publicUrl });
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // Gallery Images Upload (up to 6)
  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const existingCount = isEditing ? (editingPost?.image_urls?.length || 0) : (newPost.image_urls?.length || 0);
    if (existingCount + files.length > 6) {
      toast({
        title: "Limit reached",
        description: "You can upload up to 6 images per post",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploadingImage(true);
      const uploadedUrls: string[] = [];
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        if (file.size > 5 * 1024 * 1024) continue;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(fileName);
        uploadedUrls.push(publicUrl);
      }

      if (isEditing && editingPost) {
        const next = [ ...(editingPost.image_urls || []), ...uploadedUrls ].slice(0,6);
        setEditingPost({ ...editingPost, image_urls: next });
      } else {
        const next = [ ...(newPost.image_urls || []), ...uploadedUrls ].slice(0,6);
        setNewPost({ ...newPost, image_urls: next });
      }

      toast({ title: "Success", description: "Images uploaded successfully!" });
    } catch (error) {
      console.error('Error uploading gallery images:', error);
      toast({ title: "Error", description: "Failed to upload gallery images", variant: "destructive" });
    } finally {
      setUploadingImage(false);
    }
  };

  const removeGalleryImage = (url: string, isEditing: boolean = false) => {
    if (isEditing && editingPost) {
      setEditingPost({ ...editingPost, image_urls: (editingPost.image_urls || []).filter(u => u !== url) });
    } else {
      setNewPost({ ...newPost, image_urls: (newPost.image_urls || []).filter(u => u !== url) });
    }
  };

  // Add new blog post
  const handleAddPost = async () => {
    if (!newPost.title || !newPost.content || !newPost.author || !newPost.category) {
      toast({
        title: "Error", 
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          title: newPost.title,
          content: newPost.content,
          author: newPost.author,
          category: newPost.category,
          image_url: newPost.image_url || null,
          image_urls: newPost.image_urls || [],
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post added successfully!",
      });

      setNewPost({ title: '', content: '', author: '', category: '', image_url: '' });
      setShowAddPost(false);
      fetchBlogPosts();
    } catch (error) {
      console.error('Error adding blog post:', error);
      toast({
        title: "Error",
        description: "Failed to add blog post",
        variant: "destructive",
      });
    }
  };

  // Delete blog post
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });

      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  // Edit blog post
  const handleEditPost = async () => {
    if (!editingPost) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: editingPost.title,
          content: editingPost.content,
          author: editingPost.author,
          category: editingPost.category,
          image_url: editingPost.image_url || null,
          image_urls: editingPost.image_urls || [],
        })
        .eq('id', editingPost.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });

      setEditingPost(null);
      setShowEditPost(false);
      fetchBlogPosts();
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    }
  };

  // Clear all posts
  const handleClearAllPosts = async () => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (error) throw error;

      toast({
        title: "Success",
        description: "All blog posts cleared successfully!",
      });

      fetchBlogPosts();
    } catch (error) {
      console.error('Error clearing blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to clear blog posts",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Blog Management
          <div className="flex gap-2">
            <Dialog open={showAddPost} onOpenChange={setShowAddPost}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    Add New Blog Post
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAIGenerator(!showAIGenerator)}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Assistant
                    </Button>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {showAIGenerator && (
                    <div className="lg:col-span-1">
                      <AIContentGenerator
                        contentType="blog_post"
                        onContentGenerated={(content) => {
                          const lines = content.split("\n");
                          const titleLine = lines.find(line => line.toLowerCase().includes('title') || line.startsWith('#'));
                          if (titleLine) {
                            const title = titleLine.replace(/^#\s*/, '').replace(/title:\s*/i, '').trim();
                            setNewPost(prev => ({ ...prev, title }));
                          }
                          setNewPost(prev => ({ ...prev, content }));
                        }}
                        placeholder="Describe the blog post you want to create (e.g., 'Write about sustainable beach resort development and investment opportunities')"
                        context="Lumambong Beach Resort Development Project - a luxury eco-friendly resort investment opportunity"
                      />
                    </div>
                  )}
                  
                  <div className={showAIGenerator ? "lg:col-span-1" : "lg:col-span-2"}>
                    <div className="space-y-4">
                      <Input
                        placeholder="Post Title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      />
                      <Input
                        placeholder="Author Name"
                        value={newPost.author}
                        onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                      />
                      <Input
                        placeholder="Category"
                        value={newPost.category}
                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      />
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Featured Image</label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, false)}
                          disabled={uploadingImage}
                        />
                        {uploadingImage && <p className="text-sm text-gray-500">Uploading image...</p>}
                        {newPost.image_url && (
                          <img src={newPost.image_url} alt="Preview" className="w-full h-32 object-cover rounded" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Gallery Images (up to 6)</label>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleGalleryUpload(e, false)}
                          disabled={uploadingImage}
                        />
                        {uploadingImage && <p className="text-sm text-gray-500">Uploading images...</p>}
                        {newPost.image_urls && newPost.image_urls.length > 0 && (
                          <div className="grid grid-cols-3 gap-2">
                            {newPost.image_urls.map((url) => (
                              <div key={url} className="relative">
                                <img src={url} alt="Gallery preview" className="w-full h-24 object-cover rounded" />
                                <button
                                  type="button"
                                  className="absolute top-1 right-1 bg-white/80 text-red-600 text-xs px-2 py-0.5 rounded"
                                  onClick={() => removeGalleryImage(url, false)}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Post Content</label>
                        <p className="text-xs text-gray-500">
                          Tip: Use markdown for formatting. Add images throughout your content with: ![Image description](image-url)
                        </p>
                        <Textarea
                          placeholder="Post Content - You can use markdown syntax and embed images using ![alt text](image-url)"
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          rows={12}
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setShowAddPost(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddPost} disabled={uploadingImage}>
                          Add Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              size="sm" 
              variant="destructive"
              onClick={handleClearAllPosts}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Posts
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {blogPosts.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No blog posts available</p>
          ) : (
            blogPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  {post.image_url && (
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-24 h-24 object-cover rounded flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500 gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.date)}</span>
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Dialog open={showReadMore && selectedPost?.id === post.id} onOpenChange={(open) => {
                      setShowReadMore(open);
                      if (!open) setSelectedPost(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setSelectedPost(post)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{selectedPost?.title}</DialogTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                            <span>By {selectedPost?.author}</span>
                            <span>•</span>
                            <span>{selectedPost && formatDate(selectedPost.date)}</span>
                            <span>•</span>
                            <Badge variant="secondary">{selectedPost?.category}</Badge>
                          </div>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {selectedPost?.content}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={showEditPost && editingPost?.id === post.id} onOpenChange={(open) => {
                      setShowEditPost(open);
                      if (!open) setEditingPost(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => setEditingPost(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Blog Post</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Post Title"
                            value={editingPost?.title || ''}
                            onChange={(e) => setEditingPost(editingPost ? { ...editingPost, title: e.target.value } : null)}
                          />
                          <Input
                            placeholder="Author Name"
                            value={editingPost?.author || ''}
                            onChange={(e) => setEditingPost(editingPost ? { ...editingPost, author: e.target.value } : null)}
                          />
                          <Input
                            placeholder="Category"
                            value={editingPost?.category || ''}
                            onChange={(e) => setEditingPost(editingPost ? { ...editingPost, category: e.target.value } : null)}
                          />
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Featured Image</label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, true)}
                              disabled={uploadingImage}
                            />
                            {uploadingImage && <p className="text-sm text-gray-500">Uploading image...</p>}
                            {editingPost?.image_url && (
                              <img src={editingPost.image_url} alt="Preview" className="w-full h-32 object-cover rounded" />
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Gallery Images (up to 6)</label>
                            <Input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleGalleryUpload(e, true)}
                              disabled={uploadingImage}
                            />
                            {uploadingImage && <p className="text-sm text-gray-500">Uploading images...</p>}
                            {editingPost?.image_urls && editingPost.image_urls.length > 0 && (
                              <div className="grid grid-cols-3 gap-2">
                                {editingPost.image_urls.map((url) => (
                                  <div key={url} className="relative">
                                    <img src={url} alt="Gallery preview" className="w-full h-24 object-cover rounded" />
                                    <button
                                      type="button"
                                      className="absolute top-1 right-1 bg-white/80 text-red-600 text-xs px-2 py-0.5 rounded"
                                      onClick={() => removeGalleryImage(url, true)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Post Content</label>
                            <p className="text-xs text-gray-500">
                              Tip: Use markdown for formatting. Add images throughout your content with: ![Image description](image-url)
                            </p>
                            <Textarea
                              placeholder="Post Content - You can use markdown syntax and embed images using ![alt text](image-url)"
                              value={editingPost?.content || ''}
                              onChange={(e) => setEditingPost(editingPost ? { ...editingPost, content: e.target.value } : null)}
                              rows={8}
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={() => setShowEditPost(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditPost} disabled={uploadingImage}>
                              Update Post
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogManagement;