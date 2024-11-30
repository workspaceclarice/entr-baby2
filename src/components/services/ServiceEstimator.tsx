'use client';

import React, { useState } from 'react';
import { Service } from '../../types';

interface ServiceEstimatorProps {
  service: Service;
  onBookNow: (details: {
    selectedPackage: string;
    selectedAddons: string[];
    date: string;
    startTime: string;
    endTime: string;
  }) => void;
}

export const ServiceEstimator: React.FC<ServiceEstimatorProps> = ({ service, onBookNow }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const calculateTotal = () => {
    if (!selectedPackage || !service.packages) return 0;
    const package_ = service.packages.find(p => p.id === selectedPackage);
    if (!package_) return 0;

    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = service.addons?.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);

    return package_.price + addonsTotal;
  };

  const handleBookNow = () => {
    if (!selectedPackage) return;
    onBookNow({
      selectedPackage,
      selectedAddons,
      date,
      startTime,
      endTime
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24 border border-gray-200">
      {/* Price Display */}
      <div className="flex items-baseline mb-6">
        <span className="text-2xl font-semibold">${calculateTotal()}</span>
        <span className="text-lg text-gray-600 ml-2">starting price</span>
      </div>

      {/* Date and Time Selection Box */}
      <div className="border border-gray-300 rounded-xl overflow-hidden mb-6">
        {/* Date Selection */}
        <div className="p-4 border-b border-gray-300">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-lg border-none p-0 focus:ring-0"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Time Selection */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-lg border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full text-lg border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Package Selection */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
          Select Package
        </label>
        <div className="space-y-3">
          {service.packages?.map((pkg) => (
            <label
              key={pkg.id}
              className={`block relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPackage === pkg.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="package"
                value={pkg.id}
                checked={selectedPackage === pkg.id}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="hidden"
              />
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block font-medium text-gray-900">{pkg.name}</span>
                    <span className="block text-sm text-gray-500">{pkg.description}</span>
                  </div>
                  <span className="font-semibold">${pkg.price}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Add-ons Selection */}
      {selectedPackage && service.addons && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Additional Services
          </label>
          <div className="space-y-3">
            {service.addons.map((addon) => (
              <label
                key={addon.id}
                className={`block relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedAddons.includes(addon.id)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
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
                  className="hidden"
                />
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block font-medium text-gray-900">{addon.name}</span>
                    <span className="block text-sm text-gray-500">{addon.description}</span>
                  </div>
                  <span className="font-semibold">+${addon.price}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        disabled={!selectedPackage || !date || !startTime || !endTime}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Book Now
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        You won't be charged yet
      </p>
    </div>
  );
};

export default ServiceEstimator; 