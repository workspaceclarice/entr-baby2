import React from 'react';
import { Venue } from '../../types/venue';
import { StarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';

interface VenueCardProps {
  venue: Venue;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3]">
        <img
          src={venue.images[0]}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
            ${venue.pricePerHour}/hr
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{venue.name}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-1" />
            {venue.location.city}, {venue.location.state}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <UsersIcon className="h-4 w-4 mr-1" />
            Up to {venue.maxCapacity} guests
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {venue.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700"
            >
              {amenity.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueCard; 