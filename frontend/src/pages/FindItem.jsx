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

  // Function to convert coordinates to location name
  const getLocationName = (item) => {
    const coordinates = getItemCoordinates(item);
    if (!coordinates) return item.location || 'Unknown Location';
    
    // If location is already a readable name (not coordinates), return it
    if (item.location && typeof item.location === 'string' && !item.location.includes(',')) {
      return item.location;
    }
    
    // Map coordinates to location names (you can expand this based on your campus/area)
    const locationMap = {
      '7.1190247, 79.9159876': 'Main Campus Building',
      '7.1195, 79.9165': 'Library',
      '7.1185, 79.9155': 'Cafeteria',
      '7.1200, 79.9170': 'Parking Lot A',
      '14.5995, 120.9842': 'Manila Campus - Main Building',
      '14.6010, 120.9850': 'Manila Campus - Cafeteria',
      '14.5980, 120.9860': 'Manila Campus - Parking'
    };
    
    // Try to match exact coordinates
    const coordString = `${coordinates[0]}, ${coordinates[1]}`;
    if (locationMap[coordString]) {
      return locationMap[coordString];
    }
    
    // If no exact match, return a generic location based on coordinates
    return `Location (${coordinates[0].toFixed(4)}, ${coordinates[1].toFixed(4)})`;
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
            <div className="row-span-2 bg-white rounded-3xl p-4 overflow-auto border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Found Items</h2>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-gray-500">Loading found items...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center p-8">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              ) : filteredItems.length > 0 ? (
                <div className="space-y-3">
                  {filteredItems.map(item => (
                    <div 
                      key={item._id} 
                      className={`group p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedItem?._id === item._id 
                          ? 'bg-blue-50 border-blue-300 shadow-md' 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex gap-4">
                        {/* Item Image */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            {item.imageUrl ? (
                              <img
                                src={`http://localhost:5000${item.imageUrl}`}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg border-2 border-gray-100 shadow-sm"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-gray-100 flex items-center justify-center text-gray-400 text-xs font-medium shadow-sm"
                              style={{ display: item.imageUrl ? 'none' : 'flex' }}
                            >
                              📷
                            </div>
                          </div>
                        </div>
                        
                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-600">📍</span>
                            <p className="text-sm text-gray-600 truncate">{getLocationName(item)}</p>
                          </div>
                          <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {item.category && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {item.category}
                              </span>
                            )}
                            {item.reporter && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                👤 {item.reporter.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <p className="text-gray-500 text-lg font-medium mb-2">No items found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                </div>
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
                        <Popup maxWidth={320} minWidth={280} className="custom-popup">
                          <div className="bg-white rounded-lg overflow-hidden">
                            {/* Popup Image */}
                            {item.imageUrl && (
                              <div className="relative">
                                <img
                                  src={`http://localhost:5000${item.imageUrl}`}
                                  alt={item.name}
                                  className="w-full h-40 object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                              </div>
                            )}
                            
                            {/* Popup Content */}
                            <div className="p-4 tracking-normal">
                              <h3 className="font-bold text-lg mb-1 text-gray-900 tracking-tight">{item.name}</h3>
                              
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-blue-500">📍</span>
                                <p className="text-sm text-gray-600 font-medium tracking-normal">{getLocationName(item)}</p>
                              </div>
                              
                              <p className="text-sm text-gray-700 mb-4 leading-relaxed tracking-normal">
                                {item.description}
                              </p>
                              
                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {item.category && (
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 tracking-normal">
                                    {item.category}
                                  </span>
                                )}
                                {item.reporter && (
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 tracking-normal">
                                    👤 {item.reporter.name}
                                  </span>
                                )}
                              </div>
                              
                              {/* Date */}
                              {item.createdAt && (
                                <div className="pt-3 border-t border-gray-100">
                                  <p className="text-xs text-gray-500 flex items-center gap-1 tracking-normal">
                                    🕒 Found on {new Date(item.createdAt).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </p>
                                </div>
                              )}
                            </div>
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
