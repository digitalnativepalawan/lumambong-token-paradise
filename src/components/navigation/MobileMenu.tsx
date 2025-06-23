
import { Button } from "@/components/ui/button";
import { User, Volume2, VolumeX, Minus, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAudio } from "@/hooks/useAudio";
import AdminPortal from "@/components/AdminPortal";
import SocialMediaIcons from "@/components/SocialMediaIcons";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  scrollToContact: () => void;
}

const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, scrollToContact }: MobileMenuProps) => {
  const { user, userProfile, signOut, isAuthenticated } = useAuth();
  const { isMuted, volume, toggleMute, setVolume } = useAudio();
  const navigate = useNavigate();

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
    { label: "Business Plan", href: "/business-plan" }
  ];

  if (!isMobileMenuOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="px-6 py-4 space-y-4">
        {navItems.map((item) => (
          item.href.startsWith('/') ? (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.href);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left font-medium text-gray-600 hover:text-black transition-colors py-2 cursor-pointer"
            >
              {item.label}
            </button>
          ) : (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
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
  );
};

export default MobileMenu;
