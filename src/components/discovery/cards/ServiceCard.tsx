import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Service } from '../../../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => navigate(`/services/${service.id}`)}
    >
      <div className="relative aspect-w-16 aspect-h-9">
        <img
          src={service.profileImage}
          alt={service.vendorName}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          {service.isAvailable ? (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Available
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              Unavailable
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {service.vendorName}
            </h3>
            <p className="text-sm font-medium text-purple-600">{service.serviceType}</p>
          </div>
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{service.rating}</span>
            <span className="mx-1 text-gray-400">·</span>
            <span className="text-sm text-gray-500">{service.reviewCount} reviews</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <LocationIcon className="w-4 h-4 mr-1" />
          <span>{service.location}</span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900">
              Starting from ${service.priceRange.min}/hr
            </span>
            <button 
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/services/${service.id}`);
              }}
            >
              View Details
            </button>
          </div>
        </div>
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

export default ServiceCard; 