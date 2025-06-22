
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Calendar, Users, FileText, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AdminAuth from './AdminAuth';
import SocialMediaTimeline from './SocialMediaTimeline';

const AdminPortal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useAuth();

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsAuthenticated(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
      >
        <Shield className="w-4 h-4 mr-2" />
        Admin Portal
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Lumambong Beach Admin Portal
            </DialogTitle>
          </DialogHeader>

          {!isAuthenticated ? (
            <AdminAuth onAuthSuccess={handleAuthSuccess} />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-medium text-green-800">Welcome, Admin!</p>
                  <p className="text-sm text-green-600">
                    Logged in as: {user?.email}
                  </p>
                </div>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  Close Portal
                </Button>
              </div>

              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="timeline" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="content" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="mt-6">
                  <SocialMediaTimeline />
                </TabsContent>

                <TabsContent value="users" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">User management functionality coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="content" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Content management functionality coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">System settings functionality coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPortal;
