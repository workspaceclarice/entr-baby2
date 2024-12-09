export interface VenuePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
  features: string[];
  isPopular?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  selected?: boolean;
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
  packages: VenuePackage[];
  addOns: AddOn[];
  availableTimeSlots?: string[];
}

export {}; 