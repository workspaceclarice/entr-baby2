import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeftIcon, 
  HomeIcon, 
  ChevronRightIcon,
  StarIcon,
  MapPinIcon,
  GlobeAltIcon,
  CalendarIcon,
  UserGroupIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../../contexts/AuthContext';
import { VendorProfile, CustomerProfile } from '../../../contexts/AuthContext';

// Define project type
interface Project {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

// Add type guard for VendorProfile
const isVendorProfile = (profile: VendorProfile | CustomerProfile | null): profile is VendorProfile => {
  return profile?.type === 'vendor';
};

const VendorProfilePreview: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  // Use the vendor profile data if available
  const vendorData = isVendorProfile(userProfile) ? userProfile : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm font-light text-gray-500 mb-8">
        <Link to="/vendors/dashboard" className="hover:text-gray-700">
          <HomeIcon className="h-4 w-4" />
        </Link>
        <ChevronRightIcon className="h-4 w-4 mx-2" />
        <Link to="/vendors/dashboard/profile" className="hover:text-gray-700">Profile</Link>
        <ChevronRightIcon className="h-4 w-4 mx-2" />
        <span className="text-gray-900">Preview</span>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => navigate('/vendors/dashboard/profile')}
        className="flex items-center text-sm text-blue-600 hover:text-blue-700 mb-6"
      >
        <ChevronLeftIcon className="h-4 w-4 mr-1" />
        Back to Edit
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={vendorData?.profileImage || `https://ui-avatars.com/api/?name=${vendorData?.firstName}+${vendorData?.lastName}`}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-light text-gray-900">
              {vendorData?.firstName} {vendorData?.lastName}
            </h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-sm font-light">New</span>
              </div>
              <span className="mx-2">•</span>
              <MapPinIcon className="h-4 w-4 text-gray-400" />
              <span className="ml-1 text-sm font-light text-gray-500">
                {vendorData?.location || 'Los Angeles, CA'}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full md:w-auto">
            <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light">
              Contact
            </button>
            <button className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-light">
              Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-light text-gray-900 mb-4">About</h2>
        <p className="text-gray-600 font-light mb-6">
          {vendorData?.introduction || 'No introduction provided'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <GlobeAltIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-light text-gray-500">Website</p>
              <a href={vendorData?.website} className="text-sm text-blue-600 hover:text-blue-700">
                {vendorData?.website || 'Not provided'}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-light text-gray-500">Year Founded</p>
              <p className="text-sm">2020</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <UserGroupIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-light text-gray-500">Team Size</p>
              <p className="text-sm">1-5 people</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CheckBadgeIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-light text-gray-500">Verified</p>
              <p className="text-sm">Background Check</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-light text-gray-900 mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(vendorData?.featuredProjects || [1, 2, 3]).map((project: Project | number, i: number) => (
            <div 
              key={typeof project === 'number' ? i : project.id} 
              className="group relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100"
            >
              {typeof project === 'number' ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              ) : (
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-light text-gray-900">Reviews</h2>
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-sm font-light">New</span>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500 font-light">No reviews yet</p>
        </div>
      </div>
    </div>
  );
};

export default VendorProfilePreview; 