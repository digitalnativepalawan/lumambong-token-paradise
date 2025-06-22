
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ImageModal from "./ImageModal";

const SolarPowerSection = () => {
  const solarImages = [
    {
      src: "/lovable-uploads/a4a1abb4-d19c-474f-8c55-0073a7c3ed83.png",
      alt: "Anern Hybrid Solar Inverter EVO-10200 - 10.2KW/48V Dual MPPT System with PH Stock",
      title: "Hybrid Solar Inverter EVO-10200",
      description: "10.2KW rated output power with dual AC output and dual PV input capabilities"
    },
    {
      src: "/lovable-uploads/ff4fbce5-6c18-4f4b-9982-c555cfbadcc6.png",
      alt: "SCI-EVO-10200 Hybrid Solar Inverter - Multiple Views and Installation Components",
      title: "SCI-EVO-10200 Installation Views",
      description: "Comprehensive view of the hybrid solar inverter installation components and design"
    },
    {
      src: "/lovable-uploads/69c86e8e-ee37-4927-a0f4-7b5f4cf0d98d.png",
      alt: "Complete Solar Power System Kit - Solar Panels, Inverter, Lithium Battery and Cables",
      title: "Complete Solar Power System Kit",
      description: "Integrated solar solution with panels, inverter, lithium battery storage and installation cables"
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

        {/* Specification Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white hover:bg-blue-50 border-blue-200 text-blue-700 font-medium"
          >
            <a
              href="https://cdn.shopify.com/s/files/1/0564/8049/7832/files/Anern_25.6_V_51.2_V_Lithium_Battery_Manual.pdf?v=1750225989"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>🔋</span>
              Battery Specs
            </a>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white hover:bg-green-50 border-green-200 text-green-700 font-medium"
          >
            <a
              href="https://cdn.shopify.com/s/files/1/0564/8049/7832/files/Anern_Solar_Power_System_Manual.pdf?v=1750225994"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>⚡</span>
              Off Grid Hybrid
            </a>
          </Button>
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
