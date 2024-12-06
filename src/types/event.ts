export interface Highlight {
  iconType: string;
  title: string;
  description: string;
}

export interface Speaker {
  name: string;
  role: string;
  image: string;
}

export interface Comment {
  authorName: string;
  authorImage: string;
  content: string;
  timeAgo: string;
  likes: number;
  replies?: Comment[];
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description?: string;
  available: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  price: number;
  formattedPrice?: string;
  category: string;
  image: string;
  imageUrl: string;
  coverImage?: string;
  ticketsAvailable: number;
  hostId: string;
  hostName: string;
  hostImage: string;
  date: string;
  time: string;
  location: string;
  isRSVP: boolean;
  attendeeCount: number;
  rsvpDeadline?: string;
  guestList?: {
    going: number;
    maybe: number;
    notGoing: number;
  };
  highlights?: Highlight[];
  speakers?: Speaker[];
  speakersTitle?: string;
  comments?: Comment[];
  ticketTypes?: TicketType[];
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