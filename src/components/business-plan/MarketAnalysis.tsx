
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Globe, Users, Target } from "lucide-react";

const MarketAnalysis = () => {
  const marketData = [
    { label: "Global Real Estate Tokenization Market", value: "$2.7B", growth: "+18.2% CAGR" },
    { label: "Philippines Tourism Revenue (2023)", value: "$8.2B", growth: "+25% YoY" },
    { label: "Palawan Tourist Arrivals (2023)", value: "1.8M", growth: "+35% YoY" },
    { label: "Average Beach Resort ROI", value: "12-18%", growth: "Annually" }
  ];

  const targetSegments = [
    {
      title: "Filipino Diaspora",
      description: "Overseas Filipino Workers seeking home country investments",
      size: "10.2M globally",
      potential: "High"
    },
    {
      title: "Crypto Investors",
      description: "Digital asset holders looking for real-world utility",
      size: "420M globally",
      potential: "Medium-High"
    },
    {
      title: "Eco-Tourism Enthusiasts",
      description: "Sustainable travel and investment advocates",
      size: "Growing segment",
      potential: "High"
    },
    {
      title: "Real Estate Investors",
      description: "Traditional investors seeking portfolio diversification",
      size: "Established market",
      potential: "Medium"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-black mb-4">Market Analysis</h2>
        <p className="text-xl text-gray-600 mb-6">
          Understanding the intersection of real estate tokenization, eco-tourism, and the Philippine market
        </p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Market Opportunity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            The convergence of blockchain technology, real estate investment, and sustainable tourism creates 
            a unique market opportunity. The global real estate tokenization market is experiencing rapid 
            growth, while the Philippines continues to see strong tourism recovery and growth, particularly 
            in eco-tourism destinations like Palawan.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {marketData.map((data, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="text-2xl font-bold text-black mb-1">{data.value}</div>
                <div className="text-sm text-gray-600 mb-2">{data.label}</div>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                  {data.growth}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black flex items-center gap-3">
            <Target className="w-6 h-6 text-purple-600" />
            Target Market Segments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {targetSegments.map((segment, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-black">{segment.title}</h4>
                  <Badge variant={segment.potential === "High" ? "default" : "secondary"}>
                    {segment.potential} Potential
                  </Badge>
                </div>
                <p className="text-gray-600 mb-3">{segment.description}</p>
                <div className="text-sm text-gray-500">Market Size: {segment.size}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black flex items-center gap-3">
            <Globe className="w-6 h-6 text-green-600" />
            Competitive Advantages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-6">
              <h4 className="font-semibold text-black mb-2">First-Mover Advantage</h4>
              <p className="text-gray-600">Pioneer in tokenized beachfront real estate in the Philippines</p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h4 className="font-semibold text-black mb-2">Regulatory Compliance</h4>
              <p className="text-gray-600">Full SEC registration and environmental compliance established</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h4 className="font-semibold text-black mb-2">Sustainable Model</h4>
              <p className="text-gray-600">Eco-friendly development aligned with conservation goals</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-6">
              <h4 className="font-semibold text-black mb-2">Community Focus</h4>
              <p className="text-gray-600">Local partnership and community benefit integration</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalysis;
