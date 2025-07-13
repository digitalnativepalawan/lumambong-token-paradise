import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SimulationRequest {
  tokensPurchased: number;
  totalTokens: number;
  investorType: 'PHILIPPINE' | 'FOREIGN';
  adjustments?: {
    rateDelta: number;
    highOccDelta: number;
    lowOccDelta: number;
    amenityDelta: number;
    tokenGrowthPct: number;
    exitYears: number;
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const {
      tokensPurchased,
      totalTokens,
      investorType,
      adjustments = {
        rateDelta: 0,
        highOccDelta: 0,
        lowOccDelta: 0,
        amenityDelta: 0,
        tokenGrowthPct: 0.05,
        exitYears: 12
      }
    }: SimulationRequest = await req.json();

    console.log('Simulation request:', { tokensPurchased, totalTokens, investorType, adjustments });

    // Validate inputs
    if (!tokensPurchased || tokensPurchased <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid token quantity' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Investor caps validation
    const foreignCap = totalTokens * 0.40; // 40% for foreign investors
    const philippineCap = totalTokens * 0.60; // 60% for Philippine investors

    if (investorType === 'FOREIGN' && tokensPurchased > foreignCap) {
      return new Response(
        JSON.stringify({ error: `Foreign investors are limited to ${Math.floor(foreignCap)} tokens (40% cap)` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (investorType === 'PHILIPPINE' && tokensPurchased > philippineCap) {
      return new Response(
        JSON.stringify({ error: `Philippine investors are limited to ${Math.floor(philippineCap)} tokens (60% cap)` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Constants for calculation
    const TOKEN_PRICE = 25; // $25 per token
    const PROPERTY_VALUE = 250000; // $250,000 per property
    const TOTAL_PROPERTIES = 62; // 62 properties
    const TOTAL_PROPERTY_VALUE = PROPERTY_VALUE * TOTAL_PROPERTIES;
    
    // Base rates with adjustments
    const baseHighSeasonRate = clamp(350 + adjustments.rateDelta, 250, 500);
    const baseLowSeasonRate = clamp(250 + adjustments.rateDelta, 150, 350);
    const baseHighOccupancy = clamp(0.85 + adjustments.highOccDelta, 0.60, 0.95);
    const baseLowOccupancy = clamp(0.65 + adjustments.lowOccDelta, 0.40, 0.85);
    const baseAmenityRevenue = clamp(150000 + adjustments.amenityDelta, 50000, 300000);

    // Calculate investment metrics
    const investment = tokensPurchased * TOKEN_PRICE;
    const ownershipPct = (tokensPurchased / totalTokens) * 100;
    
    // Stay days calculation (1 day per $1000 invested, minimum 7 days)
    const baseStayDays = Math.max(investment / 1000, 7);
    const userBonusStayDays = ownershipPct > 5 ? baseStayDays * 0.2 : 0; // 20% bonus if >5% ownership
    const totalStayDays = baseStayDays + userBonusStayDays;

    // Revenue calculations
    const highSeasonDays = 120; // 4 months
    const lowSeasonDays = 245; // 8 months
    
    const grossRentalPerProperty = (baseHighSeasonRate * highSeasonDays * baseHighOccupancy) + 
                                   (baseLowSeasonRate * lowSeasonDays * baseLowOccupancy);
    const totalGrossRental = grossRentalPerProperty * TOTAL_PROPERTIES;
    
    // Operating expenses (40% of gross rental)
    const operatingExpenses = totalGrossRental * 0.40;
    const netRentalIncome = totalGrossRental - operatingExpenses;
    
    // Amenity revenue
    const totalGrossAmenities = baseAmenityRevenue;
    const amenityExpenses = totalGrossAmenities * 0.30; // 30% expenses
    const netAmenityIncome = totalGrossAmenities - amenityExpenses;
    
    // Total net income
    const totalNetIncome = netRentalIncome + netAmenityIncome;
    
    // Dividend calculation (30% of net income)
    const dividendPool = totalNetIncome * 0.30;
    const userDividend = dividendPool * (ownershipPct / 100);

    // Equity calculations with token growth
    const currentEquityValue = investment;
    const annualTokenGrowth = 1 + adjustments.tokenGrowthPct;
    const projectedEquityValue = currentEquityValue * Math.pow(annualTokenGrowth, adjustments.exitYears);
    const equityGain = projectedEquityValue - currentEquityValue;
    
    // Calculate cumulative dividends over exit years
    const cumulativeDividends = userDividend * adjustments.exitYears;
    
    // Exit proceeds and total return
    const exitProceeds = projectedEquityValue + cumulativeDividends;
    const returnMultiple = exitProceeds / investment;

    const result = {
      investment,
      ownershipPct: Number(ownershipPct.toFixed(3)),
      baseStayDays: Number(baseStayDays.toFixed(1)),
      userBonusStayDays: userBonusStayDays > 0 ? Number(userBonusStayDays.toFixed(1)) : null,
      totalStayDays: Number(totalStayDays.toFixed(1)),
      annualDividendUSD: Number(userDividend.toFixed(2)),
      currentEquityValue: Number(currentEquityValue.toFixed(2)),
      projectedEquityValue: Number(projectedEquityValue.toFixed(2)),
      equityGain: Number(equityGain.toFixed(2)),
      cumulativeDividends: Number(cumulativeDividends.toFixed(2)),
      exitProceeds: Number(exitProceeds.toFixed(2)),
      returnMultiple: Number(returnMultiple.toFixed(2)),
      breakdown: {
        grossRental: Number(totalGrossRental.toFixed(2)),
        grossAmenities: Number(totalGrossAmenities.toFixed(2)),
        netIncome: Number(totalNetIncome.toFixed(2)),
        dividendPool: Number(dividendPool.toFixed(2))
      },
      caps: {
        foreignCap: Number(foreignCap.toFixed(0)),
        philippineCap: Number(philippineCap.toFixed(0)),
        remainingForeign: Number(foreignCap.toFixed(0)), // Simplified - assuming no tokens sold yet
        remainingPhilippine: Number(philippineCap.toFixed(0)) // Simplified - assuming no tokens sold yet
      }
    };

    console.log('Simulation result:', result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Simulation error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to process simulation' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});