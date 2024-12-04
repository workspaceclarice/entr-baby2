import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { 
  ArrowsUpDownIcon, 
  AdjustmentsHorizontalIcon,
  FunnelIcon 
} from '@heroicons/react/24/outline';
import { FilterPopover } from './FilterPopover';

interface FilterSectionProps {
  selectedPrice: string;
  selectedSort: string;
  onPriceChange: (value: string) => void;
  onSortChange: (value: string) => void;
  category: 'events' | 'services' | 'venues';
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, values: string[]) => void;
  totalResults: number;
}

const SORT_OPTIONS = {
  events: [
    { value: 'recommended', label: 'Recommended' },
    { value: 'date-asc', label: 'Date: Soonest' },
    { value: 'date-desc', label: 'Date: Latest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' }
  ],
  services: [
    { value: 'recommended', label: 'Recommended' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'reviews-desc', label: 'Most Reviews' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' }
  ],
  venues: [
    { value: 'recommended', label: 'Recommended' },
    { value: 'capacity-asc', label: 'Capacity: Smallest' },
    { value: 'capacity-desc', label: 'Capacity: Largest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' }
  ]
};

export default function FilterSection({
  selectedPrice,
  selectedSort,
  onPriceChange,
  onSortChange,
  category,
  selectedFilters,
  onFilterChange,
  totalResults
}: FilterSectionProps) {
  const sortOptions = SORT_OPTIONS[category];

  return (
    <div className="sticky top-0 z-10 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Mobile Filter Button */}
          <div className="sm:hidden">
            <FilterPopover
              category={category}
              selectedFilters={selectedFilters}
              onFilterChange={onFilterChange}
            />
          </div>

          {/* Desktop Controls */}
          <div className="hidden sm:flex items-center justify-between w-full">
            <div className="flex items-center space-x-6">
              {/* Filter Button */}
              <FilterPopover
                category={category}
                selectedFilters={selectedFilters}
                onFilterChange={onFilterChange}
              />

              {/* Divider */}
              <div className="h-4 w-px bg-gray-200" />

              {/* Sort Dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-1.5 text-sm text-gray-700 hover:text-gray-900">
                  <ArrowsUpDownIcon className="h-4 w-4" />
                  <span className="font-light">
                    {sortOptions.find(opt => opt.value === selectedSort)?.label || 'Sort'}
                  </span>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-50 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.value}>
                          {({ active }) => (
                            <button
                              onClick={() => onSortChange(option.value)}
                              className={`
                                ${active ? 'bg-gray-50' : ''}
                                ${selectedSort === option.value ? 'text-gray-900' : 'text-gray-600'}
                                block px-4 py-2 text-sm w-full text-left font-light hover:text-gray-900
                              `}
                            >
                              {option.label}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {/* Results Count - Now in one line */}
            <p className="text-sm text-gray-500 font-light">
              {totalResults.toLocaleString()} results
            </p>
          </div>

          {/* Mobile Sort Button */}
          <Menu as="div" className="sm:hidden relative">
            <Menu.Button className="flex items-center text-sm text-gray-700 hover:text-gray-900">
              <AdjustmentsHorizontalIcon className="h-4 w-4" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.value}>
                      {({ active }) => (
                        <button
                          onClick={() => onSortChange(option.value)}
                          className={`
                            ${active ? 'bg-gray-50' : ''}
                            ${selectedSort === option.value ? 'text-gray-900' : 'text-gray-600'}
                            block px-4 py-2 text-sm w-full text-left font-light hover:text-gray-900
                          `}
                        >
                          {option.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
} 