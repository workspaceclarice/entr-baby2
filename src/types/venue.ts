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

export interface Venue {
  id: string;
  name: string;
  description: string;
  images: string[];
  pricePerHour: number;
  pricePerGuest: number;
  capacity: number;
  maxCapacity: number;
  minimumHours: number;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  amenities: {
    id: string;
    name: string;
    icon: string;
  }[];
  rules: string[];
  reviews: {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  features: {
    id: string;
    name: string;
    description: string;
  }[];
  availability: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
  packages: VenuePackage[];
  addOns: VenueAddOn[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export {}; 