import React from 'react';
import { useParams } from 'react-router-dom';
import { venues } from '../../data/venues';
import VenueBookingWidget from '../../components/venues/VenueBookingWidget';
import { StarIcon, LocationIcon, UsersIcon, CheckIcon, PriceIcon } from '../../components/icons';

const VenueDetailsPage: React.FC = () => {
  const { id } = useParams();
  const venue = venues.find(v => v.id === id) || venues[0];

  const renderVenueDetails = () => (
    <div className="space-y-12">
      {/* Venue Details Summary */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <UsersIcon className="w-6 h-6 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">Capacity</h3>
              <p className="text-gray-600">{venue.capacity.min} - {venue.capacity.max} guests</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <LocationIcon className="w-6 h-6 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">Location</h3>
              <p className="text-gray-600">{venue.location}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <PriceIcon className="w-6 h-6 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">Starting Price</h3>
              <p className="text-gray-600">${venue.basePrice} per event</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">About This Venue</h2>
        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
          {venue.description}
        </p>
      </section>

      {/* Amenities */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {venue.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-gray-600">{amenity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {venue.images.map((photo, index) => (
            <div 
              key={index}
              className={`relative rounded-lg overflow-hidden ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={photo}
                alt={`${venue.name} - Photo ${index + 1}`}
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      {venue.reviews && venue.reviews.length > 0 && (
        <section className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <div className="flex items-center">
              <StarIcon className="w-6 h-6 text-yellow-400" />
              <span className="ml-2 font-semibold">{venue.rating}</span>
              <span className="mx-2 text-gray-400">·</span>
              <span className="text-gray-600">{venue.reviewCount} reviews</span>
            </div>
          </div>

          <div className="space-y-8">
            {venue.reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                <div className="flex items-start space-x-4">
                  <img 
                    src={review.userImage} 
                    alt={review.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.userName}</h4>
                        <p className="text-sm text-gray-500">{review.eventType}</p>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="ml-1 font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.content}</p>
                    <p className="mt-2 text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-black">
        <img
          src={venue.images[0]}
          alt={venue.name}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Venue Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-500 text-white text-sm font-medium">
                {venue.type}
              </div>
              <h1 className="text-4xl font-bold">{venue.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 font-medium">{venue.rating}</span>
                  <span className="mx-1">·</span>
                  <span>{venue.reviewCount} reviews</span>
                </div>
                <span>·</span>
                <div className="flex items-center">
                  <LocationIcon className="h-5 w-5 mr-1" />
                  <span>{venue.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Estimator - Moved outside grid for better mobile layout */}
        <div className="lg:hidden mb-8">
          <VenueBookingWidget venue={venue} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Venue Info */}
          <div className="lg:col-span-2">
            {renderVenueDetails()}
          </div>

          {/* Right Column - Desktop Estimator */}
          <div className="hidden lg:block lg:col-span-1">
            <VenueBookingWidget venue={venue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage; 