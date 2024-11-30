import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Service } from '../../types/service';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const {
    id,
    title,
    vendorName,
    description,
    location,
    category,
    rating,
    reviewCount,
    basePrice,
    profileImage
  } = service;

  return (
    <Link to={`/services/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-w-16 aspect-h-9">
          <img
            src={profileImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Tag */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-purple-600/90 rounded-full">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-gray-600">{vendorName}</p>
            </div>
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-900">{rating}</span>
              <span className="mx-1 text-gray-500">·</span>
              <span className="text-sm text-gray-500">{reviewCount} reviews</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Price */}
          <div className="flex items-baseline">
            <span className="text-lg font-semibold text-gray-900">
              ${basePrice}
            </span>
            <span className="text-sm text-gray-500 ml-1">starting price</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard; 