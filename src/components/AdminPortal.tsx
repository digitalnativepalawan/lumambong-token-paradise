
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPortal = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/admin')}
      variant="outline"
      size="sm"
      className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
    >
      <Shield className="w-4 h-4 mr-2" />
      Admin Portal
    </Button>
  );
};

export default AdminPortal;
