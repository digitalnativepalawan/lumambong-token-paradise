
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AdminPortal from "@/components/AdminPortal";

const UserMenu = () => {
  const { user, userProfile, signOut, isAuthenticated } = useAuth();
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

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg">
          <User className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
          <span className="text-xs lg:text-sm text-black truncate max-w-24 lg:max-w-none">
            {userProfile?.full_name || user?.email}
          </span>
        </div>
        
        {/* Admin Portal Button */}
        <AdminPortal />
        
        <Button 
          onClick={handleInvestClick}
          className="modern-button px-3 lg:px-6 py-1.5 lg:py-2 rounded-xl text-xs lg:text-sm"
        >
          My Paradise
        </Button>
        <Button
          onClick={handleSignOut}
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-red-600 hover:bg-red-50 p-1.5 lg:p-2"
        >
          <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 lg:gap-3">
      <Button
        onClick={() => navigate('/auth')}
        variant="ghost"
        className="text-gray-600 hover:text-black hover:bg-gray-100 text-xs lg:text-sm px-2 lg:px-4"
      >
        Sign In
      </Button>
      <Button 
        onClick={() => navigate('/blog')}
        className="modern-button px-3 lg:px-6 py-1.5 lg:py-2 rounded-xl text-xs lg:text-sm"
      >
        Admin
      </Button>
    </div>
  );
};

export default UserMenu;
