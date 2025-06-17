
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Expand } from "lucide-react";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

const ImageModal = ({ src, alt, className, children }: ImageModalProps) => {
  return (
    <Dialog>
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
            <Expand className="w-8 h-8 text-white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent">
        <img 
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
