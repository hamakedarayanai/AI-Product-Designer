import React, { useState } from 'react';
import { MarketingKitData } from '../types';
import { CopyIcon, CheckIcon } from './icons';

interface MarketingKitProps {
  kit: MarketingKitData;
}

const useCopyToClipboard = (): [string | null, (text: string) => void] => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000); // Reset after 2 seconds
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
    }
  };

  return [copiedText, copy];
};


const CopyableField: React.FC<{label: string, value: string, children: React.ReactNode}> = ({label, value, children}) => {
    const [copiedText, copy] = useCopyToClipboard();
    const isCopied = copiedText === value;
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                 <h3 className="text-xs font-semibold text-medium-text uppercase tracking-wider">{label}</h3>
                 <button onClick={() => copy(value)} className="text-medium-text hover:text-light-text transition-colors p-1" aria-label={`Copy ${label}`}>
                    {isCopied ? <CheckIcon className="w-4 h-4 text-green-400"/> : <CopyIcon className="w-4 h-4"/>}
                 </button>
            </div>
            {children}
        </div>
    );
};


export const MarketingKit: React.FC<MarketingKitProps> = ({ kit }) => {
  return (
    <div className="p-6 bg-dark-card border border-dark-border rounded-lg shadow-lg space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-brand-purple mb-4">3. Your Marketing Kit is Ready!</h2>
        <p className="text-medium-text">Here's everything you need to launch your new product.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <CopyableField label="Product Name" value={kit.text.productName}>
            <p className="text-2xl font-bold text-light-text">{kit.text.productName}</p>
          </CopyableField>
          
          <CopyableField label="Product Description" value={kit.text.productDescription}>
             <p className="text-light-text leading-relaxed">{kit.text.productDescription}</p>
          </CopyableField>

          <CopyableField label="Social Media Ad Copy" value={kit.text.adCopy}>
             <p className="text-light-text bg-gray-800/50 p-4 rounded-md border border-dark-border italic">"{kit.text.adCopy}"</p>
          </CopyableField>
        </div>

        <div className="space-y-4">
            <h3 className="text-xs font-semibold text-medium-text uppercase tracking-wider">Generated Social Media Visuals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {kit.visuals.map((visual, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-dark-border group">
                        <img src={visual} alt={`Social media visual ${index + 1}`} className="w-full h-full object-cover aspect-square transform transition-transform duration-300 group-hover:scale-105"/>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};