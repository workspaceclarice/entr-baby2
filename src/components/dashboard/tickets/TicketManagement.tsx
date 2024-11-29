import React, { useState } from 'react';
import { UserBooking } from '../../../types/user';

interface TicketProps {
  booking: UserBooking;
  onStatusChange: (bookingId: string, status: UserBooking['status']) => void;
}

const TicketCard: React.FC<TicketProps> = ({ booking, onStatusChange }) => {
  const getStatusColor = (status: UserBooking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Event Title</h3>
          <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Booking ID</p>
          <p className="font-medium">{booking.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-medium">${booking.amount}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Payment Status</p>
        <p className={`font-medium ${
          booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
        }`}>
          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
        </p>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View Details
        </button>
        {booking.status === 'pending' && (
          <div className="flex space-x-2">
            <button
              onClick={() => onStatusChange(booking.id, 'confirmed')}
              className="px-3 py-1 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
            >
              Confirm
            </button>
            <button
              onClick={() => onStatusChange(booking.id, 'cancelled')}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const TicketManagement: React.FC = () => {
  const [filter, setFilter] = useState<UserBooking['status'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data from your backend
  const bookings: UserBooking[] = [
    {
      id: '1',
      listingId: 'event1',
      userId: 'user1',
      vendorId: 'vendor1',
      status: 'pending',
      date: new Date(),
      amount: 100,
      paymentStatus: 'pending'
    },
    // Add more mock bookings...
  ];

  const handleStatusChange = (bookingId: string, newStatus: UserBooking['status']) => {
    // TODO: Implement status change logic
    console.log('Status changed:', { bookingId, newStatus });
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = searchQuery === '' || 
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as UserBooking['status'] | 'all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === status
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBookings.map((booking) => (
          <TicketCard
            key={booking.id}
            booking={booking}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No bookings found</p>
        </div>
      )}
    </div>
  );
};

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export default TicketManagement; 