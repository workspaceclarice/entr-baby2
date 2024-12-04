import React, { useState } from 'react';
import { 
  CurrencyDollarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  DocumentTextIcon,
  BanknotesIcon,
  BoltIcon,
  ClockIcon,
  ExclamationCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import styles from './VendorEarnings.module.css';
import { Link } from 'react-router-dom';

interface EarningsSummary {
  totalEarnings: number;
  pendingPayouts: number;
  completedBookings: number;
  averageBookingValue: number;
  monthlyEarnings: {
    month: string;
    amount: number;
    bookings: number;
    growth: number;
  }[];
  recentTransactions: {
    id: string;
    bookingId: string;
    date: string;
    description: string;
    amount: number;
    status: 'completed';
    clientName: string;
    clientPhoto?: string;
    review?: {
      rating: number;
      comment: string;
      date: string;
    };
  }[];
}

const mockData: EarningsSummary = {
  totalEarnings: 15750.00,
  pendingPayouts: 2500.00,
  completedBookings: 45,
  averageBookingValue: 350.00,
  monthlyEarnings: [
    { month: 'Apr 2023', amount: 2200, bookings: 6, growth: 0 },
    { month: 'May 2023', amount: 2400, bookings: 7, growth: 9 },
    { month: 'Jun 2023', amount: 2600, bookings: 7, growth: 8 },
    { month: 'Jul 2023', amount: 2500, bookings: 7, growth: -4 },
    { month: 'Aug 2023', amount: 2700, bookings: 8, growth: 8 },
    { month: 'Sep 2023', amount: 2800, bookings: 8, growth: 4 },
    { month: 'Oct 2023', amount: 3200, bookings: 9, growth: 14 },
    { month: 'Nov 2023', amount: 3900, bookings: 11, growth: 22 },
    { month: 'Dec 2023', amount: 4250, bookings: 12, growth: 9 },
    { month: 'Jan 2024', amount: 3800, bookings: 11, growth: -11 },
    { month: 'Feb 2024', amount: 4200, bookings: 12, growth: 11 },
    { month: 'Mar 2024', amount: 3500, bookings: 10, growth: -17 },
  ],
  recentTransactions: [
    {
      id: 'TX123',
      bookingId: 'BK-001',
      date: '2024-03-15',
      description: 'Wedding Photography Session',
      amount: 1200.00,
      status: 'completed',
      clientName: 'Jessica Chen',
      clientPhoto: 'https://randomuser.me/api/portraits/women/1.jpg',
      review: {
        rating: 5,
        comment: 'Amazing service! The photos turned out beautifully. Would definitely recommend!',
        date: '2024-03-16'
      }
    },
    {
      id: 'TX122',
      bookingId: 'BK-002',
      date: '2024-03-12',
      description: 'Corporate Event Coverage',
      amount: 800.00,
      status: 'completed',
      clientName: 'Michael Brown',
      clientPhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
      review: {
        rating: 4,
        comment: 'Professional service and great photos. Would recommend!',
        date: '2024-03-13'
      }
    }
  ]
};

// Add interface for preset options
interface PresetOption {
  label: string;
  value: 'current' | 'last' | 'last3' | 'custom';
  dates?: {
    start: string;
    end: string;
  };
}

const StatementModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [dateRange, setDateRange] = useState({
    startDate: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd')
  });
  const [dateRangeType, setDateRangeType] = useState<'monthly' | 'custom'>('monthly');

  // Get current and previous month names
  const currentMonth = format(new Date(), 'MMMM yyyy');
  const lastMonth = format(subMonths(new Date(), 1), 'MMMM yyyy');
  const last3Months = `${format(subMonths(new Date(), 3), 'MMMM')} - ${format(new Date(), 'MMMM yyyy')}`;

  // Update presetOptions with proper typing
  const presetOptions: PresetOption[] = [
    { 
      label: currentMonth, 
      value: 'current',
      dates: {
        start: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
        end: format(endOfMonth(new Date()), 'yyyy-MM-dd')
      }
    },
    { 
      label: lastMonth, 
      value: 'last',
      dates: {
        start: format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd'),
        end: format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd')
      }
    },
    { 
      label: last3Months, 
      value: 'last3',
      dates: {
        start: format(startOfMonth(subMonths(new Date(), 3)), 'yyyy-MM-dd'),
        end: format(endOfMonth(new Date()), 'yyyy-MM-dd')
      }
    },
    { label: 'Custom Range', value: 'custom' }
  ];

  // Update handlePresetSelect with type checking
  const handlePresetSelect = (option: PresetOption) => {
    if (option.value === 'custom') {
      setDateRangeType('custom');
    } else if (option.dates) {
      setDateRangeType('monthly');
      setDateRange({
        startDate: option.dates.start,
        endDate: option.dates.end
      });
    }
  };

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
              Monthly Statements
            </Dialog.Title>

            <div className="space-y-6">
              {/* Preset Options */}
              <div className="flex flex-wrap gap-2">
                {presetOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handlePresetSelect(option)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-light ${
                      dateRangeType === (option.value === 'custom' ? 'custom' : 'monthly') &&
                      (option.value !== 'custom' ? 
                        dateRange.startDate === option.dates?.start && 
                        dateRange.endDate === option.dates?.end 
                        : true)
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Custom Date Range (only show if custom is selected) */}
              {dateRangeType === 'custom' && (
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
              )}

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

const WithdrawModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  availableBalance: number;
}> = ({ isOpen, onClose, availableBalance }) => {
  const [amount, setAmount] = useState('');
  const [withdrawType, setWithdrawType] = useState<'standard' | 'instant'>('standard');

  const fee = withdrawType === 'instant' ? Number(amount) * 0.01 : 0;
  const total = Number(amount) - fee;

  const handleWithdraw = () => {
    // Add your withdraw logic here
    console.log('Withdrawing:', { amount, type: withdrawType, fee, total });
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
              Withdraw Funds
            </Dialog.Title>

            <div className="space-y-6">
              {/* Available Balance */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-light text-gray-500">Available Balance</div>
                <div className="text-2xl font-light text-gray-900">
                  ${availableBalance.toLocaleString()}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">
                  Withdraw Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={availableBalance}
                    className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Withdraw Options */}
              <div className="space-y-3">
                <label className="block text-sm font-light text-gray-700 mb-2">
                  Withdraw Speed
                </label>
                <button
                  onClick={() => setWithdrawType('standard')}
                  className={`w-full flex items-center justify-between p-4 border rounded-lg ${
                    withdrawType === 'standard' ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium">Standard (1-3 business days)</div>
                      <div className="text-xs text-gray-500">No fee</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setWithdrawType('instant')}
                  className={`w-full flex items-center justify-between p-4 border rounded-lg ${
                    withdrawType === 'instant' ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <BoltIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium">Instant</div>
                      <div className="text-xs text-gray-500">1% fee</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Fee Breakdown */}
              {amount && (
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-light text-gray-500">Amount</span>
                    <span className="font-medium">${Number(amount).toLocaleString()}</span>
                  </div>
                  {withdrawType === 'instant' && (
                    <div className="flex justify-between text-sm">
                      <span className="font-light text-gray-500">Instant Fee (1%)</span>
                      <span className="font-medium text-red-600">-${fee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-medium pt-2 border-t">
                    <span>You'll receive</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-light"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  disabled={!amount || Number(amount) <= 0 || Number(amount) > availableBalance}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Withdraw
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
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [graphRange, setGraphRange] = useState<'7d' | '30d' | '90d' | '1y' | 'all'>('all');

  // Add date range options
  const graphRangeOptions = [
    { label: '7 Days', value: '7d' },
    { label: '30 Days', value: '30d' },
    { label: '90 Days', value: '90d' },
    { label: '1 Year', value: '1y' },
    { label: 'All Time', value: 'all' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-light text-gray-900">Earnings</h1>
          <p className="mt-1 text-sm font-light text-gray-500">
            Track your earnings and financial performance
          </p>
        </div>
        <button
          onClick={() => setShowStatementModal(true)}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors font-light flex items-center space-x-1"
        >
          <DocumentArrowDownIcon className="h-5 w-5" />
          <span className="text-sm hidden sm:inline">Statements</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-light text-gray-500">Total Earnings</p>
                <span className="text-xs font-light text-gray-400">
                  (${mockData.pendingPayouts.toLocaleString()} pending)
                </span>
              </div>
              <p className="text-2xl font-light text-gray-900">
                ${mockData.totalEarnings.toLocaleString()}
              </p>
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
              <p className="text-sm font-light text-gray-500">Available for Withdrawal</p>
              <p className="text-2xl font-light text-gray-900">
                ${mockData.pendingPayouts.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light flex items-center text-sm"
            >
              <BanknotesIcon className="h-4 w-4 mr-1.5" />
              Withdraw
            </button>
          </div>
        </motion.div>

        {/* Add more stats cards */}
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-xs sm:text-sm font-light text-gray-500">Avg Monthly</p>
                <p className="text-sm sm:text-xl font-light text-gray-900 mt-1">
                  ${(mockData.monthlyEarnings.reduce((acc, curr) => acc + curr.amount, 0) / 
                    mockData.monthlyEarnings.length).toLocaleString()}
                </p>
              </div>
              <p className="text-[10px] sm:text-xs font-light text-gray-500 mt-2">
                Last {mockData.monthlyEarnings.length}mo
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-xs sm:text-sm font-light text-gray-500">Highest</p>
                <p className="text-sm sm:text-xl font-light text-gray-900 mt-1">
                  ${Math.max(...mockData.monthlyEarnings.map(m => m.amount)).toLocaleString()}
                </p>
              </div>
              <p className="text-[10px] sm:text-xs font-light text-gray-500 mt-2">
                {mockData.monthlyEarnings.find(m => 
                  m.amount === Math.max(...mockData.monthlyEarnings.map(m => m.amount)))?.month}
              </p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-xs sm:text-sm font-light text-gray-500">Growth</p>
                <p className="text-sm sm:text-xl font-light text-gray-900 mt-1">
                  {(mockData.monthlyEarnings.reduce((acc, curr) => acc + curr.growth, 0) / 
                    mockData.monthlyEarnings.length).toFixed(1)}%
                </p>
              </div>
              <p className="text-[10px] sm:text-xs font-light text-gray-500 mt-2">
                Month over month
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-60 sm:h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockData.monthlyEarnings.slice(
                graphRange === '7d' ? -7 : 
                graphRange === '30d' ? -30 :
                graphRange === '90d' ? -90 :
                graphRange === '1y' ? -12 :
                0
              )}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#6B7280' }}
                interval={'preserveStartEnd'}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#6B7280' }}
                tickFormatter={(value) => `$${value/1000}k`}
                width={35}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}
                labelStyle={{ color: '#111827', fontWeight: 500 }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorEarnings)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="growth"
                stroke="#22C55E"
                fillOpacity={1}
                fill="url(#colorGrowth)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Date Range - Now below the chart */}
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-1.5 sm:mr-2 opacity-50" />
              <span className="text-xs sm:text-sm font-light text-gray-600">Earnings</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-1.5 sm:mr-2 opacity-50" />
              <span className="text-xs sm:text-sm font-light text-gray-600">Growth</span>
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="flex justify-center">
            <div className={`flex overflow-x-auto ${styles.hideScrollbar} -mx-4 px-4 sm:mx-0 sm:px-0`}>
              <div className="flex space-x-1.5 sm:space-x-2 pb-0.5">
                {graphRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setGraphRange(option.value as typeof graphRange)}
                    className={`px-3 py-1.5 text-xs font-light rounded-lg transition-colors whitespace-nowrap ${
                      graphRange === option.value
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-light text-gray-900 mb-4 sm:mb-6">Completed Bookings</h2>
        <div className="space-y-4">
          {mockData.recentTransactions.map((transaction) => (
            <Link
              key={transaction.id}
              to={`/vendors/dashboard/bookings/${transaction.bookingId}/completed`}
              className="block hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-4">
                  <img
                    src={transaction.clientPhoto || `https://ui-avatars.com/api/?name=${transaction.clientName}`}
                    alt={transaction.clientName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-xs font-light text-gray-500">{transaction.clientName}</p>
                    <p className="text-xs font-light text-gray-500">{transaction.date}</p>
                    {transaction.review && (
                      <div className="mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-3 w-3 ${
                                i < transaction.review!.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-xs font-light text-gray-600">
                            {transaction.review.date}
                          </span>
                        </div>
                        <p className="text-xs font-light text-gray-600 mt-1 line-clamp-2">
                          {transaction.review.comment}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </span>
                  <div className="mt-1">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-light rounded-full">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <StatementModal
        isOpen={showStatementModal}
        onClose={() => setShowStatementModal(false)}
      />

      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        availableBalance={mockData.pendingPayouts}
      />
    </div>
  );
};

export default VendorEarnings; 