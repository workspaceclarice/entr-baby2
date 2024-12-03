import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceListingForm from '../../../components/vendors/listings/CreateServiceListing';

const CreateServiceListing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      <ServiceListingForm 
        onClose={() => navigate('/vendors/dashboard/listings')}
        onSuccess={() => {
          // Handle success (e.g., show notification)
          navigate('/vendors/dashboard/listings');
        }}
      />
    </div>
  );
};

export default CreateServiceListing; 