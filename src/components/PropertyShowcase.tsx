
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Home, Waves, Leaf } from "lucide-react";

const PropertyShowcase = () => {
  const specifications = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Living Space",
      value: "31.4 sqm",
      description: "Intelligently designed for comfort (338 sqft)"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Solar Power",
      value: "10kVA System",
      description: "Complete off-grid independence"
    },
    {
      icon: <Waves className="w-6 h-6" />,
      title: "Private Lot",
      value: "528 sqm",
      description: "Your slice of beachfront paradise"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainability",
      value: "100% Green",
      description: "Eco-conscious materials & systems"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800">Premium Modular Homes</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Private Palawan Sanctuary
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Inspired by GLAMNI G50 premium features, each home combines elegant design 
            with complete off-grid independence on your own titled beachfront lot.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Property Image */}
          <div className="relative">
            <img 
              src="/lovable-uploads/a37e0dbc-4399-45b0-82d5-d859062513e9.png"
              alt="GLAMNI G50 Modular Home"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <p className="text-sm text-gray-500">Inspired by</p>
              <p className="text-xl font-bold text-gray-900">GLAMNI G50</p>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-6">
            {specifications.map((spec, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                      {spec.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{spec.title}</h3>
                      <p className="text-2xl font-bold text-emerald-600 mb-1">{spec.value}</p>
                      <p className="text-gray-600">{spec.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Location Gallery */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <img 
              src="/lovable-uploads/989d0adb-6926-4aa6-a71c-ee9ec4a225ff.png"
              alt="Lumambong Beach aerial view"
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
          <div className="space-y-6">
            <img 
              src="/lovable-uploads/f0db1d35-d1fe-4ed6-92e6-7acbfb205fae.png"
              alt="Tropical landscape"
              className="w-full h-36 object-cover rounded-2xl"
            />
            <img 
              src="/lovable-uploads/efb4871e-72b3-40d6-a146-5b063d52502b.png"
              alt="Beachfront development area"
              className="w-full h-36 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;
