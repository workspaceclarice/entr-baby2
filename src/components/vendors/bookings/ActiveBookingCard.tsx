import React from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ActiveBookingProps {
  booking: {
    id: number;
    eventName: string;
    client: string;
    date: string;
    time: string;
    package: string;
    amount: string;
    status: string;
    nextAction: string;
  };
  onClick: (id: number) => void;
}

const ActiveBookingCard: React.FC<ActiveBookingProps> = ({ booking, onClick }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100">
    <div className="bg-green-50 px-4 py-2 border-b border-green-100">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-green-700">
          {booking.status}
        </span>
        <span className="text-sm text-gray-600">
          Booking #{booking.id}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{booking.eventName}</h3>
          <p className="text-sm text-gray-500">{booking.client}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-blue-600">{booking.amount}</p>
          <p className="text-xs text-gray-500">{booking.package}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
          {booking.date}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
          {booking.time}
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Next:</span> {booking.nextAction}
        </p>
        <button 
          onClick={() => onClick(booking.id)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View Details →
        </button>
      </div>
    </div>
  </div>
);

export default ActiveBookingCard; 