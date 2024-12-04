import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

interface ServiceListing {
  id: string;
  type: 'service';
  name: string;
  category: string;
  basePrice: number;
  status: 'active' | 'inactive' | 'draft';
  bookings: number;
  description: string;
  photos: string[];
  packages: Array<{
    name: string;
    price: number;
    duration: number;
    description: string;
    includedItems: string[];
  }>;
  availability: {
    monday: { isAvailable: boolean; startTime: string; endTime: string; };
    tuesday: { isAvailable: boolean; startTime: string; endTime: string; };
    wednesday: { isAvailable: boolean; startTime: string; endTime: string; };
    thursday: { isAvailable: boolean; startTime: string; endTime: string; };
    friday: { isAvailable: boolean; startTime: string; endTime: string; };
    saturday: { isAvailable: boolean; startTime: string; endTime: string; };
    sunday: { isAvailable: boolean; startTime: string; endTime: string; };
  };
}

interface VenueListing {
  id: string;
  type: 'venue';
  name: string;
  category: string;
  pricePerHour: number;
  status: 'active' | 'inactive' | 'draft';
  bookings: number;
  description: string;
  photos: string[];
  capacity: {
    standing: number;
    seated: number;
    minGuests: number;
    maxGuests: number;
  };
  amenities: string[];
  rules: {
    music: boolean;
    catering: 'inHouse' | 'preferred' | 'external' | 'any';
    alcohol: boolean;
    decorations: string;
    endTime: string;
  };
}

type Listing = ServiceListing | VenueListing;

const mockListings: Listing[] = [
  {
    id: 's1',
    type: 'service',
    name: 'Wedding Photography Package',
    category: 'Photography',
    basePrice: 2500,
    status: 'active',
    bookings: 12,
    description: 'Professional wedding photography services with a creative and modern approach.',
    photos: [
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b'
    ],
    packages: [
      {
        name: 'Basic Package',
        price: 2500,
        duration: 4,
        description: '4 hours of photography coverage',
        includedItems: ['100 edited photos', 'Online gallery', 'Print release']
      },
      {
        name: 'Premium Package',
        price: 3500,
        duration: 8,
        description: '8 hours of photography coverage',
        includedItems: ['300 edited photos', 'Online gallery', 'Print release', 'Engagement session']
      }
    ],
    availability: {
      monday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      thursday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      friday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      saturday: { isAvailable: true, startTime: '10:00', endTime: '15:00' },
      sunday: { isAvailable: false, startTime: '09:00', endTime: '17:00' }
    }
  },
  {
    id: 'v1',
    type: 'venue',
    name: 'The Grand Ballroom',
    category: 'Wedding Venue',
    pricePerHour: 500,
    status: 'active',
    bookings: 8,
    description: 'Elegant ballroom venue perfect for weddings and corporate events',
    photos: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740'
    ],
    capacity: {
      standing: 300,
      seated: 200,
      minGuests: 50,
      maxGuests: 300
    },
    amenities: [
      'Catering Kitchen',
      'Sound System',
      'Stage',
      'Dance Floor',
      'Private Entrance',
      'Bridal Suite',
      'Parking',
      'WiFi'
    ],
    rules: {
      music: true,
      catering: 'preferred',
      alcohol: true,
      decorations: 'Approved vendors only',
      endTime: '23:00'
    }
  }
];

const VendorListings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (listing: Listing) => {
    // Store the listing data in localStorage or state management
    localStorage.setItem('editListing', JSON.stringify(listing));
    
    // Navigate to the appropriate edit page
    if (listing.type === 'service') {
      navigate('/vendors/dashboard/listings/create-service', { state: { isEditing: true, listingId: listing.id } });
    } else {
      navigate('/vendors/dashboard/listings/create-venue', { state: { isEditing: true, listingId: listing.id } });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extralight text-gray-900">My Listings</h1>
          <p className="mt-2 text-sm font-light text-gray-600">
            Manage and update your service and venue listings
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-light text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Add New Listing
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Listing Name</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Price</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockListings.map((listing) => (
                <tr key={listing.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {listing.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-500">
                    {listing.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    ${listing.type === 'service' ? listing.basePrice : `${listing.pricePerHour}/hr`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-light rounded-full ${getStatusColor(listing.status)}`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {listing.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light">
                    <button
                      onClick={() => handleEdit(listing)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-light leading-6 text-gray-900 mb-4"
                  >
                    What type of listing would you like to create?
                  </Dialog.Title>
                  <div className="mt-4 space-y-4">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        navigate('/vendors/dashboard/listings/create-service');
                      }}
                      className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="text-base font-medium text-gray-900">Service Listing</h4>
                      <p className="text-sm text-gray-500">
                        Create a listing for your event services (photography, catering, etc.)
                      </p>
                    </button>
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        navigate('/vendors/dashboard/listings/create-venue');
                      }}
                      className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="text-base font-medium text-gray-900">Venue Listing</h4>
                      <p className="text-sm text-gray-500">
                        Create a listing for your event venue
                      </p>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
};

export default VendorListings; 