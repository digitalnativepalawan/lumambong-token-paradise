
import { Badge } from "@/components/ui/badge";
import ImageModal from "./ImageModal";

const SolarPowerSection = () => {
  const solarImages = [
    {
      src: "/lovable-uploads/f95efb8e-bfb7-4f0f-86cb-26eaa0f270e6.png",
      alt: "580W Solar Panel N-Type Dual Glass - Technical Specifications and Efficiency Details",
      title: "580W Solar Panel Specifications",
      description: "High-efficiency monocrystalline solar panel with dual glass technology"
    },
    {
      src: "/lovable-uploads/1bd949c6-4f51-4049-b7ef-726a0faf54a8.png",
      alt: "IP65 Single Phase Hybrid Solar Inverter 6KW-12KW - Performance Comparison and Features",
      title: "Hybrid Solar Inverter Series",
      description: "Advanced single phase hybrid inverters with multiple operation modes"
    },
    {
      src: "/lovable-uploads/9a062edc-7317-4893-a40f-556a4989f66b.png",
      alt: "48V200AH Wall-mounted Lithium Battery - Smart BMS System and Technical Specifications",
      title: "Lithium Battery Storage System",
      description: "Wall-mounted lithium battery with advanced BMS and safety features"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800">
            Solar Technology
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Premium Solar Power Solutions
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore our high-efficiency solar panels, advanced inverters, and smart 
            battery storage systems designed for optimal energy production and reliability.
          </p>
        </div>

        {/* Responsive Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solarImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
            >
              <ImageModal
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3] w-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay with zoom hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/90 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium text-gray-800">
                      Click to enlarge
                    </div>
                  </div>
                </div>
              </ImageModal>
              
              {/* Image Info Card */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Technical Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">High Efficiency</h3>
            <p className="text-gray-600 text-sm">
              Advanced monocrystalline technology delivers superior energy conversion rates
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔋</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Storage</h3>
            <p className="text-gray-600 text-sm">
              Intelligent battery management systems for optimal energy storage
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Eco-Friendly</h3>
            <p className="text-gray-600 text-sm">
              Sustainable energy solutions with minimal environmental impact
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarPowerSection;
