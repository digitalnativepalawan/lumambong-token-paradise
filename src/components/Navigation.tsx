
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import SocialMediaIcons from "./SocialMediaIcons";
import { useInvestmentModal } from "@/hooks/useInvestmentModal";
import NavigationMenu from "./navigation/NavigationMenu";
import AudioControls from "./navigation/AudioControls";
import UserMenu from "./navigation/UserMenu";
import MobileMenu from "./navigation/MobileMenu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, selectedUnit, closeModal } = useInvestmentModal();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Empty left section for uniform spacing */}
            <div className="flex items-center">
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavigationMenu scrollToContact={scrollToContact} />

              {/* Dashboard Link for Authenticated Users */}
              {isAuthenticated && (
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="ghost"
                  className="text-gray-600 hover:text-black hover:bg-gray-100"
                >
                  My Dashboard
                </Button>
              )}

              {/* Social Media Icons */}
              <SocialMediaIcons 
                variant="header" 
                className="text-gray-600 hover:text-black" 
              />

              {/* Audio Controls */}
              <AudioControls />

              {/* User Authentication */}
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 z-60 relative text-gray-600 hover:text-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <MobileMenu 
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            scrollToContact={scrollToContact}
          />
        </div>
      </nav>

      <PaymentModal
        isOpen={isOpen}
        onClose={closeModal}
        selectedUnit={selectedUnit}
      />
    </>
  );
};

export default Navigation;
