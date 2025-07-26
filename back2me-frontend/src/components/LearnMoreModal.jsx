import React from 'react';
import searchImage from '../assets/images/Search item.jpg';
import uploadImage from '../assets/images/Upload item.png';
import giveImage from '../assets/images/Safe return.jpg';

const LearnMoreModal = ({ open, onClose }) => {
  if (!open) return null; // 

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-white/60 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl h-[65vh] text-center relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modalIn 0.3s ease-out forwards' }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">
            How Back2Me Works
          </h2>
        </div>
        
        {/* Back2Me Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">
            {/* Step 1 */}
            <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Report the Item</h3>
              <img src={uploadImage} alt="Upload Item" className="w-30 h-30 mx-auto mb-4" />
              <p className="text-gray-600 text-sm">Upload photos and details about the found item.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Update the Map</h3>
              <img src={searchImage} alt="Search Item" className="w-30 h-30 mx-auto mb-4" />
              <p className="text-gray-600 text-sm">Reported items appear on the map for others to find nearby</p>
            </div>
            {/* Step 3 */}
            <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Safe Reunion</h3>
              <img src={giveImage} alt="Safe Return" className="w-30 h-30 mx-auto mb-4" />
              <p className="text-gray-600 text-sm">We facilitate a secure meetup to return the item.</p>
            </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            className="bg-white cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-1.5 w-24 rounded-lg transition text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#34dd8b] cursor-pointer hover:bg-[#25be79] text-white font-semibold py-1.5 w-24 rounded-lg shadow-md transition text-sm"
          >
            Save
          </button>
        </div>
      </div>

      {/* Modal animation style */}
      <style jsx>{`
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

export default LearnMoreModal;
