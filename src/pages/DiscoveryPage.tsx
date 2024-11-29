import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import CategorySlider from '../components/discovery/CategorySlider';
import FilterSection from '../components/discovery/FilterSection';
import ListingGrid from '../components/discovery/ListingGrid';
import { eventCategories, serviceCategories, venueCategories } from '../data/categories';
import { events } from '../data/events';
import { services } from '../data/services';
import { venues } from '../data/venues';
import { ListingCategory } from '../types/listing';

const DiscoveryPage: React.FC<{ category: ListingCategory }> = ({ category }) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    // Get listings based on category
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
    setListings(getListings());
  }, [category]);

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

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingLocation(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with better spacing */}
        <div className="pt-16 pb-6 space-y-4">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {category === 'events'
              ? 'Discover Events'
              : category === 'services'
              ? 'Browse Services'
              : 'Find Venues'}
          </h1>

          {/* Editable Location */}
          {isEditingLocation ? (
            <form onSubmit={handleLocationSubmit} className="flex items-center space-x-2">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onBlur={() => setIsEditingLocation(false)}
                autoFocus
                className="text-base text-gray-600 bg-transparent border-b border-gray-300 focus:border-purple-500 focus:outline-none py-1"
                placeholder="Enter location..."
              />
            </form>
          ) : (
            <button
              onClick={() => setIsEditingLocation(true)}
              className="flex items-center space-x-2 group"
            >
              <MapPinIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              <span className="text-base text-gray-600 group-hover:text-gray-900 border-b border-transparent group-hover:border-gray-300">
                {location}
              </span>
            </button>
          )}
        </div>

        {/* Search Bar with adjusted spacing */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${category}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Category Slider */}
        <div className="mb-6">
          <CategorySlider
            categories={getCategoryData()}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Filter Section */}
        <FilterSection
          selectedPrice={selectedPrice}
          selectedSort={selectedSort}
          onPriceChange={setSelectedPrice}
          onSortChange={setSelectedSort}
        />

        {/* Listing Grid */}
        <div className="mt-6">
          <ListingGrid
            category={category}
            listings={listings}
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