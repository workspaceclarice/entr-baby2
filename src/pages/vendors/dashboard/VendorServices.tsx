import React from 'react';

const VendorServices: React.FC = () => {
  const services = [
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
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-light leading-7 text-gray-900 sm:truncate sm:text-3xl">
            My Services
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-light text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Add New Service
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Service Name</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Price</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-500">
                    {service.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {service.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-light rounded-full bg-green-100 text-green-800">
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {service.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default VendorServices; 