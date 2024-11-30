import React, { useState } from 'react';
import { Venue } from '../../types/venue';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface VenueBookingFlowProps {
  venue: Venue;
  onClose: () => void;
}

const VenueBookingFlow: React.FC<VenueBookingFlowProps> = ({ venue, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [eventDetails, setEventDetails] = useState({
    type: '',
    guests: '',
    notes: ''
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold">Book {venue.name}</h2>
        </div>

        {/* Progress Steps */}
        <div className="border-b">
          <div className="px-6 py-4">
            <div className="flex justify-between">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                <div className="step-circle">1</div>
                <span className="step-text">Date & Time</span>
              </div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="step-circle">2</div>
                <span className="step-text">Details</span>
              </div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                <div className="step-circle">3</div>
                <span className="step-text">Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step content will go here */}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-700"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1" />
              Back
            </button>
          )}
          <button
            onClick={currentStep === totalSteps ? onClose : handleNext}
            className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {currentStep === totalSteps ? 'Complete Booking' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueBookingFlow; 