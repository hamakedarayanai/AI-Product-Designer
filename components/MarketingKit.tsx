
import React from 'react';
import { MarketingKitData } from '../types';

interface MarketingKitProps {
  kit: MarketingKitData;
}

export const MarketingKit: React.FC<MarketingKitProps> = ({ kit }) => {
  return (
    <div className="p-6 bg-dark-card border border-dark-border rounded-lg shadow-lg space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-brand-purple mb-4">3. Your Marketing Kit is Ready!</h2>
        <p className="text-medium-text">Here's everything you need to launch your new product.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-medium-text uppercase tracking-wider mb-2">Product Name</h3>
            <p className="text-2xl font-bold text-light-text">{kit.text.productName}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-medium-text uppercase tracking-wider mb-2">Product Description</h3>
            <p className="text-light-text leading-relaxed">{kit.text.productDescription}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-medium-text uppercase tracking-wider mb-2">Social Media Ad Copy</h3>
            <p className="text-light-text bg-gray-800/50 p-4 rounded-md border border-dark-border italic">"{kit.text.adCopy}"</p>
          </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-xs font-semibold text-medium-text uppercase tracking-wider">Generated Social Media Visuals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {kit.visuals.map((visual, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-dark-border">
                        <img src={visual} alt={`Social media visual ${index + 1}`} className="w-full h-full object-cover aspect-square"/>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
