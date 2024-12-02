import React from 'react';
import { useNavigate } from 'react-router-dom';
import VendorHeader from '../../../components/layout/VendorHeader';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const VendorPricing: React.FC = () => {
  const navigate = useNavigate();

  // Simple plans for the cards at the top
  const simplePlans = [
    {
      name: 'Basic',
      price: '49',
      description: 'Perfect for getting started',
      features: [
        'Single Venue/Service Listing',
        'Basic Calendar Management',
        'Email Support',
        'Basic Analytics',
      ],
      popular: false,
      ctaText: 'Start Basic'
    },
    {
      name: 'Professional',
      price: '99',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 3 Venue/Service Listings',
        'Advanced Calendar Management',
        '24/7 Priority Support',
        'Marketing Tools',
      ],
      popular: true,
      ctaText: 'Go Professional'
    },
    {
      name: 'Enterprise',
      price: '199',
      description: 'For established businesses',
      features: [
        'Unlimited Listings',
        'Premium Features',
        'Dedicated Support',
        'Advanced Analytics',
      ],
      popular: false,
      ctaText: 'Contact Sales'
    }
  ];

  // Detailed feature comparison
  const featureComparison = {
    'Listing Features': {
      'Number of Listings': ['1', 'Up to 3', 'Unlimited'],
      'Photo Gallery': ['10 photos', '30 photos', 'Unlimited'],
      'Calendar Management': ['Basic', 'Advanced', 'Premium'],
      'Business Hours': ['✓', '✓', '✓'],
      'Analytics': ['Basic', 'Advanced', 'Enterprise'],
    },
    'Booking Management': {
      'Online Booking': ['✓', '✓', '✓'],
      'Availability Calendar': ['Basic', 'Advanced', 'Premium'],
      'Notifications': ['Email', 'Email & SMS', 'Priority Email & SMS'],
      'Payment Processing': ['✓', '✓', '✓'],
      'Custom Booking Rules': ['✕', '✓', 'Advanced'],
    },
    'Customer Engagement': {
      'Customer Reviews': ['✓', '✓', '✓'],
      'Messaging System': ['Basic', 'Advanced', 'Premium'],
      'Customer Support': ['Email Only', '24/7 Priority', '24/7 Dedicated'],
      'Response Time Metrics': ['✕', '✓', '✓'],
      'Customer Database': ['✕', '✓', 'Advanced'],
    },
    'Marketing Tools': {
      'SEO Tools': ['Basic', 'Advanced', 'Premium'],
      'Social Media Integration': ['✕', '✓', 'Advanced'],
      'Promotional Tools': ['✕', '✓', 'Premium'],
      'Featured Listing': ['✕', '1 per month', 'Unlimited'],
      'Marketing Analytics': ['✕', '✓', 'Advanced'],
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
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-xl font-light text-blue-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business. No hidden fees.
            </p>
          </div>
        </div>
      </div>

      {/* Simple Pricing Cards */}
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
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-light">${plan.price}</span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-gray-500 font-light">{plan.description}</p>

                <button
                  onClick={() => navigate('/vendors/list-business')}
                  className={`mt-6 w-full py-3 px-4 rounded-lg font-light ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {plan.ctaText}
                </button>
              </div>

              {/* Feature Categories */}
              <div className="border-t">
                {plan.features.map((feature) => (
                  <div key={feature} className="p-8 border-b last:border-b-0">
                    <h4 className="text-lg font-light text-gray-900 mb-4">{feature}</h4>
                    <ul className="space-y-4">
                      {/* Add feature details here */}
                    </ul>
                  </div>
                ))}
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