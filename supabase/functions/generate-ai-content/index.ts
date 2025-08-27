import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Removed dependency on any specific AI provider/API key.
// This function now returns a clear "not configured" response until a new provider is set.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contentType, prompt, context } = await req.json();
    console.log('AI Content Generation Request (disabled):', {
      contentType,
      prompt: prompt?.substring(0, 100)
    });

    // Inform callers that AI is currently disabled/unconfigured.
    return new Response(
      JSON.stringify({
        disabled: true,
        content: null,
        message: 'AI provider not configured. Please add your new provider API key and update this function to use it.'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-ai-content function (disabled mode):', error);
    return new Response(
      JSON.stringify({ 
        error: 'AI provider not configured',
        details: 'The AI content generator has been temporarily disabled until a new API is configured.'
      }),
      {
        status: 501,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});