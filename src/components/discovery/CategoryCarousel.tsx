import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

interface CategoryCarouselProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
  type: 'events' | 'services' | 'venues';
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  type 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getGradientColors = () => {
    switch (type) {
      case 'events':
        return 'from-purple-500 to-indigo-500';
      case 'services':
        return 'from-blue-500 to-cyan-500';
      case 'venues':
        return 'from-emerald-500 to-teal-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="relative">
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
      </button>

      {/* Categories */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-8"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 cursor-pointer scroll-snap-align-start ${
              selectedCategory === category.id ? `ring-2 ring-${type === 'events' ? 'purple' : type === 'services' ? 'blue' : 'emerald'}-500` : ''
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {/* Fixed width and height for 2 inches (192px) */}
            <div className="w-[192px]">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${getGradientColors()} opacity-60`} />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="font-medium text-base text-white line-clamp-2">{category.name}</h3>
                  <p className="text-sm text-white/80 mt-1">{category.count} {type}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
};

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default CategoryCarousel; 