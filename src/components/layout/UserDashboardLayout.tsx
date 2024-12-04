import React from 'react';
import UserDashboardHeader from './UserDashboardHeader';
import Footer from './Footer';

interface UserDashboardLayoutProps {
  children: React.ReactNode;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserDashboardHeader />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardLayout; 