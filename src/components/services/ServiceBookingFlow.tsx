'use client';

import React, { useState, useEffect } from 'react';
import { Service, ServicePackage } from '../../types/service';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface BookingFlowProps {
  service: Service;
  selectedPackage: ServicePackage | null;
  initialDate?: string;
  initialStartTime?: string;
  initialEndTime?: string;
  additionalItems: AdditionalItem[];
  onClose: () => void;
}

interface AdditionalItem {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

type Step = 'availability' | 'details' | 'review';

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
  selected?: boolean;
}

// Helper function to convert 24h to 12h format
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const standardHour = hour % 12 || 12;
  return `${standardHour}:${minutes} ${ampm}`;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const ServiceBookingFlow: React.FC<BookingFlowProps> = ({
  service,
  selectedPackage,
  initialDate,
  initialStartTime,
  initialEndTime,
  additionalItems,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('availability');
  const [bookingDate, setBookingDate] = useState(initialDate || '');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(
    initialStartTime && initialEndTime
      ? { startTime: initialStartTime, endTime: initialEndTime, available: true }
      : null
  );
  const [eventDetails, setEventDetails] = useState({
    eventType: '',
    guestCount: '',
    notes: ''
  });

  // Generate time slots based on service hours and initial selection
  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const startHour = 6; // 6 AM
    const endHour = 23; // 11 PM

    // If we have initial times, calculate the duration
    const getInitialDuration = () => {
      if (!initialStartTime || !initialEndTime) return 4; // default duration
      const [startHour] = initialStartTime.split(':').map(Number);
      const [endHour] = initialEndTime.split(':').map(Number);
      return endHour - startHour;
    };

    const duration = getInitialDuration();

    // Mock unavailable slots - you would typically get this from an API
    const unavailableSlots = [
      { start: '13:00', end: '17:00' }, // 1 PM - 5 PM
      { start: '18:00', end: '20:00' }  // 6 PM - 8 PM
    ];

    // Helper to check if a slot is unavailable
    const isSlotUnavailable = (start: string, end: string) => {
      return unavailableSlots.some(slot => {
        const slotStart = parseInt(slot.start);
        const slotEnd = parseInt(slot.end);
        const checkStart = parseInt(start);
        const checkEnd = parseInt(end);
        return (checkStart >= slotStart && checkStart < slotEnd) ||
               (checkEnd > slotStart && checkEnd <= slotEnd) ||
               (checkStart <= slotStart && checkEnd >= slotEnd);
      });
    };

    // Helper to check if this is the initially selected slot
    const isInitialSlot = (start: string, end: string) => {
      return start === initialStartTime && end === initialEndTime;
    };

    // Generate slots based on the duration from estimator
    for (let hour = startHour; hour <= endHour - duration; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = `${(hour + duration).toString().padStart(2, '0')}:00`;
      
      slots.push({
        startTime,
        endTime,
        available: !isSlotUnavailable(startTime, endTime),
        selected: isInitialSlot(startTime, endTime)
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Auto-select the initial time slot if provided
  useEffect(() => {
    if (initialStartTime && initialEndTime) {
      const initialSlot = timeSlots.find(
        slot => slot.startTime === initialStartTime && slot.endTime === initialEndTime
      );
      if (initialSlot && initialSlot.available) {
        setSelectedSlot(initialSlot);
      }
    }
  }, [initialStartTime, initialEndTime]);

  const renderTimeSlots = () => {
    return (
      <div className="grid grid-cols-2 gap-3">
        {timeSlots.map((slot, index) => {
          const isSelected = selectedSlot?.startTime === slot.startTime;
          const isInitialTime = slot.startTime === initialStartTime;

          return (
            <button
              key={index}
              onClick={() => slot.available && setSelectedSlot(slot)}
              disabled={!slot.available}
              className={`
                p-3 rounded-lg text-sm font-medium text-center transition-colors
                ${!slot.available 
                  ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  : isSelected || isInitialTime
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                    : 'bg-white border border-gray-200 hover:border-purple-500'
                }
                ${isInitialTime && !isSelected ? 'ring-2 ring-purple-200' : ''}
              `}
            >
              <div>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</div>
              {!slot.available && (
                <div className="text-xs mt-1 text-red-400">Unavailable</div>
              )}
              {isInitialTime && !isSelected && (
                <div className="text-xs mt-1 text-purple-600">Selected in estimator</div>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  // Calculate total including add-ons
  const calculateTotal = () => {
    if (!selectedSlot) return 0;
    const basePrice = selectedPackage?.price || service.basePrice;
    const [startHour] = selectedSlot.startTime.split(':').map(Number);
    const [endHour] = selectedSlot.endTime.split(':').map(Number);
    const duration = endHour - startHour;
    const serviceTotal = basePrice * (duration / 4);

    const addOnsTotal = additionalItems.reduce((sum, item) => sum + item.price, 0);

    return serviceTotal + addOnsTotal;
  };

  const steps = [
    { id: 'availability', name: 'Select Time' },
    { id: 'details', name: 'Event Details' },
    { id: 'review', name: 'Review & Pay' }
  ];

  const handleStepClick = (step: Step) => {
    if (step === 'details' && !selectedSlot) return;
    if (step === 'review' && !eventDetails.eventType) return;
    setCurrentStep(step);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'availability':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {bookingDate && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Available Time Slots for {formatDate(bookingDate)}
                </h3>
                {renderTimeSlots()}
                <p className="text-sm text-gray-500 mt-4">
                  * Time slots are in {formatTime('09:00')} - {formatTime('21:00')} range
                </p>
              </div>
            )}
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type
              </label>
              <select
                value={eventDetails.eventType}
                onChange={(e) => setEventDetails({ ...eventDetails, eventType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                value={eventDetails.guestCount}
                onChange={(e) => setEventDetails({ ...eventDetails, guestCount: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter number of guests"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={eventDetails.notes}
                onChange={(e) => setEventDetails({ ...eventDetails, notes: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Any special requirements or notes for the vendor"
              />
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
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

                {/* Date and Time */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Date & Time</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium">{formatDate(bookingDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time</span>
                        <span className="font-medium">
                          {selectedSlot && `${formatTime(selectedSlot.startTime)} - ${formatTime(selectedSlot.endTime)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">
                          {selectedSlot && 
                            `${parseInt(selectedSlot.endTime) - parseInt(selectedSlot.startTime)} hours`}
                        </span>
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
                        <span className="font-medium">{eventDetails.eventType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guest Count</span>
                        <span className="font-medium">{eventDetails.guestCount}</span>
                      </div>
                      {eventDetails.notes && (
                        <div className="pt-2 border-t">
                          <span className="text-gray-600 block mb-1">Additional Notes</span>
                          <p className="text-sm">{eventDetails.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Items */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Items</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    {additionalItems.some(item => item.selected) ? (
                      <div className="space-y-2">
                        {additionalItems
                          .filter(item => item.selected)
                          .map((item) => (
                            <div key={item.id} className="flex justify-between">
                              <span className="text-gray-600">{item.name}</span>
                              <span className="font-medium">${item.price}</span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No additional items selected</p>
                    )}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Price Details</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="space-y-2">
                      {/* Base Price */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Rate</span>
                        <span className="font-medium">${service.basePrice}/hour</span>
                      </div>

                      {/* Duration */}
                      {selectedSlot && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium">
                            {parseInt(selectedSlot.endTime) - parseInt(selectedSlot.startTime)} hours
                          </span>
                        </div>
                      )}

                      {/* Package */}
                      {selectedPackage && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Package</span>
                          <span className="font-medium">${selectedPackage.price}</span>
                        </div>
                      )}

                      {/* Add-ons */}
                      {additionalItems.some(item => item.selected) && (
                        <>
                          <div className="border-t pt-2 mt-2">
                            <div className="text-sm font-medium text-gray-700 mb-2">
                              Additional Items
                            </div>
                            {additionalItems
                              .filter(item => item.selected)
                              .map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                  <span className="text-gray-600">{item.name}</span>
                                  <span className="font-medium">${item.price}</span>
                                </div>
                              ))}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Add-ons Subtotal</span>
                            <span className="font-medium">
                              ${additionalItems
                                .filter(item => item.selected)
                                .reduce((sum, item) => sum + item.price, 0)
                              }
                            </span>
                          </div>
                        </>
                      )}

                      {/* Total */}
                      <div className="pt-2 border-t mt-2">
                        <div className="flex justify-between text-lg font-medium">
                          <span>Total</span>
                          <span>${calculateTotal()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          All prices include applicable taxes and fees
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 my-8 relative">
        {/* Header */}
        <div className="border-b px-6 py-4 sticky top-0 bg-white rounded-t-xl z-10">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
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
          {currentStep === 'review' ? (
            <div className="space-y-6">
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

                  {/* Date and Time */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Date & Time</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date</span>
                          <span className="font-medium">{formatDate(bookingDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time</span>
                          <span className="font-medium">
                            {selectedSlot && `${formatTime(selectedSlot.startTime)} - ${formatTime(selectedSlot.endTime)}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium">
                            {selectedSlot && 
                              `${parseInt(selectedSlot.endTime) - parseInt(selectedSlot.startTime)} hours`}
                          </span>
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
                          <span className="font-medium">{eventDetails.eventType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Guest Count</span>
                          <span className="font-medium">{eventDetails.guestCount}</span>
                        </div>
                        {eventDetails.notes && (
                          <div className="pt-2 border-t">
                            <span className="text-gray-600 block mb-1">Additional Notes</span>
                            <p className="text-sm">{eventDetails.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Items */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Items</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      {additionalItems.some(item => item.selected) ? (
                        <div className="space-y-2">
                          {additionalItems
                            .filter(item => item.selected)
                            .map((item) => (
                              <div key={item.id} className="flex justify-between">
                                <span className="text-gray-600">{item.name}</span>
                                <span className="font-medium">${item.price}</span>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No additional items selected</p>
                      )}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Price Details</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="space-y-2">
                        {/* Base Price */}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Rate</span>
                          <span className="font-medium">${service.basePrice}/hour</span>
                        </div>

                        {/* Duration */}
                        {selectedSlot && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration</span>
                            <span className="font-medium">
                              {parseInt(selectedSlot.endTime) - parseInt(selectedSlot.startTime)} hours
                            </span>
                          </div>
                        )}

                        {/* Package */}
                        {selectedPackage && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Package</span>
                            <span className="font-medium">${selectedPackage.price}</span>
                          </div>
                        )}

                        {/* Add-ons */}
                        {additionalItems.some(item => item.selected) && (
                          <>
                            <div className="border-t pt-2 mt-2">
                              <div className="text-sm font-medium text-gray-700 mb-2">
                                Additional Items
                              </div>
                              {additionalItems
                                .filter(item => item.selected)
                                .map((item) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{item.name}</span>
                                    <span className="font-medium">${item.price}</span>
                                  </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Add-ons Subtotal</span>
                              <span className="font-medium">
                                ${additionalItems
                                  .filter(item => item.selected)
                                  .reduce((sum, item) => sum + item.price, 0)
                                }
                              </span>
                            </div>
                          </>
                        )}

                        {/* Total */}
                        <div className="pt-2 border-t mt-2">
                          <div className="flex justify-between text-lg font-medium">
                            <span>Total</span>
                            <span>${calculateTotal()}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            All prices include applicable taxes and fees
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            renderStepContent()
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
                  (currentStep === 'availability' && !selectedSlot) ||
                  (currentStep === 'details' && !eventDetails.eventType)
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
  );
};

export default ServiceBookingFlow; 