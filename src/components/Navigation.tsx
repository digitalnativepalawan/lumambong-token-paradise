
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Waves, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import AdminPortal from "./AdminPortal";
import { useInvestmentModal } from "@/hooks/useInvestmentModal";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, selectedUnit, openModal, closeModal } = useInvestmentModal();
  const { user, userProfile, signOut, isAuthenticated } = useAuth();
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
    openModal();
  };

  const navItems = [
    { label: "Property", href: "#property" },
    { label: "Investment", href: "#investment" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#contact" }
  ];

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
              <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Luxe Lumambong
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-medium transition-colors hover:text-emerald-600 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* User Authentication */}
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className={`w-4 h-4 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
                    <span className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-white'}`}>
                      {userProfile?.full_name || user?.email}
                    </span>
                  </div>
                  
                  {/* Admin Portal Button */}
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
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className={`${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => navigate('/auth')}
                    variant="ghost"
                    className={`${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
                  >
                    Sign In
                  </Button>
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
              )}
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
                  <a
                    key={item.label}
                    href={item.href}
                    className="block font-medium text-gray-700 hover:text-emerald-600 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                
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
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Invest Now
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
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Invest Now
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
