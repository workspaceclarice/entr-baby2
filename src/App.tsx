import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import { AuthProvider } from './contexts/AuthContext';
import DiscoveryPage from './pages/DiscoveryPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import HomePage from './pages/HomePage';
import UnifiedDashboard from './pages/dashboard/UnifiedDashboard';
import ServiceDetailsPage from './pages/services/ServiceDetailsPage';
import ServiceBookingPage from './pages/services/ServiceBookingPage';
import VendorLandingPage from './pages/vendors/VendorLandingPage';
import VendorSignIn from './pages/vendors/VendorSignIn';
import VendorSignUp from './pages/vendors/VendorSignUp';
import ListYourBusiness from './pages/vendors/ListYourBusiness';
import VendorOnboarding from './pages/vendors/onboarding/VendorOnboarding';
import VendorDashboard from './pages/vendors/dashboard/VendorDashboard';
import VendorFeatures from './pages/vendors/features/VendorFeatures';
import VendorPricing from './pages/vendors/pricing/VendorPricing';

const AppRoutes = () => {
  const location = useLocation();
  const isVendorDashboard = location.pathname.startsWith('/vendors/dashboard');

  return (
    <>
      {!isVendorDashboard && <Header />}
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<DiscoveryPage category="events" />} />
        <Route path="/services" element={<DiscoveryPage category="services" />} />
        <Route path="/venues" element={<DiscoveryPage category="venues" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/services/:id/book" element={<ServiceBookingPage />} />
        <Route path="/dashboard" element={<UnifiedDashboard />} />

        {/* Vendor Routes */}
        <Route path="/vendors/landing" element={<VendorLandingPage />} />
        <Route path="/vendors/signin" element={<VendorSignIn />} />
        <Route path="/vendors/signup" element={<VendorSignUp />} />
        <Route path="/vendors/list-business" element={<ListYourBusiness />} />
        <Route path="/vendors/onboarding/*" element={<VendorOnboarding />} />
        <Route path="/vendors/dashboard/*" element={<VendorDashboard />} />
        <Route path="/vendors/features" element={<VendorFeatures />} />
        <Route path="/vendors/pricing" element={<VendorPricing />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;