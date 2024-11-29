import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '../../types';

interface BookingFlowProps {
  service: Service;
  selectedPackage: string | null;
  selectedAddons: string[];
  date: string;
  time: string;
  onClose: () => void;
}

// Mock available time slots - in real app, this would come from API
const timeSlots = [
  { start: '09:00', end: '13:00', available: true },
  { start: '10:00', end: '14:00', available: true },
  { start: '11:00', end: '15:00', available: false },
  { start: '12:00', end: '16:00', available: true },
  { start: '13:00', end: '17:00', available: true },
  { start: '14:00', end: '18:00', available: false },
  { start: '15:00', end: '19:00', available: true },
  { start: '16:00', end: '20:00', available: true },
  { start: '17:00', end: '21:00', available: true },
  { start: '18:00', end: '22:00', available: true },
  { start: '19:00', end: '23:00', available: false },
  { start: '20:00', end: '00:00', available: true },
];

const ServiceBookingFlow: React.FC<BookingFlowProps> = ({
  service,
  selectedPackage,
  selectedAddons,
  date,
  onClose
}) => {
  const [step, setStep] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    eventType: '',
    guestCount: '',
    specialRequests: '',
    name: '',
    email: '',
    phone: ''
  });

  const calculateTotal = () => {
    if (!selectedPackage || !service.packages) return 0;
    const package_ = service.packages.find((p: any) => p.id === selectedPackage);
    if (!package_) return 0;

    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = service.addons?.find((a: any) => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);

    return package_.price + addonsTotal;
  };

  const handleSubmit = async () => {
    setStep(4);
  };

  const renderTimeSlots = () => (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {timeSlots.map((slot) => (
        <button
          key={`${slot.start}-${slot.end}`}
          onClick={() => slot.available && setSelectedTimeSlot(`${slot.start}-${slot.end}`)}
          disabled={!slot.available}
          className={`
            p-3 rounded-lg text-sm font-medium text-center
            ${!slot.available 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : selectedTimeSlot === `${slot.start}-${slot.end}`
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500'
            }
          `}
        >
          <div className="flex flex-col">
            <span>{slot.start} - {slot.end}</span>
            <span className={`text-xs mt-1 ${!slot.available ? 'text-red-400' : 'text-green-500'}`}>
              {slot.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </button>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Select Time</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Time Slots for {new Date(date).toLocaleDateString()}
              </label>
              {renderTimeSlots()}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => selectedTimeSlot && setStep(2)}
                disabled={!selectedTimeSlot}
                className={`px-6 py-2 rounded-lg font-medium
                  ${selectedTimeSlot
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Event Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Type</label>
              <select
                value={bookingDetails.eventType}
                onChange={(e) => setBookingDetails({...bookingDetails, eventType: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select event type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="birthday">Birthday Party</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Guest Count</label>
              <input
                type="number"
                value={bookingDetails.guestCount}
                onChange={(e) => setBookingDetails({...bookingDetails, guestCount: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Special Requests</label>
              <textarea
                value={bookingDetails.specialRequests}
                onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Review & Confirm</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Package</span>
                <span className="font-medium">
                  {service.packages?.find((p: any) => p.id === selectedPackage)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-bold">${calculateTotal()}</span>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckIcon className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold">Booking Request Sent!</h3>
            <p className="text-gray-600">
              {service.vendorName} will confirm your booking soon. You'll receive an email with further details.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-lg w-full mx-4 p-6">
        {step < 4 && (
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-2 h-2 rounded-full ${
                    s <= step ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        )}

        {renderStep()}

        {step < 4 && (
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Back
              </button>
            )}
            <button
              onClick={() => step === 3 ? handleSubmit() : setStep(step + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
            >
              {step === 3 ? 'Confirm Booking' : 'Continue'}
            </button>
          </div>
        )}

        {step === 4 && (
          <button
            onClick={onClose}
            className="mt-6 w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default ServiceBookingFlow; 