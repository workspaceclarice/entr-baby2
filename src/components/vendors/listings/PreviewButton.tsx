import React from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface PreviewButtonProps {
  listingData: any;
  listingType: 'service' | 'venue';
}

const PreviewButton: React.FC<PreviewButtonProps> = ({ listingData, listingType }) => {
  const navigate = useNavigate();

  const handlePreview = () => {
    // Store form data in sessionStorage for preview
    sessionStorage.setItem('listingPreview', JSON.stringify(listingData));
    navigate(`/vendors/dashboard/listings/preview/${listingType}`);
  };

  return (
    <button
      onClick={handlePreview}
      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
    >
      <EyeIcon className="h-5 w-5 mr-2 text-gray-400" />
      Preview Listing
    </button>
  );
};

export default PreviewButton; 