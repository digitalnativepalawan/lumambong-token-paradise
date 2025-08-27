import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');

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
    if (!openrouterApiKey && !deepseekApiKey) {
      return new Response(
        JSON.stringify({ disabled: true, error: true, message: 'No AI provider keys found. Set OPENROUTER_API_KEY or DEEPSEEK_API_KEY.' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { contentType, prompt, context, options = {} } = await req.json();

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

    const model = options.model || 'deepseek/deepseek-chat';
    const max_tokens = options.maxTokens || 2000;

    let generatedContent = '';
    let provider = '';
    let usage: any = null;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `${context ? `Context: ${context}\n\n` : ''}${prompt}` }
    ];

    if (openrouterApiKey) {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openrouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://etwzlfmijfoyfazlxhtu.supabase.co',
          'X-Title': 'Beach Resort AI Content Generator',
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenRouter API Error:', response.status, errorData);
        return new Response(
          JSON.stringify({ error: true, message: 'OpenRouter API error', status: response.status, details: errorData }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const data = await response.json();
      generatedContent = data.choices?.[0]?.message?.content ?? '';
      provider = 'openrouter';
      usage = data.usage ?? null;
    } else if (deepseekApiKey) {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${deepseekApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          max_tokens,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('DeepSeek API Error:', response.status, errorData);
        return new Response(
          JSON.stringify({ error: true, message: 'DeepSeek API error', status: response.status, details: errorData }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const data = await response.json();
      generatedContent = data.choices?.[0]?.message?.content ?? '';
      provider = 'deepseek';
      usage = data.usage ?? null;
    }

    return new Response(
      JSON.stringify({ content: generatedContent, contentType, usage, model, provider }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-ai-content function:', error);
    return new Response(
      JSON.stringify({ error: true, message: String(error) }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});