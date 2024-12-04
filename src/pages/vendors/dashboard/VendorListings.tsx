import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { 
  PlusIcon, 
  EllipsisVerticalIcon,
  PencilIcon,
  PauseIcon,
  PlayIcon,
  TrashIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import NotificationToast from '../../../components/common/NotificationToast';

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
  const [listings, setListings] = useState<Listing[]>([
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
  ]);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    listing: Listing;
    newStatus: 'active' | 'paused';
  } | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
    onClose?: () => void;
  } | null>(null);

  const initiateStatusChange = (listing: Listing, newStatus: 'active' | 'paused') => {
    setPendingStatusChange({ listing, newStatus });
    setShowStatusModal(true);
  };

  const handleStatusChange = async (listing: Listing, newStatus: 'active' | 'paused') => {
    try {
      setUpdatingStatus(listing.id);
      setShowStatusModal(false);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setListings(prevListings => 
        prevListings.map(item => 
          item.id === listing.id 
            ? { ...item, status: newStatus }
            : item
        )
      );

      // Show success notification
      const action = newStatus === 'active' ? 'activated' : 'paused';
      showNotification('success', `Listing successfully ${action}`);
    } catch (error) {
      showNotification('error', 'Failed to update listing status');
    } finally {
      setUpdatingStatus(null);
      setPendingStatusChange(null);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({
      show: true,
      type,
      message,
      onClose: () => setNotification(null)
    });
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
                      onClick={() => initiateStatusChange(listing, listing.status === 'active' ? 'paused' : 'active')}
                      disabled={updatingStatus === listing.id}
                      className={`${
                        active ? 'bg-gray-50' : ''
                      } group flex w-full items-center px-4 py-2 text-sm text-gray-700 ${
                        updatingStatus === listing.id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {updatingStatus === listing.id ? (
                        <svg className="animate-spin h-5 w-5 mr-3 text-gray-400" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : listing.status === 'active' ? (
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

  const StatusConfirmationModal = () => {
    if (!pendingStatusChange) return null;
    const { listing, newStatus } = pendingStatusChange;
    const action = newStatus === 'active' ? 'activate' : 'pause';

    return (
      <Transition appear show={showStatusModal} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-50" 
          onClose={() => setShowStatusModal(false)}
        >
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {action.charAt(0).toUpperCase() + action.slice(1)} Listing
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to {action} "{listing.name}"? 
                      {newStatus === 'paused' && ' This will hide your listing from the marketplace.'}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowStatusModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white 
                        ${newStatus === 'active' 
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-yellow-600 hover:bg-yellow-700'
                        }`}
                      onClick={() => handleStatusChange(listing, newStatus)}
                    >
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

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
      
      {/* Status Confirmation Modal */}
      <StatusConfirmationModal />
      
      {/* Notification */}
      <NotificationToast
        show={notification?.show || false}
        message={notification?.message || ''}
        type={notification?.type || 'success'}
        onClose={() => setNotification(null)}
      />
    </main>
  );
};

export default VendorListings; 