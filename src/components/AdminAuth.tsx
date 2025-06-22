
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthProps {
  onAuthSuccess: () => void;
}

const AdminAuth = ({ onAuthSuccess }: AdminAuthProps) => {
  const [passkey, setPasskey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const ADMIN_EMAILS = ['david@bingabeach.com'];
  const ADMIN_PASSKEY = 'LumambongBeach5309';

  const handleAuth = () => {
    setIsLoading(true);

    // Check if user is an admin email
    const isAdminEmail = user?.email && ADMIN_EMAILS.includes(user.email);
    
    // Check if passkey is correct
    const isValidPasskey = passkey === ADMIN_PASSKEY;

    if (isAdminEmail || isValidPasskey) {
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the admin portal!",
      });
      onAuthSuccess();
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid credentials for admin access.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  // Auto-authenticate if user is admin email
  React.useEffect(() => {
    if (user?.email && ADMIN_EMAILS.includes(user.email)) {
      onAuthSuccess();
    }
  }, [user?.email, onAuthSuccess]);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          <Lock className="w-5 h-5" />
          Admin Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-700">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Current User:</span>
          </div>
          <p className="text-sm text-blue-600 mt-1">
            {user?.email || 'Not logged in'}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="passkey">Admin Passkey</Label>
          <Input
            id="passkey"
            type="password"
            placeholder="Enter admin passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
          />
          <p className="text-xs text-gray-500">
            Enter the admin passkey or login with an authorized admin email.
          </p>
        </div>

        <Button 
          onClick={handleAuth}
          className="w-full bg-red-600 hover:bg-red-700"
          disabled={isLoading}
        >
          {isLoading ? 'Authenticating...' : 'Access Admin Portal'}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          <p>Authorized admin emails are automatically granted access.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAuth;
