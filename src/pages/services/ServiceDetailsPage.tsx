import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Service } from '../../types';
import { motion } from 'framer-motion';
import ServiceBookingFlow from '../../components/services/ServiceBookingFlow';
import { services } from '../../data/services'; // Import services data

interface ServiceDetailsTab {
  id: string;
  name: string;
}

const tabs: ServiceDetailsTab[] = [
  { id: 'overview', name: 'Overview' },
  { id: 'pricing', name: 'Pricing & Packages' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'reviews', name: 'Reviews' },
  { id: 'faq', name: 'FAQ' }
];

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  // Find the service based on ID
  const service = services.find(s => s.id === id) || services[0];

  const calculateTotal = () => {
    if (!selectedPackage || !service.packages) return 0;
    const package_ = service.packages.find(p => p.id === selectedPackage);
    if (!package_) return 0;

    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = service.addons?.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);

    return package_.price + addonsTotal;
  };

  const renderServiceDetails = () => (
    <div className="space-y-12">
      {/* Service Details Summary */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <ClockIcon className="w-6 h-6 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">Minimum Duration</h3>
              <p className="text-gray-600">4 hours</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <LocationIcon className="w-6 h-6 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">Service Area</h3>
              <p className="text-gray-600">{service.location}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="w-6 h-6 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">Response Time</h3>
              <p className="text-gray-600">Usually within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">About This Service</h2>
        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
          {service.description}
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {service.features?.map((feature: { title: string; description: string; icon: string }, index: number) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Photo Gallery Grid - Moved to before reviews */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {service.gallery?.map((photo: string, index: number) => (
            <div 
              key={index}
              className={`relative rounded-lg overflow-hidden ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={photo}
                alt={`${service.vendorName} - Photo ${index + 1}`}
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Client Reviews */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Client Reviews</h2>
          <div className="flex items-center">
            <StarIcon className="w-6 h-6 text-yellow-400" />
            <span className="ml-2 font-semibold">{service.rating}</span>
            <span className="mx-2 text-gray-400">·</span>
            <span className="text-gray-600">{service.reviewCount} reviews</span>
          </div>
        </div>

        <div className="space-y-8">
          {[
            {
              name: "Sarah M.",
              image: "https://picsum.photos/seed/review1/100/100",
              rating: 5,
              date: "2 weeks ago",
              eventType: "Wedding Reception",
              review: "Elite DJs was absolutely amazing! Our DJ read the crowd perfectly and kept everyone dancing all night. The lighting setup was beautiful and really added to the atmosphere. Highly recommend!"
            },
            {
              name: "Michael R.",
              image: "https://picsum.photos/seed/review2/100/100",
              rating: 5,
              date: "1 month ago",
              eventType: "Corporate Event",
              review: "Very professional service from start to finish. Great communication during planning, and excellent execution during the event. The sound quality was top-notch."
            },
            {
              name: "Jessica L.",
              image: "https://picsum.photos/seed/review3/100/100",
              rating: 4,
              date: "2 months ago",
              eventType: "Birthday Party",
              review: "Great music selection and very accommodating with our requests. Would definitely book again!"
            }
          ].map((review, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
              <div className="flex items-start space-x-4">
                <img 
                  src={review.image} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.eventType}</p>
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <span className="ml-1 font-medium">{review.rating}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{review.review}</p>
                  <p className="mt-2 text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const handleBookNow = () => {
    if (!selectedPackage || !date || !startTime || !endTime) {
      return; // Don't navigate if required fields aren't filled
    }

    // Get the full package and addon details
    const selectedPackageDetails = service.packages?.find(p => p.id === selectedPackage);
    const selectedAddonDetails = selectedAddons.map(addonId => 
      service.addons?.find(a => a.id === addonId)
    ).filter(Boolean);

    // Calculate total
    const total = calculateTotal();

    navigate(`/services/${id}/book`, {
      state: {
        service, // Pass the entire service object
        selectedPackage,
        selectedPackageDetails,
        selectedAddons,
        selectedAddonDetails,
        date,
        startTime,
        endTime,
        totalAmount: total
      }
    });
  };

  const EstimateWidget = () => (
    <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24 border border-gray-200">
      {/* Price Display */}
      <div className="flex items-baseline mb-6">
        <span className="text-2xl font-semibold">${calculateTotal()}</span>
        <span className="text-lg text-gray-600 ml-2">starting price</span>
      </div>

      {/* Date and Time Selection Box */}
      <div className="border border-gray-300 rounded-xl overflow-hidden mb-6">
        {/* Date Selection */}
        <div className="p-4 border-b border-gray-300">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-lg border-none p-0 focus:ring-0"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Time Selection */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-lg border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full text-lg border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Package Selection */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
          Select Package
        </label>
        <div className="space-y-3">
          {service.packages?.map((pkg) => (
            <label
              key={pkg.id}
              className={`block relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPackage === pkg.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="package"
                value={pkg.id}
                checked={selectedPackage === pkg.id}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="hidden"
              />
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block font-medium text-gray-900">{pkg.name}</span>
                    <span className="block text-sm text-gray-500">{pkg.description}</span>
                  </div>
                  <span className="font-semibold">${pkg.price}</span>
                </div>
                <div className="text-xs text-gray-500 space-y-1 pt-2 border-t border-gray-100">
                  {pkg.includes.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Add-ons Selection */}
      {selectedPackage && service.addons && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Additional Services
          </label>
          <div className="space-y-3">
            {service.addons.map((addon) => (
              <label
                key={addon.id}
                className={`block relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedAddons.includes(addon.id)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAddons([...selectedAddons, addon.id]);
                    } else {
                      setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                    }
                  }}
                  className="hidden"
                />
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block font-medium text-gray-900">{addon.name}</span>
                    <span className="block text-sm text-gray-500">{addon.description}</span>
                  </div>
                  <span className="font-semibold">+${addon.price}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      {selectedPackage && (
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Base price</span>
              <span>${service.packages?.find(p => p.id === selectedPackage)?.price}</span>
            </div>
            {selectedAddons.map(addonId => {
              const addon = service.addons?.find(a => a.id === addonId);
              return (
                <div key={addonId} className="flex justify-between">
                  <span className="text-gray-600">{addon?.name}</span>
                  <span>+${addon?.price}</span>
                </div>
              );
            })}
            <div className="flex justify-between pt-3 border-t border-gray-200 font-semibold">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        disabled={!selectedPackage || !date || !startTime || !endTime}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Book Now
      </button>

      {/* No charge disclaimer */}
      <p className="text-center text-sm text-gray-500 mt-4">
        You won't be charged yet
      </p>
    </div>
  );

  const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-black">
        <img
          src={service.profileImage}
          alt={service.vendorName}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Vendor Profile Preview - Now clickable */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-6">
              {/* Make the entire vendor section clickable */}
              <div 
                onClick={() => navigate(`/vendors/${service.vendorId}`)}
                className="flex items-center space-x-6 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src={service.vendorImage}
                  alt={service.vendorName}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                />
                <div>
                  <div className="inline-block px-4 py-1 rounded-full bg-blue-500 text-white text-sm font-medium mb-4">
                    {service.serviceType}
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{service.vendorName}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 font-medium">{service.rating}</span>
                      <span className="mx-1">·</span>
                      <span>{service.reviewCount} reviews</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center">
                      <LocationIcon className="h-5 w-5 mr-1" />
                      <span>{service.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Estimator */}
        <div className="lg:hidden mb-8">
          <EstimateWidget />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Service Info */}
          <div className="lg:col-span-2">
            {renderServiceDetails()}
          </div>

          {/* Right Column - Desktop Estimator */}
          <div className="hidden lg:block lg:col-span-1">
            <EstimateWidget />
          </div>
        </div>
      </div>

      {/* Booking Flow Modal */}
      {showBookingFlow && (
        <ServiceBookingFlow
          service={service}
          selectedPackage={selectedPackage}
          selectedAddons={selectedAddons}
          date={date}
          time={selectedTime}
          onClose={() => setShowBookingFlow(false)}
        />
      )}
    </div>
  );
};

export default ServiceDetailsPage; 