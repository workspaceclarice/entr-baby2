export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  image: string;
  ticketsAvailable: number;
  isRSVP?: boolean;
  organizer: {
    name: string;
    image: string;
  };
  formattedPrice?: string;
  attendeeCount: number;
}

export {}; 