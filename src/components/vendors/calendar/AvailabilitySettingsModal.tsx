import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';

interface AvailabilitySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (availability: WeeklyAvailability) => void;
  currentAvailability: WeeklyAvailability;
}

export interface WeeklyAvailability {
  [key: string]: {
    isAvailable: boolean;
    startTime: string;
    endTime: string;
  };
}

const DAYS = [
  { id: 'monday', label: 'Monday' },
  { id: 'tuesday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' },
];

const AvailabilitySettingsModal: React.FC<AvailabilitySettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentAvailability
}) => {
  const [availability, setAvailability] = useState<WeeklyAvailability>(currentAvailability);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateSelect = (date: Date) => {
    setSelectedDates(prev => {
      const isSelected = prev.some(d => d.getTime() === date.getTime());
      if (isSelected) {
        return prev.filter(d => d.getTime() !== date.getTime());
      } else {
        return [...prev, date];
      }
    });
  };

  const handleSave = () => {
    onSave(availability);
    onClose();
  };

  const handleDayToggle = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable
      }
    }));
  };

  const handleTimeChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
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
            className="relative bg-white rounded-lg w-full max-w-6xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-2xl font-light text-gray-900">
                Manage Availability
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Side - Calendar */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-lg border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-light text-gray-900">
                      {format(selectedMonth, 'MMMM yyyy')}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setSelectedMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    {daysInMonth.map((date) => {
                      const isSelected = selectedDates.some(d => d.getTime() === date.getTime());
                      const dayOfWeek = format(date, 'EEEE').toLowerCase();
                      const isAvailable = availability[dayOfWeek].isAvailable;
                      
                      return (
                        <button
                          key={date.toISOString()}
                          onClick={() => handleDateSelect(date)}
                          className={`
                            p-3 text-sm rounded-lg relative
                            ${isToday(date) ? 'border-2 border-blue-500' : ''}
                            ${!isSameMonth(date, selectedMonth) ? 'text-gray-300' : 'text-gray-900'}
                            ${isSelected ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
                            ${isAvailable ? 'hover:bg-green-50' : 'hover:bg-red-50'}
                          `}
                        >
                          <span className="relative z-10">{format(date, 'd')}</span>
                          {isAvailable && (
                            <div className="absolute inset-0 bg-green-50 opacity-20 rounded-lg" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-100 rounded-full mr-2" />
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-100 rounded-full mr-2" />
                      <span className="text-sm text-gray-600">Unavailable</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Availability Settings */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-light text-gray-900 mb-6">Weekly Schedule</h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {DAYS.map(day => (
                      <div 
                        key={day.id} 
                        className={`p-4 border rounded-lg transition-colors ${
                          selectedDates.some(date => format(date, 'EEEE').toLowerCase() === day.id)
                            ? 'border-blue-200 bg-blue-50'
                            : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-light text-gray-900">{day.label}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={availability[day.id].isAvailable}
                              onChange={() => handleDayToggle(day.id)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        {availability[day.id].isAvailable && (
                          <div className="flex space-x-4">
                            <div>
                              <label className="block text-sm font-light text-gray-700">Start Time</label>
                              <input
                                type="time"
                                value={availability[day.id].startTime}
                                onChange={(e) => handleTimeChange(day.id, 'startTime', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-light text-gray-700">End Time</label>
                              <input
                                type="time"
                                value={availability[day.id].endTime}
                                onChange={(e) => handleTimeChange(day.id, 'endTime', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-light text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-light hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AvailabilitySettingsModal; 