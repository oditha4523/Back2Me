import React, { useState } from 'react';
import Navbar from '../components/navbar';
import LeafletMap from '../components/LeafletMap';
import { FaSearch } from "react-icons/fa";

const FindItem = () => {
  const [foundItemCategory, setFoundItemCategory] = useState('');

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
            <div className="row-span-2 rounded-3xl p-4 overflow-auto border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Found Items</h2>
              <p>No items to display yet.</p>
            </div>
          </div>

          <div className="col-span-2 grid grid-rows-9 h-full border border-gray-200 rounded-3xl">
            <div className="row-span-1 p-4 flex items-center">
              <h2 className="text-xl font-semibold">Found Items Map</h2>
            </div>
            <div className="row-span-8">
              <LeafletMap />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default FindItem;
