
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, TreePine, Shield, Globe } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-white">
        <div className="max-w-3xl">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-8">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-medium">Lumambong Beach, Palawan</span>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 font-light text-gray-200">
            Own Your Secluded Palawan Paradise
          </p>
          
          <p className="text-sm sm:text-lg mb-4 sm:mb-8 text-gray-300 max-w-2xl leading-relaxed">
            Escape to pristine seclusion. Invest in sustainable paradise through innovative tokenized crowdfunding on one of the world's most beautiful islands.
          </p>

          {/* Key Stats */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-8 mb-6 sm:mb-12">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Only 10 Exclusive Units</span>
            </div>
            <div className="flex items-center gap-2">
              <TreePine className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm">100% Off-Grid Solar</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm">5,282 sqm Beachfront</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-6 sm:mb-12">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg w-full sm:w-auto">
              View Investment Details
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Investment Highlight */}
          <div className="mb-4 sm:mb-8 p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Total Investment Per Unit</p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400">$230,000 USD</p>
            <p className="text-xs sm:text-sm text-gray-300">Fully turnkey ownership - Land, home, solar & legal setup</p>
          </div>

          {/* Tokenized Ownership Structure */}
          <div className="p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <h3 className="text-base sm:text-lg font-semibold">Tokenized Ownership Structure</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-300">Filipino Ownership</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-emerald-400">60%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span className="text-xs sm:text-sm text-gray-300">Foreign Ownership</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-blue-400">40%</p>
              </div>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 mb-2 sm:mb-3">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 sm:h-3 rounded-l-full" style={{width: '60%'}}></div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-300">
              Compliant with Philippine law • Blockchain transparency • Community-first development
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
