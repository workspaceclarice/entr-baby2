'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Service, ServicePackage, AdditionalItem } from '../../types/service';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export interface ServiceBookingFlowProps {
  service: Service;
  selectedPackage: ServicePackage | null;
  initialDate: string;
  initialStartTime: string;
  initialEndTime: string;
  additionalItems: AdditionalItem[];
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

const ServiceBookingFlow = ({
  service,
  selectedPackage,
  initialDate,
  initialStartTime,
  initialEndTime,
  additionalItems,
  isOpen,
  onClose
}: ServiceBookingFlowProps) => {
  // Add console logs to debug incoming props
  console.log('Service Booking Flow Props:', {
    initialDate,
    initialStartTime,
    initialEndTime,
    selectedPackage
  });

  // Helper functions first
  const parseInitialDate = () => {
    try {
      return initialDate ? new Date(initialDate) : null;
    } catch (error) {
      console.error('Error parsing date:', error);
      return null;
    }
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

  // Then state declarations
  const [currentStep, setCurrentStep] = useState<'details' | 'review'>('details');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: parseInitialDate(),
    startTime: initialStartTime,
    endTime: initialEndTime,
    duration: calculateHours(initialStartTime, initialEndTime),
    guests: 50,
    eventType: '',
    notes: '',
    usePackage: !!selectedPackage
  });

  // Effects
  useEffect(() => {
    setBookingDetails(prev => ({
      ...prev,
      date: parseInitialDate(),
      startTime: initialStartTime,
      endTime: initialEndTime,
      duration: calculateHours(initialStartTime, initialEndTime)
    }));
  }, [initialDate, initialStartTime, initialEndTime]);

  useEffect(() => {
    const storedDetails = localStorage.getItem('serviceBookingDetails');
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      setBookingDetails({
        date: details.date ? new Date(details.date) : null,
        startTime: details.startTime || '',
        endTime: details.endTime || '',
        duration: calculateHours(details.startTime, details.endTime),
        guests: 50,
        eventType: '',
        notes: '',
        usePackage: !!details.selectedPackage
      });
    }
  }, []);

  const steps = [
    { id: 'details' as const, name: 'Event Details' },
    { id: 'review' as const, name: 'Review & Pay' }
  ];

  const handleStepClick = (step: Step) => {
    if (step === 'details' && !bookingDetails.date) return;
    if (step === 'review' && !bookingDetails.eventType) return;
    setCurrentStep(step);
  };

  const calculateTotal = () => {
    let total = 0;
    
    if (bookingDetails.usePackage && selectedPackage) {
      total += selectedPackage.price;
    } else {
      const hours = calculateHours(bookingDetails.startTime, bookingDetails.endTime);
      total += service.basePrice * hours;
    }
    
    total += additionalItems.reduce((sum, item) => sum + item.price, 0);
    
    return total;
  };

  // Update review step content
  const renderDateTimeSection = () => {
    const storedDetails = localStorage.getItem('serviceBookingDetails');
    const details = storedDetails ? JSON.parse(storedDetails) : null;

    return (
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Date & Time</h4>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Selected Date</span>
              <span className="font-medium">
                {details?.date ? new Date(details.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Not set'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Time Slot</span>
              <span className="font-medium">
                {details?.startTime && details?.endTime
                  ? `${formatTime(details.startTime)} - ${formatTime(details.endTime)}`
                  : 'Not set'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Package</span>
              <span className="font-medium">
                {details?.selectedPackage ? details.selectedPackage.name : 'No package selected'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
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
              <Dialog.Panel className="relative bg-white rounded-xl max-w-2xl w-full mx-4 my-8">
                {/* Header */}
                <div className="border-b px-6 py-4 sticky top-0 bg-white rounded-t-xl z-10">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <h2 className="text-xl font-semibold">Book Service</h2>
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
                  {currentStep === 'details' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Event Type
                        </label>
                        <select
                          value={bookingDetails.eventType}
                          onChange={(e) => setBookingDetails({...bookingDetails, eventType: e.target.value})}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
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
                          onChange={(e) => setBookingDetails({...bookingDetails, guests: parseInt(e.target.value)})}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Enter number of guests"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          value={bookingDetails.notes}
                          onChange={(e) => setBookingDetails({...bookingDetails, notes: e.target.value})}
                          rows={4}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Any special requirements or notes for the vendor"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 'review' && (
                    <div className="space-y-6">
                      {renderDateTimeSection()}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h3>
                        
                        {/* Service Details */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Service</h4>
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-start space-x-4">
                                <img
                                  src={service.profileImage}
                                  alt={service.title}
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                  <h5 className="font-medium">{service.title}</h5>
                                  <p className="text-sm text-gray-600">{service.vendorName}</p>
                                  {selectedPackage && (
                                    <p className="text-sm text-purple-600 mt-1">{selectedPackage.name}</p>
                                  )}
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
                                  <span className="font-medium">{bookingDetails.eventType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Guest Count</span>
                                  <span className="font-medium">{bookingDetails.guests}</span>
                                </div>
                                {bookingDetails.notes && (
                                  <div className="pt-2 border-t">
                                    <span className="text-gray-600 block mb-1">Additional Notes</span>
                                    <p className="text-sm">{bookingDetails.notes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Additional Items */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Items</h4>
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="space-y-2">
                                {additionalItems.map((item) => (
                                  <div key={item.id} className="flex justify-between items-start">
                                    <div>
                                      <span className="text-gray-900">{item.name}</span>
                                      <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                    <span className="font-medium">${item.price}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Price Breakdown */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Price Breakdown</h4>
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="space-y-3">
                                {bookingDetails.usePackage && selectedPackage ? (
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <span className="text-gray-600">Package: {selectedPackage.name}</span>
                                      <p className="text-sm text-gray-500">{selectedPackage.description}</p>
                                    </div>
                                    <span className="font-medium">${selectedPackage.price}</span>
                                  </div>
                                ) : (
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <span className="text-gray-600">
                                        Hourly Rate ({formatTime(bookingDetails.startTime)} - {formatTime(bookingDetails.endTime)})
                                      </span>
                                      <p className="text-sm text-gray-500">
                                        ${service.basePrice}/hour × {calculateHours(bookingDetails.startTime, bookingDetails.endTime)} hours
                                      </p>
                                    </div>
                                    <span className="font-medium">
                                      ${service.basePrice * calculateHours(bookingDetails.startTime, bookingDetails.endTime)}
                                    </span>
                                  </div>
                                )}
                                
                                {additionalItems.length > 0 && (
                                  <>
                                    <div className="text-sm text-gray-600 pt-2">Additional Items:</div>
                                    {additionalItems.map(item => (
                                      <div key={item.id} className="flex justify-between pl-4">
                                        <span className="text-gray-600">{item.name}</span>
                                        <span className="font-medium">${item.price}</span>
                                      </div>
                                    ))}
                                  </>
                                )}
                                
                                <div className="flex justify-between pt-3 border-t">
                                  <span className="font-medium text-gray-900">Total</span>
                                  <span className="font-medium text-gray-900">${calculateTotal()}</span>
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
                    {currentStep !== 'details' && (
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
                          (currentStep === 'details' && !bookingDetails.eventType)
                        }
                        className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Continue
                      </button>
                    )}
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

export default ServiceBookingFlow; 