
import React, { useState } from 'react';
import { MagicWandIcon } from './icons';

interface BriefInputProps {
  onGenerate: (brief: string) => void;
}

export const BriefInput: React.FC<BriefInputProps> = ({ onGenerate }) => {
  const [brief, setBrief] = useState<string>('A sleek, minimalist water bottle design with a pop of color for a young, athletic audience');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(brief);
  };

  return (
    <div className="p-6 bg-dark-card border border-dark-border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-brand-blue mb-4">1. Start with Your Design Brief</h2>
      <p className="text-medium-text mb-6">Describe the product you want to create. Be as descriptive as possible. Mention style, materials, target audience, and key features.</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="e.g., A futuristic, ergonomic gaming mouse with customizable RGB lighting..."
          className="w-full h-40 p-4 bg-gray-800 border border-dark-border rounded-md focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow text-light-text resize-none"
        />
        <button
          type="submit"
          className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5"
        >
          <MagicWandIcon className="w-5 h-5" />
          Generate Concepts
        </button>
      </form>
    </div>
  );
};
