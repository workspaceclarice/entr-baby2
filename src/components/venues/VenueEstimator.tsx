'use client';

import React, { useState, useEffect } from 'react';
import { Venue, VenuePackage, AddOn } from '../../types/venue';
import { ExclamationCircleIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface VenueEstimatorProps {
  venue: Venue;
  onBookingClick: (selectedItems: AddOn[]) => void;
  initialPackage?: VenuePackage | null;
}

const VenueEstimator = ({ 
  venue, 
  onBookingClick,
  initialPackage = null 
}: VenueEstimatorProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [timeError, setTimeError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<VenuePackage | null>(initialPackage);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [selectedModalPackage, setSelectedModalPackage] = useState<VenuePackage | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>(
    venue.addOns.map(addOn => ({
      ...addOn,
      selected: false
    }))
  );

  const validateTimes = (start: string, end: string) => {
    if (!start || !end) return null;

    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    
    const startDate = new Date();
    startDate.setHours(startHour, startMinute);
    
    const endDate = new Date();
    endDate.setHours(endHour, endMinute);

    // Minimum 2 hours, maximum 12 hours
    const hoursDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

    if (endDate <= startDate) {
      return "End time must be after start time";
    }
    if (hoursDiff < 2) {
      return "Minimum booking duration is 2 hours";
    }
    if (hoursDiff > 12) {
      return "Maximum booking duration is 12 hours";
    }
    return null;
  };

  useEffect(() => {
    const error = validateTimes(startTime, endTime);
    setTimeError(error);
  }, [startTime, endTime]);

  const calculateHours = () => {
    if (!startTime || !endTime || timeError) return 0;
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startDate = new Date();
    startDate.setHours(startHour, startMinute);
    
    const endDate = new Date();
    endDate.setHours(endHour, endMinute);

    const hoursDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    return Math.max(0, hoursDiff);
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Add package price or base price * hours
    if (selectedPackage) {
      total += selectedPackage.price;
    } else {
      const hours = calculateHours();
      total += venue.basePrice * hours;
    }
    
    // Add selected additional items
    total += selectedAddOns
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price, 0);
    
    return total;
  };

  const toggleItem = (itemId: string) => {
    setSelectedAddOns(items =>
      items.map(item =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleBookNowClick = () => {
    onBookingClick(selectedAddOns);
    
    const bookingDetails = {
      date: selectedDate?.toISOString().split('T')[0] || null,
      startTime: startTime,
      endTime: endTime,
      selectedPackage: selectedPackage,
      addOns: selectedAddOns.filter(item => item.selected)
    };
    
    localStorage.setItem('venueBookingDetails', JSON.stringify(bookingDetails));
  };

  // Add time change handlers
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    setTimeError(validateTimes(newStartTime, endTime));
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    setTimeError(validateTimes(startTime, newEndTime));
  };

  // Package modal handlers
  const openPackageModal = (pkg: VenuePackage) => {
    setSelectedModalPackage(pkg);
    setIsPackageModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Date Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <input
          type="date"
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          min={new Date().toISOString().split('T')[0]}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      {/* Time Inputs */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Time
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
        {timeError && (
          <p className="mt-2 text-sm text-red-600">{timeError}</p>
        )}
      </div>

      {/* Packages */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Packages</h3>
        <div className="space-y-4">
          {venue.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-4 border rounded-lg ${
                selectedPackage?.id === pkg.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                  <p className="text-sm text-gray-500">{pkg.description}</p>
                  <p className="text-lg font-medium text-gray-900 mt-1">
                    ${pkg.price}
                  </p>
                </div>
                {pkg.isPopular && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Popular
                  </span>
                )}
              </div>
              
              <button
                onClick={() => openPackageModal(pkg)}
                className="mt-2 flex items-center text-sm text-purple-600 hover:text-purple-700"
              >
                View details
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Additional Items</h3>
        <div className="space-y-4">
          {selectedAddOns.map((addOn, index) => (
            <div
              key={addOn.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={addOn.selected}
                  onChange={() => {
                    const newAddOns = [...selectedAddOns];
                    newAddOns[index] = {
                      ...addOn,
                      selected: !addOn.selected
                    };
                    setSelectedAddOns(newAddOns);
                  }}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">{addOn.name}</h4>
                  <p className="text-sm text-gray-500">{addOn.description}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">
                ${addOn.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBookNowClick}
        disabled={!selectedDate || !startTime || !endTime || !!timeError}
        className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Book Now
      </button>
      {(!selectedDate || !startTime || !endTime || timeError) && (
        <p className="text-sm text-gray-500 text-center mt-2">
          {timeError || 'Please select date and time to continue'}
        </p>
      )}

      {/* Package Details Modal */}
      <Transition appear show={isPackageModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsPackageModalOpen(false)}
        >
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {selectedModalPackage?.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedModalPackage?.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsPackageModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Features</h4>
                        <ul className="space-y-2">
                          {selectedModalPackage?.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <svg
                                className="h-5 w-5 text-purple-500 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-900 font-medium">Price</span>
                          <span className="text-2xl font-semibold text-gray-900">
                            ${selectedModalPackage?.price}
                          </span>
                        </div>
                        {selectedModalPackage?.duration && (
                          <p className="text-sm text-gray-500 mt-1">
                            Duration: {selectedModalPackage.duration}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPackage(selectedModalPackage);
                        setIsPackageModalOpen(false);
                      }}
                      className="w-full mt-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      Select Package
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default VenueEstimator; 