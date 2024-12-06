import { Event } from '../types/event';

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'Join us for an amazing day of music and fun!',
    date: '2024-07-15',
    time: '14:00',
    location: 'San Francisco, CA',
    price: 89,
    formattedPrice: '$89',
    category: 'festivals',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    ticketsAvailable: 500,
    isRSVP: false,
    hostId: 'host1',
    hostName: 'SF Events',
    hostImage: 'https://example.com/host1.jpg',
    attendeeCount: 0
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    description: 'The biggest tech conference of the year',
    date: '2024-08-20',
    time: '09:00',
    location: 'San Francisco, CA',
    price: 299,
    formattedPrice: '$299',
    category: 'conferences',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    ticketsAvailable: 1000,
    isRSVP: false,
    hostId: 'host2',
    hostName: 'Tech Events Co',
    hostImage: 'https://example.com/host2.jpg',
    attendeeCount: 0
  },
  {
    id: '3',
    title: 'Networking Mixer',
    description: 'Connect with professionals in your industry',
    date: '2024-06-10',
    time: '18:00',
    location: 'San Francisco, CA',
    price: 0,
    formattedPrice: 'Free',
    category: 'networking',
    image: 'https://images.unsplash.com/photo-1511795409834-432f7b1dd2d8',
    ticketsAvailable: 100,
    isRSVP: true,
    hostId: 'host3',
    hostName: 'SF Networking',
    hostImage: 'https://example.com/host3.jpg',
    attendeeCount: 0
  }
];

export {}; 