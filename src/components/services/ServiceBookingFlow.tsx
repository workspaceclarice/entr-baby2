'use client';

import React from 'react';
import { Service, ServicePackage } from '../../types/service';

export interface BookingFlowProps {
  service: Service;
  selectedPackage: ServicePackage | null;
  onClose: () => void;
}

const ServiceBookingFlow: React.FC<BookingFlowProps> = ({ service, selectedPackage, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-medium">
              {selectedPackage ? `Book ${selectedPackage.name}` : 'Book Service'}
            </h2>
            <p className="text-gray-600">
              {selectedPackage ? selectedPackage.description : service.description}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Booking form content here */}
        <div className="space-y-6">
          {selectedPackage && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Package Details</h3>
              <ul className="space-y-2">
                {selectedPackage.includes.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add your booking form fields here */}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="mr-3 px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Continue to Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingFlow; 