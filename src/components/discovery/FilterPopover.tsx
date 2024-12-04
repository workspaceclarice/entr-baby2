import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
}

interface FilterPopoverProps {
  category: 'events' | 'services' | 'venues';
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, values: string[]) => void;
}

const EVENT_FILTERS: FilterOption[] = [
  {
    id: 'price',
    name: 'Price Range',
    options: [
      { value: '0-25', label: 'Under $25' },
      { value: '25-50', label: '$25 - $50' },
      { value: '50-100', label: '$50 - $100' },
      { value: '100-200', label: '$100 - $200' },
      { value: '200-500', label: '$200 - $500' },
      { value: '500+', label: '$500+' },
    ],
  },
  {
    id: 'date',
    name: 'Date',
    options: [
      { value: 'today', label: 'Today' },
      { value: 'tomorrow', label: 'Tomorrow' },
      { value: 'this-week', label: 'This Week' },
      { value: 'this-weekend', label: 'This Weekend' },
      { value: 'next-week', label: 'Next Week' },
      { value: 'next-month', label: 'Next Month' },
    ],
  },
];

const SERVICE_FILTERS: FilterOption[] = [
  {
    id: 'price',
    name: 'Price Range',
    options: [
      { value: '0-100', label: 'Under $100' },
      { value: '100-250', label: '$100 - $250' },
      { value: '250-500', label: '$250 - $500' },
      { value: '500-1000', label: '$500 - $1,000' },
      { value: '1000-2500', label: '$1,000 - $2,500' },
      { value: '2500+', label: '$2,500+' },
    ],
  },
  {
    id: 'rating',
    name: 'Rating',
    options: [
      { value: '4.5+', label: '4.5 & up' },
      { value: '4.0+', label: '4.0 & up' },
      { value: '3.5+', label: '3.5 & up' },
      { value: '3.0+', label: '3.0 & up' },
    ],
  },
  {
    id: 'availability',
    name: 'Availability',
    options: [
      { value: 'weekdays', label: 'Weekdays' },
      { value: 'weekends', label: 'Weekends' },
      { value: 'evenings', label: 'Evenings' },
      { value: 'mornings', label: 'Mornings' },
    ],
  },
];

const VENUE_FILTERS: FilterOption[] = [
  {
    id: 'price',
    name: 'Price Range (per hour)',
    options: [
      { value: '0-200', label: 'Under $200' },
      { value: '200-500', label: '$200 - $500' },
      { value: '500-1000', label: '$500 - $1,000' },
      { value: '1000-2000', label: '$1,000 - $2,000' },
      { value: '2000-5000', label: '$2,000 - $5,000' },
      { value: '5000+', label: '$5,000+' },
    ],
  },
  {
    id: 'capacity',
    name: 'Capacity',
    options: [
      { value: '0-50', label: 'Up to 50' },
      { value: '50-100', label: '50 - 100' },
      { value: '100-200', label: '100 - 200' },
      { value: '200-500', label: '200 - 500' },
      { value: '500+', label: '500+' },
    ],
  },
  {
    id: 'amenities',
    name: 'Amenities',
    options: [
      { value: 'parking', label: 'Parking' },
      { value: 'kitchen', label: 'Kitchen' },
      { value: 'wifi', label: 'WiFi' },
      { value: 'av-equipment', label: 'AV Equipment' },
      { value: 'catering', label: 'Catering Allowed' },
      { value: 'wheelchair', label: 'Wheelchair Accessible' },
    ],
  },
];

export const FilterPopover: React.FC<FilterPopoverProps> = ({
  category,
  selectedFilters,
  onFilterChange,
}) => {
  const filters = category === 'events' 
    ? EVENT_FILTERS 
    : category === 'services'
    ? SERVICE_FILTERS
    : VENUE_FILTERS;

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <Popover className="relative ml-auto">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
              ${open ? 'bg-gray-50 text-gray-900' : 'text-gray-700'}
              group inline-flex items-center space-x-1.5 text-sm hover:text-gray-900 px-3 py-2 rounded-md
              sm:hover:bg-gray-50 sm:transition-colors
            `}
          >
            <FunnelIcon className="h-4 w-4" />
            <span className="font-light">Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 bg-purple-100 text-purple-600 py-0.5 px-2 rounded-full text-xs">
                {activeFilterCount}
              </span>
            )}
          </Popover.Button>

          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 sm:hidden z-[90]" />
          </Transition.Child>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="sm:opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
            enterTo="sm:opacity-100 translate-y-0 sm:scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="sm:opacity-100 translate-y-0 sm:scale-100"
            leaveTo="sm:opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
          >
            <Popover.Panel 
              className="fixed inset-x-0 top-auto bottom-0 
                sm:absolute sm:top-full sm:left-0 sm:bottom-auto sm:right-auto 
                z-[100] sm:mt-2 w-screen sm:w-96 transform"
              static
            >
              <div className="relative bg-white rounded-t-xl sm:rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 max-h-[85vh] sm:max-h-[600px] overflow-auto">
                <div className="sticky top-0 bg-white px-4 py-3 sm:p-6 border-b sm:border-none flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-900">Filters</h3>
                  <Popover.Button className="sm:hidden -m-2 p-2 rounded-md hover:bg-gray-100">
                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                  </Popover.Button>
                </div>

                <div className="p-4 sm:p-6">
                  {activeFilterCount > 0 && (
                    <div className="flex justify-end mb-6">
                      <button
                        onClick={() => {
                          filters.forEach(filter => onFilterChange(filter.id, []));
                          close();
                        }}
                        className="text-sm text-gray-500 hover:text-gray-700 font-light"
                      >
                        Clear all
                      </button>
                    </div>
                  )}

                  <div className="space-y-8">
                    {filters.map((filter) => (
                      <div key={filter.id} className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">{filter.name}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {filter.options.map((option) => (
                            <label
                              key={option.value}
                              className={`
                                flex items-center px-3 py-2 rounded-md text-sm font-light
                                ${selectedFilters[filter.id]?.includes(option.value)
                                  ? 'bg-purple-50 text-purple-900'
                                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }
                                cursor-pointer transition-colors
                              `}
                            >
                              <input
                                type="checkbox"
                                checked={selectedFilters[filter.id]?.includes(option.value) || false}
                                onChange={(e) => {
                                  const currentValues = selectedFilters[filter.id] || [];
                                  const newValues = e.target.checked
                                    ? [...currentValues, option.value]
                                    : currentValues.filter(v => v !== option.value);
                                  onFilterChange(filter.id, newValues);
                                }}
                                className="sr-only"
                              />
                              <span>{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sm:hidden sticky bottom-0 bg-white px-4 py-3 border-t">
                  <Popover.Button
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700"
                  >
                    Apply Filters
                  </Popover.Button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}; 