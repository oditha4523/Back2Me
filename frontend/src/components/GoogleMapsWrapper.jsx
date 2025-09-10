import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import GoogleMap from './GoogleMap';

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading Google Maps...</p>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="flex items-center justify-center h-full text-red-500">
          <div className="text-center">
            <div className="text-4xl mb-2">⚠️</div>
            <p>Error loading Google Maps</p>
            <p className="text-sm text-gray-500 mt-1">Check API key and console for details</p>
          </div>
        </div>
      );
    case Status.SUCCESS:
      return <GoogleMap height="100%" width="100%" />;
    default:
      return null;
  }
};

const GoogleMapsWrapper = () => {
  // Replace with your actual Google Maps API key
  const apiKey = "AIzaSyDysUhC_Py8O1CaO88M73Y0CzZtlqSKFOo";

  if (!apiKey || apiKey === "AIzaSyDysUhC_Py8O1CaO88M73Y0CzZtlqSKFOo") {
    return (
      <div className="flex items-center justify-center h-full text-orange-500">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p>Google Maps API key needed</p>
          <p className="text-sm text-gray-500 mt-1">Add your API key to enable the map</p>
        </div>
      </div>
    );
  }

  return (
    <Wrapper apiKey={apiKey} render={render} />
  );
};

export default GoogleMapsWrapper;