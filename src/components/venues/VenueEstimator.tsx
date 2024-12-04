import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Venue, VenuePackage, VenueAddOn } from '../../types/venue';
import { CheckIcon } from '@heroicons/react/24/outline';

interface VenueEstimatorProps {
  venue: Venue;
  onBookNow: () => void;
}

export default function VenueEstimator({ venue, onBookNow }: VenueEstimatorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('');
  const [duration, setDuration] = useState(4);
  const [selectedPackage, setSelectedPackage] = useState<VenuePackage | null>(null);
  const [guests, setGuests] = useState(50);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Calculate end time based on start time and duration
  const getEndTime = () => {
    if (!startTime) return '';
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + duration;
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const calculateTotal = () => {
    let total = 0;

    // Package price
    if (selectedPackage) {
      total += selectedPackage.price;
    } else {
      // Base pricing if no package selected
      total += venue.pricePerHour * duration;
      total += venue.pricePerGuest * guests;
    }

    // Add-ons
    selectedAddOns.forEach(addOnId => {
      const addOn = venue.addOns.find(a => a.id === addOnId);
      if (addOn) {
        switch (addOn.priceType) {
          case 'flat':
            total += addOn.price;
            break;
          case 'per_hour':
            total += addOn.price * duration;
            break;
          case 'per_guest':
            total += addOn.price * guests;
            break;
        }
      }
    });

    return total;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
      <div className="space-y-6">
        {/* Date & Time Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholderText="Select date"
              minDate={new Date()}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select time</option>
                {venue.availability[selectedDate?.getDay() === 0 ? 'sunday' : 
                  selectedDate?.getDay() === 1 ? 'monday' :
                  selectedDate?.getDay() === 2 ? 'tuesday' :
                  selectedDate?.getDay() === 3 ? 'wednesday' :
                  selectedDate?.getDay() === 4 ? 'thursday' :
                  selectedDate?.getDay() === 5 ? 'friday' : 'saturday']
                  ?.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))
                }
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="text"
                value={getEndTime()}
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {[2, 3, 4, 5, 6, 8].map(hours => (
                <option key={hours} value={hours}>{hours} hours</option>
              ))}
            </select>
          </div>
        </div>

        {/* Packages Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select a Package</h3>
          <div className="space-y-4">
            {venue.packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(selectedPackage?.id === pkg.id ? null : pkg)}
                className={`
                  cursor-pointer rounded-lg border-2 p-4 transition-colors
                  ${selectedPackage?.id === pkg.id 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-200'
                  }
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                    <p className="text-sm text-gray-500">{pkg.description}</p>
                  </div>
                  <span className="font-medium text-gray-900">${pkg.price}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Services</h3>
          <div className="space-y-3">
            {venue.addOns.map((addOn) => (
              <label
                key={addOn.id}
                className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(addOn.id)}
                  onChange={(e) => {
                    setSelectedAddOns(prev => 
                      e.target.checked 
                        ? [...prev, addOn.id]
                        : prev.filter(id => id !== addOn.id)
                    );
                  }}
                  className="mt-1 h-4 w-4 text-purple-600 rounded"
                />
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">{addOn.name}</span>
                    <span className="text-gray-900">
                      ${addOn.price}
                      {addOn.priceType === 'per_hour' && '/hour'}
                      {addOn.priceType === 'per_guest' && '/guest'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{addOn.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-medium text-gray-900">
            <span>Total Estimate</span>
            <span>${calculateTotal()}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Includes venue rental, selected package, and add-ons
          </p>
        </div>

        {/* Book Now Button */}
        <button
          onClick={onBookNow}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
} 