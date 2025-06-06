
import React from 'react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-700/80 border border-red-500 text-red-100 px-4 py-3 rounded-lg relative my-4 max-w-2xl mx-auto" role="alert">
      <strong className="font-bold">Napaka! </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorAlert;
    