
import React from 'react';

interface LoaderProps {
  message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-dark-border border-t-brand-blue rounded-full animate-spin"></div>
      <p className="mt-4 text-light-text text-lg tracking-wide">{message}</p>
    </div>
  );
};
