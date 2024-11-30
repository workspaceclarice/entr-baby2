import { Venue } from '../types';

export const venues: Venue[] = [
  {
    id: 'v1',
    type: 'venue',
    name: 'Grand Ballroom',
    description: 'Elegant ballroom with crystal chandeliers, perfect for weddings and galas. Features high ceilings, hardwood floors, and state-of-the-art lighting.',
    location: 'San Francisco, CA',
    capacity: {
      min: 100,
      max: 300
    },
    pricePerHour: 500,
    basePrice: 500,
    rating: 4.8,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3'
    ],
    amenities: ['Parking', 'Kitchen', 'WiFi', 'Sound System', 'Stage', 'Dance Floor']
  },
  {
    id: 'v2',
    type: 'venue',
    name: 'Urban Loft Space',
    description: 'Modern industrial loft with exposed brick walls and large windows. Perfect for corporate events and photo shoots.',
    location: 'San Francisco, CA',
    capacity: {
      min: 50,
      max: 150
    },
    pricePerHour: 300,
    basePrice: 300,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1497366216548-37526070297c',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2'
    ],
    amenities: ['Elevator', 'WiFi', 'Tables/Chairs', 'Rooftop Access']
  }
]; 