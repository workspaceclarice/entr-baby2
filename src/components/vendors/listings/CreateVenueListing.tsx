import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import PreviewButton from '../dashboard/PreviewButton';

const VENUE_CATEGORIES = {
  'Wedding Venue': ['Banquet Hall', 'Garden', 'Historic', 'Beach', 'Estate'],
  'Event Space': ['Conference Center', 'Ballroom', 'Rooftop', 'Loft', 'Studio'],
  'Restaurant': ['Full Buyout', 'Private Room', 'Outdoor Space', 'Patio'],
  'Bar & Nightclub': ['Full Venue', 'VIP Area', 'Lounge', 'Terrace'],
  'Outdoor Space': ['Garden', 'Park', 'Waterfront', 'Courtyard'],
  'Hotel': ['Ballroom', 'Conference Room', 'Rooftop', 'Pool Deck'],
  'Unique Spaces': ['Gallery', 'Museum', 'Theater', 'Warehouse'],
};

interface VenueFormData {
  photos: File[];
  title: string;
  category: string;
  subCategory: string;
  description: string;
  capacity: {
    standing: number;
    seated: number;
    minGuests: number;
    maxGuests: number;
  };
  amenities: string[];
  packages: Array<{
    name: string;
    price: number;
    hours: number;
    description: string;
    includedItems: string[];
  }>;
  rules: {
    music: boolean;
    catering: 'inHouse' | 'preferred' | 'external' | 'any';
    alcohol: boolean;
    decorations: string;
    endTime: string;
  };
  features: {
    parking: boolean;
    parkingDetails: string;
    wifi: boolean;
    kitchen: boolean;
    accessibility: boolean;
    airConditioning: boolean;
    outdoorSpace: boolean;
  };
  availability: {
    timeSlots: Array<{
      day: string;
      startTime: string;
      endTime: string;
    }>;
    setupTime: number;
    cleanupTime: number;
    minHours: number;
  };
}

const AMENITIES = [
  'Tables & Chairs',
  'Sound System',
  'Stage',
  'Dance Floor',
  'Bar Setup',
  'Lighting',
  'Projector',
  'Microphones',
  'Security',
  'Coat Check',
  'Green Room',
  'Dressing Room',
  'Kitchen Access',
  'Outdoor Lighting',
  'Heating',
  'Air Conditioning',
];

// Define steps
const STEPS = [
  { id: 'photos', name: 'Photos' },
  { id: 'basic', name: 'Basic Info' },
  { id: 'amenities', name: 'Amenities' },
  { id: 'packages', name: 'Packages' },
  { id: 'rules', name: 'Rules' },
  { id: 'availability', name: 'Availability' },
];

