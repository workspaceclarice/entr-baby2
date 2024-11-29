import React, { useState, useEffect } from 'react';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    title: 'Event Services',
    description: 'Professional services for unforgettable events'
  },
  {
    image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e',
    title: 'Expert Bartending',
    description: 'Craft cocktails and professional service'
  },
  {
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330',
    title: 'Elegant Venues',
    description: 'Beautiful spaces for every occasion'
  },
  {
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
    title: 'Event Planning',
    description: 'Making your vision come to life'
  }
];

const HeroSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSlideshow; 