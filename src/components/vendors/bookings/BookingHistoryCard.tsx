import React from 'react';
import { CalendarIcon, TagIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';

interface BookingHistoryProps {
  booking: {
    id: number;
    eventName: string;
    client: string;
    date: string;
    package: string;
    amount: string;
    status: string;
    rating: number;
    review?: string;
  };
}

const BookingHistoryCard: React.FC<BookingHistoryProps> = ({ booking }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{booking.eventName}</h3>
        <p className="text-sm text-gray-500">{booking.client}</p>
      </div>
      <div className="flex items-center">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(booking.rating)].map((_, i) => (
            <StarIcon key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          {booking.status}
        </span>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="flex items-center text-sm text-gray-600">
        <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
        {booking.date}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
        {booking.package}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
        {booking.amount}
      </div>
    </div>
    {booking.review && (
      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 italic">"{booking.review}"</p>
      </div>
    )}
  </div>
);

export default BookingHistoryCard; 