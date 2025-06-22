
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Waves, User, LogOut, Volume2, VolumeX, Minus, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import AdminPortal from "./AdminPortal";
import SocialMediaIcons from "./SocialMediaIcons";
import { useInvestmentModal } from "@/hooks/useInvestmentModal";
import { useAudio } from "@/hooks/useAudio";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const { isOpen, selectedUnit, openModal, closeModal } = useInvestmentModal();
  const { user, userProfile, isAuthenticated } = useAuth();
  const { isMuted, volume, toggleMute, setVolume } = useAudio();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInvestClick = () => {
    openModal();
  };

  const adjustVolume = (delta: number) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
  };

  const navItems = [
    { label: "Property", href: "#property" },
    { label: "Investment", href: "#investment" },
    { label: "Location", href: "#location" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" }
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      // For hash links, scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Waves className={`w-8 h-8 ${isScrolled ? 'text-emerald-600' : 'text-white'}`} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`font-medium transition-colors hover:text-emerald-600 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Social Media Icons */}
              <SocialMediaIcons 
                variant="header" 
                className={isScrolled ? 'text-gray-600' : 'text-white'} 
              />

              {/* Audio Controls */}
              <div className="relative flex items-center gap-2">
                <Button
                  onClick={() => setShowVolumeControl(!showVolumeControl)}
                  variant="ghost"
                  size="sm"
                  className={`${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                
                {showVolumeControl && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border p-3 flex items-center gap-2 min-w-[150px]">
                    <Button
                      onClick={() => adjustVolume(-0.1)}
                      variant="ghost"
                      size="sm"
                      className="p-1 h-6 w-6"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all"
                        style={{ width: `${volume * 100}%` }}
                      />
                    </div>
                    <Button
                      onClick={() => adjustVolume(0.1)}
                      variant="ghost"
                      size="sm"
                      className="p-1 h-6 w-6"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={toggleMute}
                      variant="ghost"
                      size="sm"
                      className="p-1 h-6 w-6"
                    >
                      {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    </Button>
                  </div>
                )}
              </div>

              {/* Always show admin and invest buttons */}
              <div className="flex items-center gap-4">
                <AdminPortal />
                <Button 
                  onClick={handleInvestClick}
                  className={`${
                    isScrolled 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Invest Now
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 z-60 relative ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left font-medium text-gray-700 hover:text-emerald-600 transition-colors py-2"
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Social Media Icons for Mobile */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-700">Follow Us</span>
                  <SocialMediaIcons variant="footer" className="text-gray-600" />
                </div>
                
                {/* Audio Toggle for Mobile */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-700">Background Audio</span>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => adjustVolume(-0.1)}
                      variant="ghost"
                      size="sm"
                      className="p-1 h-6 w-6"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={() => adjustVolume(0.1)}
                      variant="ghost"
                      size="sm"
                      className="p-1 h-6 w-6"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={toggleMute}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3 pt-3 border-t">
                  {/* Admin Portal Button for Mobile */}
                  <div className="flex justify-center">
                    <AdminPortal />
                  </div>
                  
                  <Button 
                    onClick={() => {
                      handleInvestClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Invest Now
                  </Button>
                </div>
              </div>
            </div>
          )}
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
