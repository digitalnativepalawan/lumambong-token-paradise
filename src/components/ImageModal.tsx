
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Expand, X } from "lucide-react";
import { useState } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

const ImageModal = ({ src, alt, className, children }: ImageModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={`relative cursor-pointer group ${className}`}>
          {children || (
            <img 
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Expand className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            aria-label="Close image"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Full-size image */}
          <img 
            src={src}
            alt={alt}
            className="w-full h-full object-contain max-h-[90vh] rounded-lg shadow-2xl"
            style={{ minWidth: '1000px', maxWidth: '100%' }}
          />
          
          {/* Image caption */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
            <p className="text-sm font-medium">{alt}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
