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
    venue.addOns.map(item => ({
      ...item,
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
    onBookingClick(selectedAddOns.filter(item => item.selected));
    
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

  // Format date for input
  const formattedDate = selectedDate 
    ? selectedDate.toISOString().split('T')[0]
    : '';

  return (
    <div className="space-y-6">
      {/* Date and Time Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Date & Time</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formattedDate}
              onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
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
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <ExclamationCircleIcon className="h-5 w-5" />
              <span>{timeError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Packages Section - EXACT copy from ServiceEstimator */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Packages</h3>
        <div className="space-y-4">
          {venue.packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`p-4 border rounded-lg cursor-pointer ${
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
                onClick={(e) => {
                  e.stopPropagation(); // Prevent package selection when clicking details
                  openPackageModal(pkg);
                }}
                className="mt-2 flex items-center text-sm text-purple-600 hover:text-purple-700"
              >
                View details
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Items */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Items</h3>
        <div className="space-y-3">
          {selectedAddOns.map((item) => (
            <label
              key={item.id}
              className="flex items-start justify-between p-4 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start flex-1">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItem(item.id)}
                  className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <div className="ml-3">
                  <span className="block font-medium text-gray-900">
                    {item.name}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {item.description}
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">
                ${item.price}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Total and Book Button */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-900 font-medium">Estimated Total</span>
          <span className="text-2xl font-semibold text-gray-900">
            ${calculateTotal()}
          </span>
        </div>
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
      </div>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-start mb-4"
                  >
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
                  </Dialog.Title>

                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Features</h4>
                      <ul className="space-y-2">
                        {selectedModalPackage?.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <svg
                              className="h-5 w-5 text-purple-500 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
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