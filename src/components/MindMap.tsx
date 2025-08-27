
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Brain, Share2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AIContentGenerator from './ai/AIContentGenerator';

const MindMap = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [mindMapContent, setMindMapContent] = useState('');
  const [showAIGenerator, setShowAIGenerator] = useState(false);
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
              <Dialog open={showAIGenerator} onOpenChange={setShowAIGenerator}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Mind Map
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>AI Mind Map Generator</DialogTitle>
                  </DialogHeader>
                  <AIContentGenerator
                    contentType="mind_map"
                    onContentGenerated={(content) => {
                      setMindMapContent(content);
                      setShowAIGenerator(false);
                    }}
                    placeholder="Generate mind map content (e.g., 'Create project structure for beach resort development', 'Generate workflow for investment process')"
                    context="Lumambong Beach Resort Development Project - comprehensive project planning and execution"
                  />
                </DialogContent>
              </Dialog>
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
            {mindMapContent ? (
              <div className="p-6 bg-background rounded-lg border">
                <div className="whitespace-pre-wrap text-sm">{mindMapContent}</div>
              </div>
            ) : (
              <div className="p-8 bg-muted/50 rounded-lg border text-center">
                <p className="text-muted-foreground">Use the AI generator to create your mind map content</p>
              </div>
            )}

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
