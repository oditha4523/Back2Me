import React from 'react';
import Navbar from '../components/navbar';
import ReportItemImage from '../assets/images/report-item-image.png';

const ReportItem = () => {
  return (
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        
        <div className="flex-1 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 py-0 h-full">
            <div className="flex flex-col md:flex-row h-full items-center">
              
              {/* Left Section */}
              <div className="md:w-1/2 w-full flex justify-end">
                <img
                  src={ReportItemImage}
                  alt="Report Item"
                  className="w-full h-auto object-contain max-h-full mr-0 mb-0 lg:mr-[-150px] lg:mb-[100px]"
                />
              </div>

              {/* Right Section */}
              <div className="md:w-1/2 w-full flex flex-col justify-center items-start text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">
                  Found Something Important?
                </h1>
                <h2 className="text-2xl font-semibold mb-3 text-green-700">
                  Help it find its way home with Back2Me.
                </h2>
                <p className="text-base text-gray-700 max-w-xl">
                  Join a growing community dedicated to reuniting lost items with their rightful owners. 
                  Report found belongings quickly, easily, and make a meaningful difference.
                </p>
                <div className="flex gap-x-4 mt-6">
                  <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer">
                    Report Found Item
                  </button>
                  <button className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-300 cursor-pointer">
                    Learn More
                  </button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ReportItem;
