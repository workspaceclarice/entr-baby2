import React from 'react';
import { Link } from 'react-router-dom';
import VendorHeader from '../../../components/layout/VendorHeader';
import { CheckIcon } from '@heroicons/react/24/outline';

const VendorPricing: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: '29',
      description: 'Perfect for getting started',
      features: [
        'Up to 20 bookings per month',
        'Basic analytics',
        'Email support',
        'Calendar management',
        'Payment processing',
      ],
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      price: '79',
      description: 'Best for growing businesses',
      features: [
        'Unlimited bookings',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        'API access',
        'Multiple team members',
      ],
      cta: 'Start Free Trial',
      featured: true
    },
    {
      name: 'Enterprise',
      price: '199',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'SLA support',
        'Advanced security',
        'Custom reporting'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Choose the perfect plan for your business
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-8 ${
                  plan.featured 
                    ? 'ring-2 ring-blue-600 shadow-lg' 
                    : 'shadow-sm'
                }`}
              >
                {plan.featured && (
                  <span className="inline-block px-4 py-1 rounded-full text-sm font-light text-blue-600 bg-blue-50 mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-light text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/vendors/signup"
                  className={`block w-full text-center py-3 rounded-lg text-sm font-light transition-colors ${
                    plan.featured
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Is there a contract or commitment?
              </h3>
              <p className="text-gray-600">
                No, all plans are month-to-month with no long-term commitment. You can cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPricing; 