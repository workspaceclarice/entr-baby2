import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

const AttendeeDashboard: React.FC = () => {
  const { userProfile } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Profile Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <img
              src={userProfile?.profileImage || `https://ui-avatars.com/api/?name=${userProfile?.firstName}+${userProfile?.lastName}`}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {userProfile?.firstName} {userProfile?.lastName}
              </h2>
              <p className="text-gray-500">Event Attendee</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-gray-500 mb-2">My Events</h3>
            <p className="text-2xl font-medium">0</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-gray-500 mb-2">Favorites</h3>
            <p className="text-2xl font-medium">0</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-gray-500 mb-2">Messages</h3>
            <p className="text-2xl font-medium">0</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendeeDashboard; 