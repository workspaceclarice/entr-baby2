import { Event, Service, Venue } from '../types';

export interface Review {
  id: string;
  userId: string;
  vendorId: string;
  rating: number;
  content: string;
  date: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// Base User Type
interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  dateJoined: Date;
}

// Regular User
export interface User extends BaseUser {
  type: 'user';
  savedItems: string[];
  bookings: UserBooking[];
  notifications: Notification[];
  createdEvents: UserEvent[];
  tickets: Ticket[];
  rsvps: RSVP[];
}

// Vendor
export interface Vendor extends BaseUser {
  type: 'vendor';
  businessName: string;
  businessType: 'service' | 'venue';
  phoneNumber: string;
  listings: VendorListing[];
  bookings: VendorBooking[];
  analytics: VendorAnalytics;
}

// Event Types
export interface UserEvent {
  id: string;
  creatorId: string;
  type: 'ticketed' | 'rsvp';
  title: string;
  description: string;
  date: Date;
  location: Location;
  capacity: number;
  images: string[];
  tickets?: TicketTier[];
  rsvpDeadline?: Date;
}

// Booking Types
export interface BaseBooking {
  id: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  date: Date;
  amount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

export interface UserBooking extends BaseBooking {
  listingId: string;
  vendorId: string;
}

export interface VendorBooking extends BaseBooking {
  listingId: string;
}

// Vendor Listing
export interface VendorListing {
  id: string;
  vendorId: string;
  type: 'service' | 'venue';
  title: string;
  description: string;
  images: string[];
  pricing: {
    basePrice: number;
    currency: string;
    pricingType: 'hourly' | 'daily' | 'per-event';
  };
  availability: Availability;
  location: Location;
}

// Supporting Types
interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface Availability {
  regularHours?: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  exceptions?: {
    date: Date;
    available: boolean;
    hours?: {
      open: string;
      close: string;
    };
  }[];
}

export interface VendorAnalytics {
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  views: number;
}

export interface TicketTier {
  id: string;
  eventId: string;
  name: string;
  price: number;
  quantity: number;
  quantitySold: number;
  description?: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  tierId: string;
  purchaseDate: Date;
  status: 'active' | 'used' | 'cancelled' | 'refunded';
}

// RSVP Type
export interface RSVP {
  id: string;
  eventId: string;
  userId: string;
  status: 'going' | 'maybe' | 'not-going';
  responseDate: Date;
}

export type UserRole = 'attendee' | 'host' | 'vendor';

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  role: UserRole;
}

export interface AttendeeProfile extends UserProfile {
  role: 'attendee';
  favoriteEvents: string[];
  bookings: Booking[];
  dateJoined: Date;
  savedEvents: string[];
  notifications: Notification[];
  interests: string[];
}

export interface VendorProfile extends UserProfile {
  role: 'vendor';
  businessName: string;
  businessType: string[];
  analytics: {
    totalRevenue: number;
    totalBookings: number;
    activeListings: number;
  };
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  date: string;
  price: number;
}

export const isVendorProfile = (profile: UserProfile | null): profile is VendorProfile => {
  return profile?.role === 'vendor';
};

export const isAttendeeProfile = (profile: UserProfile | null): profile is AttendeeProfile => {
  return profile?.role === 'attendee';
}; 