import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Service } from '../../types';

const VendorProfilePage: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');

  // Mock vendor data - would come from API
  const vendor = {
    id: 'vendor1',
    name: 'Elite DJs',
    image: 'https://picsum.photos/seed/vendor1/200/200',
    coverImage: 'https://picsum.photos/seed/vendor1cover/1200/400',
    bio: 'Professional DJ service with over 10 years of experience specializing in weddings, corporate events, and private parties.',
    rating: 4.8,
    reviewCount: 156,
    location: 'Los Angeles, CA',
    services: [
      {
        id: '1',
        name: 'DJ Services',
        description: 'Professional DJ services for all types of events',
        image: 'https://picsum.photos/seed/dj1/400/300',
        priceRange: { min: 200, max: 500 }
      }
    ],
    venues: [
      {
        id: '1',
        name: 'The Sound Lounge',
        description: 'Intimate venue perfect for small gatherings',
        image: 'https://picsum.photos/seed/venue1/400/300',
        capacity: { min: 50, max: 150 }
      }
    ],
    portfolio: [
      { id: '1', image: 'https://picsum.photos/seed/port1/400/400', caption: 'Wedding Reception' },
      { id: '2', image: 'https://picsum.photos/seed/port2/400/400', caption: 'Corporate Event' },
      { id: '3', image: 'https://picsum.photos/seed/port3/400/400', caption: 'Birthday Party' },
      { id: '4', image: 'https://picsum.photos/seed/port4/400/400', caption: 'Club Night' },
      { id: '5', image: 'https://picsum.photos/seed/port5/400/400', caption: 'Festival Performance' },
      { id: '6', image: 'https://picsum.photos/seed/port6/400/400', caption: 'Private Event' }
    ],
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Sarah M.',
        userImage: 'https://picsum.photos/seed/user1/100/100',
        rating: 5,
        date: '2024-02-15',
        content: 'Amazing DJ! Had everyone dancing all night long.',
        eventType: 'Wedding Reception'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'John D.',
        userImage: 'https://picsum.photos/seed/user2/100/100',
        rating: 4,
        date: '2024-02-10',
        content: 'Great music selection and very professional.',
        eventType: 'Corporate Event'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image & Profile Section */}
      <div className="relative h-[300px] bg-black">
        <img
          src={vendor.coverImage}
          alt={vendor.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto flex items-end space-x-6">
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
            />
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white mb-2">{vendor.name}</h1>
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1">{vendor.rating}</span>
                  <span className="mx-1">·</span>
                  <span>{vendor.reviewCount} reviews</span>
                </div>
                <span>·</span>
                <div className="flex items-center">
                  <LocationIcon className="h-5 w-5" />
                  <span className="ml-1">{vendor.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['about', 'services', 'venues', 'portfolio', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'about' && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600">{vendor.bio}</p>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendor.services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-sm text-gray-500">
                    Starting from ${service.priceRange.min}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'venues' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendor.venues.map((venue) => (
              <div key={venue.id} className="bg-white rounded-xl shadow overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
                  <p className="text-gray-600 mb-4">{venue.description}</p>
                  <p className="text-sm text-gray-500">
                    Capacity: {venue.capacity.min}-{venue.capacity.max} guests
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {vendor.portfolio.map((item) => (
              <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {vendor.reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{review.userName}</h3>
                        <p className="text-sm text-gray-500">{review.eventType}</p>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.content}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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

export default VendorProfilePage; 