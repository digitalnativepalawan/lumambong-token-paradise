import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, User, Edit, Trash2, Plus, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '', category: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [showReadMore, setShowReadMore] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
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

  // Add new blog post
  const handleAddPost = async () => {
    if (!isAdmin) {
      toast({
        title: "Admin Required",
        description: "Please enter admin mode to add blog posts",
        variant: "destructive",
      });
      return;
    }

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
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post added successfully!",
      });

      setNewPost({ title: '', content: '', author: '', category: '' });
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

  // Remove unused auth functions
  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              HBCX Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news, insights, and developments in digital real estate securities and our Binga Beach project.
            </p>
            
            {/* Admin Toggle */}
            <div className="mt-8">
              <Button
                onClick={toggleAdmin}
                variant={isAdmin ? "destructive" : "default"}
                className="modern-button"
              >
                {isAdmin ? "Exit Admin Mode" : "Enter Admin Mode"}
              </Button>
            </div>
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <h3 className="text-lg font-semibold text-red-800">Admin Controls</h3>
                <div className="flex gap-2">
                  <Dialog open={showAddPost} onOpenChange={setShowAddPost}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Blog Post</DialogTitle>
                      </DialogHeader>
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
                        <Textarea
                          placeholder="Post Content"
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          rows={8}
                        />
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setShowAddPost(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddPost}>
                            Add Post
                          </Button>
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
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:gap-12">
            {blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">No blog posts available</h3>
                <p className="text-gray-500">Check back soon for new updates and insights.</p>
              </div>
            ) : (
              blogPosts.map((post, index) => (
                <Card key={post.id} className={`group hover:shadow-lg transition-all duration-300 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } md:flex bg-white border-gray-200`}>
                  <div className="md:w-2/3">
                    <CardHeader className="pb-4">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-2xl md:text-3xl font-bold text-black group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                      </p>
                      <div className="flex flex-wrap gap-3 items-center justify-between">
                        <Dialog open={showReadMore && selectedPost?.id === post.id} onOpenChange={(open) => {
                          setShowReadMore(open);
                          if (!open) setSelectedPost(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="group-hover:bg-blue-50 group-hover:border-blue-200"
                              onClick={() => setSelectedPost(post)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Read More
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
                        
                        {isAdmin && (
                          <div className="flex gap-2">
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
                                  <Textarea
                                    placeholder="Post Content"
                                    value={editingPost?.content || ''}
                                    onChange={(e) => setEditingPost(editingPost ? { ...editingPost, content: e.target.value } : null)}
                                    rows={8}
                                  />
                                  <div className="flex gap-2 justify-end">
                                    <Button variant="outline" onClick={() => setShowEditPost(false)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleEditPost}>
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
                        )}
                      </div>
                    </CardContent>
                  </div>
                  <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-12 h-12 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 font-medium">Published</p>
                      <p className="text-lg font-semibold text-gray-800">{formatDate(post.date)}</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;