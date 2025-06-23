
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, TrendingDown, Zap } from "lucide-react";

const RiskAssessment = () => {
  const risks = [
    {
      category: "Market Risk",
      level: "Medium",
      color: "yellow",
      icon: TrendingDown,
      description: "Cryptocurrency market volatility and real estate market fluctuations",
      mitigation: [
        "Diversified revenue streams beyond token appreciation",
        "Real asset backing provides intrinsic value",
        "Focus on utility and governance value, not speculation",
        "Conservative growth projections and scenario planning"
      ]
    },
    {
      category: "Execution Risk",
      level: "Medium-Low",
      color: "blue",
      icon: Zap,
      description: "Project development, construction, and operational challenges",
      mitigation: [
        "Experienced team with proven track record",
        "Phased development approach reducing complexity",
        "Local partnerships and established supplier relationships",
        "Contingency planning and buffer funding allocation"
      ]
    },
    {
      category: "Liquidity Risk",
      level: "Medium",
      color: "orange",
      icon: AlertTriangle,
      description: "Limited secondary market for tokens and property illiquidity",
      mitigation: [
        "Built-in buyback mechanisms for token holders",
        "Partnership development for secondary market creation",
        "Annual dividend payments providing regular liquidity",
        "Timeshare benefits providing non-monetary value"
      ]
    },
    {
      category: "Regulatory Risk",
      level: "Low",
      color: "green",
      icon: Shield,
      description: "Changes in cryptocurrency or real estate regulations",
      mitigation: [
        "Full SEC registration and legal compliance established",
        "Continuous monitoring of regulatory developments",
        "Legal advisory team for ongoing compliance",
        "Asset-backed tokens providing regulatory clarity"
      ]
    }
  ];

  const mitigationStrategies = [
    {
      title: "Insurance Coverage",
      description: "Comprehensive property and liability insurance protecting against natural disasters and operational risks"
    },
    {
      title: "Legal Structure",
      description: "SEC-registered corporation with clear governance framework and regulatory compliance"
    },
    {
      title: "Financial Reserves",
      description: "Dedicated contingency fund for unexpected costs and market downturns"
    },
    {
      title: "Environmental Protection",
      description: "Sustainable development practices aligned with environmental regulations and conservation goals"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low": return "bg-green-100 text-green-700 border-green-200";
      case "medium-low": return "bg-blue-100 text-blue-700 border-blue-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "high": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-black mb-4">Risk Assessment</h2>
        <p className="text-xl text-gray-600 mb-6">
          Comprehensive risk analysis and mitigation strategies for sustainable growth
        </p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Risk Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            While all investments carry inherent risks, our comprehensive risk management approach 
            focuses on transparency, mitigation strategies, and sustainable practices to protect 
            investor interests and ensure long-term project success.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">Overall Risk Profile</h4>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Low</div>
                <div className="text-sm text-gray-600">Regulatory Risk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Med-Low</div>
                <div className="text-sm text-gray-600">Execution Risk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">Medium</div>
                <div className="text-sm text-gray-600">Market Risk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">Medium</div>
                <div className="text-sm text-gray-600">Liquidity Risk</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {risks.map((risk, index) => (
          <Card key={index} className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-black flex items-center gap-3">
                  <risk.icon className="w-6 h-6 text-gray-600" />
                  {risk.category}
                </CardTitle>
                <Badge className={getLevelColor(risk.level)}>
                  {risk.level} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{risk.description}</p>
              
              <div>
                <h5 className="font-semibold text-black mb-3">Mitigation Strategies:</h5>
                <div className="grid md:grid-cols-2 gap-3">
                  {risk.mitigation.map((strategy, strategyIndex) => (
                    <div key={strategyIndex} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{strategy}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Additional Protection Measures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {mitigationStrategies.map((strategy, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-black mb-3">{strategy.title}</h4>
                <p className="text-gray-600">{strategy.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Risk Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            We maintain continuous risk monitoring through regular assessments, stakeholder 
            feedback, and adaptive management strategies. Our governance model allows for 
            democratic decision-making in response to emerging risks or opportunities.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-black mb-2">Quarterly Reviews</h5>
              <p className="text-gray-600 text-sm">Regular risk assessment and strategy updates</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-black mb-2">Community Input</h5>
              <p className="text-gray-600 text-sm">Token holder feedback and governance participation</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-black mb-2">Expert Advisory</h5>
              <p className="text-gray-600 text-sm">Professional consultation on emerging risks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessment;
