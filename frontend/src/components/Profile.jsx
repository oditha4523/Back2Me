import React, { useState } from 'react'
import axios from 'axios';
import { FiDownload } from "react-icons/fi";
import { IoMdContacts } from "react-icons/io";
import { RiAttachment2 } from "react-icons/ri";
import userimage from '../assets/userProfile.jpg';
import Navbar from './navbar';
import { getUser } from '../utils/auth';
import { FaCamera } from "react-icons/fa";

const Profile = () => {

  const [qrCode, setQrCode] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [userInfo, setUserInfo] = useState(getUser());

  // Fetch QR Code from backend
  const fetchQrCode = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/qr/${userInfo.id}`);
      setQrCode(res.data.qrCode);
      setShowQR(true);
    } catch (err) {
      console.error("Error fetching QR Code:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center p-6" style={{ backgroundColor: 'rgba(241, 247, 241, 1)' }}>
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-center md:items-start p-8 gap-16 mb-10">

          {/* Left Profile Image and QR Button */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md group">
              {/* Profile Image */}
              {userInfo?.avatar ? (
                <img
                  src={userInfo.avatar.startsWith('http') ? userInfo.avatar : `http://localhost:5000${userInfo.avatar}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-3xl font-bold text-gray-700">
                  {userInfo?.name
                    ? userInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                    : "?"}
                </div>
              )}

              {/* Overlay on hover */}
              <label className="absolute inset-0 bg-green-600/20 bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
                <FaCamera className="text-white text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("avatar", file);

                    try {
                      const token = localStorage.getItem("token");
                      const res = await axios.post(
                        "http://localhost:5000/api/auth/upload-avatar",
                        formData,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      setUserInfo({ ...userInfo, avatar: res.data.avatar });
                      localStorage.setItem(
                        "user",
                        JSON.stringify({ ...userInfo, avatar: res.data.avatar })
                      );
                    } catch (err) {
                      console.error(err);
                      alert("Upload failed!");
                    }
                  }}
                />
              </label>
            </div>

            <button
              onClick={fetchQrCode}
              className="bg-[#3CB371] text-white rounded-full hover:bg-[#36a163] transition px-6 py-2">
              QR Code
            </button>
          </div>

          {/* Right General Details */}
          <div className="flex-1 flex flex-col gap-4 w-full max-w-md text-left">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input
                value={userInfo?.email || ''}
                className="w-full h-10 bg-gray-100 rounded px-3 outline-none text-gray-700"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                value={userInfo?.phone || ''}
                className="w-full h-10 bg-gray-100 rounded px-3 outline-none text-gray-700"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Member Since</label>
              <input
                value={userInfo ? new Date(userInfo.createdAt).toLocaleDateString() : ''}
                className="w-full h-10 bg-gray-100 rounded px-3 outline-none text-gray-700"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* QR Instructions */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center gap-6 border border-green-400/20">
          <h2 className="text-2xl font-bold text-[#3CB371] text-center">How to Use Your QR Code</h2>
          <p className="text-center text-gray-600 mb-6">Follow these simple steps to protect your valuable items</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
              <FiDownload className="text-4xl text-[#3CB371] mb-2" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Download & Print</h3>
              <p className="text-gray-600 text-sm">Download your QR code and print on waterproof sticker paper.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
              <RiAttachment2 className="text-4xl text-[#3CB371] mb-2" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Attach to Items</h3>
              <p className="text-gray-600 text-sm">Stick the QR code on valuable belongings (wallets, bags, keys).</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
              <IoMdContacts className="text-4xl text-[#3CB371] mb-2" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Contacted</h3>
              <p className="text-gray-600 text-sm">If someone finds your item, they can scan the QR code to contact you securely.</p>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="w-full bg-gray-50 p-4 rounded-2xl shadow hover:shadow-md transition mt-6">
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
