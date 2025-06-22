
import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock blog posts data
const mockBlogPosts = [
  {
    id: '1',
    title: 'Welcome to Lumambong Beach Resort Investment',
    slug: 'welcome-to-lumambong-beach-resort',
    content: `
      <h2>Discover Paradise Investment Opportunities</h2>
      <p>Lumambong Beach Resort represents a unique opportunity to invest in one of the Philippines' most beautiful coastal destinations. Our resort combines luxury accommodations with sustainable tourism practices.</p>
      
      <h3>Why Invest in Lumambong Beach?</h3>
      <ul>
        <li>Prime beachfront location in Bacolod</li>
        <li>Growing tourism market in the Philippines</li>
        <li>Sustainable and eco-friendly development</li>
        <li>Professional management team</li>
      </ul>
      
      <p>Join us in creating a world-class resort destination that benefits both investors and the local community.</p>
    `,
    excerpt: 'Discover the unique investment opportunities at Lumambong Beach Resort, combining luxury with sustainability.',
    author: 'Resort Management',
    published_at: '2024-01-15T10:00:00Z',
    featured_image: '/lovable-uploads/69c86e8e-ee37-4927-a0f4-7b5f4cf0d98d.png',
    tags: ['investment', 'resort', 'philippines']
  },
  {
    id: '2',
    title: 'Sustainable Tourism and Environmental Responsibility',
    slug: 'sustainable-tourism-environmental-responsibility',
    content: `
      <h2>Our Commitment to the Environment</h2>
      <p>At Lumambong Beach Resort, we believe that luxury and environmental responsibility go hand in hand. Our development practices prioritize the preservation of the natural beauty that makes this location so special.</p>
      
      <h3>Green Initiatives</h3>
      <ul>
        <li>Solar power integration for renewable energy</li>
        <li>Water conservation and recycling systems</li>
        <li>Local material sourcing to support the community</li>
        <li>Marine life protection programs</li>
      </ul>
      
      <p>We're not just building a resort; we're creating a model for sustainable coastal development.</p>
    `,
    excerpt: 'Learn about our commitment to sustainable tourism and environmental protection at Lumambong Beach Resort.',
    author: 'Environmental Team',
    published_at: '2024-01-10T14:30:00Z',
    featured_image: '/lovable-uploads/a37e0dbc-4399-45b0-82d5-d859062513e9.png',
    tags: ['sustainability', 'environment', 'green-energy']
  }
];

const Blog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // If slug is provided, show single post
  if (slug) {
    const post = mockBlogPosts.find(p => p.slug === slug);
    
    if (!post) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="container mx-auto px-6 py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
              <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/blog')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={() => navigate('/blog')} 
              variant="outline" 
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
                
                <div className="flex gap-2 mb-6">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show blog listing
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resort Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, insights, and developments at Lumambong Beach Resort.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockBlogPosts.map((post) => (
            <Card key={post.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <div onClick={() => navigate(`/blog/${post.slug}`)}>
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.published_at).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
