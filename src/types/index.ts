export type ListingCategory = 'events' | 'services' | 'venues';

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
  image: string;
  ticketsAvailable: number;
  isRSVP?: boolean;
  organizer: {
    name: string;
    image: string;
  };
}

export interface Service {
  id: string;
  title: string;
  name: string;
  vendorName: string;
  description: string;
  location: string;
  category: string;
  rating: number;
  reviewCount: number;
  basePrice: number;
  profileImage: string;
  type: string;
}

export interface Venue {
  id: string;
  type: string;
  name: string;
  description: string;
  location: string;
  capacity: {
    min: number;
    max: number;
  };
  pricePerHour: number;
  basePrice: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
}

// ... other existing types 