
import { Badge } from "@/components/ui/badge";
import { Waves, Home, Leaf, Users } from "lucide-react";

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
      icon: Leaf,
      title: "Solar Powered",
      description: "Each home features a 10kVA solar system for sustainable living"
    },
    {
      icon: Users,
      title: "Community Governed",
      description: "On-chain governance system giving token holders voting rights"
    }
  ];

  return (
    <section id="project" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">The Project</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Binga Beach Development
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            A pioneering real estate development that merges premium beachfront property 
            with blockchain technology, offering fractional ownership through Binga Beach Tokens (BBT).
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-8 rounded-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Project Investment</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Project Value:</span>
                    <span className="font-bold text-blue-600">$2,500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token Supply:</span>
                    <span className="font-bold">100,000 BBT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token Value:</span>
                    <span className="font-bold text-emerald-600">1 BBT = $25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Per Lot Value:</span>
                    <span className="font-bold">$250,000</span>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Token Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Fractional ownership of premium beachfront property
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Proportional annual timeshare rights
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Revenue sharing from resort operations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    On-chain governance and voting rights
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
