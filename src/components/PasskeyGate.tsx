
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Waves } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PasskeyGateProps {
  children: React.ReactNode;
}

const PasskeyGate = ({ children }: PasskeyGateProps) => {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const CORRECT_PASSKEY = 'LumambongBeach5309';

  useEffect(() => {
    // Check if user has already entered correct passkey
    const savedAuth = localStorage.getItem('site-access-granted');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (passkey === CORRECT_PASSKEY) {
      localStorage.setItem('site-access-granted', 'true');
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to Luxe Lumambong!",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect passkey. Please try again.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">Luxe Lumambong</span>
          </div>
          <CardTitle className="flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" />
            Site Access
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            This site is currently under development. Please enter the passkey to continue.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="passkey">Passkey</Label>
              <Input
                id="passkey"
                type="password"
                placeholder="Enter site passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Access Site'}
            </Button>
          </form>
          
          <div className="mt-4 text-xs text-center text-gray-500">
            <p>Contact the development team if you need access.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasskeyGate;
