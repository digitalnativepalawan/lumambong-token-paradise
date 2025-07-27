
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
    baseStayDays: number
    totalStayDays: number
    annualDividendUSD: number
    exitYears?: number
    tokenGrowthPct?: number
    exitTokenPrice?: number
    exitValue?: number
    totalDividends?: number
    totalReturn?: number
    returnMultiple?: number
    currentEquityValue?: number
    projectedEquityValue?: number
    equityGain?: number
    cumulativeDividends?: number
    exitProceeds?: number
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
    const equityToday = simulationResult.currentEquityValue || (ownershipDecimal * CURRENT_PROJECT_VALUE)
    const equityFuture = simulationResult.projectedEquityValue || (ownershipDecimal * FUTURE_PROJECT_VALUE)
    const equityGain = simulationResult.equityGain || (equityFuture - equityToday)
    const twelveYearDividends = simulationResult.cumulativeDividends || (simulationResult.annualDividendUSD * 12)
    const totalReturn = simulationResult.totalReturn || (equityGain + twelveYearDividends)
    const totalReturnMultiple = simulationResult.returnMultiple || (totalReturn / totalInvestment)

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
    
    // Use the new equity and exit data if available
    const hasEquityProjections = simulationResult.currentEquityValue && simulationResult.projectedEquityValue
    const hasExitProjections = simulationResult.exitValue && simulationResult.totalReturn && simulationResult.returnMultiple
    
    if (tokensPurchased >= 10000) {
      if (hasEquityProjections && hasExitProjections) {
        explanation = `By investing $${totalInvestment.toLocaleString()} in ${tokensPurchased.toLocaleString()} Digital Securities, you're acquiring a meaningful ${simulationResult.ownershipPct}% ownership stake in Binga Beach. Your real estate equity starts at $${Math.round(equityToday).toLocaleString()} today and is projected to grow to $${Math.round(equityFuture).toLocaleString()} over ${simulationResult.exitYears} years—an equity gain of $${Math.round(equityGain).toLocaleString()}. Combined with $${Math.round(simulationResult.cumulativeDividends || twelveYearDividends).toLocaleString()} in cumulative dividends and ${Math.round(simulationResult.totalStayDays || simulationResult.baseStayDays)} days of annual property access, your total return could reach $${Math.round(simulationResult.totalReturn || totalReturn).toLocaleString()}—a ${(simulationResult.returnMultiple || totalReturnMultiple).toFixed(1)}× return on investment.${adjustmentContext}`
      } else {
        explanation = `By investing $${totalInvestment.toLocaleString()} in ${tokensPurchased.toLocaleString()} Digital Securities, you're acquiring a meaningful ${simulationResult.ownershipPct}% stake in Binga Beach. Your ownership slice is worth about $${Math.round(equityToday).toLocaleString()} today and could grow to approximately $${Math.round(equityFuture).toLocaleString()} over 12 years—a potential gain of $${Math.round(equityGain).toLocaleString()}. You'll receive roughly $${Math.round(simulationResult.annualDividendUSD)} in annual dividends (about $${Math.round(twelveYearDividends).toLocaleString()} over 12 years), plus ${Math.round(simulationResult.totalStayDays || simulationResult.baseStayDays)} days of property access annually. Combined, your dividends and property appreciation could multiply your investment by ${totalReturnMultiple.toFixed(1)}× over the next decade.${adjustmentContext}`
      }
    } else if (tokensPurchased >= 1000) {
      if (hasEquityProjections && hasExitProjections) {
        explanation = `Your $${totalInvestment.toLocaleString()} investment in ${tokensPurchased.toLocaleString()} Digital Securities gives you ${simulationResult.ownershipPct}% ownership of Binga Beach. Your real estate equity of $${Math.round(equityToday).toLocaleString()} today is projected to grow to $${Math.round(equityFuture).toLocaleString()} over ${simulationResult.exitYears} years. Including $${Math.round(simulationResult.cumulativeDividends || twelveYearDividends).toLocaleString()} in cumulative dividends and ${Math.round(simulationResult.totalStayDays || simulationResult.baseStayDays)} days of annual property access, your total return could reach ${(simulationResult.returnMultiple || totalReturnMultiple).toFixed(1)}× your initial investment.${adjustmentContext}`
      } else {
        explanation = `Your $${totalInvestment.toLocaleString()} investment in ${tokensPurchased.toLocaleString()} Digital Securities gives you ${simulationResult.ownershipPct}% ownership of Binga Beach. This stake is valued at about $${Math.round(equityToday).toLocaleString()} today, with potential to reach $${Math.round(equityFuture).toLocaleString()} in 12 years. You'll earn approximately $${Math.round(simulationResult.annualDividendUSD)} annually in dividends and enjoy ${Math.round(simulationResult.totalStayDays || simulationResult.baseStayDays)} days of property access per year. Over 12 years, your total returns (dividends plus appreciation) could reach about ${totalReturnMultiple.toFixed(1)}× your initial investment.${adjustmentContext}`
      }
    } else {
      if (hasEquityProjections && hasExitProjections) {
        explanation = `With ${tokensPurchased} Digital Securities for $${totalInvestment.toLocaleString()}, you own ${simulationResult.ownershipPct}% of Binga Beach. Your real estate equity of $${Math.round(equityToday).toLocaleString()} today could grow to $${Math.round(equityFuture).toLocaleString()} over ${simulationResult.exitYears} years. Adding $${Math.round(simulationResult.cumulativeDividends || twelveYearDividends).toLocaleString()} in total dividends and ${Math.round(simulationResult.totalStayDays || simulationResult.baseStayDays)} annual stay days, this represents a potential ${(simulationResult.returnMultiple || totalReturnMultiple).toFixed(1)}× return on your investment.${adjustmentContext}`
      } else {
        explanation = `With ${tokensPurchased} Digital Securities for $${totalInvestment.toLocaleString()}, you own ${simulationResult.ownershipPct}% of Binga Beach. Your ownership is worth about $${Math.round(equityToday).toLocaleString()} today and could grow to roughly $${Math.round(equityFuture).toLocaleString()} over time. You'll receive about $${Math.round(simulationResult.annualDividendUSD)} in annual dividends and can enjoy ${Math.round(simulationResult.totalStayDays || simulationResult.baseStayDays)} days at the property each year. This represents a potential ${totalReturnMultiple.toFixed(1)}× return on your investment over 12 years through dividends and property appreciation.${adjustmentContext}`
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
