import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeftIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const CompletedBooking: React.FC = () => {
  const { bookingId } = useParams();

  // Mock data for completed booking
  const booking = {
    id: bookingId,
    clientName: 'Jessica Chen',
    clientPhoto: 'https://randomuser.me/api/portraits/women/1.jpg',
    eventType: 'Wedding Photography Session',
    date: '2024-03-15',
    amount: 1200.00,
    status: 'completed',
    review: {
      rating: 5,
      comment: 'Amazing service! The photos turned out beautifully. Would definitely recommend!',
      date: '2024-03-16'
    },
    deliverables: [
      { type: 'photos', count: 250, status: 'delivered' },
      { type: 'edited_photos', count: 50, status: 'delivered' },
      { type: 'album', count: 1, status: 'delivered' }
    ],
    timeline: [
      { date: '2024-03-15 14:00', event: 'Service Completed' },
      { date: '2024-03-16 10:00', event: 'Photos Delivered' },
      { date: '2024-03-16 11:30', event: 'Review Received' },
      { date: '2024-03-16 12:00', event: 'Payment Processed' }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/vendors/dashboard/bookings"
          className="flex items-center text-sm text-blue-600 hover:text-blue-700 mb-4"
        >
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Back to Bookings
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-light text-gray-900">{booking.eventType}</h1>
            <p className="mt-1 text-sm font-light text-gray-500">Booking #{booking.id}</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-light rounded-full">
            Completed
          </span>
        </div>
      </div>

      {/* Client Info & Review */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={booking.clientPhoto}
              alt={booking.clientName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-light text-gray-900">{booking.clientName}</h2>
              <p className="text-sm font-light text-gray-500">{booking.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-light text-gray-900">
              ${booking.amount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Review Section */}
        {booking.review && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Client Review</h3>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < booking.review.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-light text-gray-600">
                {booking.review.date}
              </span>
            </div>
            <p className="text-sm font-light text-gray-600">
              {booking.review.comment}
            </p>
          </div>
        )}
      </div>

      {/* Deliverables */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-light text-gray-900 mb-4">Deliverables</h3>
        <div className="space-y-4">
          {booking.deliverables.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PhotoIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-light text-gray-900">
                  {item.type.replace('_', ' ')} ({item.count})
                </span>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-light rounded-full">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-light text-gray-900 mb-4">Timeline</h3>
        <div className="space-y-4">
          {booking.timeline.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500" />
              <div>
                <p className="text-sm font-light text-gray-900">{item.event}</p>
                <p className="text-xs font-light text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedBooking; 