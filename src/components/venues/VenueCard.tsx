import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { Venue } from '../../types';

type VenueCardProps = {
  venue: Venue;
};

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  const {
    id,
    name,
    description,
    location,
    capacity,
    pricePerHour,
    rating,
    reviewCount,
    images,
    amenities
  } = venue;

  return (
    <Link to={`/venues/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-w-16 aspect-h-9">
          <img
            src={images?.[0]}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-900">{rating}</span>
              <span className="mx-1 text-gray-500">·</span>
              <span className="text-sm text-gray-500">{reviewCount} reviews</span>
            </div>
          </div>

          {/* Location & Capacity */}
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{location}</span>
            <span className="mx-2">·</span>
            <UserGroupIcon className="h-4 w-4 mr-1" />
            <span>{capacity.min}-{capacity.max} guests</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-3">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                +{amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline">
            <span className="text-lg font-semibold text-gray-900">
              ${pricePerHour}
            </span>
            <span className="text-sm text-gray-500 ml-1">/hour</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard; 