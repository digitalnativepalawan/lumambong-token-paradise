
import { Waves, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SocialMediaIcons from "./SocialMediaIcons";

const Footer = () => {
  const quickLinks = [
    { label: "The Project", href: "#project" },
    { label: "Token Utility", href: "#utility" },
    { label: "Investment Opportunities", href: "#investment" },
    { label: "Location & Amenities", href: "#location" },
    { label: "Contact Us", href: "#contact" },
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
    <footer className="relative bg-black/50 backdrop-blur-sm border-t border-purple-500/20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Binga Beach</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Own a fraction of paradise through innovative tokenized real estate. 
              BBT offers ownership, timeshare rights, and governance in premium 
              beachfront property in Palawan, Philippines.
            </p>
            
            {/* Newsletter signup */}
            <div className="glass p-6 rounded-2xl border border-purple-500/20 max-w-md">
              <h4 className="font-semibold text-white mb-3">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-4">
                Get the latest updates on development progress and investment opportunities.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <Button className="gradient-button px-4 py-2 rounded-lg">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <SocialMediaIcons variant="footer" className="text-gray-400 hover:text-purple-400" />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-gray-300 group-hover:text-white transition-colors">
                    Lumambong (Binga) Beach
                  </div>
                  <div className="text-sm text-gray-400">San Vicente, Palawan</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <a 
                  href="mailto:info@bingabeach.com" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@bingabeach.com
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                  <Phone className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  +63 (0) 123 456 7890
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="block text-gray-400 hover:text-purple-400 transition-colors relative group"
                >
                  {link.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <p className="text-gray-400">
              &copy; 2025 Binga Beach. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
