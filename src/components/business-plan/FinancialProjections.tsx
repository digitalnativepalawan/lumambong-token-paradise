
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModernTable, ModernTableHeader, ModernTableBody, ModernTableRow, ModernTableCell, ModernTableHeadCell } from "@/components/ui/modern-table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { TrendingUp, DollarSign, PieChart as PieChartIcon, Calculator } from "lucide-react";

const FinancialProjections = () => {
  const revenueProjections = [
    { year: "2025", securitySales: 500000, rentalIncome: 200000, amenities: 50000, total: 750000 },
    { year: "2026", securitySales: 300000, rentalIncome: 450000, amenities: 100000, total: 850000 },
    { year: "2027", securitySales: 200000, rentalIncome: 800000, amenities: 200000, total: 1200000 },
    { year: "2028", securitySales: 150000, rentalIncome: 1200000, amenities: 300000, total: 1650000 },
    { year: "2029", securitySales: 100000, rentalIncome: 1600000, amenities: 400000, total: 2100000 },
    { year: "2030", securitySales: 100000, rentalIncome: 2000000, amenities: 500000, total: 2600000 },
    { year: "2031", securitySales: 100000, rentalIncome: 2400000, amenities: 600000, total: 3100000 },
    { year: "2032", securitySales: 100000, rentalIncome: 2800000, amenities: 700000, total: 3600000 },
    { year: "2033", securitySales: 100000, rentalIncome: 3200000, amenities: 800000, total: 4100000 },
    { year: "2034", securitySales: 100000, rentalIncome: 3600000, amenities: 900000, total: 4600000 }
  ];

  const securityValueProjection = [
    { year: "2025", value: 25, holders: 1000 },
    { year: "2026", value: 32, holders: 1200 },
    { year: "2027", value: 42, holders: 1400 },
    { year: "2028", value: 55, holders: 1600 },
    { year: "2029", value: 70, holders: 1800 },
    { year: "2030", value: 88, holders: 2000 },
    { year: "2031", value: 108, holders: 2200 },
    { year: "2032", value: 130, holders: 2400 },
    { year: "2033", value: 155, holders: 2600 },
    { year: "2034", value: 182, holders: 2800 }
  ];

  const operationalCosts = [
    { category: "Property Maintenance", percentage: 6, amount: 18192, notes: "Local contractors, lower rates" },
    { category: "Staff & Operations", percentage: 5, amount: 15160, notes: "3 full-time staff @ $5,000/yr" },
    { category: "Marketing & Sales", percentage: 3, amount: 9096, notes: "Digital-heavy, local agencies" },
    { category: "Technology", percentage: 1.5, amount: 4548, notes: "Cloud-based, low overhead" },
    { category: "Insurance & Legal", percentage: 1.5, amount: 4548, notes: "Local providers" },
    { category: "Utilities", percentage: 1, amount: 3032, notes: "Solar reduces energy costs" }
  ];

  const totalOperationalCost = 54576;
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
            <div className="text-3xl font-bold text-blue-600 mb-2">$4.6M</div>
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
              <h4 className="font-semibold text-black">Digital Security Value</h4>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">$182</div>
            <p className="text-gray-600 text-sm">
              Projected digital security value by 2034
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
            <div className="text-3xl font-bold text-purple-600 mb-2">628%</div>
            <p className="text-gray-600 text-sm">
              10-year total return potential
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Projections Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">10-Year Revenue Projection (USD)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <ModernTable>
              <ModernTableHeader>
                <ModernTableRow>
                  <ModernTableHeadCell>Year</ModernTableHeadCell>
                  <ModernTableHeadCell align="right">Digital Security Sales</ModernTableHeadCell>
                  <ModernTableHeadCell align="right">Rental Income</ModernTableHeadCell>
                  <ModernTableHeadCell align="right">Amenities</ModernTableHeadCell>
                  <ModernTableHeadCell align="right">Total Revenue</ModernTableHeadCell>
                </ModernTableRow>
              </ModernTableHeader>
              <ModernTableBody>
                {revenueProjections.map((projection) => (
                  <ModernTableRow key={projection.year}>
                    <ModernTableCell className="font-semibold whitespace-nowrap">{projection.year}</ModernTableCell>
                    <ModernTableCell align="right" className="text-green-600 font-medium whitespace-nowrap">
                      ${projection.securitySales.toLocaleString()}
                    </ModernTableCell>
                    <ModernTableCell align="right" className="text-purple-600 font-medium whitespace-nowrap">
                      ${projection.rentalIncome.toLocaleString()}
                    </ModernTableCell>
                    <ModernTableCell align="right" className="text-orange-600 font-medium whitespace-nowrap">
                      ${projection.amenities.toLocaleString()}
                    </ModernTableCell>
                    <ModernTableCell align="right" className="text-blue-600 font-bold whitespace-nowrap">
                      ${projection.total.toLocaleString()}
                    </ModernTableCell>
                  </ModernTableRow>
                ))}
              </ModernTableBody>
            </ModernTable>
          </div>
        </CardContent>
      </Card>

      {/* Digital Security Value Growth Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Digital Security Value Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <ModernTable>
              <ModernTableHeader>
                <ModernTableRow>
                  <ModernTableHeadCell>Year</ModernTableHeadCell>
                  <ModernTableHeadCell align="right">Digital Security Value (USD)</ModernTableHeadCell>
                  <ModernTableHeadCell align="right">Digital Security Holders</ModernTableHeadCell>
                </ModernTableRow>
              </ModernTableHeader>
              <ModernTableBody>
                {securityValueProjection.map((projection) => (
                  <ModernTableRow key={projection.year}>
                    <ModernTableCell className="font-semibold whitespace-nowrap">{projection.year}</ModernTableCell>
                    <ModernTableCell align="right" className="text-red-600 font-bold whitespace-nowrap">
                      ${projection.value}
                    </ModernTableCell>
                    <ModernTableCell align="right" className="text-gray-700 font-medium whitespace-nowrap">
                      {projection.holders.toLocaleString()}
                    </ModernTableCell>
                  </ModernTableRow>
                ))}
              </ModernTableBody>
            </ModernTable>
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
                <LineChart data={securityValueProjection} margin={{ top: 20, right: 30, left: 40, bottom: 80 }}>
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
                    dataKey="value"
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
                  Average nightly rate: $150-200
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  Occupancy rate: 65-80%
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  Annual rate increase: 5%
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  Digital security appreciation: 15-20% annually
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
