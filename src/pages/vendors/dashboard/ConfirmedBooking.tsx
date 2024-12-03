import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  DocumentIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';
import ServiceProgressTracker from '../../../components/vendors/bookings/ServiceProgressTracker';

interface Message {
  id: string;
  sender: 'vendor' | 'client';
  content: string;
  timestamp: string;
  attachments?: { name: string; url: string; }[];
}

interface ServiceListing {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  price: {
    startingAt: number;
    unit: string;
  };
  features: string[];
  location: string;
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod?: string;
  paymentDate?: string;
}

interface Client {
  name: string;
  company: string;
  email: string;
  phone: string;
  profileImage?: string;
  verified?: boolean;
  previousBookings?: number;
}

const ConfirmedBooking: React.FC = () => {
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
      profileImage: 'https://example.com/path/to/profile.jpg',
      verified: true,
      previousBookings: 3
    } as Client,
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
    ],
    bookedService: {
      id: 'service-123',
      title: 'Premium Photography Package',
      category: 'Photography',
      description: 'Professional event photography service with high-quality equipment and experienced photographers.',
      coverImage: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914',
      price: {
        startingAt: 2500,
        unit: 'per event'
      },
      features: [
        'Two professional photographers',
        'High-resolution edited photos',
        'Digital delivery within 48 hours',
        'Online gallery for sharing',
        'All raw files included'
      ],
      location: 'San Francisco, CA'
    } as ServiceListing,
    invoice: {
      id: 'inv-123',
      number: 'INV-2024-001',
      date: '2024-03-15',
      dueDate: '2024-03-29',
      status: 'pending',
      items: [
        {
          description: 'Premium Photography Package',
          quantity: 1,
          unitPrice: 2500,
          total: 2500
        },
        {
          description: 'Extra Hour Coverage',
          quantity: 1,
          unitPrice: 300,
          total: 300
        }
      ],
      subtotal: 2800,
      tax: 224,
      total: 3024
    } as Invoice,
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
          {/* Booked Service Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Booked Service</h2>
            <div className="flex items-start space-x-4">
              <img
                src={bookingDetails.bookedService.coverImage}
                alt={bookingDetails.bookedService.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{bookingDetails.bookedService.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{bookingDetails.bookedService.description}</p>
                <div className="flex flex-wrap gap-2">
                  {bookingDetails.bookedService.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-light bg-gray-100 text-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service Progress Tracker */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ServiceProgressTracker
              status="confirmed"
              estimatedArrival={bookingDetails.event.time.split('-')[0].trim()}
              vendorLocation={{ lat: 37.7749, lng: -122.4194 }}
              destinationLocation={{ lat: 37.7833, lng: -122.4167 }}
              onUpdateStatus={(status, photo) => {
                console.log('Status updated:', status, photo);
                // Handle status update
              }}
            />
          </div>

          {/* Tab Group */}
          <Tab.Group>
            <Tab.List className="flex space-x-4 border-b border-gray-200 mb-6">
              <Tab className={({ selected }) =>
                `py-2 px-4 text-sm font-light border-b-2 ${
                  selected 
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`
              }>
                Booking Details
              </Tab>
              <Tab className={({ selected }) =>
                `py-2 px-4 text-sm font-light border-b-2 ${
                  selected 
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`
              }>
                Messages
              </Tab>
              <Tab className={({ selected }) =>
                `py-2 px-4 text-sm font-light border-b-2 ${
                  selected 
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`
              }>
                Documents
              </Tab>
              <Tab className={({ selected }) =>
                `py-2 px-4 text-sm font-light border-b-2 ${
                  selected 
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`
              }>
                Invoice
              </Tab>
            </Tab.List>

            <Tab.Panels>
              {/* Event Details Panel */}
              <Tab.Panel>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Updated Client Information Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-light text-gray-900 mb-4">Client Information</h2>
                      <div className="flex items-start space-x-4">
                        <img
                          src={bookingDetails.client.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(bookingDetails.client.name)}&background=random`}
                          alt={bookingDetails.client.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-base font-medium text-gray-900">{bookingDetails.client.name}</h3>
                            {bookingDetails.client.verified && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                Verified
                              </span>
                            )}
                          </div>
                          {bookingDetails.client.company && (
                            <p className="text-sm text-gray-500">{bookingDetails.client.company}</p>
                          )}
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600 flex items-center">
                              <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-gray-100 mr-2">
                                📧
                              </span>
                              {bookingDetails.client.email}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-gray-100 mr-2">
                                📱
                              </span>
                              {bookingDetails.client.phone}
                            </p>
                          </div>
                          {bookingDetails.client.previousBookings && bookingDetails.client.previousBookings > 0 && (
                            <p className="mt-2 text-sm text-green-600">
                              {bookingDetails.client.previousBookings} previous bookings
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              {/* Messages Panel */}
              <Tab.Panel>
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
              </Tab.Panel>

              {/* Documents Panel */}
              <Tab.Panel>
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
              </Tab.Panel>

              {/* Invoice Panel */}
              <Tab.Panel>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-xl font-light text-gray-900 mb-2">Invoice</h2>
                      <p className="text-sm text-gray-500">#{bookingDetails.invoice.number}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-light rounded-full ${
                      bookingDetails.invoice.status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : bookingDetails.invoice.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {bookingDetails.invoice.status.charAt(0).toUpperCase() + bookingDetails.invoice.status.slice(1)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 py-6">
                    <table className="w-full">
                      <thead>
                        <tr className="text-sm text-gray-500">
                          <th className="text-left font-medium pb-4">Description</th>
                          <th className="text-right font-medium pb-4">Qty</th>
                          <th className="text-right font-medium pb-4">Unit Price</th>
                          <th className="text-right font-medium pb-4">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {bookingDetails.invoice.items.map((item, index) => (
                          <tr key={index}>
                            <td className="py-2">{item.description}</td>
                            <td className="text-right py-2">{item.quantity}</td>
                            <td className="text-right py-2">${item.unitPrice}</td>
                            <td className="text-right py-2">${item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="text-sm">
                        <tr className="border-t">
                          <td colSpan={3} className="text-right pt-4">Subtotal</td>
                          <td className="text-right pt-4">${bookingDetails.invoice.subtotal}</td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="text-right pt-2">Tax (8%)</td>
                          <td className="text-right pt-2">${bookingDetails.invoice.tax}</td>
                        </tr>
                        <tr className="font-medium">
                          <td colSpan={3} className="text-right pt-4">Total</td>
                          <td className="text-right pt-4">${bookingDetails.invoice.total}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Updated Client Information Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Client Information</h2>
            <div className="flex items-start space-x-4">
              <img
                src={bookingDetails.client.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(bookingDetails.client.name)}&background=random`}
                alt={bookingDetails.client.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-medium text-gray-900">{bookingDetails.client.name}</h3>
                  {bookingDetails.client.verified && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Verified
                    </span>
                  )}
                </div>
                {bookingDetails.client.company && (
                  <p className="text-sm text-gray-500">{bookingDetails.client.company}</p>
                )}
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-gray-100 mr-2">
                      📧
                    </span>
                    {bookingDetails.client.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-gray-100 mr-2">
                      📱
                    </span>
                    {bookingDetails.client.phone}
                  </p>
                </div>
                {bookingDetails.client.previousBookings && bookingDetails.client.previousBookings > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    {bookingDetails.client.previousBookings} previous bookings
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedBooking; 