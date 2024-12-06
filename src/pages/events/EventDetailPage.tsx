import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FloatingRSVP from '../../components/events/FloatingRSVP';
import FloatingTicketPurchase from '../../components/events/FloatingTicketPurchase';
import RSVPFlow from '../../components/events/RSVPFlow';
import GuestList from '../../components/events/GuestList';
import type { GuestListProps } from '../../components/events/types';
import {
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  ChevronRightIcon,
  BeakerIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { Event } from '../../types/event';
import { Link } from 'react-router-dom';
import { events } from '../../data/events';

interface Reply {
  authorName: string;
  authorImage: string;
  content: string;
  timeAgo: string;
  likes?: number;
}

interface Thread {
  authorName: string;
  authorImage: string;
  content: string;
  timeAgo: string;
  likes: number;
  replies?: Reply[];
}

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'maybe' | 'not-going' | null>(null);
  const [showRSVPFlow, setShowRSVPFlow] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newThread, setNewThread] = useState('');
  const [newReply, setNewReply] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [likedThreads, setLikedThreads] = useState<Set<number>>(new Set());
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());

  // Find the event from our data
  const event = events.find(e => e.id === id);

  // Redirect to events page if event not found
  useEffect(() => {
    if (!event) {
      navigate('/events');
    }
  }, [event, navigate]);

  if (!event) {
    return null; // or a loading spinner
  }

  const handleRSVP = (response: 'going' | 'maybe' | 'not-going') => {
    setRsvpStatus(response);
    setShowRSVPFlow(true);
  };

  const handleRSVPSubmit = () => {
    if (rsvpStatus) {
      console.log('Submitting RSVP:', rsvpStatus);
      setShowRSVPFlow(false);
      setRsvpStatus(null);
    }
  };

  const handlePurchase = () => {
    console.log('Purchase initiated for event:', event.id);
    // Add purchase flow logic here
  };

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      console.log('Share functionality not supported');
      // You could show a modal with share options here
    }
  };

  const isTicketed = !event.isRSVP && event.price > 0;

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'musical-note':
        return <MusicalNoteIcon className="w-6 h-6" />;
      case 'user-group':
        return <UserGroupIcon className="w-6 h-6" />;
      case 'beaker':
        return <BeakerIcon className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // In a real app, you would send this to your backend
    console.log('New comment:', newComment);
    setNewComment('');
  };

  const handleThreadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThread.trim()) return;
    
    // In a real app, you would send this to your backend
    console.log('New thread:', newThread);
    setNewThread('');
  };

  const handleReplySubmit = (threadIndex: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    
    console.log(`New reply to thread ${threadIndex}:`, newReply);
    setNewReply('');
    setReplyingTo(null);
  };

  const toggleThreadLike = (threadIndex: number) => {
    setLikedThreads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(threadIndex)) {
        newSet.delete(threadIndex);
      } else {
        newSet.add(threadIndex);
      }
      return newSet;
    });
  };

  const toggleReplyLike = (threadIndex: number, replyIndex: number) => {
    const key = `${threadIndex}-${replyIndex}`;
    setLikedReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-32">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100">
          <div className="px-4 py-2.5">
            <div className="flex items-center space-x-2 text-xs font-light">
              <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <ChevronRightIcon className="w-3 h-3 text-gray-400" />
              <Link to="/events" className="text-gray-500 hover:text-gray-900">Events</Link>
              <ChevronRightIcon className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900">{event.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[60vh]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {/* Event Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-light tracking-tight flex-1">{event.title}</h1>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {isLiked ? (
                      <HeartIconSolid className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ShareIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="flex items-center space-x-4 mb-8">
              <img
                src={event.hostImage}
                alt={event.hostName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="text-sm text-gray-500">Hosted by</div>
                <div className="font-medium">{event.hostName}</div>
              </div>
            </div>

            {/* Guest List */}
            <div className="mb-8 pb-8 border-b">
              <GuestList 
                attendeeCount={event.attendeeCount}
                isRSVP={!isTicketed}
                guestList={event.guestList || { going: 0, maybe: 0, notGoing: 0 }}
              />
            </div>

            {/* About */}
            <div className="mb-8">
              <h2 className="text-2xl font-light mb-4">About</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Highlights Section */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-light mb-4">Event Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.highlights.map((highlight, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                      <div className="text-purple-600 mb-2">
                        {getIconComponent(highlight.iconType)}
                      </div>
                      <h3 className="font-medium mb-1">{highlight.title}</h3>
                      <p className="text-sm text-gray-600">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Speakers/Hosts - Only show if they exist */}
            {event.speakers && (
              <div className="mb-8">
                <h2 className="text-2xl font-light mb-4">{event.speakersTitle || 'Featured Speakers'}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="text-center">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-24 h-24 rounded-full mx-auto mb-3"
                      />
                      <h3 className="font-medium">{speaker.name}</h3>
                      <p className="text-sm text-gray-600">{speaker.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Threads Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light">Threads</h2>
                <span className="text-sm text-gray-500">
                  {event.comments?.length || 0} discussions
                </span>
              </div>

              {/* New Thread Form */}
              <form onSubmit={handleThreadSubmit} className="mb-8">
                <div className="mb-4">
                  <textarea
                    value={newThread}
                    onChange={(e) => setNewThread(e.target.value)}
                    placeholder="Start a new thread..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newThread.trim()}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post Thread
                  </button>
                </div>
              </form>

              {/* Threads List */}
              <div className="space-y-8">
                {event.comments?.map((thread, threadIndex) => (
                  <div key={threadIndex} className="border-b border-gray-100 pb-6 last:border-0">
                    {/* Thread */}
                    <div className="flex space-x-4">
                      <img
                        src={thread.authorImage}
                        alt={thread.authorName}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline space-x-2 mb-1">
                          <span className="font-medium">{thread.authorName}</span>
                          <span className="text-sm text-gray-500">{thread.timeAgo}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{thread.content}</p>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => toggleThreadLike(threadIndex)}
                            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-600"
                          >
                            {likedThreads.has(threadIndex) ? (
                              <HeartIconSolid className="w-4 h-4 text-purple-600" />
                            ) : (
                              <HeartIconOutline className="w-4 h-4" />
                            )}
                            <span>{(thread.likes || 0) + (likedThreads.has(threadIndex) ? 1 : 0)}</span>
                          </button>
                          <button
                            onClick={() => setReplyingTo(threadIndex)}
                            className="text-sm text-gray-500 hover:text-purple-600"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === threadIndex && (
                      <form 
                        onSubmit={(e) => handleReplySubmit(threadIndex, e)}
                        className="ml-14 mt-4"
                      >
                        <div className="mb-3">
                          <textarea
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            rows={2}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                            className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!newReply.trim()}
                            className="px-4 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Reply
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Replies */}
                    {thread.replies && thread.replies.length > 0 && (
                      <div className="ml-14 mt-4 space-y-4">
                        {thread.replies.map((reply, replyIndex) => (
                          <div key={replyIndex} className="flex space-x-4">
                            <img
                              src={reply.authorImage}
                              alt={reply.authorName}
                              className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-baseline space-x-2 mb-1">
                                <span className="font-medium">{reply.authorName}</span>
                                <span className="text-sm text-gray-500">{reply.timeAgo}</span>
                              </div>
                              <p className="text-gray-600 mb-2">{reply.content}</p>
                              <button
                                onClick={() => toggleReplyLike(threadIndex, replyIndex)}
                                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-600"
                              >
                                {likedReplies.has(`${threadIndex}-${replyIndex}`) ? (
                                  <HeartIconSolid className="w-4 h-4 text-purple-600" />
                                ) : (
                                  <HeartIconOutline className="w-4 h-4" />
                                )}
                                <span>{(reply.likes || 0) + (likedReplies.has(`${threadIndex}-${replyIndex}`) ? 1 : 0)}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Components - Fixed positioning */}
      <div className="fixed bottom-0 inset-x-0 z-50">
        <div className="bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto">
            {isTicketed ? (
              <FloatingTicketPurchase 
                event={event} 
                onPurchase={handlePurchase}
              />
            ) : (
              <FloatingRSVP 
                event={event} 
                onRSVP={handleRSVP}
                status={rsvpStatus}
                onSubmit={handleRSVPSubmit}
              />
            )}
          </div>
        </div>
      </div>

      {/* RSVP Flow Modal */}
      {showRSVPFlow && rsvpStatus && (
        <div className="fixed inset-0 z-50">
          <RSVPFlow
            event={event}
            status={rsvpStatus}
            onClose={() => {
              setShowRSVPFlow(false);
              setRsvpStatus(null);
            }}
            onSubmit={handleRSVPSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default EventDetailPage; 