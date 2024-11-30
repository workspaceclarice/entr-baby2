import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Event } from '../../types/event';

interface RSVPFlowProps {
  event: Event;
  status: 'going' | 'not-going' | 'maybe';
  onClose: () => void;
  onSubmit: (formData: RSVPFormData) => void;
}

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  dietaryRestrictions?: string;
  plusOne: boolean;
}

const RSVPFlow: React.FC<RSVPFlowProps> = ({ event, status, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    dietaryRestrictions: '',
    plusOne: false
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your name?
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Full Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your Instagram handle?
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">@</span>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="username"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your email?
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your phone number?
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="(123) 456-7890"
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Any dietary restrictions?
              </label>
              <textarea
                value={formData.dietaryRestrictions}
                onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Optional"
                rows={3}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="plusOne"
                checked={formData.plusOne}
                onChange={(e) => setFormData({ ...formData, plusOne: e.target.checked })}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="plusOne" className="ml-2 block text-sm text-gray-700">
                Are you bringing a plus one?
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {status === 'going' ? "You're Going! 🎉" : 
               status === 'maybe' ? "Maybe Going? 🤔" : 
               "Can't Make It 😢"}
            </h2>
            <p className="text-sm text-gray-500">Step {step} of {totalSteps}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 rounded-full mb-6">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {renderStep()}
          
          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Back
              </button>
            )}
            <button
              type={step === totalSteps ? 'submit' : 'button'}
              onClick={() => step < totalSteps && setStep(step + 1)}
              className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {step === totalSteps ? 'Complete RSVP' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RSVPFlow; 