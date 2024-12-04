import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ServiceListingForm from '../../../components/vendors/listings/CreateServiceListing';

interface LocationState {
  isEditing: boolean;
  listingId: string;
}

const CreateServiceListing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [existingListing, setExistingListing] = useState(null);
  const { isEditing, listingId } = (location.state as LocationState) || {};

  useEffect(() => {
    if (isEditing && listingId) {
      // Get the stored listing data
      const storedListing = localStorage.getItem('editListing');
      if (storedListing) {
        const listing = JSON.parse(storedListing);
        setExistingListing(listing);
      }
    }
  }, [isEditing, listingId]);

  return (
    <div className="py-8">
      <ServiceListingForm 
        onClose={() => navigate('/vendors/dashboard/listings')}
        onSuccess={() => {
          // Clear stored listing data after successful edit
          localStorage.removeItem('editListing');
          navigate('/vendors/dashboard/listings');
        }}
        existingListing={existingListing}
        isEditing={isEditing}
      />
    </div>
  );
};

export default CreateServiceListing; 