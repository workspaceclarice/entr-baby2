import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VendorHeader from '../../components/layout/VendorHeader';

const ListYourBusiness: React.FC = () => {
  const navigate = useNavigate();

  const businessTypes = [
    {
      type: 'venue',
      title: 'List a Venue',
      description: 'Rent out your space for events',
      examples: ['Event Spaces', 'Banquet Halls', 'Studios', 'Rooftops', 'Gardens'],
      icon: '🏛️'
    },
    {
      type: 'service',
      title: 'List a Service',
      description: 'Offer your services for events',
      examples: ['DJs', 'Photographers', 'Caterers', 'Event Planners', 'Decorators'],
      icon: '🎵'
    }
  ];

  const handleSelectBusinessType = (type: string) => {
    navigate('/vendors/signup', { state: { businessType: type } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-light text-gray-900 mb-4">
            List your business on entr
          </h1>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Join thousands of vendors reaching more customers and growing their business
          </p>
        </div>

        {/* Business Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {businessTypes.map((business) => (
            <button
              key={business.type}
              onClick={() => handleSelectBusinessType(business.type)}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left group"
            >
              <div className="flex items-start space-x-4">
                <span className="text-4xl">{business.icon}</span>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {business.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{business.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {business.examples.map((example) => (
                      <span
                        key={example}
                        className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
            Why list with entr?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-4">💫</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Reach More Customers
              </h3>
              <p className="text-gray-600">
                Connect with customers looking for services like yours
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Easy to Manage
              </h3>
              <p className="text-gray-600">
                Simple tools to manage bookings and payments
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Grow Your Business
              </h3>
              <p className="text-gray-600">
                Access analytics and insights to grow your business
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/vendors/signup')}
              className="px-6 py-3 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 transition-colors"
            >
              List Your Business
            </button>
            <Link
              to="/vendors/signin"
              className="px-6 py-3 text-blue-600 text-sm font-light hover:text-blue-700"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListYourBusiness; 