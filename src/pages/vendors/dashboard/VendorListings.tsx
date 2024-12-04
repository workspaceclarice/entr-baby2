import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { 
  PlusIcon, 
  EllipsisVerticalIcon,
  PencilIcon,
  PauseIcon,
  PlayIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface ListingBase {
  id: string;
  type: 'service' | 'venue';
  name: string;
  description: string;
  category: string;
  status: 'active' | 'paused' | 'draft';
  coverImage: string;
  rating: number;
  reviewCount: number;
}

interface ServiceListing extends ListingBase {
  type: 'service';
  basePrice: number;
}

interface VenueListing extends ListingBase {
  type: 'venue';
  pricePerHour: number;
}

type Listing = ServiceListing | VenueListing;

const VendorListings: React.FC = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Mock listings data
  const listings: Listing[] = [
    {
      id: 's1',
      type: 'service',
      name: 'Wedding Photography Package',
      description: 'Professional wedding photography services with a creative and modern approach.',
      category: 'Photography',
      status: 'active',
      coverImage: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5',
      rating: 4.8,
      reviewCount: 23,
      basePrice: 2500
    },
    {
      id: 'v1',
      type: 'venue',
      name: 'The Grand Ballroom',
      description: 'Elegant ballroom venue perfect for weddings and corporate events.',
      category: 'Wedding Venue',
      status: 'active',
      coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      rating: 4.9,
      reviewCount: 45,
      pricePerHour: 500
    },
    // Add more mock listings...
  ];

  const handleStatusChange = (listing: Listing, newStatus: 'active' | 'paused') => {
    // Handle status change logic
    console.log(`Changing status of ${listing.name} to ${newStatus}`);
  };

  const handleDelete = (listing: Listing) => {
    setSelectedListing(listing);
    setShowDeleteModal(true);
  };

  const renderListingCard = (listing: Listing) => (
    <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-48">
        <img
          src={listing.coverImage}
          alt={listing.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Menu as="div" className="relative">
            <Menu.Button className="p-1 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-sm">
              <EllipsisVerticalIcon className="h-6 w-6" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-in"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate(listing.type === 'service' 
                        ? `/vendors/dashboard/listings/create-service` 
                        : `/vendors/dashboard/listings/create-venue`, 
                        { state: { isEditing: true, listingId: listing.id } }
                      )}
                      className={`${
                        active ? 'bg-gray-50' : ''
                      } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <PencilIcon className="mr-3 h-5 w-5 text-gray-400" />
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleStatusChange(listing, listing.status === 'active' ? 'paused' : 'active')}
                      className={`${
                        active ? 'bg-gray-50' : ''
                      } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      {listing.status === 'active' ? (
                        <PauseIcon className="mr-3 h-5 w-5 text-gray-400" />
                      ) : (
                        <PlayIcon className="mr-3 h-5 w-5 text-gray-400" />
                      )}
                      {listing.status === 'active' ? 'Pause' : 'Activate'}
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => window.open(`/${listing.type}s/${listing.id}`, '_blank')}
                      className={`${
                        active ? 'bg-gray-50' : ''
                      } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <EyeIcon className="mr-3 h-5 w-5 text-gray-400" />
                      View
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleDelete(listing)}
                      className={`${
                        active ? 'bg-gray-50' : ''
                      } group flex w-full items-center px-4 py-2 text-sm text-red-600`}
                    >
                      <TrashIcon className="mr-3 h-5 w-5 text-red-400" />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium ${
          listing.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : listing.status === 'paused'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{listing.name}</h3>
            <p className="text-sm text-gray-500">{listing.category}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">
              ${listing.type === 'service' ? listing.basePrice : `${listing.pricePerHour}/hr`}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{listing.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{listing.rating}</span>
          </span>
          <span className="mx-2">·</span>
          <span>{listing.reviewCount} reviews</span>
        </div>
      </div>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extralight text-gray-900">My Listings</h1>
          <p className="mt-2 text-sm font-light text-gray-600">
            Manage your service and venue listings
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => navigate('/vendors/dashboard/listings/create-service')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Service
          </button>
          <button
            onClick={() => navigate('/vendors/dashboard/listings/create-venue')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Venue
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => renderListingCard(listing))}
      </div>

      {/* Delete Confirmation Modal */}
      {/* Add your delete confirmation modal here */}
    </main>
  );
};

export default VendorListings; 