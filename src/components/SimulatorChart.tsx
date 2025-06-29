
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

interface SimulatorChartProps {
  nationality: 'filipino' | 'foreign';
  currency: 'USD' | 'PHP';
  formatCurrency: (amount: number) => string;
}

const SimulatorChart = ({ nationality, currency, formatCurrency }: SimulatorChartProps) => {
  // Configurable parameters
  const FILIPINO_ALLOCATION = 0.6;
  const FOREIGN_ALLOCATION = 0.4;
  const TOKENS_PER_LOT = 100000;
  const TOKEN_PRICE = 25; // USD
  const TOTAL_STAYS_PER_LOT = 365; // days per year
  const PROJECTED_ANNUAL_RENT = 125000; // USD per lot
  const USD_TO_PHP = 56;

  const generateChartData = () => {
    const data = [];
    for (let tokens = 1000; tokens <= 50000; tokens += 2500) {
      const ownershipPercentage = (tokens / TOKENS_PER_LOT) * 100;
      const investmentAmount = tokens * TOKEN_PRICE;
      
      const staysAllocation = nationality === 'filipino' 
        ? (tokens / TOKENS_PER_LOT) * TOTAL_STAYS_PER_LOT * FILIPINO_ALLOCATION
        : (tokens / TOKENS_PER_LOT) * TOTAL_STAYS_PER_LOT * FOREIGN_ALLOCATION;
        
      const annualDividend = (tokens / TOKENS_PER_LOT) * PROJECTED_ANNUAL_RENT * 0.3;
      
      const dividendAmount = currency === 'PHP' ? annualDividend * USD_TO_PHP : annualDividend;
      const investmentAmountDisplay = currency === 'PHP' ? investmentAmount * USD_TO_PHP : investmentAmount;

      data.push({
        tokens,
        ownership: ownershipPercentage,
        investment: investmentAmountDisplay,
        stays: Math.round(staysAllocation),
        dividend: dividendAmount,
        dividendFormatted: formatCurrency(annualDividend),
        investmentFormatted: formatCurrency(investmentAmount)
      });
    }
    return data;
  };

  const chartData = generateChartData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg max-w-xs">
          <p className="font-medium text-sm mb-2">{`${label.toLocaleString()} Digital Securities`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name === 'Investment' || entry.name === 'Dividend' 
                ? (currency === 'USD' ? `$${entry.value.toLocaleString()}` : `₱${entry.value.toLocaleString()}`)
                : entry.name === 'Ownership' 
                  ? `${entry.value.toFixed(2)}%`
                  : `${entry.value} days`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <div className="p-4 md:p-6">
        <div className="text-center mb-4 md:mb-6">
          <h4 className="text-xl md:text-2xl font-bold mb-2">Investment Visualization</h4>
          <p className="text-sm md:text-base text-gray-600">
            Interactive charts showing your investment growth for {nationality === 'filipino' ? 'Filipino' : 'Foreign'} investors
          </p>
        </div>

        <Tabs defaultValue="returns" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="returns" className="py-3 text-sm">Returns Analysis</TabsTrigger>
            <TabsTrigger value="benefits" className="py-3 text-sm">Benefits Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="returns" className="space-y-4 md:space-y-6">
            <div className="h-64 md:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="tokens" 
                    tickFormatter={(value) => `${(value/1000)}K`}
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tickFormatter={(value) => currency === 'USD' ? `$${(value/1000)}K` : `₱${(value/1000)}K`}
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right"
                    tickFormatter={(value) => currency === 'USD' ? `$${value}` : `₱${value}`}
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="investment" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Investment"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="dividend" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Dividend"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4 md:space-y-6">
            <div className="h-64 md:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.filter((_, index) => index % 3 === 0)} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="tokens" 
                    tickFormatter={(value) => `${(value/1000)}K`}
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right"
                    tickFormatter={(value) => `${value.toFixed(1)}%`}
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    yAxisId="left"
                    dataKey="stays" 
                    fill="#8b5cf6" 
                    name="Annual Stays"
                    radius={[2, 2, 0, 0]}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="ownership" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Ownership"
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="font-medium text-blue-800 mb-1">Investment Scale</div>
            <div className="text-blue-700 text-xs md:text-sm">Higher Digital Securities = Greater ownership stake</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="font-medium text-green-800 mb-1">Dividend Growth</div>
            <div className="text-green-700 text-xs md:text-sm">30% of rental income distributed proportionally</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="font-medium text-purple-800 mb-1">Stay Allocation</div>
            <div className="text-purple-700 text-xs md:text-sm">{nationality === 'filipino' ? '60%' : '40%'} pool allocation applied</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimulatorChart;
