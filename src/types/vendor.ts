export interface VendorService {
  name: string;
  price: string;
  description: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  image: string;
  businessName: string;
  businessType: string[];
  phoneNumber: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  services: VendorService[];
  reviews: Review[];
  listings: string[];
  role: 'vendor';
  availability: {
    days: string[];
    hours: {
      open: string;
      close: string;
    };
    nextAvailable: string;
    timeSlots: string[];
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const isVendor = (profile: any): profile is Vendor => {
  return profile?.role === 'vendor' && 'businessName' in profile;
};

export const transformVendorData = (data: any): Vendor => {
  return {
    ...data,
    services: data.services.map((service: string | VendorService) => {
      if (typeof service === 'string') {
        return {
          name: service,
          price: 'Contact for pricing',
          description: 'Contact vendor for more details'
        };
      }
      return service;
    }),
    availability: {
      ...data.availability,
      nextAvailable: data.availability?.nextAvailable || 'Not available',
      timeSlots: data.availability?.timeSlots || [],
      days: data.availability?.days || [],
      hours: data.availability?.hours || { open: '9:00', close: '17:00' }
    }
  };
};

// Base listing interface
interface BaseListing {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  price: {
    amount: number;
    unit: string;
  };
  category: string;
  images: string[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceListing extends BaseListing {
  type: 'service';
  price: {
    amount: number;
    unit: 'hour' | 'day' | 'event';
  };
  location: string;
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
}

export interface VenueListing extends BaseListing {
  type: 'venue';
  price: {
    amount: number;
    unit: 'hour' | 'day';
  };
  capacity: {
    min: number;
    max: number;
  };
  amenities: string[];
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
}

// Form data interfaces that match the listing structures
export interface ServiceFormData {
  title: string;
  category: string;
  description: string;
  price: {
    amount: number;
    unit: string;
  };
  location: string;
  images: File[];
}

export interface VenueFormData {
  title: string;
  category: string;
  description: string;
  price: {
    amount: number;
    unit: string;
  };
  capacity: {
    min: number;
    max: number;
    optimal: number;
  };
  amenities: {
    basic: string[];
    premium: string[];
  };
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  images: File[];
}

export interface BookingRequest {
  id: string;
  listingId: string;
  listingType: 'service' | 'venue';
  userId: string;
  userDetails: {
    name: string;
    email: string;
    phone?: string;
  };
  eventDetails: {
    date: Date;
    startTime: string;
    endTime: string;
    guestCount?: number;
    eventType?: string;
    specialRequests?: string;
  };
  status: 'pending' | 'accepted' | 'countered' | 'declined' | 'cancelled';
  price: {
    amount: number;
    currency: string;
  };
  vendorNotes?: string;
  createdAt: Date;
  updatedAt: Date;
} 