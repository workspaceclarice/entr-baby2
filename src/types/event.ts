export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  price: number;
  formattedPrice?: string;
  category: string;
  image: string;
  coverImage?: string;
  ticketsAvailable: number;
  isRSVP: boolean;
  hostId: string;
  hostName: string;
  hostImage: string;
  attendeeCount: number;
  guestList?: {
    going: number;
    maybe: number;
    notGoing: number;
  };
  rsvpDeadline?: string;
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