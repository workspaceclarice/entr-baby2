import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface VenueGalleryProps {
  images: string[];
}

export default function VenueGallery({ images }: VenueGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="h-96 grid grid-cols-4 gap-2">
        {/* Main Image */}
        <div 
          className="col-span-2 row-span-2 relative cursor-pointer"
          onClick={() => setSelectedImage(images[0])}
        >
          <img
            src={images[0]}
            alt="Venue main"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail Grid */}
        {images.slice(1, 5).map((image, index) => (
          <div 
            key={index}
            className="relative cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Venue ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gallery Modal */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

          <div className="relative bg-white max-w-7xl mx-auto">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <img
              src={selectedImage || ''}
              alt="Venue"
              className="max-h-[90vh] object-contain"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
} 