import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const FavoritesPage: React.FC = () => {
  const { userProfile } = useAuth();

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Favorites</h1>
      <div className="bg-white rounded-xl shadow-sm">
        {/* Add your favorites content here */}
        <div className="p-6">
          <p className="text-gray-500">No favorites yet</p>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage; 