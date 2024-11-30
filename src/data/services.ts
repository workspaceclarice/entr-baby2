import { Service } from '../types/service';

export const services: Service[] = [
  {
    id: 's1',
    title: 'Elite Photography',
    name: 'Elite Photography',
    vendorName: 'John Smith Photography',
    description: 'Professional event photography services specializing in weddings and corporate events.',
    location: 'San Francisco, CA',
    category: 'photography',
    rating: 4.8,
    reviewCount: 156,
    basePrice: 250,
    profileImage: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5',
    type: 'service',
    tags: ['Professional', 'Experienced', 'Insured', 'Wedding Specialist'],
    vendorId: 'v1',
    vendorImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296',
    vendorBio: 'Professional photographer with over 10 years of experience in wedding and event photography.',
    serviceType: 'Photography',
    features: [
      {
        title: 'Professional Equipment',
        description: 'High-end cameras and lighting setup',
        icon: '📸'
      },
      {
        title: 'Quick Turnaround',
        description: 'Photos delivered within 48 hours',
        icon: '⚡'
      }
    ],
    priceRange: {
      min: 250,
      max: 1000
    },
    isAvailable: true,
    gallery: [
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5',
      'https://images.unsplash.com/photo-1556157382-97eda2d62296',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b',
      'https://images.unsplash.com/photo-1544161513-0179fe6991c5'
    ],
    packages: [
      {
        id: 'p1',
        name: 'Basic Package',
        price: 250,
        description: '4 hours of photography coverage',
        duration: '4 hours',
        features: ['Professional editing', 'Online gallery', 'High-res images'],
        includes: ['100 edited photos', 'Digital delivery', 'Print release'],
        isPopular: false
      },
      {
        id: 'p2',
        name: 'Premium Package',
        price: 500,
        description: '8 hours of photography coverage',
        duration: '8 hours',
        features: ['Professional editing', 'Online gallery', 'High-res images', 'Second shooter'],
        includes: ['300 edited photos', 'Digital delivery', 'Print release', 'Engagement session'],
        isPopular: true
      }
    ]
  },
  {
    id: 's2',
    title: 'Gourmet Catering Co',
    name: 'Gourmet Catering Co',
    vendorName: 'Gourmet Catering Co',
    description: 'Full-service catering for events of all sizes. Specializing in farm-to-table cuisine.',
    location: 'San Francisco, CA',
    category: 'catering',
    rating: 4.9,
    reviewCount: 203,
    basePrice: 500,
    profileImage: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    type: 'service',
    tags: ['Farm-to-Table', 'Full Service', 'Custom Menus', 'Staff Included'],
    vendorId: 'v2',
    vendorImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c',
    vendorBio: 'Award-winning catering company specializing in farm-to-table cuisine.',
    serviceType: 'Catering',
    features: [
      {
        title: 'Custom Menus',
        description: 'Tailored to your preferences and dietary needs',
        icon: '🍽️'
      },
      {
        title: 'Full Service',
        description: 'Setup, service, and cleanup included',
        icon: '✨'
      }
    ],
    priceRange: {
      min: 500,
      max: 2000
    },
    isAvailable: true,
    gallery: [
      'https://images.unsplash.com/photo-1555244162-803834f70033',
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c',
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba',
      'https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0'
    ],
    packages: [
      {
        id: 'p1',
        name: 'Basic Buffet',
        price: 500,
        description: 'Buffet style service for up to 50 guests',
        duration: '4 hours',
        features: ['Buffet setup', 'Staff included', 'Clean up'],
        includes: ['2 entrees', '3 sides', 'Basic beverages'],
        isPopular: false
      },
      {
        id: 'p2',
        name: 'Premium Plated',
        price: 1000,
        description: 'Plated service for up to 100 guests',
        duration: '6 hours',
        features: ['Plated service', 'Full staff', 'Bar service'],
        includes: ['3 entrees', '4 sides', 'Premium beverages', 'Dessert'],
        isPopular: true
      }
    ]
  }
]; 