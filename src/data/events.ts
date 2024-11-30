import { Event } from '../types/event';

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Summer Music Festival',
    description: 'A weekend of live music featuring top artists across multiple genres.',
    date: '2024-07-15',
    time: '14:00',
    location: 'San Francisco, CA',
    price: '89',
    category: 'festivals',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    ticketsAvailable: 500,
    isRSVP: false,
    organizer: {
      name: 'SF Events Co',
      image: 'https://example.com/organizer1.jpg'
    },
    attendeeCount: 245
  },
  {
    id: 'e2',
    title: 'Tech Conference 2024',
    description: 'Join industry leaders for a day of innovation and networking.',
    date: '2024-06-20',
    time: '09:00',
    location: 'San Francisco, CA',
    price: '299',
    category: 'conferences',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    ticketsAvailable: 1000,
    isRSVP: false,
    organizer: {
      name: 'TechEvents SF',
      image: 'https://example.com/organizer2.jpg'
    },
    attendeeCount: 750
  },
  {
    id: 'e3',
    title: 'Startup Networking Mixer',
    description: 'Connect with fellow entrepreneurs and investors in a casual setting.',
    date: '2024-05-25',
    time: '18:00',
    location: 'San Francisco, CA',
    price: '0',
    category: 'networking',
    image: 'https://images.unsplash.com/photo-1511795409834-432f7b1dd2d8',
    ticketsAvailable: 100,
    isRSVP: true,
    organizer: {
      name: 'SF Startups',
      image: 'https://example.com/organizer3.jpg'
    },
    attendeeCount: 85
  }
];

export {}; 