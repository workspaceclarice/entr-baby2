import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import VendorDashboardHeader from '../../../components/vendors/common/VendorDashboardHeader';
import BookingRequestCard from '../../../components/vendors/dashboard/BookingRequestCard';
import BookingRequestDetail from './BookingRequestDetail';
import CreateListingButton from '../../../components/vendors/dashboard/CreateListingButton';
import CreateServiceListing from '../../../components/vendors/listings/CreateServiceListing';
import CreateVenueListing from '../../../components/vendors/listings/CreateVenueListing';
import { BookingRequest } from '../../../types/vendor';
import PreviewPage from '../listings/PreviewPage';

// Mock data - replace with API call
const mockBookingRequests: BookingRequest[] = [
  {
    id: '1',
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
    status: 'pending' as const,
    price: {
      amount: 1500,
      currency: 'USD',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Example of a venue booking
  {
    id: '2',
    listingId: 'venue456',
    listingType: 'venue',
    userId: 'user456',
    userDetails: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
    },
    eventDetails: {
      date: new Date('2024-04-20'),
      startTime: '18:00',
      endTime: '23:00',
      guestCount: 100,
      eventType: 'Corporate Event',
      specialRequests: 'Need AV equipment setup',
    },
    status: 'pending' as const,
    price: {
      amount: 2500,
      currency: 'USD',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const VendorDashboard: React.FC = () => {
  const { userProfile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorDashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/bookings" element={<BookingRequests />} />
          <Route path="/bookings/:requestId" element={<BookingRequestDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/listings/new-service" element={<CreateServiceListing />} />
          <Route path="/listings/new-venue" element={<CreateVenueListing />} />
          <Route path="/listings/preview/:type" element={<PreviewPage />} />
        </Routes>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome: React.FC = () => (
  <div>
    <h1 className="text-2xl font-light text-gray-900 mb-6">Dashboard</h1>
    {/* Add dashboard overview content */}
  </div>
);

// Booking Requests Component
const BookingRequests: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light text-gray-900">Booking Requests</h1>
        <div className="flex space-x-2">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>All Requests</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Countered</option>
            <option>Declined</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockBookingRequests.map((request) => (
          <BookingRequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};

// Services Component
const Services: React.FC = () => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-light text-gray-900">My Services</h1>
      <CreateListingButton />
    </div>
    {/* Add services management content */}
  </div>
);

// Add Venues Component
const Venues: React.FC = () => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-light text-gray-900">My Venues</h1>
      <CreateListingButton />
    </div>
    {/* Add venues management content */}
  </div>
);

// Earnings Component
const Earnings: React.FC = () => (
  <div>
    <h1 className="text-2xl font-light text-gray-900 mb-6">Earnings</h1>
    {/* Add earnings content */}
  </div>
);

export default VendorDashboard; 