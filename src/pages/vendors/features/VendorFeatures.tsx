import React from 'react';
import { useNavigate } from 'react-router-dom';
import VendorHeader from '../../../components/layout/VendorHeader';
import {
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  MegaphoneIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const VendorFeatures: React.FC = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      title: 'Smart Booking Management',
      description: 'Streamline your booking process with our intelligent calendar system',
      icon: CalendarIcon,
      benefits: [
        'Real-time availability updates',
        'Automated booking confirmations',
        'Custom booking rules and restrictions',
        'Multi-calendar sync capability'
      ]
    },
    {
      title: 'Revenue Optimization',
      description: 'Maximize your earnings with dynamic pricing and analytics',
      icon: CurrencyDollarIcon,
      benefits: [
        'Dynamic pricing tools',
        'Revenue forecasting',
        'Seasonal pricing adjustments',
        'Competitor price analysis'
      ]
    },
    {
      title: 'Marketing Suite',
      description: 'Powerful tools to promote your venues and services',
      icon: MegaphoneIcon,
      benefits: [
        'SEO optimization tools',
        'Social media integration',
        'Email marketing campaigns',
        'Promotional tools and discounts'
      ]
    },
    {
      title: 'Customer Insights',
      description: 'Deep understanding of your customer base',
      icon: ChartBarIcon,
      benefits: [
        'Customer behavior analytics',
        'Booking patterns analysis',
        'Customer feedback metrics',
        'Demographic insights'
      ]
    }
  ];

  const showcaseFeatures = [
    {
      title: 'Professional Listing Builder',
      description: 'Create stunning listings that convert visitors into customers',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      features: [
        'High-quality photo galleries',
        'Virtual tours integration',
        'Detailed venue specifications',
        'Custom branding options'
      ]
    },
    {
      title: 'Customer Communication Hub',
      description: 'Stay connected with your customers through integrated messaging',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
      features: [
        'Instant messaging system',
        'Automated responses',
        'Inquiry management',
        'Message templates'
      ]
    },
    {
      title: 'Business Analytics Dashboard',
      description: 'Make data-driven decisions with comprehensive analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      features: [
        'Real-time performance metrics',
        'Custom reporting tools',
        'Booking trends analysis',
        'Revenue tracking'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      {/* Hero Section */}
      <div className="bg-blue-50 text-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
              Everything You Need to Succeed
            </h1>
            <p className="mt-6 text-xl font-light text-blue-600 max-w-2xl mx-auto">
              Powerful tools and features designed to help you manage, grow, and scale your venue business.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => navigate('/vendors/list-business')}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-light hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/vendors/signin')}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-light hover:bg-blue-50 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainFeatures.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <feature.icon className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-light text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6 font-light">{feature.description}</p>
              <ul className="space-y-3">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-gray-600 font-light">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Showcases */}
      {showcaseFeatures.map((showcase, index) => (
        <div 
          key={showcase.title}
          className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col lg:flex-row gap-12 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              <div className="lg:w-1/2">
                <img
                  src={showcase.image}
                  alt={showcase.title}
                  className="rounded-xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-light text-gray-900">{showcase.title}</h2>
                <p className="text-xl text-gray-600 font-light">{showcase.description}</p>
                <ul className="space-y-4">
                  {showcase.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600 font-light">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Trust Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-16">Why Vendors Trust Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <ShieldCheckIcon className="h-12 w-12 text-blue-600 mx-auto mb-6" />
              <h3 className="text-lg font-light text-gray-900 mb-4">Secure & Reliable</h3>
              <p className="text-gray-600 font-light">
                Bank-level security for payments and data protection
              </p>
            </div>
            <div className="p-6">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-600 mx-auto mb-6" />
              <h3 className="text-lg font-light text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600 font-light">
                Dedicated support team ready to help you succeed
              </p>
            </div>
            <div className="p-6">
              <BuildingStorefrontIcon className="h-12 w-12 text-blue-600 mx-auto mb-6" />
              <h3 className="text-lg font-light text-gray-900 mb-4">2000+ Vendors</h3>
              <p className="text-gray-600 font-light">
                Join our growing community of successful vendors
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-light">Ready to Grow Your Business?</h2>
          <p className="mt-4 text-xl text-blue-100 font-light">
            Join thousands of successful vendors on our platform
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate('/vendors/list-business')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-light hover:bg-blue-50 transition-colors"
            >
              Get Started Now
            </button>
            <button
              onClick={() => navigate('/vendor/pricing')}
              className="px-8 py-3 bg-blue-700 text-white rounded-lg font-light hover:bg-blue-800 transition-colors"
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorFeatures; 