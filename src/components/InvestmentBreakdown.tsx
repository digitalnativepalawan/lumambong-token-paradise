
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Shield, Coins, Globe } from "lucide-react";

const InvestmentBreakdown = () => {
  const costBreakdown = [
    {
      item: "Land Share (Titled Lot)",
      cost: 55000,
      description: "Your private ~528 sqm slice of Lumambong Beach paradise"
    },
    {
      item: "Premium Modular Home + 10kVA Solar",
      cost: 125000,
      description: "Fully equipped, off-grid ready GLAMNI-inspired unit"
    },
    {
      item: "Development & Essential Costs",
      cost: 50000,
      description: "All-inclusive: permits, transportation, landscaping, legal"
    }
  ];

  const investmentFeatures = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Land Appreciation",
      description: "Prime Palawan beachfront is a scarce and appreciating asset"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Regulatory Compliance",
      description: "60/40 Filipino-foreign ownership structure for confidence"
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Tokenized Advantage",
      description: "Transparent, accessible ownership with future liquidity potential"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Rental Potential",
      description: "High demand for unique, sustainable Palawan properties"
    }
  ];

  const total = costBreakdown.reduce((sum, item) => sum + item.cost, 0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">Investment Opportunity</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Complete & Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your path to ownership with no hidden fees. Every cost clearly outlined 
            for complete peace of mind.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Cost Breakdown */}
          <div>
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
                <CardTitle className="text-2xl">Investment Breakdown</CardTitle>
                <p className="text-emerald-100">Per unit - Fully turnkey ownership</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {costBreakdown.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{item.item}</h3>
                        <span className="text-xl font-bold text-gray-900">
                          ${item.cost.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <div className="mt-3">
                        <Progress 
                          value={(item.cost / total) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-6 border-t-2 border-emerald-500">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-900">Total Investment</h3>
                      <span className="text-3xl font-bold text-emerald-600">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">USD per unit</p>
                  </div>
                </div>

                <Button className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-lg py-6">
                  Secure Your Investment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Investment Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Why Luxe Lumambong is the Ultimate Investment
            </h3>
            
            {investmentFeatures.map((feature, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Ownership Structure */}
            <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-emerald-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Compliant Ownership Model</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Filipino Ownership</span>
                    <span className="font-semibold text-emerald-600">60%</span>
                  </div>
                  <Progress value={60} className="h-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">International Ownership</span>
                    <span className="font-semibold text-blue-600">40%</span>
                  </div>
                  <Progress value={40} className="h-3" />
                  <p className="text-sm text-gray-600 mt-4">
                    Designed for compliance and community benefit while ensuring 
                    international investor participation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentBreakdown;
