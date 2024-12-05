'use client';

import React, { useState, useEffect } from 'react';
import { Venue } from '../../types/venue';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export interface VenueEstimatorProps {
  venue: Venue;
  onBookNow: () => void;
}

interface AdditionalItem {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

const VenueEstimator: React.FC<VenueEstimatorProps> = ({ venue, onBookNow }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(4);
  const [guestCount, setGuestCount] = useState(50);
  const [timeError, setTimeError] = useState<string | null>(null);
  const [additionalItems, setAdditionalItems] = useState<AdditionalItem[]>([
    { id: 'setup', name: 'Setup & Cleanup', price: 250, selected: false },
    { id: 'security', name: 'Security Staff', price: 200, selected: false },
    { id: 'av', name: 'AV Equipment', price: 300, selected: false },
    { id: 'decor', name: 'Basic Decor Package', price: 400, selected: false },
  ]);

  const validateTime = (time: string) => {
    if (!time) return null;
    const hour = parseInt(time.split(':')[0]);
    if (hour < 8 || hour > 22) {
      return "Booking hours are between 8 AM and 10 PM";
    }
    return null;
  };

  useEffect(() => {
    const error = validateTime(startTime);
    setTimeError(error);
  }, [startTime]);

  const calculateTotal = () => {
    const basePrice = venue.pricePerHour * duration;
    const guestFee = venue.pricePerGuest * guestCount;
    const additionalItemsTotal = additionalItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price, 0);

    return basePrice + guestFee + additionalItemsTotal;
  };

  const toggleItem = (itemId: string) => {
    setAdditionalItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleBookNow = () => {
    onBookNow();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Date and Time Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Date & Time</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholderText="Select date"
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
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  timeError ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select time</option>
                {Array.from({ length: 15 }, (_, i) => i + 8).map((hour) => (
                  <option key={hour} value={`${hour}:00`}>
                    {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {[4, 5, 6, 7, 8].map((hours) => (
                  <option key={hours} value={hours}>{hours} hours</option>
                ))}
              </select>
            </div>
          </div>
          {timeError && (
            <div className="flex items-center text-sm text-red-600">
              <ExclamationCircleIcon className="h-4 w-4 mr-1" />
              {timeError}
            </div>
          )}
        </div>
      </div>

      {/* Guest Count */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Number of Guests</h3>
        <input
          type="number"
          value={guestCount}
          onChange={(e) => setGuestCount(Math.min(parseInt(e.target.value), venue.maxCapacity))}
          min="1"
          max={venue.maxCapacity}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">Maximum capacity: {venue.maxCapacity} guests</p>
      </div>

      {/* Additional Items */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Services</h3>
        <div className="space-y-3">
          {additionalItems.map((item) => (
            <label
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItem(item.id)}
                  className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                />
                <span className="ml-3 text-gray-900">{item.name}</span>
              </div>
              <span className="text-gray-600">${item.price}</span>
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
          onClick={handleBookNow}
          disabled={!selectedDate || !startTime || !!timeError}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Book Now
        </button>
        {(!selectedDate || !startTime || timeError) && (
          <p className="text-sm text-gray-500 text-center mt-2">
            {timeError || 'Please select date and time to continue'}
          </p>
        )}
      </div>
    </div>
  );
};

export default VenueEstimator; 