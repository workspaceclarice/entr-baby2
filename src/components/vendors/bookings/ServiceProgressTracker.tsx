import React, { useState, useRef } from 'react';
import { MapPinIcon, ClockIcon, ChevronDownIcon, CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import ServiceLocationMap from './ServiceLocationMap';

interface Coordinates {
  lat: number;
  lng: number;
}

interface ServiceProgressTrackerProps {
  status: string;
  estimatedArrival: string;
  vendorLocation: Coordinates;
  destinationLocation: Coordinates;
  onUpdateStatus: (status: string, photo?: File) => void;
}

const ServiceProgressTracker: React.FC<ServiceProgressTrackerProps> = ({
  status,
  estimatedArrival,
  vendorLocation,
  destinationLocation,
  onUpdateStatus,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const progressSteps = [
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'on_the_way', label: 'On the way' },
    { id: 'arrived', label: 'Arrived' },
    { id: 'in_progress', label: 'In progress' },
    { id: 'completed', label: 'Completed' }
  ];

  const getCurrentStep = () => {
    const index = progressSteps.findIndex(step => step.id === status);
    return index === -1 ? 0 : index;
  };

  const currentStep = progressSteps[getCurrentStep()];

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateStatus = (newStatus: string) => {
    if (newStatus === 'arrived' && !selectedPhoto) {
      setShowPhotoModal(true);
      setIsOpen(false);
      return;
    }

    setIsUpdating(true);
    onUpdateStatus(newStatus, selectedPhoto || undefined);
    setIsOpen(false);
    setShowPhotoModal(false);
    setSelectedPhoto(null);
    setPhotoPreview(null);
    setTimeout(() => setIsUpdating(false), 1000);
  };

  if (!currentStep) return null;

  // Photo Upload Modal
  const PhotoUploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Confirm Arrival</h3>
          <button 
            onClick={() => setShowPhotoModal(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Please take a photo to confirm your arrival at the venue
          </p>

          {photoPreview ? (
            <div className="relative">
              <img 
                src={photoPreview} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  setPhotoPreview(null);
                }}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm"
              >
                <XMarkIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors"
            >
              <CameraIcon className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Take or upload photo</span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoSelect}
            className="hidden"
          />

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleUpdateStatus('arrived')}
              disabled={!selectedPhoto}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                selectedPhoto
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Confirm Arrival
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        {/* Status Bar with Dropdown */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="relative">
              <button
                onClick={() => !isUpdating && setIsOpen(!isOpen)}
                disabled={isUpdating}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-lg font-medium text-gray-900">
                  {currentStep.label}
                </span>
                <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {progressSteps.map((step, index) => {
                      const isCompleted = index <= getCurrentStep();
                      const isCurrent = index === getCurrentStep();
                      const isSelectable = index === getCurrentStep() + 1;

                      return (
                        <button
                          key={step.id}
                          onClick={() => isSelectable && handleUpdateStatus(step.id)}
                          disabled={!isSelectable}
                          className={`w-full px-4 py-3 flex items-center justify-between ${
                            isSelectable 
                              ? 'text-blue-600 hover:bg-blue-50 cursor-pointer' 
                              : isCurrent
                              ? 'text-gray-900 bg-gray-50'
                              : isCompleted
                              ? 'text-gray-600'
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <span className="flex items-center">
                            {step.label}
                          </span>
                          {isCompleted && <CheckIcon className="h-5 w-5 text-green-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="h-5 w-5 mr-1" />
              Arriving at {estimatedArrival}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="h-[300px] relative">
          <ServiceLocationMap
            vendorLocation={vendorLocation}
            destinationLocation={destinationLocation}
          />
        </div>
      </div>
      {showPhotoModal && <PhotoUploadModal />}
    </>
  );
};

export default ServiceProgressTracker; 