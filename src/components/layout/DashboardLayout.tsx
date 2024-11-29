import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default DashboardLayout; 