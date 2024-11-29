import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/solid';
import VendorBookingFlow from '../../components/vendors/VendorBookingFlow';
import VendorReviews from '../../components/vendors/VendorReviews';
import { fetchVendorById } from '../../services/vendorService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { transformVendorData, Vendor } from '../../types/vendor';

const VendorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingFlow, setShowBookingFlow] = useState(false);

  useEffect(() => {
    const loadVendor = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error('Vendor ID not found');
        }
        const data = await fetchVendorById(id);
        const transformedData = transformVendorData(data);
        setVendor(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load vendor');
      } finally {
        setLoading(false);
      }
    };

    loadVendor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message={error || 'Vendor not found'} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="h-[50vh] relative">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full mb-4">
                {vendor.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {vendor.name}
              </h1>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>{vendor.rating} ({vendor.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{vendor.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>Next available: {vendor.availability.nextAvailable}</span>
                </div>
              </div>
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">About this vendor</h2>
                <p>{vendor.description}</p>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Services</h2>
              <div className="space-y-4">
                {vendor.services.map((service) => (
                  <div key={service.name} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                      <span className="text-lg font-medium text-gray-900">{service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <VendorReviews vendorId={vendor.id} />
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Book this vendor</h3>
              {showBookingFlow ? (
                <VendorBookingFlow
                  vendor={vendor}
                  onClose={() => setShowBookingFlow(false)}
                />
              ) : (
                <button
                  onClick={() => setShowBookingFlow(true)}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Check Availability
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailPage; 