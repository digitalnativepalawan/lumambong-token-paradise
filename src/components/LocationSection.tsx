import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Compass, ExternalLink } from "lucide-react";
import ImageModal from "./ImageModal";

const LocationSection = () => {
  const mapUrl = "https://www.google.com/maps/d/u/0/edit?mid=1lRgpf0rzovejTPzeIg-5S6M-vRQoil0&usp=sharing";

  const locationFeatures = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Pristine Beachfront",
      description: "Direct access to untouched white sand beach"
    },
    {
      icon: <Navigation className="w-5 h-5" />,
      title: "Strategic Location",
      description: "Close to El Nido's world-famous attractions"
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Secluded Paradise",
      description: "Private bay surrounded by lush tropical mountains"
    }
  ];

  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800">Prime Location</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Lumambong Beach
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nestled in the heart of Palawan, our exclusive development sits on one of the Philippines' 
            most pristine and secluded beaches, offering unparalleled natural beauty and tranquility.
          </p>
        </div>

        {/* Main Location Image */}
        <div className="mb-12">
          <ImageModal 
            src="/lovable-uploads/0aac491a-0d13-4df3-bab3-171547cf214c.png"
            alt="Aerial view of Lumambong Beach with pristine waters and mountain backdrop"
            className="w-full h-96 md:h-[600px] rounded-2xl shadow-2xl overflow-hidden"
          >
            <img 
              src="/lovable-uploads/0aac491a-0d13-4df3-bab3-171547cf214c.png"
              alt="Aerial view of Lumambong Beach with pristine waters and mountain backdrop"
              className="w-full h-96 md:h-[600px] object-cover rounded-2xl shadow-2xl"
            />
          </ImageModal>
        </div>

        {/* Location Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {locationFeatures.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <ImageModal 
              src="/lovable-uploads/6765833f-55ed-4467-8686-f4c4a1c3b8ea.png"
              alt="Stunning beachfront view with pristine sand and crystal clear waters"
              className="w-full h-80 rounded-2xl shadow-lg overflow-hidden"
            >
              <img 
                src="/lovable-uploads/6765833f-55ed-4467-8686-f4c4a1c3b8ea.png"
                alt="Stunning beachfront view with pristine sand and crystal clear waters"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </ImageModal>
          </div>
          <div className="space-y-6">
            <ImageModal 
              src="/lovable-uploads/2008ab24-ffec-4f30-8947-cd49732d03ba.png"
              alt="Tropical development area surrounded by coconut palms"
              className="w-full h-36 rounded-2xl shadow-lg overflow-hidden"
            >
              <img 
                src="/lovable-uploads/2008ab24-ffec-4f30-8947-cd49732d03ba.png"
                alt="Tropical development area surrounded by coconut palms"
                className="w-full h-36 object-cover rounded-2xl shadow-lg"
              />
            </ImageModal>
            <ImageModal 
              src="/lovable-uploads/f63a7feb-19f0-4b58-ba86-ee624f96d4ce.png"
              alt="Aerial view of the beachfront property development site"
              className="w-full h-36 rounded-2xl shadow-lg overflow-hidden"
            >
              <img 
                src="/lovable-uploads/f63a7feb-19f0-4b58-ba86-ee624f96d4ce.png"
                alt="Aerial view of the beachfront property development site"
                className="w-full h-36 object-cover rounded-2xl shadow-lg"
              />
            </ImageModal>
          </div>
        </div>

        {/* Property Map & Google Maps Integration */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <ImageModal 
              src="/lovable-uploads/0c9cafed-2589-4a20-bbcf-ea629cdf2ae5.png"
              alt="Official property map showing lot divisions and location details"
              className="w-full rounded-2xl shadow-lg overflow-hidden"
            >
              <img 
                src="/lovable-uploads/0c9cafed-2589-4a20-bbcf-ea629cdf2ae5.png"
                alt="Official property map showing lot divisions and location details"
                className="w-full rounded-2xl shadow-lg"
              />
            </ImageModal>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-4">Exact Location & Property Map</h3>
              <p className="text-gray-600 mb-6">
                Our 5,282 sqm beachfront property is strategically located in Barangay Binga, 
                San Vicente, Palawan. The development is divided into 10 exclusive lots, 
                each approximately 528 sqm, ensuring privacy and exclusivity for all owners.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-700">Lot 3947-E, Barangay Binga, San Vicente, Palawan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-700">Direct beachfront access with titled land</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-700">10 individual subdivided lots available</span>
              </div>
            </div>

            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => window.open(mapUrl, '_blank')}
            >
              View Interactive Map
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
