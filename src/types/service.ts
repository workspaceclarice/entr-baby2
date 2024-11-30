export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  duration: string;
  includes: string[];
  isPopular?: boolean;
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
  tags: string[];
  vendorId: string;
  vendorImage: string;
  vendorBio: string;
  serviceType: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  priceRange: {
    min: number;
    max: number;
  };
  isAvailable: boolean;
  gallery: string[];
  packages: ServicePackage[];
}

export interface AdditionalItem {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export {}; 