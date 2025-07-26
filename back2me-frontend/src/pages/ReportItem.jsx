import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import LearnMoreModal from '../components/LearnMoreModal';

const ReportItem = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar stays at top */}
      <Navbar />

      {/* Main Section */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">
            Found Something Important?
          </h1>
          <h2 className="text-3xl font-semibold mb-3 text-green-700">
            Help it find its way home with Back2Me.
          </h2>
          <p className="text-base text-gray-700 mb-6">
            Join a growing community dedicated to reuniting lost items with their rightful owners.
            Report found belongings quickly, easily, and make a meaningful difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer"
              onClick={() => navigate('/reportItemForm')}
            >
              Report Found Item
            </button>
            <button
              className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-300 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              How it works
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <LearnMoreModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ReportItem;
