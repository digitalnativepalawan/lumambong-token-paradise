
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
      gradient: "from-purple-500 to-pink-500",
      features: ["Legal ownership documents", "Property appreciation", "Asset backing"]
    },
    {
      icon: Calendar,
      title: "Timeshare Benefits", 
      description: "Proportional annual usage rights with flexible booking and rental options",
      gradient: "from-blue-500 to-cyan-500",
      features: ["~36 nights per 10% ownership", "Flexible booking system", "Rent unused nights"]
    },
    {
      icon: Vote,
      title: "Governance Power",
      description: "On-chain voting rights for property decisions and community proposals",
      gradient: "from-green-500 to-emerald-500", 
      features: ["Property management votes", "Budget approvals", "Development decisions"]
    },
    {
      icon: TrendingUp,
      title: "Revenue Share",
      description: "Automatic dividend distribution from resort operations and rental income",
      gradient: "from-orange-500 to-red-500",
      features: ["30% revenue distribution", "Monthly payouts", "Compound growth"]
    }
  ];

  const tokenomics = [
    { label: "Circulating Supply", value: "65,000 BBT", percentage: 65 },
    { label: "Development Reserve", value: "25,000 BBT", percentage: 25 },
    { label: "Liquidity Pool", value: "10,000 BBT", percentage: 10 }
  ];

  const roadmapItems = [
    { phase: "Q1 2025", title: "Token Launch", status: "completed" },
    { phase: "Q2 2025", title: "Development Start", status: "active" },
    { phase: "Q3 2025", title: "Resort Opening", status: "upcoming" },
    { phase: "Q4 2025", title: "Full Operations", status: "upcoming" }
  ];

  return (
    <section id="utility" className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-2 backdrop-blur-sm">
            Token Utility
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="text-white">BBT Token</span>
            <br />
            <span className="gradient-text">Ecosystem</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            More than just ownership - BBT tokens unlock a comprehensive ecosystem of 
            benefits, rights, and opportunities in the Binga Beach community.
          </p>
        </div>

        {/* Utility grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {utilities.map((utility, index) => (
            <div 
              key={index}
              className="glow-card p-8 rounded-3xl group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${utility.gradient} group-hover:scale-110 transition-transform`}>
                  <utility.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {utility.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {utility.description}
                  </p>
                  <div className="space-y-2">
                    {utility.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Star className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-400">{feature}</span>
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
          <div className="glow-card p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                <Coins className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Token Distribution</h3>
            </div>
            <div className="space-y-6">
              {tokenomics.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">{item.label}</span>
                    <span className="text-white font-semibold">{item.value}</span>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className="h-3 bg-gray-800/50"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="glow-card p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Development Roadmap</h3>
            </div>
            <div className="space-y-4">
              {roadmapItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 glass rounded-xl">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'completed' ? 'bg-green-400' :
                    item.status === 'active' ? 'bg-purple-400 animate-pulse' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-sm text-gray-400">{item.phase}</div>
                  </div>
                  <Badge className={`text-xs ${
                    item.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                    item.status === 'active' ? 'bg-purple-500/20 text-purple-300' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center glow-card p-12 rounded-3xl neon-border">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 gradient-text">
              Ready to Join the Future of Real Estate?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Start your investment journey with BBT tokens and unlock exclusive access 
              to premium beachfront property in paradise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/auth')}
                className="gradient-button px-8 py-4 text-lg h-auto rounded-xl group"
              >
                <span>Get Started</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/governance')}
                className="px-8 py-4 text-lg h-auto rounded-xl glass border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
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
