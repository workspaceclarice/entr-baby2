import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const BusinessDetails: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const businessType = searchParams.get('type');

  return (
    <div>
      <h1 className="text-2xl font-light text-gray-900 mb-2">Tell us about your business</h1>
      <p className="text-base text-gray-600 font-light mb-8">Add your business details</p>

      <div className="bg-white rounded-xl p-8 shadow-sm">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-light text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your business name"
            />
          </div>

          <div>
            <label className="block text-sm font-light text-gray-700 mb-2">
              Business Description
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your business"
            />
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate('/vendors/onboarding')}
              className="px-6 py-3 text-sm font-light text-gray-700 hover:text-gray-900"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate(`/vendors/onboarding/location?type=${businessType}`)}
              className="px-6 py-3 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessDetails; 