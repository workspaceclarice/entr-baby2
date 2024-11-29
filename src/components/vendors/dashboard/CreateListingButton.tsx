import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

interface CreateListingButtonProps {}

const CreateListingButton: React.FC<CreateListingButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Create Listing
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
              to="/vendors/dashboard/listings/new-service"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Create Service Listing
            </Link>
            <Link
              to="/vendors/dashboard/listings/new-venue"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Create Venue Listing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateListingButton; 