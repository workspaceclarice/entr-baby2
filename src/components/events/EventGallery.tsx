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
    <div>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image}
              alt={`Event photo ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeftIcon className="h-8 w-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowRightIcon className="h-8 w-8" />
          </button>

          <img
            src={images[selectedImage]}
            alt={`Event photo ${selectedImage + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallery; 