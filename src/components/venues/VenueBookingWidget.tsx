import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Venue } from '../../types';

interface VenueBookingWidgetProps {
  venue: Venue;
}

const VenueBookingWidget: React.FC<VenueBookingWidgetProps> = ({ venue }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const calculateTotal = () => {
    if (!selectedPackage || !venue.packages) return venue.basePrice;
    
    const package_ = venue.packages.find(p => p.id === selectedPackage);
    if (!package_) return venue.basePrice;

    let total = package_.price;

    // Add selected add-ons
    selectedAddons.forEach(addonId => {
      const addon = venue.addons?.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });

    return total;
  };

  const handleBookNow = () => {
    if (!selectedPackage || !selectedDate || !startTime || !endTime) return;

    navigate(`/venues/${venue.id}/book`, {
      state: {
        venue,
        selectedPackage,
        selectedAddons,
        date: selectedDate,
        startTime,
        endTime,
        totalAmount: calculateTotal()
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24 border border-gray-200">
      {/* Price Display */}
      <div className="flex items-baseline mb-6">
        <span className="text-2xl font-semibold">${calculateTotal()}</span>
        <span className="text-lg text-gray-600 ml-2">base price</span>
      </div>

      {/* Date and Time Selection */}
      <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full text-lg border-none p-0 focus:ring-0"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full text-lg border-none p-0 focus:ring-0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full text-lg border-none p-0 focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Package Selection */}
      {venue.packages && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Select Package</h3>
          <div className="space-y-3">
            {venue.packages.map((package_) => (
              <label
                key={package_.id}
                className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedPackage === package_.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="package"
                    value={package_.id}
                    checked={selectedPackage === package_.id}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <div className="font-medium">{package_.name}</div>
                    <div className="text-sm text-gray-500">{package_.duration}</div>
                    <div className="text-sm font-medium">${package_.price}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Add-ons */}
      {venue.addons && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Add-ons</h3>
          <div className="space-y-3">
            {venue.addons.map((addon) => (
              <label
                key={addon.id}
                className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedAddons.includes(addon.id)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addon.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAddons([...selectedAddons, addon.id]);
                      } else {
                        setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <div className="font-medium">{addon.name}</div>
                    <div className="text-sm text-gray-500">{addon.description}</div>
                    <div className="text-sm font-medium">${addon.price}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        disabled={!selectedPackage || !selectedDate || !startTime || !endTime}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Book Now
      </button>

      {/* Disclaimer */}
      <p className="text-center text-sm text-gray-500 mt-4">
        You won't be charged yet
      </p>
    </div>
  );
};

export default VenueBookingWidget; 