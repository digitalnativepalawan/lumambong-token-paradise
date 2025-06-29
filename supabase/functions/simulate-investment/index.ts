
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SimulationRequest {
  tokensPurchased: number
  totalTokens: number
  investorType: 'PHILIPPINE' | 'FOREIGN'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { tokensPurchased, totalTokens, investorType }: SimulationRequest = await req.json()

    // Fixed Model Assumptions
    const nightlyRate = 200 // USD
    const highSeasonDays = 182
    const lowSeasonDays = 183
    const highOcc = 0.80
    const lowOcc = 0.60
    const units = 10
    const dividendPayoutRatio = 0.30 // 30% of net rental revenue
    const amenityRevenuePerUnitPct = 0.10 // 10% additional F&B/tours revenue
    const operatingExpenseRatio = 0.18 // 18% of gross revenue

    // Validation & Enforcement
    const foreignCap = totalTokens * 0.40
    const philippineCap = totalTokens * 0.60

    // Get current token distribution from database
    const { data: tokenPools } = await supabase
      .from('token_pools')
      .select('*')

    let currentForeignTokens = 0
    let currentPhilippineTokens = 0

    if (tokenPools) {
      const foreignPool = tokenPools.find(pool => pool.pool_type === 'FOREIGN')
      const philippinePool = tokenPools.find(pool => pool.pool_type === 'PHILIPPINE')
      
      currentForeignTokens = foreignPool?.sold_tokens || 0
      currentPhilippineTokens = philippinePool?.sold_tokens || 0
    }

    // Validate purchase against caps
    if (investorType === 'FOREIGN') {
      if (currentForeignTokens + tokensPurchased > foreignCap) {
        return new Response(
          JSON.stringify({ 
            error: `Purchase exceeds foreign investor cap. Available: ${foreignCap - currentForeignTokens} tokens` 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    } else if (investorType === 'PHILIPPINE') {
      if (currentPhilippineTokens + tokensPurchased > philippineCap) {
        return new Response(
          JSON.stringify({ 
            error: `Purchase exceeds Philippine investor cap. Available: ${philippineCap - currentPhilippineTokens} tokens` 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    }

    // 1. Annual Rental Revenue per unit
    const highRev = nightlyRate * highSeasonDays * highOcc
    const lowRev = nightlyRate * lowSeasonDays * lowOcc
    const rentalRevPerUnit = highRev + lowRev

    // 2. Total Gross Revenue
    const grossRental = rentalRevPerUnit * units
    const grossAmenities = grossRental * amenityRevenuePerUnitPct
    const grossRevenue = grossRental + grossAmenities

    // 3. Net Income Available for Distribution
    const netIncome = grossRevenue * (1 - operatingExpenseRatio)
    const dividendPool = netIncome * dividendPayoutRatio

    // 4. Investor Metrics
    const ownershipPct = tokensPurchased / totalTokens
    const annualDividend = dividendPool * ownershipPct
    const totalOccupancyDays = highSeasonDays * highOcc + lowSeasonDays * lowOcc
    const annualStayDays = units * totalOccupancyDays * ownershipPct

    const result = {
      ownershipPct: Number((ownershipPct * 100).toFixed(4)), // Convert to percentage
      annualStayDays: Number(annualStayDays.toFixed(1)),
      annualDividendUSD: Number(annualDividend.toFixed(2)),
      breakdown: {
        grossRental: Number(grossRental.toFixed(0)),
        grossAmenities: Number(grossAmenities.toFixed(0)),
        netIncome: Number(netIncome.toFixed(0)),
        dividendPool: Number(dividendPool.toFixed(0))
      },
      caps: {
        foreignCap,
        philippineCap,
        remainingForeign: foreignCap - currentForeignTokens,
        remainingPhilippine: philippineCap - currentPhilippineTokens
      }
    }

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Simulation error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
