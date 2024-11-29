export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  price: string;
  formattedPrice?: string;
  category: string;
  description: string;
  attendees: number;
  capacity: number;
  type: 'ticketed' | 'rsvp';
  organizer: {
    name: string;
    image: string;
  };
  isRSVP: boolean;
  hostId: string;
  hostName: string;
  hostImage: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'past';
  attendeeCount: number;
  interestedCount: number;
}

export {}; 