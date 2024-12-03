import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const VendorListings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const listings = [
    {
      id: 1,
      name: 'Wedding Photography Package',
      type: 'Photography',
      price: '$2,500',
      status: 'Active',
      bookings: 12
    },
    {
      id: 2,
      name: 'Corporate Event Coverage',
      type: 'Photography',
      price: '$1,800',
      status: 'Active',
      bookings: 8
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extralight text-gray-900">My Listings</h1>
          <p className="mt-2 text-sm font-light text-gray-600">
            Manage and update your service listings
          </p>
        </div>
        <div className="mt-4 flex md:mt-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-light text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
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
              {listings.map((listing) => (
                <tr key={listing.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {listing.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-500">
                    {listing.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {listing.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-light rounded-full bg-green-100 text-green-800">
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {listing.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
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