import React from 'react';
import { Outlet } from 'react-router-dom';
import VendorHeader from './VendorHeader';

const VendorLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VendorLayout; 