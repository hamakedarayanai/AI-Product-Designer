import React, { useState } from 'react';
import { MagicWandIcon } from './icons';

interface BriefInputProps {
  onGenerate: (brief: string) => void;
}

const examplePrompts = [
    'A sleek, minimalist water bottle, matte black finish, for a young, athletic audience',
    'A retro-style instant camera with pastel colors and a chunky, playful design',
    'An ergonomic, futuristic gaming mouse with customizable RGB lighting and a carbon fiber body',
    'A handcrafted ceramic coffee mug with an earthy glaze and a comfortable, oversized handle',
];

export const BriefInput: React.FC<BriefInputProps> = ({ onGenerate }) => {
  const [brief, setBrief] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(brief);
  };

  const handleExampleClick = (prompt: string) => {
    setBrief(prompt);
  }

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
          aria-label="Design Brief"
        />
        <div className="mt-4 mb-6">
            <p className="text-sm text-medium-text mb-2">Need inspiration? Try one of these:</p>
            <div className="flex flex-wrap gap-2">
                {examplePrompts.map(prompt => (
                    <button key={prompt} type="button" onClick={() => handleExampleClick(prompt)} className="px-3 py-1 bg-gray-700/50 hover:bg-gray-700 border border-dark-border rounded-full text-xs text-medium-text transition-colors">
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
        <button
          type="submit"
          disabled={!brief.trim()}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          <MagicWandIcon className="w-5 h-5" />
          Generate Concepts
        </button>
      </form>
    </div>
  );
};