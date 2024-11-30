import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface EventLocationMapProps {
  location: {
    lat: number;
    lng: number;
  };
  name: string;
}

const EventLocationMap: React.FC<EventLocationMapProps> = ({ location, name }) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
    borderRadius: '0.75rem'
  };

  const defaultOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6B7280' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#E5E7EB' }]
      }
    ]
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={location}
        options={defaultOptions}
      >
        <Marker
          position={location}
          title={name}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default EventLocationMap; 