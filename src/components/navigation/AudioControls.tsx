
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Minus, Plus } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";

const AudioControls = () => {
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const { isMuted, volume, toggleMute, setVolume } = useAudio();

  const adjustVolume = (delta: number) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
  };

  return (
    <div className="relative flex items-center gap-2">
      <Button
        onClick={() => setShowVolumeControl(!showVolumeControl)}
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-black hover:bg-gray-100"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </Button>
      
      {showVolumeControl && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg p-3 flex items-center gap-2 min-w-[150px]">
          <Button
            onClick={() => adjustVolume(-0.1)}
            variant="ghost"
            size="sm"
            className="p-1 h-6 w-6"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
          <Button
            onClick={() => adjustVolume(0.1)}
            variant="ghost"
            size="sm"
            className="p-1 h-6 w-6"
          >
            <Plus className="w-3 h-3" />
          </Button>
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="sm"
            className="p-1 h-6 w-6"
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AudioControls;
