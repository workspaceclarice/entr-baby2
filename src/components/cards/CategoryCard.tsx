import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, image, link }) => {
  return (
    <Link 
      to={link} 
      className="group relative bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-medium text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-200">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard; 