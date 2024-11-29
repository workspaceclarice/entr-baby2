import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import DiscoveryPage from './pages/DiscoveryPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import VendorLoginPage from './pages/auth/VendorLoginPage';
import VendorSignupPage from './pages/auth/VendorSignupPage';
import ServiceDetailsPage from './pages/services/ServiceDetailsPage';
import ServiceBookingPage from './pages/services/ServiceBookingPage';
import VendorProfilePage from './pages/vendors/VendorProfilePage';
import RSVPEventPage from './pages/events/RSVPEventPage';
import TicketedEventPage from './pages/events/TicketedEventPage';
import VenueDetailsPage from './pages/venues/VenueDetailsPage';
import HomePage from './pages/HomePage';
import VendorLandingPage from './pages/vendors/VendorLandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UnifiedDashboard from './pages/dashboard/UnifiedDashboard';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './config/firebase';
import VendorSignIn from './pages/vendors/VendorSignIn';
import ListYourBusiness from './pages/vendors/ListYourBusiness';
import VendorOnboarding from './pages/vendors/onboarding/VendorOnboarding';
import VendorSignUp from './pages/vendors/VendorSignUp';
import VendorDashboard from './pages/vendors/dashboard/VendorDashboard';
import VendorFeatures from './pages/vendors/features/VendorFeatures';
import VendorPricing from './pages/vendors/pricing/VendorPricing';
import DashboardLayout from './components/layout/DashboardLayout';
import VendorLayout from './components/layout/VendorLayout';
import MyEventsPage from './pages/dashboard/MyEventsPage';
import FavoritesPage from './pages/dashboard/FavoritesPage';
import MessagesPage from './pages/dashboard/MessagesPage';

const AppContent = () => {
  const location = useLocation();
  
  // Don't show the main header on vendor dashboard pages
  const isVendorDashboard = location.pathname.startsWith('/vendors/dashboard');

  return (
    <>
      {!isVendorDashboard && <Header />}
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* Events Routes */}
        <Route path="/events" element={<DiscoveryPage category="events" />} />
        <Route path="/events/rsvp/:id" element={<RSVPEventPage />} />
        <Route path="/events/ticketed/:id" element={<TicketedEventPage />} />

        {/* Services Routes */}
        <Route path="/services" element={<DiscoveryPage category="services" />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/services/:id/book" element={<ServiceBookingPage />} />

        {/* Venues Routes */}
        <Route path="/venues" element={<DiscoveryPage category="venues" />} />
        <Route path="/venues/:id" element={<VenueDetailsPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/vendor/login" element={<VendorLoginPage />} />
        <Route path="/vendor/signup" element={<VendorSignupPage />} />

        {/* Vendor Routes */}
        <Route path="/vendors" element={<VendorLandingPage />} />
        <Route path="/vendors/signin" element={<VendorSignIn />} />
        <Route path="/vendors/signup" element={<VendorSignUp />} />
        <Route path="/vendors/list-business" element={<ListYourBusiness />} />
        <Route path="/vendors/onboarding/*" element={<VendorOnboarding />} />
        <Route path="/vendors/dashboard/*" element={<VendorDashboard />} />
        <Route path="/vendors/:id" element={<VendorProfilePage />} />
        <Route path="/vendor/login" element={<VendorLoginPage />} />
        <Route path="/vendor/signup" element={<VendorSignupPage />} />
        <Route path="/vendors/features" element={<VendorFeatures />} />
        <Route path="/vendors/pricing" element={<VendorPricing />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route index element={<UnifiedDashboard />} />
                  <Route path="events" element={<MyEventsPage />} />
                  <Route path="favorites" element={<FavoritesPage />} />
                  <Route path="messages" element={<MessagesPage />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Vendor Routes */}
        <Route path="/vendor" element={<VendorLayout />}>
          {/* ... your vendor routes ... */}
        </Route>
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;