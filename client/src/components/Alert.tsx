import React from 'react';

type AlertProps = {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
};

const Alert: React.FC<AlertProps> = ({ type = 'info', message, onClose }) => {
  const alertStyles = {
    success: 'bg-green-100 text-green-800 border-green-500',
    error: 'bg-red-100 text-red-800 border-red-500',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    info: 'bg-blue-100 text-blue-800 border-blue-500',
  };

  return (
    <div
      className={`flex items-center justify-between border-l-4 p-4 rounded shadow ${alertStyles[type]} transition`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-lg font-bold text-gray-800 hover:text-black"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
