import React from 'react';
import { Link } from 'react-router-dom';
import VendorHeader from '../../../components/layout/VendorHeader';

const VendorFeatures: React.FC = () => {
  const features = [
    {
      title: 'Easy Booking Management',
      description: 'Manage all your bookings in one place with our intuitive dashboard',
      icon: '📅',
      details: [
        'Real-time calendar sync',
        'Automated booking confirmations',
        'Custom availability settings',
        'Mobile notifications'
      ]
    },
    {
      title: 'Payment Processing',
      description: 'Secure and reliable payment processing for your services',
      icon: '💳',
      details: [
        'Instant payouts',
        'Multiple payment methods',
        'Automated invoicing',
        'Secure transactions'
      ]
    },
    {
      title: 'Business Analytics',
      description: 'Track your business performance with detailed analytics',
      icon: '📊',
      details: [
        'Revenue tracking',
        'Booking analytics',
        'Customer insights',
        'Performance reports'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Everything you need to grow your business
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Powerful tools and features designed to help you manage and scale your business
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <div className="space-x-4">
            <Link
              to="/vendors/signup"
              className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 transition-colors"
            >
              List Your Business
            </Link>
            <Link
              to="/vendors/signin"
              className="inline-block px-6 py-3 text-blue-600 text-sm font-light hover:text-blue-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorFeatures; 