import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, MapPinIcon, TagIcon } from '@heroicons/react/24/outline';
import { Service } from '../../types/service';
import { motion } from 'framer-motion';

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
    profileImage,
    tags = ['Professional', 'Experienced', 'Insured'] // Default tags if none provided
  } = service;

  return (
    <Link to={`/services/${id}`}>
      <motion.div 
        className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
        whileHover={{ y: -4 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Image Container */}
        <div className="relative aspect-w-16 aspect-h-9">
          <img
            src={profileImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category & Price Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-purple-600/90 backdrop-blur-sm rounded-full">
              {category}
            </span>
            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full">
              From ${basePrice}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-gray-600">{vendorName}</p>
            </div>
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
              <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-900">{rating}</span>
              <span className="mx-1 text-xs text-gray-500">({reviewCount})</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ServiceCard; 