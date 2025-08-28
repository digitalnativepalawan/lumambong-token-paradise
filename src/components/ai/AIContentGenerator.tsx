import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AIContentGeneratorProps {
  contentType: 'blog_post' | 'timeline_content' | 'mind_map' | 'general_content';
  onContentGenerated: (content: string) => void;
  placeholder?: string;
  context?: string;
  className?: string;
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({
  contentType,
  onContentGenerated,
  placeholder = "Describe what you want to generate...",
  context,
  className = ""
}) => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [aiDisabled, setAiDisabled] = useState(false);
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const toneOptions = {
    professional: 'Professional and informative',
    friendly: 'Friendly and conversational',
    persuasive: 'Persuasive and compelling',
    casual: 'Casual and approachable',
    formal: 'Formal and authoritative'
  };

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate content",
        variant: "destructive"
      });
      return;
    }

    setErrorMessage(null);
    setIsGenerating(true);
    try {
      const enhancedPrompt = contentType === 'blog_post' ? prompt : `Write in a ${selectedTone} tone. ${prompt}`;
      
      const { data, error } = await supabase.functions.invoke('generate-ai-content', {
        body: {
          contentType,
          prompt: enhancedPrompt,
          context,
          options: {
            maxTokens: 2000
          }
        }
      });

      if (error) {
        const msg = (error as any)?.message || '';
        if (msg.toLowerCase().includes('not configured') || msg.toLowerCase().includes('disabled')) {
          setAiDisabled(true);
          toast({
            title: "AI disabled",
            description: "The AI provider is not configured. Please set a new API key to re-enable.",
            variant: "destructive"
          });
          return;
        }
        throw error;
      }

      if ((data as any)?.error) {
        setErrorMessage((data as any)?.message || 'AI service error.');
        return;
      }

      if (!data || !data.content) {
        if ((data as any)?.disabled) {
          setAiDisabled(true);
          toast({
            title: "AI disabled",
            description: (data as any)?.message || "The AI provider is not configured. Please set a new API key to re-enable."
          });
          return;
        }
        setErrorMessage((data as any)?.message || 'No content returned from AI.');
        return;
      }

      setGeneratedContent(data.content);
      setAiDisabled(false);
      setErrorMessage(null);
      toast({
        title: "Content generated",
        description: "AI content has been generated successfully"
      });
    } catch (error) {
      console.error('Error generating content:', error);
      const errMsg = (error as any)?.message || "Failed to generate content. Please try again.";
      setErrorMessage(errMsg);
      toast({
        title: "Generation failed",
        description: errMsg,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied",
      description: "Content copied to clipboard"
    });
  };

  const useContent = () => {
    onContentGenerated(generatedContent);
    toast({
      title: "Content applied",
      description: "Generated content has been applied"
    });
  };

  const regenerate = () => {
    generateContent();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contentType !== 'blog_post' && (
          <div className="space-y-2">
            <Label htmlFor="tone">Writing Tone</Label>
            <Select value={selectedTone} onValueChange={setSelectedTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(toneOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="prompt">Content Prompt</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            rows={3}
          />
        </div>

        <Button 
          onClick={generateContent} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {aiDisabled ? (
            <>AI disabled — try again</>
          ) : isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>
        
        {errorMessage && (
          <Alert variant="destructive">
            <AlertTitle>Generation failed</AlertTitle>
            <AlertDescription className="text-sm">
              {errorMessage.includes('non-2xx') ? 'AI service is unavailable or misconfigured. Please try again.' : errorMessage}
            </AlertDescription>
          </Alert>
        )}
        
        {generatedContent && (
          <div className="space-y-3">
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="whitespace-pre-wrap text-sm">{generatedContent}</div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={useContent} size="sm">
                Use Content
              </Button>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button onClick={regenerate} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-1" />
                Regenerate
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;