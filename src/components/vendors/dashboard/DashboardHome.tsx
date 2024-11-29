import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChartBarIcon,
  CalendarIcon,
  ListBulletIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

// Mock data
const dashboardStats = {
  totalBookings: 24,
  activeListings: 5,
  pendingRequests: 3,
  monthlyEarnings: 4500,
};

const recentBookings = [
  {
    id: '1',
    customerName: 'John Doe',
    date: '2024-03-15',
    service: 'Photography Session',
    status: 'confirmed',
    amount: 500,
  },
  // Add more recent bookings...
];

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Bookings</p>
              <h3 className="text-2xl font-semibold text-gray-900">
                {dashboardStats.totalBookings}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <ListBulletIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Listings</p>
              <h3 className="text-2xl font-semibold text-gray-900">
                {dashboardStats.activeListings}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <h3 className="text-2xl font-semibold text-gray-900">
                {dashboardStats.pendingRequests}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Earnings</p>
              <h3 className="text-2xl font-semibold text-gray-900">
                ${dashboardStats.monthlyEarnings}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/vendors/dashboard/services/new"
            className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
          >
            Create New Service
          </Link>
          <Link
            to="/vendors/dashboard/venues/new"
            className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
          >
            List New Venue
          </Link>
          <Link
            to="/vendors/dashboard/bookings"
            className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
          >
            View Booking Requests
          </Link>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {booking.customerName}
                  </p>
                  <p className="text-sm text-gray-500">{booking.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${booking.amount}
                  </p>
                  <p className="text-sm text-gray-500">{booking.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <Link
            to="/vendors/dashboard/bookings"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all bookings →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 