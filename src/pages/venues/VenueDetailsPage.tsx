import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  TagIcon, 
  ShareIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';
import { venues } from '../../data/venues';
import VenueBookingFlow from '../../components/venues/VenueBookingFlow';

const VenueDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'gallery' | 'faq'>('overview');

  const venue = venues.find(v => v.id === id);
  if (!venue) return <div>Venue not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh]">
        <img
          src={venue.images[0]}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 bg-white/10 backdrop-blur-md rounded-full"
          >
            <HeartIcon className={`h-6 w-6 ${isLiked ? 'text-red-500' : 'text-white'}`} />
          </button>
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <ShareIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Venue Info */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="max-w-7xl mx-auto text-white">
            <div className="flex items-center space-x-2 mb-2">
              {venue.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-light mb-2">{venue.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1">{venue.rating} ({venue.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-1" />
                <span>{venue.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {['overview', 'packages', 'gallery', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Content */}
          <div className="lg:w-2/3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-light mb-4">About this venue</h2>
                  <p className="text-gray-600 leading-relaxed">{venue.description}</p>
                </div>

                {/* Features */}
                <div>
                  <h2 className="text-2xl font-light mb-4">Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {venue.features.map((feature, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <span className="text-2xl">{feature.icon}</span>
                        <h3 className="font-medium mt-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <h2 className="text-2xl font-light mb-4">Capacity</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(venue.capacity).map(([layout, count]) => (
                      <div key={layout} className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="text-sm text-gray-500 capitalize">{layout}</h3>
                        <p className="text-2xl font-light mt-1">{count}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="text-2xl font-light mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {venue.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-gray-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h2 className="text-2xl font-light mb-4">Venue Rules</h2>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <ul className="space-y-4">
                      {venue.rules.map((rule, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span className="text-gray-600">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {venue.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${venue.name} - ${index + 1}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Booking */}
          <div className="lg:w-1/3">
            <div className="sticky top-4 bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-light">${venue.pricePerHour}</span>
                  <span className="text-gray-500">per hour</span>
                </div>
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-1" />
                    <span>{venue.minimumHours}hr minimum</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 mr-1" />
                    <span>Up to {Math.max(...Object.values(venue.capacity))}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowBookingFlow(true)}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Check Availability
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                {venue.cancellationPolicy}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Flow */}
      {showBookingFlow && (
        <VenueBookingFlow
          venue={venue}
          onClose={() => setShowBookingFlow(false)}
        />
      )}
    </div>
  );
};

export default VenueDetailsPage; 