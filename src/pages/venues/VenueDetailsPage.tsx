import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  StarIcon, 
  MapPinIcon, 
  UsersIcon, 
  ChevronLeftIcon, 
  Square3Stack3DIcon, 
  QuestionMarkCircleIcon, 
  HomeIcon 
} from '@heroicons/react/24/outline';
import { venues } from '../../data/venues';
import VenueGallery from '../../components/venues/VenueGallery';
import VenueEstimator from '../../components/venues/VenueEstimator';
import VenueBookingFlow from '../../components/venues/VenueBookingFlow';
import { Breadcrumb } from '../../components/common';

export default function VenueDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const venue = venues.find(v => v.id === id);
  
  if (!venue) {
    return <div className="min-h-screen flex items-center justify-center">Venue not found</div>;
  }

  const averageRating = venue.reviews.reduce((acc, review) => acc + review.rating, 0) / venue.reviews.length;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: null },
    { id: 'amenities', name: 'Amenities', icon: null },
    { id: 'packages', name: 'Packages', icon: <Square3Stack3DIcon className="h-4 w-4" /> },
    { id: 'reviews', name: `Reviews (${venue.reviews.length})`, icon: null },
    { id: 'rules', name: 'Rules & Policies', icon: null },
    { id: 'faq', name: 'FAQ', icon: <QuestionMarkCircleIcon className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <Breadcrumb 
        items={[
          { label: 'Venues', href: '/venues' },
          { label: venue.name }
        ]} 
      />

      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1] bg-gray-100">
        <div className="absolute inset-0 w-full h-full">
          <VenueGallery images={venue.images} />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-4">{venue.name}</h1>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-gray-500">
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-full">
                  <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-purple-500" />
                  <span>{venue.location.city}, {venue.location.state}</span>
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-full">
                  <UsersIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-purple-500" />
                  <span>Up to {venue.maxCapacity} guests</span>
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-full">
                  <StarIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-yellow-400" />
                  <span className="font-medium">{averageRating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <nav className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex-none min-w-[120px] md:flex-1 whitespace-nowrap py-3 md:py-4 px-3 md:px-4 
                      text-sm font-medium flex items-center justify-center gap-2 transition-all
                      ${activeTab === tab.id
                        ? 'text-purple-600 border-b-2 border-purple-500 bg-purple-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              {activeTab === 'overview' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">{venue.description}</p>
                </div>
              )}
              
              {activeTab === 'amenities' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {venue.amenities.map((amenity, index) => (
                    <div 
                      key={amenity.id || index} 
                      className="flex items-center gap-3 p-3 md:p-4 bg-gray-50 rounded-lg"
                    >
                      {amenity.icon && <span className="text-purple-500">{amenity.icon}</span>}
                      <span className="text-gray-700 font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'packages' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venue.packages?.map((pkg, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-50 p-4 md:p-6 rounded-lg"
                    >
                      <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">{pkg.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                      <div className="flex items-baseline">
                        <span className="text-2xl md:text-3xl font-medium text-purple-600">${pkg.price}</span>
                        <span className="text-gray-500 text-sm ml-2">/package</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-3 md:space-y-4">
                  {venue.faq?.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <VenueEstimator 
                  venue={venue}
                  onBookNow={() => setIsBookingOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <VenueBookingFlow
        venue={venue}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}