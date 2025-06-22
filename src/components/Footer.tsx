
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
              <Waves className="w-8 h-8 text-emerald-400" />
              <span className="text-xl font-bold">Palawan Collective</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Own your secluded Palawan paradise through innovative tokenized crowdfunding 
              on one of the world's most beautiful islands.
            </p>
            <SocialMediaIcons variant="footer" className="text-gray-300" />
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Lumambong Beach, Palawan, Philippines</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href="mailto:info@palawancollective.com" className="hover:text-white transition-colors">
                  info@palawancollective.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+63 (0) 123 456 7890</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#property" className="block text-gray-300 hover:text-white transition-colors">
                Property Details
              </a>
              <a href="#investment" className="block text-gray-300 hover:text-white transition-colors">
                Investment Options
              </a>
              <a href="#location" className="block text-gray-300 hover:text-white transition-colors">
                Location & Amenities
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 Palawan Collective. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
