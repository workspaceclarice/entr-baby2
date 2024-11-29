import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface VendorReviewsProps {
  vendorId: string;
}

const VendorReviews: React.FC<VendorReviewsProps> = ({ vendorId }) => {
  // Mock reviews data - replace with real data fetch
  const reviews = [
    {
      id: '1',
      author: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      rating: 5,
      date: '2024-02-15',
      content: 'Amazing service! They made our event absolutely perfect.',
      eventType: 'Wedding'
    },
    {
      id: '2',
      author: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      rating: 4,
      date: '2024-02-10',
      content: 'Very professional and responsive. Would recommend.',
      eventType: 'Corporate Event'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex items-start">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{review.author}</h3>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mt-2">
                  {review.eventType}
                </span>
                <p className="mt-2 text-sm text-gray-600">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorReviews; 