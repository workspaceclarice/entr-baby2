export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  formattedPrice?: string;
  category: string;
  image: string;
  ticketsAvailable: number;
  isRSVP: boolean;
  attendeeCount: number;
  organizer: {
    name: string;
    image: string;
  };
  rsvpStatus?: 'going' | 'not-going' | 'maybe';
}

export interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  dietaryRestrictions?: string;
  plusOne: boolean;
}

export {}; 