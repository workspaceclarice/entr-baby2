import React from 'react';
import { Outlet } from 'react-router-dom';
import VendorDashboardHeader from '../components/vendors/common/VendorDashboardHeader';

const VendorDashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorDashboardHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default VendorDashboardLayout; 