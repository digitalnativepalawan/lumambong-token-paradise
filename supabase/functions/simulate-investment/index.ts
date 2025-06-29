
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
  adjustments?: {
    rateDelta: number
    highOccDelta: number
    lowOccDelta: number
    amenityDelta: number
    tokenGrowthPct: number
    exitYears: number
  }
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
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

    const { tokensPurchased, totalTokens, investorType, adjustments }: SimulationRequest = await req.json()

    // Default adjustments if not provided
    const adj = adjustments || {
      rateDelta: 0,
      highOccDelta: 0,
      lowOccDelta: 0,
      amenityDelta: 0,
      tokenGrowthPct: 0.05,
      exitYears: 12
    }

    // Fixed Model Assumptions with adjustments
    const baseNightlyRate = 200
    const nightlyRate = baseNightlyRate + adj.rateDelta
    
    const highSeasonDays = 182
    const lowSeasonDays = 183
    
    const baseHighOcc = 0.80
    const baseLowOcc = 0.60
    const highOcc = clamp(baseHighOcc + (adj.highOccDelta / 100), 0, 1)
    const lowOcc = clamp(baseLowOcc + (adj.lowOccDelta / 100), 0, 1)
    
    const units = 10
    const dividendPayoutRatio = 0.30 // 30% of net rental revenue
    
    const baseAmenityRevenuePct = 0.10 // 10% additional F&B/tours revenue
    const amenityRevenuePerUnitPct = clamp(baseAmenityRevenuePct + (adj.amenityDelta / 100), 0, 1)
    
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

    // 1. Annual Rental Revenue per unit with adjustments
    const highRev = nightlyRate * highSeasonDays * highOcc
    const lowRev = nightlyRate * lowSeasonDays * lowOcc
    const rentalRevPerUnit = highRev + lowRev

    // 2. Total Gross Revenue with adjustments
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

    // 5. Token Price Growth and Exit Value Calculations
    const initialTokenPrice = 25
    const exitTokenPrice = initialTokenPrice * Math.pow(1 + adj.tokenGrowthPct, adj.exitYears)
    const exitValue = exitTokenPrice * tokensPurchased
    const totalDividends = annualDividend * adj.exitYears
    const capitalGain = exitValue - (tokensPurchased * initialTokenPrice)
    const totalReturn = totalDividends + capitalGain
    const returnMultiple = totalReturn / (tokensPurchased * initialTokenPrice)

    const result = {
      ownershipPct: Number((ownershipPct * 100).toFixed(4)), // Convert to percentage
      annualStayDays: Number(annualStayDays.toFixed(1)),
      annualDividendUSD: Number(annualDividend.toFixed(2)),
      exitYears: adj.exitYears,
      tokenGrowthPct: adj.tokenGrowthPct,
      exitTokenPrice: Number(exitTokenPrice.toFixed(2)),
      exitValue: Number(exitValue.toFixed(2)),
      totalDividends: Number(totalDividends.toFixed(2)),
      totalReturn: Number(totalReturn.toFixed(2)),
      returnMultiple: Number(returnMultiple.toFixed(2)),
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
