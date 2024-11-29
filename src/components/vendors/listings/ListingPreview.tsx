import React from 'react';
import { PreviewData, VenuePreviewData } from '../../../types/preview';

interface ListingPreviewProps {
  type: 'service' | 'venue';
  data: PreviewData;
  images: File[];
}

const ListingPreview: React.FC<ListingPreviewProps> = ({ type, data, images }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);

  React.useEffect(() => {
    const urls = images.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
    if (urls.length > 0) {
      setSelectedImage(urls[0]);
    }

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const isVenueData = (data: PreviewData): data is VenuePreviewData => {
    return data.type === 'venue';
  };

  const getPriceDisplay = () => {
    return data.price?.amount ? `$${data.price.amount}/${data.price.unit}` : 'Price not set';
  };

  const getLocationDisplay = () => {
    if (typeof data.location === 'string') {
      return data.location;
    }
    return `${data.location.address}, ${data.location.city}, ${data.location.state}`;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">No images uploaded</p>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {imageUrls.length > 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2 bg-black/50 rounded-lg p-2">
              {imageUrls.map((url, index) => (
                <button
                  key={url}
                  onClick={() => setSelectedImage(url)}
                  className={`w-12 h-12 rounded-md overflow-hidden ${
                    selectedImage === url ? 'ring-2 ring-white' : ''
                  }`}
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Listing Details */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {data.title || 'Untitled Listing'}
        </h3>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {type === 'service' ? 'Service' : 'Venue'}
          </span>
          {data.category && (
            <>
              <span className="mx-2">•</span>
              <span>{data.category}</span>
            </>
          )}
        </div>

        {data.description && (
          <p className="mt-4 text-gray-600">{data.description}</p>
        )}

        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Starting at</p>
              <p className="text-2xl font-semibold text-gray-900">
                {getPriceDisplay()}
              </p>
            </div>

            {isVenueData(data) && data.capacity && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="text-lg font-medium text-gray-900">
                  {data.capacity.min}-{data.capacity.max} guests
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Venue-specific details */}
        {isVenueData(data) && data.amenities && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900">Amenities</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {[...data.amenities.basic, ...data.amenities.premium].map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Location */}
        {data.location && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900">Location</h4>
            <p className="mt-2 text-sm text-gray-500">
              {getLocationDisplay()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingPreview; 