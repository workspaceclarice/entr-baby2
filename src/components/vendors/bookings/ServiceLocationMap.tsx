import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface Coordinates {
  lat: number;
  lng: number;
}

interface ServiceLocationMapProps {
  vendorLocation: Coordinates;
  destinationLocation: Coordinates;
}

const ServiceLocationMap: React.FC<ServiceLocationMapProps> = ({
  vendorLocation,
  destinationLocation
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAD2oe_5RikSO2Vj8x4nfy5esTMfT0tp2Q",
    libraries: ["places"]
  });

  const [directions, setDirections] = React.useState<google.maps.DirectionsResult | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '300px'
  };

  const center = {
    lat: (vendorLocation.lat + destinationLocation.lat) / 2,
    lng: (vendorLocation.lng + destinationLocation.lng) / 2
  };

  const directionsCallback = React.useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === 'OK' && result) {
        setDirections(result);
      }
    },
    []
  );

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Error loading map</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* Vendor Marker */}
      <Marker
        position={vendorLocation}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#3B82F6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }}
      />

      {/* Destination Marker */}
      <Marker
        position={destinationLocation}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }}
      />

      {/* Directions Service */}
      <DirectionsService
        options={{
          destination: destinationLocation,
          origin: vendorLocation,
          travelMode: google.maps.TravelMode.DRIVING
        }}
        callback={directionsCallback}
      />

      {/* Directions Renderer */}
      {directions && (
        <DirectionsRenderer
          options={{
            directions: directions,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#3B82F6',
              strokeWeight: 4
            }
          }}
        />
      )}
    </GoogleMap>
  );
};

export default ServiceLocationMap; 