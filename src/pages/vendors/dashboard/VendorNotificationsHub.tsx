import React, { useState } from 'react';
import { BellIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'booking_request' | 'booking_confirmed' | 'message' | 'review' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  booking?: {
    id: string;
    eventName: string;
    date: string;
    amount: string;
  };
}

const VendorNotificationsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking_request',
      title: 'New Booking Request',
      message: 'Jessica Chen has requested to book Corporate Annual Gala',
      timestamp: '2 min ago',
      read: false,
      actionUrl: '/vendors/dashboard/bookings/123',
      booking: {
        id: 'BK-001',
        eventName: 'Corporate Annual Gala',
        date: '2024-04-15',
        amount: '$3,500'
      }
    },
    {
      id: '2',
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      message: 'Wedding Photography booking has been confirmed',
      timestamp: '1 hour ago',
      read: true,
      actionUrl: '/vendors/dashboard/bookings/124/details',
      booking: {
        id: 'BK-002',
        eventName: 'Wedding Photography',
        date: '2024-05-20',
        amount: '$2,800'
      }
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'Michael Brown sent you a message about Wedding Photography',
      timestamp: '2 hours ago',
      read: false,
      actionUrl: '/vendors/dashboard/messenger'
    },
    {
      id: '4',
      type: 'review',
      title: 'New Review',
      message: 'Sarah Johnson left a 5-star review for Birthday Party Photography',
      timestamp: '1 day ago',
      read: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_request':
        return <BellIcon className="h-6 w-6 text-blue-500" />;
      case 'booking_confirmed':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'message':
        return <BellIcon className="h-6 w-6 text-purple-500" />;
      case 'review':
        return <BellIcon className="h-6 w-6 text-yellow-500" />;
      default:
        return <BellIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with your latest activities
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 px-1 border-b-2 font-light text-sm ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`py-4 px-1 border-b-2 font-light text-sm ${
              activeTab === 'unread'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Unread
          </button>
        </nav>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-sm p-4 ${
              !notification.read ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{notification.timestamp}</span>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                
                {notification.booking && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {notification.booking.eventName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.booking.date} • {notification.booking.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {notification.actionUrl && (
                  <Link
                    to={notification.actionUrl}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 inline-block"
                  >
                    View Details →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'unread' 
                ? "You're all caught up!"
                : "You don't have any notifications yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorNotificationsHub; 