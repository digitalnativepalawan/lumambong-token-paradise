
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModernTable, ModernTableHeader, ModernTableBody, ModernTableRow, ModernTableCell, ModernTableHeadCell } from "@/components/ui/modern-table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { TrendingUp, DollarSign, PieChart as PieChartIcon, Calculator } from "lucide-react";

const FinancialProjections = () => {
  const revenueProjections = [
    { year: "2025", securitySales: 2500000, rentalIncome: 624500, amenities: 50000, total: 3174500, noi: 512090 },
    { year: "2026", securitySales: 0, rentalIncome: 624500, amenities: 50000, total: 674500, noi: 512090 },
    { year: "2027", securitySales: 0, rentalIncome: 650000, amenities: 55000, total: 705000, noi: 577900 },
    { year: "2028", securitySales: 0, rentalIncome: 680000, amenities: 60000, total: 740000, noi: 606800 },
    { year: "2029", securitySales: 0, rentalIncome: 715000, amenities: 65000, total: 780000, noi: 639600 },
    { year: "2030", securitySales: 0, rentalIncome: 750000, amenities: 70000, total: 820000, noi: 672400 },
    { year: "2031", securitySales: 0, rentalIncome: 780000, amenities: 75000, total: 855000, noi: 701100 },
    { year: "2032", securitySales: 0, rentalIncome: 815000, amenities: 80000, total: 895000, noi: 733700 },
    { year: "2033", securitySales: 0, rentalIncome: 850000, amenities: 85000, total: 935000, noi: 766700 },
    { year: "2034", securitySales: 0, rentalIncome: 890000, amenities: 90000, total: 980000, noi: 803600 }
  ];

  const propertyValueProjection = [
    { year: "2025", value: 2500000, tokenValue: 25.00 },
    { year: "2026", value: 2800000, tokenValue: 28.00 },
    { year: "2027", value: 3136000, tokenValue: 31.36 },
    { year: "2028", value: 3512320, tokenValue: 35.12 },
    { year: "2029", value: 3933798, tokenValue: 39.34 },
    { year: "2030", value: 4405854, tokenValue: 44.06 },
    { year: "2031", value: 4934557, tokenValue: 49.35 },
    { year: "2032", value: 5526704, tokenValue: 55.27 },
    { year: "2033", value: 6189908, tokenValue: 61.90 },
    { year: "2034", value: 6932697, tokenValue: 69.33 }
  ];

  const coreAssumptions = {
    totalProjectValue: 2500000,
    totalLots: 10,
    valuePerLot: 250000,
    totalTokens: 100000,
    tokenPrice: 25,
    highSeasonRate: 250,
    lowSeasonRate: 150,
    highSeasonDays: 240,
    lowSeasonDays: 125,
    highSeasonOccupancy: 0.80,
    lowSeasonOccupancy: 0.50,
    annualRentalRevenue: 574500,
    amenityRevenue: 50000,
    operatingCostPercent: 18,
    propertyAppreciation: 0.12
  };

  const operationalCosts = [
    { category: "Property Maintenance", percentage: 6, amount: 37470, notes: "Local contractors, lower rates" },
    { category: "Staff & Operations", percentage: 5, amount: 31225, notes: "3 full-time staff @ $10,000/yr each" },
    { category: "Marketing & Sales", percentage: 3, amount: 18735, notes: "Digital-heavy, local agencies" },
    { category: "Technology", percentage: 1.5, amount: 9368, notes: "Cloud-based, low overhead" },
    { category: "Insurance & Legal", percentage: 1.5, amount: 9368, notes: "Local providers" },
    { category: "Utilities", percentage: 1, amount: 6245, notes: "Solar reduces energy costs" }
  ];

  const totalOperationalCost = 112411;
  const operationalCostPercentage = 18;

  const chartConfig = {
    total: {
      label: "Total Revenue",
      color: "#3B82F6",
    },
    securitySales: {
      label: "Digital Security Sales",
      color: "#10B981",
    },
    rentalIncome: {
      label: "Rental Income",
      color: "#8B5CF6",
    },
    amenities: {
      label: "Amenities",
      color: "#F59E0B",
    },
    value: {
      label: "Digital Security Value",
      color: "#EF4444",
    },
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-bold text-black mb-4">Financial Projections</h2>
        <p className="text-xl text-gray-600 mb-6">
          10-year financial forecast with conservative growth assumptions
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-black">Year 10 Revenue</h4>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">$980K</div>
            <p className="text-gray-600 text-sm">
              Projected annual revenue by 2034
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-black">Property Value</h4>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">$6.9M</div>
            <p className="text-gray-600 text-sm">
              Projected property value by 2034
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                <Calculator className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-semibold text-black">ROI Potential</h4>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">177%</div>
            <p className="text-gray-600 text-sm">
              10-year asset appreciation (12% CAGR)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Core Business Metrics */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Core Business Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">$2.5M</div>
              <div className="text-sm text-gray-600">Initial Token Sale</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">$512K</div>
              <div className="text-sm text-gray-600">Year 1 NOI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">$6.5M</div>
              <div className="text-sm text-gray-600">Total 10-Year NOI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">$7.8M</div>
              <div className="text-sm text-gray-600">Property Value (Y10)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Revenue Chart */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">10-Year Revenue Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueProjections} margin={{ top: 20, right: 30, left: 40, bottom: 80 }}>
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value, name) => [
                      `$${Number(value).toLocaleString()}`,
                      name
                    ]}
                  />} 
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Side by Side Charts */}
      <div className="space-y-8">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-black">Revenue Breakdown (First 5 Years)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueProjections.slice(0, 5)} margin={{ top: 20, right: 30, left: 40, bottom: 80 }}>
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent 
                      formatter={(value, name) => [
                        `$${Number(value).toLocaleString()}`,
                        name
                      ]}
                    />} 
                  />
                  <Bar dataKey="securitySales" stackId="a" fill="#10B981" name="Digital Security Sales" />
                  <Bar dataKey="rentalIncome" stackId="a" fill="#8B5CF6" name="Rental Income" />
                  <Bar dataKey="amenities" stackId="a" fill="#F59E0B" name="Amenities" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-black">Digital Security Value Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={propertyValueProjection} margin={{ top: 20, right: 30, left: 40, bottom: 80 }}>
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 11 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent 
                      formatter={(value, name) => [
                        `$${Number(value)}`,
                        name
                      ]}
                    />} 
                  />
                  <Line
                    type="monotone"
                    dataKey="tokenValue"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                    name="Digital Security Value"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Operational Cost Structure */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Revised Operational Cost Structure ({operationalCostPercentage}% of Revenue)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6">
            Annual operational costs are projected to be approximately {operationalCostPercentage}% of gross revenue, 
            ensuring healthy profit margins while maintaining high service standards.
          </p>
          
          <div className="overflow-x-auto">
            <ModernTable>
              <ModernTableHeader>
                <ModernTableRow>
                  <ModernTableHeadCell>Category</ModernTableHeadCell>
                  <ModernTableHeadCell align="center">% of Revenue</ModernTableHeadCell>
                  <ModernTableHeadCell align="right">Annual Cost (Year 1)</ModernTableHeadCell>
                  <ModernTableHeadCell>Notes</ModernTableHeadCell>
                </ModernTableRow>
              </ModernTableHeader>
              <ModernTableBody>
                {operationalCosts.map((cost, index) => (
                  <ModernTableRow key={index}>
                    <ModernTableCell className="font-semibold whitespace-nowrap">{cost.category}</ModernTableCell>
                    <ModernTableCell align="center" className="font-medium whitespace-nowrap">{cost.percentage}%</ModernTableCell>
                    <ModernTableCell align="right" className="text-blue-600 font-bold whitespace-nowrap">
                      ${cost.amount.toLocaleString()}
                    </ModernTableCell>
                    <ModernTableCell className="text-gray-600">{cost.notes}</ModernTableCell>
                  </ModernTableRow>
                ))}
                <ModernTableRow className="bg-gray-50 border-t-2 border-gray-200">
                  <ModernTableCell className="font-bold text-black whitespace-nowrap">Total</ModernTableCell>
                  <ModernTableCell align="center" className="font-bold text-black whitespace-nowrap">{operationalCostPercentage}%</ModernTableCell>
                  <ModernTableCell align="right" className="font-bold text-blue-700 text-lg whitespace-nowrap">
                    ${totalOperationalCost.toLocaleString()}
                  </ModernTableCell>
                  <ModernTableCell className="text-gray-600 font-medium">vs. $90,000 originally</ModernTableCell>
                </ModernTableRow>
              </ModernTableBody>
            </ModernTable>
          </div>
        </CardContent>
      </Card>

      {/* Key Financial Assumptions */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Key Financial Assumptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-black mb-3">Revenue Assumptions</h5>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  High season rate: $250/night (240 days, 80% occupancy)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  Low season rate: $150/night (125 days, 50% occupancy)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  Annual rental revenue: $574,500 (10 lots)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  Property appreciation: 12% annually
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-black mb-3">Cost Assumptions</h5>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  Operational costs: {operationalCostPercentage}% of revenue
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  Annual cost inflation: 3%
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  Maintenance reserve: 5% of revenue
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  Technology upgrades: 2% of revenue
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialProjections;
