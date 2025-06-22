
import { Waves, Mail, Phone, MapPin } from "lucide-react";
import SocialMediaIcons from "./SocialMediaIcons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Waves className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-bold">Lumambong</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your gateway to owning paradise in Palawan through innovative tokenized investment opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#property" className="text-gray-400 hover:text-white transition-colors">Property</a></li>
              <li><a href="#investment" className="text-gray-400 hover:text-white transition-colors">Investment</a></li>
              <li><a href="#location" className="text-gray-400 hover:text-white transition-colors">Location</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Investment Info */}
          <div>
            <h4 className="font-semibold mb-4">Investment</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Units Available: 10</li>
              <li className="text-gray-400">Price: $230,000 USD</li>
              <li className="text-gray-400">60/40 Ownership</li>
              <li className="text-gray-400">Off-Grid Solar</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span className="text-gray-400">invest@lumambong.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span className="text-gray-400">+63 (2) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="text-gray-400">Lumambong Beach, Palawan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Lumambong Beach Resort. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <SocialMediaIcons variant="footer" className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
