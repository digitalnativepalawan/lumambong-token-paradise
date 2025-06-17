
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, TreePine } from "lucide-react";
import ImageModal from "./ImageModal";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <ImageModal 
          src="/lovable-uploads/a1fc026f-cd39-470f-84ea-bc9facbe2548.png"
          alt="Pristine Lumambong Beach, Palawan"
          className="w-full h-full"
        >
          <img 
            src="/lovable-uploads/a1fc026f-cd39-470f-84ea-bc9facbe2548.png" 
            alt="Pristine Lumambong Beach, Palawan"
            className="w-full h-full object-cover"
          />
        </ImageModal>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
        <div className="max-w-3xl">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Lumambong Beach, Palawan</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Luxe <span className="text-emerald-400">Lumambong</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 font-light text-gray-200">
            Own Your Secluded Palawan Paradise
          </p>
          
          <p className="text-lg mb-8 text-gray-300 max-w-2xl">
            Escape to pristine seclusion. Invest in sustainable paradise through innovative tokenized crowdfunding on one of the world's most beautiful islands.
          </p>

          {/* Key Stats */}
          <div className="flex flex-wrap gap-8 mb-12">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="text-sm">Only 10 Exclusive Units</span>
            </div>
            <div className="flex items-center gap-2">
              <TreePine className="w-5 h-5 text-emerald-400" />
              <span className="text-sm">100% Off-Grid Solar</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span className="text-sm">5,282 sqm Beachfront</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
              View Investment Details
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
              Download Prospectus
            </Button>
          </div>

          {/* Investment Highlight */}
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-gray-300 mb-2">Total Investment Per Unit</p>
            <p className="text-3xl font-bold text-emerald-400">$230,000 USD</p>
            <p className="text-sm text-gray-300">Fully turnkey ownership - Land, home, solar & legal setup</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
