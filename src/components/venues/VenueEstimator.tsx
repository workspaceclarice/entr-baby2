import React, { useState, useEffect } from 'react';
import { Venue } from '../../types/venue';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface VenueEstimatorProps {
  venue: Venue;
  onBookNow: () => void;
}

const VenueEstimator: React.FC<VenueEstimatorProps> = ({ venue, onBookNow }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeError, setTimeError] = useState<string | null>(null);
  const [additionalItems, setAdditionalItems] = useState([
    { id: 'setup', name: 'Setup & Cleanup', price: 250, selected: false },
    { id: 'security', name: 'Security Staff', price: 200, selected: false },
    { id: 'av', name: 'AV Equipment', price: 300, selected: false }
  ]);

  // Validate time selection
  useEffect(() => {
    const validateTimes = () => {
      if (!startTime || !endTime) return null;

      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      
      const startDate = new Date();
      startDate.setHours(startHour, startMinute);
      
      const endDate = new Date();
      endDate.setHours(endHour, endMinute);

      const hoursDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

      if (endDate <= startDate) {
        return "End time must be after start time";
      }
      if (hoursDiff < venue.minimumHours) {
        return `Minimum booking duration is ${venue.minimumHours} hours`;
      }
      if (hoursDiff > 12) {
        return "Maximum booking duration is 12 hours";
      }
      return null;
    };

    setTimeError(validateTimes());
  }, [startTime, endTime, venue.minimumHours]);

  const calculateHours = () => {
    if (!startTime || !endTime || timeError) return 0;
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;
    return Math.max(0, (end - start) / 60);
  };

  const calculateTotal = () => {
    const hours = calculateHours();
    const baseTotal = hours * venue.pricePerHour;
    const addonsTotal = additionalItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price, 0);
    
    return baseTotal + addonsTotal;
  };

  const toggleItem = (itemId: string) => {
    setAdditionalItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const standardHour = hour % 12 || 12;
    return `${standardHour}:${minutes} ${ampm}`;
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
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  timeError ? 'border-red-300' : 'border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  timeError ? 'border-red-300' : 'border-gray-300'
                }`}
              />
            </div>
          </div>
          {timeError ? (
            <div className="flex items-center text-sm text-red-600">
              <ExclamationCircleIcon className="h-4 w-4 mr-1" />
              {timeError}
            </div>
          ) : startTime && endTime && (
            <div className="text-sm text-gray-500">
              Duration: {calculateHours()} hours
            </div>
          )}
        </div>
      </div>

      {/* Additional Items */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Items</h3>
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
          onClick={onBookNow}
          disabled={!date || !startTime || !endTime || !!timeError}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Book Now
        </button>
        {(!date || !startTime || !endTime || timeError) && (
          <p className="text-sm text-gray-500 text-center mt-2">
            {timeError || 'Please select date and time to continue'}
          </p>
        )}
      </div>
    </div>
  );
};

export default VenueEstimator; 