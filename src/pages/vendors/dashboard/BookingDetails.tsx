import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  DocumentIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  sender: 'vendor' | 'client';
  content: string;
  timestamp: string;
  attachments?: { name: string; url: string; }[];
}

const BookingDetails: React.FC = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  // Mock data - In real app, fetch based on bookingId
  const bookingDetails = {
    id: '123',
    status: 'Confirmed',
    event: {
      name: 'Corporate Annual Gala',
      date: '2024-04-15',
      time: '6:00 PM - 11:00 PM',
      location: 'Grand Ballroom, Hilton Hotel',
      expectedGuests: 200,
    },
    client: {
      name: 'Jessica Chen',
      company: 'TechCorp Inc.',
      email: 'jessica.chen@techcorp.com',
      phone: '+1 (555) 123-4567',
    },
    timeline: [
      {
        time: '5:30 PM',
        task: 'Setup and equipment check',
      },
      {
        time: '6:00 PM',
        task: 'Event starts - Arrival photos',
      },
      {
        time: '7:00 PM',
        task: 'Group photos and networking',
      },
      // ... more timeline items
    ],
    messages: [
      {
        id: '1',
        sender: 'client',
        content: `Hi, just wanted to confirm if we're all set for the event?`,
        timestamp: '2024-03-20 14:30',
      },
      {
        id: '2',
        sender: 'vendor',
        content: `Yes, absolutely! I've reviewed the timeline and everything looks good. Would you like to schedule a quick call to go over any specific shots you'd like?`,
        timestamp: '2024-03-20 14:35',
      },
      {
        id: '3',
        sender: 'client',
        content: `That would be great! Also, I've attached the updated guest list.`,
        timestamp: '2024-03-20 14:40',
        attachments: [
          { name: 'guest_list.pdf', url: '#' }
        ]
      }
    ] as Message[],
    documents: [
      {
        name: 'Event Timeline',
        url: '#',
        uploadedAt: '2024-03-15'
      },
      {
        name: 'Floor Plan',
        url: '#',
        uploadedAt: '2024-03-16'
      }
    ]
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    // In real app, this would be an API call
    console.log('Sending message:', newMessage, attachments);
    setNewMessage('');
    setAttachments([]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments(Array.from(event.target.files));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 flex items-center"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to bookings
        </button>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extralight text-gray-900">Booking Details</h1>
          <span className="px-3 py-1 text-sm font-light rounded-full bg-green-100 text-green-800">
            {bookingDetails.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Details Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Event Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{bookingDetails.event.date}</p>
                    <p className="text-sm text-gray-500">{bookingDetails.event.time}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">{bookingDetails.event.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">{bookingDetails.event.expectedGuests} expected guests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Event Timeline</h2>
            <div className="space-y-4">
              {bookingDetails.timeline.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-16 text-sm text-gray-500">{item.time}</div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-900">{item.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Messages</h2>
            
            {/* Messages List */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {bookingDetails.messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === 'vendor' 
                        ? 'bg-blue-50 text-blue-900' 
                        : 'bg-gray-50 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment, index) => (
                          <a 
                            key={index}
                            href={attachment.url}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                          >
                            <DocumentIcon className="h-4 w-4 mr-1" />
                            {attachment.name}
                          </a>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t pt-4">
              <div className="flex items-end space-x-4">
                <div className="flex-grow">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                  />
                  {attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {Array.from(attachments).map((file, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <DocumentIcon className="h-4 w-4 mr-1" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 space-x-2">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    className="sr-only"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
                  >
                    Attach
                  </label>
                  <button
                    onClick={handleSendMessage}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <PaperAirplaneIcon className="h-4 w-4 mr-1" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Client Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{bookingDetails.client.name}</p>
                <p className="text-sm text-gray-500">{bookingDetails.client.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{bookingDetails.client.email}</p>
                <p className="text-sm text-gray-600">{bookingDetails.client.phone}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Documents</h2>
            <div className="space-y-3">
              {bookingDetails.documents.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                >
                  <DocumentIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">Uploaded {doc.uploadedAt}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails; 