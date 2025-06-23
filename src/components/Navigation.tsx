
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Volume2, VolumeX, Minus, Plus } from "lucide-react";
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
  const { user, userProfile, signOut, isAuthenticated } = useAuth();
  const { isMuted, volume, toggleMute, setVolume } = useAudio();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleInvestClick = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    navigate('/dashboard');
  };

  const adjustVolume = (delta: number) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: "Project", href: "#project" },
    { label: "Token Utility", href: "#utility" }, 
    { label: "Investment", href: "#investment" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#contact", onClick: scrollToContact },
    { label: "Business Plan", href: "https://g.co/gemini/share/922cc3bf7865", external: true }
  ];

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
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-600 hover:text-black transition-colors relative group cursor-pointer"
                  >
                    {item.label}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={item.onClick}
                    className="font-medium text-gray-600 hover:text-black transition-colors relative group cursor-pointer"
                  >
                    {item.label}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                  </a>
                )
              ))}

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
              <div className="relative flex items-center gap-2">
                <Button
                  onClick={() => setShowVolumeControl(!showVolumeControl)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-black hover:bg-gray-100"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                
                {showVolumeControl && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg p-3 flex items-center gap-2 min-w-[150px]">
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
                        className="bg-blue-600 h-2 rounded-full transition-all"
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

              {/* User Authentication */}
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-black">
                      {userProfile?.full_name || user?.email}
                    </span>
                  </div>
                  
                  {/* Admin Portal Button */}
                  <AdminPortal />
                  
                  <Button 
                    onClick={handleInvestClick}
                    className="modern-button px-6 py-2 rounded-xl"
                  >
                    My Paradise
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => navigate('/auth')}
                    variant="ghost"
                    className="text-gray-600 hover:text-black hover:bg-gray-100"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleInvestClick}
                    className="modern-button px-6 py-2 rounded-xl"
                  >
                    Invest in BBT
                  </Button>
                </div>
              )}
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
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-medium text-gray-600 hover:text-black transition-colors py-2 cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className="block font-medium text-gray-600 hover:text-black transition-colors py-2 cursor-pointer"
                    >
                      {item.label}
                    </a>
                  )
                ))}
                
                {/* Dashboard Link for Mobile */}
                {isAuthenticated && (
                  <Button
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:text-black"
                  >
                    My Dashboard
                  </Button>
                )}
                
                {/* Social Media Icons for Mobile */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-600">Follow Us</span>
                  <SocialMediaIcons variant="footer" className="text-gray-600" />
                </div>
                
                {/* Audio Toggle for Mobile */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-600">Background Audio</span>
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
                
                {isAuthenticated ? (
                  <div className="space-y-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{userProfile?.full_name || user?.email}</span>
                    </div>
                    
                    {/* Admin Portal Button for Mobile */}
                    <div className="flex justify-center">
                      <AdminPortal />
                    </div>
                    
                    <Button 
                      onClick={() => {
                        handleInvestClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full modern-button"
                    >
                      My Paradise
                    </Button>
                    <Button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 pt-3 border-t border-gray-200">
                    <Button
                      onClick={() => {
                        navigate('/auth');
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => {
                        handleInvestClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full modern-button"
                    >
                      Invest in BBT
                    </Button>
                  </div>
                )}
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
