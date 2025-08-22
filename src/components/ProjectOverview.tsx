
import { Badge } from "@/components/ui/badge";
import { Home, Waves, Leaf, Users, TrendingUp, Shield, Zap, Ruler } from "lucide-react";

const ProjectOverview = () => {
  const features = [
    {
      icon: Home,
      title: "10 Premium Lots",
      description: "Turnkey eco-friendly modular homes on titled beachfront property"
    },
    {
      icon: Waves,
      title: "5,282 sqm Beachfront", 
      description: "Prime location in Lumambong (Binga) Beach, San Vicente, Palawan"
    },
    {
      icon: Ruler,
      title: "528 sqm Per Lot",
      description: "Each exclusive lot offers ample space for privacy and luxury living"
    },
    {
      icon: Leaf,
      title: "Solar Powered",
      description: "Each home features a 10kVA solar system for sustainable living"
    },
    {
      icon: Users,
      title: "Community Governed",
      description: "On-chain governance system giving security holders voting rights"
    }
  ];

  const investmentHighlights = [
    { label: "Total Project Value", value: "$2,500,000", icon: TrendingUp },
    { label: "Security Supply", value: "100,000 BBT", icon: Shield },
    { label: "Security Value", value: "1 BBT = $25", icon: Zap },
    { label: "Per Lot Value", value: "$250,000", icon: Home }
  ];

  const benefits = [
    "Fractional ownership of premium beachfront property",
    "Proportional annual timeshare rights",
    "Revenue sharing from resort operations", 
    "On-chain governance and voting rights"
  ];

  return (
    <section id="project" className="section-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-primary/20 text-primary border border-primary/30 px-4 py-2 text-sm backdrop-blur-sm">
            The Project
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-white">
            Binga Beach
            <br />
            Development
          </h2>
          <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
            A pioneering real estate development that merges premium beachfront property 
            with blockchain technology, offering fractional ownership through 
            <span className="text-white font-medium"> Binga Beach Digital Securities (BBT)</span>.
          </p>
        </div>

        {/* Investment overview card */}
        <div className="modern-card p-8 md:p-12 rounded-3xl mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Investment stats */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-white">Project Investment</h3>
              <div className="grid grid-cols-2 gap-6">
                {investmentHighlights.map((item, index) => (
                  <div key={item.label} className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-white/80">{item.label}</span>
                    </div>
                    <div className="text-xl font-semibold text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security benefits */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-white">Security Benefits</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="p-1 rounded-full bg-primary mt-1 glow-purple">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-white/80 group-hover:text-white transition-colors">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="modern-card p-8 rounded-2xl text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-4 mx-auto mb-4 group-hover:bg-white/10 transition-all duration-300 backdrop-blur-sm glow-purple">
                  <feature.icon className="w-full h-full text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-white/80 leading-relaxed text-sm">
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
