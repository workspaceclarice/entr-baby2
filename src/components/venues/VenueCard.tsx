import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Venue } from '../../types/venue';

interface VenueCardProps {
  venue: Venue;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  const navigate = useNavigate();
  
  const averageRating = venue.reviews.reduce((acc, review) => acc + review.rating, 0) / venue.reviews.length;

  return (
    <div 
      onClick={() => navigate(`/venues/${venue.id}`)}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative h-48">
        <img
          src={venue.images[0]}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-900">{venue.name}</h3>
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{averageRating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{venue.location.city}, {venue.location.state}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <UsersIcon className="h-4 w-4 mr-1" />
          <span>Up to {venue.maxCapacity} guests</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-gray-900">
            <span className="font-medium">${venue.pricePerHour}</span>
            <span className="text-sm text-gray-500">/hour</span>
          </div>
          <div className="text-sm text-gray-500">
            {venue.minimumHours}hr minimum
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard; 