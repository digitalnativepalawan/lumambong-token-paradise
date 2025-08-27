import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

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
    if (!openrouterApiKey) {
      throw new Error('OpenRouter API key not found');
    }

    const { contentType, prompt, context, options = {} } = await req.json();
    
    console.log('AI Content Generation Request:', { contentType, prompt: prompt?.substring(0, 100) });

    let systemPrompt = '';
    
    switch (contentType) {
      case 'blog_post':
        systemPrompt = 'You are a professional content writer creating engaging blog posts for a beach resort development project. Write in a friendly, informative tone that appeals to potential investors and visitors. Include relevant details about sustainability, luxury, and investment opportunities.';
        break;
      case 'timeline_content':
        systemPrompt = 'You are a social media marketing expert creating timeline content for a luxury beach resort development. Focus on specific, actionable marketing activities with clear timelines and responsible parties. Be strategic and professional.';
        break;
      case 'mind_map':
        systemPrompt = 'You are a project management expert creating structured mind maps for a beach resort development project. Organize information hierarchically with clear relationships between concepts, phases, and deliverables. Return structured data that can be visualized.';
        break;
      case 'general_content':
        systemPrompt = 'You are a versatile content creator helping with various marketing and business content for a luxury beach resort development project. Adapt your tone and style based on the specific request while maintaining professionalism.';
        break;
      default:
        systemPrompt = 'You are a helpful assistant creating content for a luxury beach resort development project.';
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://etwzlfmijfoyfazlxhtu.supabase.co',
        'X-Title': 'Beach Resort AI Content Generator',
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${context ? `Context: ${context}\n\n` : ''}${prompt}` }
        ],
        max_tokens: options.maxTokens || 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API Error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('AI Content Generated Successfully');

    return new Response(JSON.stringify({ 
      content: generatedContent,
      contentType,
      usage: data.usage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-ai-content function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to generate AI content'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});