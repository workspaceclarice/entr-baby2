import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  EyeIcon,
  XMarkIcon,
  PencilIcon,
  PlusIcon,
  PhotoIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useAuth, VendorProfile, CustomerProfile } from '../../../contexts/AuthContext';
import NotificationToast from '../../../components/common/NotificationToast';

// Add these interfaces at the top of the file
interface Project {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  profileImage: string;
  introduction: string;
  location: string;
  website: string;
  yearFounded: string;
  teamSize: string;
  isBackgroundChecked: boolean;
  featuredProjects: Project[];
  socialMedia: SocialMedia;
}

// Update the VendorProfile interface extension
declare module '../../../contexts/AuthContext' {
  interface VendorProfile {
    introduction?: string;
    location?: string;
    website?: string;
    yearFounded?: string;
    teamSize?: string;
    isBackgroundChecked?: boolean;
    featuredProjects?: Project[];
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  }
}

const isVendorProfile = (profile: VendorProfile | CustomerProfile | null): profile is VendorProfile => {
  return profile?.userType === 'vendor';
};

const VendorProfileEditor: React.FC = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const vendorData = isVendorProfile(userProfile) ? userProfile : null;

  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: vendorData?.firstName || '',
    lastName: vendorData?.lastName || '',
    profileImage: vendorData?.profileImage || '',
    introduction: vendorData?.introduction || '',
    location: vendorData?.location || 'Los Angeles, CA',
    website: vendorData?.website || '',
    yearFounded: vendorData?.yearFounded || '2020',
    teamSize: vendorData?.teamSize || '1-5',
    isBackgroundChecked: vendorData?.isBackgroundChecked || false,
    featuredProjects: vendorData?.featuredProjects || [],
    socialMedia: {
      facebook: vendorData?.socialMedia?.facebook || '',
      instagram: vendorData?.socialMedia?.instagram || '',
      twitter: vendorData?.socialMedia?.twitter || ''
    }
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Add your photo upload logic here
      // Update profileData.profileImage with the new URL
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

  const handleProjectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const newProject: Project = {
        id: Date.now().toString(),
        title: 'New Project',
        imageUrl: URL.createObjectURL(file),
        description: ''
      };

      setProfileData((prev: ProfileFormData) => ({
        ...prev,
        featuredProjects: [...prev.featuredProjects, newProject]
      }));
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to upload project photo',
        type: 'error'
      });
    }
  };

  const handleSave = async () => {
    if (!userProfile || !isVendorProfile(userProfile)) return;

    try {
      await updateUserProfile({
        ...userProfile,
        ...profileData,
        userType: 'vendor'
      } as VendorProfile);
      
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Edit Profile</h1>
          <p className="mt-1 text-sm font-light text-gray-500">
            Update your profile information visible to customers
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/vendors/dashboard/profile/preview')}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-light flex items-center justify-center"
          >
            <EyeIcon className="h-5 w-5 mr-2" />
            Preview Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleSave}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light"
          >
            Save Changes
          </motion.button>
        </div>
      </div>

      {/* Profile Photo Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={profileData.profileImage || `https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}`}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 p-1 rounded-full bg-white shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50"
            >
              <PencilIcon className="h-4 w-4 text-gray-500" />
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-light text-gray-700">First Name</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-light text-gray-900 mb-6">About</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-light text-gray-700">Introduction</label>
            <textarea
              value={profileData.introduction}
              onChange={(e) => setProfileData({ ...profileData, introduction: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
              placeholder="Tell customers about your business..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-light text-gray-700">Location</label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
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
              <label className="block text-sm font-light text-gray-700">Year Founded</label>
              <input
                type="text"
                value={profileData.yearFounded}
                onChange={(e) => setProfileData({ ...profileData, yearFounded: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-700">Team Size</label>
              <select
                value={profileData.teamSize}
                onChange={(e) => setProfileData({ ...profileData, teamSize: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
              >
                <option value="1-5">1-5 people</option>
                <option value="6-10">6-10 people</option>
                <option value="11-50">11-50 people</option>
                <option value="50+">50+ people</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-light text-gray-900">Featured Projects</h3>
          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleProjectUpload}
              className="hidden"
            />
            Add Project
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.featuredProjects.map((project: Project, index: number) => (
            <div key={project.id} className="group relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                <button
                  onClick={() => {
                    const newTitle = prompt('Enter project title:', project.title);
                    if (newTitle) {
                      const updatedProjects = [...profileData.featuredProjects];
                      updatedProjects[index] = { ...project, title: newTitle };
                      setProfileData({ ...profileData, featuredProjects: updatedProjects });
                    }
                  }}
                  className="p-2 bg-white rounded-full hover:bg-gray-100"
                >
                  <PencilIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    const updatedProjects = profileData.featuredProjects.filter((p: Project) => p.id !== project.id);
                    setProfileData({ ...profileData, featuredProjects: updatedProjects });
                  }}
                  className="p-2 bg-white rounded-full hover:bg-gray-100"
                >
                  <TrashIcon className="h-5 w-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}
          {profileData.featuredProjects.length < 6 && (
            <label className="aspect-w-16 aspect-h-9 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400">
              <input
                type="file"
                accept="image/*"
                onChange={handleProjectUpload}
                className="hidden"
              />
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-light text-gray-600">Add Project</span>
              </div>
            </label>
          )}
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-light text-gray-900 mb-6">Social Media</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-light text-gray-700">Facebook</label>
            <input
              type="url"
              value={profileData.socialMedia.facebook}
              onChange={(e) => setProfileData({
                ...profileData,
                socialMedia: { ...profileData.socialMedia, facebook: e.target.value }
              })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
              placeholder="https://facebook.com/your-page"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-gray-700">Instagram</label>
            <input
              type="url"
              value={profileData.socialMedia.instagram}
              onChange={(e) => setProfileData({
                ...profileData,
                socialMedia: { ...profileData.socialMedia, instagram: e.target.value }
              })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
              placeholder="https://instagram.com/your-handle"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-gray-700">Twitter</label>
            <input
              type="url"
              value={profileData.socialMedia.twitter}
              onChange={(e) => setProfileData({
                ...profileData,
                socialMedia: { ...profileData.socialMedia, twitter: e.target.value }
              })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
              placeholder="https://twitter.com/your-handle"
            />
          </div>
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

export default VendorProfileEditor; 