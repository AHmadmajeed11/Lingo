
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      <p className="ml-4 text-slate-400 text-lg">Thinking...</p>
    </div>
  );
};

export default LoadingSpinner;
