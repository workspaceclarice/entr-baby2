import React from 'react';
import { Link } from 'react-router-dom';
import { Venue } from '../../../types';
import { StarIcon, LocationIcon } from '../../icons';

interface VenueCardProps {
  venue: Venue;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  return (
    <Link to={`/venues/${venue.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-video">
          <img
            src={venue.images[0]}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Price Badge */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="font-semibold">${venue.basePrice}</span>
            <span className="text-gray-600 text-sm">/event</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Venue Type */}
          <div className="text-sm text-purple-600 font-medium mb-1">
            {venue.type}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
            {venue.name}
          </h3>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <LocationIcon className="w-4 h-4 mr-1" />
            {venue.location}
          </div>

          {/* Capacity */}
          <div className="text-sm text-gray-500 mb-2">
            {venue.capacity.min}-{venue.capacity.max} guests
          </div>

          {/* Rating */}
          {venue.rating && (
            <div className="flex items-center">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="ml-1 font-medium">{venue.rating}</span>
              <span className="mx-1 text-gray-300">·</span>
              <span className="text-gray-500">{venue.reviewCount} reviews</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VenueCard; 