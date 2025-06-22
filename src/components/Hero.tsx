
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, TreePine, Shield, Globe, Play, Pause } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";
import { useEffect } from "react";

const Hero = () => {
  const { isPlaying, isMuted, playAudio } = useAudio();

  useEffect(() => {
    // Auto-play audio when component mounts if not muted
    if (!isMuted) {
      playAudio();
    }
  }, [isMuted, playAudio]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white py-8">
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-black">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/5f0c2f97-d6d5-46a2-a634-804f4f053d96.png" 
              alt="Palawan Collective" 
              className="w-64 sm:w-80 md:w-96 h-auto mx-auto"
            />
          </div>

          {/* Audio Status Indicator */}
          {isPlaying && !isMuted && (
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-4">
              <Play className="w-3 h-3 text-emerald-600" />
              <span className="text-xs text-emerald-600">Ambient audio playing</span>
            </div>
          )}

          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-8">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
            <span className="text-xs sm:text-sm font-medium text-black">Lumambong Beach, Palawan</span>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 font-light text-gray-800">
            Own Your Secluded Palawan Paradise
          </p>
          
          <p className="text-sm sm:text-lg mb-4 sm:mb-8 text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Escape to pristine seclusion. Invest in sustainable paradise through innovative tokenized crowdfunding on one of the world's most beautiful islands.
          </p>

          {/* Key Stats */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-8 mb-6 sm:mb-12 justify-center">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-black">Only 10 Exclusive Units</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <TreePine className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-black">100% Off-Grid Solar</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-black">5,282 sqm Beachfront</span>
            </div>
          </div>

          {/* Investment Highlight */}
          <div className="mb-4 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">Total Investment Per Unit</p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600">$230,000 USD</p>
            <p className="text-xs sm:text-sm text-gray-700">Fully turnkey ownership - Land, home, solar & legal setup</p>
          </div>

          {/* Tokenized Ownership Structure */}
          <div className="p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 justify-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <h3 className="text-base sm:text-lg font-semibold text-black">Tokenized Ownership Structure</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-700">Filipino Ownership</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-emerald-600">60%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  <span className="text-xs sm:text-sm text-gray-700">Foreign Ownership</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">40%</p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-2 sm:mb-3">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 sm:h-3 rounded-l-full" style={{width: '60%'}}></div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700">
              Compliant with Philippine law • Blockchain transparency • Community-first development
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
