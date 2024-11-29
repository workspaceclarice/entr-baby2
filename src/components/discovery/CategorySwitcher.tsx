import React from 'react';

export type Category = 'events' | 'services' | 'venues';

export interface CategorySwitcherProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
}

const CategorySwitcher: React.FC<CategorySwitcherProps> = ({ category, onCategoryChange }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onCategoryChange('events')}
        className={`px-4 py-2 rounded-lg ${
          category === 'events'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Events
      </button>
      <button
        onClick={() => onCategoryChange('services')}
        className={`px-4 py-2 rounded-lg ${
          category === 'services'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Services
      </button>
      <button
        onClick={() => onCategoryChange('venues')}
        className={`px-4 py-2 rounded-lg ${
          category === 'venues'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Venues
      </button>
    </div>
  );
};

export default CategorySwitcher; 