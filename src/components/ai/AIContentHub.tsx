import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, FileText, Mail, Megaphone, Presentation, Save } from 'lucide-react';
import AIContentGenerator from './AIContentGenerator';
import { useToast } from '@/hooks/use-toast';

const AIContentHub = () => {
  const [generatedContent, setGeneratedContent] = useState<{[key: string]: string}>({});
  const [activeTab, setActiveTab] = useState('emails');
  const { toast } = useToast();

  const contentTypes = {
    emails: {
      icon: Mail,
      title: 'Email Templates',
      description: 'Generate professional emails for investors, partners, and stakeholders',
      prompts: [
        'Write an investor update email about project progress',
        'Create a welcome email for new investors',
        'Draft a quarterly report email',
        'Write a partnership proposal email'
      ]
    },
    announcements: {
      icon: Megaphone,
      title: 'Announcements',
      description: 'Create press releases and public announcements',
      prompts: [
        'Write a press release about project milestone',
        'Create an announcement for new phase launch',
        'Draft an environmental impact statement',
        'Write a community engagement announcement'
      ]
    },
    marketing: {
      icon: Presentation,
      title: 'Marketing Copy',
      description: 'Generate compelling marketing materials and campaigns',
      prompts: [
        'Create a luxury resort brochure description',
        'Write social media ad copy for investors',
        'Draft a website landing page copy',
        'Create investment opportunity description'
      ]
    },
    documents: {
      icon: FileText,
      title: 'Business Documents',
      description: 'Generate formal business documentation',
      prompts: [
        'Create an executive summary for investors',
        'Draft a project proposal outline',
        'Write a market analysis summary',
        'Create a risk assessment document'
      ]
    }
  };

  const saveContent = (contentType: string, content: string) => {
    // In a real implementation, this would save to a database
    const savedContent = {
      ...generatedContent,
      [`${contentType}_${Date.now()}`]: content
    };
    setGeneratedContent(savedContent);
    
    toast({
      title: "Content saved",
      description: "Generated content has been saved to your content library"
    });
  };

  const QuickPrompts = ({ contentType, prompts }: { contentType: string, prompts: string[] }) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">Quick Prompts:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-left justify-start h-auto p-3 whitespace-normal"
            onClick={() => {
              // This would trigger the AI generator with the prompt
              toast({
                title: "Prompt selected",
                description: "Use this prompt in the AI generator below"
              });
            }}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Content Hub
          </CardTitle>
          <p className="text-muted-foreground">
            Generate professional content for all your project communication needs
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              {Object.entries(contentTypes).map(([key, type]) => {
                const Icon = type.icon;
                return (
                  <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{type.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(contentTypes).map(([key, type]) => (
              <TabsContent key={key} value={key} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                  <p className="text-muted-foreground mb-4">{type.description}</p>
                  
                  <QuickPrompts contentType={key} prompts={type.prompts} />
                </div>

                <AIContentGenerator
                  contentType="general_content"
                  onContentGenerated={(content) => {
                    setGeneratedContent(prev => ({
                      ...prev,
                      [key]: content
                    }));
                  }}
                  placeholder={`Describe the ${type.title.toLowerCase()} you want to generate...`}
                  context={`Lumambong Beach Resort Development Project - ${type.description.toLowerCase()}`}
                />

                {generatedContent[key] && (
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        Generated Content
                        <Button
                          onClick={() => saveContent(key, generatedContent[key])}
                          size="sm"
                          variant="outline"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-wrap text-sm">
                        {generatedContent[key]}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {Object.keys(generatedContent).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content Library</CardTitle>
            <p className="text-sm text-muted-foreground">
              Recently generated content
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(generatedContent).map(([key, content]) => (
                <div key={key} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">
                      {key.split('_')[0]} content
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(parseInt(key.split('_')[1]) || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {content.substring(0, 150)}...
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIContentHub;