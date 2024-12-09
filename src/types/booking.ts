export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface VenueAddOn {
  id: string;
  name: string;
  price: number;
  selected?: boolean;
}

export interface BookingDetails {
  customerName: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: number;
  notes?: string;
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
  };
  maxCapacity: number;
  pricePerHour: number;
  addOns?: VenueAddOn[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  images: string[];
  packages: ServicePackage[];
  additionalItems?: AdditionalItem[];
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

export interface AdditionalItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  selected?: boolean;
} 