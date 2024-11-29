export type ListingCategory = 'events' | 'services' | 'venues';

export interface Event {
  id: string;
  title: string;
  hostId: string;
  hostName: string;
  hostImage: string;
  coverImage: string;
  date: string;
  location: string;
  price?: number;
  attendeeCount: number;
  interestedCount: number;
  description?: string;
  images?: string[];
  speakers?: {
    name: string;
    role: string;
    image: string;
    bio: string;
  }[];
  schedule?: {
    time: string;
    title: string;
    description: string;
  }[];
  venue?: {
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  isRSVP: boolean;
  rsvpDeadline?: string;
  maxGuests?: number;
  guestList?: {
    going: number;
    maybe: number;
    invited: number;
  };
  ticketTypes?: {
    id: string;
    name: string;
    description: string;
    price: number;
    available: number;
  }[];
}

export interface Service {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorImage: string;
  vendorBio: string;
  serviceType: string;
  profileImage: string;
  gallery?: string[];
  portfolio?: Array<{
    id: string;
    image: string;
    caption: string;
  }>;
  reviews?: Array<{
    id: string;
    userId: string;
    userName: string;
    userImage: string;
    rating: number;
    date: string;
    content: string;
    eventType: string;
  }>;
  priceRange: {
    min: number;
    max?: number;
  };
  rating: number;
  reviewCount: number;
  location: string;
  isAvailable: boolean;
  description?: string;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  packages?: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    includes: string[];
  }>;
  addons?: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  description: string;
  images: string[];
  location: string;
  capacity: {
    min: number;
    max: number;
  };
  basePrice: number;
  pricePerHour?: number;
  rating?: number;
  reviewCount?: number;
  amenities: string[];
  packages?: Array<{
    id: string;
    name: string;
    price: number;
    duration: string;
    includes: string[];
  }>;
  addons?: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
  }>;
  reviews?: Array<{
    id: string;
    userId: string;
    userName: string;
    userImage: string;
    rating: number;
    date: string;
    content: string;
    eventType: string;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
} 