import React from 'react';
import { Outlet } from 'react-router-dom';
import VendorSignedInHeader from '../components/vendors/navigation/VendorSignedInHeader';

const VendorDashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorSignedInHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default VendorDashboardLayout; 