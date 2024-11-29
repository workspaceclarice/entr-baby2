import React from 'react';
import { Link } from 'react-router-dom';
import {
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const RevenueCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <CurrencyDollarIcon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">$10M+</h3>
            <p className="text-gray-600">Revenue Generated</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <ChartBarIcon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">85%</h3>
            <p className="text-gray-600">Growth Rate</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <UserGroupIcon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">50K+</h3>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <CalendarIcon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">100K+</h3>
            <p className="text-gray-600">Events Booked</p>
          </div>
        </div>

        {/* Bartender Image Section */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e"
            alt="Professional Bartender"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-900/40 flex items-center">
            <div className="max-w-2xl px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Turn Your Expertise Into Revenue
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Join thousands of successful vendors who have grown their business with our platform. Start earning more today.
              </p>
              <Link
                to="/vendors/signup"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-purple-600 transition-colors"
              >
                Start Earning Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueCTA; 