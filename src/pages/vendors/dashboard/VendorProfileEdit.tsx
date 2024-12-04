import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  PhotoIcon, 
  PlusIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import NotificationToast from '../../../components/common/NotificationToast';

const VendorProfileEdit: React.FC = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const [profileData, setProfileData] = useState({
    phone: userProfile?.phone || '',
    website: 'https://www.websitename.com',
    address: 'Los Angeles, CA 90028',
    yearFounded: '2020',
    numberOfEmployees: '1',
    introduction: 'We have been live testing for a very long time and love it',
    backgroundCheck: false,
    professionalLicenses: [],
    offeringRemoteServices: false,
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Add your photo upload logic here
      setNotification({
        show: true,
        message: 'Profile photo updated successfully',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to update profile photo',
        type: 'error'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Add your save logic here
      setNotification({
        show: true,
        message: 'Profile updated successfully',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to update profile',
        type: 'error'
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Edit Profile</h1>
          <p className="mt-1 text-sm font-light text-gray-500">
            Update your profile information visible to customers
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light"
        >
          Save Changes
        </button>
      </div>

      {/* Profile Photo Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={userProfile?.profileImage || `https://ui-avatars.com/api/?name=${userProfile?.firstName}+${userProfile?.lastName}`}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 p-1 rounded-full bg-white shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50"
            >
              <PencilIcon className="h-4 w-4 text-gray-500" />
            </label>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
          <div>
            <h2 className="text-xl font-light text-gray-900">
              {userProfile?.firstName} {userProfile?.lastName}
            </h2>
            <p className="text-sm font-light text-gray-500">
              {userProfile?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-light text-gray-900 mb-6">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-light text-gray-700">Phone</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-gray-700">Website</label>
            <input
              type="url"
              value={profileData.website}
              onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-gray-700">Address</label>
            <input
              type="text"
              value={profileData.address}
              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-gray-700">Year Founded</label>
            <input
              type="text"
              value={profileData.yearFounded}
              onChange={(e) => setProfileData({ ...profileData, yearFounded: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-gray-700">Number of Employees</label>
            <input
              type="number"
              value={profileData.numberOfEmployees}
              onChange={(e) => setProfileData({ ...profileData, numberOfEmployees: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
            />
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-light text-gray-900 mb-6">Your Introduction</h3>
        <textarea
          value={profileData.introduction}
          onChange={(e) => setProfileData({ ...profileData, introduction: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
          placeholder="Tell customers about your business..."
        />
      </div>

      {/* Credentials Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-light text-gray-900 mb-6">Credentials</h3>
        <div className="space-y-6">
          {/* Background Check */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Background Check</h4>
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50"
            >
              Start
            </button>
          </div>

          {/* Professional Licenses */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Professional Licenses</h4>
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Additional Profile Badges */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-light text-gray-900 mb-6">Additional Profile Badges</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={profileData.offeringRemoteServices}
              onChange={(e) => setProfileData({ ...profileData, offeringRemoteServices: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-light text-gray-700">I am offering remote services or consultations</span>
          </label>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-light text-gray-900 mb-6">Social Media</h3>
        <div className="space-y-4">
          <button
            className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50"
          >
            Add Facebook
          </button>
          <button
            className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50"
          >
            Add Instagram
          </button>
          <button
            className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50"
          >
            Add Twitter
          </button>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-light text-gray-900">Featured Projects</h3>
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50"
          >
            Add New Project
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Project placeholders */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
              <PlusIcon className="h-8 w-8 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      <NotificationToast
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default VendorProfileEdit; 