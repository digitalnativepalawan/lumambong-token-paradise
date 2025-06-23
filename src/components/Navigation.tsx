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

  const navItems = [
    { label: "Project", href: "#project" },
    { label: "Token Utility", href: "#utility" }, 
    { label: "Investment", href: "#investment" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass border-b border-purple-500/20 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 group-hover:scale-110 transition-transform">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                Binga Beach
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-medium text-gray-300 hover:text-purple-400 transition-colors relative group"
                >
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}

              {/* Dashboard Link for Authenticated Users */}
              {isAuthenticated && (
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="ghost"
                  className="text-gray-300 hover:text-purple-400 hover:bg-purple-500/10"
                >
                  My Dashboard
                </Button>
              )}

              {/* Social Media Icons */}
              <SocialMediaIcons 
                variant="header" 
                className="text-gray-300 hover:text-purple-400" 
              />

              {/* Audio Controls */}
              <div className="relative flex items-center gap-2">
                <Button
                  onClick={() => setShowVolumeControl(!showVolumeControl)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-purple-400 hover:bg-purple-500/10"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                
                {showVolumeControl && (
                  <div className="absolute top-full right-0 mt-2 glass rounded-lg border border-purple-500/20 p-3 flex items-center gap-2 min-w-[150px]">
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
                  <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg">
                    <User className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-300">
                      {userProfile?.full_name || user?.email}
                    </span>
                  </div>
                  
                  {/* Admin Portal Button */}
                  <AdminPortal />
                  
                  <Button 
                    onClick={handleInvestClick}
                    className="gradient-button px-6 py-2 rounded-xl"
                  >
                    My Paradise
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => navigate('/auth')}
                    variant="ghost"
                    className="text-gray-300 hover:text-purple-400 hover:bg-purple-500/10"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleInvestClick}
                    className="gradient-button px-6 py-2 rounded-xl"
                  >
                    Invest in BBT
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 z-60 relative text-gray-300 hover:text-purple-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-purple-500/20 shadow-2xl">
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                
                {/* Dashboard Link for Mobile */}
                {isAuthenticated && (
                  <Button
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-blue-600"
                  >
                    My Dashboard
                  </Button>
                )}
                
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
                
                {isAuthenticated ? (
                  <div className="space-y-3 pt-3 border-t">
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
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
                  <div className="space-y-3 pt-3 border-t">
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
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
