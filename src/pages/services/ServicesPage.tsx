import React from 'react';
import ServiceCard from '../../components/cards/ServiceCard';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ServicesPage: React.FC = () => {
  // Mock data - replace with real data from your backend
  const services = [
    {
      id: '1',
      title: 'Professional DJ Services',
      category: 'Entertainment',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1571266028243-e4733b154e2c',
      price: '$200/hr',
      location: 'Los Angeles, CA'
    },
    {
      id: '2',
      title: 'Elite Catering Services',
      category: 'Catering',
      rating: 4.9,
      reviews: 238,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      price: '$50/person',
      location: 'Los Angeles, CA'
    },
    {
      id: '3',
      title: 'Event Photography',
      category: 'Photography',
      rating: 4.7,
      reviews: 182,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      price: '$150/hr',
      location: 'Los Angeles, CA'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Services</h1>
        
        {/* Filters Section */}
        <div className="mb-8">
          {/* Add filters here */}
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage; 