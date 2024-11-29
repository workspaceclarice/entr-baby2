import React from 'react';
import { Event } from '../../types/event';
import { Service } from '../../types/service';
import { Venue } from '../../types/venue';
import EventCard from './cards/EventCard';
import ServiceCard from './cards/ServiceCard';
import VenueCard from './cards/VenueCard';

type Listing = Event | Service | Venue;

export type ListingGridProps = {
  category: 'events' | 'services' | 'venues';
  listings: Listing[];
  searchQuery: string;
  filters: {
    categoryId: string | null;
    [key: string]: any;
  };
};

const isEvent = (listing: Listing): listing is Event => {
  return 'type' in listing && (listing.type === 'ticketed' || listing.type === 'rsvp');
};

const isService = (listing: Listing): listing is Service => {
  return 'serviceType' in listing;
};

const isVenue = (listing: Listing): listing is Venue => {
  return 'venueType' in listing;
};

const ListingGrid: React.FC<ListingGridProps> = ({ 
  category, 
  listings,
  searchQuery = '',
  filters = { categoryId: null }
}) => {
  const filteredListings = listings.filter(listing => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const nameField = isEvent(listing) ? listing.title : listing.name;
      const matchesSearch = nameField.toLowerCase().includes(searchLower) ||
        listing.description.toLowerCase().includes(searchLower) ||
        listing.category.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.categoryId) {
      if (listing.category !== filters.categoryId) return false;
    }

    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {category === 'events' && filteredListings.map((listing) => {
        if (isEvent(listing)) {
          const eventData: Event = {
            id: listing.id,
            title: listing.title,
            date: listing.date,
            time: listing.time,
            location: listing.location,
            image: listing.image,
            price: listing.price,
            formattedPrice: listing.formattedPrice,
            category: listing.category,
            description: listing.description,
            attendees: listing.attendees,
            capacity: listing.capacity,
            type: listing.type,
            organizer: listing.organizer,
            isRSVP: listing.type === 'rsvp',
            hostId: listing.hostId || listing.organizer.name,
            hostName: listing.hostName || listing.organizer.name,
            hostImage: listing.hostImage || listing.organizer.image,
            coverImage: listing.coverImage || listing.image,
            startDate: listing.startDate || listing.date,
            endDate: listing.endDate || listing.date,
            status: listing.status || 'upcoming',
            attendeeCount: listing.attendeeCount || listing.attendees,
            interestedCount: listing.interestedCount || 0
          };
          return <EventCard key={listing.id} event={eventData} />;
        }
        return null;
      })}
      
      {category === 'services' && filteredListings.map((listing) => {
        if (isService(listing)) {
          return <ServiceCard key={listing.id} service={listing} />;
        }
        return null;
      })}
      
      {category === 'venues' && filteredListings.map((listing) => {
        if (isVenue(listing)) {
          return <VenueCard key={listing.id} venue={listing} />;
        }
        return null;
      })}
    </div>
  );
};

export default ListingGrid; 