import React, { useState } from 'react';
import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Chat {
  id: string;
  clientName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  booking: {
    id: string;
    eventName: string;
    date: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    amount: string;
  };
}

const MessengerHub: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Mock data - replace with real data
  const chats: Chat[] = [
    {
      id: '1',
      clientName: 'Jessica Chen',
      lastMessage: 'Looking forward to discussing the details',
      timestamp: '2 min ago',
      unread: true,
      booking: {
        id: 'BK-001',
        eventName: 'Corporate Annual Gala',
        date: '2024-04-15',
        status: 'pending',
        amount: '$3,500'
      }
    },
    {
      id: '2',
      clientName: 'Michael Brown',
      lastMessage: 'Perfect, thank you for confirming',
      timestamp: '1 hour ago',
      unread: false,
      booking: {
        id: 'BK-002',
        eventName: 'Wedding Photography',
        date: '2024-05-20',
        status: 'confirmed',
        amount: '$2,800'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex h-[calc(100vh-12rem)] bg-white rounded-lg shadow-sm">
        {/* Chat List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full text-left p-4 border-b hover:bg-gray-50 transition-colors ${
                  selectedChat === chat.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-gray-900">{chat.clientName}</span>
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                
                {/* Booking Overview */}
                <div className="mt-2 p-2 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{chat.booking.eventName}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(chat.booking.status)}`}>
                      {chat.booking.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {chat.booking.date} • {chat.booking.amount}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b">
              {/* Show booking details of selected chat */}
              {(() => {
                const chat = chats.find(c => c.id === selectedChat);
                return chat ? (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-medium text-gray-900">{chat.clientName}</h2>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(chat.booking.status)}`}>
                        {chat.booking.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {chat.booking.eventName} • {chat.booking.date}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Add message components here */}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => {/* Handle send message */}}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <ChatBubbleLeftIcon className="h-12 w-12 mx-auto mb-4" />
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengerHub; 