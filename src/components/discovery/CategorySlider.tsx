import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Category } from '../../types/category';

interface CategorySliderProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
  category: string;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  category,
}) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getRingColor = () => {
    switch (category) {
      case 'events':
        return 'ring-purple-600 hover:ring-purple-600';
      case 'services':
        return 'ring-blue-600 hover:ring-blue-600';
      case 'venues':
        return 'ring-green-600 hover:ring-green-600';
      default:
        return 'ring-purple-600 hover:ring-purple-600';
    }
  };

  const getOverlayColor = () => {
    switch (category) {
      case 'events':
        return 'bg-purple-900/50';
      case 'services':
        return 'bg-blue-900/50';
      case 'venues':
        return 'bg-green-900/50';
      default:
        return 'bg-purple-900/50';
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
      </button>

      {/* Categories Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 px-8 py-4"
      >
        {/* All Categories Card */}
        <button
          onClick={() => onSelectCategory('')}
          className={`flex-none w-48 h-64 rounded-xl overflow-hidden relative group ${
            !selectedCategory 
              ? `ring-2 ${getRingColor()} ring-opacity-50` 
              : `hover:ring-2 ${getRingColor()} ring-opacity-30`
          }`}
        >
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
            alt="All Categories"
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className={`absolute inset-0 ${getOverlayColor()}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-lg font-light tracking-wide">All Categories</h3>
          </div>
        </button>

        {/* Category Cards */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex-none w-48 h-64 rounded-xl overflow-hidden relative group ${
              selectedCategory === category.id 
                ? `ring-2 ${getRingColor()} ring-opacity-50` 
                : `hover:ring-2 ${getRingColor()} ring-opacity-30`
            }`}
          >
            <img
              src={getCategoryImage(category.id)}
              alt={category.name}
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className={`absolute inset-0 ${getOverlayColor()}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-lg font-light tracking-wide">
                {category.name}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
};

// Helper function to get appropriate images for each category
const getCategoryImage = (categoryId: string): string => {
  const categoryImages = {
    // Events
    'music': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    'food-drink': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    'arts': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
    'sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
    'nightlife': 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67',
    'workshops': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    
    // Services
    'catering': 'https://images.unsplash.com/photo-1555244162-803834f70033',
    'photography': 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5',
    'music-dj': 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0',
    'decor': 'https://images.unsplash.com/photo-1478146896981-b80fe463b330',
    'planning': 'https://images.unsplash.com/photo-1520333789090-1afc82db536a',
    
    // Venues
    'banquet-halls': 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
    'hotels': 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    'restaurants': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    'outdoor': 'https://images.unsplash.com/photo-1510076857177-7470076d4098',
    'unique': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
  };

  return categoryImages[categoryId as keyof typeof categoryImages] || 
         'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'; // default image
};

export default CategorySlider; 