import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Venue } from '../../types/venue';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface VenueBookingFlowProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'availability' | 'details' | 'review';

// Helper functions
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const hour = parseInt(hours.toString());
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const standardHour = hour % 12 || 12;
  return `${standardHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function VenueBookingFlow({ venue, isOpen, onClose }: VenueBookingFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('availability');
  const [bookingDetails, setBookingDetails] = useState({
    date: null as Date | null,
    startTime: '',
    duration: 4,
    guests: 50,
    eventType: '',
    notes: ''
  });

  const steps = [
    { id: 'availability', name: 'Select Date & Time' },
    { id: 'details', name: 'Event Details' },
    { id: 'review', name: 'Review & Pay' }
  ];

  const handleStepClick = (step: Step) => {
    if (step === 'details' && !bookingDetails.date) return;
    if (step === 'review' && !bookingDetails.eventType) return;
    setCurrentStep(step);
  };

  const calculateTotal = () => {
    const basePrice = venue.pricePerHour * bookingDetails.duration;
    const guestFee = venue.pricePerGuest * bookingDetails.guests;
    return basePrice + guestFee;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

        <div className="relative bg-white rounded-xl max-w-2xl w-full mx-4 my-8">
          {/* Header */}
          <div className="border-b px-6 py-4 sticky top-0 bg-white rounded-t-xl z-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold">Book Venue</h2>
          </div>

          {/* Steps */}
          <div className="border-b sticky top-[73px] bg-white z-10">
            <div className="px-6 py-4">
              <nav className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id as Step)}
                    className={`flex items-center ${
                      index < steps.findIndex(s => s.id === currentStep)
                        ? 'text-purple-600'
                        : index === steps.findIndex(s => s.id === currentStep)
                          ? 'text-purple-600'
                          : 'text-gray-400'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 
                      ${index <= steps.findIndex(s => s.id === currentStep)
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="ml-2 text-sm font-medium">{step.name}</span>
                    {index < steps.length - 1 && (
                      <ChevronRightIcon className="w-5 h-5 mx-3 text-gray-300" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-250px)]">
            {currentStep === 'availability' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <DatePicker
                    selected={bookingDetails.date}
                    onChange={(date) => setBookingDetails(prev => ({ ...prev, date }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholderText="Select date"
                    minDate={new Date()}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <select
                    value={bookingDetails.startTime}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select time</option>
                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                      <option key={time} value={time}>{formatTime(time)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (hours)
                  </label>
                  <select
                    value={bookingDetails.duration}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {[4, 5, 6, 7, 8].map((hours) => (
                      <option key={hours} value={hours}>{hours} hours</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {currentStep === 'details' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    value={bookingDetails.eventType}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, eventType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    value={bookingDetails.guests}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                    min="1"
                    max={venue.maxCapacity}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={bookingDetails.notes}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Any special requirements or requests?"
                  />
                </div>
              </div>
            )}

            {currentStep === 'review' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h3>
                  
                  {/* Venue Details */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start space-x-4">
                        <img
                          src={venue.images[0]}
                          alt={venue.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h5 className="font-medium">{venue.name}</h5>
                          <p className="text-sm text-gray-600">{venue.location.city}, {venue.location.state}</p>
                        </div>
                      </div>
                    </div>

                    {/* Date and Time */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Date & Time</h4>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date</span>
                            <span className="font-medium">
                              {bookingDetails.date && formatDate(bookingDetails.date)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time</span>
                            <span className="font-medium">
                              {formatTime(bookingDetails.startTime)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration</span>
                            <span className="font-medium">{bookingDetails.duration} hours</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Event Details</h4>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Event Type</span>
                            <span className="font-medium capitalize">{bookingDetails.eventType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Guests</span>
                            <span className="font-medium">{bookingDetails.guests}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Price Breakdown</h4>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Venue Fee ({bookingDetails.duration} hours)</span>
                            <span className="font-medium">${venue.pricePerHour * bookingDetails.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Guest Fee ({bookingDetails.guests} guests)</span>
                            <span className="font-medium">${venue.pricePerGuest * bookingDetails.guests}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t">
                            <span className="font-medium">Total</span>
                            <span className="font-medium">${calculateTotal()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 sticky bottom-0 bg-white rounded-b-xl">
            <div className="flex justify-between items-center">
              {currentStep !== 'availability' && (
                <button
                  onClick={() => setCurrentStep(steps[steps.findIndex(s => s.id === currentStep) - 1].id as Step)}
                  className="flex items-center text-gray-600 hover:text-gray-700"
                >
                  <ChevronLeftIcon className="w-5 h-5 mr-1" />
                  Back
                </button>
              )}
              {currentStep === 'review' ? (
                <button
                  className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Pay Now
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(steps[steps.findIndex(s => s.id === currentStep) + 1].id as Step)}
                  disabled={
                    (currentStep === 'availability' && (!bookingDetails.date || !bookingDetails.startTime)) ||
                    (currentStep === 'details' && !bookingDetails.eventType)
                  }
                  className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
} 