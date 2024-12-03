import React from 'react';

const VendorEarnings: React.FC = () => {
  const earnings = {
    total: '$15,800',
    thisMonth: '$2,400',
    pending: '$800',
    completed: 24
  };

  const recentTransactions = [
    {
      id: 1,
      date: '2024-03-28',
      description: 'Wedding Photography Service',
      amount: '$2,400',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-03-25',
      description: 'Corporate Event Coverage',
      amount: '$1,800',
      status: 'Pending'
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-light leading-7 text-gray-900 sm:truncate sm:text-3xl mb-6">
        Earnings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm font-light text-gray-600">Total Earnings</p>
          <p className="text-2xl font-light text-gray-900 mt-2">{earnings.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm font-light text-gray-600">This Month</p>
          <p className="text-2xl font-light text-gray-900 mt-2">{earnings.thisMonth}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm font-light text-gray-600">Pending</p>
          <p className="text-2xl font-light text-gray-900 mt-2">{earnings.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm font-light text-gray-600">Completed Bookings</p>
          <p className="text-2xl font-light text-gray-900 mt-2">{earnings.completed}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-light text-gray-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Description</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-light rounded-full 
                      ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {transaction.status}
                    </span>
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

export default VendorEarnings; 