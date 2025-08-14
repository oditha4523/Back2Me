import React, { useEffect, useRef, useState } from 'react';

const GoogleMap = ({ height = '400px', width = '100%' }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current && !map && window.google) {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 6.9271, lng: 79.8612 }, // Colombo, Sri Lanka
        zoom: 10,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });
      setMap(mapInstance);

      // Add sample markers for found items
      const sampleLocations = [
        { lat: 6.9271, lng: 79.8612, title: "Lost Phone - iPhone 12" },
        { lat: 6.9020, lng: 79.8538, title: "Found Wallet - Black Leather" },
        { lat: 6.9147, lng: 79.9729, title: "Lost Keys - Honda Car Keys" },
      ];

      sampleLocations.forEach(location => {
        new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstance,
          title: location.title,
        });
      });
    }
  }, [map]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height: height, 
        width: width,
        borderRadius: '12px'
      }}
    />
  );
};

export default GoogleMap;