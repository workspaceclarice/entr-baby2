import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VenueListingForm from '../../../components/vendors/listings/CreateVenueListing';

interface LocationState {
  isEditing: boolean;
  listingId: string;
}

const CreateVenueListing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [existingListing, setExistingListing] = useState(null);
  const { isEditing, listingId } = (location.state as LocationState) || {};

  useEffect(() => {
    if (isEditing && listingId) {
      const storedListing = localStorage.getItem('editListing');
      if (storedListing) {
        const listing = JSON.parse(storedListing);
        setExistingListing(listing);
      }
    }
  }, [isEditing, listingId]);

  return (
    <div className="py-8">
      <VenueListingForm 
        onClose={() => navigate('/vendors/dashboard/listings')}
        onSuccess={() => {
          localStorage.removeItem('editListing');
          navigate('/vendors/dashboard/listings');
        }}
        existingListing={existingListing}
        isEditing={isEditing}
      />
    </div>
  );
};

export default CreateVenueListing; 