import React from 'react';
import { ListingCategory } from '../../types';
import VenueCard from '../venues/VenueCard';
import ServiceCard from '../services/ServiceCard';
import EventCard from '../events/EventCard';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const filteredListings = listings.filter(listing => {
    if (!listing) return false;
    
    const matchesSearch = searchQuery ? (
      (listing.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (listing.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    ) : true;

    const matchesCategory = !filters.categoryId || listing.categoryId === filters.categoryId;
    
    const matchesLocation = !filters.location || (
      category === 'venues' 
        ? `${listing.location.city}, ${listing.location.state}`.includes(filters.location)
        : listing.location?.includes(filters.location)
    );
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (!a || !b) return 0;
    
    switch (filters.sort) {
      case 'price-low':
        return (a.pricePerHour || 0) - (b.pricePerHour || 0);
      case 'price-high':
        return (b.pricePerHour || 0) - (a.pricePerHour || 0);
      case 'rating':
        const aRating = a.reviews?.reduce((acc: number, r: any) => acc + r.rating, 0) / (a.reviews?.length || 1);
        const bRating = b.reviews?.reduce((acc: number, r: any) => acc + r.rating, 0) / (b.reviews?.length || 1);
        return bRating - aRating;
      default:
        return 0;
    }
  });

  const renderCard = (listing: any) => {
    switch (category) {
      case 'venues':
        return (
          <div key={listing.id} onClick={() => navigate(`/venues/${listing.id}`)}>
            <VenueCard venue={listing} />
          </div>
        );
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