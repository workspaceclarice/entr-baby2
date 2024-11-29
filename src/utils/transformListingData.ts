import { ServiceFormData, VenueFormData } from '../types/vendor';
import { PreviewData, ServicePreviewData, VenuePreviewData } from '../types/preview';

export const transformToPreviewData = (
  formData: ServiceFormData | VenueFormData,
  type: 'service' | 'venue'
): PreviewData => {
  if (type === 'service') {
    const serviceData = formData as ServiceFormData;
    return {
      type: 'service',
      title: serviceData.title,
      category: serviceData.category,
      description: serviceData.description,
      price: {
        amount: serviceData.price.amount,
        unit: serviceData.price.unit,
      },
      location: serviceData.location,
    } as ServicePreviewData;
  }

  // Venue data
  const venueData = formData as VenueFormData;
  const previewData: VenuePreviewData = {
    type: 'venue',
    title: venueData.title,
    category: venueData.category,
    description: venueData.description,
    price: {
      amount: venueData.price.amount,
      unit: venueData.price.unit,
    },
    location: venueData.location,
    capacity: {
      min: venueData.capacity.min,
      max: venueData.capacity.max,
      optimal: venueData.capacity.optimal,
    },
    amenities: {
      basic: venueData.amenities.basic || [],
      premium: venueData.amenities.premium || [],
    },
  };

  return previewData;
};

// Type guard to check if form data is venue data
export const isVenueFormData = (
  formData: ServiceFormData | VenueFormData
): formData is VenueFormData => {
  return 'capacity' in formData && 'amenities' in formData;
}; 