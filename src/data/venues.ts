import { Venue } from '../types/venue';

export const venues: Venue[] = [
  {
    id: 'v1',
    name: 'The Grand Ballroom',
    description: 'An elegant and spacious venue perfect for weddings, galas, and corporate events. Features high ceilings, crystal chandeliers, and a grand staircase.',
    location: 'San Francisco, CA',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740',
      'https://images.unsplash.com/photo-1519741497674-611481863552'
    ],
    pricePerHour: 500,
    minimumHours: 4,
    capacity: {
      'theater': 300,
      'banquet': 200,
      'reception': 350,
      'classroom': 150
    },
    amenities: [
      'Catering Kitchen',
      'Sound System',
      'Stage',
      'Dance Floor',
      'Private Entrance',
      'Bridal Suite',
      'Parking',
      'WiFi',
      'AV Equipment'
    ],
    tags: [
      'Wedding Venue',
      'Corporate Events',
      'Luxury',
      'Downtown'
    ],
    rating: 4.8,
    reviewCount: 156,
    rules: [
      'No smoking',
      'No outside catering',
      'Music must end by 11 PM',
      'Decorations must be approved'
    ],
    cancellationPolicy: '50% refund up to 30 days before event',
    features: [
      {
        title: 'Grand Staircase',
        description: 'Perfect for dramatic entrances and photo opportunities',
        icon: '✨'
      },
      {
        title: 'Chandeliers',
        description: 'Crystal chandeliers throughout the main hall',
        icon: '💫'
      },
      {
        title: 'Outdoor Area',
        description: 'Connected garden space for outdoor ceremonies',
        icon: '🌿'
      }
    ]
  },
  {
    id: 'v2',
    name: 'Urban Loft Space',
    description: 'A modern, industrial-chic venue with exposed brick walls, high ceilings, and floor-to-ceiling windows offering stunning city views.',
    location: 'San Francisco, CA',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600607687644-c7171b46f011',
      'https://images.unsplash.com/photo-1600607687920-4e4a92f082f9'
    ],
    pricePerHour: 300,
    minimumHours: 3,
    capacity: {
      'standing': 150,
      'seated': 100,
      'theater': 120
    },
    amenities: [
      'Full Kitchen',
      'Rooftop Access',
      'Elevator',
      'Sound System',
      'Projector',
      'WiFi',
      'Furniture',
      'Bar Setup'
    ],
    tags: [
      'Modern',
      'Industrial',
      'Corporate',
      'Photo Shoots'
    ],
    rating: 4.9,
    reviewCount: 89,
    rules: [
      'No smoking',
      'No open flames',
      'Noise restrictions after 10 PM',
      'Load-in/out through service elevator'
    ],
    cancellationPolicy: 'Full refund up to 14 days before event',
    features: [
      {
        title: 'City Views',
        description: 'Panoramic windows with skyline views',
        icon: '🌆'
      },
      {
        title: 'Industrial Design',
        description: 'Exposed brick and steel elements',
        icon: '🏗️'
      },
      {
        title: 'Rooftop Access',
        description: 'Private rooftop space for events',
        icon: '🌟'
      }
    ]
  },
  {
    id: 'v3',
    name: 'Rooftop Garden',
    description: 'A stunning outdoor venue featuring panoramic city views, lush greenery, and modern amenities perfect for both intimate gatherings and large celebrations.',
    location: 'San Francisco, CA',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740',
      'https://images.unsplash.com/photo-1519741497674-611481863552'
    ],
    pricePerHour: 400,
    minimumHours: 4,
    capacity: {
      'standing': 200,
      'seated': 150,
      'reception': 180
    },
    amenities: [
      'Outdoor Bar',
      'Heat Lamps',
      'Covered Area',
      'Sound System',
      'Lighting',
      'Restrooms',
      'Elevator Access',
      'Catering Prep Area'
    ],
    tags: [
      'Outdoor',
      'Rooftop',
      'Modern',
      'Views'
    ],
    rating: 4.7,
    reviewCount: 112,
    rules: [
      'Weather contingency plan required',
      'No amplified music after 10 PM',
      'No open flames',
      'Decorations must be approved'
    ],
    cancellationPolicy: 'Full refund up to 21 days before event',
    features: [
      {
        title: 'City Views',
        description: '360-degree views of the city skyline',
        icon: '🌆'
      },
      {
        title: 'Garden Setting',
        description: 'Landscaped garden with seasonal flowers',
        icon: '🌸'
      },
      {
        title: 'Weather Protection',
        description: 'Retractable covering for weather protection',
        icon: '☂️'
      }
    ]
  },
  {
    id: 'v4',
    name: 'Historic Library Hall',
    description: 'A sophisticated venue housed in a restored historic building, featuring classic architecture, wood paneling, and a grand atmosphere perfect for elegant events.',
    location: 'San Francisco, CA',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740',
      'https://images.unsplash.com/photo-1519741497674-611481863552'
    ],
    pricePerHour: 450,
    minimumHours: 4,
    capacity: {
      'theater': 180,
      'banquet': 120,
      'reception': 200,
      'classroom': 100
    },
    amenities: [
      'Built-in Bar',
      'Grand Piano',
      'Fireplace',
      'AV Equipment',
      'WiFi',
      'Private Rooms',
      'Coat Check',
      'Valet Parking'
    ],
    tags: [
      'Historic',
      'Elegant',
      'Classic',
      'Downtown'
    ],
    rating: 4.9,
    reviewCount: 94,
    rules: [
      'No food or drink in library areas',
      'No adhesive decorations',
      'Professional event planner required',
      'Limited capacity strictly enforced'
    ],
    cancellationPolicy: '50% refund up to 45 days before event',
    features: [
      {
        title: 'Historic Architecture',
        description: 'Original 1920s architectural details',
        icon: '🏛️'
      },
      {
        title: 'Library Collection',
        description: 'Access to historic book collection',
        icon: '📚'
      },
      {
        title: 'Private Studies',
        description: 'Additional breakout rooms available',
        icon: '🚪'
      }
    ]
  }
]; 