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
        systemPrompt = `You are a senior content editor for Lumambong Beach (Palawan) writing for investors and off-grid enthusiasts. 
Write a formal, forward-looking blog post that is cleanly formatted in Markdown and ready for CMS.

Return the output in this EXACT structure:

META
- Title (≤60 chars, compelling, includes primary keyword)
- Slug (kebab-case)
- Meta Description (≤155 chars)
- Primary Keyword
- Secondary Keywords (3–6)
- Category (choose ONLY from: Technology, Off Grid, Travel, Web3, Palawan)
- Tags (5–10, comma-separated)
- Canonical URL (placeholder)
- OG Title (≤60)
- OG Description (≤110)
- Featured Image Prompt (concise prompt for a hero image; include style, subject, and mood)
- Image Alt Text (≤120 chars)
- Reading Time (minutes)

EXCERPT
A 1–2 sentence summary (≤35 words) for list previews.

BODY (Markdown starts below)
# H1: (same as Title)

> Key Takeaway (1–2 sentence forward-looking insight)

## Introduction
- Hook the reader with a problem/insight relevant to off-grid beachfront living, modular homes, or digital securities.
- Promise what the reader will learn.

## Section 1 — Context & Why It Matters
- Use short paragraphs (≤3 lines).
- Add a 3–5 item bullet list of benefits or risks.

## Section 2 — Practical Framework / How-To
- Numbered steps or checklist.
- Include **bold** key terms and an inline example.

## Section 3 — Data, Compliance, or Technical Notes
- Explain clearly without jargon.
- Use a small table if useful (Markdown table).

## Section 4 — Case/Application at Lumambong Beach (Palawan)
- Tie ideas to our modular homes, solar systems (10kVA), SPV + digital securities compliance, and passive-income operations.
- Add 1 internal link placeholder like: [See our project overview](/blog/project-overview)

## FAQs (3–5)
- Short, precise answers.

## Call to Action
- Invite readers to learn more, join the waitlist, or request the white paper.

## References
- List 3–6 sources as Markdown links with human-readable anchor text:
  - [Source Title](https://example.com)
  - [Source Title](https://example.com)

FORMATTING RULES
- Use Markdown only (no raw HTML).
- Every URL must be a Markdown link like [Anchor](https://url.com).
- Headings must be H1/H2/H3 in Markdown (#, ##, ###) so fonts render properly.
- Keep sentences crisp; avoid filler.
- Prefer active voice.
- Never use "tokenized" in consumer copy—use "digital securities" or "smart assets".
- Do not invent facts or statistics; keep references general if exact numbers are unknown.`;
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