import React from 'react';
import { ListingCategory } from '../../types';

export interface SearchFiltersProps {
  category: ListingCategory;
  filters: any;
  onChange: (filters: any) => void;
}

interface FilterOption {
  id: string;
  name: string;
  options: { value: string; label: string }[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ category, filters, onChange }) => {
  const eventFilters: FilterOption[] = [
    {
      id: 'date',
      name: 'Date',
      options: [
        { value: 'today', label: 'Today' },
        { value: 'tomorrow', label: 'Tomorrow' },
        { value: 'this-week', label: 'This Week' },
        { value: 'this-weekend', label: 'This Weekend' },
        { value: 'next-week', label: 'Next Week' },
        { value: 'next-month', label: 'Next Month' }
      ]
    },
    {
      id: 'price',
      name: 'Price',
      options: [
        { value: 'free', label: 'Free' },
        { value: 'under-25', label: 'Under $25' },
        { value: '25-50', label: '$25 to $50' },
        { value: '50-100', label: '$50 to $100' },
        { value: 'over-100', label: 'Over $100' }
      ]
    },
    {
      id: 'time',
      name: 'Time',
      options: [
        { value: 'morning', label: 'Morning' },
        { value: 'afternoon', label: 'Afternoon' },
        { value: 'evening', label: 'Evening' },
        { value: 'night', label: 'Night' }
      ]
    },
    {
      id: 'distance',
      name: 'Distance',
      options: [
        { value: '1mi', label: 'Within 1 mile' },
        { value: '5mi', label: 'Within 5 miles' },
        { value: '10mi', label: 'Within 10 miles' },
        { value: '25mi', label: 'Within 25 miles' }
      ]
    }
  ];

  const handleFilterChange = (filterId: string, value: string) => {
    if (value === '') {
      const newFilters = { ...filters };
      delete newFilters[filterId];
      onChange(newFilters);
    } else {
      onChange({
        ...filters,
        [filterId]: value
      });
    }
  };

  const activeFiltersCount = Object.keys(filters).length;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <FilterIcon className="h-5 w-5" />
        <span className="font-medium">Filters</span>
        {activeFiltersCount > 0 && (
          <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs font-medium">
            {activeFiltersCount}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {eventFilters.map((filter) => (
          <select
            key={filter.id}
            value={filters[filter.id] || ''}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            className="block pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <option value="">{filter.name}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {activeFiltersCount > 0 && (
        <button
          onClick={() => onChange({})}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

const FilterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

export default SearchFilters; 