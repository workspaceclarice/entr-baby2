export interface Service {
  id: string;
  name: string;
  serviceType: string;
  description: string;
  price: number;
  formattedPrice?: string;
  image: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  provider: {
    id: string;
    name: string;
    image: string;
    rating: number;
  };
  availability: {
    startDate: string;
    endDate: string;
    timeSlots: string[];
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  vendorId: string;
  vendorName: string;
  vendorImage: string;
  vendorBio: string;
  packages: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    duration: string;
    includes: string[];
  }>;
  addons: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
  }>;
  profileImage: string;
  priceRange: {
    min: number;
    max: number;
  };
  isAvailable: boolean;
}

export {}; 