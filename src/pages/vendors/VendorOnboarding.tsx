import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VendorHeader from '../../components/layout/VendorHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface OnboardingFormData {
  businessName: string;
  businessType: 'venue' | 'service';
  description: string;
  categories: string[];
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  website?: string;
  instagram?: string;
}

const VendorOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingFormData>({
    businessName: '',
    businessType: (location.state?.businessType as 'venue' | 'service') || 'venue',
    description: '',
    categories: [],
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const steps = [
    {
      title: 'Business Details',
      description: 'Tell us about your business'
    },
    {
      title: 'Categories',
      description: 'Select your business categories'
    },
    {
      title: 'Location',
      description: 'Add your business location'
    },
    {
      title: 'Social & Web',
      description: 'Add your online presence'
    }
  ];

  const serviceCategories = [
    'DJ & Entertainment',
    'Photography',
    'Videography',
    'Catering',
    'Event Planning',
    'Decor & Design',
    'Lighting',
    'Sound Equipment',
  ];

  const venueTypes = [
    'Banquet Hall',
    'Conference Center',
    'Restaurant',
    'Rooftop',
    'Garden',
    'Studio',
    'Gallery',
    'Warehouse',
  ];

  const renderBusinessDetails = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-light text-gray-700 mb-2">
          Business Name
        </label>
        <input
          type="text"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your business name"
        />
      </div>
      <div>
        <label className="block text-sm font-light text-gray-700 mb-2">
          Business Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your business"
        />
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-light text-gray-700 mb-4">
          Select your {formData.businessType === 'service' ? 'service categories' : 'venue type'}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(formData.businessType === 'service' ? serviceCategories : venueTypes).map((category) => (
            <label
              key={category}
              className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={formData.categories.includes(category)}
                onChange={(e) => {
                  const categories = e.target.checked
                    ? [...formData.categories, category]
                    : formData.categories.filter(c => c !== category);
                  setFormData({ ...formData, categories });
                }}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLocation = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-light text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <label className="block text-sm font-light text-gray-700 mb-2">
          Address
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your business address"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="State"
          />
        </div>
        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="ZIP"
          />
        </div>
      </div>
    </div>
  );

  const renderSocialAndWeb = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-light text-gray-700 mb-2">
          Website (Optional)
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your website URL"
        />
      </div>
      <div>
        <label className="block text-sm font-light text-gray-700 mb-2">
          Instagram Handle (Optional)
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">@</span>
          <input
            type="text"
            value={formData.instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="your.business"
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderBusinessDetails();
      case 1:
        return renderCategories();
      case 2:
        return renderLocation();
      case 3:
        return renderSocialAndWeb();
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // TODO: Submit data to backend
      navigate('/vendor/dashboard');
    } catch (error) {
      console.error('Error submitting vendor data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="max-w-2xl mx-auto px-4 pt-32 pb-16">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex-1 ${index !== steps.length - 1 ? 'relative' : ''}`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index !== steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
                <div className="mt-2">
                  <div className="text-xs font-medium">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 text-sm font-light text-gray-700 hover:text-gray-900"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  handleSubmit();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 ml-auto"
            >
              {loading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : currentStep === steps.length - 1 ? (
                'Complete Setup'
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOnboarding; 