import { useState } from 'react';

type FloatingEstimatorProps = {
  children: React.ReactNode;
  startingPrice: number;
  priceUnit?: string;
  itemId: string;
}

const FloatingEstimator = ({ 
  children, 
  startingPrice,
  priceUnit = '/hour',
  itemId
}: FloatingEstimatorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 left-4 right-4 z-50 lg:hidden">
        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-6 py-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 font-normal mb-1">
                Starting at
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-medium text-gray-900">
                  ${startingPrice}
                </span>
                <span className="text-sm text-gray-500 font-normal">
                  {priceUnit}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-medium text-base transition-colors duration-200 shadow-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Request to Book</h3>
                <p className="text-sm text-gray-500 font-normal">Select date and time</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export type { FloatingEstimatorProps };
export default FloatingEstimator; 