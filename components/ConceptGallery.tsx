
import React from 'react';

interface ConceptGalleryProps {
  concepts: string[];
  selectedConcept: string | null;
  onSelect: (concept: string) => void;
}

export const ConceptGallery: React.FC<ConceptGalleryProps> = ({ concepts, selectedConcept, onSelect }) => {
  if (concepts.length === 0) return null;

  return (
    <div className="p-6 bg-dark-card border border-dark-border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-brand-blue mb-4">2. Review & Select Concepts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {concepts.map((concept, index) => (
          <div
            key={index}
            className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer group ${
              selectedConcept === concept ? 'border-brand-purple shadow-lg shadow-purple-500/30' : 'border-dark-border'
            }`}
            onClick={() => onSelect(concept)}
          >
            <img src={concept} alt={`Concept ${index + 1}`} className="w-full h-full object-cover aspect-square" />
            <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                selectedConcept === concept ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
              <span className="text-white font-bold text-lg px-4 py-2 bg-brand-purple/80 rounded-md">
                {selectedConcept === concept ? 'Selected' : 'Select'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
