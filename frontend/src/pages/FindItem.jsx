import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

// Controller for handling flyTo on item click
const MapController = ({ center, zoom, selectedItem }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedItem && center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, selectedItem, map]);

  return null;
};

// Controller for fitting all markers on first load
const FitBoundsController = ({ items, selectedItem, resetView }) => {
  const map = useMap();

  useEffect(() => {
    if (items.length > 0 && !selectedItem) {
      const bounds = L.latLngBounds(
        items
          .map(item => {
            if (
              item.coordinates &&
              Array.isArray(item.coordinates) &&
              item.coordinates.length === 2
            ) {
              return [item.coordinates[0], item.coordinates[1]];
            }
            return null;
          })
          .filter(Boolean)
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [items, selectedItem, resetView, map]);

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
  const [mapKey, setMapKey] = useState(0); // Key to force map re-render
  const [resetView, setResetView] = useState(false);
  // Track last reset to force effect
  const [lastReset, setLastReset] = useState(Date.now());
  const [claimingItem, setClaimingItem] = useState(null);

  const navigate = useNavigate();

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
            coordinates: [7.1190, 79.9160],
            description: "Black iPhone 13 found near the main entrance"
          },
          {
            _id: '2',
            name: "Student ID",
            category: "documents",
            location: "Cafeteria",
            coordinates: [7.1195, 79.9165],
            description: "Student ID card found under table 5"
          },
          {
            _id: '3',
            name: "Blue Backpack",
            category: "accessories",
            location: "Parking Lot A",
            coordinates: [7.1185, 79.9155],
            description: "Blue Jansport backpack with math textbooks"
          }
        ];
        console.log('Setting sample data:', sampleData);
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
    if (coordinates) {
      setSelectedItem(item);
      setMapCenter(coordinates);
      setMapZoom(18);
      setMapKey(prev => prev + 1); // Force map update
    }
  };

  // Handle reset view
  const handleResetView = () => {
    setSelectedItem(null);
    setResetView(prev => !prev);
    setLastReset(Date.now()); // update lastReset to force FitBoundsController effect
    setMapKey(prev => prev + 1); // force MapContainer re-render
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar className="relative z-50" />

        <main className="flex-grow p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">

            <div className="col-span-1 flex flex-col gap-6 w-full">
              <div className="bg-white rounded-2xl p-4 shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Search Found Items</h2>
                <div className="relative mb-3">
                  <input
                    type="search"
                    id="search-box"
                    name="searchItem"
                    placeholder="Search by category..."
                    className="w-full border border-gray-300 rounded-lg p-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <select
                  name="foundItemCategory"
                  value={foundItemCategory}
                  onChange={(e) => setFoundItemCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="accessories">Accessories</option>
                  <option value="documents">Documents & Cards</option>
                  <option value="clothing">Clothing & Wearables</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="flex-1 max-h-[391px] overflow-y-auto pr-2 scrollable">
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
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredItems.map((item, index) => (
                      <li
                        key={item._id}
                        onClick={() => handleItemClick(item)}
                        className={`flex flex-col cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition bg-white relative animate-fadeUp`}
                        style={{ animationDelay: `${index * 0.05}s` }} // stagger animation for each card
                      >
                        {/* Image with location overlay */}
                        <div className="relative w-full h-36">
                          {item.imageUrl ? (
                            <img
                              src={`http://localhost:5000${item.imageUrl}`}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">📷</div>
                          )}
                          {/* Location overlay */}
                          <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-xs px-2 py-1 truncate">
                            📍 {getLocationName(item)}
                          </div>
                        </div>

                        {/* Name */}
                        <div className="p-3 text-center">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h3>
                        </div>
                      </li>
                    ))}
                  </ul>

                ) : (
                  <div className="text-center p-12">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <p className="text-gray-500 text-lg font-medium mb-2">No items found</p>
                    <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>

              <style jsx="true">{`
                @keyframes fadeUp {
                  0% {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                .animate-fadeUp {
                  animation: fadeUp 0.4s ease-out forwards;
                }
              `}</style>

            </div>

            <div className="col-span-1 lg:col-span-2 flex flex-col bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-400">
                <h2 className="text-lg font-semibold text-gray-800">Map View</h2>
                <button
                  onClick={handleResetView}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-lg shadow-sm transition"
                >
                  🔄 Reset View
                </button>
              </div>
              <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[510px]">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className="text-gray-500">Loading map...</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full">
                    <MapContainer
                      key={mapKey}
                      center={[7.8731, 80.7718]}
                      zoom={7}
                      style={{ height: '100%', width: '100%' }}
                      className="w-full h-full rounded-b-2xl z-0"
                    >
                      <MapController center={mapCenter} zoom={mapZoom} selectedItem={selectedItem} />
                      <FitBoundsController items={filteredItems} selectedItem={selectedItem} resetView={resetView} lastReset={lastReset} />
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      {selectedItem
                        ? (() => {
                          const coordinates = getItemCoordinates(selectedItem);
                          return coordinates ? (
                            <Marker key={selectedItem._id} position={coordinates}>
                              <Popup maxWidth={340} minWidth={260} className="!p-0 !bg-transparent">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden w-full transform transition duration-300 ease-out hover:scale-105 animate-popupFadeIn">
                                  {/* Image */}
                                  {selectedItem.imageUrl ? (
                                    <div className="relative w-full h-44">
                                      <img
                                        src={`http://localhost:5000${selectedItem.imageUrl}`}
                                        alt={selectedItem.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    </div>
                                  ) : (
                                    <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-2xl">
                                      📷
                                    </div>
                                  )}

                                  {/* Content */}
                                  <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-bold text-gray-900 truncate">{selectedItem.name}</h3>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm truncate">
                                      <span className="text-blue-500">📍</span>
                                      <p>{getLocationName(selectedItem)}</p>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{selectedItem.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedItem.category && (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                          {selectedItem.category}
                                        </span>
                                      )}
                                      {selectedItem.reporter && (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                          👤 {selectedItem.reporter.name}
                                        </span>
                                      )}
                                    </div>
                                    {selectedItem.createdAt && (
                                      <div className="pt-2 border-t border-gray-100">
                                        <p className="text-gray-500 text-xs flex items-center gap-1">
                                          🕒 Found on {new Date(selectedItem.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                          })}
                                        </p>
                                      </div>
                                    )}
                                    <button
                                      onClick={() => navigate('/claimItem', { state: { item: selectedItem } })}
                                      className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md cursor-pointer w-full text-center font-semibold shadow transition"
                                    >
                                      Claim item
                                    </button>
                                  </div>
                                </div>
                              </Popup>
                            </Marker>
                          ) : null;
                        })()
                        : filteredItems.map(item => {
                          const coordinates = getItemCoordinates(item);
                          return coordinates ? (
                            <Marker key={item._id} position={coordinates}>
                              <Popup maxWidth={340} minWidth={260} className="!p-0 !bg-transparent">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden w-full transform transition duration-300 ease-out hover:scale-105 animate-popupFadeIn">
                                  {/* Image */}
                                  {item.imageUrl ? (
                                    <div className="relative w-full h-44">
                                      <img
                                        src={`http://localhost:5000${item.imageUrl}`}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    </div>
                                  ) : (
                                    <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-2xl">
                                      📷
                                    </div>
                                  )}

                                  {/* Content */}
                                  <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-bold text-gray-900 truncate">{item.name}</h3>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm truncate">
                                      <span className="text-blue-500">📍</span>
                                      <p>{getLocationName(item)}</p>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                      {item.category && (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                          {item.category}
                                        </span>
                                      )}
                                      {item.reporter && (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                          👤 {item.reporter.name}
                                        </span>
                                      )}
                                    </div>
                                    {item.createdAt && (
                                      <div className="pt-2 border-t border-gray-100">
                                        <p className="text-gray-500 text-xs flex items-center gap-1">
                                          🕒 Found on {new Date(item.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                          })}
                                        </p>
                                      </div>
                                    )}
                                    <button
                                      onClick={() => navigate('/claimItem', { state: { item } })}
                                      className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md cursor-pointer w-full text-center font-semibold shadow transition"
                                    >
                                      Claim item
                                    </button>
                                  </div>
                                </div>
                              </Popup>
                            </Marker>
                          ) : null;
                        })}

                    </MapContainer>
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default FindItem;
