import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, User, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image_url?: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReadMore, setShowReadMore] = useState(false);
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


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              Stay updated with the latest news, insights, and developments in digital real estate securities and our Palawan Collective project.
            </p>
          </div>


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
                } md:flex bg-white border-gray-200 overflow-hidden`}>
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
                              {selectedPost?.image_url && (
                                <img 
                                  src={selectedPost.image_url} 
                                  alt={selectedPost.title}
                                  className="w-full rounded-lg mb-6"
                                />
                              )}
                              <div className="prose prose-lg max-w-none text-gray-700">
                                <ReactMarkdown 
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    img: ({node, ...props}) => (
                                      <img {...props} className="rounded-lg my-4 w-full" />
                                    ),
                                  }}
                                >
                                  {selectedPost?.content || ''}
                                </ReactMarkdown>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </div>
                  <div className="md:w-1/3 relative">
                    {post.image_url ? (
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-full object-contain bg-gray-50"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-8 h-full">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-12 h-12 text-blue-600" />
                          </div>
                          <p className="text-sm text-gray-600 font-medium">Published</p>
                          <p className="text-lg font-semibold text-gray-800">{formatDate(post.date)}</p>
                        </div>
                      </div>
                    )}
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