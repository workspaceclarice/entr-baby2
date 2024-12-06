import React, { useState } from 'react';
import { GuestListProps } from './types';

// Array of real people photos
const GUEST_PHOTOS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
];

// ... imports and GUEST_PHOTOS array remain the same ...

const GuestList: React.FC<GuestListProps> = ({ 
    attendeeCount, 
    isRSVP,
    guestList = { going: 0, maybe: 0, notGoing: 0 }
  }) => {
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [activeTab, setActiveTab] = useState('going');
  
    const getPhotoForIndex = (index: number): string => {
      return GUEST_PHOTOS[index % GUEST_PHOTOS.length];
    };
  
    return (
      <>
        {/* Guest List Preview */}
        <div 
          className="flex items-center space-x-6 cursor-pointer mb-32"
          onClick={() => setShowGuestModal(true)}
        >
          <div className="flex -space-x-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                key={i}
                src={getPhotoForIndex(i)}
                alt={`Guest ${i + 1}`}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <div className="text-base text-gray-600 font-light">
            <span className="font-normal">{attendeeCount} people</span> {isRSVP ? 'are going' : 'attending'}
          </div>
        </div>
  
        {/* Guest List Modal */}
        {showGuestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center px-4">
            <div className="bg-white rounded-xl w-full max-w-sm mx-auto flex flex-col"
                 style={{ maxHeight: '400px' }}> {/* Fixed height */}
              {/* Modal Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-light">
                    {isRSVP ? 'Guest List' : 'Attendee List'}
                  </h2>
                  <button 
                    onClick={() => setShowGuestModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
  
                {/* Tabs */}
                {isRSVP && (
                  <div className="flex space-x-6">
                    <button
                      onClick={() => setActiveTab('going')}
                      className={`pb-2 px-1 border-b-2 transition-colors text-sm font-light ${
                        activeTab === 'going'
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500'
                      }`}
                    >
                      Going ({guestList.going})
                    </button>
                    <button
                      onClick={() => setActiveTab('maybe')}
                      className={`pb-2 px-1 border-b-2 transition-colors text-sm font-light ${
                        activeTab === 'maybe'
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500'
                      }`}
                    >
                      Maybe ({guestList.maybe})
                    </button>
                    <button
                      onClick={() => setActiveTab('notGoing')}
                      className={`pb-2 px-1 border-b-2 transition-colors text-sm font-light ${
                        activeTab === 'notGoing'
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500'
                      }`}
                    >
                      Not Going ({guestList.notGoing})
                    </button>
                  </div>
                )}
              </div>
  
              {/* Guest List - Scrollable */}
              <div className="overflow-y-auto flex-1">
                <div className="p-4">
                  {Array.from({ length: 
                    activeTab === 'going' ? guestList.going : 
                    activeTab === 'maybe' ? guestList.maybe : 
                    guestList.notGoing 
                  }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3 mb-3 last:mb-0">
                      <img
                        src={getPhotoForIndex(i)}
                        alt={`Guest ${i + 1}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-light text-sm">
                          {isRSVP ? `Guest ${i + 1}` : `Attendee ${i + 1}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default GuestList;