import React, { useState } from 'react';
import { ChatBubbleLeftIcon, CheckCircleIcon, PhotoIcon, PaperClipIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface Chat {
  id: string;
  clientName: string;
  clientPhoto?: string;
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

const VendorMessengerHub: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showChatList, setShowChatList] = useState(true);

  // Mock data - replace with real data
  const chats: Chat[] = [
    {
      id: '1',
      clientName: 'Jessica Chen',
      clientPhoto: 'https://randomuser.me/api/portraits/women/1.jpg',
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
      clientPhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Here you would typically upload the file to your backend
      // and then add it to the message thread
    }
  };

  const BackButton = () => (
    <button
      onClick={() => setShowChatList(true)}
      className="lg:hidden flex items-center text-gray-500 hover:text-gray-700 mb-4"
    >
      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="font-light">Back to conversations</span>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Messages</h1>
          <p className="mt-1 text-sm font-light text-gray-500">
            Manage your conversations with clients
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Chat List - Show/hide based on mobile state */}
        <div className={`lg:w-1/3 ${!showChatList && 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-light text-gray-900 mb-6">Conversations</h2>
            <div className="space-y-4">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat);
                    setShowChatList(false); // Hide chat list on mobile when selecting a chat
                  }}
                  className={`p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer ${
                    selectedChat?.id === chat.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {chat.clientPhoto ? (
                          <img
                            src={chat.clientPhoto}
                            alt={chat.clientName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserCircleIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-light text-gray-900">
                          {chat.clientName}
                        </h3>
                        <p className="text-sm font-light text-gray-500">
                          {chat.booking.eventName}
                        </p>
                      </div>
                    </div>
                    {chat.unread && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-light bg-blue-100 text-blue-800">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm font-light text-gray-500">
                    <p className="truncate">{chat.lastMessage}</p>
                    <span className="ml-2 whitespace-nowrap">{chat.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window - Show/hide based on mobile state */}
        <div className={`lg:w-2/3 ${showChatList && 'hidden lg:block'}`}>
          {selectedChat ? (
            <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-12rem)] lg:h-[600px] flex flex-col">
              {/* Back button for mobile */}
              <BackButton />
              
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {selectedChat.clientPhoto ? (
                        <img
                          src={selectedChat.clientPhoto}
                          alt={selectedChat.clientName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserCircleIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-gray-900">
                        {selectedChat.clientName}
                      </h3>
                      <Link 
                        to={`/vendors/dashboard/bookings/${selectedChat.booking.id}/details`}
                        className="text-sm font-light text-gray-500 hover:text-blue-600 flex items-center"
                      >
                        {selectedChat.booking.eventName} • {selectedChat.booking.date}
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-light ${
                      selectedChat.booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : selectedChat.booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedChat.booking.status}
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      ${selectedChat.booking.amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {/* Messages will go here */}
                <div className="flex items-center justify-center h-full text-gray-500 font-light">
                  <p>Message history coming soon</p>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t">
                <div className="flex items-end space-x-2 sm:space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer"
                    >
                      <PhotoIcon className="h-5 w-5" />
                    </label>
                  </div>
                  <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-light text-sm sm:text-base">
                    Send
                  </button>
                </div>
                {selectedFile && (
                  <div className="mt-2 flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                    <PaperClipIcon className="h-4 w-4" />
                    <span className="font-light truncate">{selectedFile.name}</span>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-red-500 hover:text-red-600 font-light whitespace-nowrap"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 font-light h-[calc(100vh-12rem)] lg:h-[600px]">
              <div className="text-center">
                <ChatBubbleLeftIcon className="h-12 w-12 mx-auto mb-4" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorMessengerHub; 