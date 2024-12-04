import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/outline';

interface BookingHistoryProps {
  booking: {
    id: string;
    bookingId: string;
    eventName: string;
    client: {
      name: string;
      photo?: string;
    };
    date: string;
    amount: string;
    status: 'completed';
    rating: number;
    review?: {
      comment: string;
      date: string;
    };
  };
}

const BookingHistoryCard: React.FC<BookingHistoryProps> = ({ booking }) => (
  <Link
    to={`/vendors/dashboard/bookings/${booking.bookingId}/completed`}
    className="block hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-start justify-between p-4 border rounded-lg">
      <div className="flex items-start space-x-4">
        <img
          src={booking.client.photo || `https://ui-avatars.com/api/?name=${booking.client.name}`}
          alt={booking.client.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">{booking.eventName}</p>
          <p className="text-xs font-light text-gray-500">{booking.client.name}</p>
          <p className="text-xs font-light text-gray-500">{booking.date}</p>
          {booking.review && (
            <div className="mt-2">
              <div className="flex items-center">
                {[...Array(booking.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-3 w-3 ${
                      i < booking.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs font-light text-gray-600">
                  {booking.review.date}
                </span>
              </div>
              <p className="text-xs font-light text-gray-600 mt-1 line-clamp-2">
                {booking.review.comment}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="text-right">
        <span className="text-sm font-medium text-gray-900">
          {booking.amount}
        </span>
        <div className="mt-1">
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-light rounded-full">
            Completed
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default BookingHistoryCard; 