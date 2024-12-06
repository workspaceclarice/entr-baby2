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
import EventDetailPage from './pages/events/EventDetailPage';
import VendorDashboardHome from './pages/vendors/dashboard/VendorDashboardHome';
import VendorBookings from './pages/vendors/dashboard/VendorBookings';
import VendorListings from './pages/vendors/dashboard/VendorListings';
import VendorEarnings from './pages/vendors/dashboard/VendorEarnings';
import CreateServiceListing from './pages/vendors/dashboard/CreateServiceListing';
import CreateVenueListing from './pages/vendors/dashboard/CreateVenueListing';
import BookingRequestDetail from './pages/vendors/dashboard/BookingRequestDetail';
import ConfirmedBooking from './pages/vendors/dashboard/ConfirmedBooking';
import VendorMessengerHub from './pages/vendors/dashboard/VendorMessengerHub';
import VendorNotificationsHub from './pages/vendors/dashboard/VendorNotificationsHub';
import VendorSettings from './pages/vendors/dashboard/VendorSettings';
import VendorCalendar from './pages/vendors/dashboard/VendorCalendar';
import VendorProfileEditor from './pages/vendors/dashboard/VendorProfileEditor';
import VendorProfilePreview from './pages/vendors/dashboard/VendorProfilePreview';
import CompletedBooking from './pages/vendors/dashboard/CompletedBooking';
import VenueDetailsPage from './pages/venues/VenueDetailsPage';
import { useScrollToTop } from './hooks/useScrollToTop';

const AppRoutes = () => {
  const location = useLocation();
  const isVendorDashboard = location.pathname.startsWith('/vendors/dashboard');
  const isVendorLanding = location.pathname === '/vendors/landing';

  return (
    <>
      {!isVendorDashboard && !isVendorLanding && <Header />}
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<DiscoveryPage category="events" />} />
        <Route path="/services" element={<DiscoveryPage category="services" />} />
        <Route path="/venues" element={<DiscoveryPage category="venues" />} />
        <Route path="/venues/:id" element={<VenueDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/services/:id/book" element={<ServiceBookingPage />} />
        <Route path="/dashboard" element={<UnifiedDashboard />} />
        <Route path="/events/:id" element={<EventDetailPage />} />

        {/* Vendor Routes */}
        <Route path="/vendors/landing" element={<VendorLandingPage />} />
        <Route path="/vendors/signin" element={<VendorSignIn />} />
        <Route path="/vendors/signup" element={<VendorSignUp />} />
        <Route path="/vendors/list-business" element={<ListYourBusiness />} />
        <Route path="/vendors/onboarding/*" element={<VendorOnboarding />} />
        <Route path="/vendors/dashboard/*" element={<VendorDashboard />}>
          <Route index element={<VendorDashboardHome />} />
          <Route path="bookings" element={<VendorBookings />} />
          <Route path="bookings/:requestId" element={<BookingRequestDetail />} />
          <Route path="bookings/:bookingId/details" element={<ConfirmedBooking />} />
          <Route path="listings" element={<VendorListings />} />
          <Route path="listings/create-service" element={<CreateServiceListing />} />
          <Route path="listings/create-venue" element={<CreateVenueListing />} />
          <Route path="earnings" element={<VendorEarnings />} />
          <Route path="messenger" element={<VendorMessengerHub />} />
          <Route path="notifications" element={<VendorNotificationsHub />} />
          <Route path="settings" element={<VendorSettings />} />
          <Route path="calendar" element={<VendorCalendar />} />
          <Route path="profile" element={<VendorProfileEditor />} />
          <Route path="profile/preview" element={<VendorProfilePreview />} />
          <Route path="bookings/:bookingId/completed" element={<CompletedBooking />} />
        </Route>
        <Route path="/vendors/features" element={<VendorFeatures />} />
        <Route path="/vendors/pricing" element={<VendorPricing />} />
      </Routes>
    </>
  );
};

const App = () => {
  useScrollToTop();
  
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;