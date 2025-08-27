
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Calendar, Users, FileText, Settings, Brain, Sparkles, ExternalLink, Edit3, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AdminAuth from './AdminAuth';
import SocialMediaTimeline from './SocialMediaTimeline';
import MindMap from './MindMap';
import BlogManagement from './BlogManagement';
import AIContentHub from './ai/AIContentHub';

const AdminPortal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingQuickAction, setEditingQuickAction] = useState<number | null>(null);
  const [quickActions, setQuickActions] = useState([
    { name: 'Analytics', url: 'https://analytics.example.com' },
    { name: 'Database', url: 'https://supabase.com/dashboard' },
    { name: 'Logs', url: 'https://logs.example.com' }
  ]);
  const { user } = useAuth();

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsAuthenticated(false);
  };

  const updateQuickAction = (index: number, field: 'name' | 'url', value: string) => {
    setQuickActions(prev => prev.map((action, i) => 
      i === index ? { ...action, [field]: value } : action
    ));
  };

  const addQuickAction = () => {
    setQuickActions(prev => [...prev, { name: 'New Action', url: 'https://example.com' }]);
  };

  const removeQuickAction = (index: number) => {
    setQuickActions(prev => prev.filter((_, i) => i !== index));
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
                <div className="flex items-center gap-2">
                  {quickActions.map((action, index) => (
                    <div key={index} className="relative group">
                      {editingQuickAction === index ? (
                        <div className="flex flex-col gap-1 p-2 bg-white rounded border shadow-sm min-w-48">
                          <Label className="text-xs">Name</Label>
                          <Input
                            value={action.name}
                            onChange={(e) => updateQuickAction(index, 'name', e.target.value)}
                            className="text-xs h-6"
                          />
                          <Label className="text-xs">URL</Label>
                          <Input
                            value={action.url}
                            onChange={(e) => updateQuickAction(index, 'url', e.target.value)}
                            className="text-xs h-6"
                          />
                          <div className="flex gap-1 mt-1">
                            <Button
                              size="sm"
                              onClick={() => setEditingQuickAction(null)}
                              className="text-xs h-6 px-2"
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeQuickAction(index)}
                              className="text-xs h-6 px-2"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-300 text-blue-700 hover:bg-blue-100 text-xs h-8 pr-8"
                            onClick={() => window.open(action.url, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {action.name}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute right-0 top-0 h-8 w-8 p-0 hover:bg-blue-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingQuickAction(index);
                            }}
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addQuickAction}
                    className="border-purple-300 text-purple-700 hover:bg-purple-100 text-xs h-8"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    size="sm"
                    className="border-green-300 text-green-700 hover:bg-green-100"
                  >
                    Close Portal
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="timeline" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="hidden sm:inline">Timeline</span>
                  </TabsTrigger>
                  <TabsTrigger value="mindmap" className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span className="hidden sm:inline">Mind Map</span>
                  </TabsTrigger>
                  <TabsTrigger value="content" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Content</span>
                  </TabsTrigger>
                  <TabsTrigger value="ai-hub" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">AI Hub</span>
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">Users</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="mt-6">
                  <SocialMediaTimeline />
                </TabsContent>

                <TabsContent value="mindmap" className="mt-6">
                  <MindMap />
                </TabsContent>

                <TabsContent value="content" className="mt-6">
                  <BlogManagement />
                </TabsContent>

                <TabsContent value="ai-hub" className="mt-6">
                  <AIContentHub />
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
