import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ReportItemModel = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [user, setUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('name', itemName);
      formData.append('category', category);
      formData.append('location', location);
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
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to submit report');
      }

      const data = await res.json();
      alert('Report submitted successfully!');
      // reset
      setCategory('');
      setItemName('');
      setLocation('');
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl space-y-6 animate-in opacity-0 scale-95 transition-all duration-300 ease-out"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <input
              type="text"
              name="location"
              placeholder="Found Location"
              value={location}               
              onChange={(e) => setLocation(e.target.value)} 
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              required
            />
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
                setLocation('');
                setDescription('');
                setImageFile(null);
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
