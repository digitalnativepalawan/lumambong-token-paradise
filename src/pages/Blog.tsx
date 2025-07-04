import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Edit, Trash2, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "The Future of Digital Real Estate Securities",
      content: "Discover how blockchain technology is revolutionizing real estate investment, making it more accessible and transparent for investors worldwide. The tokenization of real estate assets represents a paradigm shift in how we think about property ownership and investment.",
      author: "David Chen",
      date: "2025-01-15",
      category: "Technology"
    },
    {
      id: "2", 
      title: "Binga Beach Development Update - Phase 2",
      content: "We're excited to share the latest progress on our Palawan beachfront development. Construction has reached a major milestone with infrastructure completion ahead of schedule. Our sustainable building practices are setting new standards for eco-friendly resort development.",
      author: "Maria Santos",
      date: "2025-01-10",
      category: "Development"
    },
    {
      id: "3",
      title: "Investment Strategies for Fractional Real Estate",
      content: "Learn about different approaches to investing in tokenized real estate and how to build a diversified portfolio. From understanding market trends to risk management, this guide covers essential strategies for modern real estate investors.",
      author: "Alex Rodriguez",
      date: "2025-01-05",
      category: "Investment"
    },
    {
      id: "4",
      title: "Sustainable Tourism in Palawan",
      content: "Exploring how our development contributes to sustainable tourism practices in one of the Philippines' most beautiful destinations. We're committed to preserving the natural beauty while creating economic opportunities for local communities.",
      author: "Jennifer Park",
      date: "2024-12-28",
      category: "Sustainability"
    }
  ]);

  const [isAdmin, setIsAdmin] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = (id: string) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

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
                {isAdmin ? "Exit Admin Mode" : "Admin Mode"}
              </Button>
            </div>
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <h3 className="text-lg font-semibold text-red-800">Admin Controls</h3>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Post
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => setBlogPosts([])}
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
                        {post.content}
                      </p>
                      <div className="flex flex-wrap gap-3 items-center justify-between">
                        <Button variant="outline" className="group-hover:bg-blue-50 group-hover:border-blue-200">
                          Read More
                        </Button>
                        {isAdmin && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                              <Edit className="w-4 h-4" />
                            </Button>
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