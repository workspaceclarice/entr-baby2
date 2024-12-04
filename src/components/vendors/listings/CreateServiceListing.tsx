import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import PreviewButton from '../dashboard/PreviewButton';

// Add ServiceListing interface
interface ServiceListing {
  id: string;
  type: 'service';
  name: string;
  category: string;
  basePrice: number;
  status: 'active' | 'inactive' | 'draft';
  description: string;
  photos: string[];
  packages: Array<{
    name: string;
    price: number;
    duration: number;
    description: string;
    includedItems: string[];
  }>;
  availability: {
    [key: string]: {
      isAvailable: boolean;
      startTime: string;
      endTime: string;
    };
  };
}

const SERVICE_CATEGORIES = {
  'Photography': ['Wedding', 'Events', 'Portrait', 'Commercial'],
  'Catering': ['Full Service', 'Buffet', 'Food Truck', 'Private Chef'],
  'Music': ['DJ', 'Live Band', 'Solo Artist', 'Orchestra'],
  'Event Planning': ['Wedding', 'Corporate', 'Social Events', 'Conferences'],
  'Decor & Design': ['Floral', 'Lighting', 'Stage Design', 'Theme Decor'],
};

const STEPS = [
  { id: 'photos', name: 'Photos' },
  { id: 'basic', name: 'Basic Info' },
  { id: 'packages', name: 'Packages' },
  { id: 'availability', name: 'Availability' },
  { id: 'faq', name: 'FAQ' }
];

// Export the interface
export interface CreateServiceListingProps {
  onClose: () => void;
  onSuccess: () => void;
  existingListing?: ServiceListing | null;
  isEditing?: boolean;
}

