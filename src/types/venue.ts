export interface Venue {
  id: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  pricePerHour: number;
  minimumHours: number;
  capacity: {
    [key: string]: number;
  };
  amenities: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  rules: string[];
  cancellationPolicy: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export {}; 