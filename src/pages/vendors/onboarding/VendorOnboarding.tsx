import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VendorHeader from '../../../components/layout/VendorHeader';
import {
  BusinessType,
  BusinessDetails,
  BusinessLocation,
  BusinessVerification
} from './steps';

const VendorOnboarding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="max-w-5xl mx-auto px-4 pt-32 pb-16">
        <Routes>
          <Route path="/" element={<BusinessType />} />
          <Route path="/details" element={<BusinessDetails />} />
          <Route path="/location" element={<BusinessLocation />} />
          <Route path="/verification" element={<BusinessVerification />} />
        </Routes>
      </div>
    </div>
  );
};

export default VendorOnboarding; 