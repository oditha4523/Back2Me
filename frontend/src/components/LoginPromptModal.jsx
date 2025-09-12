import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPromptModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-2">Please log in</h3>
        <p className="mb-4">You need to be logged in to report an item.</p>
        <div className="flex gap-2 justify-end">
          <button onClick={() => { onClose(); navigate('/login?mode=register'); }} className="px-4 py-2 bg-gray-200 rounded">Sign up</button>
          <button onClick={() => { onClose(); navigate('/login'); }} className="px-4 py-2 bg-green-600 text-white rounded">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
