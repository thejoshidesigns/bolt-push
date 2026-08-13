import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '../lib/supabase';

interface Props {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }: Props) {
  const image = images[currentIndex];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onNavigate, currentIndex, images.length]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-9 h-9 bg-white border border-apple-border text-apple-text hover:text-apple-accent flex items-center justify-center rounded-full transition-colors duration-200"
      >
        <X size={16} />
      </button>

      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-apple-border text-apple-secondary hover:text-apple-accent flex items-center justify-center rounded-full transition-colors duration-200"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-apple-border text-apple-secondary hover:text-apple-accent flex items-center justify-center rounded-full transition-colors duration-200"
        >
          <ChevronRight size={18} />
        </button>
      )}

      <div className="max-w-5xl max-h-[80vh] mx-auto px-16">
        <img
          src={image.image_url}
          alt={image.title}
          className="max-w-full max-h-[75vh] object-contain"
        />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-white text-base font-medium mb-1">{image.title}</p>
        <p className="text-white/70 text-xs">{image.category}</p>
        <p className="text-white/50 text-xs mt-1">{currentIndex + 1} / {images.length}</p>
      </div>
    </div>
  );
}
