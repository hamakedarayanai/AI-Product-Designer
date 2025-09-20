
import React, { useState, useRef } from 'react';
import { UploadIcon, MagicWandIcon } from './icons';

interface RefinementControlsProps {
  onTextSubmit: (text: string) => void;
  onImageSubmit: (file: File) => void;
  onGenerateMarketingKit: () => void;
  isKitGenerationEnabled: boolean;
}

export const RefinementControls: React.FC<RefinementControlsProps> = ({
  onTextSubmit,
  onImageSubmit,
  onGenerateMarketingKit,
  isKitGenerationEnabled,
}) => {
  const [textInput, setTextInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTextSubmit(textInput);
    setTextInput('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSubmit(e.target.files[0]);
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Text Refinement */}
      <div className="p-6 bg-dark-card border border-dark-border rounded-lg">
        <h3 className="text-lg font-semibold text-light-text mb-3">Refine with Text</h3>
        <p className="text-sm text-medium-text mb-4">Suggest material changes, color adjustments, or add new features.</p>
        <form onSubmit={handleTextSubmit} className="flex gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="e.g., 'Make it brushed metal' or 'Add a wooden cap'"
            className="flex-grow p-2 bg-gray-800 border border-dark-border rounded-md focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow"
          />
          <button type="submit" className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-colors">
            Refine
          </button>
        </form>
      </div>

      {/* Image Refinement */}
      <div className="p-6 bg-dark-card border border-dark-border rounded-lg">
        <h3 className="text-lg font-semibold text-light-text mb-3">Refine with an Image</h3>
        <p className="text-sm text-medium-text mb-4">Upload an image to inspire the design's color, texture, or style.</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-dark-border hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
        >
          <UploadIcon className="w-5 h-5" />
          Upload Inspiration
        </button>
      </div>

      {/* Generate Marketing Kit */}
      <div className="md:col-span-2 mt-4">
        <button
          onClick={onGenerateMarketingKit}
          disabled={!isKitGenerationEnabled}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-brand-purple hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-0.5 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          <MagicWandIcon className="w-6 h-6" />
          Generate Marketing Kit for Selected Design
        </button>
        {!isKitGenerationEnabled && <p className="text-center text-xs text-medium-text mt-2">Select a concept above to enable this.</p>}
      </div>
    </div>
  );
};
