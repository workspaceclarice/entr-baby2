import { Event } from './event';
import { Service } from './service';
import { Venue } from './venue';

export type Listing = Event | Service | Venue;

export const isEvent = (listing: Listing): listing is Event => {
  return 'type' in listing && (listing.type === 'ticketed' || listing.type === 'rsvp');
};

export const isService = (listing: Listing): listing is Service => {
  return 'serviceType' in listing;
};

export const isVenue = (listing: Listing): listing is Venue => {
  return 'venueType' in listing;
};

export type ListingCategory = 'events' | 'services' | 'venues';

export {}; 