
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Coins, 
  Calendar, 
  Vote, 
  TrendingUp, 
  Shield, 
  Users,
  ArrowRight,
  Zap,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TokenUtility = () => {
  const navigate = useNavigate();

  const utilities = [
    {
      icon: Shield,
      title: "Ownership Rights",
      description: "Direct fractional ownership of premium beachfront property with legal title protection",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: ["Legal ownership documents", "Property appreciation", "Asset backing"]
    },
    {
      icon: Calendar,
      title: "Timeshare Benefits", 
      description: "Proportional annual usage rights with flexible booking and rental options",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: ["~36 nights per 10% ownership", "Flexible booking system", "Rent unused nights"]
    },
    {
      icon: Vote,
      title: "Governance Power",
      description: "On-chain voting rights for property decisions and community proposals",
      color: "text-green-600",
      bgColor: "bg-green-50",
      features: ["Property management votes", "Budget approvals", "Development decisions"]
    },
    {
      icon: TrendingUp,
      title: "Revenue Share",
      description: "Automatic dividend distribution from resort operations and rental income",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      features: ["30% revenue distribution", "Monthly payouts", "Compound growth"]
    }
  ];

  const tokenomics = [
    { label: "Circulating Supply", value: "65,000 BBT", percentage: 65, color: "bg-blue-500" },
    { label: "Development Reserve", value: "25,000 BBT", percentage: 25, color: "bg-green-500" },
    { label: "Liquidity Pool", value: "10,000 BBT", percentage: 10, color: "bg-purple-500" }
  ];

  const roadmapItems = [
    { phase: "Q1 2025", title: "Token Launch", status: "completed" },
    { phase: "Q2 2025", title: "Development Start", status: "active" },
    { phase: "Q3 2025", title: "Resort Opening", status: "upcoming" },
    { phase: "Q4 2025", title: "Full Operations", status: "upcoming" }
  ];

  return (
    <section id="utility" className="section-container">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 text-sm">
            Token Utility
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">
            BBT Token
            <br />
            <span className="text-blue-600">Ecosystem</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            More than just ownership - BBT tokens unlock a comprehensive ecosystem of 
            benefits, rights, and opportunities in the Binga Beach community.
          </p>
        </div>

        {/* Utility grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {utilities.map((utility, index) => (
            <div 
              key={index}
              className="utility-card group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl ${utility.bgColor} group-hover:scale-110 transition-transform`}>
                  <utility.icon className={`w-8 h-8 ${utility.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-gray-700 transition-colors">
                    {utility.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {utility.description}
                  </p>
                  <div className="space-y-2">
                    {utility.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Star className={`w-4 h-4 ${utility.color}`} />
                        <span className="text-sm text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tokenomics section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Token distribution */}
          <div className="utility-card">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-purple-50">
                <Coins className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-black">Token Distribution</h3>
            </div>
            <div className="space-y-6">
              {tokenomics.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="text-black font-semibold">{item.value}</span>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className="h-3"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="utility-card">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-green-50">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-black">Development Roadmap</h3>
            </div>
            <div className="space-y-4">
              {roadmapItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'active' ? 'bg-blue-500 animate-pulse' :
                    'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-semibold text-black">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.phase}</div>
                  </div>
                  <Badge className={`text-xs ${
                    item.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
                    item.status === 'active' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                    'bg-gray-100 text-gray-600 border-gray-200'
                  }`}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center utility-card">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-black">
              Ready to Join the Future of Real Estate?
            </h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Start your investment journey with BBT tokens and unlock exclusive access 
              to premium beachfront property in paradise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/auth')}
                className="modern-button px-8 py-4 text-lg h-auto rounded-xl group font-semibold"
              >
                <span>Get Started</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/governance')}
                className="px-8 py-4 text-lg h-auto rounded-xl border-gray-300 text-black hover:bg-gray-50 group font-medium"
              >
                <Users className="mr-2 w-5 h-5" />
                View Governance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenUtility;
