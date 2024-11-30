import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

interface VendorProfileProps {
  vendorId: string;
  name: string;
  image: string;
  bio: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  memberSince: string;
  isVerified?: boolean;
}

const VendorProfile: React.FC<VendorProfileProps> = ({
  vendorId,
  name,
  image,
  bio,
  rating,
  reviewCount,
  responseTime,
  memberSince,
  isVerified = false
}) => {
  return (
    <Link to={`/vendors/${vendorId}`} className="block">
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-medium text-gray-900">{name}</h3>
              {isVerified && (
                <CheckBadgeIcon className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <div className="flex items-center mt-1 mb-2">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 font-medium">{rating}</span>
              <span className="mx-1.5 text-gray-500">·</span>
              <span className="text-gray-500">{reviewCount} reviews</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{bio}</p>
            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
              <span>Responds in {responseTime}</span>
              <span>·</span>
              <span>Member since {memberSince}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VendorProfile; 