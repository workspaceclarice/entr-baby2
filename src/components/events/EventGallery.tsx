import React, { useState } from 'react';
import { XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface EventGalleryProps {
  images: string[];
}

const EventGallery: React.FC<EventGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="h-full">
      <div className="relative h-full">
        <img
          src={images[0]}
          alt="Event main"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Fullscreen Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 text-white/50 hover:text-white/90 transition-colors"
          >
            <ArrowLeftIcon className="h-8 w-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white/50 hover:text-white/90 transition-colors"
          >
            <ArrowRightIcon className="h-8 w-8" />
          </button>

          <img
            src={images[selectedImage]}
            alt={`Event photo ${selectedImage + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <div className="absolute bottom-4 left-0 right-0 text-center text-white/70">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallery; 