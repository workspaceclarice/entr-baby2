import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';

interface VendorCardProps {
  vendor: {
    id: string;
    name: string;
    image: string;
    category: string;
    rating: number;
    reviewCount: number;
    location: string;
    description: string;
  };
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <Link to={`/vendors/${vendor.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-[16/9] relative overflow-hidden">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
              {vendor.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-purple-600">
            {vendor.name}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-500">
              <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm">{vendor.rating} ({vendor.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <span className="text-sm">{vendor.location}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{vendor.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default VendorCard; 