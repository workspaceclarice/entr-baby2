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
    vendorId: 'v1',
    vendorImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296',
    vendorBio: 'Professional photographer with over 10 years of experience in wedding and event photography. Specializing in capturing candid moments and creating timeless memories.',
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
    gallery: [
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5',
      'https://images.unsplash.com/photo-1556157382-97eda2d62296'
    ],
    priceRange: { min: 250, max: 1000 },
    isAvailable: true
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
    vendorId: 'v2',
    vendorImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c',
    vendorBio: 'Award-winning catering company with a passion for creating memorable dining experiences. Our team of expert chefs specializes in customized menus using locally-sourced ingredients.',
    serviceType: 'Catering',
    features: [
      {
        title: 'Custom Menus',
        description: 'Tailored to your preferences',
        icon: '🍽️'
      },
      {
        title: 'Full Service',
        description: 'Setup, service, and cleanup included',
        icon: '✨'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1555244162-803834f70033',
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c'
    ],
    priceRange: { min: 500, max: 2000 },
    isAvailable: true
  }
]; 