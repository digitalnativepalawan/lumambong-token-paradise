
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { DollarSign, TrendingUp, Users, Zap } from "lucide-react";

const RevenueStreams = () => {
  const revenueData = [
    { name: "Token Sales", value: 40, color: "#3B82F6", description: "Initial and secondary token offerings" },
    { name: "Rental Income", value: 35, color: "#10B981", description: "Short-term and long-term property rentals" },
    { name: "Amenity Services", value: 15, color: "#8B5CF6", description: "Resort services and experiences" },
    { name: "Enhanced Utility", value: 10, color: "#F59E0B", description: "Premium features and governance premiums" }
  ];

  const projectedGrowth = [
    { year: "Year 1", revenue: 500000, tokenValue: 25 },
    { year: "Year 2", revenue: 850000, tokenValue: 32 },
    { year: "Year 3", revenue: 1200000, tokenValue: 42 },
    { year: "Year 4", revenue: 1650000, tokenValue: 55 },
    { year: "Year 5", revenue: 2100000, tokenValue: 70 }
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#3B82F6",
    },
    tokenValue: {
      label: "Token Value",
      color: "#10B981",
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-black mb-4">Revenue Streams</h2>
        <p className="text-xl text-gray-600 mb-6">
          Diversified income sources creating sustainable returns for token holders
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-black">Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            <div className="mt-6 space-y-3">
              {revenueData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-black">{item.name}</span>
                      <span className="text-gray-600">{item.value}%</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-black">5-Year Growth Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectedGrowth}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">$2.1M</div>
                <div className="text-sm text-blue-700">Year 5 Revenue Target</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">$70</div>
                <div className="text-sm text-green-700">Year 5 Token Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-black">Token Sales</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Primary and secondary market token transactions
            </p>
            <div className="text-2xl font-bold text-blue-600">40%</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-black">Rental Income</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Short-term vacation rentals and long-term stays
            </p>
            <div className="text-2xl font-bold text-green-600">35%</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-semibold text-black">Amenity Services</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Resort services, tours, and experiences
            </p>
            <div className="text-2xl font-bold text-purple-600">15%</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="font-semibold text-black">Enhanced Utility</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Premium features and governance benefits
            </p>
            <div className="text-2xl font-bold text-orange-600">10%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Revenue Distribution Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Revenue distribution follows a transparent, automated model that ensures fair returns 
            to all stakeholders while maintaining operational sustainability and growth funding.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-black mb-3">Token Holders</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
              <p className="text-gray-600 text-sm">
                Proportional revenue sharing based on token holdings
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-black mb-3">Operations</h4>
              <div className="text-3xl font-bold text-green-600 mb-2">25%</div>
              <p className="text-gray-600 text-sm">
                Property maintenance, management, and operational costs
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-black mb-3">Development</h4>
              <div className="text-3xl font-bold text-purple-600 mb-2">15%</div>
              <p className="text-gray-600 text-sm">
                Future expansion, technology upgrades, and improvements
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueStreams;
