import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { 
  UserCircleIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home Link */}
          <Link to="/" className="text-xl font-semibold text-gray-900">
            ENTR
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/events" className="text-gray-600 hover:text-gray-900">
              Events
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link to="/venues" className="text-gray-600 hover:text-gray-900">
              Venues
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-6">
            {!currentUser && (
              <Link 
                to="/vendors" 
                className="text-gray-600 hover:text-gray-900 border-b border-gray-300"
              >
                For Vendors
              </Link>
            )}
            {currentUser ? (
              <div className="flex items-center">
                <Link
                  to="/create-event"
                  className="text-gray-600 hover:text-gray-900 border-b border-gray-300 flex items-center space-x-1 mr-6"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>Create Event</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <Link to="/favorites" className="text-gray-600 hover:text-gray-900">
                    <HeartIcon className="h-6 w-6" />
                  </Link>
                  <Link to="/messages" className="text-gray-600 hover:text-gray-900">
                    <ChatBubbleLeftIcon className="h-6 w-6" />
                  </Link>
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center text-gray-600 hover:text-gray-900">
                      <UserCircleIcon className="h-8 w-8" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/dashboard"
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } block px-4 py-2 text-sm text-gray-700`}
                              >
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleSignOut}
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                              >
                                Sign Out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 