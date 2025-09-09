import React, { useState } from 'react'
import axios from 'axios';
import { FiDownload } from "react-icons/fi";
import { IoMdContacts } from "react-icons/io";
import { RiAttachment2 } from "react-icons/ri";
import userimage from '../assets/userProfile.jpg';
import Navbar from './navbar';

const Profile = () => {

  const [qrCode, setQrCode] = useState(null);
  const [showQR, setShowQR] = useState(false);

  // Fetch QR Code from backend
  const fetchQrCode = async () => {
    try {
      // TODO: replace USER_ID_HERE with actual logged-in user ID from auth context/localStorage
      const res = await axios.get("http://localhost:5000/api/qr/689c3a686f8424b185c2f922");
      setQrCode(res.data.qrCode);
      setShowQR(true);
    } catch (err) {
      console.error("Error fetching QR Code:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center p-6">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-center md:items-start p-8 gap-16 mb-10">

          {/* Left Profile Image and QR Button */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={userimage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
            <p className="text-xl font-semibold text-gray-800">Bang Tannies</p>
            <button 
              onClick={fetchQrCode}
              className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition">
              QR Code
            </button>
          </div>

          {/* Right General Details */}
          <div className="flex-1 flex flex-col gap-4 w-full max-w-md text-left">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input
                placeholder="tannies7@gmail.com"
                className="w-full h-10 bg-gray-100 rounded px-3 outline-none text-gray-700"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                placeholder="+9477 034 543"
                className="w-full h-10 bg-gray-100 rounded px-3 outline-none text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Member Since</label>
              <input
                placeholder="June 13, 2025"
                className="w-full h-10 bg-gray-100 rounded px-3 outline-none text-gray-700"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* QR Code Instructions */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center gap-6">

          <h2 className="text-2xl font-bold text-teal-600 text-center">How to Use Your QR Code</h2>
          <p className="text-center text-gray-600 mb-6">Follow these simple steps to protect your valuable items</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <FiDownload className="text-4xl text-teal-500 mb-2"/>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Download & Print</h3>
              <p className="text-gray-600 text-sm">Download your QR code and print on waterproof sticker paper.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <RiAttachment2 className="text-4xl text-teal-500 mb-2"/>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Attach to Items</h3>
              <p className="text-gray-600 text-sm">Stick the QR code on valuable belongings (wallets, bags, keys).</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <IoMdContacts className="text-4xl text-teal-500 mb-2"/>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Contacted</h3>
              <p className="text-gray-600 text-sm">If someone finds your item, they can scan the QR code to contact you securely.</p>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="w-full bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Pro Tip</h3>
            <p className="text-gray-600 text-sm">For best results, use waterproof sticker paper and place the QR code in a visible but secure location on your items.</p>
          </div>

        </div>

        {/* Fullscreen QR Modal */}
          {showQR && qrCode && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                {/* Close button */}
                <button 
                  onClick={() => setShowQR(false)} 
                  className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                >
                  ✖
                </button>

                {/* QR Image */}
                <img src={qrCode} alt="QR Code" className="w-64 h-64 mb-4" />

                {/* Download button */}
                <a 
                  href={qrCode} 
                  download="my-qrcode.png" 
                  className="flex items-center gap-2 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition"
                >
                  <FiDownload /> Download QR
                </a>
              </div>
            </div>
          )}

      </div>
    </>
  )
}

export default Profile;
