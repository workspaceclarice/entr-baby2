import React from 'react';
import { useNavigate } from 'react-router-dom';
import VendorHeader from '../../../components/layout/VendorHeader';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const VendorPricing: React.FC = () => {
  const navigate = useNavigate();

  // Updated simple plans with new pricing model
  const simplePlans = [
    {
      name: 'Basic',
      price: '0',
      commission: '20%',
      description: 'Perfect for getting started with no upfront costs',
      features: [
        'No monthly fees',
        '20% commission per booking',
        'Unlimited bookings',
        'Basic Analytics',
        'Standard Support'
      ],
      popular: false,
      ctaText: 'Start Free'
    },
    {
      name: 'Professional',
      price: '500',
      commission: '15%',
      description: 'Reduced commission for growing businesses',
      features: [
        'Lower 15% commission rate',
        'Unlimited bookings',
        'Priority Support',
        'Advanced Analytics',
        'Marketing Tools'
      ],
      popular: true,
      ctaText: 'Go Professional'
    },
    {
      name: 'Enterprise',
      price: '2,000',
      commission: '10%',
      description: 'Lowest commission for high-volume businesses',
      features: [
        'Lowest 10% commission rate',
        'Unlimited bookings',
        'Dedicated Support',
        'Premium Analytics',
        'Advanced Marketing Tools'
      ],
      popular: false,
      ctaText: 'Go Enterprise'
    }
  ];

  // Updated feature comparison
  const featureComparison = {
    'Commission & Fees': {
      'Monthly Fee': ['$0', '$500', '$2,000'],
      'Commission Rate': ['20%', '15%', '10%'],
      'Booking Limit': ['Unlimited', 'Unlimited', 'Unlimited'],
      'Payment Processing': ['✓', '✓', '✓'],
      'Instant Payouts': ['✕', '✓', '✓'],
    },
    'Booking Management': {
      'Online Booking': ['✓', '✓', '✓'],
      'Calendar Management': ['Basic', 'Advanced', 'Premium'],
      'Automated Notifications': ['Email Only', 'Email & SMS', 'Priority Email & SMS'],
      'Custom Booking Rules': ['✕', '✓', 'Advanced'],
      'Multi-Calendar Sync': ['✕', '✓', '✓'],
    },
    'Marketing & Growth': {
      'Listing Visibility': ['Standard', 'Enhanced', 'Premium'],
      'Featured Placement': ['✕', '2x Monthly', 'Unlimited'],
      'Promotional Tools': ['Basic', 'Advanced', 'Premium'],
      'SEO Optimization': ['Basic', 'Advanced', 'Premium'],
      'Marketing Analytics': ['Basic', 'Advanced', 'Premium'],
    },
    'Support & Services': {
      'Customer Support': ['Email Only', '24/7 Priority', '24/7 Dedicated'],
      'Account Manager': ['✕', '✕', '✓'],
      'Business Advisory': ['✕', 'Quarterly', 'Monthly'],
      'Training Sessions': ['Self-serve', 'Group', 'One-on-One'],
      'API Access': ['✕', '✓', '✓'],
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      {/* Hero Section */}
      <div className="bg-blue-50 text-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
              Simple, Commission-Based Pricing
            </h1>
            <p className="mt-6 text-xl font-light text-blue-600 max-w-2xl mx-auto">
              Start for free and upgrade as you grow. No booking limits, just lower commission rates.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {simplePlans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-600 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-600 text-white text-center text-sm py-1">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-light text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-light">${plan.price}</span>
                    <span className="ml-2 text-gray-500">/month</span>
                  </div>
                  <div className="mt-2 text-lg text-blue-600 font-medium">
                    {plan.commission} commission
                  </div>
                </div>
                <p className="mt-4 text-gray-500 font-light">{plan.description}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/vendors/list-business')}
                  className={`mt-8 w-full py-3 px-4 rounded-lg font-light ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Feature Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-light text-center mb-16">
          Detailed Feature Comparison
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {Object.entries(featureComparison).map(([category, features]) => (
            <div key={category} className="border-b last:border-b-0">
              <div className="bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">{category}</h3>
              </div>
              
              <div className="divide-y">
                {Object.entries(features).map(([feature, tiers]) => (
                  <div key={feature} className="grid grid-cols-4 px-6 py-4 items-center">
                    <div className="text-sm font-light text-gray-900">{feature}</div>
                    {tiers.map((value, index) => (
                      <div 
                        key={index} 
                        className={`text-sm text-center font-light ${
                          value === '✓' ? 'text-green-500' :
                          value === '✕' ? 'text-gray-300' :
                          'text-gray-600'
                        }`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-light text-center mb-12">Frequently Asked Questions</h2>
        {/* Add FAQ content */}
      </div>
    </div>
  );
};

export default VendorPricing; 