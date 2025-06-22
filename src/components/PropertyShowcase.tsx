
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square } from "lucide-react";

const PropertyShowcase = () => {
  return (
    <section id="property" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800">Property Showcase</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Your Palawan Paradise Awaits
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover luxury beachfront living with sustainable design and modern amenities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/lovable-uploads/69c86e8e-ee37-4927-a0f4-7b5f4cf0d98d.png" 
              alt="Beachfront Property" 
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold">Prime Beachfront Location</span>
                </div>
                <p className="text-gray-600">
                  Direct access to pristine white sand beaches with crystal clear waters.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <Bed className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold">Luxury Accommodations</span>
                </div>
                <p className="text-gray-600">
                  Modern villas with premium finishes and panoramic ocean views.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <Square className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold">5,282 sqm Total Area</span>
                </div>
                <p className="text-gray-600">
                  Spacious grounds with room for recreation and relaxation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;
