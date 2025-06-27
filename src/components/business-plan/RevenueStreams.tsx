import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { DollarSign, TrendingUp, Users, Zap } from "lucide-react";

const RevenueStreams = () => {
  const revenueData = [
    { name: "Security Sales", value: 40, color: "#3B82F6", description: "Initial and secondary security offerings" },
    { name: "Rental Income", value: 35, color: "#10B981", description: "Short-term and long-term property rentals" },
    { name: "Amenity Services", value: 15, color: "#8B5CF6", description: "Resort services and experiences" },
    { name: "Enhanced Utility", value: 10, color: "#F59E0B", description: "Premium features and governance premiums" }
  ];

  const projectedGrowth = [
    { year: "Year 1", revenue: 500000, securityValue: 25 },
    { year: "Year 2", revenue: 850000, securityValue: 32 },
    { year: "Year 3", revenue: 1200000, securityValue: 42 },
    { year: "Year 4", revenue: 1650000, securityValue: 55 },
    { year: "Year 5", revenue: 2100000, securityValue: 70 }
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#3B82F6",
    },
    securityValue: {
      label: "Security Value",
      color: "#10B981",
    },
  };

  return (
    <div className="space-y-6 md:space-y-8 px-2 md:px-0">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-black mb-2 md:mb-4">Revenue Streams</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-4 md:mb-6">
          Diversified income sources creating sustainable returns for security holders
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <Card className="border-gray-200">
          <CardHeader className="pb-2 md:pb-6">
            <CardTitle className="text-xl md:text-2xl text-black">Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent className="px-2 md:px-6">
            <div className="w-full h-64 md:h-80 flex items-center justify-center">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
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
            </div>
            
            <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
              {revenueData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3">
                  <div 
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-black text-sm md:text-base truncate">{item.name}</span>
                      <span className="text-gray-600 text-sm md:text-base flex-shrink-0">{item.value}%</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 truncate">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-2 md:pb-6">
            <CardTitle className="text-xl md:text-2xl text-black">5-Year Growth Projection</CardTitle>
          </CardHeader>
          <CardContent className="px-2 md:px-6">
            <div className="w-full h-64 md:h-80">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectedGrowth} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                    <XAxis 
                      dataKey="year" 
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value / 1000}K`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="mt-4 md:mt-6 grid grid-cols-2 gap-2 md:gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 text-center">
                <div className="text-lg md:text-2xl font-bold text-blue-600">$2.1M</div>
                <div className="text-xs md:text-sm text-blue-700">Year 5 Revenue Target</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4 text-center">
                <div className="text-lg md:text-2xl font-bold text-green-600">$70</div>
                <div className="text-xs md:text-sm text-green-700">Year 5 Security Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 flex-shrink-0">
                <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-black text-sm md:text-base">Security Sales</h4>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">
              Primary and secondary market security transactions
            </p>
            <div className="text-xl md:text-2xl font-bold text-blue-600">40%</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="p-2 rounded-lg bg-green-50 border border-green-200 flex-shrink-0">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-black text-sm md:text-base">Rental Income</h4>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">
              Short-term vacation rentals and long-term stays
            </p>
            <div className="text-xl md:text-2xl font-bold text-green-600">35%</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 flex-shrink-0">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              </div>
              <h4 className="font-semibold text-black text-sm md:text-base">Amenity Services</h4>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">
              Resort services, tours, and experiences
            </p>
            <div className="text-xl md:text-2xl font-bold text-purple-600">15%</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="p-2 rounded-lg bg-orange-50 border border-orange-200 flex-shrink-0">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
              </div>
              <h4 className="font-semibold text-black text-sm md:text-base">Enhanced Utility</h4>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">
              Premium features and governance benefits
            </p>
            <div className="text-xl md:text-2xl font-bold text-orange-600">10%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200">
        <CardHeader className="pb-2 md:pb-6">
          <CardTitle className="text-xl md:text-2xl text-black">Revenue Distribution Model</CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6 space-y-4 md:space-y-6">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Revenue distribution follows a transparent, automated model that ensures fair returns 
            to all stakeholders while maintaining operational sustainability and growth funding.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="border border-gray-200 rounded-xl p-4 md:p-6">
              <h4 className="text-base md:text-lg font-semibold text-black mb-2 md:mb-3">Security Holders</h4>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">60%</div>
              <p className="text-gray-600 text-xs md:text-sm">
                Proportional revenue sharing based on security holdings
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-4 md:p-6">
              <h4 className="text-base md:text-lg font-semibold text-black mb-2 md:mb-3">Operations</h4>
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">25%</div>
              <p className="text-gray-600 text-xs md:text-sm">
                Property maintenance, management, and operational costs
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-4 md:p-6">
              <h4 className="text-base md:text-lg font-semibold text-black mb-2 md:mb-3">Development</h4>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1 md:mb-2">15%</div>
              <p className="text-gray-600 text-xs md:text-sm">
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
