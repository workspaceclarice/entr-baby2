import React from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessType: React.FC = () => {
  const navigate = useNavigate();

  const businessTypes = [
    {
      type: 'venue',
      title: 'Venue',
      description: 'List your space for events',
      examples: ['Event Spaces', 'Banquet Halls', 'Studios', 'Rooftops']
    },
    {
      type: 'service',
      title: 'Service',
      description: 'Offer your services for events',
      examples: ['DJs', 'Photographers', 'Caterers', 'Event Planners']
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-light text-gray-900 mb-2">What type of business do you have?</h1>
      <p className="text-base text-gray-600 font-light mb-8">Select your business category</p>

      <div className="grid md:grid-cols-2 gap-6">
        {businessTypes.map((business) => (
          <button
            key={business.type}
            onClick={() => navigate(`/vendors/onboarding/details?type=${business.type}`)}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">{business.title}</h3>
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
          </button>
        ))}
      </div>
    </div>
  );
};

export default BusinessType; 