import { Vendor } from '../types/vendor';

export const fetchVendorById = async (id: string): Promise<Vendor> => {
  try {
    const response = await fetch(`/api/vendors/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch vendor');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching vendor:', error);
    throw error;
  }
};

export const fetchVendorReviews = async (vendorId: string) => {
  try {
    const response = await fetch(`/api/vendors/${vendorId}/reviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const checkVendorAvailability = async (
  vendorId: string,
  date: string
) => {
  try {
    const response = await fetch(
      `/api/vendors/${vendorId}/availability?date=${date}`
    );
    if (!response.ok) {
      throw new Error('Failed to check availability');
    }
    return response.json();
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
}; 