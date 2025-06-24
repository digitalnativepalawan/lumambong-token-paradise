
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SocialMediaIcons from "./SocialMediaIcons";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkClick = (href: string) => {
    if (href.startsWith('/')) {
      // For route links
      navigate(href);
      return;
    }

    if (href.startsWith('#')) {
      // For hash links
      if (location.pathname !== '/') {
        // If not on homepage, navigate to homepage with hash
        navigate('/' + href);
        return;
      } else {
        // If on homepage, scroll to section
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    }

    // For external links
    window.open(href, '_blank');
  };

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: 'Newsletter Subscriber',
          email: email,
          phone: 'N/A',
          investmentAmount: 'Newsletter Signup',
          message: `Newsletter signup from: ${email}`
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickLinks = [
    { label: "The Project", href: "#project" },
    { label: "Token Utility", href: "#utility" }, 
    { label: "Investment Opportunities", href: "#investment" },
    { label: "Location & Amenities", href: "#location" },
    { label: "Business Plan", href: "/business-plan" },
    { label: "Governance", href: "/governance" },
    { label: "Marketplace", href: "/marketplace" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Whitepaper", href: "#" },
    { label: "Risk Disclosure", href: "#" }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/c5e976ca-58db-42cd-9f8b-b428bbf602fa.png" 
                alt="Binga Beach Logo" 
                className="w-48 h-auto object-contain"
              />
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Own a fraction of paradise through innovative tokenized real estate. 
              BBT offers ownership, timeshare rights, and governance in premium 
              beachfront property in Palawan, Philippines.
            </p>
            
            {/* Newsletter signup */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 max-w-md">
              <h4 className="font-semibold text-black mb-3">Stay Updated</h4>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest updates on development progress and investment opportunities.
              </p>
              <form onSubmit={handleNewsletterSignup} className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="modern-button px-4 py-2 rounded-lg"
                  disabled={isLoading}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>

            <SocialMediaIcons variant="footer" className="text-gray-600 hover:text-blue-600" />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-black">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 group-hover:bg-blue-100 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-600 group-hover:text-black transition-colors">
                    Lumambong (Binga) Beach
                  </div>
                  <div className="text-sm text-gray-500">San Vicente, Palawan</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <a 
                  href="mailto:david@bingabeach.com" 
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  david@bingabeach.com
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-green-50 border border-green-200 group-hover:bg-green-100 transition-colors">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-600 group-hover:text-black transition-colors">
                  +63 947 444 3597
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-black">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <button 
                  key={index}
                  onClick={() => handleLinkClick(link.href)}
                  className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors relative group"
                >
                  {link.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <p className="text-gray-600">
              &copy; 2025 Binga Beach. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link, index) => (
                <button 
                  key={index}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
