
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
    breakdown: {
      grossRental: number
      grossAmenities: number
      netIncome: number
      dividendPool: number
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { tokensPurchased, totalTokens, simulationResult }: ExplanationRequest = await req.json()

    // Calculate additional metrics for the explanation
    const totalInvestment = tokensPurchased * 25
    const currentProjectValue = 2500000 // $2.5M total project value (10 units x $250k each)
    const equityToday = (simulationResult.ownershipPct / 100) * currentProjectValue
    const yearsAhead = 12
    const projectedGrowthRate = 0.06 // 6% annual appreciation
    const projectedFutureValue = currentProjectValue * Math.pow(1 + projectedGrowthRate, yearsAhead)
    const equityFuture = (simulationResult.ownershipPct / 100) * projectedFutureValue
    const equityGain = equityFuture - equityToday
    const twelveYearDividends = simulationResult.annualDividendUSD * yearsAhead
    const totalReturn = twelveYearDividends + equityGain
    const totalReturnMultiple = totalReturn / totalInvestment

    // Generate the explanation
    const explanation = `By buying ${tokensPurchased.toLocaleString()} Digital Securities for $${totalInvestment.toLocaleString()}, you own ${simulationResult.ownershipPct.toFixed(4)}% of Binga Beach. That slice is worth $${Math.round(equityToday).toLocaleString()} today and could grow to $${Math.round(equityFuture).toLocaleString()} in ${yearsAhead} years — a gain of $${Math.round(equityGain).toLocaleString()}. You'll also get about ${Math.round(simulationResult.annualStayDays)} free-stay nights annually and receive $${Math.round(simulationResult.annualDividendUSD).toLocaleString()} in dividends this year (totalling $${Math.round(twelveYearDividends).toLocaleString()} over ${yearsAhead} years). Together, your cash dividends plus asset appreciation could multiply your $${totalInvestment.toLocaleString()} investment roughly ${totalReturnMultiple.toFixed(1)}× by Year ${yearsAhead}. It's a small entry for big long-term upside and a taste of paradise!`

    return new Response(
      JSON.stringify({ 
        explanation,
        metrics: {
          totalInvestment,
          equityToday: Math.round(equityToday),
          equityFuture: Math.round(equityFuture),
          equityGain: Math.round(equityGain),
          twelveYearDividends: Math.round(twelveYearDividends),
          totalReturnMultiple: parseFloat(totalReturnMultiple.toFixed(1))
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Explanation generation error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate explanation' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
