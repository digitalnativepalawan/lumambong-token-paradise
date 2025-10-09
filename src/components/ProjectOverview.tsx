
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
          <Badge className="mb-6 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 text-sm">
            The Project
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">
            Palawan Collective
            <br />
            Development
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A pioneering real estate development that merges premium beachfront property 
            with blockchain technology, offering fractional ownership through 
            <span className="text-black font-semibold"> Palawan Collective Digital Securities (BBT)</span>.
          </p>
        </div>

        {/* Investment overview card */}
        <div className="modern-card p-8 md:p-12 rounded-3xl mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Investment stats */}
            <div>
              <h3 className="text-3xl font-bold mb-8 text-black">Project Investment</h3>
              <div className="grid grid-cols-2 gap-6">
                {investmentHighlights.map((item, index) => (
                  <div key={item.label} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-white border border-gray-200">
                        <item.icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <span className="text-sm text-gray-600">{item.label}</span>
                    </div>
                    <div className="text-xl font-bold text-black">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security benefits */}
            <div>
              <h3 className="text-3xl font-bold mb-8 text-black">Security Benefits</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="p-1 rounded-full bg-black mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-600 group-hover:text-black transition-colors">
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
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 p-4 mx-auto mb-4 group-hover:bg-gray-100 transition-colors">
                  <feature.icon className="w-full h-full text-gray-700" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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
