'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Venue, VenuePackage, AddOn } from '../../types/venue';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export interface VenueBookingFlowProps {
  venue: Venue;
  selectedPackage: VenuePackage | null;
  initialDate: string;
  initialStartTime: string;
  initialEndTime: string;
  additionalItems: AddOn[];
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'details' | 'review';

// Helper functions
const formatTime = (time: string | undefined) => {
  if (!time) return 'Not set';
  
  try {
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 'Invalid time';
    
    const hour = parseInt(hours.toString());
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const standardHour = hour % 12 || 12;
    return `${standardHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  } catch (error) {
    return 'Invalid time';
  }
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const calculateHours = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return 0;
  
  try {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startDate = new Date();
    startDate.setHours(startHour, startMinute);
    
    const endDate = new Date();
    endDate.setHours(endHour, endMinute);
    
    const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    return Math.max(0, hours);
  } catch (error) {
    return 0;
  }
};

interface BookingDetails {
  date: Date | null;
  startTime: string;
  endTime: string;
  duration: number;
  guests: number;
  eventType: string;
  notes: string;
  usePackage: boolean;
}

const VenueBookingFlow = ({
  venue,
  selectedPackage,
  initialDate,
  initialStartTime,
  initialEndTime,
  additionalItems,
  isOpen,
  onClose
}: VenueBookingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<'details' | 'review'>('details');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: initialDate ? new Date(initialDate) : null,
    startTime: initialStartTime,
    endTime: initialEndTime,
    duration: calculateHours(initialStartTime, initialEndTime),
    guests: 50,
    eventType: '',
    notes: '',
    usePackage: !!selectedPackage
  });

  const steps = [
    { id: 'details', name: 'Event Details' },
    { id: 'review', name: 'Review' }
  ];

  const calculateTotal = () => {
    let total = 0;
    
    if (bookingDetails.usePackage && selectedPackage) {
      total += selectedPackage.price;
    } else {
      const hours = calculateHours(bookingDetails.startTime, bookingDetails.endTime);
      total += venue.basePrice * hours;
    }
    
    total += additionalItems.reduce((sum, item) => sum + item.price, 0);
    
    return total;
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white">
                  {/* Header */}
                  <div className="border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Book {venue.name}
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Steps */}
                    <nav aria-label="Progress" className="mt-4">
                      <ol className="flex space-x-4">
                        {steps.map((step, stepIdx) => (
                          <li key={step.id} className="flex-1">
                            <div
                              className={`flex flex-col border-t-4 pt-4 ${
                                stepIdx <= steps.findIndex(s => s.id === currentStep)
                                  ? 'border-purple-600'
                                  : 'border-gray-200'
                              }`}
                            >
                              <span className="text-sm font-medium text-purple-600">
                                Step {stepIdx + 1}
                              </span>
                              <span className="text-sm font-medium">{step.name}</span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </div>

                  {/* Content */}
                  <div className="px-6 py-4">
                    {currentStep === 'details' ? (
                      <div className="space-y-6">
                        {/* Event Details Form */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Event Details
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Type
                              </label>
                              <select
                                value={bookingDetails.eventType}
                                onChange={(e) =>
                                  setBookingDetails({
                                    ...bookingDetails,
                                    eventType: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                              >
                                <option value="">Select Event Type</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Corporate">Corporate Event</option>
                                <option value="Birthday">Birthday Party</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Guests
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={bookingDetails.guests}
                                onChange={(e) =>
                                  setBookingDetails({
                                    ...bookingDetails,
                                    guests: parseInt(e.target.value),
                                  })
                                }
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Notes
                              </label>
                              <textarea
                                value={bookingDetails.notes}
                                onChange={(e) =>
                                  setBookingDetails({
                                    ...bookingDetails,
                                    notes: e.target.value,
                                  })
                                }
                                rows={3}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                placeholder="Any special requirements or requests..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Review Section */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Review Your Booking
                          </h3>
                          <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="block text-sm text-gray-500">Date</span>
                                  <span className="block font-medium">
                                    {bookingDetails.date
                                      ? formatDate(bookingDetails.date)
                                      : 'Not set'}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-gray-500">Time</span>
                                  <span className="block font-medium">
                                    {formatTime(bookingDetails.startTime)} -{' '}
                                    {formatTime(bookingDetails.endTime)}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-gray-500">
                                    Event Type
                                  </span>
                                  <span className="block font-medium">
                                    {bookingDetails.eventType || 'Not specified'}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-gray-500">
                                    Number of Guests
                                  </span>
                                  <span className="block font-medium">
                                    {bookingDetails.guests}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Selected Package */}
                            {selectedPackage && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  Selected Package
                                </h4>
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <span className="block font-medium text-gray-900">
                                        {selectedPackage.name}
                                      </span>
                                      <span className="block text-sm text-gray-500">
                                        {selectedPackage.description}
                                      </span>
                                    </div>
                                    <span className="font-medium">${selectedPackage.price}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Additional Items */}
                            {additionalItems.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  Additional Items
                                </h4>
                                <div className="space-y-2">
                                  {additionalItems.map((item) => (
                                    <div
                                      key={item.id}
                                      className="flex justify-between items-start p-4 border border-gray-200 rounded-lg"
                                    >
                                      <div>
                                        <span className="block font-medium text-gray-900">
                                          {item.name}
                                        </span>
                                        <span className="block text-sm text-gray-500">
                                          {item.description}
                                        </span>
                                      </div>
                                      <span className="font-medium">${item.price}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Total */}
                            <div className="border-t pt-4">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">Total</span>
                                <span className="text-2xl font-semibold text-gray-900">
                                  ${calculateTotal()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t px-6 py-4">
                    <div className="flex justify-between items-center">
                      {currentStep !== 'details' && (
                        <button
                          onClick={() => setCurrentStep('details')}
                          className="flex items-center text-gray-600 hover:text-gray-700"
                        >
                          <ChevronLeftIcon className="w-5 h-5 mr-1" />
                          Back
                        </button>
                      )}
                      {currentStep === 'review' ? (
                        <button className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Pay Now
                        </button>
                      ) : (
                        <button
                          onClick={() => setCurrentStep('review')}
                          disabled={!bookingDetails.eventType}
                          className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          Continue
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default VenueBookingFlow;