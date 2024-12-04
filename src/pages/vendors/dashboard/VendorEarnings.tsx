import React, { useState } from 'react';
import { 
  CurrencyDollarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { format, subMonths } from 'date-fns';

interface EarningsSummary {
  totalEarnings: number;
  pendingPayouts: number;
  completedBookings: number;
  averageBookingValue: number;
  monthlyEarnings: {
    month: string;
    amount: number;
    bookings: number;
  }[];
  recentTransactions: {
    id: string;
    date: string;
    description: string;
    amount: number;
    status: 'completed' | 'pending' | 'processing';
  }[];
}

const mockData: EarningsSummary = {
  totalEarnings: 15750.00,
  pendingPayouts: 2500.00,
  completedBookings: 45,
  averageBookingValue: 350.00,
  monthlyEarnings: [
    { month: 'Mar 2024', amount: 3500, bookings: 10 },
    { month: 'Feb 2024', amount: 4200, bookings: 12 },
    { month: 'Jan 2024', amount: 3800, bookings: 11 },
    { month: 'Dec 2023', amount: 4250, bookings: 12 },
  ],
  recentTransactions: [
    {
      id: 'TX123',
      date: '2024-03-15',
      description: 'Wedding Photography Session',
      amount: 1200.00,
      status: 'completed'
    },
    {
      id: 'TX122',
      date: '2024-03-12',
      description: 'Corporate Event Coverage',
      amount: 800.00,
      status: 'pending'
    },
    // Add more transactions...
  ]
};

const StatementModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [dateRange, setDateRange] = useState({
    startDate: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd')
  });

  const handleDownload = () => {
    // Add your download logic here
    console.log('Downloading statement for:', dateRange);
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="relative bg-white rounded-lg w-full max-w-md p-6"
          >
            <Dialog.Title className="text-xl font-light text-gray-900 mb-6">
              Download Statement
            </Dialog.Title>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Tax Documents</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-light">2023 1099-K Form</span>
                    </div>
                    <DocumentArrowDownIcon className="h-5 w-5 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-light">2023 Annual Summary</span>
                    </div>
                    <DocumentArrowDownIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-light"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-light"
                >
                  Download
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const VendorEarnings: React.FC = () => {
  const [showStatementModal, setShowStatementModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Earnings</h1>
          <p className="mt-1 text-sm font-light text-gray-500">
            Track your earnings and financial performance
          </p>
        </div>
        <button
          onClick={() => setShowStatementModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light flex items-center"
        >
          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
          Download Statement
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-light text-gray-500">Total Earnings</p>
              <p className="text-2xl font-light text-gray-900">${mockData.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-light text-gray-500">Pending Payouts</p>
              <p className="text-2xl font-light text-gray-900">${mockData.pendingPayouts.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        {/* Add more stats cards */}
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-light text-gray-900 mb-6">Monthly Earnings</h2>
        {/* Add your chart component here */}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-light text-gray-900 mb-6">Recent Transactions</h2>
        <div className="space-y-4">
          {mockData.recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm font-light text-gray-500">{transaction.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs font-light ${
                  transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                  transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {transaction.status}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  ${transaction.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <StatementModal
        isOpen={showStatementModal}
        onClose={() => setShowStatementModal(false)}
      />
    </div>
  );
};

export default VendorEarnings; 