const CreateVenueListing: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('photos');
  const [formData, setFormData] = useState<VenueFormData>({
    photos: [],
    title: '',
    category: '',
    subCategory: '',
    description: '',
    capacity: {
      standing: 0,
      seated: 0,
      minGuests: 0,
      maxGuests: 0,
    },
    amenities: [],
    packages: [],
    rules: {
      music: true,
      catering: 'any',
      alcohol: true,
      decorations: '',
      endTime: '23:00',
    },
    features: {
      parking: false,
      parkingDetails: '',
      wifi: false,
      kitchen: false,
      accessibility: false,
      airConditioning: false,
      outdoorSpace: false,
    },
    availability: {
      timeSlots: [],
      setupTime: 1,
      cleanupTime: 1,
      minHours: 4,
    },
  });

  // Photo Upload Section (similar to service listing)
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

      {/* Photo Grid */}
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

  // Basic Information Section
  const renderBasicInfo = () => (
    <div className="bg-white px-6 py-8 border-b">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
      
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Venue Name
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., The Grand Ballroom"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue Type
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a venue type</option>
              {Object.keys(VENUE_CATEGORIES).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue Style
            </label>
            <select
              value={formData.subCategory}
              onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!formData.category}
            >
              <option value="">Select a style</option>
              {formData.category &&
                VENUE_CATEGORIES[formData.category as keyof typeof VENUE_CATEGORIES].map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Capacity */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Capacity</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Seated</label>
              <input
                type="number"
                value={formData.capacity.seated}
                onChange={(e) => setFormData({
                  ...formData,
                  capacity: { ...formData.capacity, seated: Number(e.target.value) }
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Standing</label>
              <input
                type="number"
                value={formData.capacity.standing}
                onChange={(e) => setFormData({
                  ...formData,
                  capacity: { ...formData.capacity, standing: Number(e.target.value) }
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Minimum</label>
              <input
                type="number"
                value={formData.capacity.minGuests}
                onChange={(e) => setFormData({
                  ...formData,
                  capacity: { ...formData.capacity, minGuests: Number(e.target.value) }
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Maximum</label>
              <input
                type="number"
                value={formData.capacity.maxGuests}
                onChange={(e) => setFormData({
                  ...formData,
                  capacity: { ...formData.capacity, maxGuests: Number(e.target.value) }
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
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
            placeholder="Describe your venue in detail..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  // Amenities Section
  const renderAmenities = () => (
    <div className="bg-white px-6 py-8 border-b">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Amenities & Features</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {AMENITIES.map((amenity) => (
          <label key={amenity} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.amenities.includes(amenity)}
              onChange={(e) => {
                if (e.target.checked) {
                  setFormData({
                    ...formData,
                    amenities: [...formData.amenities, amenity],
                  });
                } else {
                  setFormData({
                    ...formData,
                    amenities: formData.amenities.filter((a) => a !== amenity),
                  });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{amenity}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // Packages and Pricing Section
  const renderPackages = () => (
    <div className="bg-white px-6 py-8 border-b">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Packages & Pricing</h2>
        <button
          onClick={() => {
            setFormData({
              ...formData,
              packages: [
                ...formData.packages,
                {
                  name: '',
                  price: 0,
                  hours: 4,
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

            <div className="grid grid-cols-3 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Name
                </label>
                <input
                  type="text"
                  value={pkg.name}
                  onChange={(e) => {
                    const newPackages = [...formData.packages];
                    newPackages[index].name = e.target.value;
                    setFormData({ ...formData, packages: newPackages });
                  }}
                  placeholder="e.g., Basic Package"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={pkg.price}
                  onChange={(e) => {
                    const newPackages = [...formData.packages];
                    newPackages[index].price = Number(e.target.value);
                    setFormData({ ...formData, packages: newPackages });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (hours)
                </label>
                <input
                  type="number"
                  value={pkg.hours}
                  onChange={(e) => {
                    const newPackages = [...formData.packages];
                    newPackages[index].hours = Number(e.target.value);
                    setFormData({ ...formData, packages: newPackages });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={pkg.description}
                onChange={(e) => {
                  const newPackages = [...formData.packages];
                  newPackages[index].description = e.target.value;
                  setFormData({ ...formData, packages: newPackages });
                }}
                placeholder="Describe what's included in this package..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Included Items
              </label>
              <div className="flex flex-wrap gap-2">
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
                <input
                  type="text"
                  placeholder="Add item and press Enter"
                  className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>
        ))}
      </div>
    </div>
  );

  // Rules & Restrictions Section
  const renderRules = () => (
    <div className="bg-white px-6 py-8 border-b">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Rules & Restrictions</h2>

      <div className="space-y-6">
        {/* Catering Policy */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catering Policy
          </label>
          <select
            value={formData.rules.catering}
            onChange={(e) => setFormData({
              ...formData,
              rules: {
                ...formData.rules,
                catering: e.target.value as 'inHouse' | 'preferred' | 'external' | 'any'
              }
            })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="inHouse">In-house catering only</option>
            <option value="preferred">Preferred vendors only</option>
            <option value="external">External catering allowed</option>
            <option value="any">No restrictions</option>
          </select>
        </div>

        {/* Music & Sound */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Music & Sound Restrictions
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rules.music}
                onChange={(e) => setFormData({
                  ...formData,
                  rules: { ...formData.rules, music: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Music allowed</span>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Specify any noise restrictions or sound system requirements
          </p>
        </div>

        {/* Alcohol Policy */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Alcohol Policy
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rules.alcohol}
                onChange={(e) => setFormData({
                  ...formData,
                  rules: { ...formData.rules, alcohol: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Alcohol permitted</span>
            </div>
          </div>
          {formData.rules.alcohol && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Note: Proper licenses and insurance may be required</p>
            </div>
          )}
        </div>

        {/* Event End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latest Event End Time
          </label>
          <input
            type="time"
            value={formData.rules.endTime}
            onChange={(e) => setFormData({
              ...formData,
              rules: { ...formData.rules, endTime: e.target.value }
            })}
            className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Decoration Rules */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Decoration Guidelines
          </label>
          <textarea
            rows={3}
            value={formData.rules.decorations}
            onChange={(e) => setFormData({
              ...formData,
              rules: { ...formData.rules, decorations: e.target.value }
            })}
            placeholder="Specify any restrictions on decorations (e.g., no confetti, open flames, wall attachments)"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Additional Rules */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Rules
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.features.parking}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, parking: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Smoking allowed in designated areas</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.features.wifi}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, wifi: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Outside furniture allowed</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.features.kitchen}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, kitchen: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Children must be supervised</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Availability Section
  const renderAvailability = () => (
    <div className="bg-white px-6 py-8 border-b">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Availability & Booking Settings</h2>

      <div className="space-y-8">
        {/* Operating Hours */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Operating Hours</h3>
          <div className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="flex items-center space-x-4">
                <div className="w-32">
                  <span className="text-sm font-medium text-gray-900">{day}</span>
                </div>
                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="09:00"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                      {`${i.toString().padStart(2, '0')}:00`}
                    </option>
                  ))}
                </select>
                <span className="text-gray-500">to</span>
                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="17:00"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                      {`${i.toString().padStart(2, '0')}:00`}
                    </option>
                  ))}
                </select>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">Available</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Notice */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Notice Period
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={formData.availability.setupTime}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    setupTime: Number(e.target.value),
                  },
                })}
                className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-500">hours</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Advance Booking
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={formData.availability.cleanupTime}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    cleanupTime: Number(e.target.value),
                  },
                })}
                className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-500">days</span>
            </div>
          </div>
        </div>

        {/* Setup & Cleanup Times */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Setup Time Allowed
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                value={formData.availability.setupTime}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    setupTime: Number(e.target.value),
                  },
                })}
                className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-500">hours before event</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cleanup Time Allowed
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                value={formData.availability.cleanupTime}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    cleanupTime: Number(e.target.value),
                  },
                })}
                className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-500">hours after event</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step Navigation
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

        {/* Mobile Progress (only show on small screens) */}
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-sm px-6 py-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Add Venue</h1>
        <PreviewButton listingData={formData} listingType="venue" />
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Current Step Content */}
      <div className="transition-all duration-300">
        {currentStep === 'photos' && renderPhotoUpload()}
        {currentStep === 'basic' && renderBasicInfo()}
        {currentStep === 'amenities' && renderAmenities()}
        {currentStep === 'packages' && renderPackages()}
        {currentStep === 'rules' && renderRules()}
        {currentStep === 'availability' && renderAvailability()}
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

export default CreateVenueListing; 