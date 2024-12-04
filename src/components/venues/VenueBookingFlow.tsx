import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Venue } from '../../types/venue';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface VenueBookingFlowProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
}

type BookingStep = 'details' | 'review' | 'confirmation';

export default function VenueBookingFlow({ venue, isOpen, onClose }: VenueBookingFlowProps) {
  const [step, setStep] = useState<BookingStep>('details');
  const [bookingDetails, setBookingDetails] = useState({
    date: null as Date | null,
    startTime: '',
    duration: 4,
    guests: 50,
    eventType: '',
    notes: ''
  });

  const basePrice = venue.pricePerHour * bookingDetails.duration;
  const guestFee = venue.pricePerGuest * bookingDetails.guests;
  const totalPrice = basePrice + guestFee;

  const handleSubmit = async () => {
    // TODO: Implement booking submission
    setStep('confirmation');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {step === 'details' && 'Book Venue'}
              {step === 'review' && 'Review Booking'}
              {step === 'confirmation' && 'Booking Confirmed'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {step === 'details' && (
              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date
                  </label>
                  <DatePicker
                    selected={bookingDetails.date}
                    onChange={(date) => setBookingDetails(prev => ({ ...prev, date }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholderText="Select date"
                    minDate={new Date()}
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <select
                    value={bookingDetails.startTime}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select time</option>
                    {venue.availability[bookingDetails.date?.getDay() === 0 ? 'sunday' : 
                      bookingDetails.date?.getDay() === 1 ? 'monday' :
                      bookingDetails.date?.getDay() === 2 ? 'tuesday' :
                      bookingDetails.date?.getDay() === 3 ? 'wednesday' :
                      bookingDetails.date?.getDay() === 4 ? 'thursday' :
                      bookingDetails.date?.getDay() === 5 ? 'friday' : 'saturday']
                      ?.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))
                    }
                  </select>
                </div>

                {/* Duration Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (hours)
                  </label>
                  <select
                    value={bookingDetails.duration}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, duration: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {[2, 3, 4, 5, 6, 8].map(hours => (
                      <option key={hours} value={hours}>{hours} hours</option>
                    ))}
                  </select>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    value={bookingDetails.guests}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, guests: Number(e.target.value) }))}
                    min={1}
                    max={venue.maxCapacity}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type
                  </label>
                  <input
                    type="text"
                    value={bookingDetails.eventType}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, eventType: e.target.value }))}
                    placeholder="e.g., Wedding, Corporate Event, Birthday"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    value={bookingDetails.notes}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Date</dt>
                      <dd className="text-sm text-gray-900">
                        {bookingDetails.date?.toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Time</dt>
                      <dd className="text-sm text-gray-900">{bookingDetails.startTime}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Duration</dt>
                      <dd className="text-sm text-gray-900">{bookingDetails.duration} hours</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Guests</dt>
                      <dd className="text-sm text-gray-900">{bookingDetails.guests}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Price Breakdown</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Venue Fee ({bookingDetails.duration} hours)</dt>
                      <dd className="text-sm text-gray-900">${basePrice}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Guest Fee ({bookingDetails.guests} guests)</dt>
                      <dd className="text-sm text-gray-900">${guestFee}</dd>
                    </div>
                    <div className="flex justify-between font-medium pt-3 border-t">
                      <dt className="text-gray-900">Total</dt>
                      <dd className="text-gray-900">${totalPrice}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {step === 'confirmation' && (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <CheckIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-sm text-gray-500">
                  We've sent a confirmation email with all the details.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t rounded-b-lg">
            {step === 'details' && (
              <button
                onClick={() => setStep('review')}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
              >
                Continue to Review
              </button>
            )}

            {step === 'review' && (
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('details')}
                  className="flex-1 bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                >
                  Confirm Booking
                </button>
              </div>
            )}

            {step === 'confirmation' && (
              <button
                onClick={onClose}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
} 