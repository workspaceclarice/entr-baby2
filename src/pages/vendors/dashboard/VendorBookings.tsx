import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveRequestCard from '../../../components/vendors/bookings/ActiveRequestCard';
import ActiveBookingCard from '../../../components/vendors/bookings/ActiveBookingCard';
import BookingHistoryCard from '../../../components/vendors/bookings/BookingHistoryCard';

interface BookingHistoryItem {
  id: string;
  bookingId: string;
  eventName: string;
  client: {
    name: string;
    photo: string;
  };
  date: string;
  amount: string;
  status: 'completed';
  rating: number;
  review: {
    comment: string;
    date: string;
  };
}

const VendorBookings: React.FC = () => {
  const navigate = useNavigate();

  const handleRequestClick = (requestId: number) => {
    navigate(`/vendors/dashboard/bookings/${requestId}`);
  };

  const handleBookingClick = (bookingId: number) => {
    navigate(`/vendors/dashboard/bookings/${bookingId}/details`);
  };

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

  const bookingHistory: BookingHistoryItem[] = [
    {
      id: '1',
      bookingId: 'BK-001',
      eventName: 'Birthday Celebration',
      client: {
        name: 'Michael Brown',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      date: '2024-02-15',
      amount: '$2,200',
      status: 'completed' as const,
      rating: 5,
      review: {
        comment: 'Amazing service! Very professional and accommodating.',
        date: '2024-02-16'
      }
    },
    {
      id: '2',
      bookingId: 'BK-002',
      eventName: 'Product Launch',
      client: {
        name: 'Sarah Johnson',
        photo: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      date: '2024-02-10',
      amount: '$3,500',
      status: 'completed' as const,
      rating: 4,
      review: {
        comment: 'Great photos and timely delivery. Would book again.',
        date: '2024-02-11'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extralight text-gray-900">Bookings</h1>
        <p className="mt-2 text-sm font-light text-gray-600">
          Manage your booking requests, active bookings, and booking history
        </p>
      </div>

      {/* Active Bookings Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-light text-gray-900">Active Bookings</h2>
          <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
            {activeBookings.length} active
          </span>
        </div>
        <div className="space-y-6">
          {activeBookings.map((booking) => (
            <div 
              key={booking.id}
              onClick={() => handleBookingClick(booking.id)}
              className="cursor-pointer"
            >
              <ActiveBookingCard
                booking={booking}
                onClick={handleBookingClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Booking Requests Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-light text-gray-900">Booking Requests</h2>
          <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
            {bookingRequests.length} pending
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookingRequests.map((request) => (
            <ActiveRequestCard
              key={request.id}
              request={request}
              onClick={handleRequestClick}
            />
          ))}
        </div>
      </div>

      {/* Booking History Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-light text-gray-900">Booking History</h2>
          <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
            {bookingHistory.length} completed
          </span>
        </div>
        <div className="space-y-4">
          {bookingHistory.map((booking) => (
            <BookingHistoryCard
              key={booking.id}
              booking={booking}
            />
          ))}
          {bookingHistory.length === 0 && (
            <p className="text-center text-gray-500 font-light">No completed bookings</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorBookings; 