
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://d3ctxlq1ktw2nl.cloudfront.net/staging/2025-5-22/402583470-44100-2-bdbb722118c58.m4a');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const audio = audioRef.current;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, volume, toggleMute, playAudio, pauseAudio, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};
