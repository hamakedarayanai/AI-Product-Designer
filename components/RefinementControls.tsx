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
    if(!textInput.trim()) return;
    onTextSubmit(textInput);
    setTextInput('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSubmit(e.target.files[0]);
    }
  };

  return (
    <div className="p-6 bg-dark-card border border-dark-border rounded-lg shadow-lg space-y-8">
        <div>
            <h3 className="text-xl font-bold text-light-text mb-2">Refine & Finalize</h3>
            <p className="text-medium-text">Make adjustments to get the perfect design before generating your marketing kit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Text & Image Refinement */}
            <div className="space-y-4">
                 <h4 className="text-lg font-semibold text-light-text">Suggest a change</h4>
                 <form onSubmit={handleTextSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="e.g., 'Make it brushed metal'"
                        className="flex-grow p-3 bg-gray-800 border border-dark-border rounded-md focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow"
                    />
                    <button type="submit" className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed" disabled={!textInput.trim()}>
                        Refine
                    </button>
                 </form>
            </div>
             <div className="space-y-4">
                <h4 className="text-lg font-semibold text-light-text">...or use an image for inspiration</h4>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark-border hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
                >
                    <UploadIcon className="w-5 h-5" />
                    Upload Inspiration Image
                </button>
            </div>
        </div>
      
      {/* Generate Marketing Kit */}
      <div className="border-t border-dark-border pt-6">
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