import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AdminAuth from '@/components/AdminAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, FileText, Settings, Brain, Sparkles, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SocialMediaTimeline from '@/components/SocialMediaTimeline';
import MindMap from '@/components/MindMap';
import BlogManagement from '@/components/BlogManagement';
import AIContentHub from '@/components/ai/AIContentHub';
import AdminBusinessPlanButtons from '@/components/AdminBusinessPlanButtons';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            Back to Site
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto mt-20">
            <Card>
              <CardHeader>
                <CardTitle>Admin Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminAuth onAuthSuccess={handleAuthSuccess} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-green-800">Welcome, Admin!</p>
                  <p className="text-sm text-green-600 mt-1">
                    Logged in as: {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="grid w-full grid-cols-7 h-auto">
                <TabsTrigger value="timeline" className="flex items-center gap-2 py-3">
                  <Calendar className="w-4 h-4" />
                  <span>Timeline</span>
                </TabsTrigger>
                <TabsTrigger value="mindmap" className="flex items-center gap-2 py-3">
                  <Brain className="w-4 h-4" />
                  <span>Mind Map</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2 py-3">
                  <FileText className="w-4 h-4" />
                  <span>Blog</span>
                </TabsTrigger>
                <TabsTrigger value="ai-hub" className="flex items-center gap-2 py-3">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Hub</span>
                </TabsTrigger>
                <TabsTrigger value="buttons" className="flex items-center gap-2 py-3">
                  <ExternalLink className="w-4 h-4" />
                  <span>Buttons</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2 py-3">
                  <Users className="w-4 h-4" />
                  <span>Users</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2 py-3">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
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

              <TabsContent value="buttons" className="mt-6">
                <AdminBusinessPlanButtons />
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
      </div>
    </div>
  );
};

export default Admin;
