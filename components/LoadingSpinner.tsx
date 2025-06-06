
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      <p className="ml-4 text-yellow-200 text-lg">Pridobivam modrost vesolja...</p>
    </div>
  );
};

export default LoadingSpinner;
    