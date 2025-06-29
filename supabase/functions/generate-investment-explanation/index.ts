
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ExplanationRequest {
  tokensPurchased: number
  totalTokens: number
  investorType: 'PHILIPPINE' | 'FOREIGN'
  simulationResult: {
    ownershipPct: number
    annualStayDays: number
    annualDividendUSD: number
    exitYears?: number
    tokenGrowthPct?: number
    exitTokenPrice?: number
    exitValue?: number
    totalDividends?: number
    totalReturn?: number
    returnMultiple?: number
    breakdown: {
      grossRental: number
      grossAmenities: number
      netIncome: number
      dividendPool: number
    }
  }
  adjustments?: {
    rateDelta: number
    highOccDelta: number
    lowOccDelta: number
    amenityDelta: number
    tokenGrowthPct: number
    exitYears: number
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { tokensPurchased, totalTokens, investorType, simulationResult, adjustments }: ExplanationRequest = await req.json()

    // Constants for equity calculations
    const TOKEN_PRICE = 25
    const CURRENT_PROJECT_VALUE = 2585000 // $2.585M
    const FUTURE_PROJECT_VALUE = 12130000 // $12.13M in 12 years
    
    // Calculate investment metrics
    const totalInvestment = tokensPurchased * TOKEN_PRICE
    const ownershipDecimal = simulationResult.ownershipPct / 100
    const equityToday = ownershipDecimal * CURRENT_PROJECT_VALUE
    const equityFuture = ownershipDecimal * FUTURE_PROJECT_VALUE
    const equityGain = equityFuture - equityToday
    const twelveYearDividends = simulationResult.annualDividendUSD * 12
    const totalReturn = equityGain + twelveYearDividends
    const totalReturnMultiple = totalReturn / totalInvestment

    // Generate adjustment context
    const adj = adjustments || { 
      rateDelta: 0, 
      highOccDelta: 0, 
      lowOccDelta: 0, 
      amenityDelta: 0,
      tokenGrowthPct: 0.05,
      exitYears: 12
    }
    
    let adjustmentContext = ""
    const adjustmentParts = []
    
    if (adj.rateDelta !== 0) {
      adjustmentParts.push(`${adj.rateDelta > 0 ? 'increased' : 'decreased'} nightly rates by $${Math.abs(adj.rateDelta)}`)
    }
    if (adj.highOccDelta !== 0) {
      adjustmentParts.push(`${adj.highOccDelta > 0 ? 'boosted' : 'reduced'} high-season occupancy by ${Math.abs(adj.highOccDelta)}pp`)
    }
    if (adj.lowOccDelta !== 0) {
      adjustmentParts.push(`${adj.lowOccDelta > 0 ? 'boosted' : 'reduced'} low-season occupancy by ${Math.abs(adj.lowOccDelta)}pp`)
    }
    if (adj.amenityDelta !== 0) {
      adjustmentParts.push(`${adj.amenityDelta > 0 ? 'increased' : 'decreased'} amenity revenue by ${Math.abs(adj.amenityDelta).toFixed(1)}pp`)
    }
    
    // Add token growth context
    const growthRate = (adj.tokenGrowthPct * 100).toFixed(1)
    const exitYears = adj.exitYears
    if (adj.tokenGrowthPct !== 0.05 || adj.exitYears !== 12) {
      adjustmentParts.push(`modeled ${growthRate}% annual token appreciation over ${exitYears} years`)
    }
    
    if (adjustmentParts.length > 0) {
      adjustmentContext = ` With your scenario adjustments (${adjustmentParts.join(', ')}), the projections reflect these operational and market assumptions.`
    }

    // Generate explanation based on investment size and performance
    let explanation = ""
    
    // Use the new exit value data if available
    const hasExitProjections = simulationResult.exitValue && simulationResult.totalReturn && simulationResult.returnMultiple
    
    if (tokensPurchased >= 10000) {
      if (hasExitProjections) {
        explanation = `By investing $${totalInvestment.toLocaleString()} in ${tokensPurchased.toLocaleString()} Digital Securities, you're acquiring a meaningful ${simulationResult.ownershipPct}% stake in Binga Beach. Your tokens are projected to grow from $25 each to $${simulationResult.exitTokenPrice?.toFixed(2)} each over ${simulationResult.exitYears} years at ${((simulationResult.tokenGrowthPct || 0) * 100).toFixed(1)}% annual growth, giving you an exit value of $${simulationResult.exitValue?.toLocaleString()}. Combined with $${simulationResult.totalDividends?.toLocaleString()} in total dividends and ${Math.round(simulationResult.annualStayDays)} days of annual property access, your total return could reach $${simulationResult.totalReturn?.toLocaleString()}—a ${simulationResult.returnMultiple?.toFixed(1)}× return on investment.${adjustmentContext}`
      } else {
        explanation = `By investing $${totalInvestment.toLocaleString()} in ${tokensPurchased.toLocaleString()} Digital Securities, you're acquiring a meaningful ${simulationResult.ownershipPct}% stake in Binga Beach. Your ownership slice is worth about $${Math.round(equityToday).toLocaleString()} today and could grow to approximately $${Math.round(equityFuture).toLocaleString()} over 12 years—a potential gain of $${Math.round(equityGain).toLocaleString()}. You'll receive roughly $${Math.round(simulationResult.annualDividendUSD)} in annual dividends (about $${Math.round(twelveYearDividends).toLocaleString()} over 12 years), plus ${Math.round(simulationResult.annualStayDays)} days of property access annually. Combined, your dividends and property appreciation could multiply your investment by ${totalReturnMultiple.toFixed(1)}× over the next decade.${adjustmentContext}`
      }
    } else if (tokensPurchased >= 1000) {
      if (hasExitProjections) {
        explanation = `Your $${totalInvestment.toLocaleString()} investment in ${tokensPurchased.toLocaleString()} Digital Securities gives you ${simulationResult.ownershipPct}% ownership of Binga Beach. With ${((simulationResult.tokenGrowthPct || 0) * 100).toFixed(1)}% annual token appreciation, your investment could grow to $${simulationResult.exitValue?.toLocaleString()} over ${simulationResult.exitYears} years. Including $${simulationResult.totalDividends?.toLocaleString()} in cumulative dividends and ${Math.round(simulationResult.annualStayDays)} days of annual property access, your total return could reach ${simulationResult.returnMultiple?.toFixed(1)}× your initial investment.${adjustmentContext}`
      } else {
        explanation = `Your $${totalInvestment.toLocaleString()} investment in ${tokensPurchased.toLocaleString()} Digital Securities gives you ${simulationResult.ownershipPct}% ownership of Binga Beach. This stake is valued at about $${Math.round(equityToday).toLocaleString()} today, with potential to reach $${Math.round(equityFuture).toLocaleString()} in 12 years. You'll earn approximately $${Math.round(simulationResult.annualDividendUSD)} annually in dividends and enjoy ${Math.round(simulationResult.annualStayDays)} days of property access per year. Over 12 years, your total returns (dividends plus appreciation) could reach about ${totalReturnMultiple.toFixed(1)}× your initial investment.${adjustmentContext}`
      }
    } else {
      if (hasExitProjections) {
        explanation = `With ${tokensPurchased} Digital Securities for $${totalInvestment.toLocaleString()}, you own ${simulationResult.ownershipPct}% of Binga Beach. At ${((simulationResult.tokenGrowthPct || 0) * 100).toFixed(1)}% annual growth, your tokens could be worth $${simulationResult.exitValue?.toLocaleString()} in ${simulationResult.exitYears} years. Adding $${simulationResult.totalDividends?.toLocaleString()} in total dividends and ${Math.round(simulationResult.annualStayDays)} annual stay days, this represents a potential ${simulationResult.returnMultiple?.toFixed(1)}× return on your investment.${adjustmentContext}`
      } else {
        explanation = `With ${tokensPurchased} Digital Securities for $${totalInvestment.toLocaleString()}, you own ${simulationResult.ownershipPct}% of Binga Beach. Your ownership is worth about $${Math.round(equityToday).toLocaleString()} today and could grow to roughly $${Math.round(equityFuture).toLocaleString()} over time. You'll receive about $${Math.round(simulationResult.annualDividendUSD)} in annual dividends and can enjoy ${Math.round(simulationResult.annualStayDays)} days at the property each year. This represents a potential ${totalReturnMultiple.toFixed(1)}× return on your investment over 12 years through dividends and property appreciation.${adjustmentContext}`
      }
    }

    const result = {
      explanation,
      metrics: {
        totalInvestment,
        equityToday: Math.round(equityToday),
        equityFuture: Math.round(equityFuture),
        equityGain: Math.round(equityGain),
        twelveYearDividends: Math.round(twelveYearDividends),
        totalReturnMultiple: Number(totalReturnMultiple.toFixed(2))
      }
    }

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Explanation generation error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
