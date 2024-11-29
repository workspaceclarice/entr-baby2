export interface BasePreviewData {
  title: string;
  category: string;
  description: string;
  price: {
    amount: number;
    unit: string;
  };
  location: string | {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface ServicePreviewData extends BasePreviewData {
  type: 'service';
}

export interface VenuePreviewData extends BasePreviewData {
  type: 'venue';
  capacity: {
    min: number;
    max: number;
    optimal: number;
  };
  amenities: {
    basic: string[];
    premium: string[];
  };
}

export type PreviewData = ServicePreviewData | VenuePreviewData; 