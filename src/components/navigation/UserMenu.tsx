
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
    );
  }

  return (
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
  );
};

export default UserMenu;
