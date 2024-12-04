import React, { useState } from 'react';
import { ListingCategory } from '../types';
import { MapPinIcon } from '@heroicons/react/24/outline';
import CategorySlider from '../components/discovery/CategorySlider';
import FilterSection from '../components/discovery/FilterSection';
import ListingGrid from '../components/discovery/ListingGrid';
import { events } from '../data/events';
import { services } from '../data/services';
import { venues } from '../data/venues';
import { eventCategories, serviceCategories, venueCategories } from '../data/categories';
import { FilterPopover } from '../components/discovery/FilterPopover';

interface DiscoveryPageProps {
  category: ListingCategory;
}

export const DiscoveryPage: React.FC<DiscoveryPageProps> = ({ category }) => {
  const [location, setLocation] = useState('San Francisco, CA');
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  // Get category data based on type
  const getCategoryData = () => {
    switch (category) {
      case 'events':
        return eventCategories;
      case 'services':
        return serviceCategories;
      case 'venues':
        return venueCategories;
      default:
        return [];
    }
  };

  // Get the correct listings based on category
  const getListings = () => {
    switch (category) {
      case 'events':
        return events;
      case 'services':
        return services;
      case 'venues':
        return venues;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="pt-32 pb-8">
          <div className="max-w-4xl">
            <h1 className={`text-4xl sm:text-5xl font-extralight tracking-tight mb-3 ${
              'text-gray-900'
            }`}>
              {category === 'events' && 'Discover Events'}
              {category === 'services' && 'Browse Services'}
              {category === 'venues' && 'Find Venues'}
            </h1>
            <p className={`text-lg font-light leading-relaxed mb-8 ${
              'text-gray-600'
            }`}>
              {category === 'events' && 'Discover and book tickets to the most exciting events happening in your area'}
              {category === 'services' && 'Find and connect with top-rated vendors to make your event unforgettable'}
              {category === 'venues' && 'Explore unique spaces that perfectly match your event vision'}
            </p>
          </div>
        </div>

        {/* Location and Search Section */}
        <div className="space-y-6 mb-8">
          {/* Location Selector */}
          <div>
            <div 
              className="inline-flex items-center border-b border-gray-300 hover:border-purple-600 transition-colors pb-1 cursor-pointer"
              onClick={() => setIsEditingLocation(true)}
            >
              <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
              {isEditingLocation ? (
                <select
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setIsEditingLocation(false);
                  }}
                  onBlur={() => setIsEditingLocation(false)}
                  className="bg-transparent border-none focus:ring-0 text-gray-600 pr-8 py-0"
                  autoFocus
                >
                  <option value="San Francisco, CA">San Francisco, CA</option>
                  <option value="Los Angeles, CA">Los Angeles, CA</option>
                  <option value="New York, NY">New York, NY</option>
                  <option value="Chicago, IL">Chicago, IL</option>
                  <option value="Miami, FL">Miami, FL</option>
                </select>
              ) : (
                <span className="text-gray-600">{location}</span>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-2xl mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${category.toLowerCase()}...`}
              className="w-full px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Slider */}
        <div className="mb-6">
          <CategorySlider
            categories={getCategoryData()}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            category={category}
          />
        </div>

        {/* Filter Section */}
        <FilterSection
          selectedPrice={selectedPrice}
          selectedSort={selectedSort}
          onPriceChange={setSelectedPrice}
          onSortChange={setSelectedSort}
          category={category}
          selectedFilters={filters}
          onFilterChange={(filterId, values) => {
            setFilters(prev => ({
              ...prev,
              [filterId]: values
            }));
          }}
          totalResults={getListings().length}
        />

        {/* Listing Grid */}
        <div className="mt-6">
          <ListingGrid
            category={category}
            listings={getListings()}
            searchQuery={searchQuery}
            filters={{
              categoryId: selectedCategory,
              priceRange: selectedPrice,
              sort: selectedSort,
              location: location
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoveryPage; 