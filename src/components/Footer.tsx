
import { Waves, MapPin, Mail, Phone } from "lucide-react";
import SocialMediaIcons from "./SocialMediaIcons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Waves className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">Binga Beach</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Own a fraction of paradise through innovative tokenized real estate. 
              Binga Beach Tokens (BBT) offer ownership, timeshare rights, and governance 
              in premium beachfront property in Palawan, Philippines.
            </p>
            <SocialMediaIcons variant="footer" className="text-gray-300" />
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Lumambong (Binga) Beach, San Vicente, Palawan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:info@bingabeach.com" className="hover:text-white transition-colors">
                  info@bingabeach.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+63 (0) 123 456 7890</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#project" className="block text-gray-300 hover:text-white transition-colors">
                The Project
              </a>
              <a href="#utility" className="block text-gray-300 hover:text-white transition-colors">
                Token Utility
              </a>
              <a href="#investment" className="block text-gray-300 hover:text-white transition-colors">
                Investment Opportunities
              </a>
              <a href="#location" className="block text-gray-300 hover:text-white transition-colors">
                Location & Amenities
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="/governance" className="block text-gray-300 hover:text-white transition-colors">
                Governance
              </a>
              <a href="/marketplace" className="block text-gray-300 hover:text-white transition-colors">
                Marketplace
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; 2025 Binga Beach. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Whitepaper</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
