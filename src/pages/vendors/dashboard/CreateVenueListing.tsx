import React from 'react';
import { useNavigate } from 'react-router-dom';
import VenueListingForm from '../../../components/vendors/listings/CreateVenueListing';

const CreateVenueListing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      <VenueListingForm 
        onClose={() => navigate('/vendors/dashboard/listings')}
        onSuccess={() => {
          // Handle success (e.g., show notification)
          navigate('/vendors/dashboard/listings');
        }}
      />
    </div>
  );
};

export default CreateVenueListing; 