const CreateServiceListing: React.FC<CreateServiceListingProps> = ({ onClose, onSuccess, existingListing, isEditing }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState('photos');
  const [formData, setFormData] = useState({
    photos: [] as File[],
    title: '',
    category: '',
    subCategory: '',
    description: '',
    packages: [] as Array<{
      name: string;
      price: number;
      duration: number;
      description: string;
      includedItems: string[];
    }>,
    availability: {
      timeSlots: [] as Array<{
        day: string;
        startTime: string;
        endTime: string;
      }>,
      advanceBooking: 30,
      minimumNotice: 24,
    },
    faqs: [] as Array<{
      question: string;
      answer: string;
    }>,
  });

  // Load existing data when editing
  useEffect(() => {
    if (existingListing && isEditing) {
      setFormData({
        photos: [], // We'll need to handle photos differently since they're Files
        title: existingListing.name,
        category: existingListing.category,
        subCategory: '', // Add default value for required field
        description: existingListing.description,
        packages: existingListing.packages,
        availability: {
          timeSlots: Object.entries(existingListing.availability).map(([day, slot]) => ({
            day,
            startTime: (slot as { startTime: string }).startTime,
            endTime: (slot as { endTime: string }).endTime
          })),
          advanceBooking: 30,
          minimumNotice: 24,
        },
        faqs: [],
      });
    }
  }, [existingListing, isEditing]);

  // Step Indicator
  const renderStepIndicator = () => {
    const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);

    return (
      <div className="py-6 px-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`
                    cursor-pointer pb-4 px-1 border-b-2 font-medium text-sm
                    ${isCurrent 
                      ? 'border-blue-500 text-blue-600'
                      : isCompleted
                      ? 'border-green-500 text-green-600 hover:text-green-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="flex items-center">
                    <span className={`
                      mr-2 flex h-5 w-5 items-center justify-center rounded-full text-xs
                      ${isCurrent
                        ? 'bg-blue-100 text-blue-600'
                        : isCompleted
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                      }
                    `}>
                      {isCompleted ? '✓' : index + 1}
                    </span>
                    {step.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Progress */}
        <div className="sm:hidden mt-4">
          <p className="text-sm text-gray-500">
            Step {currentStepIndex + 1} of {STEPS.length}
          </p>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded-full">
            <div
              className="h-1 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  // Photo Upload Section
  const renderPhotoUpload = () => (
    <div className="bg-white p-6 border-b">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
        <div className="text-center">
          <PhotoIcon className="mx-auto h-16 w-16 text-gray-400" />
          <div className="mt-4 flex flex-col items-center text-sm">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
            >
              <span>Upload photos</span>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files) {
                    setFormData({
                      ...formData,
                      photos: [...formData.photos, ...Array.from(e.target.files)],
                    });
                  }
                }}
              />
            </label>
            <p className="text-gray-500 mt-2">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB each</p>
        </div>
      </div>

      {formData.photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {formData.photos.map((photo, index) => (
            <div key={index} className="relative group aspect-w-1 aspect-h-1">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Preview ${index + 1}`}
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                <button
                  onClick={() => {
                    const newPhotos = [...formData.photos];
                    newPhotos.splice(index, 1);
                    setFormData({ ...formData, photos: newPhotos });
                  }}
                  className="p-2 bg-white rounded-full hover:bg-gray-100"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Basic Info Section
  const renderBasicInfo = () => {
    return (
      <div className="bg-white px-6 py-8 border-b">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
        
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Professional Photography Services"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {Object.keys(SERVICE_CATEGORIES).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub-category
              </label>
              <select
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={!formData.category}
              >
                <option value="">Select a sub-category</option>
                {formData.category && SERVICE_CATEGORIES[formData.category as keyof typeof SERVICE_CATEGORIES].map((subCategory) => (
                  <option key={subCategory} value={subCategory}>{subCategory}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your service in detail..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    );
  };

  // Packages Section
  const renderPackages = () => (
      <div className="bg-white px-6 py-8 border-b">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Service Packages</h3>
        <button
          onClick={() => {
            setFormData({
              ...formData,
              packages: [
                ...formData.packages,
                {
                  name: '',
                  price: 0,
                  duration: 1,
                  description: '',
                  includedItems: [],
                },
              ],
            });
          }}
          className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Package
        </button>
      </div>

      <div className="space-y-6">
        {formData.packages.map((pkg, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
            <button
              onClick={() => {
                const newPackages = [...formData.packages];
                newPackages.splice(index, 1);
                setFormData({ ...formData, packages: newPackages });
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Package Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Package Name</label>
              <input
                type="text"
                value={pkg.name}
                onChange={(e) => {
                  const newPackages = [...formData.packages];
                  newPackages[index].name = e.target.value;
                  setFormData({ ...formData, packages: newPackages });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Basic Package"
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={pkg.price}
                  onChange={(e) => {
                    const newPackages = [...formData.packages];
                    newPackages[index].price = Number(e.target.value);
                    setFormData({ ...formData, packages: newPackages });
                  }}
                  className="block w-full pl-7 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
              <input
                type="number"
                value={pkg.duration}
                onChange={(e) => {
                  const newPackages = [...formData.packages];
                  newPackages[index].duration = Number(e.target.value);
                  setFormData({ ...formData, packages: newPackages });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                value={pkg.description}
                onChange={(e) => {
                  const newPackages = [...formData.packages];
                  newPackages[index].description = e.target.value;
                  setFormData({ ...formData, packages: newPackages });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Included Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Included Items
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {pkg.includedItems.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {item}
                    <button
                      onClick={() => {
                        const newPackages = [...formData.packages];
                        newPackages[index].includedItems.splice(itemIndex, 1);
                        setFormData({ ...formData, packages: newPackages });
                      }}
                      className="ml-2 text-blue-600 hover:text-blue-500"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type and press Enter to add items"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    const newPackages = [...formData.packages];
                    newPackages[index].includedItems.push(e.currentTarget.value.trim());
                    setFormData({ ...formData, packages: newPackages });
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
      </div>
    );

  // Availability Section
  const renderAvailability = () => (
    <div className="bg-white px-6 py-8 border-b">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Service Availability</h3>

      {/* Weekly Schedule */}
      <div className="space-y-6">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
          const timeSlot = formData.availability.timeSlots.find(slot => slot.day === day);
          return (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-32">
                <span className="text-sm font-medium text-gray-700">{day}</span>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-gray-500">Start Time</label>
                  <input
                    type="time"
                    value={timeSlot?.startTime || '09:00'}
                    onChange={(e) => {
                      const newTimeSlots = [...formData.availability.timeSlots];
                      const index = newTimeSlots.findIndex(slot => slot.day === day);
                      if (index >= 0) {
                        newTimeSlots[index].startTime = e.target.value;
                      } else {
                        newTimeSlots.push({
                          day,
                          startTime: e.target.value,
                          endTime: '17:00'
                        });
                      }
                      setFormData({
                        ...formData,
                        availability: {
                          ...formData.availability,
                          timeSlots: newTimeSlots
                        }
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-500">End Time</label>
                  <input
                    type="time"
                    value={timeSlot?.endTime || '17:00'}
                    onChange={(e) => {
                      const newTimeSlots = [...formData.availability.timeSlots];
                      const index = newTimeSlots.findIndex(slot => slot.day === day);
                      if (index >= 0) {
                        newTimeSlots[index].endTime = e.target.value;
                      } else {
                        newTimeSlots.push({
                          day,
                          startTime: '09:00',
                          endTime: e.target.value
                        });
                      }
                      setFormData({
                        ...formData,
                        availability: {
                          ...formData.availability,
                          timeSlots: newTimeSlots
                        }
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Settings */}
      <div className="mt-8 space-y-6">
        <h4 className="text-sm font-medium text-gray-900">Booking Settings</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Advance Booking Required
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="number"
                value={formData.availability.advanceBooking}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    advanceBooking: Number(e.target.value)
                  }
                })}
                className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">days in advance</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Notice Required
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="number"
                value={formData.availability.minimumNotice}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    minimumNotice: Number(e.target.value)
                  }
                })}
                className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">hours notice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add FAQ Section
  const renderFAQ = () => (
    <div className="bg-white px-6 py-8 border-b">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
        <button
          onClick={() => {
            setFormData({
              ...formData,
              faqs: [
                ...formData.faqs,
                { question: '', answer: '' }
              ]
            });
          }}
          className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add FAQ
        </button>
      </div>

      <div className="space-y-6">
        {formData.faqs.map((faq, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
            <button
              onClick={() => {
                const newFaqs = [...formData.faqs];
                newFaqs.splice(index, 1);
                setFormData({ ...formData, faqs: newFaqs });
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Question */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Question</label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => {
                  const newFaqs = [...formData.faqs];
                  newFaqs[index].question = e.target.value;
                  setFormData({ ...formData, faqs: newFaqs });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., What is your cancellation policy?"
              />
            </div>

            {/* Answer */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Answer</label>
              <textarea
                rows={3}
                value={faq.answer}
                onChange={(e) => {
                  const newFaqs = [...formData.faqs];
                  newFaqs[index].answer = e.target.value;
                  setFormData({ ...formData, faqs: newFaqs });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Provide a clear and detailed answer..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-sm px-6 py-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isEditing ? 'Edit Service' : 'Add Service'}
        </h1>
        <PreviewButton listingData={formData} listingType="service" />
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Current Step Content */}
      <div className="transition-all duration-300">
        {currentStep === 'photos' && renderPhotoUpload()}
        {currentStep === 'basic' && renderBasicInfo()}
        {currentStep === 'packages' && renderPackages()}
        {currentStep === 'availability' && renderAvailability()}
        {currentStep === 'faq' && renderFAQ()}
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white px-6 py-4 border-t flex justify-between">
        <button
          type="button"
          onClick={() => {
            const currentIndex = STEPS.findIndex(step => step.id === currentStep);
            if (currentIndex > 0) {
              setCurrentStep(STEPS[currentIndex - 1].id);
            }
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={currentStep === STEPS[0].id}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            const currentIndex = STEPS.findIndex(step => step.id === currentStep);
            if (currentIndex < STEPS.length - 1) {
              setCurrentStep(STEPS[currentIndex + 1].id);
            }
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {currentStep === STEPS[STEPS.length - 1].id ? 'Save & Continue' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default CreateServiceListing; 