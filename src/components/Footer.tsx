
import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import SocialMediaIcons from "./SocialMediaIcons";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const quickLinks = [
    { label: "The Project", href: "#project" },
    { label: "Token Utility", href: "#utility" }, 
    { label: "Blog", href: "/blog" },
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
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/c5e976ca-58db-42cd-9f8b-b428bbf602fa.png" 
                alt="Binga Beach Logo" 
                className="w-40 sm:w-48 h-auto object-contain"
              />
            </div>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Own a fraction of paradise through innovative digital securities real estate. 
              BBT offers ownership, timeshare rights, and governance in premium 
              beachfront property in Palawan, Philippines.
            </p>
            
            <SocialMediaIcons variant="footer" className="text-white/80 hover:text-primary" />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-xl bg-primary/20 border border-primary/30 group-hover:bg-primary/30 transition-colors flex-shrink-0 backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white/80 group-hover:text-white transition-colors">
                    Lumambong (Binga) Beach
                  </div>
                  <div className="text-sm text-white/60">San Vicente, Palawan</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-xl bg-primary/20 border border-primary/30 group-hover:bg-primary/30 transition-colors flex-shrink-0 backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <a 
                  href="mailto:david@bingabeach.com" 
                  className="text-white/80 hover:text-white transition-colors break-all sm:break-normal"
                >
                  david@bingabeach.com
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-xl bg-primary/20 border border-primary/30 group-hover:bg-primary/30 transition-colors flex-shrink-0 backdrop-blur-sm">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span className="text-white/80 group-hover:text-white transition-colors">
                  +63 947 444 3597
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <button 
                  key={index}
                  onClick={() => handleLinkClick(link.href)}
                  className="block w-full text-left text-white/80 hover:text-primary transition-colors relative group py-1"
                >
                  {link.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 glow-purple"></div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mt-8 sm:mt-12 backdrop-blur-sm">
          <p className="text-primary text-sm sm:text-base text-center">
            <strong>Legal Notice:</strong> HBCX Digital Securities are not currently for sale. This web app is an informational front-end preview only. 
            No investment commitments or offers are being accepted at this time. Please consult official project updates for future launch announcements.
          </p>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <p className="text-white/80 text-sm sm:text-base">
              &copy; 2025 Binga Beach. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {legalLinks.map((link, index) => (
                <button 
                  key={index}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-sm text-white/80 hover:text-primary transition-colors"
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
