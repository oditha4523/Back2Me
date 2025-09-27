import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';

const ClaimItem = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const item = location.state?.item;

    const [answer, setAnswer] = useState('');

    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-green-100 to-green-200">
                <p className="text-gray-700 text-lg">No item selected.</p>
                <button
                    className="mt-4 px-6 py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-500 transition"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'rgba(241, 247, 241, 1)' }}>
            <Navbar />

            <main className="flex-grow flex flex-col justify-center items-center px-6 py-12 space-y-8">
                <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 space-y-6 relative overflow-hidden">

                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-200 rounded-full opacity-50 blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-green-300 rounded-full opacity-50 blur-3xl animate-pulse"></div>

                    <h1 className="text-3xl font-extrabold text-gray-900 text-center">Claim Your Item</h1>
                    <p className="text-center text-gray-600">
                        Follow the instructions below to securely claim the item.
                    </p>

                    {/* Show reporter's chosen method */}
                    <p className="text-sm text-gray-500 text-center">
                        Reporter chose: <span className="font-semibold">{item.claimMethod}</span>
                    </p>

                    {/* Claim via Phone */}
                    {item.claimMethod === 'call' && (
                        <div className="space-y-3 bg-green-50 p-4 rounded-xl shadow-inner">
                            <p className="font-semibold text-gray-700">Contact via phone:</p>
                            <p className="text-green-700 font-bold text-lg">📞 {item.verifyInfo}</p>
                            <p className="text-sm text-gray-500">
                                Please call politely and provide the item details. Make sure to identify yourself and clearly describe the item.
                            </p>
                        </div>
                    )}

                    {/* Claim via Email */}
                    {item.claimMethod === 'email' && (
                        <div className="space-y-3 bg-green-50 p-4 rounded-xl shadow-inner">
                            <p className="font-semibold text-gray-700">Contact via email:</p>

                            {(() => {
                                const subject = `Claiming ${item.name}`;
                                const body = `Hello,

I believe this item belongs to me. Here are my details:

Name:
NIC:
Description of the item:
Location found (if known):
Contact Number:

Please verify my claim.

Thank you!`;

                                const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${item.verifyInfo}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                                const mailtoLink = `mailto:${item.verifyInfo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                                return (
                                    <div className="space-y-2">
                                        <a
                                            href={gmailLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block px-4 py-3 bg-green-600 text-white rounded-full text-center font-semibold hover:bg-green-500 transition"
                                        >
                                            📧 Send Email via Gmail
                                        </a>

                                        <a
                                            href={mailtoLink}
                                            className="block px-4 py-3 bg-gray-200 text-gray-700 rounded-full text-center font-semibold hover:bg-gray-300 transition"
                                        >
                                            ✉️ Send with Default Mail App
                                        </a>
                                    </div>
                                );
                            })()}

                            <p className="text-sm text-gray-500 mt-1">
                                Choose Gmail (opens in a new tab) or use your system’s default mail app. Make sure to provide complete and accurate information.
                            </p>
                        </div>
                    )}

                    {/* Claim via Verification Question */}
                    {item.claimMethod === 'verification' && (
                        <div className="space-y-3 bg-green-50 p-4 rounded-xl shadow-inner">
                            <p className="font-semibold text-gray-700">Answer the verification question:</p>
                            <p className="font-bold text-green-700 text-lg">❓ {item.verifyInfo}</p>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Your answer..."
                                className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <p className="text-sm text-gray-500">
                                The reporter will contact you if the verification answer you submitted is correct.
                            </p>
                            <button
                                onClick={async () => {
                                    if (!answer.trim()) {
                                        alert('Please enter an answer!');
                                        return;
                                    }

                                    try {
                                        const token = localStorage.getItem('token');
                                        const response = await fetch('http://localhost:5000/api/claims/submit-answer', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': token ? `Bearer ${token}` : ''
                                            },
                                            body: JSON.stringify({ itemId: item._id, answer })
                                        });

                                        const data = await response.json();
                                        if (data.success) {
                                            alert('Your answer has been submitted to the reporter!');
                                            setAnswer('');
                                            navigate('/find');
                                        } else {
                                            alert(data.error || 'Failed to send answer. Try again.');
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        alert('Something went wrong!');
                                    }
                                }}
                                className="w-full px-4 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-500 transition"
                            >
                                Submit Answer
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-full font-semibold transition"
                    >
                        Cancel
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ClaimItem;
