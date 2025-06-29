
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const TOTAL_TOKENS = 248400
    const FOREIGN_TOKENS = Math.floor(TOTAL_TOKENS * 0.40) // 40%
    const PHILIPPINE_TOKENS = TOTAL_TOKENS - FOREIGN_TOKENS // 60%

    // Check if pools already exist
    const { data: existingPools } = await supabase
      .from('token_pools')
      .select('*')

    if (!existingPools || existingPools.length === 0) {
      // Create initial token pools
      const { error } = await supabase
        .from('token_pools')
        .insert([
          {
            pool_type: 'FOREIGN',
            total_tokens: FOREIGN_TOKENS,
            sold_tokens: 0
          },
          {
            pool_type: 'PHILIPPINE',
            total_tokens: PHILIPPINE_TOKENS,
            sold_tokens: 0
          }
        ])

      if (error) {
        throw error
      }

      return new Response(
        JSON.stringify({ 
          message: 'Token pools initialized successfully',
          pools: {
            foreign: FOREIGN_TOKENS,
            philippine: PHILIPPINE_TOKENS,
            total: TOTAL_TOKENS
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ 
        message: 'Token pools already exist',
        pools: existingPools
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Init pools error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to initialize token pools' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
