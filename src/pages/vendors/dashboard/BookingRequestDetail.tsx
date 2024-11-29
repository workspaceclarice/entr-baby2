import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookingRequest } from '../../../types/vendor';
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

const BookingRequestDetail: React.FC = () => {
  const { requestId } = useParams();
  const [isCounterOfferOpen, setIsCounterOfferOpen] = useState(false);
  const [counterOfferPrice, setCounterOfferPrice] = useState('');
  const [vendorNotes, setVendorNotes] = useState('');

  // Mock data - replace with actual API call
  const request: BookingRequest = {
    id: requestId || '',
    listingId: 'listing123',
    listingType: 'service',
    userId: 'user123',
    userDetails: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
    },
    eventDetails: {
      date: new Date('2024-03-15'),
      startTime: '14:00',
      endTime: '18:00',
      guestCount: 50,
      eventType: 'Wedding Reception',
      specialRequests: 'Need vegetarian food options',
    },
    status: 'pending',
    price: {
      amount: 1500,
      currency: 'USD',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const getStatusColor = (status: BookingRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'countered':
        return 'bg-blue-100 text-blue-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAccept = async () => {
    // Implement accept logic
  };

  const handleDecline = async () => {
    // Implement decline logic
  };

  const handleCounterOffer = async () => {
    // Implement counter offer logic
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Booking Request
            </h1>
            <p className="text-sm text-gray-500">ID: {request.id.slice(0, 8)}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              request.status
            )}`}
          >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>

        {/* Customer Details */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Customer Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1">{request.userDetails.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1">{request.userDetails.email}</p>
            </div>
            {request.userDetails.phone && (
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1">{request.userDetails.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Event Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="mt-1">
                  {request.eventDetails.date.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-500">Time</p>
                <p className="mt-1">
                  {request.eventDetails.startTime} - {request.eventDetails.endTime}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-500">Guests</p>
                <p className="mt-1">{request.eventDetails.guestCount}</p>
              </div>
            </div>
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-500">Price</p>
                <p className="mt-1">${request.price.amount}</p>
              </div>
            </div>
          </div>

          {request.eventDetails.specialRequests && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">
                Special Requests
              </p>
              <p className="mt-1 text-gray-700">
                {request.eventDetails.specialRequests}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {request.status === 'pending' && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex space-x-4">
              <button
                onClick={handleAccept}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Accept
              </button>
              <button
                onClick={() => setIsCounterOfferOpen(true)}
                className="flex-1 bg-white text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Counter Offer
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 bg-white text-red-600 px-4 py-2 rounded-md border border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Decline
              </button>
            </div>
          </div>
        )}

        {/* Counter Offer Dialog */}
        {isCounterOfferOpen && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Make Counter Offer
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  value={counterOfferPrice}
                  onChange={(e) => setCounterOfferPrice(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={vendorNotes}
                  onChange={(e) => setVendorNotes(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Explain your counter offer..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleCounterOffer}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send Counter Offer
                </button>
                <button
                  onClick={() => setIsCounterOfferOpen(false)}
                  className="flex-1 bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingRequestDetail; 