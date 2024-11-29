import React from 'react';
import { Link } from 'react-router-dom';
import { BookingRequest } from '../../../types/vendor';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserGroupIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';

interface BookingRequestCardProps {
  request: BookingRequest;
}

const BookingRequestCard: React.FC<BookingRequestCardProps> = ({ request }) => {
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link 
      to={`/vendors/dashboard/bookings/${request.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {request.userDetails.name}
            </h3>
            <p className="text-sm text-gray-500">
              Booking ID: {request.id.slice(0, 8)}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-5 w-5 mr-2" />
            {formatDate(request.eventDetails.date)}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-5 w-5 mr-2" />
            {request.eventDetails.startTime} - {request.eventDetails.endTime}
          </div>

          {request.eventDetails.guestCount && (
            <div className="flex items-center text-sm text-gray-500">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              {request.eventDetails.guestCount} guests
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-lg font-medium text-gray-900">
            ${request.price.amount}
          </div>
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </Link>
  );
};

export default BookingRequestCard; 