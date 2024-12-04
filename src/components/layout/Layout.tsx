import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import UserDashboardHeader from './UserDashboardHeader';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {currentUser ? <UserDashboardHeader /> : <Header />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 