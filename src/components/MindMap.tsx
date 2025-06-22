
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Share2, Eye, ZoomIn, ZoomOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MindMap = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const { toast } = useToast();

  const handleShare = () => {
    setIsPublic(!isPublic);
    toast({
      title: isPublic ? "Mind Map Made Private" : "Mind Map Shared Publicly",
      description: isPublic 
        ? "The mind map is now only visible to admins" 
        : "The mind map is now visible to all users",
    });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Project Mind Map
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isPublic ? "default" : "secondary"}>
                {isPublic ? "Public" : "Private"}
              </Badge>
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                {isPublic ? "Make Private" : "Share Publicly"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Zoom: {zoomLevel}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleZoomOut}
                  variant="outline"
                  size="sm"
                  disabled={zoomLevel <= 50}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleZoomIn}
                  variant="outline"
                  size="sm"
                  disabled={zoomLevel >= 200}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-auto bg-gray-50">
              <div 
                className="transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
              >
                <img
                  src="/lovable-uploads/48c86c03-13c1-46c8-bce2-a6f364ec15a2.png"
                  alt="Project Mind Map"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">Mind Map Overview</h3>
              <p className="text-sm text-blue-700">
                This mind map shows the comprehensive project structure and workflow for the Lumambong Beach development. 
                It includes key phases, responsibilities, and interconnected processes that guide the project execution.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isPublic && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-green-800">
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Public Sharing Enabled</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              This mind map is now visible to all users on the main application. 
              Users can view the project structure and development workflow.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MindMap;
