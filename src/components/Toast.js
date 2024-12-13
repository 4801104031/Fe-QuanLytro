import React from 'react';
import { X, CheckCircle } from 'react-feather';

export function Toast({ message, onClose, type = 'success' }) {
  return (
    <div className="fixed bottom-4 right-4 flex items-center bg-white rounded-lg shadow-lg p-4 animate-slide-up">
      <CheckCircle className="text-green-500 mr-2" size={20} />
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
    </div>
  );
}

