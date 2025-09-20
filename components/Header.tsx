
import React from 'react';
import { SparklesIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-dark-card/50 backdrop-blur-sm border-b border-dark-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SparklesIcon className="w-8 h-8 text-brand-purple" />
          <h1 className="text-2xl font-bold tracking-tight text-light-text">
            AI Product Designer
          </h1>
        </div>
        <p className="hidden md:block text-medium-text">From Idea to Market, Instantly.</p>
      </div>
    </header>
  );
};
