
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
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Risk Disclosure", href: "/risk-disclosure" }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/palawan-collective-logo.png" 
                alt="Palawan Collective Logo" 
                className="w-40 sm:w-56 h-auto object-contain"
              />
            </div>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Own a fraction of paradise through innovative digital securities real estate. 
              BBT offers ownership, timeshare rights, and governance in premium 
              beachfront property in Palawan, Philippines.
            </p>
            
            <SocialMediaIcons variant="footer" className="text-gray-600 hover:text-blue-600" />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-black">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-gray-600 group-hover:text-black transition-colors">
                    Lumambong Beach
                  </div>
                  <div className="text-sm text-gray-500">San Vicente, Palawan</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <a 
                  href="mailto:david@palawancollective.com" 
                  className="text-gray-600 hover:text-black transition-colors break-all sm:break-normal"
                >
                  david@palawancollective.com
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-green-50 border border-green-200 group-hover:bg-green-100 transition-colors flex-shrink-0">
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
                  className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors relative group py-1"
                >
                  {link.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8 sm:mt-12">
          <p className="text-amber-800 text-sm sm:text-base text-center">
            <strong>Legal Notice:</strong> HBCX Digital Securities are not currently for sale. This web app is an informational front-end preview only. 
            No investment commitments or offers are being accepted at this time. Please consult official project updates for future launch announcements.
          </p>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <p className="text-gray-600 text-sm sm:text-base">
              2025 Palawan Collective. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
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
