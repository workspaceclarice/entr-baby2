export interface Venue {
  id: string;
  name: string;
  venueType: string;
  description: string;
  price: number;
  formattedPrice?: string;
  image: string;
  category: string;
  location: string;
  capacity: {
    min: number;
    max: number;
  };
  amenities: string[];
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  availability: {
    startDate: string;
    endDate: string;
    timeSlots: string[];
  };
  images: string[];
  type: 'venue';
  basePrice: number;
}

export {}; 