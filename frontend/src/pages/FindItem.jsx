import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from '../components/navbar';
import { FaSearch } from "react-icons/fa";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map updates
const MapController = ({ center, zoom, selectedItem }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2) {
      console.log('Flying to:', center, 'zoom:', zoom); // Debug log
      map.flyTo(center, zoom, {
        duration: 1.5
      });
    }
  }, [map, center, zoom, selectedItem]);
  
  return null;
};

const FindItem = () => {
  const [foundItemCategory, setFoundItemCategory] = useState('');
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mapCenter, setMapCenter] = useState([14.5995, 120.9842]);
  const [mapZoom, setMapZoom] = useState(16);
  const [mapKey, setMapKey] = useState(0); // Add key to force map re-render

  // Fetch found items from database
  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        setLoading(true);
        // Try different possible backend URLs
        const possibleUrls = [
          'http://localhost:5000/api/items?status=found',
          'http://localhost:3001/api/items?status=found',
          'http://localhost:8000/api/items?status=found',
          '/api/items?status=found'
        ];
        
        let response;
        let lastError;
        
        for (const url of possibleUrls) {
          try {
            response = await fetch(url);
            if (response.ok) break;
          } catch (err) {
            lastError = err;
            continue;
          }
        }
        
        if (!response || !response.ok) {
          throw new Error('Backend server not available - using sample data');
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON format');
        }
        
        const data = await response.json();
        console.log('Fetched items:', data);
        setFoundItems(data);
      } catch (err) {
        console.error('Error fetching found items:', err);
        // Use sample data as fallback
        const sampleData = [
          {
            _id: '1',
            name: "iPhone 13",
            category: "electronics",
            location: "Library Building",
            coordinates: [14.5995, 120.9842],
            description: "Black iPhone 13 found near the main entrance"
          },
          {
            _id: '2',
            name: "Student ID",
            category: "documents", 
            location: "Cafeteria",
            coordinates: [14.6010, 120.9850],
            description: "Student ID card found under table 5"
          },
          {
            _id: '3',
            name: "Blue Backpack",
            category: "accessories",
            location: "Parking Lot A", 
            coordinates: [14.5980, 120.9860],
            description: "Blue Jansport backpack with math textbooks"
          }
        ];
        console.log('Setting sample data:', sampleData); // Debug log
        setFoundItems(sampleData);
        setError('Using sample data - backend not connected');
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, []);

  // Helper function to get coordinates from item
  const getItemCoordinates = (item) => {
    console.log('Getting coordinates for item:', item); // Debug log
    
    // Handle different coordinate formats
    if (item.coordinates && Array.isArray(item.coordinates) && item.coordinates.length === 2) {
      const coords = [parseFloat(item.coordinates[0]), parseFloat(item.coordinates[1])];
      console.log('Found coordinates:', coords); // Debug log
      return coords;
    }
    
    // Handle location as string "latitude, longitude"
    if (item.location && typeof item.location === 'string') {
      const locationParts = item.location.split(',').map(coord => coord.trim());
      if (locationParts.length === 2) {
        const lat = parseFloat(locationParts[0]);
        const lng = parseFloat(locationParts[1]);
        if (!isNaN(lat) && !isNaN(lng)) {
          const coords = [lat, lng];
          console.log('Found coordinates from location string:', coords); // Debug log
          return coords;
        }
      }
    }
    
    if (item.latitude && item.longitude) {
      return [parseFloat(item.latitude), parseFloat(item.longitude)];
    }
    
    if (item.location && item.location.coordinates && Array.isArray(item.location.coordinates)) {
      // GeoJSON format [longitude, latitude] -> [latitude, longitude]
      return [item.location.coordinates[1], item.location.coordinates[0]];
    }
    
    console.log('No valid coordinates found for item:', item.name); // Debug log
    return null;
  };

  // Filter items based on category
  const filteredItems = foundItemCategory 
    ? foundItems.filter(item => item.category === foundItemCategory)
    : foundItems;

  // Handle item selection
  const handleItemClick = (item) => {
    const coordinates = getItemCoordinates(item);
    console.log('Clicked item coordinates:', coordinates); // Debug log
    if (coordinates) {
      setSelectedItem(item);
      setMapCenter(coordinates);
      setMapZoom(18);
      setMapKey(prev => prev + 1); // Force map update
    }
  };

  return (
    <>
      <Navbar />

      <div className="w-full h-[calc(100vh-64px)] p-4">
        <div className="grid grid-cols-3 gap-4 h-full">

          <div className="col-span-1 grid grid-rows-3 gap-4 h-full">
            <div className="row-span-1 bg-white rounded-3xl p-4 flex flex-col gap-4 border border-gray-200">
              <h2 className="text-xl font-semibold">Search Found Items</h2>
              <div className="relative">
                <input
                  type="search"
                  id="search-box"
                  name="searchItem"
                  placeholder="Search by name, location..."
                  className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
              </div>
              <select
                name="foundItemCategory"
                value={foundItemCategory}
                onChange={(e) => setFoundItemCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-700 focus:border-green-700 text-sm "
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="accessories">Accessories</option>
                <option value="documents">Documents & Cards</option>
                <option value="clothing">Clothing & Wearables</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="row-span-2 bg-white rounded-3xl p-4 overflow-auto border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Found Items</h2>
              {loading ? (
                <p className="text-gray-500">Loading found items...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : filteredItems.length > 0 ? (
                <div className="space-y-2">
                  {filteredItems.map(item => (
                    <div 
                      key={item._id} 
                      className={`p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedItem?._id === item._id ? 'bg-blue-50 border-blue-300' : ''
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.location}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No found items to display.</p>
              )}
            </div>
          </div>

          <div className="col-span-2 grid grid-rows-9 h-full border border-gray-200 rounded-3xl">
            <div className="row-span-1 p-4 flex items-center">
              <h2 className="text-xl font-semibold">Found Items Map</h2>
            </div>
            <div className="row-span-8 p-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Loading map...</p>
                </div>
              ) : (
                <MapContainer
                  key={mapKey}
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
                >
                  <MapController center={mapCenter} zoom={mapZoom} selectedItem={selectedItem} />
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredItems.map(item => {
                    const coordinates = getItemCoordinates(item);
                    console.log(`Item ${item.name} coordinates:`, coordinates); // Debug log
                    return coordinates ? (
                      <Marker key={item._id} position={coordinates}>
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.location}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                            <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              {item.category}
                            </span>
                          </div>
                        </Popup>
                      </Marker>
                    ) : null;
                  })}
                </MapContainer>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default FindItem;
