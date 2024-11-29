import React from 'react';
import { Link } from 'react-router-dom';
import VendorHeader from '../../components/layout/VendorHeader';
import { 
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const VendorLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      {/* Hero Section with Full-Screen Event Service Background Image */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"
            alt="Event Service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-64">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-blue-600/20 text-blue-200 rounded-full text-sm mb-6">
              For Event Professionals & Venues
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white mb-8 leading-tight">
              Your events, our platform, endless possibilities
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light mb-12 max-w-2xl leading-relaxed">
              Join the premier platform for event professionals. Manage bookings, grow your client base, and scale your business - all with zero lead fees.
            </p>
            <div className="space-x-6">
              <Link
                to="/vendors/list-business"
                className="inline-block px-8 py-4 bg-blue-600 text-white text-base font-light rounded-lg hover:bg-blue-700 transition-colors"
              >
                List Your Business
              </Link>
              <Link
                to="/vendors/signin"
                className="inline-block px-8 py-4 text-white text-base font-light hover:text-blue-200 border border-white/30 rounded-lg hover:border-white/60 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 mb-24">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Average Growth</h3>
              <ArrowTrendingUpIcon className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-light text-gray-900">150%</p>
            <p className="text-sm text-gray-500">Year over year</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Monthly Revenue</h3>
              <CurrencyDollarIcon className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-light text-gray-900">$15K+</p>
            <p className="text-sm text-gray-500">Average per vendor</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Bookings</h3>
              <CalendarIcon className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-light text-gray-900">50+</p>
            <p className="text-sm text-gray-500">Monthly average</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">New Customers</h3>
              <UserGroupIcon className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-light text-gray-900">1000+</p>
            <p className="text-sm text-gray-500">Reached monthly</p>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Simple tools to manage and grow your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No Lead Fees
            </h3>
            <p className="text-gray-600">
              Keep more of what you earn. We never charge for leads or take a cut of your bookings.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Easy Booking Management
            </h3>
            <p className="text-gray-600">
              Accept bookings, manage your calendar, and communicate with clients all in one place.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Growth Tools
            </h3>
            <p className="text-gray-600">
              Get insights and analytics to help you make data-driven decisions and grow your business.
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Graph Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Watch your revenue grow
              </h2>
              <p className="text-xl text-gray-600 font-light mb-8">
                Our vendors see an average increase of 150% in bookings within their first year
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Direct bookings through your profile
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Automated payment processing
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Real-time analytics and insights
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              {/* Add your revenue graph component here */}
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                alt="Revenue Growth"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-4">
          Start growing your business today
        </h2>
        <p className="text-xl text-gray-600 font-light mb-8">
          Join thousands of successful vendors on our platform
        </p>
        <div className="space-x-4">
          <Link
            to="/vendors/list-business"
            className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 transition-colors"
          >
            List Your Business
          </Link>
          <Link
            to="/vendors/features"
            className="inline-block px-6 py-3 text-blue-600 text-sm font-light hover:text-blue-700"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorLandingPage; 