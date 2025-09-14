import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getUser } from '../utils/auth';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ReportItemModel = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [user, setUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, []);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to report an item.');
      navigate('/login');
      return;
    }

    if (!imageFile) {
      alert('Please upload an image of the item.');
      return;
    }

    if (!selectedLocation) {
      alert('Please select a location on the map.');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('name', itemName);
      formData.append('category', category);
      formData.append('location', `${selectedLocation.lat}, ${selectedLocation.lng}`);
      formData.append('description', description);

      const token = localStorage.getItem('token');

      const res = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      if (!res.ok) {
        let errMsg = 'Failed to submit report';
        try {
          const err = await res.json();
          errMsg = err.message || errMsg;
        } catch {
          // fallback to default
        }
        throw new Error(errMsg);
      }

      const data = await res.json();
      alert('Report submitted successfully!');
      // reset
      setCategory('');
      setItemName('');
      setSelectedLocation(null);
      setShowMap(false);
      setDescription('');
      setImageFile(null);
      setSubmitting(false);
      onClose();
      navigate('/');
    } catch (err) {
      setSubmitting(false);
      alert('Submission failed: ' + err.message);
    }
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const selectSearchResult = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setMapCenter([lat, lng]);
    setSelectedLocation({ lat, lng });
    setSearchResults([]);
    setSearchQuery(result.display_name);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl space-y-6 animate-in opacity-0 scale-95 transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto"
        style={{ animation: 'modalIn 0.3s ease-out forwards' }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Report Found Item</h2>

        {/* Image Upload */}
        <div>
          <label htmlFor="itemImage" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="itemImage"
            name="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])} 
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none"
            required
          />
        </div>

        {/* Hidden field */}
        <input type="hidden" name="reportType" value="found" />

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Item Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={itemName}                  
              onChange={(e) => setItemName(e.target.value)} 
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              required
            />
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              required
            >
              <option value="" >Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="accessories">Accessories</option>
              <option value="documents">Documents & Cards</option>
              <option value="clothing">Clothing & Wearables</option>
              <option value="others">Others</option>
            </select>
          </div>
          
          {/* Location Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Found Location *
            </label>
            
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={() => setShowMap(!showMap)}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer text-sm"
              >
                {selectedLocation ? 'Change Location' : 'Select Location'}
              </button>
              
              {selectedLocation && (
                <div className="text-sm text-gray-600">
                  Selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </div>
              )}
            </div>
            
            {/* Map Component - Only show when showMap is true */}
            {showMap && (
              <div className="mt-3 border border-gray-300 rounded-md overflow-hidden">
                {/* Search Bar */}
                <div className="p-3 bg-gray-50 border-b">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
                      placeholder="Search for a location..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={searchLocation}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Search
                    </button>
                  </div>
                  
                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="mt-2 max-h-32 overflow-y-auto bg-white border border-gray-200 rounded-md">
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          onClick={() => selectSearchResult(result)}
                          className="p-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                        >
                          {result.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="h-64">
                  <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    key={`${mapCenter[0]}-${mapCenter[1]}`}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationPicker onLocationSelect={(location) => {
                      setSelectedLocation(location);
                      setShowMap(false);
                      setSearchQuery('');
                      setSearchResults([]);
                    }} />
                    {selectedLocation && (
                      <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
                    )}
                  </MapContainer>
                </div>
              </div>
            )}
            
            {!selectedLocation && (
              <p className="text-sm text-red-600 mt-1">Please select a location on the map</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
             value={description}                 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
            required
          ></textarea>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              value={user?.name || ''}
              readOnly
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              required
            />
            <input
              type="email"
              name="email"
              value={user?.email || ''}
              readOnly
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              required
            />
          </div>
        </div>


        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-red-300 text-gray-800 font-semibold rounded-lg hover:bg-red-400 transition"
          >
            Close
          </button>
          <div className="flex gap-3 w-full sm:w-auto justify-end">
            <button
              type="reset"
              onClick={() => {
                setCategory('');
                setItemName('');
                setSelectedLocation(null);
                setShowMap(false);
                setDescription('');
                setImageFile(null);
                setSearchQuery('');
                setSearchResults([]);
                setMapCenter([51.505, -0.09]);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>

      {/* Animation */}
      <style jsx="true">{`
        @keyframes modalIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportItemModel;
