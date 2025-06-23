
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Compass, ExternalLink, Home, Zap, Users, FileText } from "lucide-react";
import ImageModal from "./ImageModal";

const LocationSection = () => {
  const mapUrl = "https://www.google.com/maps/d/u/0/edit?mid=1lRgpf0rzovejTPzeIg-5S6M-vRQoil0&usp=sharing";
  const futureProjectMapUrl = "https://www.google.com/maps/d/u/0/edit?mid=1dbLajOIGAHjaaGKfAUNivBT5YJQl5kM&usp=sharing";
  const moduleSpecsUrl = "https://drive.google.com/file/d/1NCUW6eqVCYUwgmzcwFIDba6J6MI1GhPY/view?usp=sharing";

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

  const modularHomeFeatures = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Premium Design",
      description: "31.4m² modern modular home with 2-person occupancy"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "10kVA Solar System",
      description: "Complete off-grid power solution with floor heating"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Luxury Amenities",
      description: "Full kitchen, bathroom, and climate control systems"
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

        {/* Additional Property Images */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Property Views</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ImageModal 
              src="/lovable-uploads/0a3ed884-3f96-42bf-a26a-110e1ab38604.png"
              alt="Pristine beachfront with turquoise waters and boat"
              className="aspect-video rounded-xl shadow-lg overflow-hidden"
            >
              <img 
                src="/lovable-uploads/0a3ed884-3f96-42bf-a26a-110e1ab38604.png"
                alt="Pristine beachfront with turquoise waters and boat"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </ImageModal>

            <ImageModal 
              src="/lovable-uploads/0e4a55c3-3a3f-4ef9-92d3-edb4515fdb41.png"
              alt="Expansive beach coastline with lush tropical mountains"
              className="aspect-video rounded-xl shadow-lg overflow-hidden"
            >
              <img 
                src="/lovable-uploads/0e4a55c3-3a3f-4ef9-92d3-edb4515fdb41.png"
                alt="Expansive beach coastline with lush tropical mountains"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </ImageModal>

            <ImageModal 
              src="/lovable-uploads/6b6bcb8e-91a5-424c-a8e2-fd2900c58722.png"
              alt="Aerial view of the property showing development area and beach access"
              className="aspect-video rounded-xl shadow-lg overflow-hidden"
            >
              <img 
                src="/lovable-uploads/6b6bcb8e-91a5-424c-a8e2-fd2900c58722.png"
                alt="Aerial view of the property showing development area and beach access"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </ImageModal>
          </div>
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

        {/* Modular Home Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Premium Accommodation</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Eco-Luxury Modular Homes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each lot features a state-of-the-art modular home equipped with a 10kVA solar system, 
              designed for sustainable luxury living in paradise.
            </p>
          </div>

          {/* Centered Modular Home Image with Button */}
          <div className="mb-12 flex flex-col items-center">
            <ImageModal 
              src="/lovable-uploads/1459e5f6-bba3-4363-9f17-aca3c5c7aa2f.png"
              alt="Modern eco-luxury modular home with panoramic windows"
              className="max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden mb-6"
            >
              <img 
                src="/lovable-uploads/1459e5f6-bba3-4363-9f17-aca3c5c7aa2f.png"
                alt="Modern eco-luxury modular home with panoramic windows"
                className="w-full rounded-2xl shadow-2xl"
              />
            </ImageModal>
            
            {/* Module Specs Button */}
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
              onClick={() => window.open(moduleSpecsUrl, '_blank')}
            >
              <FileText className="mr-2 w-5 h-5" />
              Module Specs
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Modular Home Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {modularHomeFeatures.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Modular Home Specifications */}
          <div className="mb-12 flex justify-center">
            <ImageModal 
              src="/lovable-uploads/af1340fd-58be-4d06-bfdf-69e64fa4fd26.png"
              alt="Detailed specifications and floor plan of GLAMNI modular home model G50"
              className="max-w-4xl w-full rounded-2xl shadow-lg overflow-hidden"
            >
              <img 
                src="/lovable-uploads/af1340fd-58be-4d06-bfdf-69e64fa4fd26.png"
                alt="Detailed specifications and floor plan of GLAMNI modular home model G50"
                className="w-full rounded-2xl shadow-lg"
              />
            </ImageModal>
          </div>

          {/* Specifications Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Home Specifications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">31.4m²</div>
                <div className="text-gray-600 font-medium">Floor Area</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">10kVA</div>
                <div className="text-gray-600 font-medium">Solar System</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2 People</div>
                <div className="text-gray-600 font-medium">Occupancy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">6.5 Tons</div>
                <div className="text-gray-600 font-medium">Total Weight</div>
              </div>
            </div>
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
                <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Lot 3947-E, Barangay Binga, San Vicente, Palawan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Direct beachfront access with titled land</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">10 individual subdivided lots available</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => window.open(mapUrl, '_blank')}
              >
                View Interactive Map
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
              
              <Button 
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                onClick={() => window.open(futureProjectMapUrl, '_blank')}
              >
                Future Project Map
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
