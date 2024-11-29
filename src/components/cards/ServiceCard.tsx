import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

interface ServiceCardProps {
  id: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  price: string;
  location: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  category,
  rating,
  reviews,
  image,
  price,
  location
}) => {
  return (
    <Link to={`/services/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
              {category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-purple-600">
            {title}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({reviews} reviews)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{location}</span>
            <span className="text-sm font-medium text-gray-900">From {price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard; 