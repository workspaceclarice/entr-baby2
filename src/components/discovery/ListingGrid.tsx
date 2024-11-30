import React from 'react';
import { ListingCategory } from '../../types';
import VenueCard from '../venues/VenueCard';
import ServiceCard from '../services/ServiceCard';
import EventCard from '../events/EventCard';

interface ListingGridProps {
  category: ListingCategory;
  listings: any[];
  searchQuery: string;
  filters: {
    categoryId: string | null;
    priceRange: string;
    sort: string;
    location: string;
  };
}

const ListingGrid: React.FC<ListingGridProps> = ({
  category,
  listings,
  searchQuery,
  filters
}) => {
  const filteredListings = listings.filter(listing => {
    if (!listing) return false;
    
    const matchesSearch = searchQuery ? (
      (listing.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (listing.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    ) : true;

    const matchesCategory = !filters.categoryId || listing.categoryId === filters.categoryId;
    const matchesLocation = !filters.location || listing.location?.includes(filters.location);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (!a || !b) return 0;
    
    switch (filters.sort) {
      case 'price-low':
        return (a.basePrice || 0) - (b.basePrice || 0);
      case 'price-high':
        return (b.basePrice || 0) - (a.basePrice || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const renderCard = (listing: any) => {
    switch (category) {
      case 'venues':
        return <VenueCard key={listing.id} venue={listing} />;
      case 'services':
        return <ServiceCard key={listing.id} service={listing} />;
      case 'events':
        return <EventCard key={listing.id} event={listing} />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedListings.map((listing) => listing && renderCard(listing))}
      
      {(!sortedListings.length || sortedListings.every(l => !l)) && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">No {category} found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ListingGrid; 