import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportItemModel = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Report submitted successfully!');
    navigate('/');
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
            type="file"
            id="itemImage"
            name="itemImage"
            accept="image/*"
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
              placeholder="Full Name"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
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
              className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Submit
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
