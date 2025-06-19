
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Expand, X, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

const ImageModal = ({ src, alt, className, children }: ImageModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom and position when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
      setIsLoading(true);
    }
  }, [isOpen]);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Zoom functions
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 4));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  // Touch/Mouse drag handlers
  const handleDragStart = (clientX: number, clientY: number) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ 
        x: clientX - position.x, 
        y: clientY - position.y 
      });
    }
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleDragStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Double tap/click to zoom
  const handleDoubleClick = () => {
    if (zoomLevel === 1) {
      zoomIn();
    } else {
      resetZoom();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={`relative cursor-pointer group ${className}`}>
          {children || (
            <img 
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Expand className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent 
        className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 border-none bg-black/95 backdrop-blur-sm"
        aria-describedby={`enlarged-image-${alt.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div 
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleClick}
        >
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors touch-manipulation"
            aria-label="Close enlarged image"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoom controls */}
          <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
            <button
              onClick={zoomIn}
              disabled={zoomLevel >= 4}
              className="bg-black/50 hover:bg-black/70 disabled:opacity-30 text-white rounded-full p-2 transition-colors touch-manipulation"
              aria-label="Zoom in"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={zoomOut}
              disabled={zoomLevel <= 0.5}
              className="bg-black/50 hover:bg-black/70 disabled:opacity-30 text-white rounded-full p-2 transition-colors touch-manipulation"
              aria-label="Zoom out"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={resetZoom}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 text-xs font-bold transition-colors touch-manipulation"
              aria-label="Reset zoom"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              1:1
            </button>
          </div>

          {/* Zoom level indicator */}
          <div className="absolute bottom-4 left-4 z-30 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {Math.round(zoomLevel * 100)}%
          </div>

          {/* Main image */}
          <img 
            ref={imageRef}
            src={src}
            alt={alt}
            onLoad={handleImageLoad}
            className={`max-w-full max-h-full object-contain transition-transform duration-200 select-none ${
              isDragging ? 'cursor-grabbing' : zoomLevel > 1 ? 'cursor-grab' : 'cursor-default'
            }`}
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
              touchAction: 'none'
            }}
            draggable={false}
            id={`enlarged-image-${alt.replace(/\s+/g, '-').toLowerCase()}`}
          />

          {/* Instructions overlay (shows briefly on first open) */}
          <div className="absolute bottom-4 right-4 z-30 bg-black/70 text-white px-4 py-2 rounded-lg text-sm max-w-xs">
            <div className="hidden md:block">
              Double-click to zoom • Scroll to zoom • Drag to pan
            </div>
            <div className="md:hidden">
              Double-tap to zoom • Pinch to zoom • Drag to pan
            </div>
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 z-20">
            <p className="text-sm md:text-base font-medium leading-relaxed">{alt}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
