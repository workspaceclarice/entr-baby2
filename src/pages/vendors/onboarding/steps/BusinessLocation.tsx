import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const BusinessLocation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const businessType = searchParams.get('type');

  return (
    <div>
      <h1 className="text-2xl font-light text-gray-900 mb-2">Where is your business located?</h1>
      <p className="text-base text-gray-600 font-light mb-8">Add your business location</p>

      <div className="bg-white rounded-xl p-8 shadow-sm">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-light text-gray-700 mb-2">
              Street Address
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your street address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-light text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter state"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-gray-700 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter ZIP code"
            />
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate(`/vendors/onboarding/details?type=${businessType}`)}
              className="px-6 py-3 text-sm font-light text-gray-700 hover:text-gray-900"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate(`/vendors/onboarding/verification?type=${businessType}`)}
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

export default BusinessLocation; 