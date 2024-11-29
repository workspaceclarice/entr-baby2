import React from 'react';
import { FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';

interface FilterSectionProps {
  onPriceChange: (range: string) => void;
  onSortChange: (sort: string) => void;
  selectedPrice: string;
  selectedSort: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  onPriceChange,
  onSortChange,
  selectedPrice,
  selectedSort
}) => {
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: '0-50', label: '$0 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'date-newest', label: 'Date: Newest First' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Price Filter */}
          <div className="relative">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={selectedPrice}
                onChange={(e) => onPriceChange(e.target.value)}
                className="appearance-none bg-transparent pl-2 pr-8 py-1 text-sm font-light text-gray-700 focus:outline-none focus:text-gray-900"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-gray-200" />

          {/* Sort Options */}
          <div className="relative">
            <div className="flex items-center space-x-2">
              <ArrowsUpDownIcon className="h-5 w-5 text-gray-400" />
              <select
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-transparent pl-2 pr-8 py-1 text-sm font-light text-gray-700 focus:outline-none focus:text-gray-900"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-500 font-light">
          Showing 1-20 of 156 results
        </div>
      </div>
    </div>
  );
};

export default FilterSection; 