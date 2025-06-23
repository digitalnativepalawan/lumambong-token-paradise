
import { Badge } from "@/components/ui/badge";
import { Waves, Home, Leaf, Users, TrendingUp, Shield, Zap } from "lucide-react";

const ProjectOverview = () => {
  const features = [
    {
      icon: Home,
      title: "10 Premium Lots",
      description: "Turnkey eco-friendly modular homes on titled beachfront property",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Waves,
      title: "5,282 sqm Beachfront", 
      description: "Prime location in Lumambong (Binga) Beach, San Vicente, Palawan",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Leaf,
      title: "Solar Powered",
      description: "Each home features a 10kVA solar system for sustainable living",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Community Governed",
      description: "On-chain governance system giving token holders voting rights",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const investmentHighlights = [
    { label: "Total Project Value", value: "$2,500,000", icon: TrendingUp },
    { label: "Token Supply", value: "100,000 BBT", icon: Shield },
    { label: "Token Value", value: "1 BBT = $25", icon: Zap },
    { label: "Per Lot Value", value: "$250,000", icon: Home }
  ];

  const benefits = [
    "Fractional ownership of premium beachfront property",
    "Proportional annual timeshare rights",
    "Revenue sharing from resort operations", 
    "On-chain governance and voting rights"
  ];

  return (
    <section id="project" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 text-sm backdrop-blur-sm">
            The Project
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="gradient-text">Binga Beach</span>
            <br />
            <span className="text-white">Development</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A pioneering real estate development that merges premium beachfront property 
            with blockchain technology, offering fractional ownership through 
            <span className="gradient-text font-semibold"> Binga Beach Tokens (BBT)</span>.
          </p>
        </div>

        {/* Investment overview card */}
        <div className="glow-card p-8 md:p-12 rounded-3xl mb-20 neon-border">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Investment stats */}
            <div>
              <h3 className="text-3xl font-bold mb-8 gradient-text">Project Investment</h3>
              <div className="grid grid-cols-2 gap-6">
                {investmentHighlights.map((item, index) => (
                  <div key={item.label} className="glass p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                        <item.icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-sm text-gray-400">{item.label}</span>
                    </div>
                    <div className="text-xl font-bold text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Token benefits */}
            <div>
              <h3 className="text-3xl font-bold mb-8 gradient-text">Token Benefits</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="p-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glow-card p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
