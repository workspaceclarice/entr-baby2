import { Event } from '../types/event';

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    date: 'Aug 15, 2024',
    time: '4:00 PM',
    location: 'Grand Park, Los Angeles',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    price: '$49',
    formattedPrice: '$49',
    category: 'Music',
    description: 'Join us for the biggest music festival of the summer featuring top artists and bands.',
    attendees: 450,
    capacity: 1000,
    type: 'ticketed',
    organizer: {
      name: 'LA Events Co',
      image: 'https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a'
    },
    isRSVP: false,
    hostId: 'host1',
    hostName: 'LA Events Co',
    hostImage: 'https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    startDate: '2024-08-15T16:00:00',
    endDate: '2024-08-15T23:00:00',
    status: 'upcoming',
    attendeeCount: 450,
    interestedCount: 1200
  },
  {
    id: '2',
    title: "Tech Networking Mixer",
    date: 'Jul 20, 2024',
    time: '7:00 PM',
    location: 'Startup Hub, Downtown',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
    price: 'Free',
    formattedPrice: 'Free',
    category: 'Networking',
    description: 'Connect with local tech professionals and entrepreneurs.',
    attendees: 45,
    capacity: 100,
    type: 'rsvp',
    organizer: {
      name: 'Tech Meetup Group',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    isRSVP: true,
    hostId: 'host2',
    hostName: 'Tech Meetup Group',
    hostImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
    startDate: '2024-07-20T19:00:00',
    endDate: '2024-07-20T22:00:00',
    status: 'upcoming',
    attendeeCount: 45,
    interestedCount: 120
  },
  {
    id: '3',
    title: 'Food & Wine Festival',
    date: 'Sep 5, 2024',
    time: '2:00 PM',
    location: 'Central Plaza',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    price: '$75',
    formattedPrice: '$75',
    category: 'Food & Drink',
    description: 'Sample the finest wines and cuisine from top local restaurants.',
    attendees: 280,
    capacity: 500,
    type: 'ticketed',
    organizer: {
      name: 'Culinary Events LA',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    },
    isRSVP: false,
    hostId: 'host3',
    hostName: 'Culinary Events LA',
    hostImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    coverImage: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    startDate: '2024-09-05T14:00:00',
    endDate: '2024-09-05T20:00:00',
    status: 'upcoming',
    attendeeCount: 280,
    interestedCount: 750
  }
];

export {}; 