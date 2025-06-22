
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Plane, Car, Ship } from "lucide-react";

const LocationSection = () => {
  const transportOptions = [
    {
      icon: Plane,
      title: "Fly to Puerto Princesa",
      description: "1.5 hour flight from Manila",
      time: "1.5 hrs"
    },
    {
      icon: Car,
      title: "Drive to Lumambong",
      description: "Scenic coastal drive",
      time: "2 hrs"
    },
    {
      icon: Ship,
      title: "Private Boat Access",
      description: "Direct beach arrival",
      time: "30 mins"
    }
  ];

  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800">Prime Location</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Lumambong Beach, Palawan
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover one of the Philippines' last untouched paradise destinations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="/lovable-uploads/f63a7feb-19f0-4b58-ba86-ee624f96d4ce.png" 
              alt="Lumambong Beach Location" 
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Pristine Natural Beauty</h3>
                <p className="text-gray-600">
                  Lumambong Beach offers crystal-clear waters, white sand beaches, and lush tropical surroundings 
                  that remain largely untouched by mass tourism.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Strategic Investment Location</h3>
                <p className="text-gray-600">
                  Located in Palawan, consistently ranked as one of the world's best islands, 
                  offering exceptional long-term value appreciation potential.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Exclusive Community</h3>
                <p className="text-gray-600">
                  Join a select group of investors who value sustainability, privacy, 
                  and authentic tropical living experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transportation Options */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-8 text-black">How to Get There</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {transportOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{option.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                  <p className="text-emerald-600 font-semibold">{option.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
