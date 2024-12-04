import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, MapPinIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import VenueGallery from '../components/venues/VenueGallery';
import VenueEstimator from '../components/venues/VenueEstimator';
import { venues } from '../data/venues';

export default function VenueDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const venue = venues.find(v => v.id === id);
  
  if (!venue) {
    return <div>Venue not found</div>;
  }

  const averageRating = venue.reviews.reduce((acc, review) => acc + review.rating, 0) / venue.reviews.length;

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'reviews', name: `Reviews (${venue.reviews.length})` },
    { id: 'rules', name: 'Rules & Policies' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
      </button>

      {/* Gallery */}
      <VenueGallery images={venue.images} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-light text-gray-900 mb-2">{venue.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{venue.location.city}, {venue.location.state}</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  <span>Up to {venue.maxCapacity} guests</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{averageRating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="prose max-w-none">
              {activeTab === 'overview' && (
                <div>
                  <p className="text-gray-600">{venue.description}</p>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {venue.features.map((feature) => (
                      <div key={feature.id} className="border rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">{feature.name}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {venue.amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <span className="text-gray-400">{amenity.icon}</span>
                      <span className="text-gray-600">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {venue.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{review.author}</h4>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="h-5 w-5 text-yellow-400" />
                          <span className="ml-1 text-gray-600">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="space-y-4">
                  {venue.rules.map((rule, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span className="text-gray-600">{rule}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <VenueEstimator 
              venue={venue}
              onBookNow={() => setIsBookingOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 