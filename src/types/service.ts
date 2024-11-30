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
  vendorId: string;
  vendorImage: string;
  vendorBio: string;
  serviceType: string;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  gallery?: string[];
  priceRange: {
    min: number;
    max: number;
  };
  isAvailable: boolean;
}

export {}; 