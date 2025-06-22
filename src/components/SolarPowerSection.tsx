
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Battery, Sun, Leaf } from "lucide-react";

const SolarPowerSection = () => {
  const solarFeatures = [
    {
      icon: Sun,
      title: "High-Efficiency Panels",
      description: "Premium solar panels optimized for tropical conditions"
    },
    {
      icon: Battery,
      title: "Energy Storage",
      description: "Advanced battery system for 24/7 power availability"
    },
    {
      icon: Zap,
      title: "Smart Grid System",
      description: "Intelligent power management and distribution"
    },
    {
      icon: Leaf,
      title: "Carbon Neutral",
      description: "100% renewable energy with zero emissions"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-100 text-yellow-800">Sustainable Energy</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            100% Off-Grid Solar Power
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Live sustainably with cutting-edge solar technology that powers your paradise.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/lovable-uploads/a37e0dbc-4399-45b0-82d5-d859062513e9.png" 
              alt="Solar Power System" 
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div className="grid gap-6">
            {solarFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-yellow-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-lg font-semibold text-gray-900 mb-2">Energy Independence</p>
            <p className="text-gray-700">
              Never worry about power outages or rising electricity costs. Your solar system provides 
              reliable, clean energy for decades to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarPowerSection;
