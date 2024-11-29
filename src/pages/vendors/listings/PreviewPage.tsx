import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import ListingPreview from '../../../components/vendors/listings/ListingPreview';
import { PreviewData } from '../../../types/preview';

const PreviewPage: React.FC = () => {
  const { type } = useParams<{ type: 'service' | 'venue' }>();
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('listingPreview');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData) as PreviewData;
        setPreviewData(parsedData);
      } catch (error) {
        console.error('Failed to parse preview data:', error);
        navigate('/vendors/dashboard');
      }
    } else {
      navigate('/vendors/dashboard');
    }
  }, [navigate]);

  if (!previewData || !type) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link to="/vendors/dashboard" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5" />
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              <Link
                to="/vendors/dashboard/listings"
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Listings
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              <span className="ml-4 text-sm font-medium text-gray-700">
                Preview
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Preview Content */}
      <div className="max-w-4xl mx-auto">
        <ListingPreview
          type={type}
          data={previewData}
          images={[]} // Images will need to be handled separately
        />

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Edit
          </button>
          <button
            onClick={() => {
              // Handle publish logic here
              navigate('/vendors/dashboard/listings');
            }}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage; 