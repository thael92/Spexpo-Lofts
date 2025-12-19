import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize, Minimize, Download } from 'lucide-react';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex = 0 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  const handlePrev = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/95 flex flex-col animate-in fade-in duration-300">
      {/* Header Controls */}
      <div className="flex justify-between items-center p-4 md:p-6 text-white z-20">
        <div className="text-sm font-bold tracking-widest uppercase">
          {currentIndex + 1} / {images.length}
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block"
            title="Zoom"
          >
            {isZoomed ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title="Fechar"
          >
            <X size={32} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow relative flex items-center justify-center overflow-hidden">
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-8 z-10 p-3 md:p-4 bg-white/5 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all group"
        >
          <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-8 z-10 p-3 md:p-4 bg-white/5 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all group"
        >
          <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Image Display */}
        <div className={`w-full h-full flex items-center justify-center p-4 transition-all duration-500 ${isZoomed ? 'scale-125' : 'scale-100'}`}>
          <img 
            src={images[currentIndex]} 
            alt={`Foto ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
          />
        </div>
      </div>

      {/* Thumbnails Strip */}
      <div className="p-6 bg-black/40 backdrop-blur-md border-t border-white/10 hidden md:block">
        <div className="container mx-auto flex justify-center gap-3 overflow-x-auto py-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => { setIsZoomed(false); setCurrentIndex(idx); }}
              className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden transition-all duration-300 ${
                currentIndex === idx ? 'ring-2 ring-brand-red scale-110 z-10' : 'opacity-40 hover:opacity-100'
              }`}
            >
              <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};