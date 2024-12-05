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
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  images: string[];
  pricePerHour: number;
  pricePerGuest: number;
  minimumHours: number;
  maxCapacity: number;
  minCapacity: number;
  amenities: Amenity[];
  rules: string[];
  cancellationPolicy: string;
  tags: string[];
  reviews: any[]; // Replace with proper Review interface if needed
  availability: DailyAvailability;
  features: Feature[];
}

export {}; 