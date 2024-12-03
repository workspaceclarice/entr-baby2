import React from 'react';
import { Outlet } from 'react-router-dom';
import VendorDashboardHeader from '../../../components/vendors/common/VendorDashboardHeader';

const VendorDashboard: React.FC = () => {
  return (
    <div>
      <VendorDashboardHeader />
      <Outlet />
    </div>
  );
};

export default VendorDashboard; 