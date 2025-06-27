
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Vote, Home, Shield } from "lucide-react";

const BusinessModel = () => {
  const securityBenefits = [
    {
      icon: Home,
      title: "Property Ownership",
      description: "Fractional ownership of beachfront real estate with proportional value appreciation"
    },
    {
      icon: Vote,
      title: "Governance Rights",
      description: "Democratic participation in resort development and operational decisions"
    },
    {
      icon: Coins,
      title: "Revenue Sharing",
      description: "Proportional distribution of rental income and resort profits"
    },
    {
      icon: Shield,
      title: "Timeshare Access",
      description: "Annual usage rights based on security holdings for personal stays"
    }
  ];

  const ownershipStructure = [
    { category: "Filipino Ownership", percentage: 60, color: "bg-blue-500", description: "Compliant with Philippine foreign ownership laws" },
    { category: "Foreign Ownership", percentage: 40, color: "bg-green-500", description: "International investor allocation" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-black mb-4">Business Model</h2>
        <p className="text-xl text-gray-600 mb-6">
          Digital securities ownership structure creating sustainable value for all stakeholders
        </p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Digital Securities Framework</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            The BBT (Binga Beach Digital Security) represents fractional ownership in premium beachfront property. 
            Each security provides holders with four core benefits: property ownership rights, governance 
            participation, revenue sharing, and timeshare access. This model democratizes access to 
            high-value real estate while maintaining regulatory compliance.
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-gray-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-black mb-4">Security Economics</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$25</div>
                <div className="text-sm text-gray-600">Initial Security Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100,000</div>
                <div className="text-sm text-gray-600">Total Security Supply</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10</div>
                <div className="text-sm text-gray-600">Property Units</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {securityBenefits.map((benefit, index) => (
          <Card key={index} className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <benefit.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black mb-2">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Ownership Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Our ownership structure complies with Philippine foreign ownership laws while maximizing 
            international investment opportunities. This balanced approach ensures legal compliance 
            and sustainable growth.
          </p>

          <div className="space-y-4">
            {ownershipStructure.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-black">{item.category}</span>
                  <Badge className="bg-gray-100 text-gray-700">{item.percentage}%</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Governance Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Security holders participate in democratic governance through on-chain voting mechanisms. 
            Key decisions including property improvements, rental strategies, and development 
            priorities are decided collectively by the community.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">Voting Rights</h5>
              <p className="text-blue-700 text-sm">Proportional to security holdings with minimum participation thresholds</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h5 className="font-semibold text-green-800 mb-2">Decision Types</h5>
              <p className="text-green-700 text-sm">Property management, development planning, revenue distribution</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessModel;
