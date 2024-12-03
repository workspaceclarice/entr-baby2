import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const VendorBookings: React.FC = () => {
  const navigate = useNavigate();

  const bookingRequests = [
    {
      id: 1,
      eventName: 'Corporate Annual Gala',
      client: 'Jessica Chen',
      date: '2024-04-15',
      time: '6:00 PM - 11:00 PM',
      package: 'Premium Package',
      amount: '$3,500',
      status: 'Pending',
      requestedOn: '2 hours ago'
    },
    {
      id: 2,
      eventName: 'Beach Wedding Ceremony',
      client: 'Mark Thompson',
      date: '2024-05-20',
      time: '4:00 PM - 8:00 PM',
      package: 'Standard Package',
      amount: '$2,800',
      status: 'Pending',
      requestedOn: '1 day ago'
    }
  ];

  const activeBookings = [
    {
      id: 1,
      eventName: 'Tech Conference',
      client: 'TechCorp Inc.',
      date: '2024-03-30',
      time: '9:00 AM - 5:00 PM',
      package: 'Full Day Coverage',
      amount: '$4,200',
      status: 'Confirmed',
      nextAction: 'Send timeline details'
    },
    {
      id: 2,
      eventName: 'Engagement Party',
      client: 'Sarah & James',
      date: '2024-04-02',
      time: '7:00 PM - 10:00 PM',
      package: 'Basic Package',
      amount: '$1,800',
      status: 'Confirmed',
      nextAction: 'Confirm shot list'
    }
  ];

  const bookingHistory = [
    {
      id: 1,
      eventName: 'Birthday Celebration',
      client: 'Michael Brown',
      date: '2024-02-15',
      package: 'Standard Package',
      amount: '$2,200',
      status: 'Completed',
      rating: 5,
      review: 'Amazing service! Very professional and accommodating.'
    },
    {
      id: 2,
      eventName: 'Product Launch',
      client: 'InnovateX',
      date: '2024-02-10',
      package: 'Premium Package',
      amount: '$3,800',
      status: 'Completed',
      rating: 4,
      review: 'Great work, would book again.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extralight text-gray-900">Bookings</h1>
          <p className="mt-2 text-sm font-light text-gray-600">
            Manage your booking requests, active bookings, and booking history
          </p>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-4 border-b border-gray-200">
          <Tab className={({ selected }) =>
            `py-2 px-4 text-sm font-light border-b-2 ${
              selected 
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            }`
          }>
            Booking Requests
          </Tab>
          <Tab className={({ selected }) =>
            `py-2 px-4 text-sm font-light border-b-2 ${
              selected 
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            }`
          }>
            Active Bookings
          </Tab>
          <Tab className={({ selected }) =>
            `py-2 px-4 text-sm font-light border-b-2 ${
              selected 
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            }`
          }>
            Booking History
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-4">
          {/* Booking Requests Panel */}
          <Tab.Panel>
            <div className="space-y-4">
              {bookingRequests.map((request) => (
                <div 
                  key={request.id} 
                  onClick={() => navigate(`/vendors/dashboard/bookings/${request.id}`)}
                  className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-light text-gray-900">{request.eventName}</h3>
                      <p className="text-sm text-gray-500">from {request.client}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium text-green-600">{request.amount}</div>
                      <div className="text-xs text-gray-500">Estimated Income</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      {request.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      {request.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Package:</span>
                      {request.package}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="px-2 py-1 text-xs font-light rounded-full bg-yellow-100 text-yellow-800">
                      {request.status}
                    </span>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 text-sm font-light text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Accept
                      </button>
                      <button className="px-4 py-2 text-sm font-light text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                        Counter
                      </button>
                      <button className="px-4 py-2 text-sm font-light text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* Active Bookings Panel */}
          <Tab.Panel>
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-light text-gray-900">{booking.eventName}</h3>
                      <p className="text-sm text-gray-500">{booking.client}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-light rounded-full bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      {booking.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      {booking.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Package:</span>
                      {booking.package}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Amount:</span>
                      {booking.amount}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">Next action: {booking.nextAction}</p>
                    <button className="px-4 py-2 text-sm font-light text-blue-600 hover:text-blue-700">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* Booking History Panel */}
          <Tab.Panel>
            <div className="space-y-4">
              {bookingHistory.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-light text-gray-900">{booking.eventName}</h3>
                      <p className="text-sm text-gray-500">{booking.client}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(booking.rating)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="px-2 py-1 text-xs font-light rounded-full bg-gray-100 text-gray-800">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      {booking.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Package:</span>
                      {booking.package}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Amount:</span>
                      {booking.amount}
                    </div>
                  </div>
                  {booking.review && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600 italic">"{booking.review}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default VendorBookings; 