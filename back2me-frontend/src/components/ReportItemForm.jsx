import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReportItemForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Report submitted successfully!");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 relative">
      <div
        onClick={() => navigate('/report')}
        className="absolute inset-0 bg-white/60 backdrop-blur z-0"
      ></div>

      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg space-y-6 transform transition-all duration-300 ease-out scale-95 opacity-0 animate-in"
        style={{ animation: 'modalIn 0.3s ease-out forwards' }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Report Found Item</h2>

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
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            required
          />
        </div>

        {/* Hidden Field */}
        <input type="hidden" name="reportType" value="found" />

        <div>
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location Found
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Information
          </label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />
        </div>

        <div className="flex justify-between items-center pt-4">
          <button
            type="reset"
            className="px-4 py-2 bg-red-300 text-gray-800 font-semibold rounded-lg hover:bg-red-400 transition cursor-pointer"
            onClick={() => navigate('/report')}
          >
            Close
          </button>

          <div className="flex gap-4">
            <button
              type="reset"
              className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition cursor-pointer"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Animation Keyframes */}
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

export default ReportItemForm;
