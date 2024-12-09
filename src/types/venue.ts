export interface VenuePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  minimumHours: number;
  maxGuests: number;
}

export interface VenueAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'flat' | 'per_hour' | 'per_guest';
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface DailyAvailability {
  [key: string]: TimeSlot;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Feature {
  name: string;
  description: string;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  capacity: number;
  squareFeet: number;
  amenities: {
    id: string;
    name: string;
    icon?: string;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    author: string;
    date: string;
  }[];
  pricePerHour: number;
  pricePerGuest: number;
  minimumHours: number;
  maxCapacity: number;
  minCapacity: number;
  rules: string[];
  cancellationPolicy: string;
  tags: string[];
  availability: DailyAvailability;
  features: Feature[];
  vendor: {
    id: string;
    name: string;
    profileImage?: string;
  };
  vendorId: string;
  basePrice: number;
  packages?: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    features: string[];
  }[];
}

export {}; 